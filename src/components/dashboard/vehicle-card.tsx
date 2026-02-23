import Image from 'next/image';
import Link from 'next/link';
import { type Vehicle } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type VehicleCardProps = {
  vehicle: Vehicle;
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const registrationYear = vehicle.registrationDate ? new Date(vehicle.registrationDate).getFullYear() : 'N/D';
  
  // Create a somewhat unique numeric seed for picsum from the vehicle id
  const imageSeed = vehicle.id.replace(/[^0-9]/g, '').slice(0, 5) || '1';

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={vehicle.imageUrl || `https://picsum.photos/seed/${imageSeed}/600/400`}
            alt={vehicle.name}
            fill
            className="rounded-t-lg object-cover"
            data-ai-hint={vehicle.imageHint || (vehicle.make && vehicle.model ? `${vehicle.make} ${vehicle.model}` : 'car')}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <Badge variant="outline" className="mb-2">{vehicle.type}</Badge>
        <CardTitle className="font-headline text-2xl">{vehicle.name}</CardTitle>
        <CardDescription>{vehicle.make} {vehicle.model} - {registrationYear}</CardDescription>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Chilometraggio: <span className="font-semibold text-foreground">{vehicle.currentMileage.toLocaleString('it-IT')} km</span></p>
          <p>Ultima manutenzione: <span className="font-semibold text-foreground">{new Date(vehicle.lastMaintenanceDate).toLocaleDateString('it-IT')}</span></p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/dashboard/vehicles/${vehicle.id}`}>
            Gestisci Veicolo <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
