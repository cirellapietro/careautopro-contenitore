'use client';

import {
  Firestore,
  writeBatch,
  doc,
  collection,
  getDocs,
  query,
  limit,
  CollectionReference,
} from 'firebase/firestore';
import { mockVehicles, mockInterventions, mockDrivingSessions } from './mock-data';
import type { MaintenanceCheck, VehicleType, Role } from './types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// Data for global collections
const vehicleTypeData: Omit<VehicleType, 'dataoraelimina'>[] = [
  { id: 'elettrica', name: 'Elettrica', averageAnnualMileage: 10000 },
  { id: 'ibrida', name: 'Ibrida', averageAnnualMileage: 12000 },
  { id: 'gpl', name: 'GPL', averageAnnualMileage: 15000 },
  { id: 'metano', name: 'Metano', averageAnnualMileage: 15000 },
];

const roleData: Omit<Role, 'id' | 'dataoraelimina'>[] = [
  { name: 'Amministratore', description: 'Accesso completo a tutte le funzionalità di amministrazione.' },
  { name: 'Utente', description: 'Accesso standard alle funzionalità dell\'applicazione.' },
];

// Common checks for all vehicle types
const commonChecks: Omit<MaintenanceCheck, 'id' | 'vehicleTypeId' | 'dataoraelimina'>[] = [
    { description: 'Revisione ministeriale', intervalTime: 24 },
    { description: 'Pagamento assicurazione annuale', intervalTime: 12 },
    { description: 'Scadenza patente di guida', intervalTime: 120 },
];

const maintenanceCheckData: Record<string, Omit<MaintenanceCheck, 'id' | 'vehicleTypeId' | 'dataoraelimina'>[]> = {
  ibrida: [
    { description: 'Cambio olio e filtro olio (motore termico)', intervalMileage: 15000, intervalTime: 12 },
    { description: 'Controllo stato batteria ad alta tensione', intervalMileage: 20000, intervalTime: 12 },
    { description: 'Controllo sistema frenante (frenata rigenerativa)', intervalMileage: 30000, intervalTime: 24 },
    { description: 'Sostituzione liquido raffreddamento inverter', intervalMileage: 80000, intervalTime: 60 },
    ...commonChecks,
  ],
  elettrica: [
    { description: 'Controllo stato batteria ad alta tensione', intervalMileage: 25000, intervalTime: 12 },
    { description: 'Sostituzione liquido freni', intervalMileage: 50000, intervalTime: 24 },
    { description: 'Sostituzione filtro abitacolo', intervalMileage: 25000, intervalTime: 12 },
    { description: 'Controllo usura pneumatici', intervalMileage: 15000, intervalTime: 12 },
    ...commonChecks,
  ],
  gpl: [
    { description: 'Cambio olio e filtro olio', intervalMileage: 15000, intervalTime: 12 },
    { description: 'Controllo e sostituzione filtro aria', intervalMileage: 30000, intervalTime: 24 },
    { description: 'Sostituzione candele', intervalMileage: 60000, intervalTime: 48 },
    { description: 'Controllo liquido freni', intervalMileage: 30000, intervalTime: 24 },
    { description: 'Revisione bombola GPL', intervalTime: 120 },
    ...commonChecks,
  ],
  metano: [
    { description: 'Cambio olio e filtro olio', intervalMileage: 15000, intervalTime: 12 },
    { description: 'Controllo e sostituzione filtro aria', intervalMileage: 30000, intervalTime: 24 },
    { description: 'Sostituzione candele', intervalMileage: 60000, intervalTime: 48 },
    { description: 'Controllo liquido freni', intervalMileage: 30000, intervalTime: 24 },
    { description: 'Revisione bombole Metano', intervalTime: 48 },
    ...commonChecks,
  ],
};


/**
 * Seeds the global, public collections like roles and vehicleTypes.
 * It checks if the data already exists to avoid overwriting.
 * This function is designed to be safe to run; it will only write data
 * if the user has administrative permissions.
 * It returns an object indicating success or failure.
 */
