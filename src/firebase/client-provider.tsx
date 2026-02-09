'use client';
import React, { useState, useEffect } from 'react';
import { FirebaseProvider } from './provider';
import { getFirebaseApp } from './config';
import type { FirebaseApp } from 'firebase/app';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [app, setApp] = useState<FirebaseApp | null>(null);

  useEffect(() => {
    try {
      setApp(getFirebaseApp());
    } catch (e) {
      console.error("Firebase initialization failed:", e);
    }
  }, []);
  
  return (
    <FirebaseProvider firebaseApp={app}>
      {children}
    </FirebaseProvider>
  );
}
