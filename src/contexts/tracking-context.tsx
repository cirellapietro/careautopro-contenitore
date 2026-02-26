'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo, useRef } from 'react';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, doc, getDoc, writeBatch, increment } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { calculateDistance } from '@/lib/utils';
import type { Vehicle } from '@/lib/types';
import { useCollection } from '@/firebase';

type PermissionStatus = 'prompt' | 'granted' | 'denied';

interface TrackingContextType {
  permissionStatus: PermissionStatus;
  isTracking: boolean;
  isStopping: boolean;
  trackedVehicleId: string | null;
  setTrackedVehicleId: (id: string | null) => void;
  startTracking: (vehicleIdOverride?: string) => void;
  stopTracking: () => Promise<void>;
  switchTrackingTo: (newVehicleId: string) => Promise<void>;
  trackedVehicle: Vehicle | null;
  vehicles: Vehicle[];
  sessionDistance: number;
  sessionDuration: number; // in seconds
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export function TrackingProvider({ children }: { children: ReactNode }) {
    const { user } = useUser();
    const { firestore } = useFirebase();
    const { toast } = useToast();

    const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('prompt');
    const [isTracking, setIsTracking] = useState(false);
    const [isStopping, setIsStopping] = useState(false);
    const [trackedVehicleId, _setTrackedVehicleId] = useState<string | null>(null);
    
    const [sessionDistance, setSessionDistance] = useState(0);
    const [sessionDuration, setSessionDuration] = useState(0);

    const watchIdRef = useRef<number | null>(null);
    const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastPositionRef = useRef<GeolocationCoordinates | null>(null);
    const distanceRef = useRef(0);
    const startTimeRef = useRef<Date | null>(null);

    const vehiclesQuery = useMemo(() => {
        if (!user || !firestore) return null;
        return collection(firestore, `users/${user.uid}/vehicles`);
    }, [user, firestore]);
    const { data: vehicles } = useCollection<Vehicle>(vehiclesQuery);
    
    // Initial load from localStorage
    useEffect(() => {
        if (user?.uid) {
            const userId = user.uid;
            
            // Load selected vehicle ID
            const savedId = localStorage.getItem(`trackedVehicleId_${userId}`);
            if (savedId) {
                try {
                    _setTrackedVehicleId(JSON.parse(savedId));
                } catch {
                    _setTrackedVehicleId(savedId);
                }
            }

            // Load tracking state and session data
            const isTrackingSaved = localStorage.getItem(`isTracking_${userId}`) === 'true';
            const distanceSaved = localStorage.getItem(`sessionDistance_${userId}`);
            const startSaved = localStorage.getItem(`startTime_${userId}`);

            if (distanceSaved) {
                const d = parseFloat(distanceSaved);
                distanceRef.current = d;
                setSessionDistance(d);
            }

            if (startSaved) {
                const startDate = new Date(startSaved);
                startTimeRef.current = startDate;
                const elapsed = Math.floor((Date.now() - startDate.getTime()) / 1000);
                setSessionDuration(elapsed > 0 ? elapsed : 0);
            }

            if (isTrackingSaved) {
                setIsTracking(true);
            }
        }
    }, [user?.uid]);

    // Persist session distance periodically to localStorage
    useEffect(() => {
        if (user?.uid && isTracking) {
            localStorage.setItem(`sessionDistance_${user.uid}`, distanceRef.current.toString());
        }
    }, [sessionDistance, isTracking, user?.uid]);

    const setTrackedVehicleId = useCallback((id: string | null) => {
        _setTrackedVehicleId(id);
        if (user?.uid) {
            localStorage.setItem(`trackedVehicleId_${user.uid}`, JSON.stringify(id));
        }
    }, [user?.uid]);

    const trackedVehicle = useMemo(() => {
        return vehicles?.find(v => v.id === trackedVehicleId) || null;
    }, [vehicles, trackedVehicleId]);

    const resetTrackingState = useCallback(() => {
        if (durationIntervalRef.current) {
            clearInterval(durationIntervalRef.current);
            durationIntervalRef.current = null;
        }
        if (watchIdRef.current) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }
        distanceRef.current = 0;
        lastPositionRef.current = null;
        startTimeRef.current = null;
        setSessionDistance(0);
        setSessionDuration(0);

        if (user?.uid) {
            localStorage.removeItem(`isTracking_${user.uid}`);
            localStorage.removeItem(`sessionDistance_${user.uid}`);
            localStorage.removeItem(`startTime_${user.uid}`);
        }
    }, [user?.uid]);

    const startTracking = useCallback((vehicleIdOverride?: string) => {
        const idToTrack = vehicleIdOverride || trackedVehicleId;
        
        if (permissionStatus !== 'granted' || !idToTrack) {
            toast({ variant: 'destructive', title: 'Errore', description: 'Permessi GPS non concessi o nessun veicolo selezionato.' });
            return;
        }

        // Clean start logic
        if (!isTracking) {
            startTimeRef.current = new Date();
            distanceRef.current = 0;
            setSessionDistance(0);
            setSessionDuration(0);
        }

        setIsTracking(true);
        if (vehicleIdOverride) {
            setTrackedVehicleId(vehicleIdOverride);
        }

        if (user?.uid) {
            localStorage.setItem(`isTracking_${user.uid}`, 'true');
            localStorage.setItem(`startTime_${user.uid}`, startTimeRef.current!.toISOString());
        }

        // Start duration timer
        if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = setInterval(() => {
            if (startTimeRef.current) {
                const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current.getTime()) / 1000);
                setSessionDuration(elapsedSeconds);
            }
        }, 1000);

