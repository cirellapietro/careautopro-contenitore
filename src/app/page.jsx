"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, update } from "firebase/database";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login"); // Obbligo Login ripristinato
        return;
      }

      try {
        // Lettura profilo utente dal DB esistente
        const userRef = ref(db, 'users/' + user.uid);
        const userSnap = await get(userRef);
        const userData = userSnap.val();

        // Decodifica ruolo dalla tua collection 'ruoli_utente'
        const ruoloRef = ref(db, 'ruoli_utente/' + userData.roleId);
        const ruoloSnap = await get(ruoloRef);
        const ruoloInfo = ruoloSnap.val();

        if (ruoloInfo?.tipo === 'admin') {
          // ADMIN: Gestione utenti, CRUD e impersonificazione
          router.push("/dashboard/admin/users");
        } else {
          // UTENTE: Gestione Veicoli e GPS
          handleUserWorkflow(user.uid, userData);
        }
      } catch (error) {
        console.error("Errore ripristino flussi:", error);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleUserWorkflow = async (uid, userData) => {
    // Se nessun veicolo è tracciato in modo esclusivo, forza la scelta
    if (!userData?.veicolo_attivo_id) {
      alert("Promemoria: attiva la tracciatura GPS per uno dei tuoi veicoli (solo KM, no luoghi).");
      router.push("/dashboard/vehicles");
    } else {
      // Avvio tracciatura KM per il veicolo selezionato
      console.log("GPS attivo in modo esclusivo su:", userData.veicolo_attivo_id);
      router.push("/dashboard/vehicles/view");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <h2>🚗 CareAuto Pro</h2>
        <p>Sincronizzazione chilometri e permessi in corso...</p>
      </div>
    </div>
  );
}
