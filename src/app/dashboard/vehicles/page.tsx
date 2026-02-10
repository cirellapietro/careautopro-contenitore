'use client';

import { useState, useEffect, useMemo } from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';
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
import Link from 'next/link';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, useCollection } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { Vehicle, DailyStat } from '@/lib/types';
import { seedDatabase } from '@/lib/seed';
import { useToast } from '@/hooks/use-toast';
import { AddVehicleForm } from '@/components/dashboard/add-vehicle-form';

type VehicleWithStats = Vehicle & {
    dailyKms: number;
    dailyTime: number;
    isAverage: boolean;
};

export default function VehiclesPage() {
    const { user } = useUser();
    const { firestore } = useFirebase();
    const { toast } = useToast();
    
    const [vehiclesWithStats, setVehiclesWithStats] = useState<VehicleWithStats[]>([]);
    const [statsLoading, setStatsLoading] = useState(true);
    const [isSeeding, setIsSeeding] = useState(false);
    const [trackedVehicleId, setTrackedVehicleId] = useState<string | null>(null);
    const [isAddVehicleOpen, setAddVehicleOpen] = useState(false);

    const vehiclesQuery = useMemo(() => {
        if (!user || !firestore) return null;
        return collection(firestore, `users/${user.uid}/vehicles`);
    }, [user, firestore]);

    const { data: userVehicles, isLoading: vehiclesLoading } = useCollection<Vehicle>(vehiclesQuery as any);

    useEffect(() => {
        if (!userVehicles) {
            setStatsLoading(false);
            if (!vehiclesLoading) setVehiclesWithStats([]);
            return;
        };

        if (userVehicles.length > 0 && trackedVehicleId === null) {
            setTrackedVehicleId(userVehicles[0].id);
        } else if (userVehicles.length === 0) {
            setTrackedVehicleId(null);
        }

        const fetchStats = async () => {
            if (!firestore) return;
            setStatsLoading(true);
            try {
                const today = new Date().toISOString().split('T')[0];
                const processedVehicles: VehicleWithStats[] = [];

                for (const vehicle of userVehicles) {
                    const statsRef = collection(firestore, `users/${user!.uid}/vehicles/${vehicle.id}/dailyStatistics`);
                    const statsSnap = await getDocs(statsRef);
                    const dailyStats = statsSnap.docs.map(doc => doc.data() as DailyStat);

                    let dailyKms = 0;
                    let dailyTime = 0;
                    let isAverage = true;

                    if (vehicle.id === trackedVehicleId) {
                        const todayStat = dailyStats.find(stat => stat.date === today);
                        dailyKms = todayStat?.distance ?? 0;
                        dailyTime = todayStat?.duration ?? 0;
                        isAverage = false;
                    } else {
                        if (dailyStats.length > 0) {
                            const totalKms = dailyStats.reduce((sum, stat) => sum + stat.distance, 0);
                            const totalTime = dailyStats.reduce((sum, stat) => sum + stat.duration, 0);
                            dailyKms = totalKms / dailyStats.length;
                            dailyTime = totalTime / dailyStats.length;
                        }
                        isAverage = true;
                    }
                    processedVehicles.push({ ...vehicle, dailyKms, dailyTime, isAverage });
                }
                setVehiclesWithStats(processedVehicles);
            } catch (error) {
                 console.error("Error fetching vehicle stats:", error);
                toast({
                    variant: 'destructive',
                    title: 'Errore',
                    description: 'Impossibile caricare le statistiche dei veicoli.',
                });
            } finally {
                setStatsLoading(false);
            }
        };

        fetchStats();
    }, [user, firestore, userVehicles, trackedVehicleId, toast]);

    const handleTrackingChange = (vehicleId: string, isChecked: boolean) => {
        if (isChecked) {
            setTrackedVehicleId(vehicleId);
        } else {
            if (trackedVehicleId === vehicleId) {
                setTrackedVehicleId(null);
            }
        }
    };
    
    const handleSeedData = async () => {
        if (!user || !firestore) return;
        setIsSeeding(true);
        try {
            await seedDatabase(firestore, user.uid);
            toast({
                title: 'Successo',
                description: 'Dati di esempio caricati correttamente.',
            });
        } catch (error) {
            console.error("Error seeding data:", error);
            toast({
                variant: 'destructive',
                title: 'Errore',
                description: 'Impossibile caricare i dati di esempio.',
            });
        } finally {
            setIsSeeding(false);
        }
    };
    
    const loading = vehiclesLoading || statsLoading;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="font-headline text-3xl font-bold">I Miei Veicoli</h1>
                <Button onClick={() => setAddVehicleOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Aggiungi Veicolo
                </Button>
            </div>
             <AddVehicleForm open={isAddVehicleOpen} onOpenChange={setAddVehicleOpen} />
            <Card>
                <CardHeader>
                    <CardTitle>Elenco Veicoli</CardTitle>
                    <CardDescription>Gestisci i tuoi veicoli e le relative impostazioni di tracciamento. Puoi tracciare un solo veicolo alla volta.</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                         <div className="flex min-h-[200px] w-full flex-col items-center justify-center">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                            <p className="mt-4 text-muted-foreground">Caricamento veicoli...</p>
                        </div>
                    ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px]">Veicolo</TableHead>
                                <TableHead>Targa</TableHead>
                                <TableHead>Km giornalieri</TableHead>
                                <TableHead>Tempo giornaliero</TableHead>
                                <TableHead className="text-center">Tracking GPS</TableHead>
                                <TableHead className="text-right">Azioni</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vehiclesWithStats.length > 0 ? vehiclesWithStats.map((vehicle) => (
                                <TableRow key={vehicle.id}>
                                    <TableCell>
                                        <div className="font-medium">{vehicle.name}</div>
                                        <div className="text-sm text-muted-foreground">{vehicle.make} {vehicle.model}</div>
                                    </TableCell>
                                    <TableCell>{vehicle.licensePlate}</TableCell>
                                    <TableCell>
                                        {vehicle.dailyKms.toFixed(1)} km
                                        {vehicle.isAverage && <span className="text-xs text-muted-foreground ml-1">(media)</span>}
                                    </TableCell>
                                    <TableCell>
                                        {vehicle.dailyTime.toFixed(0)} min
                                        {vehicle.isAverage && <span className="text-xs text-muted-foreground ml-1">(media)</span>}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Switch
                                            id={`gps-switch-${vehicle.id}`}
                                            checked={trackedVehicleId === vehicle.id}
                                            onCheckedChange={(isChecked) => handleTrackingChange(vehicle.id, isChecked)}
                                            aria-label={`Attiva o disattiva il tracking GPS per ${vehicle.name}`}
                                        />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/dashboard/vehicles/${vehicle.id}`}>
                                                Gestisci
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-48 text-center">
                                        <h3 className="text-lg font-semibold">Nessun veicolo trovato</h3>
                                        <p className="text-muted-foreground mt-2">Inizia aggiungendo il tuo primo veicolo o usa i nostri dati di esempio.</p>
                                        <div className="mt-4 flex justify-center gap-4">
                                            <Button variant="outline" onClick={handleSeedData} disabled={isSeeding}>
                                                {isSeeding ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Caricamento...
                                                    </>
                                                ) : (
                                                    "Popola con dati di esempio"
                                                )}
                                            </Button>
                                             <Button onClick={() => setAddVehicleOpen(true)}>
                                                <PlusCircle className="mr-2 h-4 w-4" /> Aggiungi Veicolo
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

    