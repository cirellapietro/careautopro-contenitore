"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import BottomNav from '../../components/BottomNav';

export default function NotifichePage() {
  const [avvisi, setAvvisi] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        supabase.from('avviso_notifiche').select('*').eq('utente_id', data.user.id).order('data_ora', { ascending: false })
          .then(({ data: logs }) => setAvvisi(logs || []));
      }
    });
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
      <BottomNav utenteId={user?.id} />
    </div>
  );
}
