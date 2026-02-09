'use client';
import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';

// This configuration is hardcoded to ensure it's always available and correct.
// It bypasses any issues with environment variables.
export const firebaseConfig = {
  apiKey: "AIzaSyC3-uKkTSwd10KzGIl4iJ4R7M-6zT5PuSA",
  authDomain: "careautopro-72a3c.firebaseapp.com",
  projectId: "careautopro-72a3c",
  storageBucket: "careautopro-72a3c.appspot.com",
  messagingSenderId: "305304983220",
  appId: "1:305304983220:web:1e3518335c05c862955f2b",
  measurementId: "G-7Q6H2WKE91"
};

// Caches the Firebase app instance
let firebaseAppInstance: FirebaseApp | null = null;

export const getFirebaseApp = (): FirebaseApp | null => {
  if (firebaseAppInstance) {
    return firebaseAppInstance;
  }

  if (getApps().length > 0) {
    firebaseAppInstance = getApp();
    return firebaseAppInstance;
  }
  
  // The config is now hardcoded, so we can directly initialize.
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    firebaseAppInstance = initializeApp(firebaseConfig);
    return firebaseAppInstance;
  }

  // This should not be reached if the config is correct.
  console.error("Firebase config is missing or invalid.");
  return null;
}
