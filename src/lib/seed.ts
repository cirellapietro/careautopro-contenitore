'use client';

import {
  Firestore,
  writeBatch,
  doc,
  collection,
} from 'firebase/firestore';
import { mockVehicles, mockInterventions, getMockStats, mockDrivingSessions } from './mock-data';
import type { MaintenanceCheck, VehicleType } from './types';

// Data for global collections
const vehicleTypeData: VehicleType[] = [
  { id: 'benzina', name: 'Benzina', averageAnnualMileage: 15000 },
  { id: 'diesel', name: 'Diesel', averageAnnualMileage: 20000 },
  { id: 'ibrida', name: 'Ibrida', averageAnnualMileage: 12000 },
  { id: 'elettrica', name: 'Elettrica', averageAnnualMileage: 10000 },
];

const maintenanceCheckData: Record<string, Omit<MaintenanceCheck, 'id'>[]> = {
  benzina: [
    { description: 'Cambio olio e filtro olio', intervalMileage: 15000, intervalTime: 12 },
    { description: 'Controllo e sostituzione filtro aria', intervalMileage: 30000, intervalTime: 24 },
    { description: 'Sostituzione candele', intervalMileage: 60000, intervalTime: 48 },
    { description: 'Controllo liquido freni', intervalMileage: 30000, intervalTime: 24 },
    { description: 'Sostituzione cinghia di distribuzione', intervalMileage: 100000, intervalTime: 72 },
  ],
  diesel: [
    { description: 'Cambio olio e filtro olio', intervalMileage: 20000, intervalTime: 12 },
    { description: 'Sostituzione filtro gasolio', intervalMileage: 40000, intervalTime: 24 },
    { description: 'Controllo e sostituzione filtro aria', intervalMileage: 40000, intervalTime: 24 },
    { description: 'Controllo liquido freni', intervalMileage: 40000, intervalTime: 24 },
    { description: 'Sostituzione cinghia di distribuzione', intervalMileage: 120000, intervalTime: 72 },
  ],
  ibrida: [
    { description: 'Cambio olio e filtro olio (motore termico)', intervalMileage: 15000, intervalTime: 12 },
    { description: 'Controllo stato batteria ad alta tensione', intervalMileage: 20000, intervalTime: 12 },
    { description: 'Controllo sistema frenante (frenata rigenerativa)', intervalMileage: 30000, intervalTime: 24 },
    { description: 'Sostituzione liquido raffreddamento inverter', intervalMileage: 80000, intervalTime: 60 },
  ],
  elettrica: [
    { description: 'Controllo stato batteria ad alta tensione', intervalMileage: 25000, intervalTime: 12 },
    { description: 'Sostituzione liquido freni', intervalMileage: 50000, intervalTime: 24 },
    { description: 'Sostituzione filtro abitacolo', intervalMileage: 25000, intervalTime: 12 },
    { description: 'Controllo usura pneumatici', intervalMileage: 15000, intervalTime: 12 },
  ],
};


export const seedDatabase = async (firestore: Firestore, userId: string) => {
  const batch = writeBatch(firestore);

  // 1. Seed Global Vehicle Types and Maintenance Checks
  vehicleTypeData.forEach(vt => {
    const vtRef = doc(firestore, 'vehicleTypes', vt.id);
    batch.set(vtRef, vt);

    const checks = maintenanceCheckData[vt.id];
    if (checks) {
      checks.forEach(check => {
        const checkRef = doc(collection(vtRef, 'maintenanceChecks'));
        batch.set(checkRef, { ...check, id: checkRef.id });
      });
    }
  });


  // 2. Seed user-specific mock data
  const vehicleIdMap = new Map<string, string>(); // maps old mock ID to new Firestore ID

  mockVehicles.forEach((vehicle) => {
    const newVehicleRef = doc(collection(firestore, `users/${userId}/vehicles`));
    vehicleIdMap.set(vehicle.id, newVehicleRef.id);
    batch.set(newVehicleRef, {
      ...vehicle,
      id: newVehicleRef.id,
      userId: userId,
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
      });
    }
  });

  const mockStats = getMockStats();
  const vehicleEntries = [...vehicleIdMap.entries()];

  for (const [mockVehicleId, newVehicleId] of vehicleEntries) {
    mockStats.forEach((stat) => {
      const statDate = stat.date;
      const newStatRef = doc(
        firestore,
        `users/${userId}/vehicles/${newVehicleId}/dailyStatistics`,
        statDate
      );
      batch.set(newStatRef, stat);
    });

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
        });
      });
  }

  await batch.commit();
};

    