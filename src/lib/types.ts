export type User = {
  uid: string; // Corresponds to Firebase user.uid
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: 'Amministratore' | 'Utente';
};

export type VehicleType = {
    id: string;
    name: 'Benzina' | 'Diesel' | 'Elettrica' | 'Ibrida';
    averageAnnualMileage: number;
}

export type MaintenanceCheck = {
    id: string;
    description: string;
    intervalMileage?: number;
    intervalTime?: number; // in months
}

export type Vehicle = {
  id: string;
  userId: string;
  name: string;
  make: string;
  model: string;
  year: number;
  vin?: string;
  licensePlate: string;
  imageUrl?: string;
  imageHint?: string;
  type: VehicleType['name'];
  vehicleTypeId: string;
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

    