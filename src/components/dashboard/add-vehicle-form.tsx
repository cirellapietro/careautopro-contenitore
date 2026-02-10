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
import { CalendarIcon, Loader2 } from 'lucide-react';
import type { VehicleType, MaintenanceCheck } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

const addVehicleSchema = z.object({
  name: z.string().min(2, { message: 'Il nome è obbligatorio.' }),
  registrationDate: z.string().min(1, "La data di immatricolazione è obbligatoria."),
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

  const form = useForm<AddVehicleFormValues>({
    resolver: zodResolver(addVehicleSchema),
    defaultValues: {
      registrationDate: new Date().toISOString().split('T')[0],
      name: '',
      licensePlate: '',
    },
  });

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
    // Wait for dialog close animation before resetting state
    setTimeout(() => {
        setNewVehicleId(null);
        form.reset({
            registrationDate: new Date().toISOString().split('T')[0],
            name: '',
            licensePlate: '',
            vehicleTypeId: undefined,
            currentMileage: undefined,
        });
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

      // 1. Create Vehicle
      const newVehicle = {
        id: newVehicleRef.id,
        userId: user.uid,
        ...values,
        make: make || '',
        model: model || '',
        type: selectedVehicleType.name,
        currentMileage: mileage,
        lastMaintenanceDate: new Date().toISOString().split('T')[0],
      };
      batch.set(newVehicleRef, newVehicle);

      // 2. Fetch standard maintenance checks for the type
      const checksRef = collection(
        firestore,
        `vehicleTypes/${values.vehicleTypeId}/maintenanceChecks`
      );
      const checksSnap = await getDocs(checksRef);
      const checks = checksSnap.docs.map(
        (d) => d.data() as MaintenanceCheck
      );

      // 3. Create initial interventions
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

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) {
            handleClose();
        } else {
            onOpenChange(true);
        }
    }}>
      <DialogContent className="sm:max-w-[425px]">
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
                  automaticamente gli interventi di manutenzione di base, che potrai
                  visualizzare e aggiornare dalla pagina di dettaglio del veicolo.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Nome veicolo</FormLabel>
                          <FormControl>
                            <Input placeholder="Es. Fiat Panda (Lavoro)" {...field} />
                          </FormControl>
                          <FormDescription>
                            Aggiungi marca, modello e un nome per identificare il veicolo.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="registrationDate"
                      render={({ field }) => (
                        <FormItem>
                            <FormLabel>Data di immatricolazione</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className={cn('w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground')}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? (
                                                format(new Date(field.value), 'PPP', { locale: it })
                                            ) : (
                                                <span>Scegli una data</span>
                                            )}
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        locale={it}
                                        selected={field.value ? new Date(field.value) : undefined}
                                        onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
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
                            <Input placeholder="Es. AB123CD" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
                          <Input type="number" placeholder="Es. 45000" {...field} />
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
                      onClick={() => onOpenChange(false)}
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
