'use client';

import { useMemo, useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { doc, updateDoc, collection, addDoc, query, where } from 'firebase/firestore';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, useDoc, useCollection, errorEmitter, FirestorePermissionError } from '@/firebase';
import type { VehicleType, MaintenanceCheck } from '@/lib/types';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Loader2, PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useTracking } from '@/contexts/tracking-context';
import { reverseGeocode } from '@/ai/flows/reverse-geocode';
import { fetchAverageMileage } from '@/ai/flows/fetch-average-mileage';


const vehicleTypeSchema = z.object({
  name: z.string().min(2, 'Il nome è obbligatorio.'),
  averageAnnualMileage: z.coerce.number().min(1, 'Il chilometraggio deve essere positivo.'),
});
type VehicleTypeFormValues = z.infer<typeof vehicleTypeSchema>;

function VehicleTypeDetailContent() {
  const searchParams = useSearchParams();
  const vehicleTypeId = searchParams.get('id');

  const { user, loading: userLoading } = useUser();
  const { firestore } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkToDelete, setCheckToDelete] = useState<MaintenanceCheck | null>(null);

  const isNew = vehicleTypeId === 'new';

  const vtRef = useMemo(() => {
    if (isNew || !firestore || !vehicleTypeId) return null;
    return doc(firestore, 'vehicleTypes', vehicleTypeId);
  }, [firestore, vehicleTypeId, isNew]);

  const { data: vehicleType, isLoading: vtLoading } = useDoc<VehicleType>(vtRef);

  const checksQuery = useMemo(() => {
    if (isNew || !firestore || !vehicleTypeId) return null;
    return query(collection(firestore, `vehicleTypes/${vehicleTypeId}/maintenanceChecks`), where('dataoraelimina', '==', null));
  }, [firestore, vehicleTypeId, isNew]);

  const { data: maintenanceChecks, isLoading: checksLoading } = useCollection<MaintenanceCheck>(checksQuery);

  const { permissionStatus } = useTracking();
  const [isFetchingSuggestion, setIsFetchingSuggestion] = useState(false);

  const form = useForm<VehicleTypeFormValues>({
    resolver: zodResolver(vehicleTypeSchema),
    values: {
      name: vehicleType?.name || '',
      averageAnnualMileage: vehicleType?.averageAnnualMileage || 10000,
    },
  });

  // Fetch location-based mileage suggestion
  useEffect(() => {
    if (isNew && navigator.geolocation && permissionStatus === 'granted') {
      setIsFetchingSuggestion(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const location = await reverseGeocode({ latitude, longitude });
            if (location?.city) {
              const mileageData = await fetchAverageMileage({ city: location.city, country: location.country });
              if (mileageData?.averageMileage) {
                form.setValue('averageAnnualMileage', mileageData.averageMileage, { shouldValidate: true });
                toast({
                  title: 'Suggerimento',
                  description: `Chilometraggio medio annuo per la tua zona impostato a ${mileageData.averageMileage.toLocaleString('it-IT')} km.`,
                });
              }
            }
          } catch (error) {
            console.error("Error fetching mileage suggestion:", error);
          } finally {
            setIsFetchingSuggestion(false);
          }
        },
        () => {
          setIsFetchingSuggestion(false);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 1000 * 60 * 60 }
      );
    }
  }, [isNew, permissionStatus, form, toast]);

  const handleDeleteCheck = () => {
    if (!checkToDelete || !firestore || !vehicleTypeId) return;
    const docRef = doc(firestore, `vehicleTypes/${vehicleTypeId}/maintenanceChecks`, checkToDelete.id);
    const dataToUpdate = { dataoraelimina: new Date().toISOString() };
    updateDoc(docRef, dataToUpdate)
        .then(() => {
            toast({ title: "Controllo eliminato" });
        })
        .catch(serverError => {
            const permissionError = new FirestorePermissionError({
                path: docRef.path,
                operation: 'update',
                requestResourceData: dataToUpdate,
            });
            errorEmitter.emit('permission-error', permissionError);
            toast({ variant: 'destructive', title: 'Errore', description: 'Impossibile eliminare il controllo.' });
        })
        .finally(() => {
            setCheckToDelete(null);
        });
  };

  const onSubmit = (values: VehicleTypeFormValues) => {
    if (!firestore || !user) return;
    setIsSubmitting(true);

    if (isNew) {
      const vtCollection = collection(firestore, 'vehicleTypes');
      const dataToCreate = {
        ...values,
        dataoraelimina: null,
      };
      
      addDoc(vtCollection, dataToCreate)
        .then((newDocRef) => {
          updateDoc(newDocRef, { id: newDocRef.id });
          toast({ title: 'Successo', description: 'Tipo veicolo creato.' });
          router.push('/dashboard/admin/vehicle-types');
        })
        .catch(serverError => {
          const permissionError = new FirestorePermissionError({
            path: 'vehicleTypes',
            operation: 'create',
            requestResourceData: dataToCreate,
          });
          errorEmitter.emit('permission-error', permissionError);
          toast({ variant: 'destructive', title: 'Errore', description: 'Impossibile salvare il tipo veicolo.' });
        })
        .finally(() => setIsSubmitting(false));

    } else if (vehicleType) {
      if (!vtRef) return;
      const dataToUpdate = { ...values };
      updateDoc(vtRef, dataToUpdate)
        .then(() => {
          toast({ title: 'Successo', description: 'Tipo veicolo aggiornato.' });
        })
        .catch(serverError => {
          const permissionError = new FirestorePermissionError({
            path: vtRef.path,
            operation: 'update',
            requestResourceData: dataToUpdate,
          });
          errorEmitter.emit('permission-error', permissionError);
          toast({ variant: 'destructive', title: 'Errore', description: 'Impossibile salvare il tipo veicolo.' });
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  if (userLoading || (vtLoading && !isNew)) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isNew && !vehicleType && !vtLoading) {
    return <div className="p-6"><p>Tipo veicolo non trovato.</p></div>;
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" asChild>
        <Link href="/dashboard/admin/vehicle-types"><ArrowLeft className="mr-2 h-4 w-4" /> Torna ai tipi veicolo</Link>
      </Button>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>{isNew ? 'Nuovo Tipo Veicolo' : 'Modifica Tipo Veicolo'}</CardTitle>
              <CardDescription>
                {isNew ? 'Crea un nuovo tipo di veicolo.' : `Modifica i dettagli per: ${vehicleType?.name}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Es. Benzina" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="averageAnnualMileage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chilometraggio Medio Annuo</FormLabel>
                    <FormControl>
                       <Input type="number" placeholder={isFetchingSuggestion ? "Sto cercando un suggerimento..." : "Es. 12000"} {...field} />
                    </FormControl>
                     {isFetchingSuggestion && <FormDescription>Sto cercando il chilometraggio medio per la tua zona...</FormDescription>}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isNew ? 'Crea Tipo Veicolo' : 'Salva Modifiche'}
              </Button>
              <Button type="button" variant="destructive" onClick={() => router.push('/dashboard/admin/vehicle-types')}>
                Annulla
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {!isNew && vehicleTypeId && (
        <Card>
          <CardHeader>
            <CardTitle>Piano di Manutenzione Standard</CardTitle>
            <CardDescription>
              Elenco dei controlli standard associati a questo tipo di veicolo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {checksLoading ? (
              <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin" /></div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descrizione</TableHead>
                      <TableHead>Intervallo Km</TableHead>
                      <TableHead>Intervallo Mesi</TableHead>
                      <TableHead className="text-right">Azioni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maintenanceChecks?.map((check) => (
                      <TableRow key={check.id}>
                        <TableCell className="font-medium">{check.description}</TableCell>
                        <TableCell>{check.intervalMileage ? `${check.intervalMileage.toLocaleString('it-IT')} km` : 'N/A'}</TableCell>
                        <TableCell>{check.intervalTime ? `${check.intervalTime} mesi` : 'N/A'}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => router.push(`/dashboard/admin/vehicle-types/maintenance-checks/view?vehicleTypeId=${vehicleTypeId}&checkId=${check.id}`)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); setCheckToDelete(check); }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {maintenanceChecks?.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">Nessun controllo di manutenzione trovato.</p>
                )}
              </>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push(`/dashboard/admin/vehicle-types/maintenance-checks/view?vehicleTypeId=${vehicleTypeId}&checkId=new`)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Aggiungi Controllo
            </Button>
          </CardFooter>
        </Card>
      )}

      <AlertDialog open={!!checkToDelete} onOpenChange={() => setCheckToDelete(null)}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
                  <AlertDialogDescription>
                      Questa azione contrassegnerà il controllo <span className="font-bold">{checkToDelete?.description}</span> come eliminato.
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>Annulla</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteCheck} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Elimina</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}


export default function VehicleTypeDetailPage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <VehicleTypeDetailContent />
    </Suspense>
  )
}
