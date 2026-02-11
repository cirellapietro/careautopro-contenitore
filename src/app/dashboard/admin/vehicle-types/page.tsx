'use client';
import { useUser } from "@/firebase/auth/use-user";
import { useFirebase, useCollection, useMemoFirebase } from "@/firebase";
import { collection } from 'firebase/firestore';
import type { VehicleType } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AdminVehicleTypesPage() {
  const { user: currentUser, loading: userLoading } = useUser();
  const { firestore } = useFirebase();
  const router = useRouter();

  const vehicleTypesQuery = useMemoFirebase(() => {
    if (!firestore || currentUser?.role !== 'Amministratore') return null;
    return collection(firestore, 'vehicleTypes');
  }, [firestore, currentUser]);

  const { data: vehicleTypes, isLoading: vehicleTypesLoading } = useCollection<VehicleType>(vehicleTypesQuery);

  useEffect(() => {
    if (!userLoading && (!currentUser || currentUser.role !== 'Amministratore')) {
      router.push('/dashboard');
    }
  }, [currentUser, userLoading, router]);

  if (userLoading || !currentUser || currentUser.role !== 'Amministratore') {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="font-headline text-3xl font-bold">Gestione Tipi Veicolo</h1>
                <p className="text-muted-foreground">Gestisci i tipi di veicolo e i relativi piani di manutenzione.</p>
            </div>
            <Button onClick={() => router.push('/dashboard/admin/vehicle-types/new')}>
                <PlusCircle className="mr-2 h-4 w-4" /> Aggiungi Tipo
            </Button>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Elenco Tipi Veicolo</CardTitle>
          <CardDescription>
            Visualizza e gestisci i tipi di veicolo disponibili nell'applicazione.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {vehicleTypesLoading && !vehicleTypes ? (
             <div className="flex h-48 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
             </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Chilometraggio Medio Annuo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicleTypes && vehicleTypes.map(vt => (
                  <TableRow 
                    key={vt.id}
                    className="cursor-pointer"
                    onClick={() => router.push(`/dashboard/admin/vehicle-types/${vt.id}`)}
                  >
                    <TableCell className="font-medium">{vt.name}</TableCell>
                    <TableCell>{vt.averageAnnualMileage.toLocaleString('it-IT')} km</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
