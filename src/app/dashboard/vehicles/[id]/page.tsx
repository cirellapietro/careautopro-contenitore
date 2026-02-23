import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  // This generates a placeholder page during the build process.
  // Client-side navigation will still work for other IDs.
  return [{ id: '1' }];
}

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Caricamento...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <Button variant="outline" asChild>
        <Link href="/dashboard/vehicles"><ArrowLeft className="mr-2 h-4 w-4" /> Indietro</Link>
      </Button>
      <h1 className="text-2xl font-bold">Dettaglio Vehicle</h1>
      <p className="text-muted-foreground font-mono text-sm">ID: {id}</p>
      <div className="p-4 border rounded bg-slate-50 italic text-sm">
        Pronto per l'esportazione Android.
      </div>
    </div>
  );
}
