'use client';

import { cn } from "@/lib/utils";
import { useState, useEffect } from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase } from '@/firebase';
import { collection, doc, writeBatch, getDocs } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2, CalendarIcon } from 'lucide-react';
import type { VehicleType } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { fetchMaintenancePlan } from '@/ai/flows/fetch-maintenance-plan';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const addVehicleSchema = z.object({
  name: z.string().min(2, { message: 'IL NOME È OBBLIGATORIO.' }),
  registrationDate: z.date({ required_error: 'LA DATA È OBBLIGATORIA.' }),
  licensePlate: z.string().min(5, { message: 'TARGA NON VALIDA.' }),
  vehicleTypeId: z.string({ required_error: 'SELEZIONA UN TIPO.' }),
  currentMileage: z.coerce.number().optional(),
  driverEmail: z.string().email("EMAIL NON VALIDA.").optional().or(z.literal('')),
  insuranceExpirationDate: z.string().optional(),
  inspectionExpirationDate: z.string().optional(),
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

export function AddVehicleForm({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
type AddVehicleFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddVehicleForm({ open, onOpenChange }: AddVehicleFormProps) {
  const { user } = useUser();
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newVehicleId, setNewVehicleId] = useState<string | null>(null);
  const [generatedInterventions, setGeneratedInterventions] = useState<any[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);

  useEffect(() => {
    if (firestore && open) {
      getDocs(collection(firestore, 'vehicleTypes')).then(snap => {
        setVehicleTypes(snap.docs.map(d => ({ ...d.data(), id: d.id } as VehicleType)).filter(t => !t.dataoraelimina));
      });
    }
  }, [firestore, open]);

  const form = useForm<AddVehicleFormValues>({
    resolver: zodResolver(addVehicleSchema),
    defaultValues: { name: '', licensePlate: '', driverEmail: '' },
  });

  const onSubmit = async (values: AddVehicleFormValues) => {
    if (!user || !firestore) return;
    setIsSubmitting(true);

    try {
        const batch = writeBatch(firestore);
        const newVehicleRef = doc(collection(firestore, `users/${user.uid}/vehicles`));
        const vt = vehicleTypes.find(t => t.id === values.vehicleTypeId);

        const newVehicleData = {
          ...values,
          id: newVehicleRef.id,
          userId: user.uid,
          type: vt?.name || 'Standard',
          currentMileage: values.currentMileage || 0,
          registrationDate: values.registrationDate.toISOString().split('T')[0],
          dataoraelimina: null,
          updatedAt: new Date().toISOString(),
        };

        batch.set(newVehicleRef, newVehicleData);

        const aiPlan = await fetchMaintenancePlan({ make: values.name.split(' ')[0], model: values.name.split(' ').slice(1).join(' ') });
        const interventions: any[] = [];

        if (aiPlan && !('error' in aiPlan)) {
            aiPlan.forEach(check => {
                const intRef = doc(collection(newVehicleRef, 'maintenanceInterventions'));
                const obj = {
                    id: intRef.id,
                    vehicleId: newVehicleRef.id,
                    userId: user.uid,
                    description: check.description.toUpperCase(),
                    status: 'Pianificato',
                    urgency: 'Media',
                    dataoraelimina: null,
                };
                batch.set(intRef, obj);
                interventions.push(obj);
            });
        }

        await batch.commit();
        setGeneratedInterventions(interventions);
        setNewVehicleId(newVehicleRef.id);
        toast({ title: 'VEICOLO CREATO' });
    } catch (e) {
        toast({ variant: 'destructive', title: 'ERRORE' });
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

  useEffect(() => {
    if (!firestore || !open) return;

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
      } finally {
        setLoadingTypes(false);
      }
    };

    fetchVehicleTypes();
  }, [firestore, open]);


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

  useEffect(() => {
    if (open && navigator.geolocation && permissionStatus === 'granted' && !cityAverageMileage) {
        const getSuggestion = async (position: GeolocationPosition) => {
          setIsFetchingSuggestion(true);
          const { latitude, longitude } = position.coords;
          const locationResult = await reverseGeocode({ latitude, longitude });

          if ('error' in locationResult) {
              if (locationResult.error.includes('IA generativa non è attiva')) {
                  toast({
                      variant: 'destructive',
                      title: 'Funzione AI disabilitata',
                      description: "Abilita l'API Generative Language nella console Google Cloud per ricevere suggerimenti automatici.",
                      duration: 10000,
                  });
              }
          } else if (locationResult.city) {
              const mileageResult = await fetchAverageMileage({ city: locationResult.city, country: locationResult.country });
              if (!('error' in mileageResult) && mileageResult.averageMileage) {
                setCityAverageMileage(mileageResult.averageMileage);
              }
          }
          setIsFetchingSuggestion(false);
        }

        navigator.geolocation.getCurrentPosition(
            getSuggestion,
            () => setIsFetchingSuggestion(false),
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
  const selectedVehicleType = vehicleTypes.find(vt => vt.id === selectedTypeId);

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
        const genericChecks = checksSnap.docs.map(d => d.data());
        
        for (const check of genericChecks) {
            const newInterventionRef = doc(collection(newVehicleRef, 'maintenanceInterventions'));
            firstBatch.set(newInterventionRef, {
                id: newInterventionRef.id,
                vehicleId: newVehicleRef.id,
                description: check.description,
                status: 'Richiesto',
                urgency: 'Media',
                notes: `Intervento generato automaticamente.`,
                scheduledDate: new Date().toISOString(),
                dataoraelimina: null,
            });
        }

        await firstBatch.commit();
        toast({ title: 'Veicolo creato!', description: 'Ricerca interventi specifici in corso...' });

        const aiChecksResult = await fetchMaintenancePlan({ make, model });
        
        if (!('error' in aiChecksResult) && aiChecksResult.length > 0) {
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
                    notes: `Suggerito dall'AI per ${make} ${model}.`,
                    dataoraelimina: null,
                });
            }
            await aiBatch.commit();
            toast({ title: 'Suggerimenti AI aggiunti!' });
        } else if ('error' in aiChecksResult && aiChecksResult.error.includes('IA generativa non è attiva')) {
             toast({ variant: 'destructive', title: 'AI Non Disponibile', description: "Abilita l'API nel cloud per ricevere suggerimenti specifici per il modello." });
        }
        
        setNewVehicleId(newVehicleRef.id);

    } catch (serverError) {
        const permissionError = new FirestorePermissionError({
          path: `users/${user.uid}/vehicles`,
          operation: 'create',
          requestResourceData: { vehicleData: values },
        });
        errorEmitter.emit('permission-error', permissionError);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {newVehicleId ? (
            <div className="space-y-4">
                <DialogHeader><DialogTitle className="uppercase font-black italic text-2xl">REGISTRO IA GENERATO</DialogTitle></DialogHeader>
                <ScrollArea className="h-64 border rounded-xl p-2 bg-muted/10">
                    <div className="space-y-2">
                        {generatedInterventions.map((int, i) => (
                            <div key={i} className="p-3 bg-background border rounded-lg text-[10px] flex justify-between items-center shadow-sm">
                                <span className="font-black uppercase">{int.description}</span>
                                <Badge variant="outline" className="text-[8px] font-black uppercase">Pianificato</Badge>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <Button className="w-full font-black uppercase h-12 shadow-lg bg-accent hover:bg-accent/90" onClick={() => { onOpenChange(false); router.push(`/dashboard/vehicles/view?id=${newVehicleId}`); }}>
                    ACCETTA E CONTINUA
                </Button>
            </div>
        ) : (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <DialogHeader><DialogTitle className="uppercase font-black italic text-2xl">NUOVO VEICOLO</DialogTitle></DialogHeader>
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel className="text-[10px] font-black uppercase">Marca e Modello</FormLabel><FormControl><Input {...field} className="uppercase font-bold" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="licensePlate" render={({ field }) => (
                            <FormItem><FormLabel className="text-[10px] font-black uppercase">Targa</FormLabel><FormControl><Input {...field} className="uppercase font-bold" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="vehicleTypeId" render={({ field }) => (
                            <FormItem><FormLabel className="text-[10px] font-black uppercase">Alimentazione</FormLabel><Select onValueChange={field.onChange}><FormControl><SelectTrigger className="font-bold"><SelectValue placeholder="SCEGLI" /></SelectTrigger></FormControl><SelectContent>{vehicleTypes.map(t => <SelectItem key={t.id} value={t.id} className="uppercase font-bold">{t.name}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="registrationDate" render={({ field }) => (
                        <FormItem className="flex flex-col"><FormLabel className="text-[10px] font-black uppercase">Data Immatricolazione</FormLabel><Popover><PopoverTrigger asChild><Button variant="outline" className={cn("text-left font-bold h-10", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "dd/MM/yyyy") : "SCEGLI DATA"}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} locale={it} /></PopoverContent></Popover><FormMessage /></FormItem>
                    )} />
                    <DialogFooter className="flex flex-col gap-2 pt-2">
                        <Button type="submit" className="w-full uppercase font-black h-12 shadow-lg bg-accent hover:bg-accent/90" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="mr-2 animate-spin h-4 w-4" /> : null} CREA VEICOLO
                        </Button>
                        <Button type="button" onClick={() => onOpenChange(false)} className="w-full h-12 font-black uppercase shadow-lg bg-accent hover:bg-accent/90">
                            ANNULLA
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
  const { years, months, days } = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 80 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: new Date(0, i).toLocaleString('it-IT', { month: 'long' }) }));
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    return { years, months, days };
  }, []);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen ? handleClose() : onOpenChange(true)}>
      <DialogContent className="sm:max-w-md">
        {newVehicleId ? (
            <>
                <DialogHeader>
                  <DialogTitle>Veicolo Aggiunto!</DialogTitle>
                  <DialogDescription>Abbiamo generato gli interventi di base. Aggiorna le date reali per una precisione maggiore.</DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start gap-2 pt-4">
                    <Button onClick={() => { router.push(`/dashboard/vehicles/view?id=${newVehicleId}`); handleClose(); }}>Vai al Veicolo</Button>
                    <Button variant="outline" onClick={handleClose}>Chiudi</Button>
                </DialogFooter>
            </>
        ) : (
            <>
              <DialogHeader>
                <DialogTitle>Aggiungi Nuovo Veicolo</DialogTitle>
                <DialogDescription>Inserisci i dettagli del veicolo per generare il piano di manutenzione.</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marca e modello</FormLabel>
                        <FormControl><Input placeholder="Es. Fiat Panda" {...field} /></FormControl>
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
                        <FormControl><Input placeholder="ES. AB123CD" {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isTaxi"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none"><FormLabel>È un taxi?</FormLabel></div>
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
                            <SelectTrigger><SelectValue placeholder="GG" /></SelectTrigger>
                            <SelectContent>{days.map(d => <SelectItem key={d} value={String(d)}>{d}</SelectItem>)}</SelectContent>
                          </Select>
                          <Select onValueChange={setMonth} value={month}>
                            <SelectTrigger><SelectValue placeholder="MM" /></SelectTrigger>
                            <SelectContent>{months.map(m => <SelectItem key={m.value} value={String(m.value)}>{m.label}</SelectItem>)}</SelectContent>
                          </Select>
                          <Select onValueChange={setYear} value={year}>
                            <SelectTrigger><SelectValue placeholder="AAAA" /></SelectTrigger>
                            <SelectContent>{years.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}</SelectContent>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loadingTypes}>
                          <FormControl><SelectTrigger><SelectValue placeholder={loadingTypes ? "Caricamento..." : "Seleziona tipo"} /></SelectTrigger></FormControl>
                          <SelectContent>{vehicleTypes.map((vt) => (<SelectItem key={vt.id} value={vt.id}>{vt.name}</SelectItem>))}</SelectContent>
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
                        <FormLabel>Chilometraggio attuale</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder={isFetchingSuggestion ? "Calcolando..." : suggestedCurrentMileage ? String(suggestedCurrentMileage) : "Es. 45000"}
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormDescription>
                            {isFetchingSuggestion ? 'Ricerca chilometraggio medio zona...' : suggestedCurrentMileage ? `Stima basata sulla zona: ${suggestedCurrentMileage.toLocaleString('it-IT')} km.` : 'Inserisci i km per maggiore precisione.'}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>Annulla</Button>
                    <Button type="submit" disabled={isSubmitting || loadingTypes}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
}
