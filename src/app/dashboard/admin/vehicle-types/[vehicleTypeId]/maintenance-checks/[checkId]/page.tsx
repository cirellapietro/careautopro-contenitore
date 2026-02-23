'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function MaintenanceCheckDetailContent() {
  const searchParams = useSearchParams();
  const vehicleTypeId = searchParams.get('vehicleTypeId');
  const checkId = searchParams.get('checkId');

  return (
    <div className="p-6 space-y-4">
      <Button variant="outline" asChild>
        <Link href={`/dashboard/admin/vehicle-types/view?id=${vehicleTypeId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Indietro</Link>
      </Button>
      <h1 className="text-2xl font-bold">Dettaglio Controllo Manutenzione</h1>
      <p className="text-muted-foreground">Questa pagina è un segnaposto per la gestione dettagliata di un singolo controllo di manutenzione.</p>
        <div className="p-4 border rounded-md bg-secondary">
          <p>ID Tipo Veicolo: {vehicleTypeId}</p>
          <p>ID Controllo: {checkId}</p>
        </div>
    </div>
  );
}


export default function MaintenanceCheckDetailPage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
        <MaintenanceCheckDetailContent />
    </Suspense>
  )
}
