
'use client';

import { type Vehicle } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Car, Zap, Leaf, Flame, PlayCircle, StopCircle, Loader2, Gauge, Activity, Wifi, Calendar, PauseCircle, Bluetooth } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useTracking } from '@/contexts/tracking-context';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { doc, onSnapshot } from 'firebase/firestore';
import { useFirebase } from '@/firebase';
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
  const { firestore } = useFirebase();
  const { 
    trackedVehicleId, 
    isTracking,
    isPaused,
    startTracking,
    stopTracking,
    pauseTracking,
    resumeTracking,
  const { 
    trackedVehicleId, 
    setTrackedVehicleId,
    isTracking,
    startTracking,
    stopTracking,
    isStopping,
    permissionStatus,
    switchTrackingTo,
    liveSessionDistance,
    dailyTotalDistance,
    dailyTotalTime
  } = useTracking();

  const [hotspotEnabled, setHotspotEnabled] = useState(vehicle.autoHotspotEnabled || false);
  const [todayStats, setTodayStats] = useState<{ distance: number, time: number } | null>(null);

  const isThisVehicleBeingTracked = trackedVehicleId === vehicle.id && isTracking;
  const isAutomationEnabled = vehicle.autoTrackingEnabled || vehicle.autoHotspotEnabled;
  
  const canStartTracking = permissionStatus !== 'denied';

  useEffect(() => {
    if (!firestore || !vehicle.id || !vehicle.userId) return;

    const todayId = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const dailyStatRef = doc(firestore, `users/${vehicle.userId}/vehicles/${vehicle.id}/dailyStatistics/${todayId}`);

    const unsubscribe = onSnapshot(dailyStatRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTodayStats({
          distance: Number(data.totalDistance) || 0,
          time: Number(data.totalTime) || 0
        });
      } else {
        setTodayStats(null);
      }
    });

    return () => unsubscribe();
  }, [firestore, vehicle.id, vehicle.userId]);
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

  const lastTrackingDate = vehicle.lastTrackedAt && !isNaN(new Date(vehicle.lastTrackedAt).getTime())
    ? format(new Date(vehicle.lastTrackedAt), "dd MMM yyyy", { locale: it }).toUpperCase()
    : null;

  const lastDist = vehicle.lastTrackedDistance || 0;
  const lastDur = vehicle.lastTrackedDuration || 0;

  const baseMileage = typeof vehicle.currentMileage === 'number' ? vehicle.currentMileage : 0;
  const displayMileage = isThisVehicleBeingTracked ? baseMileage + liveSessionDistance : baseMileage;

  const currentDailyDist = isThisVehicleBeingTracked ? dailyTotalDistance : (todayStats?.distance || 0);
  const currentDailyTime = isThisVehicleBeingTracked ? dailyTotalTime : (todayStats?.time || 0);
  const hasUsageToday = currentDailyDist > 0 || currentDailyTime > 0;

  const baseMileage = typeof vehicle.currentMileage === 'number' ? vehicle.currentMileage : 0;
  // Usiamo liveSessionDistance (distanza percorsa non ancora sincronizzata nel DB)
  // Questo evita il doppio conteggio quando il DB viene aggiornato ma la sessione è ancora attiva.
  const displayMileage = isThisVehicleBeingTracked ? baseMileage + liveSessionDistance : baseMileage;

  const handleCardClick = () => {
    router.push(`/dashboard/vehicles/view?id=${vehicle.id}`);
  }

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');
    return hours > 0 ? `${String(hours).padStart(2, '0')}:${paddedMinutes}:${paddedSeconds}` : `${paddedMinutes}:${paddedSeconds}`;
    
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
        <div className="w-full space-y-2 bg-primary/5 p-2 rounded-xl border border-primary/10">
            <div className="flex gap-2">
                <Button 
                    onClick={(e) => handleButtonClick(e, isPaused ? resumeTracking : pauseTracking)} 
                    variant={isPaused ? "default" : "secondary"} 
                    className="flex-1 font-black uppercase text-[10px] h-10 shadow-sm"
                >
                    {isPaused ? <PlayCircle className="mr-1 h-3 w-3" /> : <PauseCircle className="mr-1 h-3 w-3" />}
                    {isPaused ? "Riprendi" : "Pausa"}
                </Button>
                <Button 
                    onClick={(e) => handleButtonClick(e, stopTracking)} 
                    variant="destructive" 
                    className="flex-1 font-black uppercase text-[10px] h-10 shadow-sm" 
                    disabled={isStopping}
                >
                    {isStopping ? <Loader2 className="animate-spin h-3 w-3" /> : <StopCircle className="mr-1 h-3 w-3" />}
                    Termina
                </Button>
            </div>
        <Button onClick={(e) => handleButtonClick(e, stopTracking)} variant="destructive" className="w-full" disabled={isStopping}>
          {isStopping ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <StopCircle className="mr-2 h-4 w-4" />}
          Ferma Tracciamento
        </Button>
      );
    }

    if (isThisVehicleSelected) {
      return (
        <div className="w-full flex flex-col items-center gap-2">
            <Button onClick={(e) => handleButtonClick(e, startTracking)} className="w-full" disabled={!canStartTracking || isTracking}>
                <PlayCircle className="mr-2 h-4 w-4" /> Attiva Tracking KM/Tempo
            </Button>
            <p className="text-xs text-muted-foreground text-center px-2">
              Il tracking aggiorna i chilometri nel database ogni 500 metri.
            </p>
        </div>
      );
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between px-2 bg-muted/30 py-2 rounded-lg border">
                <div className="flex items-center gap-2">
                    <Wifi className={cn("h-4 w-4", hotspotEnabled ? "text-primary" : "text-muted-foreground")} />
                    <Label htmlFor={`hotspot-${vehicle.id}`} className="text-xs font-bold uppercase cursor-pointer">Hotspot Wi-Fi</Label>
                </div>
                <Switch 
                    id={`hotspot-${vehicle.id}`} 
                    checked={hotspotEnabled} 
                    onCheckedChange={(val) => setHotspotEnabled(val)}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
            {isTracking ? (
                <Button onClick={(e) => handleButtonClick(e, () => switchTrackingTo(vehicle.id, hotspotEnabled))} variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 font-black uppercase text-xs h-12">
                    <PlayCircle className="mr-2 h-4 w-4" /> Sposta Tracking qui
                </Button>
            ) : (
                <Button 
                    onClick={(e) => handleButtonClick(e, () => startTracking(vehicle.id, hotspotEnabled))} 
                    className="w-full btn-orange h-12" 
                    disabled={!canStartTracking}
                >
                    <PlayCircle className="mr-2 h-5 w-5" /> Avvia Tracking GPS
                </Button>
            )}
        </div>
    if (isTracking) {
       return (
            <Button onClick={(e) => handleButtonClick(e, () => switchTrackingTo(vehicle.id))} variant="outline" className="w-full">
                <PlayCircle className="mr-2 h-4 w-4" /> Passa a questo veicolo
            </Button>
        );
    }
    
    return (
        <Button onClick={(e) => handleButtonClick(e, () => setTrackedVehicleId(vehicle.id))} variant="outline" className="w-full">
            <CheckCircle2 className="mr-2 h-4 w-4" /> Seleziona per tracciare
        </Button>
    );
  }

  return (
    <Card 
        className={cn(
            "flex flex-col transition-all duration-300 cursor-pointer hover:bg-muted/50 relative overflow-hidden", 
            isThisVehicleBeingTracked && "ring-2 ring-destructive bg-destructive/5 shadow-xl shadow-destructive/10 border-destructive/50"
        )}
        onClick={handleCardClick}
    >
        {isThisVehicleBeingTracked && (
            <div className="absolute top-0 right-0 p-2">
                <span className="flex h-3 w-3">
                    {!isPaused && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>}
                    <span className={cn("relative inline-flex rounded-full h-3 w-3", isPaused ? "bg-yellow-500" : "bg-destructive")}></span>
                </span>
            </div>
        )}

        {isAutomationEnabled && !isThisVehicleBeingTracked && (
            <div className="absolute top-2 left-2 flex gap-1">
                {vehicle.autoHotspotEnabled && <Wifi className="h-3 w-3 text-primary animate-pulse" />}
                {vehicle.autoTrackingEnabled && <Bluetooth className="h-3 w-3 text-primary animate-pulse" />}
            </div>
        )}
        
        <CardHeader className="flex flex-col items-center justify-center p-6 text-center">
            <div className={cn(
                "mb-4 flex h-20 w-24 items-center justify-center rounded-full transition-all duration-500",
                isThisVehicleBeingTracked ? (isPaused ? "bg-yellow-500/20" : "bg-destructive/20 scale-110") : "bg-secondary"
            )}>
                <VehicleIcon type={vehicle.type} className={cn("h-10 w-10 transition-colors", isThisVehicleBeingTracked ? (isPaused ? "text-yellow-600" : "text-destructive") : "text-accent")} />
            </div>
            <Badge variant={isThisVehicleBeingTracked ? (isPaused ? "secondary" : "destructive") : "outline"} className={cn("text-[10px] font-black uppercase", isThisVehicleBeingTracked && !isPaused && "animate-pulse")}>
                {isThisVehicleBeingTracked ? (isPaused ? "SESSIONE IN PAUSA" : "IN MOVIMENTO") : vehicle.type}
            </Badge>
            <CardTitle className="font-headline text-xl mt-2 uppercase">{vehicle.name}</CardTitle>
            <CardDescription className="uppercase text-[9px] font-bold">{vehicle.make} {vehicle.model} - {registrationYear}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-6 pt-0">
            <div className="border-t pt-4 text-sm text-muted-foreground">
                <div className="flex items-center justify-between mb-4">
                    <span className="label-tecnica">Tachimetro:</span>
                    <span className={cn(
                        "font-black text-xl tabular-nums transition-colors", 
                        isThisVehicleBeingTracked ? (isPaused ? "text-yellow-600" : "text-destructive") : "text-foreground"
                    )}>
                        {Math.round(displayMileage).toLocaleString('it-IT')} <span className="text-xs">KM</span>
                    </span>
                </div>
                
                <div className="space-y-3">
                    {hasUsageToday ? (
                        <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                            <p className="label-tecnica text-primary mb-2 flex items-center gap-1">
                                <Activity className="h-3 w-3" /> Bilancio Oggi
                            </p>
                            <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                <div className="flex flex-col">
                                    <span className="text-[7px] opacity-70">Distanza Percorsa</span>
                                    <span className="text-primary text-xs">{currentDailyDist.toFixed(2)} KM</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-[7px] opacity-70">Tempo Guida</span>
                                    <span className="text-primary text-xs">{Math.round(currentDailyTime)} MIN</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        lastTrackingDate && (
                            <div className="p-3 bg-muted/30 rounded-xl border border-dashed border-muted-foreground/30">
                                <p className="label-tecnica mb-2 flex items-center gap-1">
                                    <Calendar className="h-3 w-3" /> Bilancio del {lastTrackingDate}
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-[9px] font-bold uppercase">
                                    <div className="flex flex-col">
                                        <span className="text-[7px] opacity-70">Distanza Percorsa</span>
                                        <span className="text-foreground">{lastDist.toFixed(2)} KM</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-[7px] opacity-70">Tempo di Utilizzo</span>
                                        <span className="text-foreground">{formatDuration(lastDur)}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-muted-foreground/10">
                        <span className="text-[8px] font-black uppercase">Prossima Manutenzione:</span>
                        <span className="font-bold text-foreground text-[10px]">{lastMaintenance}</span>
                    </div>
                </div>
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
            <div className="border-t pt-4 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                    <span>Chilometraggio:</span>
                    <span className={cn(
                        "font-bold text-lg", 
                        isThisVehicleBeingTracked ? "text-primary animate-pulse" : "text-foreground"
                    )}>
                        {displayMileage.toLocaleString('it-IT', { maximumFractionDigits: 2 })} km
                    </span>
                </div>
                
                {isThisVehicleBeingTracked ? (
                    <div className="mt-2 space-y-1 text-xs">
                        <p className="flex items-center gap-2">
                            <Gauge className="h-3 w-3 text-primary" /> 
                            Sessione: <span className="font-semibold text-foreground">{(liveSessionDistance + (isThisVehicleBeingTracked ? (vehicle.currentMileage - baseMileage) : 0)).toFixed(2)} km</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <Timer className="h-3 w-3 text-primary" /> 
                            Tempo: <span className="font-semibold text-foreground">{formatDuration(sessionDuration)}</span>
                        </p>
                    </div>
                ) : (
                    <p className="mt-1">Ultima manutenzione: <span className="font-semibold text-foreground">{lastMaintenance}</span></p>
                )}
            </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
            {renderFooter()}
        </CardFooter>
    </Card>
  );
}
}
