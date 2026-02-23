'use client';

import { useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { doc, collection, query, where } from 'firebase/firestore';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, useDoc, useCollection } from '@/firebase';
import type { Vehicle, MaintenanceIntervention } from '@/lib/types';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { MaintenanceAdvisorForm } from '@/components/dashboard/maintenance-advisor-form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

function InterventionsList({ vehicleId }: { vehicleId: string }) {
  const { user } = useUser();
  const { firestore } = useFirebase();

  const interventionsQuery = useMemo(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, `users/${user.uid}/vehicles/${vehicleId}/maintenanceInterventions`),
      where('dataoraelimina', '==', null)
    );
  }, [user, firestore, vehicleId]);

  const { data: interventions, isLoading } = useCollection<MaintenanceIntervention>(interventionsQuery);

  if (isLoading) {
    return <div className="flex items-center justify-center p-4"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Caricamento interventi...</div>;
  }
  
  if (!interventions || interventions.length === 0) {
      return <p className="text-muted-foreground p-4 text-center">Nessun intervento di manutenzione trovato.</p>
  }

  const getUrgencyColor = (urgency: 'Alta' | 'Media' | 'Bassa') => {
      switch (urgency) {
          case 'Alta': return 'bg-destructive';
          case 'Media': return 'bg-yellow-500';
          case 'Bassa': return 'bg-green-500';
          default: return 'bg-gray-400';
      }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Descrizione</TableHead>
          <TableHead>Stato</TableHead>
          <TableHead>Urgenza</TableHead>
          <TableHead>Data Pianificata</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {interventions.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.description}</TableCell>
            <TableCell>
              <Badge variant={item.status === 'Completato' ? 'secondary' : 'default'}>{item.status}</Badge>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${getUrgencyColor(item.urgency)}`}></span>
                    {item.urgency}
                </div>
            </TableCell>
            <TableCell>
              {item.scheduledDate && !isNaN(new Date(item.scheduledDate).getTime()) ? format(new Date(item.scheduledDate), 'dd MMM yyyy', { locale: it }) : 'N/D'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function VehicleDetailContent() {
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get('id');

  const { user } = useUser();
  const { firestore } = useFirebase();

  const vehicleRef = useMemo(() => {
    if (!user || !firestore || !vehicleId) return null;
    return doc(firestore, `users/${user.uid}/vehicles`, vehicleId);
  }, [user, firestore, vehicleId]);

  const { data: vehicle, isLoading } = useDoc<Vehicle>(vehicleRef);

  if (isLoading || !user || !vehicleId) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-2">Caricamento dati veicolo...</p>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="p-6 space-y-4">
        <Button variant="outline" asChild>
          <Link href="/dashboard/vehicles"><ArrowLeft className="mr-2 h-4 w-4" /> Indietro</Link>
        </Button>
        <h1 className="text-2xl font-bold">Veicolo non trovato</h1>
        <p className="text-muted-foreground">Il veicolo che stai cercando non esiste o non hai i permessi per vederlo.</p>
      </div>
    );
  }
  
  const registrationDateFormatted = vehicle.registrationDate && !isNaN(new Date(vehicle.registrationDate).getTime()) 
    ? format(new Date(vehicle.registrationDate), 'dd MMMM yyyy', { locale: it }) 
    : 'N/D';
    
  const lastMaintenanceDateFormatted = vehicle.lastMaintenanceDate && !isNaN(new Date(vehicle.lastMaintenanceDate).getTime())
    ? format(new Date(vehicle.lastMaintenanceDate), 'dd MMMM yyyy', { locale: it })
    : 'N/D';
    
  const currentMileageFormatted = (typeof vehicle.currentMileage === 'number' ? vehicle.currentMileage : 0).toLocaleString('it-IT');

  return (
    <div className="space-y-8">
      <div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/vehicles"><ArrowLeft className="mr-2 h-4 w-4" /> I Miei Veicoli</Link>
        </Button>
      </div>
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold">{vehicle.name}</h1>
        <p className="text-muted-foreground">{vehicle.make} {vehicle.model} - {vehicle.registrationDate ? new Date(vehicle.registrationDate).getFullYear() : 'N/D'}</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Dettagli Veicolo</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt className="text-muted-foreground">Targa</dt>
            <dd className="font-semibold">{vehicle.licensePlate}</dd>
            <dt className="text-muted-foreground">Tipo</dt>
            <dd>{vehicle.type}</dd>
            <dt className="text-muted-foreground">Immatricolazione</dt>
            <dd>{registrationDateFormatted}</dd>
            <dt className="text-muted-foreground">Chilometraggio</dt>
            <dd>{currentMileageFormatted} km</dd>
             <dt className="text-muted-foreground">Ultima Manutenzione</dt>
            <dd>{lastMaintenanceDateFormatted}</dd>
          </dl>
        </CardContent>
      </Card>
      
      <Card>
          <CardHeader>
            <CardTitle>Piano di Manutenzione</CardTitle>
            <CardDescription>Elenco degli interventi di manutenzione pianificati e completati.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <InterventionsList vehicleId={vehicle.id} />
          </CardContent>
      </Card>

      <MaintenanceAdvisorForm vehicle={vehicle} />
    </div>
  );
}


export default function VehicleDetailPage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <VehicleDetailContent />
    </Suspense>
  )
}
