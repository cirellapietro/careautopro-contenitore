
'use client';

import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { doc, updateDoc, collection, query, where, getDocs, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/firebase/auth/use-user";
import { useFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Phone, Mail, Bell, Smartphone, Trash2, AlertTriangle } from 'lucide-react';
import type { NotificationChannel } from '@/lib/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { signOut } from '@/firebase/auth/auth';

const profileSchema = z.object({
  displayName: z.string().min(2, "IL NOME È OBBLIGATORIO."),
  phoneNumber: z.string().optional().refine(val => !val || val.startsWith('+'), {
      message: "IL NUMERO DEVE INIZIARE CON IL PREFISSO INTERNAZIONALE (ES. +39)"
  }),
});

const notificationSchema = z.object({
  notificationChannels: z.array(z.string()).min(1, "SELEZIONA ALMENO UN CANALE."),
  notificationReminderTime: z.coerce.number().min(0, "L'ANTICIPO NON PUÒ ESSERE NEGATIVO."),
});

const notificationChannels: { id: NotificationChannel, label: string, icon: any }[] = [
    { id: 'app', label: 'NOTIFICA IN-APP', icon: Bell },
    { id: 'email', label: 'EMAIL DIRETTA', icon: Mail },
    { id: 'sms', label: 'SMS TRADIZIONALE', icon: Smartphone },
    { id: 'whatsapp', label: 'WHATSAPP BUSINESS', icon: Phone },
import { Loader2 } from 'lucide-react';
import type { NotificationChannel } from '@/lib/types';

const profileSchema = z.object({
  displayName: z.string().min(2, "Il nome è obbligatorio."),
});

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
    const router = useRouter();

    const [isProfileSubmitting, setProfileSubmitting] = useState(false);
    const [isNotificationSubmitting, setNotificationSubmitting] = useState(false);
    const [isDeletingAccount, setDeletingAccount] = useState(false);
    const [ownedVehiclesCount, setOwnedVehiclesCount] = useState(0);

    const [isProfileSubmitting, setProfileSubmitting] = useState(false);
    const [isNotificationSubmitting, setNotificationSubmitting] = useState(false);

    const profileForm = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            displayName: "",
            phoneNumber: "",
        },
    });

    const notificationForm = useForm<z.infer<typeof notificationSchema>>({
        resolver: zodResolver(notificationSchema),
        defaultValues: {
            notificationChannels: [],
            notificationReminderTime: 0,
        },
    });

    useEffect(() => {
        if (user) {
            profileForm.reset({
                displayName: user.displayName || '',
                phoneNumber: user.phoneNumber || '',
            });
            notificationForm.reset({
                notificationChannels: user.notificationChannels || ['app', 'email'],
                notificationReminderTime: user.notificationReminderTime || 3,
            });

            if (firestore) {
                const q = query(collection(firestore, `users/${user.uid}/vehicles`), where('dataoraelimina', '==', null));
                getDocs(q).then(snap => setOwnedVehiclesCount(snap.size));
            }
        }
    }, [user, profileForm.reset, notificationForm.reset, firestore]);
        }
    }, [user, profileForm.reset, notificationForm.reset]);

    const onProfileSubmit = (data: z.infer<typeof profileSchema>) => {
        if (!user || !firestore) return;
        setProfileSubmitting(true);
        const userRef = doc(firestore, 'users', user.uid);
        const dataToUpdate = { 
            displayName: data.displayName.toUpperCase(),
            phoneNumber: data.phoneNumber
        };

        updateDoc(userRef, dataToUpdate)
            .then(() => {
                toast({ title: "SUCCESSO", description: "PROFILO AGGIORNATO." });
        const dataToUpdate = { displayName: data.displayName };

        updateDoc(userRef, dataToUpdate)
            .then(() => {
                toast({ title: "Successo", description: "Il tuo nome è stato aggiornato." });
            })
            .catch((serverError) => {
                const permissionError = new FirestorePermissionError({
                    path: userRef.path,
                    operation: 'update',
                    requestResourceData: dataToUpdate,
                });
                errorEmitter.emit('permission-error', permissionError);
                toast({ variant: 'destructive', title: "ERRORE", description: "IMPOSSIBILE SALVARE IL PROFILO." });
                toast({ variant: 'destructive', title: "Errore di Permesso", description: "Impossibile salvare il profilo." });
            })
            .finally(() => {
                setProfileSubmitting(false);
            });
    };

    const onNotificationSubmit = (data: z.infer<typeof notificationSchema>) => {
        if (!user || !firestore) return;
        setNotificationSubmitting(true);
        const userRef = doc(firestore, 'users', user.uid);
        const dataToUpdate = {
            notificationChannels: data.notificationChannels,
            notificationReminderTime: data.notificationReminderTime,
        };
        
        updateDoc(userRef, dataToUpdate)
            .then(() => {
                toast({ title: "SUCCESSO", description: "PREFERENZE DI COMUNICAZIONE SALVATE." });
                toast({ title: "Successo", description: "Impostazioni di notifica aggiornate." });
            })
            .catch((serverError) => {
                const permissionError = new FirestorePermissionError({
                    path: userRef.path,
                    operation: 'update',
                    requestResourceData: dataToUpdate,
                });
                errorEmitter.emit('permission-error', permissionError);
                toast({ variant: 'destructive', title: "ERRORE", description: "IMPOSSIBILE SALVARE LE IMPOSTAZIONI." });
                toast({ variant: 'destructive', title: "Errore di Permesso", description: "Impossibile salvare le impostazioni." });
            })
            .finally(() => {
                setNotificationSubmitting(false);
            });
    }

    const handleDeleteAccount = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!user || !firestore || !currentUser) return;
        
        setDeletingAccount(true);

        try {
            const batch = writeBatch(firestore);
            const userRef = doc(firestore, 'users', user.uid);
            const now = new Date().toISOString();

            // 1. Soft-delete del documento utente in Firestore
            // Questo mantiene lo storico ma nasconde l'utente dalle query attive
            batch.update(userRef, { dataoraelimina: now });

            // 2. Se è un Amministratore Veicoli, soft-delete di tutti i suoi veicoli
            if (user.role === 'Amministratore Veicoli') {
                const vehiclesQuery = query(collection(firestore, `users/${user.uid}/vehicles`), where('dataoraelimina', '==', null));
                const vehiclesSnap = await getDocs(vehiclesQuery);
                
                vehiclesSnap.forEach(vDoc => {
                    batch.update(vDoc.ref, { dataoraelimina: now });
                });
            }

            // 3. Esecuzione batch su Firestore
            await batch.commit();

            // 4. Eliminazione reale dall'autenticazione Firebase
            // Questo permette una nuova registrazione con la stessa email.
            // Nota: Se il login non è recente, Firebase potrebbe richiedere una ri-autenticazione.
            try {
                await currentUser.delete();
            } catch (authError: any) {
                if (authError.code === 'auth/requires-recent-login') {
                    toast({
                        variant: 'destructive',
                        title: "RI-AUTENTICAZIONE RICHIESTA",
                        description: "PER MOTIVI DI SICUREZZA, ESCI E RIENTRA PRIMA DI ELIMINARE L'ACCOUNT.",
                    });
                    setDeletingAccount(false);
                    return;
                }
                throw authError;
            }

            toast({
                title: "ACCOUNT ELIMINATO",
                description: "IL TUO PROFILO È STATO RIMOSSO. PUOI REGISTRARTI DI NUOVO QUANDO VUOI.",
            });

            router.push('/');
        } catch (e: any) {
            console.error("Errore durante l'eliminazione dell'account:", e);
            toast({
                variant: 'destructive',
                title: "ERRORE CRITICO",
                description: "IMPOSSIBILE COMPLETARE L'ELIMINAZIONE. RIPROVA PIÙ TARDI.",
            });
        } finally {
            setDeletingAccount(false);
        }
    };

    if (!user) return null;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-headline text-3xl font-bold uppercase">PROFILO E COMUNICAZIONI</h1>
                <p className="text-muted-foreground uppercase text-xs font-bold">GESTISCI I TUOI RECAPITI E SCEGLI COME ESSERE CONTATTATO DAL SISTEMA.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <Card className="h-fit">
                        <Form {...profileForm}>
                            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                                <CardHeader>
                                    <CardTitle className="uppercase text-lg">DATI PERSONALI</CardTitle>
                                    <CardDescription className="uppercase text-[10px]">INFORMAZIONI DI BASE DELL'ACCOUNT.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={profileForm.control}
                                        name="displayName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="uppercase text-[10px] font-bold">NOME COMPLETO</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="IL TUO NOME..." 
                                                        {...field} 
                                                        className="uppercase font-bold"
                                                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="space-y-2">
                                        <Label className="uppercase text-[10px] font-bold">EMAIL REGISTRATA</Label>
                                        <Input value={user.email || ''} readOnly disabled className="bg-muted/50" />
                                    </div>
                                    <FormField
                                        control={profileForm.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="uppercase text-[10px] font-bold">CELLULARE (PER WHATSAPP/SMS)</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input 
                                                            placeholder="+39 333 1234567" 
                                                            {...field} 
                                                            className="pl-10 font-bold"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormDescription className="uppercase text-[8px]">NECESSARIO PER RICEVERE AVVISI DIRETTI SUL TELEFONO.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" disabled={isProfileSubmitting} className="w-full font-black uppercase tracking-tight">
                                        {isProfileSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        SALVA DATI RECAPITO
                                    </Button>
                                </CardFooter>
                            </form>
                        </Form>
                    </Card>

                    <Card className="border-destructive/20 bg-destructive/5">
                        <CardHeader>
                            <CardTitle className="text-destructive uppercase text-lg flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5" /> ZONA PERICOLO
                            </CardTitle>
                            <CardDescription className="uppercase text-[10px] font-bold text-destructive/70">CANCELLAZIONE DEFINITIVA DEI DATI.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs uppercase font-medium leading-relaxed">
                                L'ELIMINAZIONE DELL'ACCOUNT È UN'OPERAZIONE IRREVERSIBILE NEL DB MA CONSENTE LA RI-REGISTRAZIONE. 
                                {user.role === 'Amministratore Veicoli' ? (
                                    <> TUTTI I TUOI DATI PERSONALI E I <strong>{ownedVehiclesCount} VEICOLI</strong> DI CUI SEI GESTORE VERRANNO ELIMINATI LOGICAMENTE DAL SISTEMA.</>
                                ) : (
                                    <> TUTTI I TUOI DATI PERSONALI VERRANNO ELIMINATI LOGICAMENTE DAL SISTEMA. I VEICOLI A CUI SEI ASSEGNATO COME CONDUCENTE RIMARRANNO DI PROPRIETÀ DEI RISPETTIVI GESTORI.</>
                                )}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" className="w-full font-black uppercase tracking-tight">
                                        <Trash2 className="mr-2 h-4 w-4" /> ELIMINA IL MIO ACCOUNT
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-destructive uppercase">CONFERMI LA CANCELLAZIONE?</AlertDialogTitle>
                                        <AlertDialogDescription className="uppercase text-xs font-bold space-y-2">
                                            <p>PROSEGUENDO, IL TUO ACCOUNT VERRÀ ELIMINATO LOGICAMENTE DAL DB E FISICAMENTE DALL'AUTENTICAZIONE.</p>
                                            <p className="text-foreground">POTRAI REGISTRARTI DI NUOVO CON QUESTA STESSA EMAIL IN FUTURO.</p>
                                            {user.role === 'Amministratore Veicoli' && (
                                                <p className="text-destructive">ATTENZIONE: VERRANNO ARCHIVIATI LOGICAMENTE ANCHE TUTTI I VEICOLI DI TUA PROPRIETÀ.</p>
                                            )}
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="uppercase font-bold">ANNULLA</AlertDialogCancel>
                                        <AlertDialogAction 
                                            onClick={handleDeleteAccount} 
                                            disabled={isDeletingAccount} 
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 uppercase font-bold"
                                        >
                                            {isDeletingAccount ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "ELIMINA ORA"}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardFooter>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="uppercase text-lg">CANALI DI COMUNICAZIONE</CardTitle>
                        <CardDescription className="uppercase text-[10px]">SCEGLI DOVE RICEVERE LE SCADENZE DI MANUTENZIONE.</CardDescription>
                    </CardHeader>
                    <Form {...notificationForm}>
                        <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)}>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={notificationForm.control}
                                    name="notificationChannels"
                                    render={() => (
                                        <FormItem>
                                            <div className="grid grid-cols-1 gap-3">
                                                {notificationChannels.map((item) => (
                                                    <FormField
                                                        key={item.id}
                                                        control={notificationForm.control}
                                                        name="notificationChannels"
                                                        render={({ field }) => {
                                                            const Icon = item.icon;
                                                            return (
                                                                <FormItem
                                                                    key={item.id}
                                                                    className="flex flex-row items-center space-x-3 space-y-0 rounded-xl border p-4 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer"
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
                                                                        />
                                                                    </FormControl>
                                                                    <div className="flex items-center gap-3 flex-1">
                                                                        <div className="p-2 bg-background rounded-lg border">
                                                                            <Icon className="h-4 w-4 text-primary" />
                                                                        </div>
                                                                        <FormLabel className="font-black uppercase text-[11px] cursor-pointer flex-1">
                                                                            {item.label}
                                                                        </FormLabel>
                                                                    </div>
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
                                            <FormLabel className="uppercase text-[10px] font-bold">ANTICIPO PROMEMORIA (GIORNI)</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} className="font-bold" />
                                            </FormControl>
                                            <FormDescription className="uppercase text-[9px]">GIORNI DI PREAVVISO PRIMA DI UNA SCADENZA.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={isNotificationSubmitting} className="w-full font-black uppercase tracking-tight shadow-md">
                                    {isNotificationSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    SALVA PREFERENZE INVIO
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            </div>
                <h1 className="font-headline text-3xl font-bold">Profilo Utente</h1>
                <p className="text-muted-foreground">Gestisci le informazioni del tuo account e le preferenze.</p>
            </div>
            <Card>
                <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                        <CardHeader>
                            <CardTitle>I tuoi dati</CardTitle>
                            <CardDescription>Aggiorna il tuo nome e la tua email.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={profileForm.control}
                                name="displayName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome completo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Il tuo nome..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={user.email || ''} readOnly disabled />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isProfileSubmitting}>
                                {isProfileSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Salva Modifiche
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
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
                                      <Input type="number" placeholder="Es. 3" {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormDescription>
                                      Indica quanti giorni prima della scadenza vuoi iniziare a ricevere i promemoria. La notifica ti verrà inviata ogni giorno fino alla data dell'intervento.
                                    </FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isNotificationSubmitting}>
                                {isNotificationSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
