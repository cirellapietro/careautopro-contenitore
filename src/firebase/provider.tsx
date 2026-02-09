'use client';
import React from 'react';
import type { FirebaseApp } from 'firebase/app';

interface FirebaseContextValue {
  firebaseApp: FirebaseApp;
}

export const FirebaseContext = React.createContext<FirebaseContextValue | null>(
  null
);

export function FirebaseProvider({
  children,
  firebaseApp,
}: {
  children: React.ReactNode;
  firebaseApp: FirebaseApp;
}) {
  return (
    <FirebaseContext.Provider value={{ firebaseApp }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  const context = React.useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
