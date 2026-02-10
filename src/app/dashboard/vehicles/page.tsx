import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockVehicles } from '@/lib/mock-data';
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

export default function VehiclesPage() {
  const vehicles = mockVehicles;

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
            <CardDescription>Gestisci i tuoi veicoli e le relative impostazioni di tracciamento.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[250px]">Veicolo</TableHead>
                        <TableHead>Targa</TableHead>
                        <TableHead>Anno</TableHead>
                        <TableHead className="text-center">Tracking GPS</TableHead>
                        <TableHead className="text-right">Azioni</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vehicles.map((vehicle) => (
                        <TableRow key={vehicle.id}>
                            <TableCell>
                                <div className="font-medium">{vehicle.name}</div>
                                <div className="text-sm text-muted-foreground">{vehicle.make} {vehicle.model}</div>
                            </TableCell>
                            <TableCell>{vehicle.licensePlate}</TableCell>
                            <TableCell>{vehicle.year}</TableCell>
                            <TableCell className="text-center">
                                <Switch
                                    id={`gps-switch-${vehicle.id}`}
                                    defaultChecked={vehicle.id !== '3'} // Example: Tesla has it off by default
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
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
