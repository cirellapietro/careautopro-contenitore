import type { User, Vehicle, MaintenanceIntervention, DrivingSession, DailyStat } from './types';

export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    userId: '1',
    name: 'Berlina Blu',
    make: 'Fiat',
    model: 'Tipo',
    year: 2021,
    vin: 'ABC123XYZ456',
    licensePlate: 'AB123CD',
    imageUrl: 'https://picsum.photos/seed/2/600/400',
    imageHint: 'blue sedan',
    type: 'Diesel',
    vehicleTypeId: 'diesel',
    currentMileage: 45000,
    lastMaintenanceDate: '2023-11-15',
  },
  {
    id: '2',
    userId: '1',
    name: 'SUV Bianco',
    make: 'Jeep',
    model: 'Renegade',
    year: 2022,
    vin: 'DEF456ABC789',
    licensePlate: 'EF456GH',
    imageUrl: 'https://picsum.photos/seed/3/600/400',
    imageHint: 'white suv',
    type: 'Ibrida',
    vehicleTypeId: 'hybrid',
    currentMileage: 22000,
    lastMaintenanceDate: '2024-01-20',
  },
  {
    id: '3',
    userId: '1',
    name: 'Elettrica Nera',
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    vin: 'GHI789DEF123',
    licensePlate: 'IJ789LM',
    imageUrl: 'https://picsum.photos/seed/4/600/400',
    imageHint: 'electric car',
    type: 'Elettrica',
    vehicleTypeId: 'electric',
    currentMileage: 8500,
    lastMaintenanceDate: '2024-03-10',
  },
];

export const mockInterventions: MaintenanceIntervention[] = [
  { id: '1', vehicleId: '1', description: 'Cambio olio e filtro', status: 'Completato', completionDate: '2023-11-15', cost: 150, urgency: 'Media' },
  { id: '2', vehicleId: '1', description: 'Controllo pneumatici', status: 'Richiesto', scheduledDate: '2024-08-01', urgency: 'Media' },
  { id: '3', vehicleId: '2', description: 'Tagliando annuale', status: 'Richiesto', scheduledDate: '2024-09-15', urgency: 'Alta' },
  { id: '4', vehicleId: '3', description: 'Controllo batteria', status: 'Pianificato', scheduledDate: '2024-10-01', urgency: 'Bassa' },
];

export const mockDrivingSessions: DrivingSession[] = [
    { id: '1', vehicleId: '1', startTime: '2024-07-15T08:00:00Z', endTime: '2024-07-15T08:45:00Z', distance: 35, duration: 45 },
    { id: '2', vehicleId: '2', startTime: '2024-07-15T09:15:00Z', endTime: '2024-07-15T09:30:00Z', distance: 12, duration: 15 },
    { id: '3', vehicleId: '1', startTime: '2024-07-14T18:30:00Z', endTime: '2024-07-14T19:15:00Z', distance: 50, duration: 45 },
];


export const getMockStats = (): DailyStat[] => {
    const stats: DailyStat[] = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        stats.push({
            date: date.toISOString().split('T')[0],
            distance: Math.floor(Math.random() * (100 - 5 + 1) + 5),
            duration: Math.floor(Math.random() * (120 - 10 + 1) + 10),
        });
    }
    return stats;
}

export const mockDailyStats: DailyStat[] = getMockStats();

export const mockHourlyBreakdown = [
    { hour: '00-03', minutes: 15 },
    { hour: '03-06', minutes: 5 },
    { hour: '06-09', minutes: 180 },
    { hour: '09-12', minutes: 90 },
    { hour: '12-15', minutes: 60 },
    { hour: '15-18', minutes: 45 },
    { hour: '18-21', minutes: 210 },
    { hour: '21-24', minutes: 30 },
];

    