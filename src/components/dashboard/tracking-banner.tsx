
'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, Car, Info } from 'lucide-react';
import { useTracking } from '@/contexts/tracking-context';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { UpdateMileageDialog } from './update-mileage-dialog';
import { useLanguage } from '@/contexts/language-context';

export function TrackingBanner() {
  const { permissionStatus, vehicles, isTracking } = useTracking();
  const { t } = useLanguage();
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const hideMileage = localStorage.getItem('hideMileagePrompt') === 'true';
    if (hideMileage) {
        setShouldShow(false);
        return;
    }


export function TrackingBanner() {
  const { permissionStatus, vehicles, isTracking } = useTracking();
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);

  // All'accesso, se l'utente ha veicoli e non è in corso un tracciamento, 
  // chiediamo di aggiornare i chilometri reali se non è già stato chiesto oggi.
  useEffect(() => {
    if (vehicles.length > 0 && !isTracking) {
        const today = new Date().toISOString().split('T')[0];
        const lastPrompt = localStorage.getItem('lastMileagePromptDate');
        
        if (lastPrompt !== today) {
            setShouldShow(true);
            setUpdateDialogOpen(true);
            localStorage.setItem('lastMileagePromptDate', today);
        } else {
            setShouldShow(true);
            setUpdateDialogOpen(true);
            localStorage.setItem('lastMileagePromptDate', today);
        }
    }
  }, [vehicles, isTracking]);

  if (isTracking || !shouldShow) {
  if (isTracking) {
      return null;
  }

  if (permissionStatus === 'denied') {
    return (
      <>
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="uppercase font-black italic">TRACCIAMENTO GPS DISATTIVATO</AlertTitle>
          <AlertDescription className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <span className="text-[10px] font-bold uppercase leading-relaxed text-white">
          <AlertTitle>Tracciamento GPS disattivato</AlertTitle>
          <AlertDescription className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <span>
              Per un calcolo automatico dei chilometri, abilita i permessi di geolocalizzazione. 
              Aggiorna manualmente i dati per mantenere le scadenze corrette.
            </span>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 md:mt-0 shrink-0 border-white text-white hover:bg-white hover:text-destructive font-black uppercase h-10 px-6"
              onClick={() => setUpdateDialogOpen(true)}
            >
              {t('update_mileage')}
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

  return (
    <>
      <Alert className="mb-6 bg-primary/5 border-primary/20">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle className="text-primary font-black uppercase italic">BENVENUTO IN CAREAUTOPRO!</AlertTitle>
        <AlertDescription className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <span className="text-muted-foreground text-[10px] font-bold uppercase leading-relaxed">
        <AlertTitle className="text-primary font-bold">Benvenuto in CareAutoPro!</AlertTitle>
        <AlertDescription className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <span className="text-muted-foreground">
            Per avere statistiche e avvisi precisi, ricordati di aggiornare i chilometri reali segnati sul tachimetro dei tuoi veicoli.
          </span>
          <Button
            variant="default"
            size="sm"
            className="mt-2 md:mt-0 shrink-0 font-black uppercase h-10 px-6 shadow-md"
            onClick={() => setUpdateDialogOpen(true)}
          >
            <Car className="mr-2 h-4 w-4" /> {t('update_mileage')}
            className="mt-2 md:mt-0 shrink-0"
            onClick={() => setUpdateDialogOpen(true)}
          >
            <Car className="mr-2 h-4 w-4" /> Aggiorna Tachimetro
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
