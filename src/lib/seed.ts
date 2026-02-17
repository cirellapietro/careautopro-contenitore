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
import type { MaintenanceCheck, VehicleType } from './types';

// Data for global collections
const vehicleTypeData: Omit<VehicleType, 'id' | 'dataoraelimina'>[] = [
  { name: 'Elettrica', averageAnnualMileage: 10000 },
  { name: 'Ibrida', averageAnnualMileage: 12000 },
  { name: 'GPL', averageAnnualMileage: 15000 },
  { name: 'Metano', averageAnnualMileage: 15000 },
];

// Common checks for all vehicle types
const commonChecks: Omit<MaintenanceCheck, 'id' | 'vehicleTypeId' | 'dataoraelimina'>[] = [
    { description: 'Revisione ministeriale', intervalTime: 24 },
    { description: 'Pagamento assicurazione annuale', intervalTime: 12 },
    { description: 'Scadenza patente di guida', intervalTime: 120 },
];

const maintenanceCheckData: Record<string, Omit<MaintenanceCheck, 'id' | 'vehicleTypeId' | 'dataoraelimina'>[]> = {
  Ibrida: [
    { description: 'Cambio olio e filtro olio (motore termico)', intervalMileage: 15000, intervalTime: 12 },
    { description: 'Controllo stato batteria ad alta tensione', intervalMileage: 20000, intervalTime: 12 },
    { description: 'Controllo sistema frenante (frenata rigenerativa)', intervalMileage: 30000, intervalTime: 24 },
    { description: 'Sostituzione liquido raffreddamento inverter', intervalMileage: 80000, intervalTime: 60 },
    ...commonChecks,
  ],
  Elettrica: [
    { description: 'Controllo stato batteria ad alta tensione', intervalMileage: 25000, intervalTime: 12 },
    { description: 'Sostituzione liquido freni', intervalMileage: 50000, intervalTime: 24 },
    { description: 'Sostituzione filtro abitacolo', intervalMileage: 25000, intervalTime: 12 },
    { description: 'Controllo usura pneumatici', intervalMileage: 15000, intervalTime: 12 },
    ...commonChecks,
  ],
  GPL: [
    { description: 'Cambio olio e filtro olio', intervalMileage: 15000, intervalTime: 12 },
    { description: 'Controllo e sostituzione filtro aria', intervalMileage: 30000, intervalTime: 24 },
    { description: 'Sostituzione candele', intervalMileage: 60000, intervalTime: 48 },
    { description: 'Controllo liquido freni', intervalMileage: 30000, intervalTime: 24 },
    { description: 'Revisione bombola GPL', intervalTime: 120 },
    ...commonChecks,
  ],
  Metano: [
    { description: 'Cambio olio e filtro olio', intervalMileage: 15000, intervalTime: 12 },
    { description: 'Controllo e sostituzione filtro aria', intervalMileage: 30000, intervalTime: 24 },
    { description: 'Sostituzione candele', intervalMileage: 60000, intervalTime: 48 },
    { description: 'Controllo liquido freni', intervalMileage: 30000, intervalTime: 24 },
    { description: 'Revisione bombole Metano', intervalTime: 48 },
    ...commonChecks,
  ],
};


/**
 * Seeds the global vehicleTypes collection.
 * It checks if the data already exists to avoid overwriting.
 * This function is designed to be safe to run by an admin; it will only write data
 * if the user has appropriate permissions.
 * It returns an object indicating success or failure.
 */
export const seedGlobalData = async (firestore: Firestore): Promise<{ success: boolean, message: string }> => {
    const batch = writeBatch(firestore);
    let needsSeeding = false;

    // --- Seed Vehicle Types and Maintenance Checks ---
    try {
        const vehicleTypesRef = collection(firestore, 'vehicleTypes');
        const vtSnapshot = await getDocs(query(vehicleTypesRef, limit(1)));
        if (vtSnapshot.empty) {
            needsSeeding = true;
            vehicleTypeData.forEach(vt => {
                const vtId = vt.name.toLowerCase();
                const vtRef = doc(firestore, 'vehicleTypes', vtId);
                batch.set(vtRef, { id: vtId, name: vt.name, averageAnnualMileage: vt.averageAnnualMileage, dataoraelimina: null });

                const checks = maintenanceCheckData[vt.name];
                if (checks) {
                    checks.forEach(check => {
                        const checkRef = doc(collection(vtRef, 'maintenanceChecks'));
                        batch.set(checkRef, {
                            ...check,
                            id: checkRef.id,
                            vehicleTypeId: vtId,
                            dataoraelimina: null,
                        });
                    });
                }
            });
        }
    } catch (error: any) {
        // This read should be public. If it fails, something is wrong with the rules or connection.
        return { success: false, message: `Errore durante il controllo dei tipi veicolo: ${error.message}` };
    }
    
    // --- Commit if needed ---
    if (!needsSeeding) {
        return { success: true, message: 'Dati dei tipi veicolo già presenti. Nessuna operazione eseguita.' };
    }

    try {
        await batch.commit();
        return { success: true, message: 'Tipi veicolo e controlli standard creati con successo!' };
    } catch (error: any) {
        if (error.code === 'permission-denied') {
             return { success: false, message: 'Permesso negato. Solo gli amministratori possono creare i dati globali.' };
        }
        return { success: false, message: `Errore durante il salvataggio dei dati: ${error.message}` };
    }
};
