"use client";
export const dynamic = 'force-dynamic';

import { useUser } from "@/firebase/auth/use-user";
import { useFirebase, useCollection } from "@/firebase";
import { collection, query, where } from 'firebase/firestore';
import type { User } from '@/lib/types';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";

export default function AdminUsersPage() {
  const { user: currentUser, loading: userLoading } = useUser();
  const { firestore } = useFirebase();
  const router = useRouter();
  const usersQuery = useMemo(() => (firestore && currentUser?.role === 'Amministratore') ? query(collection(firestore, 'users'), where('dataoraelimina', '==', null)) : null, [firestore, currentUser]);
  const { data: users, isLoading } = useCollection<User>(usersQuery);
  if (userLoading || isLoading) return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Utenti</h1>
      <Card><CardContent>
        <Table><TableBody>
          {users?.map(u => (
            <TableRow key={u.id} onClick={() => router.push(`/dashboard/admin/users/view?id=${u.id}`)}>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell className="text-right"><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></TableCell>
            </TableRow>
          ))}</TableBody></Table>
      </CardContent></Card>
    </div>
  );
}
