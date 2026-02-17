'use client';

import {
  Firestore,
  writeBatch,
  doc,
  collection,
  getDocs,
  query,
  limit,
} from 'firebase/firestore';
import { mockVehicles, mockInterventions, mockDrivingSessions } from './mock-data';
import type { MaintenanceCheck, VehicleType, Role } from './types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// Data for global collections
const vehicleTypeData: Omit<VehicleType, 'dataoraelimina'>[] = [
  { id: 'benzina', name: 'Benzina', averageAnnualMileage: 15000 },
  { id: 'diesel', name: 'Diesel', averageAnnualMileage: 20000 },
  { id: 'ibrida', name: 'Ibrida', averageAnnualMileage: 12000 },
  { id: 'elettrica', name: 'Elettrica', averageAnnualMileage: 10000 },
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
  benzina: [
    { description: 'Cambio olio e filtro olio', intervalMileage: 15000, intervalTime: 12 },
    { description: 'Controllo e sostituzione filtro aria', intervalMileage: 30000, intervalTime: 24 },
    { description: 'Sostituzione candele', intervalMileage: 60000, intervalTime: 48 },
    { description: 'Controllo liquido freni', intervalMileage: 30000, intervalTime: 24 },
    { description: 'Sostituzione cinghia di distribuzione', intervalMileage: 100000, intervalTime: 72 },
    ...commonChecks,
  ],
  diesel: [
    { description: 'Cambio olio e filtro olio', intervalMileage: 20000, intervalTime: 12 },
    { description: 'Sostituzione filtro gasolio', intervalMileage: 40000, intervalTime: 24 },
    { description: 'Controllo e sostituzione filtro aria', intervalMileage: 40000, intervalTime: 24 },
    { description: 'Controllo liquido freni', intervalMileage: 40000, intervalTime: 24 },
    { description: 'Sostituzione cinghia di distribuzione', intervalMileage: 120000, intervalTime: 72 },
    ...commonChecks,
  ],
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
};


/**
 * Seeds the global, public collections like roles, vehicleTypes and their maintenanceChecks.
 * It checks if the data already exists to avoid overwriting.
 * This function is designed to be safe to run for any user; it will only write data
 * if the user has administrative permissions, and will fail silently otherwise.
 */
export const seedGlobalData = async (firestore: Firestore) => {
    const batch = writeBatch(firestore);
    let needsCommit = false;

    // --- Seed Roles ---
    try {
        const rolesRef = collection(firestore, 'roles');
        const rolesQuery = query(rolesRef, limit(1));
        const rolesSnapshot = await getDocs(rolesQuery);
        if (rolesSnapshot.empty) {
            console.log('Roles collection is empty. Attempting to seed...');
            needsCommit = true;
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
    } catch (error: any) {
        if (error?.code === 'permission-denied') {
            console.info('Skipping role seed check: Insufficient permissions. This is expected for non-admin users.');
        } else {
            console.error('An unexpected error occurred while checking roles during seed:', error);
        }
    }

    // --- Seed Vehicle Types and Maintenance Checks ---
    try {
        const vehicleTypesRef = collection(firestore, 'vehicleTypes');
        const vtQuery = query(vehicleTypesRef, limit(1));
        const vtSnapshot = await getDocs(vtQuery);
        if (vtSnapshot.empty) {
            console.log('VehicleTypes collection is empty. Attempting to seed...');
            needsCommit = true;
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
        if (error?.code === 'permission-denied') {
            console.info('Skipping vehicle type seed check: Insufficient permissions. This is expected for non-admin users.');
        } else {
            console.error('An unexpected error occurred while checking vehicle types during seed:', error);
        }
    }

    // --- Commit Batch if Needed ---
    if (needsCommit) {
        try {
            await batch.commit();
            console.log('Global data seeding committed successfully.');
        } catch (serverError: any) {
            if (serverError.code === 'permission-denied') {
                console.info('Global data seeding commit failed: Insufficient permissions. This is expected for non-admin users.');
            } else {
                console.error('An unexpected error occurred during the global data seed commit:', serverError);
            }
        }
    } else {
        console.log('Global data already exists. No seeding needed.');
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
