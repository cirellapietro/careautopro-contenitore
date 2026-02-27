
'use client';

import React, { useMemo, useState } from 'react';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase, useCollection, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, query, where, doc, updateDoc, writeBatch } from 'firebase/firestore';
import type { Alert as AppAlert } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Bell, CheckCircle2, AlertTriangle, Clock, Trash2, MailOpen } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function NotificationsPage() {
  const { user } = useUser();
  const { firestore } = useFirebase();
  const { toast } = useToast();

  const alertsQuery = useMemo(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, `users/${user.uid}/alerts`),
      where('dataoraelimina', '==', null)
    );
  }, [user, firestore]);

  const { data: alerts, isLoading } = useCollection<AppAlert>(alertsQuery);

  const sortedAlerts = useMemo(() => {
    return alerts?.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) || [];
  }, [alerts]);

  const markAsRead = (alertId: string) => {
    if (!user || !firestore) return;
    const docRef = doc(firestore, `users/${user.uid}/alerts`, alertId);
    updateDoc(docRef, { isRead: true }).catch(err => {
        console.error(err);
    });
  };

  const markAllAsRead = async () => {
    if (!user || !firestore || !alerts) return;
    const batch = writeBatch(firestore);
    alerts.filter(a => !a.isRead).forEach(a => {
        const docRef = doc(firestore, `users/${user.uid}/alerts`, a.id);
        batch.update(docRef, { isRead: true });
    });
    try {
        await batch.commit();
        toast({ title: 'Tutte le notifiche segnate come lette' });
    } catch (e) {
        toast({ variant: 'destructive', title: 'Errore' });
    }
  };

  const deleteAlert = (alertId: string) => {
    if (!user || !firestore) return;
    const docRef = doc(firestore, `users/${user.uid}/alerts`, alertId);
    updateDoc(docRef, { dataoraelimina: new Date().toISOString() }).catch(err => {
        console.error(err);
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Caricamento notifiche...</p>
      </div>
    );
  }

  const unreadCount = sortedAlerts.filter(a => !a.isRead).length;

  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="font-headline text-3xl font-bold">Centro Notifiche</h1>
                <p className="text-muted-foreground">Rimani aggiornato sulle scadenze dei tuoi veicoli.</p>
            </div>
            {unreadCount > 0 && (
                <Button variant="outline" onClick={markAllAsRead}>
                    <MailOpen className="mr-2 h-4 w-4" /> Segna tutto come letto
                </Button>
            )}
        </div>

        <div className="grid gap-4">
            {sortedAlerts.length === 0 ? (
                <Card className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="bg-muted p-4 rounded-full mb-4">
                        <Bell className="h-12 w-12 text-muted-foreground opacity-20" />
                    </div>
                    <CardTitle>Nessun avviso</CardTitle>
                    <CardDescription>Tutto sotto controllo! Non ci sono notifiche al momento.</CardDescription>
                </Card>
            ) : (
                sortedAlerts.map(alert => (
                    <Card key={alert.id} className={cn(
                        "transition-all duration-300",
                        !alert.isRead ? "border-l-4 border-l-primary bg-primary/5" : "opacity-80"
                    )}>
                        <CardContent className="p-4 flex gap-4">
                            <div className={cn(
                                "shrink-0 p-2 rounded-full h-fit",
                                alert.type === 'maintenance' ? "bg-blue-100 text-blue-600" : 
                                alert.type === 'urgent' ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                            )}>
                                {alert.type === 'maintenance' ? <Clock className="h-5 w-5" /> : 
                                 alert.type === 'urgent' ? <AlertTriangle className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex justify-between items-start gap-2">
                                    <p className={cn("text-sm font-medium", !alert.isRead && "font-bold")}>{alert.message}</p>
                                    <div className="flex gap-1 shrink-0">
                                        {!alert.isRead && (
                                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => markAsRead(alert.id)}>
                                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                            </Button>
                                        )}
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => deleteAlert(alert.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {format(new Date(alert.timestamp), 'dd MMMM yyyy HH:mm', { locale: it })}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    </div>
  );
}
