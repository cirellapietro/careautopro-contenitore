/**
 * FILE DISATTIVATO
 * Questo file causava un errore di "Duplicate page" con page.tsx.
 * La logica di reindirizzamento è ora gestita esclusivamente dal file TypeScript.
 */
// Nessun export default qui per evitare conflitti di routing
"use client";
import React, { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";
import BottomNav from "../../components/BottomNav";

export default function NotifichePage() {
  const [avvisi, setAvvisi] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        const q = query(ref(db, "avviso_notifiche"), orderByChild("utente_id"), equalTo(u.uid));
        return onValue(q, (s) => {
          const data = s.val();
          setAvvisi(data ? Object.values(data) : []);
        });
      }
    });
    return () => unsubAuth();
  }, []);
  return (
    <div className="min-h-screen bg-slate-50 pb-24 p-4">
      <h1 className="text-2xl font-black mb-6">Centro Notifiche</h1>
      <div className="space-y-4">
        {avvisi.map((a, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white shadow-sm border-l-4 border-blue-500">
            <p className="text-sm font-bold text-blue-600">{a.stato}</p>
            <p className="text-slate-800">{a.descrizione}</p>
          </div>
        ))}
      </div>
      <BottomNav utenteId={user?.uid} />
    </div>
  );
}
