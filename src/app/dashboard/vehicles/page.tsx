'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { PlusCircle, Loader2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, useCollection, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, doc, getDocs, writeBatch, setDoc, updateDoc } from 'firebase/firestore';
import type { Vehicle, DailyStat } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { AddVehicleForm } from '@/components/dashboard/add-vehicle-form';
import { UpdateMileageDialog } from '@/components/dashboard/update-mileage-dialog';
import { calculateDistance, cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type VehicleWithStats = Vehicle & {
    dailyKms: number;
    dailyTime: number;
    isAverage: boolean;
};

export default function VehiclesPage() {
    const router = useRouter();
    const { user } = useUser();
    const { firestore } = useFirebase();
    const { toast } = useToast();
    
    const [vehiclesWithStats, setVehiclesWithStats] = useState<VehicleWithStats[]>([]);
    const [trackedVehicleId, setTrackedVehicleId] = useState<string | null>(null);
    const [isAddVehicleOpen, setAddVehicleOpen] = useState(false);
    const [isMileageModalOpen, setMileageModalOpen] = useState(false);
    
    const vehiclesWithStatsRef = useRef(vehiclesWithStats);
    useEffect(() => {
        vehiclesWithStatsRef.current = vehiclesWithStats;
    });
    
    const watchIdRef = useRef<number | null>(null);
    const lastPositionRef = useRef<GeolocationCoordinates | null>(null);
    const timeUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const vehiclesQuery = useMemo(() => {
        if (!user || !firestore) return null;
        return collection(firestore, `users/${user.uid}/vehicles`);
    }, [user, firestore]);

    const { data: userVehicles, isLoading: vehiclesLoading } = useCollection<Vehicle>(vehiclesQuery);

    useEffect(() => {
        const storedId = localStorage.getItem('trackedVehicleId');
        if (storedId) {
            setTrackedVehicleId(storedId);
        }
    }, []);

    useEffect(() => {
        const stopTracking = () => {
            if (watchIdRef.current && navigator.geolocation) {
                navigator.geolocation.clearWatch(watchIdRef.current);
                watchIdRef.current = null;
                lastPositionRef.current = null;
            }
             if (timeUpdateIntervalRef.current) {
                clearInterval(timeUpdateIntervalRef.current);
                timeUpdateIntervalRef.current = null;
            }
        };

        const finalSave = () => {
            const currentTrackedId = localStorage.getItem('trackedVehicleId');
            const vehicleToSave = vehiclesWithStatsRef.current.find(v => v.id === currentTrackedId);

            if (vehicleToSave && firestore && user) {
                const batch = writeBatch(firestore);
                    
                const vehicleRef = doc(firestore, `users/${user.uid}/vehicles`, vehicleToSave.id);
                batch.update(vehicleRef, { currentMileage: vehicleToSave.currentMileage });
                
                const today = new Date().toISOString().split('T')[0];
                const statRef = doc(firestore, `users/${user.uid}/vehicles/${vehicleToSave.id}/dailyStatistics`, today);
                const statData = {
                    vehicleId: vehicleToSave.id,
                    date: today,
                    distance: vehicleToSave.dailyKms,
                    duration: vehicleToSave.dailyTime
                };
                batch.set(statRef, statData, { merge: true });

                batch.commit().catch(serverError => {
                    const permissionError = new FirestorePermissionError({
                        path: statRef.path,
                        operation: 'write',
                        requestResourceData: {
                            vehicleUpdate: { currentMileage: vehicleToSave.currentMileage },
                            statUpdate: statData,
                        }
                    });
                    errorEmitter.emit('permission-error', permissionError);
                });
            }
        }

        if (trackedVehicleId) {
            if (!navigator.geolocation) {
                toast({
                    variant: 'destructive',
                    title: 'Errore GPS',
                    description: 'La geolocalizzazione non è supportata da questo browser.',
                });
                setTrackedVehicleId(null);
                localStorage.removeItem('trackedVehicleId');
                return;
            }

            const watchOptions: PositionOptions = { enableHighAccuracy: true };

            watchIdRef.current = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    if (lastPositionRef.current) {
                        const distanceIncrement = calculateDistance(
                            lastPositionRef.current.latitude,
                            lastPositionRef.current.longitude,
                            latitude,
                            longitude
                        );

                        setVehiclesWithStats(prevStats => 
                            prevStats.map(v => {
                                if (v.id === trackedVehicleId) {
                                    const newMileage = v.currentMileage + distanceIncrement;
                                    const newDailyKms = v.dailyKms + distanceIncrement;
                                    return { ...v, currentMileage: newMileage, dailyKms: newDailyKms, isAverage: false };
                                }
                                return v;
                            })
                        );
                    }
                    lastPositionRef.current = position.coords;
                },
                (error) => {
                    let errorMessage = "Impossibile ottenere la posizione.";
                    if (error.code === error.PERMISSION_DENIED) {
                        errorMessage = "Hai negato il permesso per la geolocalizzazione. Per usare questa funzione, abilitalo nelle impostazioni del browser.";
                    }
                    toast({
                        variant: 'destructive',
                        title: 'Errore GPS',
                        description: errorMessage,
                    });
                    setTrackedVehicleId(null);
                    localStorage.removeItem('trackedVehicleId');
                },
                watchOptions
            );

            timeUpdateIntervalRef.current = setInterval(() => {
                setVehiclesWithStats(prevStats =>
                    prevStats.map(v => {
                        if (v.id === trackedVehicleId) {
                            return { ...v, dailyTime: v.dailyTime + (1/60), isAverage: false }; // Increment by a fraction of a minute
                        }
                        return v;
                    })
                );
            }, 1000); 

        }

        const periodicSaveInterval = setInterval(() => {
            if (localStorage.getItem('trackedVehicleId')) {
                finalSave();
            }
        }, 10000); // Save every 10 seconds

        return () => {
            if (localStorage.getItem('trackedVehicleId')) {
                finalSave();
            }
            stopTracking();
            clearInterval(periodicSaveInterval);
        };
    }, [trackedVehicleId, user, firestore, toast]);


    useEffect(() => {
        if (userVehicles && userVehicles.length > 0) {
            const todayStr = new Date().toISOString().split('T')[0];
            const lastPromptDate = localStorage.getItem('mileagePromptLastShown');

            if (lastPromptDate !== todayStr && !localStorage.getItem('trackedVehicleId')) {
                const todayStart = new Date();
                todayStart.setHours(0, 0, 0, 0);

                const hasVehicleCreatedBeforeToday = userVehicles.some(vehicle => {
                    if (!vehicle.createdAt) return true; 
                    const createdAtDate = new Date(vehicle.createdAt);
                    return createdAtDate < todayStart;
                });

                if (hasVehicleCreatedBeforeToday) {
                    setMileageModalOpen(true);
                    localStorage.setItem('mileagePromptLastShown', todayStr);
                }
            }
        }
        
        const visibleUserVehicles = userVehicles?.filter(v => !v.dataoraelimina);
        
        if (!visibleUserVehicles) {
            setVehiclesWithStats([]);
            return;
        }
    
        const fetchStats = async () => {
            if (!firestore || !user) return;
            try {
                const processedVehicles: VehicleWithStats[] = await Promise.all(
                    visibleUserVehicles.map(async (vehicle) => {
                        const statsRef = collection(firestore, `users/${user.uid}/vehicles/${vehicle.id}/dailyStatistics`);
                        const statsSnap = await getDocs(statsRef);
                        const dailyStats = statsSnap.docs.map(doc => doc.data() as DailyStat);
    
                        let dailyKms = 0;
                        let dailyTime = 0;
                        let isAverage = true;
                        
                        const today = new Date().toISOString().split('T')[0];
                        const todayStat = dailyStats.find(s => s.date === today);

                        if (todayStat) {
                            dailyKms = todayStat.distance;
                            dailyTime = todayStat.duration;
                            isAverage = false;
                        } else if (dailyStats.length > 0) {
                            const totalKms = dailyStats.reduce((sum, stat) => sum + stat.distance, 0);
                            const totalTime = dailyStats.reduce((sum, stat) => sum + stat.duration, 0);
                            dailyKms = totalKms / dailyStats.length;
                            dailyTime = totalTime / dailyStats.length;
                        }
                        
                        return { ...vehicle, dailyKms, dailyTime, isAverage };
                    })
                );
                setVehiclesWithStats(processedVehicles);
            } catch (error) {
                const permissionError = new FirestorePermissionError({
                    path: `users/${user.uid}/vehicles/.../dailyStatistics`,
                    operation: 'list',
                    requestResourceData: { context: 'Failed to fetch vehicle daily stats.' }
                });
                errorEmitter.emit('permission-error', permissionError);
                toast({
                    variant: 'destructive',
                    title: 'Errore',
                    description: 'Impossibile caricare le statistiche dei veicoli.',
                });
            }
        };
    
        if (visibleUserVehicles.length > 0) {
            fetchStats();
        } else {
            setVehiclesWithStats([]);
        }
    }, [user, firestore, userVehicles, toast]);

    const handleTrackingChange = (vehicleId: string, isChecked: boolean) => {
        const previouslyTrackedId = trackedVehicleId;

        if (!isChecked && previouslyTrackedId === vehicleId) {
            const vehicle = vehiclesWithStats.find(v => v.id === vehicleId);
            if (vehicle && firestore && user) {
                const batch = writeBatch(firestore);
                const vehicleRef = doc(firestore, `users/${user.uid}/vehicles`, vehicleId);
                batch.update(vehicleRef, { currentMileage: vehicle.currentMileage });
                
                const today = new Date().toISOString().split('T')[0];
                const statRef = doc(firestore, `users/${user.uid}/vehicles/${vehicleId}/dailyStatistics`, today);
                const statData = {
                    vehicleId: vehicleId,
                    date: today,
                    distance: vehicle.dailyKms,
                    duration: vehicle.dailyTime
                };
                batch.set(statRef, statData, { merge: true });

                batch.commit()
                 .then(() => toast({ title: "Dati aggiornati!" }))
                 .catch(serverError => {
                    const permissionError = new FirestorePermissionError({
                        path: statRef.path,
                        operation: 'write',
                        requestResourceData: {
                           vehicleUpdate: { currentMileage: vehicle.currentMileage },
                           statUpdate: statData
                        },
                    });
                    errorEmitter.emit('permission-error', permissionError);
                    toast({ variant: 'destructive', title: 'Errore', description: 'Impossibile salvare i dati finali.'})
                });
            }
            setTrackedVehicleId(null);
            localStorage.removeItem('trackedVehicleId');
        } else if (isChecked) {
            if (previouslyTrackedId && previouslyTrackedId !== vehicleId) {
                const previousVehicle = vehiclesWithStats.find(v => v.id === previouslyTrackedId);
                 if (previousVehicle && firestore && user) {
                    const vehicleRef = doc(firestore, `users/${user.uid}/vehicles`, previouslyTrackedId);
                    const dataToUpdate = { currentMileage: previousVehicle.currentMileage };
                    updateDoc(vehicleRef, dataToUpdate)
                        .catch(serverError => {
                            const permissionError = new FirestorePermissionError({
                                path: vehicleRef.path,
                                operation: 'update',
                                requestResourceData: dataToUpdate
                            });
                            errorEmitter.emit('permission-error', permissionError);
                            toast({
                                variant: 'destructive',
                                title: 'Errore Salvataggio',
                                description: `Impossibile salvare i dati per il veicolo precedente.`
                            });
                        });
                }
            }
            setTrackedVehicleId(vehicleId);
            localStorage.setItem('trackedVehicleId', vehicleId);
             toast({
                title: `Tracking attivato per ${vehiclesWithStats.find(v => v.id === vehicleId)?.name}`,
                description: "Il browser chiederà il permesso di accedere alla tua posizione.",
            });
        }
    };
    
    const loading = vehiclesLoading;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="font-headline text-3xl font-bold">I Miei Veicoli</h1>
                <Button onClick={() => setAddVehicleOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Aggiungi Veicolo
                </Button>
            </div>
             <AddVehicleForm open={isAddVehicleOpen} onOpenChange={setAddVehicleOpen} />
             {userVehicles && <UpdateMileageDialog open={isMileageModalOpen} onOpenChange={setMileageModalOpen} vehicles={userVehicles} />}

            {loading ? (
                <div className="flex min-h-[200px] w-full flex-col items-center justify-center">
                   <Loader2 className="h-12 w-12 animate-spin text-primary" />
                   <p className="mt-4 text-muted-foreground">Caricamento veicoli...</p>
               </div>
            ) : vehiclesWithStats.length === 0 ? (
                 <Card>
                    <CardContent className="h-48 text-center flex flex-col items-center justify-center p-6">
                        <h3 className="text-lg font-semibold">Nessun veicolo trovato</h3>
                        <p className="text-muted-foreground mt-2 max-w-lg">Per ogni veicolo inserito, l'app genererà automaticamente un piano di manutenzione iniziale basato sul tipo di veicolo, includendo scadenze importanti come revisione e assicurazione, per aiutarti a creare il tuo storico di manutenzione.</p>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Elenco Veicoli</CardTitle>
                        <CardDescription className="flex items-start gap-2 pt-2">
                            <Info className="h-4 w-4 mt-1 flex-shrink-0 text-accent" />
                            <span>
                                Attiva il tracking per un veicolo per registrare il chilometraggio usando il GPS del tuo dispositivo.
                                Verrà registrata solo la distanza percorsa per aggiornare i dati del veicolo, non la tua posizione, nel pieno rispetto della tua privacy.
                            </span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Targa</TableHead>
                                <TableHead>Veicolo</TableHead>
                                <TableHead>Km attuali</TableHead>
                                <TableHead>Km oggi</TableHead>
                                <TableHead>Tempo oggi</TableHead>
                                <TableHead className="text-center">Tracking GPS</TableHead>
                                <TableHead>Tipo</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vehiclesWithStats.map((vehicle) => (
                                <TableRow 
                                    key={vehicle.id}
                                    className={cn("cursor-pointer", vehicle.dataoraelimina && 'text-muted-foreground opacity-50')}
                                    onClick={() => !vehicle.dataoraelimina && router.push(`/dashboard/vehicles/${vehicle.id}`)}
                                >
                                    <TableCell>{vehicle.licensePlate}</TableCell>
                                    <TableCell>
                                        <div className="font-medium">{vehicle.name}</div>
                                        {(vehicle.make || vehicle.model) && (
                                            <div className="text-sm text-muted-foreground">
                                                {[vehicle.make, vehicle.model].filter(Boolean).join(' ')}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>{vehicle.currentMileage.toLocaleString('it-IT', { maximumFractionDigits: 1 })} km</TableCell>
                                    <TableCell>
                                        {vehicle.dailyKms.toFixed(1)} km
                                        {vehicle.isAverage && trackedVehicleId !== vehicle.id && <span className="text-xs text-muted-foreground ml-1">(media)</span>}
                                    </TableCell>
                                    <TableCell>
                                        {vehicle.dailyTime.toFixed(0)} min
                                        {vehicle.isAverage && trackedVehicleId !== vehicle.id && <span className="text-xs text-muted-foreground ml-1">(media)</span>}
                                    </TableCell>
                                    <TableCell 
                                        className="text-center"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Switch
                                            id={`gps-switch-${vehicle.id}`}
                                            checked={trackedVehicleId === vehicle.id}
                                            onCheckedChange={(isChecked) => handleTrackingChange(vehicle.id, isChecked)}
                                            aria-label={`Attiva o disattiva il tracking GPS per ${vehicle.name}`}
                                            disabled={!!vehicle.dataoraelimina}
                                        />
                                    </TableCell>
                                    <TableCell>{vehicle.type}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    );

    
