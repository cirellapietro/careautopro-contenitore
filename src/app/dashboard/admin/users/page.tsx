"use client";
export const dynamic = 'force-dynamic';

import { useUser } from "@/firebase/auth/use-user";
import { useFirebase, useCollection } from "@/firebase";
import { collection, query, where } from 'firebase/firestore';
import type { User } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminUsersPage() {
  const { user: currentUser, loading: userLoading } = useUser();
  const { firestore } = useFirebase();
  const router = useRouter();

  const usersQuery = useMemo(() => {
    if (!firestore || currentUser?.role !== 'Amministratore') return null;
    return query(collection(firestore, 'users'));
  }, [firestore, currentUser]);

  const { data: users, isLoading: usersLoading } = useCollection<User>(usersQuery);

  useEffect(() => {
    if (!userLoading && (!currentUser || currentUser.role !== 'Amministratore')) {
      router.push('/dashboard');
    }
  }, [currentUser, userLoading, router]);

  if (userLoading || usersLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <div>
            <h1 className="font-headline text-3xl font-bold">Gestione Utenti</h1>
            <p className="text-muted-foreground">Visualizza e gestisci i permessi degli utenti registrati.</p>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Elenco Utenti</CardTitle>
          <CardDescription>
            Tutti gli utenti registrati nel database. Clicca per modificare il ruolo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Ruolo</TableHead>
                <TableHead className="text-right">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users && users.map(user => (
                <TableRow 
                  key={user.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/dashboard/admin/users/${user.id}`)}
                >
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>{user.displayName || 'N/D'}</TableCell>
                  <TableCell>
                      <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-semibold",
                          user.role === 'Amministratore' ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      )}>
                          {user.role}
                      </span>
                  </TableCell>
                  <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                      </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
