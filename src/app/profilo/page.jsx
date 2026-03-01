"use client";
import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import BottomNav from "../../components/BottomNav";

export default function ProfiloPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-24 p-6">
      <h1 className="text-3xl font-black mb-8">Il Mio Profilo</h1>
      <div className="bg-white p-6 rounded-3xl shadow-sm mb-6 text-center">
        <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">👤</div>
        <h2 className="text-xl font-bold">{user?.email || "Utente"}</h2>
        <p className="text-slate-500 text-sm">ID: {user?.uid?.substring(0,8)}...</p>
      </div>
      <button onClick={() => signOut(auth)} className="w-full py-4 bg-red-50 text-red-600 font-bold rounded-2xl">Esci dall’account</button>
      <BottomNav utenteId={user?.uid} />
    </div>
  );
}