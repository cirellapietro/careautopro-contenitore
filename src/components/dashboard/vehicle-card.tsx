import Link from 'next/link';
import { type Vehicle } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Car, Zap, Leaf, Flame, PlayCircle, StopCircle, CheckCircle2, Loader2 } from 'lucide-react';
import React from 'react';
import { useTracking } from '@/contexts/tracking-context';
import { cn } from '@/lib/utils';

type VehicleCardProps = {
  vehicle: Vehicle;
};

const VehicleIcon = ({ type, className }: { type: string, className?: string }) => {
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
  const { 
    trackedVehicleId, 
    setTrackedVehicleId,
    isTracking,
    startTracking,
    stopTracking,
    isStopping,
    permissionStatus
  } = useTracking();

  const isThisVehicleSelected = trackedVehicleId === vehicle.id;
  const isThisVehicleBeingTracked = isThisVehicleSelected && isTracking;
  const canStartTracking = permissionStatus === 'granted';

  const registrationYear = vehicle.registrationDate && !isNaN(new Date(vehicle.registrationDate).getTime()) 
    ? new Date(vehicle.registrationDate).getFullYear() 
    : 'N/D';

  const lastMaintenance = vehicle.lastMaintenanceDate && !isNaN(new Date(vehicle.lastMaintenanceDate).getTime())
    ? new Date(vehicle.lastMaintenanceDate).toLocaleDateString('it-IT')
    : 'N/D';

  const mileage = typeof vehicle.currentMileage === 'number' ? vehicle.currentMileage : 0;

  const handleSelect = () => {
    if (!isTracking) {
      setTrackedVehicleId(vehicle.id);
    }
  }

  const renderFooter = () => {
    if (isThisVehicleBeingTracked) {
      return (
        <Button onClick={stopTracking} variant="destructive" className="w-full" disabled={isStopping}>
          {isStopping ? <Loader2 className="animate-spin" /> : <StopCircle />}
          Ferma Tracciamento
        </Button>
      );
    }
    if (isThisVehicleSelected) {
      return (
        <div className="w-full grid grid-cols-2 gap-2">
          <Button onClick={startTracking} className="w-full" disabled={!canStartTracking || isTracking}>
            <PlayCircle /> Inizia
          </Button>
          <Button asChild className="w-full" variant="secondary">
            <Link href={`/dashboard/vehicles/view?id=${vehicle.id}`}>
              Dettagli <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      );
    }
    return (
        <div className="w-full grid grid-cols-2 gap-2">
            <Button onClick={handleSelect} variant="outline" className="w-full" disabled={isTracking}>
                <CheckCircle2 /> Seleziona
            </Button>
            <Button asChild className="w-full" variant="secondary">
                <Link href={`/dashboard/vehicles/view?id=${vehicle.id}`}>
                    Dettagli <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
    );
  }

  return (
    <Card className={cn("flex flex-col transition-all", isThisVehicleSelected && "ring-2 ring-primary")}>
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
      <CardFooter className="p-4 pt-0">
        {renderFooter()}
      </CardFooter>
    </Card>
  );
}
