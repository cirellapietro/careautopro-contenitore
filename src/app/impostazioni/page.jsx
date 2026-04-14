"use client";
import React from "react";
import BottomNav from "../../components/BottomNav";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24 p-6">
      <h1 className="text-3xl font-black mb-8">Impostazioni</h1>
      <div className="space-y-3">
        {["Notifiche Push", "Privacy", "Lingua", "Supporto"].map(item => (
          <div key={item} className="p-5 bg-white rounded-2xl shadow-sm flex justify-between items-center font-bold text-slate-700">
            {item} <span className="text-slate-300">→</span>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}