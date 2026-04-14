'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo, useRef } from 'react';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, doc, writeBatch, increment, updateDoc, query, where, onSnapshot, collectionGroup } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { calculateDistance } from '@/lib/utils';
import type { Vehicle } from '@/lib/types';

type PermissionStatus = 'prompt' | 'granted' | 'denied';

interface TrackingContextType {
  permissionStatus: PermissionStatus;
  isTracking: boolean;
  isPaused: boolean;
  isStopping: boolean;
  isHotspotActive: boolean;
  setIsHotspotActive: (active: boolean) => void;
  trackedVehicleId: string | null;
  lastTrackedVehicleId: string | null;
  setTrackedVehicleId: (id: string | null) => void;
  startTracking: (vehicleIdOverride?: string, enableHotspot?: boolean) => void;
  stopTracking: () => Promise<void>;
  pauseTracking: () => void;
  resumeTracking: () => void;
  switchTrackingTo: (newVehicleId: string, enableHotspot?: boolean) => Promise<void>;
  trackedVehicle: Vehicle | null;
  vehicles: Vehicle[];
  sessionDistance: number; 
  sessionDuration: number; 
  liveSessionDistance: number; 
  dailyTotalDistance: number; 
  dailyTotalTime: number; 
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export function TrackingProvider({ children }: { children: ReactNode }) {
    const { user } = useUser();
    const { firestore } = useFirebase();
    const { toast } = useToast();

    const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('prompt');
    const [isTracking, setIsTracking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isStopping, setIsStopping] = useState(false);
    const [isHotspotActive, setIsHotspotActive] = useState(false);
    const [trackedVehicleId, _setTrackedVehicleId] = useState<string | null>(null);
    const [lastTrackedVehicleId, setLastTrackedVehicleId] = useState<string | null>(null);
    
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [activeVehicleData, setActiveVehicleData] = useState<Vehicle | null>(null);
    const [sessionDistance, setSessionDistance] = useState(0);
    const [sessionDuration, setSessionDuration] = useState(0);
    const [syncedDistance, setSyncedDistance] = useState(0);
    const [todayDbStats, setTodayDbStats] = useState<{ distance: number, time: number }>({ distance: 0, time: 0 });

    const watchIdRef = useRef<number | null>(null);
    const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastPositionRef = useRef<GeolocationCoordinates | null>(null);
    const distanceRef = useRef(0);
    const durationRef = useRef(0); 
    const syncedDistanceRef = useRef(0);
    const syncedTimeSecondsRef = useRef(0);

    useEffect(() => {
        if (!user || !firestore) return;

        const ownedPath = `users/${user.uid}/vehicles`;
        const ownedQuery = query(collection(firestore, ownedPath), where('dataoraelimina', '==', null));
        
        const unsubOwned = onSnapshot(ownedQuery, (snap) => {
            const owned = snap.docs.map(d => ({ ...d.data(), id: d.id } as Vehicle));
            setVehicles(prev => {
                const others = prev.filter(v => v.userId !== user.uid);
                const combined = [...owned];
                others.forEach(av => { if (!combined.find(cv => cv.id === av.id)) combined.push(av); });
                return combined;
            });
        });

        let unsubAssigned = () => {};
        if (user.email) {
            const assignedQuery = query(
                collectionGroup(firestore, 'vehicles'), 
                where('driverEmail', '==', user.email),
                where('dataoraelimina', '==', null)
            );

            unsubAssigned = onSnapshot(assignedQuery, (snap) => {
                const assigned = snap.docs.map(d => ({ ...d.data(), id: d.id } as Vehicle));
                setVehicles(prev => {
                    const combined = [...prev];
                    assigned.forEach(av => { if (!combined.find(cv => cv.id === av.id)) combined.push(av); });
                    return combined;
                });
            }, (error) => {
                console.warn("Assigned vehicles listener suppressed due to permission error.", error);
            });
        }

        return () => {
            unsubOwned();
            unsubAssigned();
        };
    }, [user, firestore]);

    useEffect(() => {
        if (!firestore || !trackedVehicleId) {
            setActiveVehicleData(null);
            return;
        }

        const found = vehicles.find(v => v.id === trackedVehicleId);
        if (found) {
            const docRef = doc(firestore, `users/${found.userId}/vehicles`, trackedVehicleId);
            const unsubscribe = onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    setActiveVehicleData({ ...docSnap.data(), id: docSnap.id } as Vehicle);
                }
            });
            return () => unsubscribe();
        }
    }, [firestore, trackedVehicleId, vehicles]);

    const trackedVehicle = useMemo(() => activeVehicleData || vehicles.find(v => v.id === trackedVehicleId) || null, [activeVehicleData, vehicles, trackedVehicleId]);

    useEffect(() => {
        if (!user || !firestore || !trackedVehicle) {
            setTodayDbStats({ distance: 0, time: 0 });
            return;
        }

        const todayId = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const dailyStatPath = `users/${trackedVehicle.userId}/vehicles/${trackedVehicle.id}/dailyStatistics/${todayId}`;
        const dailyStatRef = doc(firestore, dailyStatPath);

        const unsubscribe = onSnapshot(dailyStatRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setTodayDbStats({
                    distance: Number(data.totalDistance) || 0,
                    time: Number(data.totalTime) || 0
                });
            } else {
                setTodayDbStats({ distance: 0, time: 0 });
            }
        });

        return () => unsubscribe();
    }, [user, firestore, trackedVehicle]);

    useEffect(() => {
        if (user?.uid) {
            const userId = user.uid;
            const today = new Date().toDateString();
            const savedDay = localStorage.getItem(`lastActiveDay_${userId}`);
            const isTrackingSaved = localStorage.getItem(`isTracking_${userId}`) === 'true';
            
            if (savedDay && savedDay !== today && isTrackingSaved) {
                localStorage.removeItem(`sessionDistance_${userId}`);
                localStorage.removeItem(`sessionDuration_${userId}`);
                localStorage.removeItem(`syncedDistance_${userId}`);
                localStorage.removeItem(`syncedTimeSeconds_${userId}`);
                localStorage.removeItem(`isTracking_${userId}`);
                localStorage.removeItem(`isHotspotActive_${userId}`);
            } else {
                const savedId = localStorage.getItem(`trackedVehicleId_${userId}`);
                if (savedId) {
                    try { _setTrackedVehicleId(JSON.parse(savedId)); } catch { _setTrackedVehicleId(savedId); }
                }
                const savedLastId = localStorage.getItem(`lastTrackedVehicleId_${userId}`);
                if (savedLastId) setLastTrackedVehicleId(savedLastId);
                
                if (isTrackingSaved) setIsTracking(true);
                if (localStorage.getItem(`isPaused_${userId}`) === 'true') setIsPaused(true);
                if (localStorage.getItem(`isHotspotActive_${userId}`) === 'true') setIsHotspotActive(true);

                const distSaved = localStorage.getItem(`sessionDistance_${userId}`);
                if (distSaved) { distanceRef.current = parseFloat(distSaved); setSessionDistance(distanceRef.current); }
                
                const durSaved = localStorage.getItem(`sessionDuration_${userId}`);
                if (durSaved) { durationRef.current = parseInt(durSaved); setSessionDuration(durationRef.current); }

                const synDistSaved = localStorage.getItem(`syncedDistance_${userId}`);
                if (synDistSaved) { syncedDistanceRef.current = parseFloat(synDistSaved); setSyncedDistance(syncedDistanceRef.current); }

                const synTimeSaved = localStorage.getItem(`syncedTimeSeconds_${userId}`);
                if (synTimeSaved) { syncedTimeSecondsRef.current = parseInt(synTimeSaved); }
            }
            localStorage.setItem(`lastActiveDay_${userId}`, today);
        }
    }, [user?.uid]);

    const handleSetHotspotActive = (active: boolean) => {
        setIsHotspotActive(active);
        if (user?.uid) {
            localStorage.setItem(`isHotspotActive_${user.uid}`, active ? 'true' : 'false');
        }
    };

    const syncMileageToDb = useCallback(async (vId: string, ownerId: string, deltaKm: number, deltaSeconds: number) => {
        if (!firestore || (deltaKm <= 0 && deltaSeconds <= 0)) return;
        
        const vehiclePath = `users/${ownerId}/vehicles/${vId}`;
        const vehicleRef = doc(firestore, vehiclePath);
        const todayId = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const dailyStatPath = `users/${ownerId}/vehicles/${vId}/dailyStatistics/${todayId}`;
        const dailyStatRef = doc(firestore, dailyStatPath);

        const batch = writeBatch(firestore);
        const vehicleUpdateData = { currentMileage: increment(deltaKm), updatedAt: new Date().toISOString(), lastGpsIncrement: deltaKm };
        if (deltaKm > 0) batch.update(vehicleRef, vehicleUpdateData);
        
        const deltaMin = deltaSeconds / 60;
        const statUpdateData = {
            id: todayId, vehicleId: vId, date: new Date().toISOString(),
            totalDistance: increment(deltaKm), totalTime: increment(deltaMin), dataoraelimina: null
        };
        batch.set(dailyStatRef, statUpdateData, { merge: true });

        try {
            await batch.commit();
            syncedDistanceRef.current = distanceRef.current;
            syncedTimeSecondsRef.current = durationRef.current;
            setSyncedDistance(syncedDistanceRef.current);
            
            if (user?.uid) {
                localStorage.setItem(`syncedDistance_${user.uid}`, syncedDistanceRef.current.toString());
                localStorage.setItem(`syncedTimeSeconds_${user.uid}`, syncedTimeSecondsRef.current.toString());
            }
        } catch (error) {
            console.error("Sync failed:", error);
        }
    }, [firestore, user?.uid]);

    const startTracking = useCallback((id?: string, enableHotspot?: boolean) => {
        const targetId = id || trackedVehicleId;
        const v = vehicles.find(v => v.id === targetId);
        if (!v || !user || !firestore) return;
        
        distanceRef.current = 0; durationRef.current = 0; syncedDistanceRef.current = 0; syncedTimeSecondsRef.current = 0;
        setSessionDistance(0); setSessionDuration(0); setSyncedDistance(0);
        lastPositionRef.current = null; setIsPaused(false);

        localStorage.setItem(`isTracking_${user.uid}`, 'true');
        localStorage.setItem(`isHotspotActive_${user.uid}`, enableHotspot ? 'true' : 'false');
        localStorage.setItem(`trackedVehicleId_${user.uid}`, JSON.stringify(targetId));
        localStorage.setItem(`lastTrackedVehicleId_${user.uid}`, targetId!);
        
        const vehiclePath = `users/${v.userId}/vehicles/${targetId!}`;
        const vehicleRef = doc(firestore, vehiclePath);
        updateDoc(vehicleRef, { trackingGPS: true, lastGpsIncrement: 0, updatedAt: new Date().toISOString() });
        
        _setTrackedVehicleId(targetId);
        setIsTracking(true);
        setIsHotspotActive(!!enableHotspot);
    }, [trackedVehicleId, user, firestore, vehicles]);

    const stopTracking = useCallback(async () => {
        if (!user || !firestore || !trackedVehicle) {
            setIsTracking(false); return;
        }
        setIsStopping(true);
        const finalDist = distanceRef.current;
        const finalSecs = durationRef.current;
        const dKm = finalDist - syncedDistanceRef.current;
        const dSec = finalSecs - syncedTimeSecondsRef.current;

        try {
            if (dKm > 0 || dSec > 0) await syncMileageToDb(trackedVehicle.id, trackedVehicle.userId, Math.max(0, dKm), Math.max(0, dSec));
            const vehiclePath = `users/${trackedVehicle.userId}/vehicles/${trackedVehicle.id}`;
            const vehicleRef = doc(firestore, vehiclePath);
            await updateDoc(vehicleRef, { 
                trackingGPS: false, lastTrackedAt: new Date().toISOString(),
                lastTrackedDistance: finalDist, lastTrackedDuration: finalSecs, updatedAt: new Date().toISOString()
            });
            toast({ title: 'Viaggio Terminato', description: `Percorsi ${finalDist.toFixed(2)} km.` });
        } catch (error) {
            console.error("Stop tracking failed:", error);
        } finally {
            setIsTracking(false); setIsPaused(false); setIsHotspotActive(false);
            distanceRef.current = 0; durationRef.current = 0; setSessionDistance(0);
            localStorage.removeItem(`isTracking_${user.uid}`);
            localStorage.removeItem(`isHotspotActive_${user.uid}`);
            localStorage.removeItem(`syncedDistance_${user.uid}`);
            localStorage.removeItem(`syncedTimeSeconds_${user.uid}`);
            setIsStopping(false);
        }
    }, [user, firestore, trackedVehicle, syncMileageToDb, toast]);

    const pauseTracking = useCallback(() => {
        if (!trackedVehicle) return;
        setIsPaused(true);
        const dKm = distanceRef.current - syncedDistanceRef.current;
        const dSec = durationRef.current - syncedTimeSecondsRef.current;
        if (dKm > 0 || dSec > 0) syncMileageToDb(trackedVehicle.id, trackedVehicle.userId, dKm, dSec);
        if (user) localStorage.setItem(`isPaused_${user.uid}`, 'true');
    }, [trackedVehicle, syncMileageToDb, user]);

    const resumeTracking = useCallback(() => {
        setIsPaused(false);
        if (user) localStorage.setItem(`isPaused_${user.uid}`, 'false');
    }, [user]);

    const switchTrackingTo = useCallback(async (id: string, hotspot?: boolean) => {
        if (isTracking) await stopTracking();
        startTracking(id, hotspot);
    }, [isTracking, stopTracking, startTracking]);

    useEffect(() => {
        if (!isTracking || !trackedVehicle || permissionStatus === 'denied') return;

        durationIntervalRef.current = setInterval(() => {
            if (!isPaused) {
                durationRef.current += 1;
                setSessionDuration(durationRef.current);
                if (user) localStorage.setItem(`sessionDuration_${user.uid}`, durationRef.current.toString());
            }
        }, 1000);

        watchIdRef.current = navigator.geolocation.watchPosition(
            (pos) => {
                if (isPaused || pos.coords.accuracy > 100) return;
                if (!lastPositionRef.current) { lastPositionRef.current = pos.coords; return; }
                
                const d = calculateDistance(lastPositionRef.current.latitude, lastPositionRef.current.longitude, pos.coords.latitude, pos.coords.longitude);
                
                const timeDiffHours = 10 / 3600; 
                const speed = d / timeDiffHours;
                if (speed > 250) {
                    console.warn("Ignorato salto GPS anomalo:", d, "km in 10s");
                    return;
                }

                if (d > 0.01) {
                    distanceRef.current += d;
                    setSessionDistance(distanceRef.current);
                    if (user) localStorage.setItem(`sessionDistance_${user.uid}`, distanceRef.current.toString());
                    
                    if (distanceRef.current - syncedDistanceRef.current >= 0.1) {
                        syncMileageToDb(trackedVehicle.id, trackedVehicle.userId, distanceRef.current - syncedDistanceRef.current, durationRef.current - syncedTimeSecondsRef.current);
                    }
                    lastPositionRef.current = pos.coords;
                }
            },
            () => {},
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );

        return () => {
            if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
            if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
        };
    }, [isTracking, trackedVehicle, isPaused, permissionStatus, user, syncMileageToDb]);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'permissions' in navigator) {
            navigator.permissions.query({ name: 'geolocation' as any }).then(res => {
                setPermissionStatus(res.state as PermissionStatus);
                res.onchange = () => setPermissionStatus(res.state as PermissionStatus);
            });
        }
    }, []);

    const dailyTotalDistance = todayDbStats.distance + (sessionDistance - syncedDistance);
    const dailyTotalTime = todayDbStats.time + ((sessionDuration - syncedTimeSecondsRef.current) / 60);

    const value = useMemo(() => ({
        permissionStatus, isTracking, isPaused, isStopping, isHotspotActive, setIsHotspotActive: handleSetHotspotActive, trackedVehicleId, lastTrackedVehicleId, setTrackedVehicleId: _setTrackedVehicleId, startTracking, stopTracking, pauseTracking, resumeTracking, switchTrackingTo,
        trackedVehicle, vehicles, sessionDistance, sessionDuration, liveSessionDistance: Math.max(0, sessionDistance - syncedDistance), dailyTotalDistance, dailyTotalTime
    }), [permissionStatus, isTracking, isPaused, isStopping, isHotspotActive, trackedVehicleId, lastTrackedVehicleId, trackedVehicle, vehicles, sessionDistance, sessionDuration, syncedDistance, dailyTotalDistance, dailyTotalTime, startTracking, stopTracking, pauseTracking, resumeTracking, switchTrackingTo]);

    return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
}

export function useTracking() {
    const ctx = useContext(TrackingContext);
    if (!ctx) throw new Error('useTracking must be used within TrackingProvider');
    return ctx;
}
