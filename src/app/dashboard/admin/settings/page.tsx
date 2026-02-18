"use client";
export const dynamicParams = false;
export const generateStaticParams = () => [];

'use client';
import { useState } from 'react';
import { useFirebase } from '@/firebase';
import { useUser } from '@/firebase/auth/use-user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { seedGlobalData } from '@/lib/seed';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function AdminSettingsPage() {
    const { user, loading: userLoading } = useUser();
    const { firestore } = useFirebase();
    const router = useRouter();
    const { toast } = useToast();
    const [isSeeding, setIsSeeding] = useState(false);

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
    }
    
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
                <p className="text-muted-foreground">Azioni di manutenzione per l'applicazione.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Dati Iniziali</CardTitle>
                    <CardDescription>
                        Se i dati globali come "Tipi Veicolo" o "Ruoli" non sono presenti, puoi usare questo pulsante
                        per crearli. Questa operazione è sicura da eseguire più volte e non sovrascriverà i dati esistenti.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleSeedData} disabled={isSeeding}>
                        {isSeeding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Popola Dati Globali
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
