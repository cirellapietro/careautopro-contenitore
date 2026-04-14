'use client';

import { useMemo, Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, collection, query, where, updateDoc, getDocs, getDoc, collectionGroup } from 'firebase/firestore';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, useDoc, useCollection, errorEmitter, FirestorePermissionError } from '@/firebase';
import { useLanguage } from '@/contexts/language-context';
import type { Vehicle, MaintenanceIntervention } from '@/lib/types';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Loader2, Plus, Pencil, Trash2, CheckCircle2, Wifi, Bluetooth, Settings2, Activity, AlertTriangle, Gauge, Info, Check, ShieldCheck } from 'lucide-react';
import { useMemo, Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { doc, collection, query, where, updateDoc } from 'firebase/firestore';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, useDoc, useCollection, errorEmitter, FirestorePermissionError } from '@/firebase';
import type { Vehicle, MaintenanceIntervention } from '@/lib/types';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2, Plus, Pencil, Trash2, CheckCircle2, Sparkles } from 'lucide-react';
import { MaintenanceAdvisorForm } from '@/components/dashboard/maintenance-advisor-form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { InterventionDialog } from '@/components/dashboard/intervention-dialog';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { TaxiStatus } from '@/components/dashboard/taxi-status';
import { EditVehicleForm } from '@/components/dashboard/edit-vehicle-form';

