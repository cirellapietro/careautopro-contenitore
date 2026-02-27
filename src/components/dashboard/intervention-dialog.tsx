
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import type { MaintenanceIntervention } from '@/lib/types';

const interventionSchema = z.object({
  description: z.string().min(3, { message: 'La descrizione è obbligatoria.' }),
  scheduledDate: z.string().optional(),
  completionDate: z.string().optional(),
  status: z.enum(['Richiesto', 'Pianificato', 'Completato']),
  urgency: z.enum(['Alta', 'Media', 'Bassa']),
  cost: z.coerce.number().optional(),
  notes: z.string().optional(),
});

type InterventionFormValues = z.infer<typeof interventionSchema>;

type InterventionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleId: string;
  intervention?: MaintenanceIntervention | null;
};

export function InterventionDialog({ open, onOpenChange, vehicleId, intervention }: InterventionDialogProps) {
  const { user } = useUser();
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEdit = !!intervention;

  const form = useForm<InterventionFormValues>({
    resolver: zodResolver(interventionSchema),
    defaultValues: {
      description: '',
      status: 'Pianificato',
      urgency: 'Media',
      scheduledDate: new Date().toISOString().split('T')[0],
      notes: '',
    },
  });

  useEffect(() => {
    if (open) {
      if (intervention) {
        form.reset({
          description: intervention.description || '',
          status: intervention.status || 'Pianificato',
          urgency: intervention.urgency || 'Media',
          scheduledDate: intervention.scheduledDate || '',
          completionDate: intervention.completionDate || '',
          cost: intervention.cost,
          notes: intervention.notes || '',
        });
      } else {
        form.reset({
          description: '',
          status: 'Pianificato',
          urgency: 'Media',
          scheduledDate: new Date().toISOString().split('T')[0],
          completionDate: '',
          cost: undefined,
          notes: '',
        });
      }
    }
  }, [open, intervention, form]);

  const onSubmit = async (values: InterventionFormValues) => {
    if (!user || !firestore || !vehicleId) return;
    setIsSubmitting(true);

    const interventionData = {
      ...values,
      vehicleId,
      dataoraelimina: null,
    };

    try {
      if (isEdit && intervention) {
        const docRef = doc(firestore, `users/${user.uid}/vehicles/${vehicleId}/maintenanceInterventions`, intervention.id);
        updateDoc(docRef, interventionData).catch(serverError => {
            const permissionError = new FirestorePermissionError({
                path: docRef.path,
                operation: 'update',
                requestResourceData: interventionData,
            });
            errorEmitter.emit('permission-error', permissionError);
        });
        toast({ title: 'Intervento aggiornato' });
      } else {
        const colRef = collection(firestore, `users/${user.uid}/vehicles/${vehicleId}/maintenanceInterventions`);
        const newDocRef = await addDoc(colRef, interventionData);
        await updateDoc(newDocRef, { id: newDocRef.id });
        toast({ title: 'Intervento aggiunto' });
      }
      onOpenChange(false);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Errore', description: 'Impossibile salvare l\'intervento.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Modifica Intervento' : 'Aggiungi Intervento'}</DialogTitle>
          <DialogDescription>
            Inserisci i dettagli della manutenzione per questo veicolo.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrizione</FormLabel>
                  <FormControl>
                    <Input placeholder="Es. Cambio Olio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stato</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Richiesto">Richiesto</SelectItem>
                        <SelectItem value="Pianificato">Pianificato</SelectItem>
                        <SelectItem value="Completato">Completato</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Urgenza</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Bassa">Bassa</SelectItem>
                        <SelectItem value="Media">Media</SelectItem>
                        <SelectItem value="Alta">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="scheduledDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Prevista</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Costo (€)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {form.watch('status') === 'Completato' && (
              <FormField
                control={form.control}
                name="completionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Completamento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Altre informazioni..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annulla</Button>
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
