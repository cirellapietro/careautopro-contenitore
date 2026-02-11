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
      if (unsubscribeDoc) {
        unsubscribeDoc();
      }

      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        
        unsubscribeDoc = onSnapshot(userDocRef, (userDocSnap) => {
          let newUser: User;
          if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              // Combine auth data and firestore data
              newUser = {
                  // From Auth
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  displayName: firebaseUser.displayName,
                  photoURL: firebaseUser.photoURL,
                  // From Firestore
                  role: userData.role || 'Utente',
                  notificationChannels: userData.notificationChannels || ['app', 'email'],
                  notificationReminderTime: userData.notificationReminderTime || 3,
              };
          } else {
            // This can happen if the user document creation is delayed or failed.
            // Create a user object from auth details with default app-specific values.
            newUser = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                role: 'Utente',
                notificationChannels: ['app', 'email'],
                notificationReminderTime: 3,
            };
          }
          
          setUser(newUser);
          setLoading(false);
        }, (error) => {
            console.error("Error fetching user document:", error);
            setUser(null);
            setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
        unsubscribeAuth();
        if (unsubscribeDoc) {
          unsubscribeDoc();
        }
    };
  }, [firebaseApp]);

  return { user, loading };
}
