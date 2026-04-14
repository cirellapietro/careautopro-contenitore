
'use client';

import { useMemo, useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { doc, updateDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, useDoc, errorEmitter, FirestorePermissionError } from '@/firebase';
import type { User, UserRole, Vehicle } from '@/lib/types';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2, Save, UserPlus, ShieldCheck, Car, Trash2, Eye } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const userSchema = z.object({
  email: z.string().email('Inserisci un indirizzo email valido.'),
  displayName: z.string().min(2, 'Il nome deve contenere almeno 2 caratteri.'),
  role: z.enum(['Amministratore', 'Utente']),
});

type UserFormValues = z.infer<typeof userSchema>;

function UserDetailContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const isNew = userId === 'new';

  const { user: adminUser, loading: adminUserLoading } = useUser();
  const { firestore } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userVehicles, setUserVehicles] = useState<Vehicle[]>([]);
  const [loadingVehicles, setLoadingVehicles] = useState(false);

  const userRef = useMemo(() => {
    if (!firestore || !userId || isNew) return null;
    return doc(firestore, 'users', userId);
  }, [firestore, userId, isNew]);

  const { data: user, isLoading: userLoading } = useDoc<User>(userRef);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: '',
      displayName: '',
      role: 'Utente',
    },
  });

  useEffect(() => {
    if (user && !isNew) {
      form.reset({ 
        email: user.email || '',
        displayName: user.displayName || '',
        role: (user.role as UserRole) || 'Utente' 
      });

      if (firestore) {
          setLoadingVehicles(true);
          const q = query(collection(firestore, `users/${user.uid || user.id}/vehicles`), where('dataoraelimina', '==', null));
          getDocs(q).then(snap => {
              setUserVehicles(snap.docs.map(d => ({ ...d.data(), id: d.id } as Vehicle)));
              setLoadingVehicles(false);
          });
      }
    }
  }, [user, isNew, firestore, form]);

  const onSubmit = (values: UserFormValues) => {
    if (!firestore) return;
    setIsSubmitting(true);

    if (isNew) {
        const newUserRef = doc(collection(firestore, 'users'));
        const dataToCreate = {
            id: newUserRef.id,
            uid: newUserRef.id,
            email: values.email.toLowerCase(),
            displayName: values.displayName,
            role: values.role,
            notificationChannels: ['app', 'email'],
            notificationReminderTime: 3,
            dataoraelimina: null,
        };

        setDoc(newUserRef, dataToCreate)
            .then(() => {
                toast({ title: 'Successo', description: 'Utente creato nel database.' });
                router.push('/dashboard/admin/users');
            })
            .catch(() => toast({ variant: 'destructive', title: 'Errore' }))
            .finally(() => setIsSubmitting(false));
    } else if (userRef) {
        updateDoc(userRef, { 
            role: values.role,
            displayName: values.displayName,
            email: values.email.toLowerCase()
        })
            .then(() => {
                toast({ title: 'Successo', description: 'Dati utente aggiornati.' });
                router.push('/dashboard/admin/users');
            })
            .catch(() => toast({ variant: 'destructive', title: 'Errore' }))
            .finally(() => setIsSubmitting(false));
    }
  };

  if (adminUserLoading || (userLoading && !isNew)) {
    return <div className="flex h-full items-center justify-center p-12"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" asChild><Link href="/dashboard/admin/users" className="font-bold text-xs"><ArrowLeft className="mr-2 h-4 w-4" /> Torna alla lista</Link></Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {isNew ? <UserPlus className="text-primary" /> : <ShieldCheck className="text-primary" />}
                    {isNew ? 'Nuovo Profilo Utente' : 'Dati Profilo'}
                </CardTitle>
                <CardDescription className="text-xs">Gestione permessi e identità utente.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel className="text-xs font-black">Email</FormLabel><FormControl><Input {...field} placeholder="esempio@careautopro.it" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="displayName" render={({ field }) => (
                      <FormItem><FormLabel className="text-xs font-black">Nome Visualizzato</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="role" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black">Livello di Accesso</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger className="font-bold"><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="Amministratore">Amministratore</SelectItem>
                            <SelectItem value="Utente">Utente</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs">Il ruolo definisce cosa l'utente può vedere e gestire.</FormDescription>
                        <FormMessage />
                      </FormItem>
                  )} />
                  <div className="flex justify-end gap-4">
                      <Button type="submit" disabled={isSubmitting} className="font-black tracking-tight h-12 px-8">
                        {isSubmitting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />} 
                        {isNew ? 'Crea Profilo' : 'Salva Cambiamenti'}
                      </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {!isNew && (
              <div className="space-y-6">
                  <Card>
                      <CardHeader>
                          <CardTitle className="text-sm font-black flex items-center gap-2">
                              <Car className="h-4 w-4" /> Veicoli dell'Utente
                          </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                          {loadingVehicles ? (
                              <div className="p-8 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>
                          ) : (
                              <Table>
                                  <TableBody>
                                      {userVehicles.map(v => (
                                          <TableRow key={v.id}>
                                              <TableCell className="text-xs font-bold py-2">
                                                  {v.name}
                                                  <p className="text-xs text-muted-foreground">{v.licensePlate}</p>
                                              </TableCell>
                                              <TableCell className="text-right py-2">
                                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.push(`/dashboard/vehicles/view?id=${v.id}`)}>
                                                      <Eye className="h-4 w-4" />
                                                  </Button>
                                              </TableCell>
                                          </TableRow>
                                      ))}
                                      {userVehicles.length === 0 && (
                                          <TableRow><TableCell className="text-center py-8 text-xs text-muted-foreground">Nessun veicolo registrato.</TableCell></TableRow>
                                      )}
                                  </TableBody>
                              </Table>
                          )}
                      </CardContent>
                  </Card>

                  <Card className="bg-destructive/5 border-destructive/20">
                      <CardHeader>
                          <CardTitle className="text-destructive text-sm font-black">Stato Accesso</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                          <p className="text-xs font-bold text-muted-foreground leading-tight">
                              Se blocchi un utente, questo verrà disconnesso e non potrà più entrare nel sistema.
                          </p>
                          <Button variant="destructive" className="w-full font-black text-xs" onClick={() => router.push('/dashboard/admin/users')}>
                              <Trash2 className="mr-2 h-3 w-3" /> Gestisci Sospensione
                          </Button>
                      </CardContent>
                  </Card>
              </div>
          )}
      </div>
    </div>
  );
}

export default function UserDetailPage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <UserDetailContent />
    </Suspense>
  );
}
