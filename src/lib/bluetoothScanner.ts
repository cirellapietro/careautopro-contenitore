import { db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export const gestisciConnessioneVeicolo = async (ownerUUID: string, vehicleUUID: string) => {
  const vehicleRef = doc(db, 'users', ownerUUID, 'vehicles', vehicleUUID);
  const snap = await getDoc(vehicleRef);
  if (snap.exists()) {
    const data = snap.data();
    const { autoHotspotEnabled, bluetoothDeviceName } = data;
    if (autoHotspotEnabled) {
      console.log("RILEVAMENTO BLUETOOTH E ATTIVAZIONE HOTSPOT PER: " + (bluetoothDeviceName || "VEICOLO"));
      // Logica attivazione Wi-Fi qui
    }
  }
};
