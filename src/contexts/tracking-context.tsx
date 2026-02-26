
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo, useRef } from 'react';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, doc, getDoc, writeBatch, increment, updateDoc, query, where } from 'firebase/firestore';
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
  liveSessionDistance: number; // Distanza percorsa non ancora sincronizzata nel DB
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
    const [syncedDistance, setSyncedDistance] = useState(0); // Quanti km di questa sessione sono già finiti nel DB

    const watchIdRef = useRef<number | null>(null);
    const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastPositionRef = useRef<GeolocationCoordinates | null>(null);
    const distanceRef = useRef(0);
    const syncedDistanceRef = useRef(0);
    const startTimeRef = useRef<Date | null>(null);

    // Fetch vehicles from Firestore
    const vehiclesQuery = useMemo(() => {
        if (!user || !firestore) return null;
        return query(collection(firestore, `users/${user.uid}/vehicles`), where('dataoraelimina', '==', null));
    }, [user, firestore]);
    const { data: vehicles } = useCollection<Vehicle>(vehiclesQuery);
    
    // Initial load from localStorage
    useEffect(() => {
        if (user?.uid) {
            const userId = user.uid;
            
            const savedId = localStorage.getItem(`trackedVehicleId_${userId}`);
            if (savedId) {
                try {
                    _setTrackedVehicleId(JSON.parse(savedId));
                } catch {
                    _setTrackedVehicleId(savedId);
                }
            }

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

    // Persistent GPS restart based on Firestore 'trackingGPS' field
    useEffect(() => {
        if (user?.uid && vehicles && permissionStatus === 'granted' && !isTracking) {
            const vehicleToTrack = vehicles.find(v => v.trackingGPS === true);
            if (vehicleToTrack) {
                _setTrackedVehicleId(vehicleToTrack.id);
                localStorage.setItem(`trackedVehicleId_${user.uid}`, JSON.stringify(vehicleToTrack.id));
                const timer = setTimeout(() => {
                    startTracking(vehicleToTrack.id);
                }, 500);
                return () => clearTimeout(timer);
            }
        }
    }, [vehicles, permissionStatus, isTracking, user?.uid]);

    // Funzione per sincronizzare i chilometri nel DB periodicamente
    const syncMileageToDb = useCallback((vehicleId: string, delta: number) => {
        if (!user || !firestore || delta <= 0) return;
        
        const vehicleRef = doc(firestore, `users/${user.uid}/vehicles`, vehicleId);
        updateDoc(vehicleRef, { currentMileage: increment(delta) }).catch(err => {
            console.error("Errore durante la sincronizzazione dei chilometri:", err);
        });
    }, [user, firestore]);

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
        syncedDistanceRef.current = 0;
        lastPositionRef.current = null;
        startTimeRef.current = null;
        setSessionDistance(0);
        setSessionDuration(0);
        setSyncedDistance(0);

        if (user?.uid) {
            localStorage.removeItem(`isTracking_${user.uid}`);
            localStorage.removeItem(`sessionDistance_${user.uid}`);
            localStorage.removeItem(`startTime_${user.uid}`);
        }
    }, [user?.uid]);

    const startTracking = useCallback((vehicleIdOverride?: string) => {
        const idToTrack = vehicleIdOverride || trackedVehicleId;
        
        if (permissionStatus !== 'granted' || !idToTrack || !user || !firestore) {
            return;
        }

        const vehicleRef = doc(firestore, `users/${user.uid}/vehicles`, idToTrack);
        updateDoc(vehicleRef, { trackingGPS: true }).catch(err => {
            console.error("Failed to update trackingGPS status in Firestore:", err);
        });

        if (!isTracking) {
            if (!startTimeRef.current) {
                startTimeRef.current = new Date();
                distanceRef.current = 0;
                syncedDistanceRef.current = 0;
                setSessionDistance(0);
                setSessionDuration(0);
                setSyncedDistance(0);
            }
        }

        setIsTracking(true);
        if (vehicleIdOverride) {
            setTrackedVehicleId(vehicleIdOverride);
        }

        if (user?.uid) {
            localStorage.setItem(`isTracking_${user.uid}`, 'true');
            if (startTimeRef.current) {
                localStorage.setItem(`startTime_${user.uid}`, startTimeRef.current.toISOString());
            }
        }

        if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = setInterval(() => {
            if (startTimeRef.current) {
                const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current.getTime()) / 1000);
                setSessionDuration(elapsedSeconds);
            }
        }, 1000);

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

                    // Sincronizzazione automatica nel DB ogni 0.5 km percorsi
                    const unsyncedDistance = distanceRef.current - syncedDistanceRef.current;
                    if (unsyncedDistance >= 0.5) {
                        syncMileageToDb(idToTrack, unsyncedDistance);
                        syncedDistanceRef.current = distanceRef.current;
                        setSyncedDistance(syncedDistanceRef.current);
                    }
                }
                lastPositionRef.current = position.coords;
            },
            (error) => {
                toast({ variant: 'destructive', title: 'Errore GPS', description: error.message });
                setIsTracking(false);
                if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
                if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    }, [permissionStatus, trackedVehicleId, toast, setTrackedVehicleId, isTracking, user, firestore, syncMileageToDb]);

    const stopTracking = useCallback(async () => {
        setIsStopping(true);
        const trackedDistance = distanceRef.current;
        const trackedDuration = startTimeRef.current ? (Date.now() - startTimeRef.current.getTime()) / 60000 : 0;
        
        // Quanta distanza è stata percorsa dall'ultima sincronizzazione periodica
        const finalUnsyncedDistance = trackedDistance - syncedDistanceRef.current;

        setIsTracking(false);
        if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
        if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);

        if (!user || !firestore || !trackedVehicleId) {
            resetTrackingState();
            setIsStopping(false);
            return;
        }

        const vehicleRef = doc(firestore, `users/${user.uid}/vehicles`, trackedVehicleId);
        await updateDoc(vehicleRef, { trackingGPS: false }).catch(err => {
            console.error("Failed to reset trackingGPS status in Firestore:", err);
        });

        if (trackedDistance <= 0.005) {
            resetTrackingState();
            setIsStopping(false);
            return;
        }

        try {
            const batch = writeBatch(firestore);

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
            
            // Sincronizziamo solo la parte finale non ancora inviata al DB
            if (finalUnsyncedDistance > 0) {
                batch.update(vehicleRef, {
                    currentMileage: increment(finalUnsyncedDistance)
                });
            }

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
            toast({ title: 'Sessione salvata!', description: 'Il chilometraggio è stato aggiornato nel database.' });
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
        liveSessionDistance: sessionDistance - syncedDistance,
    }), [permissionStatus, isTracking, isStopping, trackedVehicleId, setTrackedVehicleId, startTracking, stopTracking, switchTrackingTo, trackedVehicle, vehicles, sessionDistance, sessionDuration, syncedDistance]);

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
