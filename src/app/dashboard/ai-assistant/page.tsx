'use client';

import React, { useState, useMemo } from 'react';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, useCollection } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { Vehicle } from '@/lib/types';
import { MaintenanceAdvisorForm } from '@/components/dashboard/maintenance-advisor-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sparkles, Car } from 'lucide-react';

export default function AIAssistantPage() {
  const { user } = useUser();
  const { firestore } = useFirebase();
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  const vehiclesQuery = useMemo(() => {
    if (!user || !firestore) return null;
    return query(collection(firestore, `users/${user.uid}/vehicles`), where('dataoraelimina', '==', null));
  }, [user, firestore]);

  const { data: vehicles, isLoading } = useCollection<Vehicle>(vehiclesQuery);

  const selectedVehicle = useMemo(() => {
    return vehicles?.find(v => v.id === selectedVehicleId) || null;
  }, [vehicles, selectedVehicleId]);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Caricamento assistente...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
          <Sparkles className="text-accent h-8 w-8" />
          Assistente Manutenzione AI
        </h1>
        <p className="text-muted-foreground">
          Ricevi consigli personalizzati sulla salute del tuo veicolo utilizzando l'intelligenza artificiale di Google Gemini.
        </p>
      </div>

      {!vehicles || vehicles.length === 0 ? (
        <Card className="py-12">
          <CardContent className="flex flex-col items-center text-center">
            <div className="bg-muted p-4 rounded-full mb-4">
              <Car className="h-12 w-12 text-muted-foreground opacity-20" />
            </div>
            <CardTitle>Nessun veicolo trovato</CardTitle>
            <CardDescription className="max-w-sm mt-2">
              Aggiungi un veicolo nella sezione "Veicoli" per poter consultare l'assistente AI.
            </CardDescription>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Seleziona un Veicolo</CardTitle>
              <CardDescription>Scegli per quale dei tuoi mezzi vuoi richiedere un'analisi predittiva.</CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedVehicleId} value={selectedVehicleId || undefined}>
                <SelectTrigger className="w-full md:max-w-md">
                  <SelectValue placeholder="Scegli un veicolo..." />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.name} ({v.make} {v.model})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {selectedVehicle ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <MaintenanceAdvisorForm vehicle={selectedVehicle} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-xl">
              <Sparkles className="h-12 w-12 mb-4 opacity-10" />
              <p>Seleziona un veicolo per iniziare l'analisi</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
