'use client';

import React from 'react';
import { useTracking } from '@/contexts/tracking-context';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Activity, Clock, StopCircle, Loader2, PauseCircle, PlayCircle, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export function ActiveTrackingWidget() {
  const { 
    isTracking, 
    isPaused,
    isHotspotActive,
    trackedVehicle, 
    sessionDistance, 
    sessionDuration,
    dailyTotalDistance,
    stopTracking, 
    pauseTracking, 
    resumeTracking,
    isStopping,
  } = useTracking();
  const { t } = useLanguage();
  const router = useRouter();

  if (!isTracking || !trackedVehicle) return null;

  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    return hours > 0 ? `${paddedHours}:${paddedMinutes}:${paddedSeconds}` : `${paddedMinutes}:${paddedSeconds}`;
  };

  const handleWidgetClick = () => {
    router.push(`/dashboard/vehicles/view?id=${trackedVehicle.id}`);
  };

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <div 
      className="widget-container animate-in fade-in slide-in-from-top-4 duration-500 cursor-pointer hover:bg-card/80 transition-colors"
      onClick={handleWidgetClick}
    >
      {/* HEADER STILE GIORNALE */}
      <div className="flex items-center justify-between w-full mb-6">
          <div className="flex items-center gap-3">
              <span className={cn(
                  "flex h-2 w-2 rounded-full",
                  isPaused ? "bg-yellow-500" : "bg-destructive animate-pulse"
              )} />
              <div className="flex flex-col">
                <span className="label-tecnica text-accent">
                    {isPaused ? t('paused_session') : t('active_session')}
                </span>
                <span className="text-[9px] font-bold uppercase text-muted-foreground">
                  {trackedVehicle.make} {trackedVehicle.model}
                </span>
              </div>
          </div>

          {/* INDICATORE HOTSPOT INTEGRATO */}
          <div className="flex-1 flex justify-center px-4">
            <div className={cn(
              "flex flex-col items-center transition-all duration-500",
              !isHotspotActive && "opacity-40"
            )}>
              <div className="flex items-center gap-1.5">
                <Wifi className={cn("h-4 w-4", isHotspotActive ? "text-primary animate-pulse" : "text-muted-foreground")} />
                <span className={cn(
                  "text-[8px] font-black uppercase leading-none",
                  isHotspotActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {isHotspotActive ? "Hotspot Live" : "No Hotspot"}
                </span>
              </div>
              <span className={cn(
                "text-[11px] font-black uppercase tracking-tighter truncate max-w-[120px] mt-1 border-b-2",
                isHotspotActive ? "text-foreground border-primary" : "text-muted-foreground/50 border-transparent"
              )}>
                {isHotspotActive && trackedVehicle.hotspotSSID 
                  ? trackedVehicle.hotspotSSID 
                  : (isHotspotActive ? "RETE ATTIVA" : "NESSUNA RETE")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
              <div className="targa-box text-sm py-1 px-3">
                  {trackedVehicle.licensePlate}
              </div>
          </div>
      </div>
      
      <div className="text-center w-full mb-8">
          <h2 className="text-4xl md:text-5xl font-black italic uppercase text-accent tracking-tighter leading-none">
              {trackedVehicle.name}
          </h2>
      </div>

      {/* DATI LIVE */}
      <div className="grid grid-cols-2 gap-8 py-6 border-y border-dashed">
        <div className="space-y-2">
            <p className="label-tecnica flex items-center gap-1">
                <Activity className="h-3 w-3" /> {t('trip_km')}
            </p>
            <p className="valore-monumentale">
                {sessionDistance.toFixed(2)}
            </p>
        </div>
        <div className="space-y-2">
            <p className="label-tecnica flex items-center gap-1">
                <Clock className="h-3 w-3" /> {t('time')}
            </p>
            <p className="valore-monumentale">
                {formatDuration(sessionDuration)}
            </p>
        </div>
      </div>

      {/* CONTROLLI */}
      <div className="flex items-center gap-4 pt-4">
        <Button 
            variant="outline"
            className="flex-1 h-14 font-black uppercase text-xs border-2 border-accent text-accent hover:bg-accent hover:text-white"
            onClick={(e) => handleActionClick(e, isPaused ? resumeTracking : pauseTracking)}
        >
            {isPaused ? <PlayCircle className="mr-2 h-5 w-5" /> : <PauseCircle className="mr-2 h-5 w-5" />}
            {isPaused ? t('resume') : t('pause')}
        </Button>
        
        <Button 
            className="flex-1 h-14 btn-orange bg-destructive hover:bg-destructive/90 border-none"
            onClick={(e) => handleActionClick(e, stopTracking)}
            disabled={isStopping}
        >
            {isStopping ? (
                <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
                <>
                    <StopCircle className="mr-2 h-5 w-5" />
                    {t('stop_tracking')}
                </>
            )}
        </Button>
      </div>

      {/* FOOTER STATS */}
      <div className="pt-6 grid grid-cols-2 gap-4">
        <div className="flex flex-col">
            <span className="label-tecnica">{t('odometer')}</span>
            <span className="font-black text-lg">{Math.round(trackedVehicle.currentMileage).toLocaleString('it-IT')} KM</span>
        </div>
        <div className="flex flex-col text-right">
            <span className="label-tecnica">{t('total_today')}</span>
            <span className="font-black text-lg text-accent">{dailyTotalDistance.toFixed(1)} KM</span>
        </div>
      </div>
    </div>
  );
}
