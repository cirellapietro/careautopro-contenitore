
'use client';

import React, { useMemo } from 'react';
import { getTaxiShift, getMonthShifts } from '@/lib/taxi-shift-service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, Info, AlertTriangle, FileWarning, CalendarDays } from 'lucide-react';
import { format, isToday } from 'date-fns';
import { it } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface TaxiStatusProps {
  licenseNumber: string;
  licenseExpirationDate?: string;
  exemptionExpirationDate?: string;
  className?: string;
}

export function TaxiStatus({ licenseNumber, licenseExpirationDate, exemptionExpirationDate, className }: TaxiStatusProps) {
  const today = new Date();
  const currentShift = useMemo(() => getTaxiShift(licenseNumber, today), [licenseNumber, today]);
  const monthShifts = useMemo(() => getMonthShifts(licenseNumber, today), [licenseNumber, today]);

  const weekDays = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];

  // Funzione di normalizzazione ultra-robusta per Chrome Automotive
  const normalizeDateStr = (d?: string) => {
    if (!d) return '';
    // Estraiamo solo YYYY-MM-DD ignorando fusi orari o tempi
    const match = d.match(/^(\d{4})-(\d{2})-(\d{2})/);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : '';
  };

  const targetLicense = normalizeDateStr(licenseExpirationDate);
  const targetExemption = normalizeDateStr(exemptionExpirationDate);

  // Generazione manuale della stringa data per il confronto (zero-dependency per Automotive)
  const getMarkerForDay = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const dateKey = `${y}-${m}-${d}`;
    
    const markers = [];
    if (targetLicense === dateKey) {
        markers.push({ type: 'license', icon: <AlertTriangle className="h-3 w-3 text-white" />, label: 'SCADENZA LICENZA' });
    }
    if (targetExemption === dateKey) {
        markers.push({ type: 'exemption', icon: <FileWarning className="h-3 w-3 text-white" />, label: 'SCADENZA ESENZIONE TURNO' });
    }
    return markers;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* CARD TURNO ATTUALE */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2">
              <Clock className="h-3 w-3" /> TURNO ATTUALE
            </CardTitle>
            <Badge className={cn("text-[10px] font-black tracking-widest", currentShift.color)}>
              {currentShift.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-xl font-black italic text-primary">{currentShift.hours}</p>
          <div className="mt-2 flex items-center gap-1">
            <Info className="h-3 w-3 text-muted-foreground" />
            <span className="text-[9px] text-muted-foreground uppercase font-bold">LICENZA N. {licenseNumber}</span>
          </div>
        </CardContent>
      </Card>

      {/* CALENDARIO MENSILE */}
      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2">
            <CalendarIcon className="h-3 w-3" /> ROTAZIONE {format(today, 'MMMM yyyy', { locale: it }).toUpperCase()}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {weekDays.map((d, i) => (
              <span key={i} className="text-[10px] font-black text-muted-foreground">{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {/* Padding per l'inizio del mese */}
            {Array.from({ length: (monthShifts[0].date.getDay() + 6) % 7 }).map((_, i) => (
              <div key={`pad-${i}`} className="h-10 w-full" />
            ))}
            
            {monthShifts.map((item, i) => {
              const dayMarkers = getMarkerForDay(item.date);
              const hasMarker = dayMarkers.length > 0;

              return (
                <div 
                  key={i}
                  className={cn(
                    "h-10 w-full rounded-sm flex flex-col items-center justify-center relative transition-all",
                    item.shift.color,
                    isToday(item.date) ? "ring-2 ring-primary ring-offset-1 z-10" : "opacity-80",
                    hasMarker && "ring-2 ring-destructive ring-inset"
                  )}
                  title={hasMarker ? dayMarkers[0].label : undefined}
                >
                  <span className="text-[10px] font-black text-white">{item.date.getDate()}</span>
                  
                  {hasMarker && (
                      <div className="absolute top-0 right-0 p-0.5 bg-destructive rounded-bl-sm">
                          {dayMarkers[0].icon}
                      </div>
                  )}
                  
                  {isToday(item.date) && <div className="absolute -bottom-1 h-1 w-1 bg-white rounded-full" />}
                </div>
              );
            })}
          </div>

          {/* RIEPILOGO SCADENZE TESTUALE (Per Automotive senza hover) */}
          {(licenseExpirationDate || exemptionExpirationDate) && (
              <div className="mt-4 pt-4 border-t space-y-2">
                  <p className="text-[9px] font-black uppercase text-muted-foreground mb-2 flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" /> SCADENZE DOCUMENTI
                  </p>
                  {licenseExpirationDate && (
                      <div className="flex items-center justify-between p-2 bg-muted/30 rounded border text-[10px]">
                          <span className="font-bold uppercase text-muted-foreground">SCADENZA LICENZA</span>
                          <span className="font-black text-destructive">{format(new Date(licenseExpirationDate), 'dd/MM/yyyy')}</span>
                      </div>
                  )}
                  {exemptionExpirationDate && (
                      <div className="flex items-center justify-between p-2 bg-muted/30 rounded border text-[10px]">
                          <span className="font-bold uppercase text-muted-foreground">ESENZIONE TURNO</span>
                          <span className="font-black text-destructive">{format(new Date(exemptionExpirationDate), 'dd/MM/yyyy')}</span>
                      </div>
                  )}
              </div>
          )}

          {/* LEGENDA TURNI */}
          <div className="mt-4 grid grid-cols-2 gap-2">
             <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-[8px] font-bold uppercase text-muted-foreground">Mattina</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
                <span className="text-[8px] font-bold uppercase text-muted-foreground">Pomeriggio</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-purple-600" />
                <span className="text-[8px] font-bold uppercase text-muted-foreground">Notte</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-destructive" />
                <span className="text-[8px] font-bold uppercase text-muted-foreground">Riposo</span>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
