import { db, auth } from './firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const salvaInterventoRapido = async (targa, kmAttuali, tipoIntervento) => {
  const user = auth.currentUser;
  if (!user) return;
  
  // Utilizziamo il percorso unificato per i veicoli sotto l'utente
  const veicoloRef = doc(db, "users", user.uid, "vehicles", targa);
  
  const scadenze = { 
    olio: parseInt(kmAttuali) + 15000, 
    freni: parseInt(kmAttuali) + 30000, 
    revisione: parseInt(kmAttuali) + 20000 
  };

  await setDoc(veicoloRef, { 
    currentMileage: parseInt(kmAttuali), 
    [`prossimo_${tipoIntervento}`]: scadenze[tipoIntervento], 
    updatedAt: new Date().toISOString(),
    userId: user.uid 
  }, { merge: true });
};
