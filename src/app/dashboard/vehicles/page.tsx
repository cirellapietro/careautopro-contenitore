'use client';

import React, { useState, useMemo } from 'react';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, useCollection } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { Vehicle } from '@/lib/types';
import { VehicleCard } from '@/components/dashboard/vehicle-card';
import { AddVehicleForm } from '@/components/dashboard/add-vehicle-form';
import { Button } from '@/components/ui/button';
import { Loader2, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function VehiclesPage() {
  const { user } = useUser();
  const { firestore } = useFirebase();
  const [isAddVehicleFormOpen, setAddVehicleFormOpen] = useState(false);

  const vehiclesQuery = useMemo(() => {
    if (!user || !firestore) return null;
    return query(collection(firestore, `users/${user.uid}/vehicles`), where('dataoraelimina', '==', null));
  }, [user, firestore]);

  const { data: vehicles, isLoading } = useCollection<Vehicle>(vehiclesQuery);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-2">Caricamento dati...</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline text-3xl font-bold">I Miei Veicoli</h1>
            <p className="text-muted-foreground">Gestisci tutti i tuoi veicoli in un unico posto.</p>
          </div>
          <Button onClick={() => setAddVehicleFormOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Aggiungi Veicolo
          </Button>
        </div>

        {vehicles && vehicles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <Card className="flex h-64 flex-col items-center justify-center text-center">
            <CardHeader>
              <CardTitle>Nessun veicolo trovato</CardTitle>
              <CardDescription>Non hai ancora aggiunto nessun veicolo. Inizia ora!</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setAddVehicleFormOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Aggiungi il tuo primo veicolo
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <AddVehicleForm open={isAddVehicleFormOpen} onOpenChange={setAddVehicleFormOpen} />
    </>
  );
}
