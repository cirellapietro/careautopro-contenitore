
export type NotificationChannel = 'app' | 'email' | 'sms' | 'whatsapp' | 'telegram' | 'facebook';

export type UserRole = 'Amministratore Sistema' | 'Amministratore Veicoli' | 'Conducente';

export type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: UserRole;
  notificationChannels?: NotificationChannel[];
  notificationReminderTime?: number; // in days
  dataoraelimina?: string | null;
  phoneNumber?: string;
  licenseExpirationDate?: string; // Nuova: Data scadenza patente
export type User = {
  uid: string; // Corresponds to Firebase user.uid
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: string;
  notificationChannels?: NotificationChannel[];
  notificationReminderTime?: number; // in days
  dataoraelimina?: string | null;
};

export type Role = {
  id: string;
  name: UserRole;
  name: string;
  description?: string;
  dataoraelimina?: string | null;
};

export type VehicleType = {
    id: string;
    name: string;
    averageAnnualMileage: number;
    dataoraelimina?: string | null;
}

export type MaintenanceCheck = {
    id: string;
    vehicleTypeId: string;
    description: string;
    intervalMileage?: number;
    intervalTime?: number; // in months
    dataoraelimina?: string | null;
}

export type Vehicle = {
  id: string;
  userId: string; // Amministratore Veicoli (Owner)
  driverEmail?: string; // Conducente assegnato
  userId: string;
  name: string;
  make?: string;
  model?: string;
  registrationDate: string;
  vin?: string;
  licensePlate: string;
  imageUrl?: string;
  imageHint?: string;
  type: string;
  vehicleTypeId: string;
  currentMileage: number;
  lastMaintenanceDate: string;
  createdAt?: string;
  updatedAt?: string;
  dataoraelimina?: string | null;
  isTaxi?: boolean;
  licenseNumber?: string;
  licenseExpirationDate?: string;
  shift?: string;
  exemption?: string;
  exemptionExpirationDate?: string;
  insuranceExpirationDate?: string; // Nuova: Scadenza Assicurazione
  inspectionExpirationDate?: string; // Nuova: Scadenza Revisione
  trackingGPS?: boolean;
  autoHotspotEnabled?: boolean;
  autoTrackingEnabled?: boolean;
  bluetoothMacAddress?: string;
  bluetoothDeviceName?: string;
  hotspotSSID?: string;
  lastGpsIncrement?: number;
  lastTrackedAt?: string;
  lastTrackedDistance?: number;
  lastTrackedDuration?: number;
  dataoraelimina?: string | null;
  isTaxi?: boolean;
  trackingGPS?: boolean;
};

export type MaintenanceIntervention = {
  id: string;
  vehicleId: string;
  userId: string;
  description: string;
  scheduledDate?: string;
  completionDate?: string;
  completedAtMileage?: number;
  description: string;
  scheduledDate?: string;
  completionDate?: string;
  status: 'Richiesto' | 'Pianificato' | 'Completato';
  cost?: number;
  notes?: string;
  urgency: 'Alta' | 'Media' | 'Bassa';
  dataoraelimina?: string | null;
};

export type DrivingSession = {
  id: string;
  vehicleId: string;
  startTime: string;
  endTime?: string;
  distance: number;
  duration: number; // in minutes
  dataoraelimina?: string | null;
};

export type DailyStat = {
  id: string;
  vehicleId: string;
  date: string;
  totalDistance: number;
  totalTime: number; // in minutes
  dataoraelimina?: string | null;
};

export type Alert = {
    id: string;
    userId: string;
    message: string;
    type: 'maintenance' | 'urgent' | 'system';
    timestamp: string;
    isRead: boolean;
    dataoraelimina?: string | null;
    sentTo?: NotificationChannel[];
    deliveryStatus?: Record<string, 'sent' | 'failed' | 'pending'>;
}

export type TwilloConfig = {
    twilioaccountsid: string;
    twilioauthtoken: string;
    twiliophonenumber: string;
}
  vehicleId: string;
  date: string;
  distance: number;
  duration: number; // in minutes
  dataoraelimina?: string | null;
};
