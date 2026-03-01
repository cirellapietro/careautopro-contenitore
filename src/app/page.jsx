"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";

export default function HomePage() {
  const router = useRouter();
  const [status, setStatus] = useState("Verifica sessione...");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      // Test di lettura Realtime Database
      const userRef = ref(db, 'users/' + user.uid);
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setStatus("Database Connesso! Reindirizzamento...");
          const data = snapshot.val();
          // Smistamento basato sulla tua collection ruoli
          if (data.roleId === "admin") {
            router.push("/dashboard/admin/users");
          } else {
            router.push("/dashboard/vehicles");
          }
        } else {
          setStatus("Utente loggato ma profilo non trovato nel DB.");
        }
      });
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 p-6 text-center">
      <div className="animate-bounce text-4xl mb-4">🚗</div>
      <h2 className="text-xl font-bold text-slate-800">CareAuto Pro</h2>
      <p className="text-slate-500 mt-2">{status}</p>
      <div className="mt-8 px-4 py-2 bg-white rounded-full shadow-sm text-xs text-slate-400">
        Build: 23:25:41 ✅
      </div>
    </div>
  );
}