function AutomationSettings({ vehicle }: { vehicle: Vehicle }) {
    const { user } = useUser();
    const { firestore } = useFirebase();
    const { toast } = useToast();
    const { t } = useLanguage();
    const [isSaving, setIsSaving] = useState(false);
    const [isMockingBt, setIsMockingBt] = useState(false);

    const [hotspot, setHotspot] = useState(vehicle.autoHotspotEnabled || false);
    const [tracking, setTracking] = useState(vehicle.autoTrackingEnabled || false);
    const [btName, setBtName] = useState(vehicle.bluetoothDeviceName || '');
    const [ssid, setSsid] = useState(vehicle.hotspotSSID || '');

    useEffect(() => {
        setHotspot(vehicle.autoHotspotEnabled || false);
        setTracking(vehicle.autoTrackingEnabled || false);
        setBtName(vehicle.bluetoothDeviceName || '');
        setSsid(vehicle.hotspotSSID || '');
        
        const isCurrentlyMocked = localStorage.getItem(`simulated_bt_connected_${vehicle.id}`) === 'true';
        setIsMockingBt(isCurrentlyMocked);
    }, [vehicle]);

    const handleSave = async () => {
        if (!user || !firestore) return;
        setIsSaving(true);
        const docRef = doc(firestore, `users/${vehicle.userId}/vehicles`, vehicle.id);
        const data = {
            autoHotspotEnabled: hotspot,
            autoTrackingEnabled: tracking,
            bluetoothDeviceName: btName.toUpperCase(),
            hotspotSSID: ssid.toUpperCase()
        };

        try {
            await updateDoc(docRef, data);
            toast({ title: 'IMPOSTAZIONI SALVATE', description: 'LE AUTOMAZIONI BLUETOOTH SONO STATE AGGIORNATE.' });
        } catch (e) {
            errorEmitter.emit('permission-error', new FirestorePermissionError({
                path: docRef.path,
                operation: 'update',
                requestResourceData: data,
            }));
        } finally {
            setIsSaving(false);
        }
    };

    const toggleMockBluetooth = () => {
        const newState = !isMockingBt;
        setIsMockingBt(newState);
        localStorage.setItem(`simulated_bt_connected_${vehicle.id}`, newState ? 'true' : 'false');
        toast({ 
            title: newState ? 'BLUETOOTH VEICOLO CONNESSO' : 'BLUETOOTH VEICOLO SCOLLEGATO',
            description: newState ? "L'APP ORA REAGIRÀ COME SE FOSSI SALITO IN AUTO." : "L'AUTOMAZIONE NON SI ATTIVERÀ PIÙ."
        });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Bluetooth className="h-5 w-5 text-primary" />
                        <CardTitle>CONFIGURAZIONE BLUETOOTH</CardTitle>
                    </div>
                    <CardDescription>COLLEGA IL BLUETOOTH DELLA TUA AUTO PER ATTIVARE LE FUNZIONI INTELLIGENTI.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>NOME DISPOSITIVO BLUETOOTH</Label>
                        <div className="flex gap-2">
                            <Input 
                                className="uppercase font-bold"
                                placeholder="ES. MY-AUDI-BT"
                                value={btName}
                                onChange={(e) => setBtName(e.target.value.toUpperCase())}
                            />
                            <Button variant="outline" size="sm" onClick={() => setBtName(`${vehicle.make} BT`.toUpperCase())}>
                                TROVA
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-accent font-bold uppercase text-[10px] tracking-widest">{t('hotspot_ssid_label')}</Label>
                        <Input 
                            className="uppercase font-bold border-accent/30"
                            placeholder="IL NOME DEL TUO HOTSPOT..."
                            value={ssid}
                            onChange={(e) => setSsid(e.target.value.toUpperCase())}
                        />
                    </div>

                    <div className="pt-4 border-t space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">HOTSPOT WI-FI AUTOMATICO</Label>
                                <p className="text-xs text-muted-foreground uppercase">ATTIVA L'HOTSPOT DELLO SMARTPHONE NON APPENA RILEVI IL VEICOLO.</p>
                            </div>
                            <Switch checked={hotspot} onCheckedChange={setHotspot} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">TRACKING GPS AUTOMATICO</Label>
                                <p className="text-xs text-muted-foreground uppercase">AVVIA IL MONITORAGGIO CHILOMETRI NON APPENA RILEVI IL VEICOLO.</p>
                            </div>
                            <Switch checked={tracking} onCheckedChange={setTracking} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-4 bg-muted/10">
                    <Button variant="ghost" size="sm" onClick={toggleMockBluetooth} className={cn(isMockingBt && "text-green-600 font-bold")}>
                        <Activity className="mr-2 h-4 w-4" />
                        {isMockingBt ? "BT SIMULATO: ON" : "SIMULA CONNESSIONE BT"}
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        SALVA AUTOMAZIONI
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

function InterventionsList({ vehicleId, ownerId }: { vehicleId: string, ownerId: string }) {

function InterventionsList({ vehicleId }: { vehicleId: string }) {
  const { user } = useUser();
  const { firestore } = useFirebase();
  const { toast } = useToast();
  
  const [selectedIntervention, setSelectedIntervention] = useState<MaintenanceIntervention | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [interventionToDelete, setInterventionToDelete] = useState<MaintenanceIntervention | null>(null);

  const interventionsQuery = useMemo(() => {
    if (!firestore || !ownerId || !vehicleId) return null;
    return collection(firestore, `users/${ownerId}/vehicles/${vehicleId}/maintenanceInterventions`);
  }, [firestore, ownerId, vehicleId]);

  const { data: rawInterventions, isLoading } = useCollection<MaintenanceIntervention>(interventionsQuery);

  const interventions = useMemo(() => {
      if (!rawInterventions) return [];
      return [...rawInterventions]
        .filter(i => !i.dataoraelimina)
        .sort((a, b) => {
            const dateA = new Date(a.scheduledDate || a.completionDate || 0).getTime();
            const dateB = new Date(b.scheduledDate || b.completionDate || 0).getTime();
            return dateB - dateA;
        });
  }, [rawInterventions]);

  const handleDelete = () => {
    if (!firestore || !interventionToDelete) return;
    const docRef = doc(firestore, `users/${ownerId}/vehicles/${vehicleId}/maintenanceInterventions`, interventionToDelete.id);
    const dataToUpdate = { dataoraelimina: new Date().toISOString() };
    
    updateDoc(docRef, dataToUpdate).then(() => {
        toast({ title: 'INTERVENTO ELIMINATO' });
    }).catch(serverError => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: dataToUpdate,
        }));
    }).finally(() => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [interventionToDelete, setInterventionToDelete] = useState<MaintenanceIntervention | null>(null);

  const interventionsQuery = useMemo(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, `users/${user.uid}/vehicles/${vehicleId}/maintenanceInterventions`),
      where('dataoraelimina', '==', null)
    );
  }, [user, firestore, vehicleId]);

  const { data: interventions, isLoading } = useCollection<MaintenanceIntervention>(interventionsQuery);

  const handleDelete = () => {
    if (!user || !firestore || !interventionToDelete) return;
    const docRef = doc(firestore, `users/${user.uid}/vehicles/${vehicleId}/maintenanceInterventions`, interventionToDelete.id);
    const dataToUpdate = { dataoraelimina: new Date().toISOString() };
    
    updateDoc(docRef, dataToUpdate).then(() => {
        toast({ title: 'Intervento eliminato' });
    }).catch(serverError => {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: dataToUpdate,
        });
        errorEmitter.emit('permission-error', permissionError);
    }).finally(() => {
        setIsDeleteDialogOpen(false);
        setInterventionToDelete(null);
    });
  };

  const handleComplete = (intervention: MaintenanceIntervention) => {
    if (!firestore) return;
    const docRef = doc(firestore, `users/${ownerId}/vehicles/${vehicleId}/maintenanceInterventions`, intervention.id);
    const dataToUpdate = { 
        status: 'Completato' as const, 
    if (!user || !firestore) return;
    const docRef = doc(firestore, `users/${user.uid}/vehicles/${vehicleId}/maintenanceInterventions`, intervention.id);
    const dataToUpdate = { 
        status: 'Completato', 
        completionDate: new Date().toISOString().split('T')[0] 
    };
    
    updateDoc(docRef, dataToUpdate).then(() => {
        toast({ title: 'INTERVENTO COMPLETATO!' });
    }).catch(serverError => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: dataToUpdate,
        }));
        toast({ title: 'Intervento completato!' });
    }).catch(serverError => {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: dataToUpdate,
        });
        errorEmitter.emit('permission-error', permissionError);
    });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8 uppercase text-xs"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> CARICAMENTO INTERVENTI...</div>;
  }
    return <div className="flex items-center justify-center p-4"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Caricamento interventi...</div>;
  }
  
  const sortedInterventions = interventions?.sort((a, b) => {
      const dateA = new Date(a.scheduledDate || 0).getTime();
      const dateB = new Date(b.scheduledDate || 0).getTime();
      return dateB - dateA;
  });

  const getUrgencyColor = (urgency: string) => {
      switch (urgency) {
          case 'Alta': return 'bg-destructive';
          case 'Media': return 'bg-yellow-500';
          case 'Bassa': return 'bg-green-500';
          default: return 'bg-gray-400';
      }
  }

  return (
    <>
      <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">REGISTRO MANUTENZIONE</h3>
          <Button size="sm" onClick={() => { setSelectedIntervention(null); setIsDialogOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" /> AGGIUNGI
      <div className="flex justify-end p-4">
          <Button size="sm" onClick={() => { setSelectedIntervention(null); setIsDialogOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" /> Nuovo Intervento
          </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>INTERVENTO</TableHead>
            <TableHead>STATO</TableHead>
            <TableHead>URGENZA</TableHead>
            <TableHead>DATA</TableHead>
            <TableHead className="text-right">AZIONI</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interventions.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-12 text-muted-foreground uppercase text-xs">NESSUN INTERVENTO TROVATO.</TableCell></TableRow>
          ) : interventions.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium uppercase text-xs">
                  {item.description}
                  {item.notes && <p className="text-[10px] text-muted-foreground line-clamp-1 italic">{item.notes}</p>}
              </TableCell>
              <TableCell>
                <Badge variant={item.status === 'Completato' ? 'secondary' : (item.status === 'Richiesto' ? 'destructive' : 'default')}>
                    {item.status.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold">
            <TableHead>Descrizione</TableHead>
            <TableHead>Stato</TableHead>
            <TableHead>Urgenza</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Azioni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!sortedInterventions || sortedInterventions.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Nessun intervento trovato.</TableCell></TableRow>
          ) : sortedInterventions.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                  {item.description}
                  {item.notes && <p className="text-xs text-muted-foreground line-clamp-1">{item.notes}</p>}
              </TableCell>
              <TableCell>
                <Badge variant={item.status === 'Completato' ? 'secondary' : (item.status === 'Richiesto' ? 'destructive' : 'default')}>
                    {item.status}
                </Badge>
              </TableCell>
              <TableCell>
                  <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${getUrgencyColor(item.urgency || '')}`}></span>
                      {item.urgency}
                  </div>
              </TableCell>
              <TableCell className="text-xs">
              <TableCell>
                {item.status === 'Completato' 
                    ? (item.completionDate ? format(new Date(item.completionDate), 'dd MMM yyyy', { locale: it }) : 'N/D')
                    : (item.scheduledDate ? format(new Date(item.scheduledDate), 'dd MMM yyyy', { locale: it }) : 'N/D')
                }
              </TableCell>
              <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                      {item.status !== 'Completato' && (
                          <Button variant="ghost" size="icon" title="COMPLETA" onClick={() => handleComplete(item)}>
                          <Button variant="ghost" size="icon" title="Completa" onClick={() => handleComplete(item)}>
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                          </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => { setSelectedIntervention(item); setIsDialogOpen(true); }}>
                          <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setInterventionToDelete(item)}>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => { setInterventionToDelete(item); setIsDeleteDialogOpen(true); }}>
                          <Trash2 className="h-4 w-4" />
                      </Button>
                  </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isDialogOpen && (
          <InterventionDialog 
            open={isDialogOpen} 
            onOpenChange={setIsDialogOpen} 
            vehicleId={vehicleId} 
            intervention={selectedIntervention} 
          />
      )}

      <AlertDialog open={!!interventionToDelete} onOpenChange={(open) => !open && setInterventionToDelete(null)}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>SEI SICURO?</AlertDialogTitle>
                  <AlertDialogDescription className="uppercase text-xs">
                      QUESTA AZIONE ELIMINERÀ L'INTERVENTO "{interventionToDelete?.description}".
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>ANNULLA</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">ELIMINA</AlertDialogAction>
      <InterventionDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        vehicleId={vehicleId} 
        intervention={selectedIntervention} 
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
                  <AlertDialogDescription>
                      Questa azione eliminerà l'intervento "{interventionToDelete?.description}". Non potrai annullare questa operazione.
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>Annulla</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Elimina</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function VehicleDetailContent() {
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get('id');
  const router = useRouter();

  const { user } = useUser();
  const { firestore } = useFirebase();
  const { toast } = useToast();

  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if (!firestore || !vehicleId || !user) return;
      
      const fetchVehicle = async () => {
          setLoading(true);
          try {
              const directRef = doc(firestore, `users/${user.uid}/vehicles`, vehicleId);
              const directSnap = await getDoc(directRef);
              
              if (directSnap.exists()) {
                  const data = directSnap.data() as Vehicle;
                  if (!data.dataoraelimina) {
                      setVehicle({ ...data, id: directSnap.id });
                      setLoading(false);
                      return;
                  }
              }

              const q = query(collectionGroup(firestore, 'vehicles'), where('id', '==', vehicleId));
              const snap = await getDocs(q);
              
              if (!snap.empty) {
                  const data = snap.docs[0].data() as Vehicle;
                  if (!data.dataoraelimina) {
                      setVehicle({ ...data, id: snap.docs[0].id });
                  }
              }
          } catch (err: any) {
              if (err.code === 'permission-denied') {
                  errorEmitter.emit('permission-error', new FirestorePermissionError({
                      path: 'vehicles',
                      operation: 'list',
                      requestResourceData: { context: 'Fetching vehicle details by ID via collectionGroup fallback.' }
                  }));
              }
              console.error("Error fetching vehicle:", err);
          } finally {
              setLoading(false);
          }
      };
      
      fetchVehicle();
  }, [firestore, vehicleId, user]);

  const handleDeleteVehicle = async () => {
    if (!user || !firestore || !vehicleId || !vehicle) return;
    setIsDeleting(true);
    const docRef = doc(firestore, `users/${vehicle.userId}/vehicles`, vehicle.id);
    const dataToUpdate = { dataoraelimina: new Date().toISOString() };

    try {
        await updateDoc(docRef, dataToUpdate);
        toast({ title: 'VEICOLO ELIMINATO', description: 'IL VEICOLO È STATO RIMOSSO DALLA TUA LISTA.' });
        router.push('/dashboard/vehicles');
    } catch (e) {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: dataToUpdate,
        }));
    } finally {
        setIsDeleting(false);
        setShowDeleteConfirm(false);
    }
  };

  if (loading || !user || !vehicleId) {
    return (
      <div className="flex h-full items-center justify-center p-8 uppercase text-xs">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-2">CARICAMENTO DATI VEICOLO...</p>

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
          <Link href="/dashboard/vehicles" className="uppercase"><ArrowLeft className="mr-2 h-4 w-4" /> INDIETRO</Link>
        </Button>
        <h1 className="text-2xl font-bold uppercase">VEICOLO NON TROVATO</h1>
          <Link href="/dashboard/vehicles"><ArrowLeft className="mr-2 h-4 w-4" /> Indietro</Link>
        </Button>
        <h1 className="text-2xl font-bold">Veicolo non trovato</h1>
        <p className="text-muted-foreground">Il veicolo che stai cercando non esiste o non hai i permessi per vederlo.</p>
      </div>
    );
  }
  
  const isOwner = vehicle.userId === user.uid || user.role === 'Amministratore Sistema';
  const registrationDateFormatted = vehicle.registrationDate && !isNaN(new Date(vehicle.registrationDate).getTime()) 
    ? format(new Date(vehicle.registrationDate), 'dd MMMM yyyy', { locale: it }).toUpperCase()
    : 'N/D';
    
  const currentMileageFormatted = Math.round(typeof vehicle.currentMileage === 'number' ? vehicle.currentMileage : 0).toLocaleString('it-IT');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
                <Link href="/dashboard/vehicles"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div>
                <h1 className="font-headline text-2xl font-bold leading-none uppercase">{vehicle.name}</h1>
                <p className="text-xs text-muted-foreground mt-1 uppercase">{vehicle.make} {vehicle.model} • {vehicle.licensePlate}</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditFormOpen(true)} className="font-bold uppercase">
                <Pencil className="mr-2 h-4 w-4" /> MODIFICA DATI
            </Button>
            {isOwner && (
                <Button 
                    variant="destructive" 
                    size="sm" 
                    className="font-bold uppercase"
                    onClick={() => setShowDeleteConfirm(true)}
                >
                    <Trash2 className="mr-2 h-4 w-4" /> ELIMINA VEICOLO
                </Button>
            )}
        </div>
      </div>

      {/* BANNER ESPLICATIVO SEZIONI */}
      <Card className="bg-primary/5 border-dashed border-primary/30">
          <CardContent className="p-4 flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                  <ShieldCheck className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-primary tracking-tighter">Gestione Integrata del Veicolo</p>
                  <p className="text-[9px] font-bold uppercase text-muted-foreground leading-tight max-w-3xl">
                      Questa pagina è divisa in tre sezioni fondamentali per il controllo totale del tuo mezzo: 
                      <span className="text-foreground"> 1. MANUTENZIONE</span> (Registro scadenze e analisi predittiva IA), 
                      <span className="text-foreground"> 2. DETTAGLI</span> (Dati tecnici, targa e documenti legali), 
                      <span className="text-foreground"> 3. AUTOMAZIONI</span> (Configurazione Hotspot Wi-Fi e rilevamento Bluetooth).
                  </p>
              </div>
          </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-primary/5 border-primary/10">
                      <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2">
                              <Gauge className="h-3 w-3" /> CHILOMETRAGGIO
                          </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                          <p className="text-2xl font-black text-primary">{currentMileageFormatted} <span className="text-xs font-normal text-muted-foreground">KM</span></p>
                      </CardContent>
                  </Card>
                  <Card className="bg-primary/5 border-primary/10">
                      <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2">
                              <Activity className="h-3 w-3" /> ALIMENTAZIONE
                          </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                          <p className="text-lg font-bold uppercase">{vehicle.type}</p>
                      </CardContent>
                  </Card>
                  <Card className="bg-primary/5 border-primary/10">
                      <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2">
                              <Settings2 className="h-3 w-3" /> AUTOMAZIONE
                          </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                          <Badge variant={vehicle.autoTrackingEnabled ? "default" : "outline"} className="text-[10px] uppercase font-black">
                              {vehicle.autoTrackingEnabled ? "GPS AUTOMATICO ATTIVO" : "NESSUNA AUTOMAZIONE"}
                          </Badge>
                      </CardContent>
                  </Card>
              </div>

              <Tabs defaultValue="maintenance" className="w-full">
                <TabsList className="grid w-full max-w-[600px] grid-cols-3">
                    <TabsTrigger value="maintenance" className="uppercase text-[10px] font-black">MANUTENZIONE</TabsTrigger>
                    <TabsTrigger value="details" className="uppercase text-[10px] font-black">DETTAGLI</TabsTrigger>
                    <TabsTrigger value="automations" className="uppercase text-[10px] font-black">AUTOMAZIONI</TabsTrigger>
                </TabsList>

                <TabsContent value="maintenance" className="space-y-6 mt-4">
                    <Card>
                        <CardContent className="p-0">
                            <InterventionsList vehicleId={vehicle.id} ownerId={vehicle.userId} />
                        </CardContent>
                    </Card>
                    
                    <div className="pt-2">
                        <Button 
                            className="w-full h-12 font-black uppercase tracking-tight shadow-md"
                            onClick={() => router.push('/dashboard/vehicles')}
                        >
                            <Check className="mr-2 h-5 w-5" />
                            ACCETTA LE MANUTENZIONI INSERITE
                        </Button>
                    </div>

                    <MaintenanceAdvisorForm vehicle={vehicle} />
                </TabsContent>

                <TabsContent value="details" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase">SPECIFICHE TECNICHE</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="space-y-1 p-3 bg-muted/30 rounded-lg">
                                    <dt className="text-[10px] font-black uppercase text-muted-foreground">TARGA</dt>
                                    <dd className="font-black text-lg uppercase">{vehicle.licensePlate}</dd>
                                </div>
                                <div className="space-y-1 p-3 bg-muted/30 rounded-lg">
                                    <dt className="text-[10px] font-black uppercase text-muted-foreground">DATA IMMATRICOLAZIONE</dt>
                                    <dd className="font-bold uppercase">{registrationDateFormatted}</dd>
                                </div>
                                <div className="space-y-1 p-3 bg-muted/30 rounded-lg">
                                    <dt className="text-[10px] font-black uppercase text-muted-foreground">CHILOMETRI INIZIALI</dt>
                                    <dd className="font-bold uppercase">{currentMileageFormatted} KM</dd>
                                </div>
                                {vehicle.isTaxi && (
                                    <div className="space-y-4 p-3 bg-accent/10 border border-accent/20 rounded-lg md:col-span-2">
                                        <div>
                                            <dt className="text-[10px] font-black uppercase text-accent">USO VEICOLO</dt>
                                            <dd className="font-black text-accent uppercase">TAXI ROMA</dd>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-accent/20">
                                            <div className="space-y-1">
                                                <dt className="text-[9px] font-black uppercase text-muted-foreground">N. LICENZA</dt>
                                                <dd className="font-bold uppercase">{vehicle.licenseNumber || 'N/D'}</dd>
                                            </div>
                                            <div className="space-y-1">
                                                <dt className="text-[9px] font-black uppercase text-muted-foreground">TURNO</dt>
                                                <dd className="font-bold uppercase">{vehicle.shift || 'N/D'}</dd>
                                            </div>
                                            <div className="space-y-1">
                                                <dt className="text-[9px] font-black uppercase text-muted-foreground">SCADENZA LICENZA</dt>
                                                <dd className="font-bold uppercase text-destructive">
                                                    {vehicle.licenseExpirationDate ? format(new Date(vehicle.licenseExpirationDate), 'dd/MM/yyyy') : 'N/D'}
                                                </dd>
                                            </div>
                                            <div className="space-y-1">
                                                <dt className="text-[9px] font-black uppercase text-muted-foreground">ESENZIONE</dt>
                                                <dd className="font-bold uppercase">{vehicle.exemption || 'NESSUNA'}</dd>
                                            </div>
                                            {vehicle.exemptionExpirationDate && (
                                                <div className="space-y-1">
                                                    <dt className="text-[9px] font-black uppercase text-muted-foreground">SCADENZA ESENZIONE TURNO</dt>
                                                    <dd className="font-bold uppercase text-destructive">
                                                        {format(new Date(vehicle.exemptionExpirationDate), 'dd/MM/yyyy')}
                                                    </dd>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </dl>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="automations" className="mt-4">
                    <AutomationSettings vehicle={vehicle} />
                </TabsContent>
              </Tabs>
          </div>

          <div className="lg:col-span-1">
              {vehicle.isTaxi && vehicle.licenseNumber ? (
                  <TaxiStatus 
                    licenseNumber={vehicle.licenseNumber} 
                    licenseExpirationDate={vehicle.licenseExpirationDate}
                    exemptionExpirationDate={vehicle.exemptionExpirationDate}
                  />
              ) : (
                  <Card className="border-dashed flex flex-col items-center justify-center p-8 text-center bg-muted/5">
                      <Info className="h-8 w-8 text-muted-foreground/30 mb-4" />
                      <CardTitle className="text-[10px] font-black uppercase text-muted-foreground">CALENDARIO TURNI</CardTitle>
                      <CardDescription className="text-[10px] uppercase font-bold mt-2">
                          DISPONIBILE SOLO PER VEICOLI REGISTRATI COME "TAXI ROMA" CON NUMERO DI LICENZA VALIDO.
                      </CardDescription>
                  </Card>
              )}
          </div>
      </div>

      <EditVehicleForm 
        open={isEditFormOpen} 
        onOpenChange={setEditFormOpen} 
        vehicle={vehicle} 
      />

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>ELIMINARE IL VEICOLO?</AlertDialogTitle>
                  <AlertDialogDescription className="uppercase text-xs">
                      QUESTA AZIONE CONTRASSEGNERÀ <span className="font-bold text-foreground">{vehicle.name}</span> COME ELIMINATO.
                      I DATI VERRANNO CONSERVATI PER FINI STATISTICI MA NON APPARIRANNO PIÙ NELLA TUA DASHBOARD.
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>ANNULLA</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteVehicle} 
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90 uppercase"
                    disabled={isDeleting}
                  >
                      {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "SÌ, ELIMINA"}
                  </AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
  const registrationYear = vehicle.registrationDate && !isNaN(new Date(vehicle.registrationDate).getTime())
    ? new Date(vehicle.registrationDate).getFullYear()
    : 'N/D';

  const registrationDateFormatted = vehicle.registrationDate && !isNaN(new Date(vehicle.registrationDate).getTime()) 
    ? format(new Date(vehicle.registrationDate), 'dd MMMM yyyy', { locale: it }) 
    : 'N/D';
    
  const lastMaintenanceDateFormatted = vehicle.lastMaintenanceDate && !isNaN(new Date(vehicle.lastMaintenanceDate).getTime())
    ? format(new Date(vehicle.lastMaintenanceDate), 'dd MMMM yyyy', { locale: it })
    : 'N/D';
    
  const currentMileageFormatted = (typeof vehicle.currentMileage === 'number' ? vehicle.currentMileage : 0).toLocaleString('it-IT');

  const scrollToAdvisor = () => {
    const element = document.getElementById('ai-advisor');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/dashboard/vehicles"><ArrowLeft className="mr-2 h-4 w-4" /> I Miei Veicoli</Link>
        </Button>
        <Button variant="secondary" onClick={scrollToAdvisor} className="gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          Chiedi all'IA
        </Button>
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="font-headline text-3xl font-bold">{vehicle.name}</h1>
            <p className="text-muted-foreground">{vehicle.make} {vehicle.model} - {registrationYear}</p>
          </div>
          <div className="flex items-center gap-4 bg-card border rounded-lg p-4 shadow-sm">
              <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Chilometraggio Attuale</p>
                  <p className="text-2xl font-black text-primary">{currentMileageFormatted} <span className="text-sm font-normal text-muted-foreground">km</span></p>
              </div>
          </div>
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

      <div id="ai-advisor">
        <MaintenanceAdvisorForm vehicle={vehicle} />
      </div>
    </div>
  );
}

export default function VehicleDetailPage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center p-8 uppercase text-xs"><Loader2 className="h-8 w-8 animate-spin" /> CARICAMENTO...</div>}>

export default function VehicleDetailPage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <VehicleDetailContent />
    </Suspense>
  )
}
