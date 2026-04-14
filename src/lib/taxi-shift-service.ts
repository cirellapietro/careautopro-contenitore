
import { startOfWeek, addWeeks, differenceInWeeks, format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

/**
 * Logica di rotazione Turni Taxi Roma (Ciclo 8 settimane)
 * 
 * I turni sono divisi in gruppi basati sull'ultima cifra della licenza.
 * Ogni settimana il turno ruota tra:
 * M: Mattina (07:00 - 16:00)
 * P: Pomeriggio (16:00 - 01:00)
 * N: Notte (22:00 - 07:00)
 * R: Riposo Organico (Variabile)
 */

export type ShiftType = 'Mattina' | 'Pomeriggio' | 'Notte' | 'Riposo';

export interface TaxiShift {
  type: ShiftType;
  label: string;
  hours: string;
  color: string;
}

const SHIFT_CONFIG: Record<ShiftType, { hours: string; color: string; label: string }> = {
  Mattina: { hours: '07:00 - 16:00', color: 'bg-green-500', label: 'MATTINA' },
  Pomeriggio: { hours: '16:00 - 01:00', color: 'bg-orange-500', label: 'POMERIGGIO' },
  Notte: { hours: '22:00 - 07:00', color: 'bg-purple-600', label: 'NOTTE' },
  Riposo: { hours: 'TUTTO IL GIORNO', color: 'bg-destructive', label: 'RIPOSO' },
};

// Data di riferimento per l'inizio di un ciclo (Lunedì)
const REFERENCE_DATE = new Date(2024, 0, 1); // 1 Gennaio 2024 (Lunedì)

export function getTaxiShift(licenseNumber: string, date: Date): TaxiShift {
  if (!licenseNumber) {
    return { type: 'Riposo', label: 'N/D', hours: 'LICENZA MANCANTE', color: 'bg-gray-400' };
  }

  const lastDigit = parseInt(licenseNumber.slice(-1)) || 0;
  const weeksSinceRef = differenceInWeeks(startOfWeek(date, { weekStartsOn: 1 }), startOfWeek(REFERENCE_DATE, { weekStartsOn: 1 }));
  
  // Algoritmo di rotazione 8 settimane
  // (Weeks + lastDigit) % 8 determina la posizione nel ciclo
  const cycleIndex = Math.abs((weeksSinceRef + lastDigit) % 8);
  
  // Mappatura ciclo -> Turno prevalente della settimana
  // Questa è una simulazione della rotazione standard Roma
  const weeklyRotation: ShiftType[] = [
    'Mattina', 'Mattina', 
    'Pomeriggio', 'Pomeriggio', 
    'Notte', 'Notte', 
    'Riposo', 'Mattina'
  ];

  const currentType = weeklyRotation[cycleIndex];
  
  // Gestione Riposo Organico (Solitamente un giorno specifico a rotazione)
  // Per semplicità nel prototipo: se il giorno della settimana è uguale alla cifra licenza % 7
  const dayOfWeek = date.getDay(); // 0 (Dom) - 6 (Sab)
  if (dayOfWeek === (lastDigit % 7)) {
    return { type: 'Riposo', ...SHIFT_CONFIG['Riposo'] };
  }

  return { type: currentType, ...SHIFT_CONFIG[currentType] };
}

export function getMonthShifts(licenseNumber: string, date: Date) {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const days = eachDayOfInterval({ start, end });

  return days.map(day => ({
    date: day,
    shift: getTaxiShift(licenseNumber, day)
  }));
}
