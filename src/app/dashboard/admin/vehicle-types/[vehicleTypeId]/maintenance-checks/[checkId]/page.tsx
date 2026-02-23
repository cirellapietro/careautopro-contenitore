import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const dynamic = 'force-static';

export async function generateStaticParams() {
  // This generates a placeholder page during the build process.
  // Client-side navigation will still work for other IDs.
  return [{ vehicleTypeId: '1', checkId: '1' }];
}

export default function MaintenanceCheckDetailPage({ params }: { params: { vehicleTypeId: string, checkId: string } }) {
  const { vehicleTypeId, checkId } = params;

  return (
    <div className="p-6 space-y-4">
      <Button variant="outline" asChild>
        <Link href={`/dashboard/admin/vehicle-types/${vehicleTypeId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Indietro</Link>
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
