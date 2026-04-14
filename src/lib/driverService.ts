import { db } from './firebaseConfig';
import { doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';

/**
 * Salva preferenze usando UUID immutabile.
 */
export const salvaPreferenzeAuto = async (ownerUUID: string, vehicleUUID: string, bluetoothName: string, enableHotspot: boolean) => {
  const vehicleRef = doc(db, 'users', ownerUUID, 'vehicles', vehicleUUID);
  await updateDoc(vehicleRef, {
    bluetoothDeviceName: bluetoothName.toUpperCase(),
    autoHotspotEnabled: enableHotspot,
    updatedAt: new Date().toISOString()
  });
};

/**
 * Gestisce scadenze periodiche (Bollo, Assicurazione, Revisione)
 * @param tipo 'bollo' | 'assicurazione' | 'revisione'
 */
export const salvaScadenzaPeriodica = async (ownerUUID: string, vehicleUUID: string, tipo: string, dataScadenza: string) => {
  const interventionRef = doc(collection(db, 'users', ownerUUID, 'vehicles', vehicleUUID, 'maintenanceInterventions'));
  await setDoc(interventionRef, {
    id: interventionRef.id,
    vehicleId: vehicleUUID,
    userId: ownerUUID,
    description: tipo.toUpperCase(),
    scheduledDate: dataScadenza,
    status: 'Pianificato',
    urgency: 'Media',
    dataoraelimina: null,
    createdAt: new Date().toISOString()
  }, { merge: true });
};

export const aggiungiDriver = async (ownerUUID: string, vehicleUUID: string, driverUUID: string) => {
  const vehicleRef = doc(db, 'users', ownerUUID, 'vehicles', vehicleUUID);
  await updateDoc(vehicleRef, { 
    allowedDrivers: arrayUnion(driverUUID) 
  });
};
