'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import {
  collection,
  doc,
  writeBatch,
  query,
  where,
  getDocs,
  updateDoc,
  addDoc
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
import type { VehicleType } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { fetchMaintenancePlan } from '@/ai/flows/fetch-maintenance-plan';
import { Checkbox } from '../ui/checkbox';
import { useTracking } from '@/contexts/tracking-context';
import { reverseGeocode } from '@/ai/flows/reverse-geocode';
import { fetchAverageMileage } from '@/ai/flows/fetch-average-mileage';


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
  isTaxi: z.boolean().default(false),
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
  const { permissionStatus } = useTracking();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newVehicleId, setNewVehicleId] = useState<string | null>(null);

  const [year, setYear] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(true);

  const [cityAverageMileage, setCityAverageMileage] = useState<number | null>(null);
  const [isFetchingSuggestion, setIsFetchingSuggestion] = useState(false);

  const form = useForm<AddVehicleFormValues>({
    resolver: zodResolver(addVehicleSchema),
    defaultValues: {
      name: '',
      licensePlate: '',
      registrationDate: '',
      currentMileage: undefined,
      isTaxi: false,
    },
  });
  
  const registrationDate = form.watch('registrationDate');

  // Fetch vehicle types with getDocs
  useEffect(() => {
    if (!firestore || !open) {
      return;
    }

    const fetchVehicleTypes = async () => {
      setLoadingTypes(true);
      try {
        const vehicleTypesQuery = query(collection(firestore, 'vehicleTypes'), where('dataoraelimina', '==', null));
        const querySnapshot = await getDocs(vehicleTypesQuery);
        const types = querySnapshot.docs.map(doc => ({ ...doc.data() }) as VehicleType);
        setVehicleTypes(types);
      } catch (serverError) {
        const permissionError = new FirestorePermissionError({
          path: 'vehicleTypes',
          operation: 'list',
          requestResourceData: { context: 'Fetching vehicle types for add vehicle form.' }
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({
          variant: 'destructive',
          title: 'Errore Caricamento Dati',
          description: 'Impossibile caricare i tipi di veicolo. L\'amministratore potrebbe dover configurare l\'app.'
        });
      } finally {
        setLoadingTypes(false);
      }
    };

    fetchVehicleTypes();
  }, [firestore, open, toast]);


   // When the dialog opens, reset everything
  useEffect(() => {
    if (open) {
      form.reset({
        name: '',
        licensePlate: '',
        registrationDate: '',
        vehicleTypeId: undefined,
        currentMileage: undefined,
        isTaxi: false,
      });
      setYear('');
      setMonth('');
      setDay('');
      setCityAverageMileage(null);
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
    } else {
        form.setValue('registrationDate', '', { shouldValidate: true });
    }
  }, [year, month, day, form]);

  // Fetch location-based mileage suggestion
  useEffect(() => {
    if (open && navigator.geolocation && permissionStatus === 'granted' && !cityAverageMileage) {
        const getSuggestion = async (position: GeolocationPosition) => {
          setIsFetchingSuggestion(true);
          const { latitude, longitude } = position.coords;
          const locationResult = await reverseGeocode({ latitude, longitude });

          if ('error' in locationResult) {
            if (locationResult.error.includes('Generative Language API')) {
              toast({
                  variant: 'destructive',
                  title: 'Funzione AI disabilitata',
                  description: 'Abilita l\'API Generative Language nella console Google Cloud per ricevere suggerimenti automatici.',
                  duration: 10000,
              });
            } else {
                toast({
                  variant: 'destructive',
                  title: 'Errore Assistente AI',
                  description: "Impossibile recuperare la località.",
                  duration: 8000,
                });
            }
          } else if (locationResult.city) {
              const mileageResult = await fetchAverageMileage({ city: locationResult.city, country: locationResult.country });
              if ('error' in mileageResult) {
                // Silently fail, user can still input manually.
              } else if (mileageResult.averageMileage) {
                setCityAverageMileage(mileageResult.averageMileage);
              }
          }
          setIsFetchingSuggestion(false);
        }

        navigator.geolocation.getCurrentPosition(
            getSuggestion,
            () => {
              setIsFetchingSuggestion(false);
            },
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 1000 * 60 * 60 }
        );
    }
  }, [open, permissionStatus, cityAverageMileage, toast]);

  const suggestedCurrentMileage = useMemo(() => {
    if (!cityAverageMileage || !registrationDate) return null;
    try {
        const regDate = new Date(registrationDate);
        const today = new Date();
        const daysSinceRegistration = (today.getTime() - regDate.getTime()) / (1000 * 3600 * 24);
        if (daysSinceRegistration < 0) return null;
        
        const dailyAverage = cityAverageMileage / 365;
        const estimatedMileage = Math.round(dailyAverage * daysSinceRegistration);
        return estimatedMileage > 0 ? estimatedMileage : null;
    } catch {
        return null;
    }
  }, [cityAverageMileage, registrationDate]);


  const selectedTypeId = form.watch('vehicleTypeId');
  const selectedVehicleType = vehicleTypes.find(
    (vt) => vt.id === selectedTypeId
  );

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

    const nameParts = values.name.split(' ');
    const make = nameParts[0] || '';
    const model = nameParts.slice(1).join(' ').replace(/\(.*?\)/g, '').trim() || '';

    try {
        const mileage = values.currentMileage ?? suggestedCurrentMileage ?? selectedVehicleType.averageAnnualMileage;

        const newVehicleData = {
          ...values,
          userId: user.uid,
          make,
          model,
          type: selectedVehicleType.name,
          currentMileage: mileage,
          lastMaintenanceDate: new Date().toISOString().split('T')[0],
          createdAt: new Date().toISOString(),
          dataoraelimina: null,
        };

        const newVehicleRef = await addDoc(collection(firestore, `users/${user.uid}/vehicles`), newVehicleData);
        await updateDoc(newVehicleRef, { id: newVehicleRef.id });

        const firstBatch = writeBatch(firestore);

        const checksCollectionRef = collection(firestore, `vehicleTypes/${values.vehicleTypeId}/maintenanceChecks`);
        const checksQuery = query(checksCollectionRef, where('dataoraelimina', '==', null));
        const checksSnap = await getDocs(checksQuery);
        const genericChecks = checksSnap.docs.map((d) => d.data());
        
        for (const check of genericChecks) {
            const newInterventionRef = doc(collection(newVehicleRef, 'maintenanceInterventions'));
            firstBatch.set(newInterventionRef, {
                id: newInterventionRef.id,
                vehicleId: newVehicleRef.id,
                description: check.description,
                status: 'Richiesto',
                urgency: 'Media',
                notes: `Intervento generato automaticamente. Aggiornare con la data dell'ultimo intervento eseguito.`,
                scheduledDate: new Date().toISOString(),
                dataoraelimina: null,
            });
        }

        await firstBatch.commit();
        toast({
            title: 'Veicolo creato!',
            description: 'Ora cerco i controlli di manutenzione specifici online...',
        });

        // AI part
        const aiChecksResult = await fetchMaintenancePlan({ make, model });
        
        if ('error' in aiChecksResult) {
            if (aiChecksResult.error.includes('Generative Language API')) {
                toast({
                    variant: 'destructive',
                    title: 'Funzione AI disabilitata',
                    description: 'Il piano di manutenzione specifico non può essere generato. Abilita l\'API Generative Language nella console Google Cloud.',
                    duration: 10000,
                });
            } else {
                toast({
                  variant: 'destructive',
                  title: 'Errore Assistente AI',
                  description: "Impossibile recuperare i controlli suggeriti.",
                });
            }
        } else if (aiChecksResult && aiChecksResult.length > 0) {
            const aiBatch = writeBatch(firestore);
            const existingDescriptions = new Set(genericChecks.map(c => c.description.toLowerCase()));

            for (const check of aiChecksResult) {
                if (existingDescriptions.has(check.description.toLowerCase())) continue;

                const newInterventionRef = doc(collection(newVehicleRef, 'maintenanceInterventions'));
                aiBatch.set(newInterventionRef, {
                    id: newInterventionRef.id,
                    vehicleId: newVehicleRef.id,
                    description: check.description,
                    status: 'Pianificato',
                    urgency: 'Media',
                    notes: `Suggerito dall'AI per ${make} ${model}. Verifica la corrispondenza con il libretto di manutenzione.`,
                    dataoraelimina: null,
                });
            }
            await aiBatch.commit();
            toast({
                title: 'Suggerimenti AI aggiunti!',
                description: 'Aggiunti controlli di manutenzione specifici per il tuo modello.',
            });
        }
        
        setNewVehicleId(newVehicleRef.id);

    } catch (serverError) {
        const permissionError = new FirestorePermissionError({
          path: `users/${user.uid}/vehicles`,
          operation: 'create',
          requestResourceData: { vehicleData: values },
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({
          variant: 'destructive',
          title: 'Errore di Permesso',
          description: "Non disponi dei permessi per aggiungere un nuovo veicolo.",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  const { years, months, days } = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 80 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: new Date(0, i).toLocaleString('it-IT', { month: 'long' }) }));
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    return { years, months, days };
  }, []);

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
                    Veicolo inserito! Abbiamo generato gli interventi di base per questo modello. Per una precisione maggiore, ti invitiamo ad aggiornare le date e i chilometri reali degli ultimi interventi effettuati.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start gap-2 pt-4">
                    <Button
                        onClick={() => {
                            router.push(`/dashboard/vehicles/view?id=${newVehicleId}`);
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
                  automaticamente gli interventi di manutenzione di base e quelli specifici per il tuo modello.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marca e modello veicolo</FormLabel>
                        <FormControl>
                          <Input placeholder="Es. Fiat Panda (Lavoro)" {...field} />
                        </FormControl>
                        <FormDescription>
                          Puoi anche aggiungere un nome per identificare il veicolo, es. (Lavoro).
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
                    name="isTaxi"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            È un taxi?
                          </FormLabel>
                          <FormDescription>
                            Seleziona se il veicolo è utilizzato per servizio taxi.
                          </FormDescription>
                        </div>
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
                          disabled={loadingTypes || vehicleTypes.length === 0}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={
                                loadingTypes 
                                ? "Caricamento tipi..." 
                                : (vehicleTypes.length === 0)
                                    ? "Nessun tipo trovato"
                                    : "Seleziona un tipo"
                                } />
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
                            placeholder={
                                isFetchingSuggestion ? "Calcolando suggerimento..." : 
                                suggestedCurrentMileage ? `${suggestedCurrentMileage.toLocaleString('it-IT')}` : "Es. 45000"
                            }
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormDescription>
                            {isFetchingSuggestion ? 'Sto cercando il chilometraggio medio per la tua zona...' : 
                             suggestedCurrentMileage ? `Stima basata sulla tua zona: ${suggestedCurrentMileage.toLocaleString('it-IT')} km. Puoi comunque inserire il valore esatto.` :
                             (selectedVehicleType && !form.getValues('currentMileage')
                                ? `Se non specificato, verrà usata una media di ${selectedVehicleType.averageAnnualMileage.toLocaleString('it-IT')} km.`
                                : 'Inserisci i km attuali per una maggiore precisione.')
                            }
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
