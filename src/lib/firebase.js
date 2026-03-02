import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSy...", // La tua chiave API
  authDomain: "careautopro.firebaseapp.com",
  databaseURL: "https://studio-99874364-880bd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "careautopro",
  storageBucket: "careautopro.appspot.com",
  messagingSenderId: "3383936801",
  appId: "1:3383936801:web:..."
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup };
