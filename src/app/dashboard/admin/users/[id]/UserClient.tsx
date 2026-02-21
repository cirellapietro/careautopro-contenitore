"use client";

import { useRouter } from "next/navigation";
import { useFirebase } from "@/firebase";
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UserClient({ id }: { id: string }) {
  const router = useRouter();
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!firestore || !id) return;
      try {
        const docRef = doc(firestore, 'users', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() });
        } else {
          toast({ title: "Errore", description: "user non trovato", variant: "destructive" });
          router.push('/dashboard/admin/users');
        }
      } catch (error) {
        console.error("Errore caricamento:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [firestore, id, router, toast]);

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Modifica User</h1>
        </div>
        <Button onClick={() => toast({ title: "Info", description: "Salvataggio non ancora implementato" })}>
          <Save className="mr-2 h-4 w-4" /> Salva
        </Button>
      </div>
      <Card>
        <CardHeader><CardTitle>{data?.name || data?.displayName || data?.email || 'Dettagli'}</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground font-mono mb-4">ID: {id}</p>
          <div className="bg-slate-50 p-4 rounded border">
             <pre className="text-xs overflow-auto text-black">
                {JSON.stringify(data, null, 2)}
             </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
