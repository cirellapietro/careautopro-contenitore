"use client";
import React, { useEffect } from "react";
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
          // Se l'utente è nuovo, lo registra come utilizzatore
          await set(userRef, {
            email: user.email,
            displayName: user.displayName,
            roleId: "utilizzatore",
            createdAt: new Date().toISOString()
          });
          router.push("/dashboard/vehicles");
        } else {
          const userData = userSnap.val();
          // Smistamento in base al ruolo del DB
          if (userData.roleId === 'admin') {
            router.push("/dashboard/admin/users");
          } else {
            router.push("/dashboard/vehicles");
          }
        }
      } catch (error) {
        console.error("Errore sincronizzazione sorgenti:", error);
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <p>Sincronizzazione sorgenti con Vercel...</p>
    </div>
  );
}
