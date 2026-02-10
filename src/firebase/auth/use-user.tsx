'use client';
import { useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { FirebaseContext } from '../provider';
import type { User } from '@/lib/types';

interface UseUserHook {
  user: User | null;
  loading: boolean;
}

export function useUser(): UseUserHook {
  const context = useContext(FirebaseContext);
  const firebaseApp = context?.firebaseApp;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseApp) {
      setLoading(false);
      return;
    }
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    let unsubscribeDoc: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      // Clean up previous doc listener if user changes
      if (unsubscribeDoc) unsubscribeDoc();

      if (firebaseUser) {
        setLoading(true);
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        
        unsubscribeDoc = onSnapshot(userDocRef, (userDocSnap) => {
          if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              setUser({
                  uid: firebaseUser.uid,
                  email: userData.email || firebaseUser.email,
                  displayName: userData.displayName || firebaseUser.displayName,
                  photoURL: userData.photoURL || firebaseUser.photoURL,
                  role: userData.role || 'Utente',
                  notificationChannels: userData.notificationChannels || ['app', 'email'],
                  notificationReminderTime: userData.notificationReminderTime || 3,
              });
          } else {
            // This case can happen if the user document creation failed after signup.
            // We still create a user object from the auth details with defaults.
            setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                role: 'Utente',
                notificationChannels: ['app', 'email'],
                notificationReminderTime: 3,
            });
          }
          setLoading(false);
        }, (error) => {
            console.error("Error fetching user document:", error);
            setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
        unsubscribeAuth();
        if (unsubscribeDoc) unsubscribeDoc();
    };
  }, [firebaseApp]);

  return { user, loading };
}
