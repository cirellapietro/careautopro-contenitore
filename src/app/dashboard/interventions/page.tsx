
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import type { Vehicle, MaintenanceIntervention } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, Wrench, CheckCircle2, AlertTriangle, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { InterventionDialog } from '@/components/dashboard/intervention-dialog';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

type InterventionWithVehicle = MaintenanceIntervention & { vehicleName: string };

export default function InterventionsPage() {
  const { user } = useUser();
  const { firestore } = useFirebase();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [allInterventions, setAllInterventions] = useState<InterventionWithVehicle[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  
  const [selectedIntervention, setSelectedIntervention] = useState<InterventionWithVehicle | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [interventionToDelete, setInterventionToDelete] = useState<InterventionWithVehicle | null>(null);

  const fetchAllInterventions = async () => {
    if (!user || !firestore) return;
    setLoading(true);
    try {
      // 1. Fetch vehicles
      const vehiclesQuery = query(collection(firestore, `users/${user.uid}/vehicles`), where('dataoraelimina', '==', null));
      const vehiclesSnap = await getDocs(vehiclesQuery);
      const userVehicles = vehiclesSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Vehicle);
      setVehicles(userVehicles);

      // 2. Fetch interventions for each vehicle
      const promises = userVehicles.map(async (v) => {
        const interventionsQuery = query(collection(firestore, `users/${user.uid}/vehicles/${v.id}/maintenanceInterventions`), where('dataoraelimina', '==', null));
        const interventionsSnap = await getDocs(interventionsQuery);
        return interventionsSnap.docs.map(doc => ({
          ...(doc.data() as MaintenanceIntervention),
          id: doc.id,
          vehicleName: v.name
        }));
      });

      const results = await Promise.all(promises);
      setAllInterventions(results.flat().sort((a, b) => {
          const dateA = new Date(a.scheduledDate || 0).getTime();
          const dateB = new Date(b.scheduledDate || 0).getTime();
          return dateB - dateA;
      }));
    } catch (e: any) {
      console.error(e);
      const permissionError = new FirestorePermissionError({
          path: `users/${user.uid}/vehicles`,
          operation: 'list',
          requestResourceData: { context: 'Fetching all interventions for the summary page.' }
      });
      errorEmitter.emit('permission-error', permissionError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllInterventions();
  }, [user, firestore, isDialogOpen]); // Refresh when dialog closes

  const handleDelete = () => {
    if (!user || !firestore || !interventionToDelete) return;
    const docRef = doc(firestore, `users/${user.uid}/vehicles/${interventionToDelete.vehicleId}/maintenanceInterventions`, interventionToDelete.id);
    const dataToUpdate = { dataoraelimina: new Date().toISOString() };
    
    updateDoc(docRef, dataToUpdate).then(() => {
        toast({ title: 'Intervento eliminato' });
        setAllInterventions(prev => prev.filter(i => i.id !== interventionToDelete.id));
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

  const handleComplete = (intervention: InterventionWithVehicle) => {
    if (!user || !firestore) return;
    const docRef = doc(firestore, `users/${user.uid}/vehicles/${intervention.vehicleId}/maintenanceInterventions`, intervention.id);
    const dataToUpdate = { 
        status: 'Completato', 
        completionDate: new Date().toISOString().split('T')[0] 
    };
    
    updateDoc(docRef, dataToUpdate).then(() => {
        toast({ title: 'Intervento completato!' });
        setAllInterventions(prev => prev.map(i => i.id === intervention.id ? { ...i, ...dataToUpdate as any } : i));
    }).catch(serverError => {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: dataToUpdate,
        });
        errorEmitter.emit('permission-error', permissionError);
    });
  };

  const getUrgencyColor = (urgency: string) => {
      switch (urgency) {
          case 'Alta': return 'text-destructive font-bold';
          case 'Media': return 'text-yellow-600 font-bold';
          case 'Bassa': return 'text-green-600 font-bold';
          default: return 'text-muted-foreground';
      }
  }

  const renderTable = (interventions: InterventionWithVehicle[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Veicolo</TableHead>
          <TableHead>Intervento</TableHead>
          <TableHead>Urgenza</TableHead>
          <TableHead>Data</TableHead>
          <TableHead className="text-right">Azioni</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {interventions.length === 0 ? (
          <TableRow><TableCell colSpan={5} className="text-center py-12 text-muted-foreground">Nessun intervento trovato in questa categoria.</TableCell></TableRow>
        ) : interventions.map(i => (
          <TableRow key={i.id}>
            <TableCell><Badge variant="outline">{i.vehicleName}</Badge></TableCell>
            <TableCell className="font-medium">{i.description}</TableCell>
            <TableCell className={getUrgencyColor(i.urgency || '')}>{i.urgency}</TableCell>
            <TableCell>
                {i.status === 'Completato' 
                    ? (i.completionDate ? format(new Date(i.completionDate), 'dd/MM/yyyy', { locale: it }) : 'N/D')
                    : (i.scheduledDate ? format(new Date(i.scheduledDate), 'dd/MM/yyyy', { locale: it }) : 'N/D')
                }
            </TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                    {i.status !== 'Completato' && (
                        <Button variant="ghost" size="icon" title="Completa" onClick={() => handleComplete(i)}>
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => { setSelectedIntervention(i); setIsDialogOpen(true); }}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => { setInterventionToDelete(i); setIsDeleteDialogOpen(true); }}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  if (loading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Caricamento interventi...</p>
      </div>
    );
  }

  const pending = allInterventions.filter(i => i.status !== 'Completato');
  const completed = allInterventions.filter(i => i.status === 'Completato');

  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="font-headline text-3xl font-bold">Gestione Interventi</h1>
                <p className="text-muted-foreground">Tutti gli interventi di manutenzione per i tuoi veicoli.</p>
            </div>
            <div className="flex gap-4">
                <Card className="px-4 py-2 flex items-center gap-3">
                    <div className="bg-destructive/10 p-2 rounded-full"><AlertTriangle className="h-4 w-4 text-destructive" /></div>
                    <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-tight">Da Fare</p>
                        <p className="text-xl font-black">{pending.length}</p>
                    </div>
                </Card>
                <Card className="px-4 py-2 flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full"><CheckCircle2 className="h-4 w-4 text-green-600" /></div>
                    <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-tight">Completati</p>
                        <p className="text-xl font-black">{completed.length}</p>
                    </div>
                </Card>
            </div>
        </div>

        <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                <TabsTrigger value="pending">Da Completare ({pending.length})</TabsTrigger>
                <TabsTrigger value="completed">Storico ({completed.length})</TabsTrigger>
            </TabsList>
            <Card className="mt-4">
                <TabsContent value="pending" className="m-0">
                    {renderTable(pending)}
                </TabsContent>
                <TabsContent value="completed" className="m-0">
                    {renderTable(completed)}
                </TabsContent>
            </Card>
        </Tabs>

        {selectedIntervention && (
            <InterventionDialog 
                open={isDialogOpen} 
                onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) setSelectedIntervention(null);
                }} 
                vehicleId={selectedIntervention.vehicleId} 
                intervention={selectedIntervention} 
            />
        )}

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Questa azione eliminerà l'intervento selezionato. Non potrai annullare questa operazione.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annulla</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Elimina</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}
