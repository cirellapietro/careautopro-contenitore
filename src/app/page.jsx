"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, set } from "firebase/database";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      try {
        const userRef = ref(db, 'users/' + user.uid);
        const userSnap = await get(userRef);

        if (!userSnap.exists()) {
          // Registrazione automatica ruolo utilizzatore
          await set(userRef, {
            email: user.email,
            displayName: user.displayName || "Nuovo Utente",
            roleId: "utilizzatore",
            createdAt: new Date().toISOString()
          });
          router.push("/dashboard/vehicles");
        } else {
          const userData = userSnap.val();
          // Smistamento in base al ruolo presente nel database
          router.push(userData.roleId === 'admin' ? "/dashboard/admin/users" : "/dashboard/vehicles");
        }
      } catch (error) {
        console.error("Errore di sincronizzazione:", error);
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <p>Sincronizzazione CareAuto Pro...</p>
    </div>
  );
}
