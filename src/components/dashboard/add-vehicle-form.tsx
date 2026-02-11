'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase } from '@/firebase';
import {
  collection,
  doc,
  getDocs,
  writeBatch,
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
  FormDescription,
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
import { Loader2 } from 'lucide-react';
import type { VehicleType, MaintenanceCheck } from '@/lib/types';
import { useRouter } from 'next/navigation';


const addVehicleSchema = z.object({
  name: z.string().min(2, { message: 'Il nome è obbligatorio.' }),
  registrationDate: z.string({
    required_error: 'La data di immatricolazione è obbligatoria.',
  }).min(1, { message: 'La data di immatricolazione è obbligatoria.' }),
  licensePlate: z
    .string()
    .min(5, { message: 'Targa non valida.' })
    .max(10, { message: 'Targa non valida.' }),
  vehicleTypeId: z.string({ required_error: 'Seleziona un tipo.' }),
  currentMileage: z.coerce.number().optional(),
});

type AddVehicleFormValues = z.infer<typeof addVehicleSchema>;

type AddVehicleFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddVehicleForm({ open, onOpenChange }: AddVehicleFormProps) {
  const { user } = useUser();
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const router = useRouter();

  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [newVehicleId, setNewVehicleId] = useState<string | null>(null);

  const [year, setYear] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');

  const form = useForm<AddVehicleFormValues>({
    resolver: zodResolver(addVehicleSchema),
    defaultValues: {
      name: '',
      licensePlate: '',
      registrationDate: '',
    },
  });

  // When the dialog opens, reset everything
  useEffect(() => {
    if (open) {
      form.reset({
        name: '',
        licensePlate: '',
        registrationDate: '',
        vehicleTypeId: undefined,
        currentMileage: undefined,
      });
      setYear('');
      setMonth('');
      setDay('');
    }
  }, [open, form]);

  // Combine date parts into the form field
  useEffect(() => {
    if (year && month && day) {
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (date.getFullYear() === parseInt(year) && date.getMonth() === parseInt(month) - 1 && date.getDate() === parseInt(day)) {
        const combinedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        form.setValue('registrationDate', combinedDate, { shouldValidate: true });
      } else {
        form.setValue('registrationDate', '', { shouldValidate: true });
      }
    } else if (form.getValues('registrationDate') !== '') {
        form.setValue('registrationDate', '', { shouldValidate: true });
    }
  }, [year, month, day, form]);

  const selectedTypeId = form.watch('vehicleTypeId');
  const selectedVehicleType = vehicleTypes.find(
    (vt) => vt.id === selectedTypeId
  );

  useEffect(() => {
    if (!firestore) return;
    const fetchVehicleTypes = async () => {
      setLoadingTypes(true);
      try {
        const typesRef = collection(firestore, 'vehicleTypes');
        const snapshot = await getDocs(typesRef);
        const types = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as VehicleType)
        );
        setVehicleTypes(types);
      } catch (error) {
        console.error('Error fetching vehicle types:', error);
        toast({
          variant: 'destructive',
          title: 'Errore',
          description: 'Impossibile caricare i tipi di veicolo.',
        });
      } finally {
        setLoadingTypes(false);
      }
    };
    fetchVehicleTypes();
  }, [firestore, toast]);

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
        setNewVehicleId(null);
        setIsSubmitting(false);
    }, 300);
  };

  const onSubmit = async (values: AddVehicleFormValues) => {
    if (!user || !firestore || !selectedVehicleType) return;

    setIsSubmitting(true);
    try {
      const batch = writeBatch(firestore);
      const newVehicleRef = doc(
        collection(firestore, `users/${user.uid}/vehicles`)
      );

      const mileage =
        values.currentMileage ?? selectedVehicleType.averageAnnualMileage;
        
      const nameParts = values.name.split(' ');
      const make = nameParts[0];
      const model = nameParts.slice(1).join(' ').replace(/\(.*\)/g, '').trim();

      const newVehicle = {
        ...values,
        id: newVehicleRef.id,
        userId: user.uid,
        make: make || '',
        model: model || '',
        type: selectedVehicleType.name,
        currentMileage: mileage,
        lastMaintenanceDate: new Date().toISOString().split('T')[0],
      };
      batch.set(newVehicleRef, newVehicle);

      const checksRef = collection(
        firestore,
        `vehicleTypes/${values.vehicleTypeId}/maintenanceChecks`
      );
      const checksSnap = await getDocs(checksRef);
      const checks = checksSnap.docs.map(
        (d) => d.data() as MaintenanceCheck
      );

      for (const check of checks) {
        const newInterventionRef = doc(
          collection(newVehicleRef, 'maintenanceInterventions')
        );
        batch.set(newInterventionRef, {
          id: newInterventionRef.id,
          vehicleId: newVehicleRef.id,
          description: check.description,
          status: 'Richiesto',
          urgency: 'Media',
          notes: `Intervento generato automaticamente. Aggiornare con la data dell'ultimo intervento eseguito.`,
          scheduledDate: new Date().toISOString(),
        });
      }

      await batch.commit();

      toast({
        title: 'Successo!',
        description: 'Veicolo aggiunto e interventi iniziali generati.',
      });
      setNewVehicleId(newVehicleRef.id);
    } catch (error) {
      console.error('Error adding vehicle:', error);
      toast({
        variant: 'destructive',
        title: 'Errore',
        description: "Si è verificato un problema durante l'aggiunta del veicolo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: new Date(0, i).toLocaleString('it-IT', { month: 'long' }) }));
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) {
            handleClose();
        } else {
            onOpenChange(true);
        }
    }}>
      <DialogContent className="sm:max-w-md">
        {newVehicleId ? (
            <>
                <DialogHeader>
                  <DialogTitle>Veicolo Aggiunto con Successo!</DialogTitle>
                  <DialogDescription>
                    Ottimo! Ora, per una gestione perfetta, ti consigliamo di aggiornare gli interventi di manutenzione che abbiamo creato per te. Inserisci le tue scadenze reali (es. data scadenza assicurazione, revisione, ultimo tagliando) per ricevere promemoria puntuali.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start gap-2 pt-4">
                    <Button
                        onClick={() => {
                            router.push(`/dashboard/vehicles/${newVehicleId}`);
                            handleClose();
                        }}
                    >
                        Vai al Veicolo e Aggiorna
                    </Button>
                    <Button variant="outline" onClick={handleClose}>
                        Più Tardi
                    </Button>
                </DialogFooter>
            </>
        ) : (
            <>
              <DialogHeader>
                <DialogTitle>Aggiungi Nuovo Veicolo</DialogTitle>
                <DialogDescription>
                  Inserisci i dettagli del tuo veicolo. Verranno generati
                  automaticamente gli interventi di manutenzione di base.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome veicolo</FormLabel>
                        <FormControl>
                          <Input placeholder="Es. Fiat Panda (Lavoro)" {...field} />
                        </FormControl>
                        <FormDescription>
                          Inserisci marca, modello e un nome per identificare il veicolo.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="licensePlate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Targa</FormLabel>
                        <FormControl>
                          <Input placeholder="ES. AB123CD" {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="registrationDate"
                    render={() => (
                      <FormItem>
                        <FormLabel>Data di immatricolazione</FormLabel>
                        <div className="grid grid-cols-3 gap-2">
                          <Select onValueChange={setDay} value={day}>
                            <SelectTrigger>
                              <SelectValue placeholder="Giorno" />
                            </SelectTrigger>
                            <SelectContent>
                              {days.map(d => <SelectItem key={d} value={String(d)}>{d}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <Select onValueChange={setMonth} value={month}>
                            <SelectTrigger>
                              <SelectValue placeholder="Mese" />
                            </SelectTrigger>
                            <SelectContent>
                              {months.map(m => <SelectItem key={m.value} value={String(m.value)}>{m.label}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <Select onValueChange={setYear} value={year}>
                            <SelectTrigger>
                              <SelectValue placeholder="Anno" />
                            </SelectTrigger>
                            <SelectContent>
                              {years.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vehicleTypeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo di veicolo</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={loadingTypes}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={loadingTypes ? "Caricamento..." : "Seleziona un tipo"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vehicleTypes.map((vt) => (
                              <SelectItem key={vt.id} value={vt.id}>
                                {vt.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currentMileage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chilometraggio attuale (opzionale)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Es. 45000"
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormDescription>
                          {selectedVehicleType && !form.getValues('currentMileage')
                            ? `Se non specificato, verrà usata una media di ${selectedVehicleType.averageAnnualMileage.toLocaleString('it-IT')} km.`
                            : 'Inserisci i km attuali per una maggiore precisione.'}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClose}
                      disabled={isSubmitting}
                    >
                      Annulla
                    </Button>
                    <Button type="submit" disabled={isSubmitting || loadingTypes}>
                      {isSubmitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Aggiungi Veicolo
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </>
        )}
      </DialogContent>
    </Dialog>
  );
}
