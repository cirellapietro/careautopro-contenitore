"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function VehicleClient({ id }: { id: string }) {
  const router = useRouter();
  return (
    <div className="p-6 space-y-4">
      <Button variant="outline" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Indietro</Button>
      <h1 className="text-2xl font-bold">Dettaglio Vehicle</h1>
      <p className="text-muted-foreground font-mono text-sm">ID: {id}</p>
      <div className="p-4 border rounded bg-slate-50 italic text-sm">
        Pronto per l'esportazione Android.
      </div>
    </div>
  );
}
