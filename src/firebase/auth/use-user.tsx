'use client';
import { useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { FirebaseContext } from '../provider';
import type { User } from '@/lib/types';

interface UseUserHook {
  user: User | null;
  loading: boolean;
}

export function useUser(): UseUserHook {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useUser must be used within a FirebaseProvider');
  }
  const { firebaseApp } = context;
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUser({
                uid: firebaseUser.uid,
                email: userData.email || firebaseUser.email,
                displayName: userData.displayName || firebaseUser.displayName,
                photoURL: userData.photoURL || firebaseUser.photoURL,
                role: userData.role || 'Utente',
            });
        } else {
            // This might happen if user signed up but doc creation failed, or for older users.
            setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                role: 'Utente', // Default role
            });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db]);

  return { user, loading };
}
