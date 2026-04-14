
"use client";

import { useUser } from "@/firebase/auth/use-user";
import { useFirebase, useCollection, errorEmitter, FirestorePermissionError } from "@/firebase";
import { collection, doc, updateDoc, query } from 'firebase/firestore';
import type { User } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Pencil, UserPlus, ShieldAlert, UserX, UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function AdminUsersPage() {
  const { user: currentUser, loading: userLoading } = useUser();
  const { firestore } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();
  
  const [userToToggle, setUserToToggle] = useState<User | null>(null);
  const [showDeleted, setShowDeleted] = useState(false);

  const usersQuery = useMemo(() => {
    if (!firestore || currentUser?.role !== 'Amministratore') return null;
    return collection(firestore, 'users');
  }, [firestore, currentUser]);

  const { data: allUsers, isLoading: usersLoading } = useCollection<User>(usersQuery);

  const filteredUsers = useMemo(() => {
      if (!allUsers) return [];
      return allUsers.filter(u => showDeleted ? u.dataoraelimina !== null : u.dataoraelimina === null);
  }, [allUsers, showDeleted]);

  useEffect(() => {
    if (!userLoading && (!currentUser || currentUser.role !== 'Amministratore')) {
        router.push('/dashboard');
    }
  }, [currentUser, userLoading, router]);

  const handleToggleStatus = () => {
    if (!userToToggle || !firestore) return;
    
    const userId = userToToggle.uid || userToToggle.id;
    const isBlocked = userToToggle.dataoraelimina !== null;

    if (userId === currentUser?.uid) {
        toast({ variant: 'destructive', title: "Operazione non consentita", description: "Non puoi bloccare il tuo stesso account." });
        setUserToToggle(null);
        return;
    }

    const docRef = doc(firestore, 'users', userId);
    const dataToUpdate = { dataoraelimina: isBlocked ? null : new Date().toISOString() };

    updateDoc(docRef, dataToUpdate)
        .then(() => {
            toast({ 
                title: isBlocked ? "Utente Sbloccato" : "Utente Bloccato", 
                description: `L\'accesso per ${userToToggle.email} è stato ${isBlocked ? 'ripristinato' : 'sospeso'}.` 
            });
        })
        .catch((serverError) => {
            const permissionError = new FirestorePermissionError({
                path: docRef.path,
                operation: 'update',
                requestResourceData: dataToUpdate,
            });
            errorEmitter.emit('permission-error', permissionError);
        })
        .finally(() => {
            setUserToToggle(null);
        });
  };

  if (userLoading || usersLoading) {
      return <div className="flex h-full items-center justify-center p-12"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
                <ShieldAlert className="text-accent h-8 w-8" />
                Controllo Utenti
            </h1>
            <p className="text-muted-foreground text-xs font-bold">Amministrazione totale del sistema e dei permessi.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowDeleted(!showDeleted)} className="font-bold text-xs">
                {showDeleted ? "Vedi Attivi" : "Vedi Bloccati"}
            </Button>
            <Button onClick={() => router.push('/dashboard/admin/users/view?id=new')} className="font-bold text-xs">
                <UserPlus className="mr-2 h-4 w-4" /> Nuovo Utente
            </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="text-lg">{showDeleted ? "Utenti Bloccati/Eliminati" : "Utenti Attivi nel Sistema"}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[60px]"></TableHead>
                        <TableHead className="text-xs">Identità</TableHead>
                        <TableHead className="text-xs">Ruolo</TableHead>
                        <TableHead className="text-right text-xs">Gestione</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredUsers.length > 0 ? filteredUsers.map(u => {
                        const initial = u.displayName ? u.displayName.charAt(0).toUpperCase() : (u.email ? u.email.charAt(0).toUpperCase() : '?');
                        const isBlocked = u.dataoraelimina !== null;
                        const userId = u.uid || u.id;
                        
                        return (
                            <TableRow key={userId} className={cn(isBlocked && "opacity-50 bg-muted/20")}>
                                <TableCell>
                                    <Avatar className="h-8 w-8 border">
                                        <AvatarImage src={u.photoURL || ''} />
                                        <AvatarFallback>{initial}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-xs">{u.displayName || 'Senza nome'}</span>
                                        <span className="text-xs text-muted-foreground font-mono">
                                            {u.email}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={u.role === 'Amministratore' ? 'default' : 'secondary'} className="text-xs">
                                        {u.role}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button variant="ghost" size="icon" title="Modifica" onClick={() => router.push(`/dashboard/admin/users/view?id=${userId}`)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className={cn(isBlocked ? "text-green-600" : "text-destructive")} 
                                            onClick={() => setUserToToggle(u)}
                                            disabled={userId === currentUser?.uid}
                                            title={isBlocked ? "Sblocca" : "Blocca Accesso"}
                                        >
                                            {isBlocked ? <UserCheck className="h-4 w-4" /> : <UserX className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    }) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-12 text-muted-foreground text-xs font-bold">
                                Nessun utente trovato in questa categoria.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </CardContent>
      </Card>

       <AlertDialog open={!!userToToggle} onOpenChange={() => setUserToToggle(null)}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>
                      {userToToggle?.dataoraelimina ? "Ripristinare l'utente?" : "Sospendere l'utente?"}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-xs font-bold leading-relaxed">
                      {userToToggle?.dataoraelimina 
                        ? `Stai per sbloccare l\'account di ${userToToggle?.email}. Potrà nuovamente accedere al sistema.`
                        : `Stai per bloccare l\'accesso a ${userToToggle?.email}. L\'utente non potrà più accedere finché non verrà sbloccato.`}
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel className="font-bold">Annulla</AlertDialogCancel>
                  <AlertDialogAction onClick={handleToggleStatus} className={cn("font-bold", !userToToggle?.dataoraelimina && "bg-destructive text-destructive-foreground")}>
                      {userToToggle?.dataoraelimina ? "Sì, Sblocca" : "Sì, Blocca"}
                  </AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
