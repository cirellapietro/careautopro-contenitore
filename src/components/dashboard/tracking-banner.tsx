'use client';

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useTracking } from '@/contexts/tracking-context';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { UpdateMileageDialog } from './update-mileage-dialog';

export function TrackingBanner() {
  const { permissionStatus, vehicles } = useTracking();
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);

  if (permissionStatus !== 'denied') {
    return null;
  }

  return (
    <>
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Tracciamento GPS disattivato</AlertTitle>
        <AlertDescription className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <span>
            Per un calcolo automatico dei chilometri, abilita i permessi di geolocalizzazione per questo sito.
            Nel frattempo, aggiorna manualmente i dati per mantenere le scadenze corrette.
          </span>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 md:mt-0 shrink-0 border-white text-white hover:bg-white hover:text-destructive"
            onClick={() => setUpdateDialogOpen(true)}
          >
            Aggiorna Chilometraggio
          </Button>
        </AlertDescription>
      </Alert>
      <UpdateMileageDialog 
        open={isUpdateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
        vehicles={vehicles}
      />
    </>
  );
}
