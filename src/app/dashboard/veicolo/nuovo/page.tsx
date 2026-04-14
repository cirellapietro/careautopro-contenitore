'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fetchAndPopulateVehicleData } from '@/lib/autoDataFetcher';

export default function NuovoVeicolo() {
  const [marca, setMarca] = useState('');
  const [modello, setModello] = useState('');
  const nomeVeicolo = `${marca} ${modello}`.trim().toUpperCase();

  const handleSalva = async () => {
    if (!marca || !modello) return;
    await fetchAndPopulateVehicleData(marca.toUpperCase(), modello.toUpperCase(), 'standard');
    alert("Dati tecnici recuperati per " + nomeVeicolo);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold italic text-blue-900">Censimento Veicolo</h1>
      <div className="space-y-4">
        <Input 
          placeholder="MARCA (ES. TESLA)" 
          value={marca} 
          className="uppercase"
          onChange={(e) => setMarca(e.target.value.toUpperCase())} 
        />
        <Input 
          placeholder="MODELLO (ES. MODEL 3)" 
          value={modello} 
          className="uppercase"
          onChange={(e) => setModello(e.target.value.toUpperCase())} 
        />
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
          <p className="text-[10px] text-blue-600 font-bold uppercase">Nome Identificativo:</p>
          <p className="text-xl font-black text-blue-900">{nomeVeicolo || "DIGITARE MARCA E MODELLO"}</p>
        </div>
      </div>
      <Button onClick={handleSalva} className="w-full bg-blue-700 h-14 font-bold">Scarica Dati Manutenzione</Button>
    </div>
  );
}
