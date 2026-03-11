"use client";
import React, { useState } from "react";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Crea il profilo nel Database con ruolo di default (non admin)
      await set(ref(db, 'users/' + userCredential.user.uid), {
        email: email,
        roleId: "user_standard", // Qui si collegherà alla tua collection ruoli
        gpsActive: false
      });
      router.push("/");
    } catch (error) {
      alert("Errore Registrazione: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-2xl font-black mb-6">Crea Account</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className="w-full p-4 bg-slate-100 rounded-2xl outline-none" required />
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="w-full p-4 bg-slate-100 rounded-2xl outline-none" required />
          <button type="submit" className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg">Registrati</button>
        </form>
        <a href="/login" className="block mt-6 text-slate-500">Hai già un account? Accedi</a>
      </div>
    </div>
  );
}
