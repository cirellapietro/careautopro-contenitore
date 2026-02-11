'use client';

import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { doc, updateDoc, setDoc, collection } from 'firebase/firestore';
import { notFound, useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@/firebase/auth/use-user";
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, ArrowLeft } from 'lucide-react';
import type { VehicleType } from '@/lib/types';
import Link from 'next/link';

const vehicleTypeEditSchema = z.object({
  name: z.string().min(1, "Il nome è obbligatorio."),
  averageAnnualMileage: z.coerce.number().min(0, "Il chilometraggio non può essere negativo."),
});

export default function AdminVehicleTypeEditPage({ params }: { params: { id: string } }) {
    const { user: currentUser, loading: userLoading } = useUser();
    const { firestore } = useFirebase();
    const { toast } = useToast();
    const router = useRouter();
    const isNew = params.id === 'new';

    const vtRef = useMemoFirebase(() => {
        if (!firestore) return null;
        if (isNew) return doc(collection(firestore, 'vehicleTypes'));
        return doc(firestore, 'vehicleTypes', params.id);
    }, [firestore, params.id, isNew]);

    const { data: vehicleTypeToEdit, isLoading: isVtLoading } = useDoc<VehicleType>(isNew ? null : vtRef);

    const form = useForm<z.infer<typeof vehicleTypeEditSchema>>({
        resolver: zodResolver(vehicleTypeEditSchema),
    });

    useEffect(() => {
        if (!userLoading && (!currentUser || currentUser.role !== 'Amministratore')) {
            router.push('/dashboard');
        }
    }, [currentUser, userLoading, router]);

    useEffect(() => {
        if (vehicleTypeToEdit && !isNew) {
            form.reset({
                name: vehicleTypeToEdit.name || '',
                averageAnnualMileage: vehicleTypeToEdit.averageAnnualMileage || 0,
            });
        }
    }, [vehicleTypeToEdit, form, isNew]);

    const onSubmit = async (data: z.infer<typeof vehicleTypeEditSchema>) => {
        if (!vtRef) return;

        try {
            if (isNew) {
                await setDoc(vtRef, { ...data, id: vtRef.id });
                toast({ title: "Successo", description: "Tipo veicolo creato." });
            } else {
                await updateDoc(vtRef, data);
                toast({ title: "Successo", description: "Tipo veicolo aggiornato." });
            }
            router.push('/dashboard/admin/vehicle-types');
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: "Errore", description: "Impossibile salvare il tipo veicolo." });
        }
    };

    if (userLoading || (isVtLoading && !isNew)) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    
    if (!isNew && !vehicleTypeToEdit && !isVtLoading) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <Link href="/dashboard/admin/vehicle-types" className="flex items-center gap-2 text-sm text-muted-foreground hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Torna all'elenco
            </Link>
            <div>
                <h1 className="font-headline text-3xl font-bold">{isNew ? 'Nuovo Tipo Veicolo' : 'Modifica Tipo Veicolo'}</h1>
                <p className="text-muted-foreground">{isNew ? 'Crea un nuovo tipo di veicolo.' : 'Modifica i dettagli del tipo di veicolo.'}</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Dettagli</CardTitle>
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
                                        <FormLabel>Chilometraggio Medio Annuo (km)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Es. 15000" {...field} />
                                        </FormControl>
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
