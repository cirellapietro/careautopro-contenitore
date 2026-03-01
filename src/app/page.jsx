"use client";
import React from "react";
import BottomNav from "../components/BottomNav";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-black text-slate-900 mb-2">CareAuto Pro</h1>
      <p className="text-slate-500 mb-8">Gestione flotta e interventi semplificata</p>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <a href="/profilo" className="p-4 bg-white rounded-3xl shadow-sm font-bold">👤 Profilo</a>
        <a href="/notifiche" className="p-4 bg-white rounded-3xl shadow-sm font-bold">🔔 Notifiche</a>
      </div>
      <BottomNav />
    </div>
  );
}