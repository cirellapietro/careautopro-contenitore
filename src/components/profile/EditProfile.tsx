'use client';
import React, { useState } from 'react';

const EditProfile = () => {
  const [userData, setUserData] = useState({ name: '', email: '' });

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border mb-4">
      <h3 className="text-lg font-bold mb-2">I Miei Dati</h3>
      <input 
        className="w-full p-2 mb-2 border rounded uppercase" 
        placeholder="IL TUO NOME..." 
        value={userData.name}
        onChange={(e) => setUserData({...userData, name: e.target.value.toUpperCase()})}
      />
      <input 
        className="w-full p-2 mb-2 border rounded" 
        placeholder="Email" 
        value={userData.email}
        readOnly
        disabled
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Salva Profilo</button>
    </div>
  );
};
export default EditProfile;
