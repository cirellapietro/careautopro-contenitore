"use client";

import { useActionState, useEffect, useTransition } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { generateMaintenanceAdvice } from '@/app/dashboard/vehicles/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import type { Vehicle } from '@/lib/types';

const MaintenanceAdviceSchema = z.object({
  vehicleType: z.string(),
  kilometersDriven: z.number(),
  lastMaintenanceDate: z.string(),
  maintenanceHistory: z.string().min(10, { message: "Descrivi brevemente la cronologia." }),
  drivingStyle: z.string({ required_error: "Seleziona uno stile di guida." }),
});

type MaintenanceAdviceFormValues = z.infer<typeof MaintenanceAdviceSchema>;

const initialState = {
  advice: null,
  error: null,
};

export function MaintenanceAdvisorForm({ vehicle }: { vehicle: Vehicle }) {
  const [state, formAction] = useActionState(generateMaintenanceAdvice, initialState);
  const [isPending, startTransition] = useTransition();

  const form = useForm<MaintenanceAdviceFormValues>({
    resolver: zodResolver(MaintenanceAdviceSchema),
    defaultValues: {
      vehicleType: vehicle.type,
      kilometersDriven: vehicle.currentMileage,
      lastMaintenanceDate: vehicle.lastMaintenanceDate,
      maintenanceHistory: 'Manutenzione regolare effettuata secondo il libretto.',
      drivingStyle: 'moderate',
    },
  });

  useEffect(() => {
    form.reset({
      vehicleType: vehicle.type,
      kilometersDriven: vehicle.currentMileage,
      lastMaintenanceDate: vehicle.lastMaintenanceDate,
      maintenanceHistory: 'Manutenzione regolare effettuata secondo il libretto.',
      drivingStyle: 'moderate',
    })
  }, [vehicle, form]);
  
  const onFormSubmit = (data: MaintenanceAdviceFormValues) => {
    const formData = new FormData();
    formData.append('vehicleType', data.vehicleType);
    formData.append('kilometersDriven', String(data.kilometersDriven));
    formData.append('lastMaintenanceDate', data.lastMaintenanceDate);
    formData.append('maintenanceHistory', data.maintenanceHistory);
    formData.append('drivingStyle', data.drivingStyle);
    startTransition(() => {
      formAction(formData);
    });
  };


  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Assistente Manutenzione AI</CardTitle>
          <CardDescription>
            Inserisci i dati del tuo veicolo per ricevere un consiglio personalizzato dal nostro assistente AI.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="maintenanceHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cronologia Manutenzione</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Esempio: Sostituzione pastiglie freni a 40.000km..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="drivingStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stile di Guida</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona il tuo stile di guida" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="aggressive">Aggressivo</SelectItem>
                        <SelectItem value="moderate">Moderato</SelectItem>
                        <SelectItem value="conservative">Prudente</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? <Loader2 className="animate-spin" /> : "Ottieni Consiglio dall'AI"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="space-y-4">
        {state.advice && (
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Sparkles className="text-accent" />
                Risultato dell'Analisi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <AlertTriangle className={`
                    ${state.advice.urgency === 'high' ? 'text-destructive' : ''}
                    ${state.advice.urgency === 'medium' ? 'text-yellow-500' : ''}
                    ${state.advice.urgency === 'low' ? 'text-green-500' : ''}
                  `} />
                  Urgenza: {state.advice.urgency}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{state.advice.advice}</p>
              </div>
              <div>
                <h3 className="font-semibold">Interventi Suggeriti</h3>
                <p className="text-sm text-muted-foreground mt-1">{state.advice.suggestedInterventions}</p>
              </div>
            </CardContent>
          </Card>
        )}
        {state.error && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-destructive">
                <AlertTriangle />
                Errore
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{state.error}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
