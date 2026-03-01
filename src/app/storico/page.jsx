"use client";
import React, { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";
import BottomNav from "../../components/BottomNav";

export default function StoricoPage() {
  const [interventi, setInterventi] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(ref(db, "interventi"), orderByChild("utente_id"), equalTo(auth.currentUser.uid));
    return onValue(q, (snapshot) => {
      const data = snapshot.val();
      setInterventi(data ? Object.values(data) : []);
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-24 p-6">
      <h1 className="text-3xl font-black mb-8">Storico</h1>
      <div className="space-y-4">
        {interventi.length === 0 ? (
          <p className="text-slate-400 text-center py-10">Nessun intervento registrato.</p>
        ) : (
          interventi.map((int, i) => (
            <div key={i} className="p-4 bg-white rounded-2xl shadow-sm border-l-4 border-green-500">
              <p className="font-bold">{int.tipo_servizio}</p>
              <p className="text-sm text-slate-500">{int.data}</p>
            </div>
          ))
        )}
      </div>
      <BottomNav />
    </div>
  );
}