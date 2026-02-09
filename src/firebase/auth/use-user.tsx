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
            // This case can happen if the user document creation failed after signup.
            // We still create a user object from the auth details.
            setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                role: 'Utente', 
            });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firebaseApp]);

  return { user, loading };
}
