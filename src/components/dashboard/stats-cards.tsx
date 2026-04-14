import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Clock, Wrench } from "lucide-react";

type StatsCardsProps = {
    totalKm: number;
    totalHours: number;
    pendingInterventions: number;
}

export function StatsCards({ totalKm, totalHours, pendingInterventions }: StatsCardsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Km totali (ultimi 30gg)</CardTitle>
                    <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalKm.toLocaleString('it-IT')} km</div>
                    <p className="text-xs text-muted-foreground">Dati aggregati dai tuoi veicoli</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ore di guida (ultimi 30gg)</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalHours.toFixed(1)} ore</div>
                    <p className="text-xs text-muted-foreground">Tempo totale trascorso alla guida</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Interventi Richiesti</CardTitle>
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{pendingInterventions}</div>
                    <p className="text-xs text-muted-foreground">Manutenzioni da effettuare</p>
                </CardContent>
            </Card>
        </div>
    )
}
