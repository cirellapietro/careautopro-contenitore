"use client";

import { useRouter } from "next/navigation";
import { useFirebase } from "@/firebase";
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Role } from '@/lib/types';

export default function RoleClient({ id }: { id: string }) {
  const router = useRouter();
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      if (!firestore || !id) return;
      try {
        const docRef = doc (firestore, 'roles', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRole({ id: docSnap.id, ...docSnap.data() } as Role);
        } else {
          toast({ title: "Errore", description: "Ruolo non trovato", variant: "destructive" });
          router.push('/dashboard/admin/roles');
        }
      } catch (error) {
        console.error("Errore caricamento ruolo:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRole();
  }, [firestore, id, router, toast]);

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Dettaglio Ruolo</h1>
        </div>
        <Button onClick={() => toast({ title: "Info", description: "Salvataggio non ancora implementato" })}>
          <Save className="mr-2 h-4 w-4" /> Salva
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{role?.name || 'Nome non disponibile'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
             <p className="text-sm text-muted-foreground font-mono">ID Documento: {id}</p>
             <div className="p-4 border rounded bg-slate-50">
                <p><strong>Nome Ruolo:</strong> {role?.name}</p>
                {/* Aggiungi qui altri campi se presenti nel tipo Role */}
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
