import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

const BottomNav = ({ utenteId }) => {
  const [hasUrgent, setHasUrgent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUrgent = async () => {
      const { data } = await supabase
        .from('avviso_notifiche')
        .select('stato')
        .eq('utente_id', utenteId)
        .eq('stato', 'URGENTE');
      
      setHasUrgent(data && data.length > 0);
    };

    checkUrgent();
    const channel = supabase.channel('notifiche_alert')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'avviso_notifiche' }, checkUrgent)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [utenteId]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-between items-center z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {/* Tasto Indietro */}
      <button onClick={() => navigate(-1)} className="flex flex-col items-center text-gray-500 active:scale-90 transition-transform">
        <span className="text-xl">⬅️</span>
        <span className="text-[10px] font-medium">Indietro</span>
      </button>

      {/* Home */}
      <Link to="/" className="flex flex-col items-center text-gray-500">
        <span className="text-xl">🏠</span>
        <span className="text-[10px] font-medium">Home</span>
      </Link>

      {/* Notifiche con Badge */}
      <Link to="/notifiche" className="relative flex flex-col items-center text-gray-500">
        <span className="text-xl">🔔</span>
        <span className="text-[10px] font-medium">Avvisi</span>
        {hasUrgent && (
          <span className="absolute top-0 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 border border-white"></span>
          </span>
        )}
      </Link>

      {/* Profilo */}
      <Link to="/profilo" className="flex flex-col items-center text-gray-500">
        <span className="text-xl">👤</span>
        <span className="text-[10px] font-medium">Profilo</span>
      </Link>

      {/* Tasto Esci */}
      <button onClick={handleLogout} className="flex flex-col items-center text-red-400 active:scale-90 transition-transform">
        <span className="text-xl">🚪</span>
        <span className="text-[10px] font-medium">Esci</span>
      </button>
    </nav>
  );
};

export default BottomNav;
