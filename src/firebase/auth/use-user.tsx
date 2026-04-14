'use client';

import { useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { FirebaseContext } from '../provider';
import type { User } from '@/lib/types';
import { FirestorePermissionError, errorEmitter } from '@/firebase';

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
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            
            // If the user is blocked (dataoraelimina is set), force logout
            if (userData.dataoraelimina != null) {
              signOut(auth);
              setUser(null);
              setLoading(false);
              return;
            }

            const newUser: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || userData.displayName || '',
              photoURL: firebaseUser.photoURL || userData.photoURL || null,
              role: userData.role || 'Amministratore Veicoli',
              notificationChannels: userData.notificationChannels || ['app', 'email'],
              notificationReminderTime: userData.notificationReminderTime || 3,
              phoneNumber: userData.phoneNumber || '',
              licenseExpirationDate: userData.licenseExpirationDate || '',
            };
            setUser(newUser);
          } else {
            // Document doesn't exist yet, use auth data as a fallback.
            // This can happen if user document creation is delayed.
            const newUser: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || '',
              photoURL: firebaseUser.photoURL,
              // Default app-specific values
              role: 'Utente', 
              notificationChannels: ['app', 'email'],
              notificationReminderTime: 3,
              phoneNumber: '',
              licenseExpirationDate: '',
            };
            setUser(newUser);
          }
          setLoading(false);
        }, (error) => {
          // If the error is due to missing permissions (e.g., during login), don't block everything.
          if (error.code === 'permission-denied') {
            console.warn("User document access pending permissions...");
            // As a fallback, create a user object with auth data only.
            const newUser: User = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName || '',
                photoURL: firebaseUser.photoURL,
                role: 'Utente',
                notificationChannels: ['app', 'email'],
                notificationReminderTime: 3,
                phoneNumber: '',
                licenseExpirationDate: '',
            };
            setUser(newUser);
          } else {
            const permissionError = new FirestorePermissionError({
              path: userDocRef.path,
              operation: 'get',
              requestResourceData: { context: `Listening to user document for auth state changes.` }
            });
            errorEmitter.emit('permission-error', permissionError);
            setUser(null);
          }
          setLoading(false);
        });
      } else {
        // User is signed out
        setUser(null);
        setLoading(false);
      }
    });

    // Cleanup function
    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) {
        unsubscribeDoc();
      }
    };
  }, [firebaseApp]);

  return { user, loading };
}
