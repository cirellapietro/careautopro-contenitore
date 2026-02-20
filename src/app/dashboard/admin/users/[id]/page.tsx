l"use client";

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import { useEffect, useState, useMemo } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { doc, updateDoc, collection, query, getDocs, where } from 'firebase/firestore';
import { notFound, useRouter, useParams } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@/firebase/auth/use-user";
import { useFirebase, useDoc, errorEmitter, FirestorePermissionError } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ArrowLeft } from 'lucide-react';
import type { User, Role } from '@/lib/types';
import Link from 'next/link';

const userEditSchema = z.object({
  displayName: z.string().min(2, "Il nome è obbligatorio."),
  role: z.string().min(1, "Seleziona un ruolo."),
});

export default function AdminUserEditPage() {
    const params = useParams() as { id: string };
    const { id } = params;
    const { user: currentUser, loading: userLoading } = useUser();
    const { firestore } = useFirebase();
    const { toast } = useToast();
    const router = useRouter();

    const [roles, setRoles] = useState<Role[]>([]);
    const [rolesLoading, setRolesLoading] = useState(true);

    const userRef = useMemo(() => {
        if (!firestore || !currentUser || currentUser.role !== 'Amministratore') {
            return null;
        }
        return doc(firestore, 'users', id);
    }, [firestore, id, currentUser]);

    const { data: userToEdit, isLoading: isUserLoading } = useDoc<User>(userRef);

    const form = useForm<z.infer<typeof userEditSchema>>({
        resolver: zodResolver(userEditSchema),
        defaultValues: {
            displayName: '',
            role: ''
        }
    });

    // Caricamento ruoli disponibili
    useEffect(() => {
        async function fetchRoles() {
            if (!firestore) return;
            try {
                const q = query(collection(firestore, 'roles'), where('dataoraelimina', '==', null));
                const querySnapshot = await getDocs(q);
                const rolesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Role));
                setRoles(rolesData);
            } catch (error) {
                console.error("Errore caricamento ruoli:", error);
            } finally {
                setRolesLoading(false);
            }
        }
        fetchRoles();
    }, [firestore]);

    useEffect(() => {
        if (!userLoading && (!currentUser || currentUser.role !== 'Amministratore')) {
            router.push('/dashboard');
        }
    }, [currentUser, userLoading, router]);

    useEffect(() => {
        if (userToEdit) {
            form.reset({
                displayName: userToEdit.displayName || '',
                role: userToEdit.role || '',
            });
        }
    }, [userToEdit, form]);

    const onSubmit = (data: z.infer<typeof userEditSchema>) => {
        if (!firestore || !userRef) return;

        updateDoc(userRef, data)
            .then(() => {
                toast({ title: "Successo", description: "Utente aggiornato con successo." });
                router.push('/dashboard/admin/users');
            })
            .catch((serverError) => {
                const permissionError = new FirestorePermissionError({
                    path: userRef.path,
                    operation: 'update',
                    requestResourceData: data,
                });
                errorEmitter.emit('permission-error', permissionError);
                toast({ variant: 'destructive', title: "Errore di Permesso", description: "Non disponi dei permessi per modificare l'utente." });
            });
    };

    const isLoading = userLoading || isUserLoading || rolesLoading;

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    
    if (!isLoading && !userToEdit) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <Link href="/dashboard/admin/users" className="flex items-center gap-2 text-sm text-muted-foreground hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Torna alla lista utenti
            </Link>
            <div>
                <h1 className="font-headline text-3xl font-bold">Modifica Utente</h1>
                <p className="text-muted-foreground">Gestisci il profilo e il ruolo di {userToEdit?.email}.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informazioni Profilo</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <FormField
                                control={form.control}
                                name="displayName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome Visualizzato</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ruolo Utente</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleziona un ruolo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {roles.map((role) => (
                                                    <SelectItem key={role.id} value={role.name}>
                                                        {role.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                 {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                 Salva Modifiche
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    );
      }
        
