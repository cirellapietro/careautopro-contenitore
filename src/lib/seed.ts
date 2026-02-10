'use client';

import {
  Firestore,
  writeBatch,
  doc,
  collection,
} from 'firebase/firestore';
import { mockVehicles, mockInterventions, getMockStats, mockDrivingSessions } from './mock-data';

export const seedDatabase = async (firestore: Firestore, userId: string) => {
  const batch = writeBatch(firestore);

  const vehicleIdMap = new Map<string, string>(); // maps old mock ID to new Firestore ID

  // 1. Seed Vehicles
  mockVehicles.forEach((vehicle) => {
    // Create a reference for a new document with a unique ID
    const newVehicleRef = doc(collection(firestore, `users/${userId}/vehicles`));
    // Map the old mock ID to the new unique ID
    vehicleIdMap.set(vehicle.id, newVehicleRef.id);
    // Stage the set operation in the batch
    batch.set(newVehicleRef, {
      ...vehicle,
      id: newVehicleRef.id, // Ensure the document data has the new ID
      userId: userId,      // Set the owner ID to the current user
    });
  });

  // 2. Seed Interventions
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

  // 3. Seed Daily Stats and Driving Sessions for each new vehicle
  for (const [mockVehicleId, newVehicleId] of vehicleEntries) {
    // Seed Daily Stats for the last 30 days
    mockStats.forEach((stat) => {
      const statDate = stat.date;
      const newStatRef = doc(
        firestore,
        `users/${userId}/vehicles/${newVehicleId}/dailyStatistics`,
        statDate
      );
      batch.set(newStatRef, stat);
    });

    // Seed Driving Sessions if they exist for the original mock vehicle
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

  // Commit all the writes at once
  await batch.commit();
};