export const seedGlobalData = async (firestore: Firestore): Promise<{ success: boolean, message: string }> => {
    const batch = writeBatch(firestore);
    let needsCommit = false;

    try {
        // Check Roles
        const rolesRef = collection(firestore, 'roles');
        const rolesSnapshot = await getDocs(query(rolesRef, limit(1)));
        if (rolesSnapshot.empty) {
            needsCommit = true;
            console.log('Roles collection will be seeded.');
            roleData.forEach(role => {
                const roleRef = doc(firestore, 'roles', role.name.toLowerCase());
                batch.set(roleRef, {
                    id: roleRef.id,
                    name: role.name,
                    description: role.description,
                    dataoraelimina: null,
                });
            });
        }

        // Check Vehicle Types
        const vehicleTypesRef = collection(firestore, 'vehicleTypes');
        const vtSnapshot = await getDocs(query(vehicleTypesRef, limit(1)));
        if (vtSnapshot.empty) {
            needsCommit = true;
            console.log('VehicleTypes collection will be seeded.');
            vehicleTypeData.forEach(vt => {
                const vtRef = doc(firestore, 'vehicleTypes', vt.id);
                batch.set(vtRef, { ...vt, dataoraelimina: null });

                const checks = maintenanceCheckData[vt.id];
                if (checks) {
                    checks.forEach(check => {
                        const checkRef = doc(collection(vtRef, 'maintenanceChecks'));
                        batch.set(checkRef, {
                            ...check,
                            id: checkRef.id,
                            vehicleTypeId: vt.id,
                            dataoraelimina: null,
                        });
                    });
                }
            });
        }
    } catch (error: any) {
        // This catch block handles errors during the read phase (getDocs).
        // A permission denied error here is expected for non-admins and should not stop the process.
         if (error.code === 'permission-denied') {
            const msg = 'Permesso negato durante il controllo dei dati. Proseguo con il tentativo di scrittura.';
            console.info(msg);
            // We can assume we need to try and write if we can't even read to check.
            needsCommit = true; 
        } else {
             const msg = 'Errore imprevisto durante il controllo dei dati esistenti.';
            console.error(msg, error);
            return { success: false, message: `${msg} Dettagli: ${error.message}` };
        }
    }
    
    if (!needsCommit) {
        console.log('Global data already exists. No seeding needed.');
        return { success: true, message: 'I dati globali esistono già. Nessuna operazione eseguita.' };
    }

    // --- Commit Batch ---
    try {
        await batch.commit();
        console.log('Global data seeding committed successfully.');
        return { success: true, message: 'I dati iniziali sono stati creati con successo!' };
    } catch (error: any) {
        if (error.code === 'permission-denied') {
            const msg = 'Permesso negato. Solo gli amministratori possono eseguire questa operazione.';
            console.warn('Global data seeding commit failed:', msg, error);
            return { success: false, message: msg };
        } else {
            const msg = 'Si è verificato un errore imprevisto durante la creazione dei dati.';
            console.error(msg, error);
            return { success: false, message: `${msg} Dettagli: ${error.message}` };
        }
    }
};


export const seedDatabase = async (firestore: Firestore, userId: string) => {
  // First, ensure global data is seeded. This makes the button idempotent for global data.
  await seedGlobalData(firestore);
  
  const batch = writeBatch(firestore);

  // Seed user-specific mock data
  const vehicleIdMap = new Map<string, string>(); // maps old mock ID to new Firestore ID

  mockVehicles.forEach((vehicle) => {
    const newVehicleRef = doc(collection(firestore, `users/${userId}/vehicles`));
    vehicleIdMap.set(vehicle.id, newVehicleRef.id);
    batch.set(newVehicleRef, {
      ...vehicle,
      id: newVehicleRef.id,
      userId: userId,
      dataoraelimina: null,
    });
  });

  mockInterventions.forEach((intervention) => {
    const newVehicleId = vehicleIdMap.get(intervention.vehicleId);
    if (newVehicleId) {
      const newInterventionRef = doc(
        collection(
          firestore,
          `users/${userId}/vehicles/${newVehicleId}/maintenanceInterventions`
        )
      );
      batch.set(newInterventionRef, {
        ...intervention,
        id: newInterventionRef.id,
        vehicleId: newVehicleId,
        dataoraelimina: null,
      });
    }
  });

  const vehicleEntries = [...vehicleIdMap.entries()];

  for (const [mockVehicleId, newVehicleId] of vehicleEntries) {
    // Generate stats for the last 30 days for this vehicle
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const statDate = date.toISOString().split('T')[0];

        const newStatRef = doc(
            firestore,
            `users/${userId}/vehicles/${newVehicleId}/dailyStatistics`,
            statDate
        );
        batch.set(newStatRef, {
            vehicleId: newVehicleId,
            date: statDate,
            distance: Math.floor(Math.random() * (100 - 5 + 1) + 5),
            duration: Math.floor(Math.random() * (120 - 10 + 1) + 10),
            dataoraelimina: null,
        });
    }

    mockDrivingSessions
      .filter((s) => s.vehicleId === mockVehicleId)
      .forEach((session) => {
        const newSessionRef = doc(
          collection(
            firestore,
            `users/${userId}/vehicles/${newVehicleId}/trackingSessions`
          )
        );
        batch.set(newSessionRef, {
          ...session,
          id: newSessionRef.id,
          vehicleId: newVehicleId,
          dataoraelimina: null,
        });
      });
  }

  await batch.commit();
};
