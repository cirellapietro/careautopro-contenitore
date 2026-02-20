"use client";
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import { useEffect, useMemo } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { doc, updateDoc, setDoc, collection } from 'firebase/firestore';
import { notFound, useRouter, useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/firebase/auth/use-user";
import { useFirebase, useDoc } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import type { Role } from '@/lib/types';

const schema = z.object({ name: z.string().min(2), description: z.string().optional() });

export default function AdminRoleEditPage() {
    const { id } = useParams() as { id: string };
    const { user: currentUser, loading: userLoading } = useUser();
    const { firestore } = useFirebase();
    const { toast } = useToast();
    const router = useRouter();
    const isNew = id === 'new';
    const roleRef = useMemo(() => (!firestore || isNew) ? null : doc(firestore, 'roles', id), [firestore, id, isNew]);
    const { data: roleToEdit, isLoading } = useDoc<Role>(roleRef);
    const form = useForm({ resolver: zodResolver(schema), defaultValues: { name: '', description: '' } });
    useEffect(() => {
        if (roleToEdit) form.reset({ name: roleToEdit.name, description: roleToEdit.description });
    }, [roleToEdit, form]);
    const onSubmit = (data: any) => {
        const ref = isNew ? doc(collection(firestore!, 'roles')) : roleRef!;
        const op = isNew ? setDoc(ref, { ...data, id: ref.id }) : updateDoc(ref, data);
        op.then(() => router.push('/dashboard/admin/roles'));
    };
    if (userLoading || (!isNew && isLoading)) return <Loader2 className="animate-spin" />;
    return (
        <Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Nome</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )} />
            <Button type="submit">Salva</Button>
        </form></Form>
    );
}
