'use client';
import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';

// This configuration is hardcoded to ensure it's always available and correct.
// It bypasses any issues with environment variables.
export const firebaseConfig = {
  "projectId": "studio-99874364-880bd",
  "appId": "1:705618426785:web:ceb3019bef1327ec8f29e0",
  "apiKey": "AIzaSyA8EwPnJ98V4C6d71b5faUjjDtc_dBJoQA",
  "authDomain": "studio-99874364-880bd.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "705618426785"
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
