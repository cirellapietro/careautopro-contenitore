'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo, useRef } from 'react';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, doc, getDoc, writeBatch, increment, updateDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import usePersistentState from '@/hooks/use-persistent-state';
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
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export function TrackingProvider({ children }: { children: ReactNode }) {
    const { user } = useUser();
    const { firestore } = useFirebase();
    const { toast } = useToast();

    const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('prompt');
    const [isTracking, setIsTracking] = useState(false);
    const [isStopping, setIsStopping] = useState(false);
    const [trackedVehicleId, setTrackedVehicleId] = usePersistentState<string | null>('trackedVehicleId', null);

    const watchIdRef = useRef<number | null>(null);
    const lastPositionRef = useRef<GeolocationCoordinates | null>(null);
    const distanceRef = useRef(0);
    const startTimeRef = useRef<Date | null>(null);

    const vehiclesQuery = useMemo(() => {
        if (!user || !firestore) return null;
        return collection(firestore, `users/${user.uid}/vehicles`);
    }, [user, firestore]);
    const { data: vehicles } = useCollection<Vehicle>(vehiclesQuery);
    
    const trackedVehicle = useMemo(() => {
        return vehicles?.find(v => v.id === trackedVehicleId) || null;
    }, [vehicles, trackedVehicleId]);

    const resetTrackingState = useCallback(() => {
        distanceRef.current = 0;
        lastPositionRef.current = null;
        startTimeRef.current = null;
        if (watchIdRef.current) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }
    }, []);

    const startTracking = useCallback((vehicleIdOverride?: string) => {
        const idToTrack = vehicleIdOverride || trackedVehicleId;
        const vehicleToTrack = vehicles?.find(v => v.id === idToTrack);

        if (permissionStatus !== 'granted' || !idToTrack) {
            toast({ variant: 'destructive', title: 'Errore', description: 'Permessi GPS non concessi o nessun veicolo selezionato.' });
            return;
        }

        if (isTracking) {
            console.warn("Attempted to start tracking while a session is already active.");
            return;
        }

        setIsTracking(true);
        if (vehicleIdOverride) {
            setTrackedVehicleId(vehicleIdOverride);
        }
        startTimeRef.current = new Date();
        toast({ title: 'Tracciamento avviato!', description: `Veicolo: ${vehicleToTrack?.name}` });

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
    }, [permissionStatus, trackedVehicleId, vehicles, toast, resetTrackingState, setTrackedVehicleId, isTracking]);

    const stopTracking = useCallback(async () => {
        setIsStopping(true);
        if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }
        setIsTracking(false);

        const trackedDistance = distanceRef.current;
        const trackedDuration = startTimeRef.current ? (new Date().getTime() - startTimeRef.current.getTime()) / 60000 : 0; // in minutes

        if (!user || !firestore || !trackedVehicleId || trackedDistance <= 0.01) { // Min threshold 10 meters
            resetTrackingState();
            setIsStopping(false);
            if (trackedDistance > 0) toast({ title: 'Sessione troppo breve', description: 'Nessun dato salvato.' });
            return;
        }

        toast({ title: 'Salvataggio sessione...', description: `Distanza: ${trackedDistance.toFixed(2)} km` });

        try {
            const batch = writeBatch(firestore);
            const vehicleRef = doc(firestore, `users/${user.uid}/vehicles`, trackedVehicleId);

            // 1. Create a new TrackingSession
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
            
            // 2. Update the vehicle's total mileage
            batch.update(vehicleRef, {
                currentMileage: increment(trackedDistance)
            });

            // 3. Update or create DailyStatistics
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize to start of day UTC
            const dailyStatId = today.toISOString().split('T')[0].replace(/-/g, '');
            const dailyStatRef = doc(collection(vehicleRef, 'dailyStatistics'), dailyStatId);

            const dailyStatSnap = await getDoc(dailyStatRef);

            if (dailyStatSnap.exists()) {
                batch.update(dailyStatRef, {
                    totalDistance: increment(trackedDistance),
                    totalTime: increment(trackedDuration),
                });
            } else {
                batch.set(dailyStatRef, {
                    id: dailyStatId,
                    vehicleId: trackedVehicleId,
                    date: today.toISOString(),
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
        if ('permissions' in navigator) {
            navigator.permissions.query({ name: 'geolocation' }).then(result => {
                setPermissionStatus(result.state);
                result.onchange = () => setPermissionStatus(result.state);
            });
        } else {
             navigator.geolocation.getCurrentPosition(
                () => setPermissionStatus('granted'),
                () => setPermissionStatus('denied')
            );
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
    }), [permissionStatus, isTracking, isStopping, trackedVehicleId, setTrackedVehicleId, startTracking, stopTracking, switchTrackingTo, trackedVehicle, vehicles]);

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
