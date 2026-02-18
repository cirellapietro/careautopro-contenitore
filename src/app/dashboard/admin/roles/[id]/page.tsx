"use client";
export const dynamicParams = false;
export const generateStaticParams = () => [];


'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { doc, updateDoc, setDoc, collection } from 'firebase/firestore';
import { notFound, useRouter, useParams } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { useUser } from "@/firebase/auth/use-user";
import { useFirebase, useDoc, errorEmitter, FirestorePermissionError } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, ArrowLeft } from 'lucide-react';
import type { Role } from '@/lib/types';
import Link from 'next/link';

const roleEditSchema = z.object({
  name: z.string().min(2, "Il nome è obbligatorio."),
  description: z.string().optional(),
});

export default function AdminRoleEditPage() {
    const params = useParams() as { id: string };
    const { id } = params;
    const { user: currentUser, loading: userLoading } = useUser();
    const { firestore } = useFirebase();
    const { toast } = useToast();
    const router = useRouter();
    const isNew = id === 'new';

    const roleRef = useMemo(() => {
        // Don't fetch if the user isn't a loaded admin, or if it's a new role
        if (!firestore || !currentUser || currentUser.role !== 'Amministratore' || isNew) {
            return null;
        }
        return doc(firestore, 'roles', id);
    }, [firestore, id, isNew, currentUser]);

    const { data: roleToEdit, isLoading: isRoleLoading } = useDoc<Role>(roleRef);

    const form = useForm<z.infer<typeof roleEditSchema>>({
        resolver: zodResolver(roleEditSchema),
        defaultValues: {
            name: '',
            description: ''
        }
    });

    useEffect(() => {
        if (!userLoading && (!currentUser || currentUser.role !== 'Amministratore')) {
            router.push('/dashboard');
        }
    }, [currentUser, userLoading, router]);

    useEffect(() => {
        if (isNew) {
            form.reset({ name: '', description: '' });
        } else if (roleToEdit) {
            form.reset({
                name: roleToEdit.name || '',
                description: roleToEdit.description || '',
            });
        }
    }, [roleToEdit, isNew, form]);

    const onSubmit = (data: z.infer<typeof roleEditSchema>) => {
        if (!firestore) return;

        const ref = isNew ? doc(collection(firestore, 'roles')) : roleRef;
        if (!ref) return;
        
        const dataToSave = isNew ? { ...data, id: ref.id, dataoraelimina: null } : data;
        const operation = isNew ? setDoc(ref, dataToSave) : updateDoc(ref, dataToSave);
        const operationType = isNew ? 'create' : 'update';
    
        operation
            .then(() => {
                toast({ title: "Successo", description: isNew ? "Ruolo creato." : "Ruolo aggiornato." });
                router.push('/dashboard/admin/roles');
            })
            .catch((serverError) => {
                const permissionError = new FirestorePermissionError({
                    path: ref.path,
                    operation: operationType as 'create' | 'update',
                    requestResourceData: dataToSave,
                });
                errorEmitter.emit('permission-error', permissionError);
                toast({ variant: 'destructive', title: "Errore di Permesso", description: "Non disponi dei permessi per salvare questo ruolo." });
            });
    };

    const isLoading = userLoading || (!isNew && isRoleLoading);

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    
    // Once all loading is done, if we're editing and have no role, it's a 404
    if (!isNew && !isLoading && !roleToEdit) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <Link href="/dashboard/admin/roles" className="flex items-center gap-2 text-sm text-muted-foreground hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Torna all'elenco
            </Link>
            <div>
                <h1 className="font-headline text-3xl font-bold">{isNew ? 'Nuovo Ruolo' : 'Modifica Ruolo'}</h1>
                <p className="text-muted-foreground">{isNew ? 'Crea un nuovo ruolo utente.' : 'Modifica i dettagli del ruolo.'}</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dettagli Ruolo</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome Ruolo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Es. Moderatore" {...field} />
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
                                            <Textarea placeholder="Descrivi i permessi di questo ruolo..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                 {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                 {isNew ? 'Crea Ruolo' : 'Salva Modifiche'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    );
}
export const dynamicParams = true; export const generateStaticParams = () => [];
