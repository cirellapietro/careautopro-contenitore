"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";

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
        const userData = userSnap.val();

        const ruoloRef = ref(db, 'ruoli_utente/' + userData?.roleId);
        const ruoloSnap = await get(ruoloRef);
        const ruoloInfo = ruoloSnap.val();

        if (ruoloInfo?.tipo === 'admin') {
          router.push("/dashboard/admin/users");
        } else {
          router.push("/dashboard/vehicles");
        }
      } catch (error) {
        console.error("Errore redirect:", error);
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <div className="text-center">
        <h2 className="text-xl font-bold text-slate-800">CareAuto Pro</h2>
        <p className="text-slate-500">Sincronizzazione in corso...</p>
      </div>
    </div>
  );
}
