'use client';

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function MaintenanceCheckDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { vehicleTypeId, checkId } = params;

  if (!vehicleTypeId || !checkId) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Caricamento...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <Button variant="outline" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Indietro</Button>
      <h1 className="text-2xl font-bold">Controllo Manutenzione</h1>
      <p>Veicolo: {vehicleTypeId} | Check: {checkId}</p>
    </div>
  );
}
