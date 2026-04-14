
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase } from '@/firebase';
import { doc, updateDoc, writeBatch } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import type { Vehicle } from '@/lib/types';

const editVehicleSchema = z.object({
  name: z.string().min(2, { message: 'IL NOME È OBBLIGATORIO.' }),
  licensePlate: z.string().min(5, { message: 'TARGA NON VALIDA.' }),
  currentMileage: z.coerce.number().min(0),
  driverEmail: z.string().email("EMAIL NON VALIDA.").optional().or(z.literal('')),
});

type EditVehicleFormValues = z.infer<typeof editVehicleSchema>;

export function EditVehicleForm({ open, onOpenChange, vehicle }: { open: boolean, onOpenChange: (open: boolean) => void, vehicle: Vehicle }) {
  const { user } = useUser();
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EditVehicleFormValues>({
    resolver: zodResolver(editVehicleSchema),
    defaultValues: {
      name: vehicle.name || '',
      licensePlate: vehicle.licensePlate || '',
      currentMileage: vehicle.currentMileage || 0,
      driverEmail: vehicle.driverEmail || '',
    },
  });

  useEffect(() => {
    if (open && vehicle) {
      form.reset({
        name: vehicle.name,
        licensePlate: vehicle.licensePlate,
        currentMileage: vehicle.currentMileage,
        driverEmail: vehicle.driverEmail || '',
      });
    }
  }, [open, vehicle, form]);

  const onSubmit = async (values: EditVehicleFormValues) => {
    if (!user || !firestore) return;
    setIsSubmitting(true);

    try {
      const vehicleRef = doc(firestore, `users/${user.uid}/vehicles`, vehicle.id);
      await updateDoc(vehicleRef, {
        ...values,
        name: values.name.toUpperCase(),
        licensePlate: values.licensePlate.toUpperCase(),
        updatedAt: new Date().toISOString(),
      });
      toast({ title: 'VEICOLO AGGIORNATO', description: 'DATI E CONDUCENTE SALVATI CORRETTAMENTE.' });
      onOpenChange(false);
    } catch (e) {
      toast({ variant: 'destructive', title: 'ERRORE', description: 'IMPOSSIBILE SALVARE LE MODIFICHE.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader><DialogTitle className="uppercase font-black italic">Modifica Veicolo</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel className="text-[10px] font-black uppercase">Marca e Modello</FormLabel><FormControl><Input {...field} className="uppercase font-bold" /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="driverEmail" render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase">Email Conducente</FormLabel>
                    <FormControl><Input {...field} placeholder="email@conducente.it" className="font-bold" /></FormControl>
                    <FormDescription className="text-[9px] uppercase">CAMBIA IL CONDUCENTE ASSEGNATO A QUESTO MEZZO.</FormDescription>
                    <FormMessage />
                </FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="licensePlate" render={({ field }) => (
                    <FormItem><FormLabel className="text-[10px] font-black uppercase">Targa</FormLabel><FormControl><Input {...field} className="uppercase font-bold" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="currentMileage" render={({ field }) => (
                    <FormItem><FormLabel className="text-[10px] font-black uppercase">Chilometraggio</FormLabel><FormControl><Input type="number" {...field} className="font-bold" /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
            <DialogFooter className="flex flex-col gap-2 pt-2">
              <Button type="submit" disabled={isSubmitting} className="w-full h-12 font-black uppercase tracking-tight shadow-lg bg-accent hover:bg-accent/90">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} SALVA
              </Button>
              <Button 
                type="button" 
                variant="default" 
                onClick={() => onOpenChange(false)} 
                className="w-full h-12 font-black uppercase shadow-lg bg-accent hover:bg-accent/90"
              >
                ANNULLA
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
