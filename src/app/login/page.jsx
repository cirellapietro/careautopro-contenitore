"use client";
import React, { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      alert("Errore Login: " + error.message);
    }
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      alert("Errore Google: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <span className="text-5xl mb-2">🚗</span>
          <h1 className="text-2xl font-black text-slate-900">CareAuto Pro</h1>
          <p className="text-slate-500">Accedi al tuo account</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" required />
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" required />
          <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg">Accedi</button>
        </form>

        <div className="mt-6 flex gap-4">
          <button onClick={handleGoogle} className="flex-1 py-3 border border-slate-200 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" /> Google
          </button>
        </div>

        <p className="mt-8 text-center text-slate-500">Non hai un account? <a href="/signup" className="text-blue-600 font-bold">Registrati</a></p>
      </div>
    </div>
  );
}
