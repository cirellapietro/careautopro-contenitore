'use client';
import { useUser } from "@/firebase/auth/use-user";
import { useFirebase, useCollection, errorEmitter, FirestorePermissionError } from "@/firebase";
import { collection, doc, updateDoc, query, where } from 'firebase/firestore';
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
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function AdminUsersPage() {
  const { user: currentUser, loading: userLoading } = useUser();
  const { firestore } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const usersQuery = useMemo(() => {
    if (!firestore || currentUser?.role !== 'Amministratore') return null;
    return query(collection(firestore, 'users'), where('dataoraelimina', '==', null));
  }, [firestore, currentUser]);

  const { data: users, isLoading: usersLoading } = useCollection<User>(usersQuery);

  useEffect(() => {
    if (!userLoading && (!currentUser || currentUser.role !== 'Amministratore')) {
      router.push('/dashboard');
    }
  }, [currentUser, userLoading, router]);

  const handleDeleteUser = () => {
    if (!userToDelete || !firestore) return;
    const userRef = doc(firestore, 'users', userToDelete.uid);
    const dataToUpdate = { dataoraelimina: new Date().toISOString() };
    updateDoc(userRef, dataToUpdate)
        .then(() => {
            toast({ title: "Utente eliminato", description: "L'utente è stato contrassegnato come eliminato." });
        })
        .catch((serverError) => {
            const permissionError = new FirestorePermissionError({
                path: userRef.path,
                operation: 'update',
                requestResourceData: dataToUpdate,
            });
            errorEmitter.emit('permission-error', permissionError);
            toast({ variant: 'destructive', title: "Errore di Permesso", description: "Non disponi dei permessi per eliminare questo utente." });
        })
        .finally(() => {
            setUserToDelete(null);
        });
  };


  if (userLoading || usersLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  return (
    <>
      <div className="space-y-6">
          <div>
              <h1 className="font-headline text-3xl font-bold">Gestione Utenti</h1>
              <p className="text-muted-foreground">Visualizza e gestisci tutti gli utenti registrati sulla piattaforma.</p>
          </div>
        <Card>
          <CardHeader>
            <CardTitle>Elenco Utenti</CardTitle>
            <CardDescription>
              Clicca su un utente per modificarne i dettagli. Gli utenti eliminati non sono visibili in questa lista.
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
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users && users.map(user => (
                    <TableRow 
                      key={user.uid}
                      className={cn("cursor-pointer", user.dataoraelimina && 'text-muted-foreground opacity-50')}
                      onClick={() => !user.dataoraelimina && router.push(`/dashboard/admin/users/${user.uid}`)}
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
                       <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/admin/users/${user.uid}`)}} disabled={!!user.dataoraelimina}>
                              <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); setUserToDelete(user); }} disabled={!!user.dataoraelimina}>
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
      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
                  <AlertDialogDescription>
                      Questa azione contrassegnerà l'utente <span className="font-bold">{userToDelete?.displayName}</span> come eliminato, ma non lo rimuoverà permanentemente.
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>Annulla</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Elimina</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
