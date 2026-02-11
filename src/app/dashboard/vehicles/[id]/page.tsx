'use client';

import { useMemo } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { doc, collection, updateDoc } from 'firebase/firestore';
import Link from 'next/link';

import type { MaintenanceIntervention, Vehicle } from '@/lib/types';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, useDoc, useCollection, useMemoFirebase } from '@/firebase';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import { MaintenanceAdvisorForm } from '@/components/dashboard/maintenance-advisor-form';
import { useToast } from '@/hooks/use-toast';


const getStatusBadge = (status: MaintenanceIntervention['status']) => {
    switch (status) {
        case 'Completato':
            return <Badge variant="default" className="bg-green-600 hover:bg-green-700">Completato</Badge>;
        case 'Pianificato':
            return <Badge variant="secondary">Pianificato</Badge>;
        case 'Richiesto':
            return <Badge variant="destructive">Richiesto</Badge>;
    }
}

function MaintenanceTable({ interventions, isLoading, vehicleId }: { interventions: MaintenanceIntervention[] | null, isLoading: boolean, vehicleId: string }) {
    const { firestore } = useFirebase();
    const { toast } = useToast();

    const handleMarkAsDone = (interventionId: string) => {
        if (!firestore || !vehicleId) return;

        const interventionRef = doc(firestore, `users/${(window as any).currentUserUid}/vehicles/${vehicleId}/maintenanceInterventions`, interventionId);
        updateDoc(interventionRef, {
            status: 'Completato',
            completionDate: new Date().toISOString(),
        }).then(() => {
            toast({ title: 'Successo!', description: 'Intervento segnato come completato.' });
        }).catch((error) => {
            console.error(error);
            toast({ variant: 'destructive', title: 'Errore', description: 'Impossibile aggiornare l\'intervento.' });
        })
    }
    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-48">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Interventi di Manutenzione</CardTitle>
                <CardDescription>Cronologia e interventi richiesti per questo veicolo.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Descrizione</TableHead>
                            <TableHead>Stato</TableHead>
                            <TableHead>Urgenza</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead className="text-right">Azioni</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {interventions && interventions.length > 0 ? interventions.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.description}</TableCell>
                                <TableCell>{getStatusBadge(item.status)}</TableCell>
                                <TableCell>{item.urgency}</TableCell>
                                <TableCell>{item.completionDate ? new Date(item.completionDate).toLocaleDateString('it-IT') : (item.scheduledDate ? new Date(item.scheduledDate).toLocaleDateString('it-IT') : 'N/D')}</TableCell>
                                <TableCell className="text-right">
                                    {item.status !== 'Completato' && <Button size="sm" onClick={() => handleMarkAsDone(item.id)}><CheckCircle className="mr-2 h-4 w-4" /> Segna come Fatto</Button>}
                                </TableCell>
                            </TableRow>
                        )) : (
                             <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    Nessun intervento trovato.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

function VehicleDetails({ vehicle }: { vehicle: Vehicle }) {
    return (
         <Card>
            <CardHeader>
                <CardTitle className="font-headline">Dettagli Veicolo</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground">Marca:</span> {vehicle.make}</div>
                    <div><span className="text-muted-foreground">Modello:</span> {vehicle.model}</div>
                    <div><span className="text-muted-foreground">Data Immatricolazione:</span> {new Date(vehicle.registrationDate).toLocaleDateString('it-IT')}</div>
                    <div><span className="text-muted-foreground">Targa:</span> {vehicle.licensePlate}</div>
                    <div><span className="text-muted-foreground">Tipo:</span> {vehicle.type}</div>
                    <div><span className="text-muted-foreground">Chilometraggio:</span> {vehicle.currentMileage.toLocaleString('it-IT')} km</div>
                    {vehicle.vin && <div><span className="text-muted-foreground">VIN:</span> {vehicle.vin}</div>}
                    <div><span className="text-muted-foreground">Ultima Manutenzione:</span> {new Date(vehicle.lastMaintenanceDate).toLocaleDateString('it-IT')}</div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { user, loading: userLoading } = useUser();
  const { firestore } = useFirebase();

  const vehicleRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    // This is a bit of a hack to pass the userId to the MaintenanceTable
    if (typeof window !== 'undefined') {
        (window as any).currentUserUid = user.uid;
    }
    return doc(firestore, `users/${user.uid}/vehicles`, id);
  }, [user, firestore, id]);

  const interventionsQuery = useMemoFirebase(() => {
    if (!vehicleRef) return null;
    return collection(vehicleRef, 'maintenanceInterventions');
  }, [vehicleRef]);

  const { data: vehicle, isLoading: vehicleLoading } = useDoc<Vehicle>(vehicleRef);
  const { data: interventions, isLoading: interventionsLoading } = useCollection<MaintenanceIntervention>(interventionsQuery);

  if (userLoading || vehicleLoading) {
      return (
          <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      );
  }

  if (!vehicle && !vehicleLoading) {
    notFound();
  }

  // This check is necessary because vehicle could be null
  if (!vehicle) {
      return (
        <div className="flex h-full items-center justify-center">
            <p>Veicolo non trovato.</p>
        </div>
      );
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard/vehicles" className="flex items-center gap-2 text-sm text-muted-foreground hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Torna all'elenco
      </Link>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {vehicle.imageUrl && (
            <div className="relative h-40 w-40 flex-shrink-0">
            <Image src={vehicle.imageUrl} alt={vehicle.name} fill className="rounded-lg object-cover" data-ai-hint={vehicle.imageHint || ''} />
            </div>
        )}
        <div>
          <h1 className="font-headline text-4xl font-bold">{vehicle.name}</h1>
          <p className="text-lg text-muted-foreground">{vehicle.make} {vehicle.model}</p>
        </div>
      </div>
      
      <Tabs defaultValue="maintenance">
        <TabsList>
          <TabsTrigger value="maintenance">Manutenzione</TabsTrigger>
          <TabsTrigger value="details">Dettagli</TabsTrigger>
          <TabsTrigger value="ai-advisor">Assistente AI</TabsTrigger>
        </TabsList>
        <TabsContent value="maintenance" className="mt-4">
            <MaintenanceTable interventions={interventions} isLoading={interventionsLoading} vehicleId={vehicle.id} />
        </TabsContent>
        <TabsContent value="details" className="mt-4">
            <VehicleDetails vehicle={vehicle} />
        </TabsContent>
        <TabsContent value="ai-advisor" className="mt-4">
            <MaintenanceAdvisorForm vehicle={vehicle} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
