'use client';
import { useUser } from "@/firebase/auth/use-user";
import { useFirebase, useCollection, useMemoFirebase } from "@/firebase";
import { collection } from 'firebase/firestore';
import type { User } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminUsersPage() {
  const { user: currentUser, loading: userLoading } = useUser();
  const { firestore } = useFirebase();
  const router = useRouter();

  const usersQuery = useMemoFirebase(() => {
    if (!firestore || currentUser?.role !== 'Amministratore') return null;
    return collection(firestore, 'users');
  }, [firestore, currentUser]);

  const { data: users, isLoading: usersLoading } = useCollection<User>(usersQuery);

  useEffect(() => {
    if (!userLoading && (!currentUser || currentUser.role !== 'Amministratore')) {
      router.push('/dashboard');
    }
  }, [currentUser, userLoading, router]);

  if (userLoading || !currentUser || currentUser.role !== 'Amministratore') {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <div>
            <h1 className="font-headline text-3xl font-bold">Amministrazione Utenti</h1>
            <p className="text-muted-foreground">Gestisci tutti gli utenti registrati sulla piattaforma.</p>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Elenco Utenti</CardTitle>
          <CardDescription>
            Visualizza e gestisci gli account degli utenti.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {usersLoading && !users ? (
             <div className="flex h-48 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
             </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utente</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Ruolo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users && users.map(user => (
                  <TableRow 
                    key={user.id}
                    className="cursor-pointer"
                    onClick={() => router.push(`/dashboard/admin/users/${user.id}`)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                          <AvatarFallback>{user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.displayName || 'N/A'}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'Amministratore' ? 'destructive' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
