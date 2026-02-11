'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { doc, updateDoc, setDoc, collection } from 'firebase/firestore';
import { notFound, useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@/firebase/auth/use-user";
import { useFirebase, useDoc, errorEmitter, FirestorePermissionError } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Loader2, ArrowLeft } from 'lucide-react';
import type { MaintenanceCheck } from '@/lib/types';
import Link from 'next/link';

const checkEditSchema = z.object({
  description: z.string().min(3, "La descrizione è obbligatoria."),
  intervalMileage: z.coerce.number().min(0).optional(),
  intervalTime: z.coerce.number().min(0).optional(),
}).refine(data => data.intervalMileage || data.intervalTime, {
    message: "Deve essere specificato almeno un intervallo (km o mesi).",
    path: ["intervalMileage"],
});

type PageParams = {
    vehicleTypeId: string;
    checkId: string;
}

export default function AdminCheckEditPage({ params }: { params: PageParams }) {
    const { user: currentUser, loading: userLoading } = useUser();
    const { firestore } = useFirebase();
    const { toast } = useToast();
    const router = useRouter();
    const isNew = params.checkId === 'new';

    const checkRef = useMemo(() => {
        if (!firestore) return null;
        if (isNew) return doc(collection(firestore, 'vehicleTypes', params.vehicleTypeId, 'maintenanceChecks'));
        return doc(firestore, 'vehicleTypes', params.vehicleTypeId, 'maintenanceChecks', params.checkId);
    }, [firestore, params.vehicleTypeId, params.checkId, isNew]);

    const { data: checkToEdit, isLoading: isCheckLoading } = useDoc<MaintenanceCheck>(isNew ? null : checkRef);

    const form = useForm<z.infer<typeof checkEditSchema>>({
        resolver: zodResolver(checkEditSchema),
    });

    useEffect(() => {
        if (!userLoading && (!currentUser || currentUser.role !== 'Amministratore')) {
            router.push('/dashboard');
        }
    }, [currentUser, userLoading, router]);

    useEffect(() => {
        if (checkToEdit && !isNew) {
            form.reset({
                description: checkToEdit.description || '',
                intervalMileage: checkToEdit.intervalMileage || undefined,
                intervalTime: checkToEdit.intervalTime || undefined,
            });
        }
    }, [checkToEdit, form, isNew]);

    const onSubmit = (data: z.infer<typeof checkEditSchema>) => {
        if (!checkRef) return;

        const dataToSave = {
            ...data,
            vehicleTypeId: params.vehicleTypeId,
            ...(isNew && { id: checkRef.id }),
        };

        const operationType = isNew ? 'create' : 'update';
        const operation = isNew ? setDoc(checkRef, dataToSave, { merge: true }) : updateDoc(checkRef, dataToSave);

        operation
            .then(() => {
                toast({ title: "Successo", description: isNew ? "Controllo creato." : "Controllo aggiornato." });
                router.push(`/dashboard/admin/vehicle-types/${params.vehicleTypeId}`);
            })
            .catch((serverError) => {
                const permissionError = new FirestorePermissionError({
                    path: checkRef.path,
                    operation: operationType as 'create' | 'update',
                    requestResourceData: dataToSave,
                });
                errorEmitter.emit('permission-error', permissionError);
                toast({ variant: 'destructive', title: "Errore di Permesso", description: "Non disponi dei permessi per salvare questo controllo." });
            });
    };

    if (userLoading || (isCheckLoading && !isNew)) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    
    if (!isNew && !checkToEdit && !isCheckLoading) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <Link href={`/dashboard/admin/vehicle-types/${params.vehicleTypeId}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Torna al Tipo Veicolo
            </Link>
            <div>
                <h1 className="font-headline text-3xl font-bold">{isNew ? 'Nuovo Controllo' : 'Modifica Controllo'}</h1>
                <p className="text-muted-foreground">{isNew ? 'Crea un nuovo controllo di manutenzione standard.' : 'Modifica i dettagli del controllo.'}</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Dettagli Controllo</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrizione</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Es. Cambio olio e filtro" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="intervalMileage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Intervallo Chilometrico (opzionale)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Es. 15000" {...field} />
                                            </FormControl>
                                            <FormDescription>Ogni quanti km va eseguito.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="intervalTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Intervallo Temporale (mesi, opzionale)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Es. 12" {...field} />
                                            </FormControl>
                                            <FormDescription>Ogni quanti mesi va eseguito.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
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
