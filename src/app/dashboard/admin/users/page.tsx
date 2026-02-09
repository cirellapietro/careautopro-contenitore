'use client';
import { useUser } from "@/firebase/auth/use-user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AdminUsersPage() {
  const { user } = useUser();

  return (
    <div className="space-y-6">
        <div>
            <h1 className="font-headline text-3xl font-bold">Amministrazione Utenti</h1>
            <p className="text-muted-foreground">Gestisci tutti gli utenti registrati sulla piattaforma.</p>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Utenti</CardTitle>
          <CardDescription>
            Pagina in costruzione. Qui potrai gestire gli utenti.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user && <p>Utente corrente: {user.email}</p>}
        </CardContent>
      </Card>
    </div>
  )
}
