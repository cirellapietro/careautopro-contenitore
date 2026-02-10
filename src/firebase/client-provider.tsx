'use client';

import React, { useMemo, type ReactNode, useEffect } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';
import { seedGlobalData } from '@/lib/seed';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    try {
      return initializeFirebase();
    } catch (e) {
      console.error("Failed to initialize Firebase", e);
      return { firebaseApp: null, auth: null, firestore: null };
    }
  }, []);

  // Effect to seed global data on startup if it doesn't exist
  useEffect(() => {
    if (firebaseServices.firestore) {
      seedGlobalData(firebaseServices.firestore).catch(console.error);
    }
  }, [firebaseServices.firestore]);

  if (!firebaseServices.firebaseApp || !firebaseServices.auth || !firebaseServices.firestore) {
    return <>{children}</>;
  }

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
