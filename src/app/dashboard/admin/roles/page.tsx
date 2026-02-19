"use client";
export const dynamic = 'force-dynamic';

import { useUser } from "@/firebase/auth/use-user";
import { useFirebase, useCollection, errorEmitter, FirestorePermissionError } from "@/firebase";
import { collection, doc, updateDoc, query, where } from 'firebase/firestore';
import type { Role } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function AdminRolesPage() {
  const { user: currentUser, loading: userLoading } = useUser();
  const { firestore } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const rolesQuery = useMemo(() => {
    if (!firestore || currentUser?.role !== 'Amministratore') return null;
    return query(collection(firestore, 'roles'), where('dataoraelimina', '==', null));
  }, [firestore, currentUser]);

  const { data: roles, isLoading: rolesLoading } = useCollection<Role>(rolesQuery);

  useEffect(() => {
    if (!userLoading && (!currentUser || currentUser.role !== 'Amministratore')) {
      router.push('/dashboard');
    }
  }, [currentUser, userLoading, router]);

  const handleDelete = () => {
    if (!roleToDelete || !firestore) return;
    
    const docRef = doc(firestore, 'roles', roleToDelete.id);
    const dataToUpdate = { dataoraelimina: new Date().toISOString() };
    
    updateDoc(docRef, dataToUpdate)
      .then(() => {
        toast({ title: "Ruolo eliminato", description: "Il ruolo è stato contrassegnato come eliminato." });
      })
      .catch((serverError) => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: dataToUpdate,
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({ variant: 'destructive', title: "Errore di Permesso", description: "Non disponi dei permessi per eliminare questo ruolo." });
      })
      .finally(() => {
        setRoleToDelete(null);
      });
  };

  if (userLoading || rolesLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
          <div className="flex items-center justify-between">
              <div>
                  <h1 className="font-headline text-3xl font-bold">Gestione Ruoli</h1>
                  <p className="text-muted-foreground">Gestisci i ruoli utente e i relativi permessi.</p>
              </div>
              <Button onClick={() => router.push('/dashboard/admin/roles/new')}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Aggiungi Ruolo
              </Button>
          </div>
        <Card>
          <CardHeader>
            <CardTitle>Elenco Ruoli</CardTitle>
            <CardDescription>
              Visualizza e gestisci i ruoli utente disponibili nell'applicazione. I ruoli eliminati non sono visibili.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {rolesLoading && !roles ? (
              <div className="flex h-48 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrizione</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles && roles.map(role => (
                    <TableRow 
                      key={role.id}
                      className={cn("cursor-pointer", role.dataoraelimina && 'text-muted-foreground opacity-50')}
                      onClick={() => !role.dataoraelimina && router.push(`/dashboard/admin/roles/${role.id}`)}
                    >
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/admin/roles/${role.id}`)}} disabled={!!role.dataoraelimina}>
                              <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); setRoleToDelete(role); }} disabled={!!role.dataoraelimina}>
                              <Trash2 className="h-4 w-4" />
                          </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
      <AlertDialog open={!!roleToDelete} onOpenChange={() => setRoleToDelete(null)}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
                  <AlertDialogDescription>
                      Questa azione contrassegnerà il ruolo <span className="font-bold">{roleToDelete?.name}</span> come eliminato.
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>Annulla</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Elimina</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
