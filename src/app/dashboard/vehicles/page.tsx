'use client';

import { useState, useEffect } from 'react';
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
import { useFirebase } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { Vehicle, DailyStat } from '@/lib/types';

type VehicleWithStats = Vehicle & {
    dailyKms: number;
    dailyTime: number;
    isAverage: boolean;
};

export default function VehiclesPage() {
    const { user } = useUser();
    const { firestore } = useFirebase();
    const [vehicles, setVehicles] = useState<VehicleWithStats[]>([]);
    const [loading, setLoading] = useState(true);
    const [trackedVehicleId, setTrackedVehicleId] = useState<string | null>(null);

    useEffect(() => {
        if (!user || !firestore) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                // 1. Fetch vehicles
                const vehiclesRef = collection(firestore, `users/${user.uid}/vehicles`);
                const vehiclesSnap = await getDocs(vehiclesRef);
                const userVehicles = vehiclesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Vehicle));

                if (userVehicles.length > 0 && trackedVehicleId === null) {
                    setTrackedVehicleId(userVehicles[0].id);
                }
                
                const today = new Date().toISOString().split('T')[0];
                const vehiclesWithStats: VehicleWithStats[] = [];

                // 2. For each vehicle, fetch stats and calculate display values
                for (const vehicle of userVehicles) {
                    const statsRef = collection(firestore, `users/${user.uid}/vehicles/${vehicle.id}/dailyStatistics`);
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
                    vehiclesWithStats.push({ ...vehicle, dailyKms, dailyTime, isAverage });
                }

                setVehicles(vehiclesWithStats);

            } catch (error) {
                console.error("Error fetching vehicles data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, firestore, trackedVehicleId]); 

    const handleTrackingChange = (vehicleId: string, isChecked: boolean) => {
        if (isChecked) {
            setTrackedVehicleId(vehicleId);
        } else {
            if (trackedVehicleId === vehicleId) {
                setTrackedVehicleId(null);
            }
        }
    };
    
    if (loading) {
        return (
            <div className="flex min-h-[400px] w-full flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Caricamento veicoli...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="font-headline text-3xl font-bold">I Miei Veicoli</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Aggiungi Veicolo
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Elenco Veicoli</CardTitle>
                    <CardDescription>Gestisci i tuoi veicoli e le relative impostazioni di tracciamento. Puoi tracciare un solo veicolo alla volta.</CardDescription>
                </CardHeader>
                <CardContent>
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
                            {vehicles.length > 0 ? vehicles.map((vehicle) => (
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
                                    <TableCell colSpan={6} className="text-center">Nessun veicolo trovato. Aggiungine uno per iniziare.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
