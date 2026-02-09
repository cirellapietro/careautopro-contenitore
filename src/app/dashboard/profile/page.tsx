'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/firebase";

export default function ProfilePage() {
    const { user } = useUser();

    if (!user) return null;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-headline text-3xl font-bold">Profilo Utente</h1>
                <p className="text-muted-foreground">Gestisci le informazioni del tuo account.</p>
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
                <CardContent>
                     <Button>Salva Modifiche</Button>
                </CardContent>
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
                <CardContent>
                     <Button>Cambia Password</Button>
                </CardContent>
            </Card>
        </div>
    )
}
