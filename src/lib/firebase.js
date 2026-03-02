import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSy...", // Assicurati che questa sia la tua chiave reale
  authDomain: "careautopro.firebaseapp.com",
  databaseURL: "https://careautopro-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "careautopro",
  storageBucket: "careautopro.appspot.com",
  messagingSenderId: "3383936801",
  appId: "1:3383936801:web:..."
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
