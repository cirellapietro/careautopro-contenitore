"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function MaintenanceCheckClient({ p1, p2 }: { p1: string, p2: string }) {
  const router = useRouter();
  return (
    <div className="p-6 space-y-4">
      <Button variant="outline" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Indietro</Button>
      <h1 className="text-2xl font-bold">Controllo Manutenzione</h1>
      <p>Veicolo: {p1} | Check: {p2}</p>
    </div>
  );
}
