"use client";
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import { useEffect, useState, useMemo } from 'react';
import { useForm } from "react-hook-form";
import { doc, updateDoc, collection, query, getDocs, where } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from "@/firebase/auth/use-user";
import { useFirebase, useDoc } from '@/firebase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import type { User, Role } from '@/lib/types';

export default function AdminUserEditPage() {
    const { id } = useParams() as { id: string };
    const { firestore } = useFirebase();
    const router = useRouter();
    const userRef = useMemo(() => firestore ? doc(firestore, 'users', id) : null, [firestore, id]);
    const { data: userToEdit } = useDoc<User>(userRef);
    const [roles, setRoles] = useState<Role[]>([]);
    const form = useForm({ defaultValues: { displayName: '', role: '' } });
    useEffect(() => {
        if (firestore) getDocs(query(collection(firestore, 'roles'), where('dataoraelimina', '==', null)))
            .then(s => setRoles(s.docs.map(d => ({ id: d.id, ...d.data() } as Role))));
    }, [firestore]);
    useEffect(() => {
        if (userToEdit) form.reset({ displayName: userToEdit.displayName || '', role: userToEdit.role || '' });
    }, [userToEdit, form]);
    const onSubmit = (data: any) => updateDoc(userRef!, data).then(() => router.push('/dashboard/admin/users'));
    return (
        <Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="displayName" render={({ field }) => (
                <FormItem><FormLabel>Nome</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )} />
            <FormField control={form.control} name="role" render={({ field }) => (
                <FormItem><FormLabel>Ruolo</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>{roles.map(r => <SelectItem key={r.id} value={r.name}>{r.name}</SelectItem>)}</SelectContent>
                </Select></FormItem>
            )} />
            <Button type="submit">Salva</Button>
        </form></Form>
    );
}
