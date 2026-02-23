'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { doc, updateDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, useDoc, errorEmitter, FirestorePermissionError } from '@/firebase';
import type { Role } from '@/lib/types';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const roleSchema = z.object({
  name: z.string().min(2, 'Il nome è obbligatorio.'),
  description: z.string().optional(),
});
type RoleFormValues = z.infer<typeof roleSchema>;

export default function PageContent({ roleId }: { roleId: string }) {
  const { user, loading: userLoading } = useUser();
  const { firestore } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isNew = roleId === 'new';

  const roleRef = useMemo(() => {
    if (isNew || !firestore || !roleId) return null;
    return doc(firestore, 'roles', roleId);
  }, [firestore, roleId, isNew]);

  const { data: role, isLoading: roleLoading } = useDoc<Role>(roleRef);

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
        name: '',
        description: ''
    }
  });
  
  useEffect(() => {
      if(role) {
          form.reset({
              name: role.name || '',
              description: role.description || ''
          });
      }
  }, [role, form]);


  const onSubmit = (values: RoleFormValues) => {
    if (!firestore || !user) return;
    setIsSubmitting(true);

    if (isNew) {
        const rolesCollection = collection(firestore, 'roles');
        const newDocRef = doc(rolesCollection);
        const dataToCreate = {
            ...values,
            id: newDocRef.id,
            dataoraelimina: null,
        };
        
        addDoc(rolesCollection, dataToCreate)
            .then(() => {
                toast({ title: 'Successo', description: 'Ruolo creato.' });
                router.push('/dashboard/admin/roles');
            })
            .catch(serverError => {
                const permissionError = new FirestorePermissionError({
                    path: 'roles',
                    operation: 'create',
                    requestResourceData: dataToCreate,
                });
                errorEmitter.emit('permission-error', permissionError);
                toast({ variant: 'destructive', title: 'Errore', description: 'Impossibile salvare il ruolo.' });
            }).finally(() => {
                 setIsSubmitting(false);
            });
    } else if (role) {
        const dataToUpdate = { ...values };
        updateDoc(roleRef!, dataToUpdate)
            .then(() => {
                toast({ title: 'Successo', description: 'Ruolo aggiornato.' });
            })
            .catch(serverError => {
                const permissionError = new FirestorePermissionError({
                    path: roleRef!.path,
                    operation: 'update',
                    requestResourceData: dataToUpdate,
                });
                errorEmitter.emit('permission-error', permissionError);
                toast({ variant: 'destructive', title: 'Errore', description: 'Impossibile salvare il ruolo.' });
            }).finally(() => {
                setIsSubmitting(false);
            });
    }
  }
  
  if (userLoading || (roleLoading && !isNew) ) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isNew && !role && !roleLoading) {
    return (
      <div className="p-6">
        <p>Ruolo non trovato.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <Button variant="outline" asChild>
          <Link href="/dashboard/admin/roles"><ArrowLeft className="mr-2 h-4 w-4" /> Torna ai ruoli</Link>
        </Button>
        <Card>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>{isNew ? 'Nuovo Ruolo' : 'Modifica Ruolo'}</CardTitle>
                        <CardDescription>
                            {isNew ? 'Crea un nuovo ruolo per gli utenti.' : `Modifica i dettagli del ruolo: ${role?.name}`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome Ruolo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Es. Manager" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrizione</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Breve descrizione del ruolo..." {...field} value={field.value || ''} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isNew ? 'Crea Ruolo' : 'Salva Modifiche'}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    </div>
  );
}
