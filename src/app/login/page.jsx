"use client";
import React from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <span className="text-5xl mb-2">🚗</span>
          <h1 className="text-2xl font-black text-slate-900">CareAuto Pro</h1>
          <p className="text-slate-500">Accedi per gestire i tuoi veicoli</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" placeholder="mario.rossi@esempio.com" className="w-full p-4 bg-slate-100 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input type="password" placeholder="••••••••" className="w-full p-4 bg-slate-100 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>
          <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 active:scale-95 transition-transform">
            Accedi
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm">Non hai un account? <a href="/signup" className="text-blue-600 font-bold">Registrati</a></p>
        </div>
      </div>
    </div>
  );
}
