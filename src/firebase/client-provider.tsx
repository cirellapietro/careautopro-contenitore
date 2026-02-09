'use client';
import React from 'react';
import { FirebaseProvider } from './provider';
import { getFirebaseApp } from './config';
import type { FirebaseApp } from 'firebase/app';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // getFirebaseApp is now lazy and caches the app instance.
  // It will return null if the config is not valid, preventing a crash.
  const app = getFirebaseApp();
  
  return (
    <FirebaseProvider firebaseApp={app}>
      {children}
    </FirebaseProvider>
  );
}