        // Start position watcher
        if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = navigator.geolocation.watchPosition(
            (position) => {
                if (lastPositionRef.current) {
                    const newDistance = calculateDistance(
                        lastPositionRef.current.latitude,
                        lastPositionRef.current.longitude,
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    distanceRef.current += newDistance;
                    setSessionDistance(distanceRef.current);
                }
                lastPositionRef.current = position.coords;
            },
            (error) => {
                toast({ variant: 'destructive', title: 'Errore GPS', description: error.message });
                setIsTracking(false);
                resetTrackingState();
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    }, [permissionStatus, trackedVehicleId, toast, resetTrackingState, setTrackedVehicleId, isTracking, user?.uid]);

    // Resume tracking if it was active when permission is granted
    useEffect(() => {
        if (permissionStatus === 'granted' && isTracking && watchIdRef.current === null) {
            startTracking();
        }
    }, [permissionStatus, isTracking, startTracking]);

    const stopTracking = useCallback(async () => {
        setIsStopping(true);
        const trackedDistance = distanceRef.current;
        const trackedDuration = startTimeRef.current ? (Date.now() - startTimeRef.current.getTime()) / 60000 : 0;

        // Visual stop first
        setIsTracking(false);
        if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
        if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);

        if (!user || !firestore || !trackedVehicleId || trackedDistance <= 0.005) {
            resetTrackingState();
            setIsStopping(false);
            if (trackedDistance > 0) toast({ title: 'Sessione troppo breve', description: 'Nessun dato salvato (minimo 5 metri).' });
            return;
        }

        toast({ title: 'Salvataggio sessione...', description: `Distanza: ${trackedDistance.toFixed(2)} km` });

        try {
            const batch = writeBatch(firestore);
            const vehicleRef = doc(firestore, `users/${user.uid}/vehicles`, trackedVehicleId);

            const sessionRef = doc(collection(vehicleRef, 'trackingSessions'));
            batch.set(sessionRef, {
                id: sessionRef.id,
                vehicleId: trackedVehicleId,
                startTime: startTimeRef.current?.toISOString(),
                endTime: new Date().toISOString(),
                distanceTraveled: trackedDistance,
                duration: trackedDuration,
                dataoraelimina: null,
            });
            
            batch.update(vehicleRef, {
                currentMileage: increment(trackedDistance)
            });

            const todayStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
            const dailyStatRef = doc(collection(vehicleRef, 'dailyStatistics'), todayStr);
            const dailyStatSnap = await getDoc(dailyStatRef);

            if (dailyStatSnap.exists()) {
                batch.update(dailyStatRef, {
                    totalDistance: increment(trackedDistance),
                    totalTime: increment(trackedDuration),
                });
            } else {
                batch.set(dailyStatRef, {
                    id: todayStr,
                    vehicleId: trackedVehicleId,
                    date: new Date().toISOString(),
                    totalDistance: trackedDistance,
                    totalTime: trackedDuration,
                    dataoraelimina: null,
                });
            }

            await batch.commit();
            toast({ title: 'Sessione salvata!', description: 'Chilometraggio e statistiche aggiornate.' });
        } catch (e: any) {
            const permissionError = new FirestorePermissionError({
                path: `users/${user.uid}/vehicles/${trackedVehicleId}`,
                operation: 'write',
                requestResourceData: { context: `Saving tracking session failed: ${e.message}` }
            });
            errorEmitter.emit('permission-error', permissionError);
            toast({ variant: 'destructive', title: 'Errore Salvataggio', description: 'Impossibile salvare la sessione.' });
        } finally {
            resetTrackingState();
            setIsStopping(false);
        }
    }, [user, firestore, trackedVehicleId, toast, resetTrackingState]);

    const switchTrackingTo = useCallback(async (newVehicleId: string) => {
        if (isTracking) {
            await stopTracking();
        }
        startTracking(newVehicleId);
    }, [isTracking, stopTracking, startTracking]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if ('permissions' in navigator) {
                navigator.permissions.query({ name: 'geolocation' as any }).then(result => {
                    setPermissionStatus(result.state as PermissionStatus);
                    result.onchange = () => setPermissionStatus(result.state as PermissionStatus);
                });
            } else {
                 navigator.geolocation.getCurrentPosition(
                    () => setPermissionStatus('granted'),
                    () => setPermissionStatus('denied')
                );
            }
        }
    }, []);

    const value = useMemo(() => ({
        permissionStatus,
        isTracking,
        isStopping,
        trackedVehicleId,
        setTrackedVehicleId,
        startTracking,
        stopTracking,
        switchTrackingTo,
        trackedVehicle,
        vehicles: vehicles || [],
        sessionDistance,
        sessionDuration,
    }), [permissionStatus, isTracking, isStopping, trackedVehicleId, setTrackedVehicleId, startTracking, stopTracking, switchTrackingTo, trackedVehicle, vehicles, sessionDistance, sessionDuration]);

    return (
        <TrackingContext.Provider value={value}>
            {children}
        </TrackingContext.Provider>
    );
}

export function useTracking(): TrackingContextType {
    const context = useContext(TrackingContext);
    if (context === undefined) {
        throw new Error('useTracking must be used within a TrackingProvider');
    }
    return context;
}
