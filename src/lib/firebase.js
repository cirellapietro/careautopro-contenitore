import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSy...", // Qui dovrebbero esserci le tue chiavi
  authDomain: "careautopro.firebaseapp.com",
  databaseURL: "https://careautopro-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "careautopro",
  storageBucket: "careautopro.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

// Inizializzazione sicura: evita di inizializzare l'app più volte
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
