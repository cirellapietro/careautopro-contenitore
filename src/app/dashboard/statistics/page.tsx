'use client';

import React, { useState, useEffect } from 'react';
import { StatsCards } from "@/components/dashboard/stats-cards";
import { DailyUsageChart } from "@/components/dashboard/daily-usage-chart";
import { HourlyBreakdownChart } from "@/components/dashboard/hourly-breakdown-chart";
import { mockHourlyBreakdown } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { DailyStat, DrivingSession, MaintenanceIntervention, Vehicle } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function StatisticsPage() {
    const { user } = useUser();
    const { firestore } = useFirebase();
    const [loading, setLoading] = useState(true);

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
                const vehiclesRef = collection(firestore, `users/${user.uid}/vehicles`);
                const vehiclesSnap = await getDocs(vehiclesRef);
                const vehicles = vehiclesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Vehicle[];
                
                const newVehicleMap = new Map(vehicles.map(v => [v.id, v.name]));
                setVehicleMap(newVehicleMap);

                let allDailyStats: DailyStat[] = [];
                let allInterventions: MaintenanceIntervention[] = [];
                let allDrivingSessions: DrivingSession[] = [];

                for (const vehicle of vehicles) {
                    const dailyStatsRef = collection(firestore, `users/${user.uid}/vehicles/${vehicle.id}/dailyStatistics`);
                    const dailyStatsSnap = await getDocs(dailyStatsRef);
                    dailyStatsSnap.forEach(doc => {
                        allDailyStats.push(doc.data() as DailyStat);
                    });

                    const interventionsRef = collection(firestore, `users/${user.uid}/vehicles/${vehicle.id}/maintenanceInterventions`);
                    const interventionsSnap = await getDocs(interventionsRef);
                    interventionsSnap.forEach(doc => {
                        allInterventions.push({ id: doc.id, ...doc.data() } as MaintenanceIntervention);
                    });

                    const sessionsRef = collection(firestore, `users/${user.uid}/vehicles/${vehicle.id}/trackingSessions`);
                    const sessionsSnap = await getDocs(sessionsRef);
                    sessionsSnap.forEach(doc => {
                        allDrivingSessions.push({ id: doc.id, ...doc.data() } as DrivingSession);
                    });
                }

                // Aggregate daily stats by date
                const aggregatedDailyStatsMap = new Map<string, DailyStat>();
                allDailyStats.forEach(stat => {
                    const existing = aggregatedDailyStatsMap.get(stat.date);
                    if (existing) {
                        existing.distance += stat.distance;
                        existing.duration += stat.duration;
                    } else {
                        aggregatedDailyStatsMap.set(stat.date, { ...stat, date: stat.date });
                    }
                });
                const aggregatedDailyStats = Array.from(aggregatedDailyStatsMap.values()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                const last30DaysStats = aggregatedDailyStats.slice(-30);
                setDailyStats(last30DaysStats);

                const totalKm = last30DaysStats.reduce((acc, stat) => acc + stat.distance, 0);
                const totalMinutes = last30DaysStats.reduce((acc, stat) => acc + stat.duration, 0);
                
                setTotalKm(totalKm);
                setTotalHours(totalMinutes / 60);
                setPendingInterventions(allInterventions.filter(i => i.status === 'Richiesto').length);
                
                const sortedSessions = allDrivingSessions.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
                setDrivingSessions(sortedSessions.slice(0, 5));

            } catch (error) {
                console.error("Error fetching statistics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, firestore]);

    if (loading) {
        return (
            <div className="flex min-h-screen w-full flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Caricamento statistiche...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-headline text-3xl font-bold">Statistiche</h1>
                <p className="text-muted-foreground">Panoramica del tuo utilizzo e dei tuoi veicoli.</p>
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
                                    <TableCell>{new Date(session.startTime).toLocaleString('it-IT')}</TableCell>
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
