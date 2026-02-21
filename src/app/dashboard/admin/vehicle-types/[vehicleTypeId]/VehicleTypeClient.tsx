"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function VehicleTypeClient({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulazione o caricamento dati Firestore qui
    if (id) setLoading(false);
  }, [id]);

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="p-6 space-y-6">
      <Button variant="outline" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Indietro</Button>
      <Card>
        <CardHeader><CardTitle>Gestione VehicleType: {id}</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">ID dinamico caricato: {id}</p>
          <p className="mt-4 italic">Interfaccia pronta per l'esportazione statica.</p>
        </CardContent>
      </Card>
    </div>
  );
}
