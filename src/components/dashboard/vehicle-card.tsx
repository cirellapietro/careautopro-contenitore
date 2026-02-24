'use client';

import Link from 'next/link';
import { type Vehicle } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Car, Zap, Leaf, Flame, PlayCircle, StopCircle, CheckCircle2, Loader2, Gauge, Timer } from 'lucide-react';
import React from 'react';
import { useTracking } from '@/contexts/tracking-context';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';


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
  const router = useRouter();
  const { 
    trackedVehicleId, 
    setTrackedVehicleId,
    isTracking,
    startTracking,
    stopTracking,
    isStopping,
    permissionStatus,
    switchTrackingTo,
    sessionDistance,
    sessionDuration,
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

  const handleCardClick = () => {
    router.push(`/dashboard/vehicles/view?id=${vehicle.id}`);
  }

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation(); // Prevent card click event
    action();
  };

  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    if (hours > 0) {
        const paddedHours = String(hours).padStart(2, '0');
        return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    }
    
    return `${paddedMinutes}:${paddedSeconds}`;
  };

  const renderFooter = () => {
    if (isThisVehicleBeingTracked) {
      return (
        <Button onClick={(e) => handleButtonClick(e, stopTracking)} variant="destructive" className="w-full" disabled={isStopping}>
          {isStopping ? <Loader2 className="animate-spin" /> : <StopCircle />}
          Ferma Tracciamento
        </Button>
      );
    }

    if (isThisVehicleSelected) {
      return (
        <div className="w-full flex flex-col items-center gap-2">
            <Button onClick={(e) => handleButtonClick(e, startTracking)} className="w-full" disabled={!canStartTracking || isTracking}>
                <PlayCircle /> Attiva Tracking KM/Tempo
            </Button>
            <p className="text-xs text-muted-foreground text-center px-2">
              Il tracking calcola solo la distanza e il tempo d'uso per le scadenze. Le tue posizioni geografiche non vengono salvate né tracciate.
            </p>
        </div>
      );
    }

    if (isTracking) {
       return (
            <Button onClick={(e) => handleButtonClick(e, () => switchTrackingTo(vehicle.id))} variant="outline" className="w-full">
                <PlayCircle /> Traccia questo
            </Button>
        );
    }
    
    // Default case: This card is not selected, and no tracking is active.
    return (
        <Button onClick={(e) => handleButtonClick(e, () => setTrackedVehicleId(vehicle.id))} variant="outline" className="w-full" disabled={isTracking}>
            <CheckCircle2 /> Seleziona per tracciare
        </Button>
    );
  }

  return (
    <Card 
        className={cn("flex flex-col transition-all cursor-pointer hover:bg-muted/50", isThisVehicleSelected && "ring-2 ring-primary")}
        onClick={handleCardClick}
    >
        <CardHeader className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
                <VehicleIcon type={vehicle.type} className="h-12 w-12 text-accent" />
            </div>
            <Badge variant="outline">{vehicle.type}</Badge>
            <CardTitle className="font-headline text-2xl mt-2">{vehicle.name}</CardTitle>
            <CardDescription>{vehicle.make} {vehicle.model} - {registrationYear}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-6 pt-0">
            {isThisVehicleBeingTracked ? (
                <div className="border-t pt-4 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-primary animate-pulse" /> 
                        Distanza sessione: <span className="font-semibold text-foreground">{sessionDistance.toFixed(2)} km</span>
                    </p>
                    <p className="mt-1 flex items-center gap-2">
                        <Timer className="h-4 w-4 text-primary animate-pulse" /> 
                        Tempo trascorso: <span className="font-semibold text-foreground">{formatDuration(sessionDuration)}</span>
                    </p>
                </div>
            ) : (
                <div className="border-t pt-4 text-sm text-muted-foreground">
                <p>Chilometraggio: <span className="font-semibold text-foreground">{mileage.toLocaleString('it-IT')} km</span></p>
                <p className="mt-1">Ultima manutenzione: <span className="font-semibold text-foreground">{lastMaintenance}</span></p>
                </div>
            )}
        </CardContent>
        <CardFooter className="p-4 pt-0">
            {renderFooter()}
        </CardFooter>
    </Card>
  );
}
