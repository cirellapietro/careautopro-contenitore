'use client';

import { useMemo, useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { doc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, useDoc, errorEmitter, FirestorePermissionError } from '@/firebase';
import type { VehicleType } from '@/lib/types';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

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

  const isNew = vehicleTypeId === 'new';

  const vtRef = useMemo(() => {
    if (isNew || !firestore || !vehicleTypeId) return null;
    return doc(firestore, 'vehicleTypes', vehicleTypeId);
  }, [firestore, vehicleTypeId, isNew]);

  const { data: vehicleType, isLoading: vtLoading } = useDoc<VehicleType>(vtRef);

  const form = useForm<VehicleTypeFormValues>({
    resolver: zodResolver(vehicleTypeSchema),
    defaultValues: {
      name: '',
      averageAnnualMileage: 10000,
    }
  });

  useEffect(() => {
    if (vehicleType) {
      form.reset({
        name: vehicleType.name || '',
        averageAnnualMileage: vehicleType.averageAnnualMileage || 10000,
      });
    }
  }, [vehicleType, form]);

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
      const dataToUpdate = { ...values };
      updateDoc(vtRef!, dataToUpdate)
        .then(() => {
          toast({ title: 'Successo', description: 'Tipo veicolo aggiornato.' });
        })
        .catch(serverError => {
          const permissionError = new FirestorePermissionError({
            path: vtRef!.path,
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
                      <Input type="number" placeholder="Es. 12000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isNew ? 'Crea Tipo Veicolo' : 'Salva Modifiche'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
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
