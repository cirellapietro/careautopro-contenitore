'use client';
import { useState, useEffect } from 'react';
import { useFirebase } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function DebugPage() {
  const { firestore: db } = useFirebase();
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    if (!db) return;

    const checkDB = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'config_controlli_periodici'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLogs(data);
      } catch (e) {
        console.error("ERRORE PAGINA DEBUG:", e);
      }
    };
    checkDB();
  }, [db]);

  return (
    <div className="p-6 font-mono text-xs">
      <h1 className="text-xl font-bold mb-4 uppercase">LOG DATI TECNICI (MARCA-MODELLO)</h1>
      {logs.length === 0 ? (
        <div className="p-4 bg-muted rounded border border-dashed text-center">
            <p className="uppercase font-bold text-muted-foreground">Nessun dato trovato nelle configurazioni periodiche.</p>
        </div>
      ) : (
        <div className="space-y-2">
            {logs.map(log => (
              <pre key={log.id} className="bg-slate-100 dark:bg-slate-900 p-2 border rounded overflow-x-auto">
                {JSON.stringify(log, null, 2)}
              </pre>
            ))}
        </div>
      )}
    </div>
  );
}
