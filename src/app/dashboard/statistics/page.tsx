'use client';

import React, { useState, useEffect } from 'react';
import { StatsCards } from "@/components/dashboard/stats-cards";
import { DailyUsageChart } from "@/components/dashboard/daily-usage-chart";
import { HourlyBreakdownChart } from "@/components/dashboard/hourly-breakdown-chart";
import { mockHourlyBreakdown } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore';
import type { DailyStat, DrivingSession, MaintenanceIntervention, Vehicle } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function StatisticsPage() {
    const { user } = useUser();
    const { firestore } = useFirebase();
    const [loading, setLoading] = useState(true);
    const [selectedVehicleId, setSelectedVehicleId] = useState('all');

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [totalKm, setTotalKm] = useState(0);
    const [totalHours, setTotalHours] = useState(0);
    const [pendingInterventions, setPendingInterventions] = useState(0);
    const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
    const [drivingSessions, setDrivingSessions] = useState<DrivingSession[]>([]);
    const [vehicleMap, setVehicleMap] = useState<Map<string, string>>(new Map());

    useEffect(() => {
        if (!user || !firestore) return;

        const fetchData = async () => {
            setLoading(true);

            try {
                // Fetch all vehicles for the dropdown
                const vehiclesQuery = query(collection(firestore, `users/${user.uid}/vehicles`), where('dataoraelimina', '==', null));
                const vehiclesSnap = await getDocs(vehiclesQuery);
                const allUserVehicles = vehiclesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Vehicle);
                setVehicles(allUserVehicles);
                
                const newVehicleMap = new Map(allUserVehicles.map(v => [v.id, v.name || v.licensePlate || 'Veicolo Sconosciuto']));
                setVehicleMap(newVehicleMap);

                // Determine which vehicles to fetch stats for
                const vehiclesToProcess = selectedVehicleId === 'all' 
                    ? allUserVehicles 
                    : allUserVehicles.filter(v => v.id === selectedVehicleId);

                let rawDailyStats: DocumentData[] = [];
                let rawInterventions: DocumentData[] = [];
                let rawDrivingSessions: DocumentData[] = [];

                for (const vehicle of vehiclesToProcess) {
                    const dailyStatsQuery = query(collection(firestore, `users/${user.uid}/vehicles/${vehicle.id}/dailyStatistics`), where('dataoraelimina', '==', null));
                    const dailyStatsSnap = await getDocs(dailyStatsQuery);
                    dailyStatsSnap.forEach(doc => rawDailyStats.push(doc.data()));

                    const interventionsQuery = query(collection(firestore, `users/${user.uid}/vehicles/${vehicle.id}/maintenanceInterventions`), where('dataoraelimina', '==', null));
                    const interventionsSnap = await getDocs(interventionsQuery);
                    interventionsSnap.forEach(doc => rawInterventions.push({ id: doc.id, ...doc.data() }));

                    const sessionsQuery = query(collection(firestore, `users/${user.uid}/vehicles/${vehicle.id}/trackingSessions`), where('dataoraelimina', '==', null));
                    const sessionsSnap = await getDocs(sessionsQuery);
                    sessionsSnap.forEach(doc => rawDrivingSessions.push({ id: doc.id, ...doc.data() }));
                }
                
                // Sanitize all fetched data to prevent runtime errors from malformed documents
                const sanitizedDailyStats = rawDailyStats
                    .map(stat => ({
                        date: stat.date,
                        distance: Number(stat.distance) || 0,
                        duration: Number(stat.duration) || 0,
                        vehicleId: stat.vehicleId,
                    }))
                    .filter(stat => stat.date && !isNaN(new Date(stat.date).getTime())) as DailyStat[];
                
                const sanitizedInterventions = rawInterventions
                    .filter(i => i && i.status) as MaintenanceIntervention[];
                    
                const sanitizedSessions = rawDrivingSessions
                    .map(s => ({
                        id: s.id,
                        vehicleId: s.vehicleId,
                        startTime: s.startTime,
                        distance: Number(s.distance) || 0,
                        duration: Number(s.duration) || 0,
                        dataoraelimina: s.dataoraelimina
                    }))
                    .filter(s => s.id && s.vehicleId && s.startTime && !isNaN(new Date(s.startTime).getTime())) as DrivingSession[];


                // Aggregate daily stats if 'all' is selected
                const aggregatedDailyStats = selectedVehicleId === 'all'
                    ? Array.from(sanitizedDailyStats.reduce((map, stat) => {
                        const dateKey = new Date(stat.date).toISOString().split('T')[0];
                        const existing = map.get(dateKey);
                        if (existing) {
                            existing.distance += stat.distance;
                            existing.duration += stat.duration;
                        } else {
                            map.set(dateKey, { ...stat, date: dateKey });
                        }
                        return map;
                      }, new Map<string, DailyStat>()).values())
                    : sanitizedDailyStats;

                const sortedAggregatedStats = aggregatedDailyStats.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                const last30DaysStats = sortedAggregatedStats.slice(-30);
                setDailyStats(last30DaysStats);

                const totalKm = last30DaysStats.reduce((acc, stat) => acc + stat.distance, 0);
                const totalMinutes = last30DaysStats.reduce((acc, stat) => acc + stat.duration, 0);
                
                setTotalKm(totalKm);
                setTotalHours(totalMinutes / 60);
                setPendingInterventions(sanitizedInterventions.filter(i => i.status === 'Richiesto').length);
                
                const sortedSessions = sanitizedSessions.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
                setDrivingSessions(sortedSessions.slice(0, 5));

            } catch (error) {
                const permissionError = new FirestorePermissionError({
                    path: `users/${user.uid}/ (sub-collections)`,
                    operation: 'list',
                    requestResourceData: { context: 'Failed to fetch statistics data. Check permissions for vehicles and its sub-collections.' }
                });
                errorEmitter.emit('permission-error', permissionError);
                console.error("Error fetching statistics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, firestore, selectedVehicleId]);

    if (loading) {
        return (
            <div className="flex h-[60vh] w-full flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Caricamento statistiche...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="font-headline text-3xl font-bold">Statistiche</h1>
                    <p className="text-muted-foreground">Panoramica del tuo utilizzo e dei tuoi veicoli.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-full md:w-64">
                        <Select onValueChange={setSelectedVehicleId} defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Seleziona un veicolo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tutti i veicoli</SelectItem>
                            {vehicles.map((vehicle) => (
                                <SelectItem key={vehicle.id} value={vehicle.id}>
                                    {vehicle.name || vehicle.licensePlate || 'Veicolo Sconosciuto'}
                                </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <StatsCards totalKm={totalKm} totalHours={totalHours} pendingInterventions={pendingInterventions} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    <DailyUsageChart data={dailyStats} />
                </div>
                <div className="lg:col-span-3">
                    <HourlyBreakdownChart data={mockHourlyBreakdown} />
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Ultime Sessioni di Guida</CardTitle>
                    <CardDescription>Dettaglio degli ultimi viaggi effettuati.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Veicolo</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead>Distanza</TableHead>
                                <TableHead>Durata</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {drivingSessions.length > 0 ? drivingSessions.map(session => (
                                <TableRow key={session.id}>
                                    <TableCell>
                                        <Badge variant="outline">{vehicleMap.get(session.vehicleId) || 'Sconosciuto'}</Badge>
                                    </TableCell>
                                    <TableCell>{session.startTime ? new Date(session.startTime).toLocaleString('it-IT') : 'N/D'}</TableCell>
                                    <TableCell>{session.distance} km</TableCell>
                                    <TableCell>{session.duration} min</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">Nessuna sessione di guida trovata.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
