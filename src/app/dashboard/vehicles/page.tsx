import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockVehicles } from '@/lib/mock-data';
import { VehicleCard } from '@/components/dashboard/vehicle-card';

export default function VehiclesPage() {
  const vehicles = mockVehicles;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold">I Miei Veicoli</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Aggiungi Veicolo
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </>
  );
}
