"use client";
import { useRouter } from "next/navigation";
import { useFirebase } from "@/firebase";
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";

export default function UserClient({ id }: { id: string }) {
  const router = useRouter();
  const { firestore } = useFirebase();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!firestore || !id || id === "placeholder") {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(firestore, 'users', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setData({ id: docSnap.id, ...docSnap.data() });
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    }
    fetchData();
  }, [firestore, id]);

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="p-6 space-y-6">
      <Button variant="outline" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Indietro</Button>
      <Card>
        <CardHeader><CardTitle>User: {data?.name || id}</CardTitle></CardHeader>
        <CardContent><pre className="text-xs bg-slate-50 p-4">{JSON.stringify(data || {info: "Dati non caricati o placeholder"}, null, 2)}</pre></CardContent>
      </Card>
    </div>
  );
}
