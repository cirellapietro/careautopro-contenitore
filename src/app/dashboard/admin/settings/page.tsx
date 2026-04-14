
'use client';
import { useState, useEffect } from 'react';
import { useFirebase } from '@/firebase';
import { useUser } from '@/firebase/auth/use-user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2, XCircle, AlertTriangle, Phone } from 'lucide-react';
import { seedGlobalData } from '@/lib/seed';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';


export default function AdminSettingsPage() {
    const { user, loading: userLoading } = useUser();
    const { firestore } = useFirebase();
    const router = useRouter();
    const { toast } = useToast();
    
    const [isSeeding, setIsSeeding] = useState(false);
    const [isVerifyingTwillo, setIsVerifyingTwillo] = useState(false);
    const [twilloStatus, setTwilloStatus] = useState<{
        checked: boolean;
        exists: boolean;
        valid: boolean;
        keysFound: string[];
        data?: any;
        error?: string;
    }>({ checked: false, exists: false, valid: false, keysFound: [] });

    useEffect(() => {
        if (!userLoading && (!user || user.role !== 'Amministratore')) {
            router.push('/dashboard');
        }
    }, [user, userLoading, router]);


    const handleSeedData = async () => {
        if (!firestore) return;
        setIsSeeding(true);
        const result = await seedGlobalData(firestore);
        setIsSeeding(false);

        if (result.success) {
            toast({
                title: 'Successo!',
                description: result.message,
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Errore',
                description: result.message,
            });
        }
    };

    const verifyTwilloConfig = async () => {
        if (!firestore) return;
        setIsVerifyingTwillo(true);
        try {
            const docRef = doc(firestore, 'config', 'twillo');
            const snap = await getDoc(docRef);
            
            if (snap.exists()) {
                const data = snap.data();
                const keys = Object.keys(data);
                
                const hasSid = !!data.twilioaccountsid;
                const hasToken = !!data.twilioauthtoken;
                const hasPhone = !!data.twiliophonenumber;
                
                const isValid = hasSid && hasToken && hasPhone;

                setTwilloStatus({
                    checked: true,
                    exists: true,
                    valid: isValid,
                    keysFound: keys,
                    data: data
                });

                if (isValid) {
                    toast({ title: "Configurazione Twilio OK", description: "I dati sono presenti e accessibili." });
                } else {
                    toast({ variant: "destructive", title: "Configurazione Incompleta", description: "Controlla i nomi dei campi nel database." });
                }
            } else {
                setTwilloStatus({ checked: true, exists: false, valid: false, keysFound: [] });
                toast({ variant: "destructive", title: "Documento Non Trovato", description: "Il documento 'config/twillo' non esiste." });
            }
        } catch (e: any) {
            setTwilloStatus({ checked: true, exists: false, valid: false, keysFound: [], error: e.message });
            toast({ variant: "destructive", title: "Errore di Lettura", description: e.message });
        } finally {
            setIsVerifyingTwillo(false);
        }
    };
    
    if (userLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-headline text-3xl font-bold">Impostazioni Amministrazione</h1>
                <p className="text-muted-foreground">Azioni di manutenzione e diagnostica.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Dati Iniziali</CardTitle>
                        <CardDescription>
                            Popola le collezioni globali (Tipi Veicolo e Ruoli) se vuote.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Questa operazione è sicura e non sovrascrive i dati esistenti.
                        </p>
                        <Button onClick={handleSeedData} disabled={isSeeding} className="w-full">
                            {isSeeding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Esegui Seed Dati
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Phone className="h-5 w-5 text-red-600" />
                                <CardTitle>Diagnostica Twilio</CardTitle>
                            </div>
                            {twilloStatus.checked && (
                                twilloStatus.valid 
                                    ? <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">OK</Badge>
                                    : <Badge variant="destructive">Errore</Badge>
                            )}
                        </div>
                        <CardDescription>
                            Verifica se gli estremi per le trasmissioni sono corretti nel DB.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {!twilloStatus.checked ? (
                            <p className="text-sm text-muted-foreground italic">Clicca il pulsante sotto per avviare la verifica...</p>
                        ) : (
                            <div className="space-y-3 p-3 bg-muted/30 rounded-lg border text-xs">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">Documento config/twillo:</span>
                                    {twilloStatus.exists ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-destructive" />}
                                </div>
                                
                                {twilloStatus.exists && (
                                    <>
                                        <div className="pt-2 border-t mt-2">
                                            <p className="font-black text-[9px] mb-1 text-muted-foreground">Campi Rilevati:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {twilloStatus.keysFound.length > 0 ? twilloStatus.keysFound.map(k => (
                                                    <Badge key={k} variant="outline" className="text-[8px] font-mono">{k}</Badge>
                                                )) : <span className="text-[9px] italic">Nessun campo trovato</span>}
                                            </div>
                                        </div>

                                        <div className="space-y-1 mt-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[9px]">twilioaccountsid:</span>
                                                {twilloStatus.data?.twilioaccountsid ? <CheckCircle2 className="h-3 w-3 text-green-600" /> : <AlertTriangle className="h-3 w-3 text-yellow-600" />}
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[9px]">twilioauthtoken:</span>
                                                {twilloStatus.data?.twilioauthtoken ? <CheckCircle2 className="h-3 w-3 text-green-600" /> : <AlertTriangle className="h-3 w-3 text-yellow-600" />}
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[9px]">twiliophonenumber:</span>
                                                {twilloStatus.data?.twiliophonenumber ? <CheckCircle2 className="h-3 w-3 text-green-600" /> : <AlertTriangle className="h-3 w-3 text-yellow-600" />}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {twilloStatus.error && (
                                    <p className="text-destructive font-bold text-[9px] mt-2 border-t pt-2">Errore DB: {twilloStatus.error}</p>
                                )}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" onClick={verifyTwilloConfig} disabled={isVerifyingTwillo} className="w-full text-xs">
                            {isVerifyingTwillo ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Esegui Test Connessione"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
