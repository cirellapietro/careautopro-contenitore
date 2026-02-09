export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'Amministratore' | 'Utente';
};

export type Vehicle = {
  id: string;
  userId: string;
  name: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  imageUrl: string;
  imageHint: string;
  type: 'Benzina' | 'Diesel' | 'Elettrica' | 'Ibrida';
  currentMileage: number;
  lastMaintenanceDate: string;
};

export type MaintenanceIntervention = {
  id: string;
  vehicleId: string;
  description: string;
  scheduledDate?: string;
  completionDate?: string;
  status: 'Richiesto' | 'Pianificato' | 'Completato';
  cost?: number;
  notes?: string;
  urgency: 'Alta' | 'Media' | 'Bassa';
};

export type DrivingSession = {
  id: string;
  vehicleId: string;
  startTime: string;
  endTime?: string;
  distance: number;
  duration: number; // in minutes
};

export type DailyStat = {
  date: string;
  distance: number;
  duration: number; // in minutes
};
