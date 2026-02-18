"use client";
export const dynamicParams = false; export const generateStaticParams = () => [];
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function InterventionsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="font-headline text-3xl font-bold">Interventi</h1>
            <p className="text-muted-foreground">Tutti gli interventi di manutenzione per i tuoi veicoli.</p>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Interventi di Manutenzione</CardTitle>
          <CardDescription>
            Pagina in costruzione. Qui potrai vedere tutti gli interventi passati e futuri.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Prossimamente...</p>
        </CardContent>
      </Card>
    </div>
  )
}
