import Link from 'next/link';
import { type Vehicle } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Car, Zap, Leaf, Flame } from 'lucide-react';
import React from 'react';

type VehicleCardProps = {
  vehicle: Vehicle;
};

const VehicleIcon = ({ type, className }: { type: string, className?: string }) => {
    // Handle potential null/undefined type
    const vehicleType = type?.toLowerCase() || '';

    switch (vehicleType) {
        case 'elettrica':
            return <Zap className={className} />;
        case 'ibrida':
            return <Leaf className={className} />;
        case 'gpl':
        case 'metano':
            return <Flame className={className} />;
        default:
            return <Car className={className} />;
    }
};


export function VehicleCard({ vehicle }: VehicleCardProps) {
  const registrationYear = vehicle.registrationDate && !isNaN(new Date(vehicle.registrationDate).getTime()) 
    ? new Date(vehicle.registrationDate).getFullYear() 
    : 'N/D';

  const lastMaintenance = vehicle.lastMaintenanceDate && !isNaN(new Date(vehicle.lastMaintenanceDate).getTime())
    ? new Date(vehicle.lastMaintenanceDate).toLocaleDateString('it-IT')
    : 'N/D';

  const mileage = typeof vehicle.currentMileage === 'number' ? vehicle.currentMileage : 0;

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
            <VehicleIcon type={vehicle.type} className="h-12 w-12 text-accent" />
        </div>
        <Badge variant="outline">{vehicle.type}</Badge>
        <CardTitle className="font-headline text-2xl mt-2">{vehicle.name}</CardTitle>
        <CardDescription>{vehicle.make} {vehicle.model} - {registrationYear}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-6 pt-0">
        <div className="border-t pt-4 text-sm text-muted-foreground">
          <p>Chilometraggio: <span className="font-semibold text-foreground">{mileage.toLocaleString('it-IT')} km</span></p>
          <p className="mt-1">Ultima manutenzione: <span className="font-semibold text-foreground">{lastMaintenance}</span></p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/dashboard/vehicles/view?id=${vehicle.id}`}>
            Gestisci Veicolo <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
