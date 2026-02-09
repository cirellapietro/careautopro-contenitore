'use client';
import React from 'react';
import { firebaseApp } from './config';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <FirebaseProvider firebaseApp={firebaseApp}>
      {children}
    </FirebaseProvider>
  );
}
