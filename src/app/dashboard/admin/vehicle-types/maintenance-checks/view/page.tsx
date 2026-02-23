'use client';

import { useMemo, useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { doc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, useDoc, errorEmitter, FirestorePermissionError } from '@/firebase';
import type { MaintenanceCheck } from '@/lib/types';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const checkSchema = z.object({
  description: z.string().min(3, 'La descrizione è obbligatoria.'),
  intervalMileage: z.coerce.number().optional(),
  intervalTime: z.coerce.number().optional(),
});
type CheckFormValues = z.infer<typeof checkSchema>;

function MaintenanceCheckDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const vehicleTypeId = searchParams.get('vehicleTypeId');
  const checkId = searchParams.get('checkId');

  const { user, loading: userLoading } = useUser();
  const { firestore } = useFirebase();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isNew = checkId === 'new';

  const checkRef = useMemo(() => {
    if (isNew || !firestore || !vehicleTypeId || !checkId) return null;
    return doc(firestore, `vehicleTypes/${vehicleTypeId}/maintenanceChecks`, checkId);
  }, [firestore, vehicleTypeId, checkId, isNew]);

  const { data: maintenanceCheck, isLoading: checkLoading } = useDoc<MaintenanceCheck>(checkRef);

  const form = useForm<CheckFormValues>({
    resolver: zodResolver(checkSchema),
    defaultValues: {
      description: '',
      intervalMileage: undefined,
      intervalTime: undefined,
    }
  });

  useEffect(() => {
    if (maintenanceCheck) {
      form.reset({
        description: maintenanceCheck.description || '',
        intervalMileage: maintenanceCheck.intervalMileage,
        intervalTime: maintenanceCheck.intervalTime,
      });
    }
  }, [maintenanceCheck, form]);
  
  if (!vehicleTypeId) {
      return (
          <div className="p-6">
              <p>ID Tipo Veicolo mancante. Torna indietro e riprova.</p>
              <Button asChild variant="outline" className="mt-4"><Link href="/dashboard/admin/vehicle-types">Torna ai Tipi Veicolo</Link></Button>
          </div>
      )
  }

  const onSubmit = (values: CheckFormValues) => {
    if (!firestore || !user) return;
    setIsSubmitting(true);
    
    const data = {
        description: values.description,
        intervalMileage: values.intervalMileage || null,
        intervalTime: values.intervalTime || null,
    };

    if (isNew) {
      const checksCollection = collection(firestore, `vehicleTypes/${vehicleTypeId}/maintenanceChecks`);
      const dataToCreate = {
        ...data,
        vehicleTypeId: vehicleTypeId,
        dataoraelimina: null,
      };

      addDoc(checksCollection, dataToCreate)
        .then((newDocRef) => {
          updateDoc(newDocRef, { id: newDocRef.id });
          toast({ title: 'Successo', description: 'Controllo creato.' });
          router.push(`/dashboard/admin/vehicle-types/view?id=${vehicleTypeId}`);
        })
        .catch(serverError => {
          const permissionError = new FirestorePermissionError({
            path: `vehicleTypes/${vehicleTypeId}/maintenanceChecks`,
            operation: 'create',
            requestResourceData: dataToCreate,
          });
          errorEmitter.emit('permission-error', permissionError);
          toast({ variant: 'destructive', title: 'Errore', description: 'Impossibile salvare il controllo.' });
        })
        .finally(() => setIsSubmitting(false));
    } else if (maintenanceCheck) {
      const dataToUpdate = { ...data };
      updateDoc(checkRef!, dataToUpdate)
        .then(() => {
          toast({ title: 'Successo', description: 'Controllo aggiornato.' });
          router.push(`/dashboard/admin/vehicle-types/view?id=${vehicleTypeId}`);
        })
        .catch(serverError => {
          const permissionError = new FirestorePermissionError({
            path: checkRef!.path,
            operation: 'update',
            requestResourceData: dataToUpdate,
          });
          errorEmitter.emit('permission-error', permissionError);
          toast({ variant: 'destructive', title: 'Errore', description: 'Impossibile salvare il controllo.' });
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  if (userLoading || (checkLoading && !isNew)) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" asChild>
        <Link href={`/dashboard/admin/vehicle-types/view?id=${vehicleTypeId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Torna al Tipo Veicolo</Link>
      </Button>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>{isNew ? 'Nuovo Controllo Manutenzione' : 'Modifica Controllo'}</CardTitle>
              <CardDescription>
                {isNew ? 'Aggiungi un nuovo controllo al piano di manutenzione.' : `Modifica i dettagli del controllo.`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrizione</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Es. Cambio olio e filtro" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="intervalMileage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intervallo Chilometrico (km)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Es. 15000" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormDescription>Lascia vuoto se non applicabile.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="intervalTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intervallo Temporale (mesi)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Es. 12" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormDescription>Lascia vuoto se non applicabile.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isNew ? 'Crea Controllo' : 'Salva Modifiche'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}


export default function MaintenanceCheckDetailPage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
        <MaintenanceCheckDetailContent />
    </Suspense>
  )
}
