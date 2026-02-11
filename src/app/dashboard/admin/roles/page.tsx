'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AdminRolesPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="font-headline text-3xl font-bold">Gestione Ruoli</h1>
            <p className="text-muted-foreground">Crea e gestisci i ruoli utente per l'applicazione.</p>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Pagina in Costruzione</CardTitle>
          <CardDescription>
            Questa sezione consentirà la gestione completa dei ruoli.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Prossimamente...</p>
        </CardContent>
      </Card>
    </div>
  )
}
