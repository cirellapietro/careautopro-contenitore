import { StatsCards } from "@/components/dashboard/stats-cards";
import { DailyUsageChart } from "@/components/dashboard/daily-usage-chart";
import { HourlyBreakdownChart } from "@/components/dashboard/hourly-breakdown-chart";
import { mockDailyStats, mockHourlyBreakdown, mockInterventions, mockDrivingSessions } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function StatisticsPage() {
    const totalKm = mockDailyStats.reduce((acc, stat) => acc + stat.distance, 0);
    const totalMinutes = mockDailyStats.reduce((acc, stat) => acc + stat.duration, 0);
    const totalHours = totalMinutes / 60;
    const pendingInterventions = mockInterventions.filter(i => i.status === 'Richiesto').length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-headline text-3xl font-bold">Statistiche</h1>
                <p className="text-muted-foreground">Panoramica del tuo utilizzo e dei tuoi veicoli.</p>
            </div>
            <StatsCards totalKm={totalKm} totalHours={totalHours} pendingInterventions={pendingInterventions} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    <DailyUsageChart data={mockDailyStats} />
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
                            {mockDrivingSessions.map(session => (
                                <TableRow key={session.id}>
                                    <TableCell>
                                        <Badge variant="outline">{session.vehicleId === '1' ? 'Berlina Blu' : 'SUV Bianco'}</Badge>
                                    </TableCell>
                                    <TableCell>{new Date(session.startTime).toLocaleString('it-IT')}</TableCell>
                                    <TableCell>{session.distance} km</TableCell>
                                    <TableCell>{session.duration} min</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
