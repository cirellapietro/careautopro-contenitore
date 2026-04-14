'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase } from '@/firebase';
import { doc, writeBatch } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { doc, writeBatch } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import type { Vehicle } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';
import { Checkbox } from '../ui/checkbox';
import { useLanguage } from '@/contexts/language-context';

const updateMileageSchema = z.object({
  dontAskAgain: z.boolean().default(false),
  vehicles: z.array(z.object({
    id: z.string(),
    name: z.string(),
    currentMileage: z.coerce.number().min(0),

const updateMileageSchema = z.object({
  vehicles: z.array(z.object({
    id: z.string(),
    name: z.string(),
    currentMileage: z.coerce.number().min(0, "Il chilometraggio non può essere negativo."),
  }))
});

type UpdateMileageFormValues = z.infer<typeof updateMileageSchema>;

export function UpdateMileageDialog({ open, onOpenChange, vehicles }: { open: boolean, onOpenChange: (open: boolean) => void, vehicles: Vehicle[] }) {
  const { user } = useUser();
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const { t } = useLanguage();
type UpdateMileageDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicles: Vehicle[];
};

export function UpdateMileageDialog({ open, onOpenChange, vehicles }: UpdateMileageDialogProps) {
  const { user } = useUser();
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UpdateMileageFormValues>({
    resolver: zodResolver(updateMileageSchema),
    defaultValues: { dontAskAgain: false, vehicles: [] },
  });

  useEffect(() => {
    if (vehicles && open) {
        form.reset({
            dontAskAgain: localStorage.getItem('hideMileagePrompt') === 'true',
            vehicles: vehicles.map(v => ({ id: v.id, name: v.name, currentMileage: Math.round(v.currentMileage || 0) }))
        })
    }
  }, [vehicles, open, form]);
  
  const { fields } = useFieldArray({ control: form.control, name: 'vehicles' });

  const onSubmit = async (data: UpdateMileageFormValues) => {
    if (!user || !firestore) return;
    setIsSubmitting(true);
    if (data.dontAskAgain) localStorage.setItem('hideMileagePrompt', 'true');

    const batch = writeBatch(firestore);
    data.vehicles.forEach(v => {
      batch.update(doc(firestore, `users/${user.uid}/vehicles`, v.id), { currentMileage: Math.round(v.currentMileage), updatedAt: new Date().toISOString() });
    });

    try {
        await batch.commit();
        toast({ title: 'KILOMETRI AGGIORNATI' });
        onOpenChange(false);
    } catch (e) {
        toast({ variant: 'destructive', title: 'ERRORE' });
    } finally {
        setIsSubmitting(false);
    }
    defaultValues: {
      vehicles: [],
    },
  });

  useEffect(() => {
    if (vehicles) {
        form.reset({
            vehicles: vehicles.map(v => ({ id: v.id, name: v.name, currentMileage: v.currentMileage }))
        })
    }
  }, [vehicles, open, form.reset]);
  
  const { fields } = useFieldArray({
    control: form.control,
    name: 'vehicles'
  });

  const onSubmit = (data: UpdateMileageFormValues) => {
    if (!user || !firestore) return;
    setIsSubmitting(true);

    const batch = writeBatch(firestore);
    data.vehicles.forEach(vehicle => {
      const vehicleRef = doc(firestore, `users/${user.uid}/vehicles`, vehicle.id);
      batch.update(vehicleRef, { currentMileage: vehicle.currentMileage });
    });

    batch.commit()
      .then(() => {
        toast({
          title: 'Successo!',
          description: 'Chilometraggio dei veicoli aggiornato.',
        });
        onOpenChange(false);
      })
      .catch((serverError) => {
        const permissionError = new FirestorePermissionError({
          path: `users/${user.uid}/vehicles`,
          operation: 'update',
          requestResourceData: data.vehicles,
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({
          variant: 'destructive',
          title: 'Errore di Permesso',
          description: 'Impossibile aggiornare il chilometraggio.',
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="uppercase italic font-black text-2xl">{t('update_mileage')}</DialogTitle>
          <DialogDescription className="uppercase text-[10px] font-bold">{t('mileage_prompt_desc')}</DialogDescription>
          <DialogTitle>Aggiorna Chilometraggio</DialogTitle>
          <DialogDescription>
            Non stai tracciando nessun veicolo. Per fornirti statistiche accurate, per favore inserisci il chilometraggio attuale dei tuoi veicoli.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ScrollArea className="h-64 pr-4">
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <FormField key={field.id} control={form.control} name={`vehicles.${index}.currentMileage`} render={({ field: f }) => (
                      <FormItem><FormLabel className="uppercase text-[10px] font-black">{field.name}</FormLabel><FormControl><Input type="number" {...f} className="font-bold h-12" /></FormControl><FormMessage /></FormItem>
                  )} />
                ))}
              </div>
            </ScrollArea>
            <div className="flex items-center space-x-2 bg-muted/20 p-3 rounded-md border">
                <Checkbox id="dontAskMileage" checked={form.watch('dontAskAgain')} onCheckedChange={(val) => form.setValue('dontAskAgain', !!val)} />
                <label htmlFor="dontAskMileage" className="text-[10px] font-black uppercase cursor-pointer">{t('dont_ask_again')}</label>
            </div>
            <DialogFooter className="flex flex-col gap-2">
              <Button type="submit" disabled={isSubmitting} className="w-full font-black uppercase h-12 shadow-lg bg-accent hover:bg-accent/90">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} SALVA KM REALI
              </Button>
              <Button type="button" onClick={() => onOpenChange(false)} className="w-full h-12 font-black uppercase shadow-lg bg-accent hover:bg-accent/90">
                {t('resume').toUpperCase()} PIÙ TARDI
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`vehicles.${index}.currentMileage`}
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel>{field.name}</FormLabel>
                        <FormControl>
                          <Input type="number" {...formField} value={formField.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Più Tardi
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salva
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
}
