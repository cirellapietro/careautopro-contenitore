'use client';
import React, { useState } from 'react';

const EditVehicle = ({ vehicleId }: { vehicleId: string }) => {
  const [vehicle, setVehicle] = useState({ brand: '', model: '', plate: '' });

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border">
      <h3 className="text-lg font-bold mb-2">Modifica Veicolo</h3>
      <input 
        className="w-full p-2 mb-2 border rounded uppercase" 
        placeholder="MARCA" 
        value={vehicle.brand}
        onChange={(e) => setVehicle({...vehicle, brand: e.target.value.toUpperCase()})}
      />
      <input 
        className="w-full p-2 mb-2 border rounded uppercase" 
        placeholder="MODELLO" 
        value={vehicle.model}
        onChange={(e) => setVehicle({...vehicle, model: e.target.value.toUpperCase()})}
      />
      <input 
        className="w-full p-2 mb-2 border rounded uppercase" 
        placeholder="TARGA" 
        value={vehicle.plate}
        onChange={(e) => setVehicle({...vehicle, plate: e.target.value.toUpperCase()})}
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Aggiorna Veicolo</button>
    </div>
  );
};
export default EditVehicle;
