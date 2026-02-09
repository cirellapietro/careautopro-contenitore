import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
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
  
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    firebaseAppInstance = initializeApp(firebaseConfig);
    return firebaseAppInstance;
  }

  return null;
}
