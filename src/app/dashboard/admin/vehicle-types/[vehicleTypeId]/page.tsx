'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { doc, updateDoc, setDoc, collection, query, where } from 'firebase/firestore';
import { notFound, useRouter, useParams } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@/firebase/auth/use-user";
import { useFirebase, useDoc, useCollection, errorEmitter, FirestorePermissionError } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, ArrowLeft, PlusCircle, Pencil, Trash2 } from 'lucide-react';
import type { VehicleType, MaintenanceCheck } from '@/lib/types';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from '@/lib/utils';

const vehicleTypeEditSchema = z.object({
  name: z.string().min(1, "Il nome è obbligatorio."),
  averageAnnualMileage: z.coerce.number().min(0, "Il chilometraggio non può essere negativo."),
});

function MaintenanceChecksList({ vehicleTypeId }: { vehicleTypeId: string }) {
    const { firestore } = useFirebase();
    const router = useRouter();
    const { toast } = useToast();

    const [checkToDelete, setCheckToDelete] = useState<MaintenanceCheck | null>(null);

    const checksQuery = useMemo(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'vehicleTypes', vehicleTypeId, 'maintenanceChecks'), where('dataoraelimina', '==', null));
    }, [firestore, vehicleTypeId]);

    const { data: checks, isLoading } = useCollection<MaintenanceCheck>(checksQuery);

    const handleDeleteCheck = () => {
        if (!checkToDelete || !firestore) return;
        const docRef = doc(firestore, 'vehicleTypes', vehicleTypeId, 'maintenanceChecks', checkToDelete.id);
        const dataToUpdate = { dataoraelimina: new Date().toISOString() };
        updateDoc(docRef, dataToUpdate)
            .then(() => {
                toast({ title: "Controllo eliminato", description: "Il controllo è stato contrassegnato come eliminato." });
            })
            .catch((serverError) => {
                const permissionError = new FirestorePermissionError({
                    path: docRef.path,
                    operation: 'update',
                    requestResourceData: dataToUpdate,
                });
                errorEmitter.emit('permission-error', permissionError);
                toast({ variant: 'destructive', title: "Errore di Permesso", description: "Non disponi dei permessi per eliminare questo controllo." });
            })
            .finally(() => {
                setCheckToDelete(null);
            });
    };

    return (
        <>
            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle>Controlli di Manutenzione Standard</CardTitle>
                        <CardDescription>
                            I controlli standard associati a questo tipo di veicolo.
                        </CardDescription>
                    </div>
                    <Button size="sm" onClick={() => router.push(`/dashboard/admin/vehicle-types/${vehicleTypeId}/maintenance-checks/new`)}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Aggiungi
                    </Button>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-24">
                            <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                    ) : (
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
                                {checks && checks.map(check => (
                                    <TableRow 
                                        key={check.id}
                                        className={cn("cursor-pointer", check.dataoraelimina && 'text-muted-foreground opacity-50')}
                                        onClick={() => !check.dataoraelimina && router.push(`/dashboard/admin/vehicle-types/${vehicleTypeId}/maintenance-checks/${check.id}`)}
                                    >
                                        <TableCell className="font-medium">{check.description}</TableCell>
                                        <TableCell>{check.intervalMileage ? `${check.intervalMileage.toLocaleString('it-IT')} km` : 'N/A'}</TableCell>
                                        <TableCell>{check.intervalTime ? `${check.intervalTime} mesi` : 'N/A'}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/admin/vehicle-types/${vehicleTypeId}/maintenance-checks/${check.id}`)}} disabled={!!check.dataoraelimina}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); setCheckToDelete(check); }} disabled={!!check.dataoraelimina}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {checks?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center h-24">Nessun controllo standard trovato.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
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
        </>
    );
}

export default function AdminVehicleTypeEditPage() {
    const params = useParams() as { vehicleTypeId: string };
    const { vehicleTypeId } = params;
    const { user: currentUser, loading: userLoading } = useUser();
    const { firestore } = useFirebase();
    const { toast } = useToast();
    const router = useRouter();
    const isNew = vehicleTypeId === 'new';

    const vtRef = useMemo(() => {
        if (!firestore) return null;
        if (isNew) return doc(collection(firestore, 'vehicleTypes'));
        return doc(firestore, 'vehicleTypes', vehicleTypeId);
    }, [firestore, vehicleTypeId, isNew]);

    const { data: vehicleTypeToEdit, isLoading: isVtLoading } = useDoc<VehicleType>(isNew ? null : vtRef);

    const form = useForm<z.infer<typeof vehicleTypeEditSchema>>({
        resolver: zodResolver(vehicleTypeEditSchema),
        defaultValues: {
            name: '',
            averageAnnualMileage: 0,
        }
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

    const onSubmit = (data: z.infer<typeof vehicleTypeEditSchema>) => {
        if (!vtRef) return;
        
        const operationType = isNew ? 'create' : 'update';
        const dataToSave = isNew ? { ...data, id: vtRef.id, dataoraelimina: null } : data;
        const operation = isNew ? setDoc(vtRef, dataToSave) : updateDoc(vtRef, dataToSave);

        operation.then(() => {
            toast({ title: "Successo", description: isNew ? "Tipo veicolo creato." : "Tipo veicolo aggiornato." });
            if (isNew) {
                router.push('/dashboard/admin/vehicle-types');
            }
        }).catch(serverError => {
            const permissionError = new FirestorePermissionError({
                path: vtRef.path,
                operation: operationType as 'create' | 'update',
                requestResourceData: dataToSave,
            });
            errorEmitter.emit('permission-error', permissionError);
            toast({ variant: 'destructive', title: "Errore di Permesso", description: "Non disponi dei permessi per salvare questo tipo veicolo." });
        });
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                            <Input type="number" placeholder="Es. 15000" {...field} value={field.value ?? ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                 {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                 {isNew ? 'Crea Tipo Veicolo' : 'Salva Modifiche'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
            
            {!isNew && <MaintenanceChecksList vehicleTypeId={vehicleTypeId} />}
        </div>
    );
}
