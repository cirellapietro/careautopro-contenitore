'use client';

import React from 'react';
import { useTracking } from '@/contexts/tracking-context';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent } from '@/components/ui/card';
import { Wifi, WifiOff, Power } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function HotspotStatusWidget() {
  const { isHotspotActive, trackedVehicle, isTracking, setIsHotspotActive } = useTracking();
  const { t } = useLanguage();

  return (
    <Card className={cn(
      "border-2 transition-all duration-500 animate-in fade-in slide-in-from-top-2",
      isHotspotActive ? "border-primary bg-primary/5 shadow-sm" : "border-muted bg-muted/5 opacity-60"
    )}>
      <CardContent className="p-1.5 px-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className={cn(
            "p-1 rounded-md transition-all duration-500 shrink-0",
            isHotspotActive ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-muted text-muted-foreground"
          )}>
            {isHotspotActive ? (
              <div className="relative">
                <Wifi className="h-3.5 w-3.5" />
                <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                </span>
              </div>
            ) : (
              <WifiOff className="h-3.5 w-3.5" />
            )}
          </div>
          
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-[8px] font-black uppercase text-muted-foreground whitespace-nowrap shrink-0">
              {isHotspotActive ? "HOTSPOT ATTIVO:" : "HOTSPOT:"}
            </span>
            <span className={cn(
              "font-black text-[10px] uppercase tracking-tighter truncate",
              !isHotspotActive && "text-[8px] opacity-50"
            )}>
              {isHotspotActive && trackedVehicle?.hotspotSSID 
                ? trackedVehicle.hotspotSSID 
                : (isHotspotActive ? "RETE ATTIVA" : "NESSUNA RETE")}
            </span>
            {isHotspotActive && <Badge className="bg-green-500 hover:bg-green-500 h-3 px-1 text-[7px] font-black shrink-0">LIVE</Badge>}
          </div>
        </div>
        
        <div className="flex items-center gap-2 shrink-0 border-l pl-2">
          {!isHotspotActive && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 px-2 text-[7px] font-black uppercase bg-primary/10 hover:bg-primary/20 text-primary"
              onClick={() => setIsHotspotActive(true)}
            >
              <Power className="h-2 w-2 mr-1" /> ATTIVA ORA
            </Button>
          )}
          {isHotspotActive && (
            <div className="flex gap-0.5 items-end h-3">
              <div className="h-1 w-0.5 bg-primary rounded-full animate-pulse"></div>
              <div className="h-2 w-0.5 bg-primary rounded-full animate-pulse delay-75"></div>
              <div className="h-3 w-0.5 bg-primary rounded-full animate-pulse delay-150"></div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
