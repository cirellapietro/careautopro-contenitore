'use client';

import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { doc, updateDoc, collection } from 'firebase/firestore';
import { notFound, useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@/firebase/auth/use-user";
import { useFirebase, useDoc, useMemoFirebase, useCollection } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import type { User, Role } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const userEditSchema = z.object({
  displayName: z.string().min(1, "Il nome è obbligatorio."),
  email: z.string().email(),
  role: z.string({ required_error: 'Seleziona un ruolo.' }),
});

export default function AdminUserEditPage({ params }: { params: { id: string } }) {
    const { user: currentUser, loading: userLoading } = useUser();
    const { firestore } = useFirebase();
    const { toast } = useToast();
    const router = useRouter();

    const userRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return doc(firestore, 'users', params.id);
    }, [firestore, params.id]);

    const rolesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'roles');
    }, [firestore]);

    const { data: userToEdit, isLoading: isUserToEditLoading } = useDoc<User>(userRef);
    const { data: roles, isLoading: areRolesLoading } = useCollection<Role>(rolesQuery);

    const form = useForm<z.infer<typeof userEditSchema>>({
        resolver: zodResolver(userEditSchema),
    });

    useEffect(() => {
        if (!userLoading && (!currentUser || currentUser.role !== 'Amministratore')) {
            router.push('/dashboard');
        }
    }, [currentUser, userLoading, router]);

    useEffect(() => {
        if (userToEdit) {
            form.reset({
                displayName: userToEdit.displayName || '',
                email: userToEdit.email || '',
                role: userToEdit.role || 'Utente',
            });
        }
    }, [userToEdit, form]);

    const onSubmit = async (data: z.infer<typeof userEditSchema>) => {
        if (!userRef) return;

        try {
            await updateDoc(userRef, {
                displayName: data.displayName,
                role: data.role,
            });
            toast({ title: "Successo", description: "Profilo utente aggiornato." });
            router.push('/dashboard/admin/users');
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: "Errore", description: "Impossibile salvare il profilo." });
        }
    };

    if (userLoading || isUserToEditLoading || areRolesLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    
    if (!userToEdit && !isUserToEditLoading) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <Link href="/dashboard/admin/users" className="flex items-center gap-2 text-sm text-muted-foreground hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Torna all'elenco
            </Link>
            <div>
                <h1 className="font-headline text-3xl font-bold">Modifica Utente</h1>
                <p className="text-muted-foreground">Modifica i dettagli e i permessi dell'utente.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Dati Utente</CardTitle>
                            <CardDescription>Modifica il nome, l'email e il ruolo dell'utente.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <FormField
                                control={form.control}
                                name="displayName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome completo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nome..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" readOnly disabled {...field} />
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
                                        <FormLabel>Ruolo</FormLabel>
                                         <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleziona un ruolo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {roles && roles.filter(r => !r.dataoraelimina).map(role => (
                                                    <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
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
