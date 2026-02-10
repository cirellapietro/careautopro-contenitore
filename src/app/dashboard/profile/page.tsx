'use client';

import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { doc, updateDoc } from 'firebase/firestore';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/firebase/auth/use-user";
import { useFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import type { NotificationChannel } from '@/lib/types';


const notificationSchema = z.object({
  notificationChannels: z.array(z.string()).min(1, "Seleziona almeno un canale."),
  notificationReminderTime: z.coerce.number().min(0, "L'anticipo non può essere negativo."),
});

const notificationChannels: { id: NotificationChannel, label: string }[] = [
    { id: 'app', label: 'Notifica in-app' },
    { id: 'email', label: 'Email' },
    { id: 'sms', label: 'SMS' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'telegram', label: 'Telegram' },
    { id: 'facebook', label: 'Facebook' },
];

export default function ProfilePage() {
    const { user } = useUser();
    const { firestore } = useFirebase();
    const { toast } = useToast();

    const notificationForm = useForm<z.infer<typeof notificationSchema>>({
        resolver: zodResolver(notificationSchema),
        defaultValues: {
            notificationChannels: [],
            notificationReminderTime: 3,
        }
    });

    useEffect(() => {
        if (user) {
            notificationForm.reset({
                notificationChannels: user.notificationChannels || ['app', 'email'],
                notificationReminderTime: user.notificationReminderTime || 3,
            });
        }
    }, [user, notificationForm]);

    const onNotificationSubmit = async (data: z.infer<typeof notificationSchema>) => {
        if (!user || !firestore) return;
        
        try {
            const userRef = doc(firestore, 'users', user.uid);
            await updateDoc(userRef, {
                notificationChannels: data.notificationChannels,
                notificationReminderTime: data.notificationReminderTime,
            });
            toast({ title: "Successo", description: "Impostazioni di notifica aggiornate." });
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: "Errore", description: "Impossibile salvare le impostazioni." });
        }
    }


    if (!user) return null;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-headline text-3xl font-bold">Profilo Utente</h1>
                <p className="text-muted-foreground">Gestisci le informazioni del tuo account e le preferenze.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>I tuoi dati</CardTitle>
                    <CardDescription>Aggiorna il tuo nome e la tua email.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome completo</Label>
                        <Input id="name" defaultValue={user.displayName || ''} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user.email || ''} readOnly />
                    </div>
                </CardContent>
                <CardFooter>
                     <Button>Salva Modifiche</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Impostazioni di Notifica</CardTitle>
                    <CardDescription>Scegli come e quando ricevere gli avvisi per la manutenzione.</CardDescription>
                </CardHeader>
                <Form {...notificationForm}>
                    <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)}>
                        <CardContent className="space-y-6">
                            <FormField
                                control={notificationForm.control}
                                name="notificationChannels"
                                render={() => (
                                    <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Canali di Notifica</FormLabel>
                                        <FormDescription>
                                            Scegli come preferisci essere avvisato. I canali come SMS e WhatsApp saranno attivati in futuro.
                                        </FormDescription>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {notificationChannels.map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={notificationForm.control}
                                            name="notificationChannels"
                                            render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={item.id}
                                                    className="flex flex-row items-center space-x-3 space-y-0"
                                                >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.id)}
                                                        onCheckedChange={(checked) => {
                                                            const updatedChannels = checked
                                                            ? [...(field.value || []), item.id]
                                                            : (field.value || []).filter(
                                                                (value) => value !== item.id
                                                              );
                                                            field.onChange(updatedChannels);
                                                        }}
                                                        disabled={['sms', 'whatsapp', 'telegram', 'facebook'].includes(item.id)}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal flex items-center gap-2">
                                                    {item.label}
                                                    {['sms', 'whatsapp', 'telegram', 'facebook'].includes(item.id) && <span className="text-xs text-muted-foreground">(Prossimamente)</span>}
                                                </FormLabel>
                                                </FormItem>
                                            )
                                            }}
                                        />
                                        ))}
                                    </div>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                             <FormField
                                control={notificationForm.control}
                                name="notificationReminderTime"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Anticipo promemoria (giorni)</FormLabel>
                                    <FormControl>
                                      <Input type="number" placeholder="Es. 3" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                      Quanti giorni prima della scadenza vuoi ricevere un promemoria.
                                    </FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={notificationForm.formState.isSubmitting}>
                                {notificationForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Salva Impostazioni
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Cambia Password</CardTitle>
                    <CardDescription>Imposta una nuova password per il tuo account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Password attuale</Label>
                        <Input id="current-password" type="password" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="new-password">Nuova password</Label>
                        <Input id="new-password" type="password" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="confirm-password">Conferma nuova password</Label>
                        <Input id="confirm-password" type="password" />
                    </div>
                </CardContent>
                <CardFooter>
                     <Button>Cambia Password</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
