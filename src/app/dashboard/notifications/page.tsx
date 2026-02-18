"use client";
export const dynamicParams = false;
export const generateStaticParams = () => [];
export const dynamicParams = false;
export const generateStaticParams = () => [];

'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="font-headline text-3xl font-bold">Notifiche</h1>
            <p className="text-muted-foreground">Centro notifiche per tutti i tuoi avvisi.</p>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Le tue Notifiche</CardTitle>
          <CardDescription>
            Pagina in costruzione. Qui visualizzerai tutti i promemoria e gli avvisi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Prossimamente...</p>
        </CardContent>
      </Card>
    </div>
  )
}
