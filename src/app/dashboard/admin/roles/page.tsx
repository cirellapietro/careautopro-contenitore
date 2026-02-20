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
    if (!userLoading && (!currentUser || currentUser.role !== 'Amministratore')) router.push('/dashboard');
  }, [currentUser, userLoading, router]);
  const handleDelete = () => {
    if (!roleToDelete || !firestore) return;
    const docRef = doc(firestore, 'roles', roleToDelete.id);
    updateDoc(docRef, { dataoraelimina: new Date().toISOString() }).then(() => {
        toast({ title: "Ruolo eliminato" });
    }).finally(() => setRoleToDelete(null));
  };
  if (userLoading || rolesLoading) return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ruoli</h1>
        <Button onClick={() => router.push('/dashboard/admin/roles/new')}><PlusCircle className="mr-2 h-4 w-4" /> Aggiungi</Button>
      </div>
      <Card><CardContent>
        <Table><TableBody>
          {roles?.map(role => (
            <TableRow key={role.id} onClick={() => router.push(`/dashboard/admin/roles/${role.id}`)}>
              <TableCell>{role.name}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setRoleToDelete(role); }}><Trash2 className="h-4 w-4" /></Button>
              </TableCell>
            </TableRow>
          ))}</TableBody></Table>
      </CardContent></Card>
    </div>
  );
                }
