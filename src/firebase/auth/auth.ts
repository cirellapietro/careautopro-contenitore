'use client';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, Firestore, getDoc, updateDoc } from 'firebase/firestore';
import { getFirebaseApp } from '../config';

let auth: Auth;
let db: Firestore;

function getFirebaseAuth() {
  if (auth) return auth;
  const app = getFirebaseApp();
  auth = getAuth(app);
  return auth;
}

function getFirebaseDb() {
  if (db) return db;
  const app = getFirebaseApp();
  db = getFirestore(app);
  return db;
}

const googleProvider = new GoogleAuthProvider();

async function createUserDocument(uid: string, email: string | null, displayName: string | null, photoURL: string | null) {
  const firestore = getFirebaseDb();
  const userRef = doc(firestore, 'users', uid);

  const userRole = email === 'cirellapietro@gmail.com' ? 'Amministratore' : 'Utente';

  const userData = {
    id: uid,
    email: email,
    displayName: displayName,
    photoURL: photoURL,
    role: userRole,
    notificationChannels: ['app', 'email'],
    notificationReminderTime: 3, // days
  };
  await setDoc(userRef, userData, { merge: true });
}

export async function signInWithEmail(email: string, password: string): Promise<void> {
  const authInstance = getFirebaseAuth();
  const userCredential = await signInWithEmailAndPassword(authInstance, email, password);

  // After successful sign-in, ensure the user document exists and the role is correct.
  if (userCredential.user && email === 'cirellapietro@gmail.com') {
    const firestore = getFirebaseDb();
    const userRef = doc(firestore, 'users', userCredential.user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // If doc exists, and role is not admin, update it.
      if (userDoc.data().role !== 'Amministratore') {
        await updateDoc(userRef, { role: 'Amministratore' });
      }
    } else {
      // If doc does not exist, create it.
      // This handles cases where auth user exists but Firestore doc creation failed.
      await createUserDocument(userCredential.user.uid, userCredential.user.email, userCredential.user.displayName, userCredential.user.photoURL);
    }
  }
}

export async function signUpWithEmail(email: string, password: string, displayName: string): Promise<void> {
  const authInstance = getFirebaseAuth();
  const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
  const user = userCredential.user;
  await updateProfile(user, { displayName });
  await createUserDocument(user.uid, user.email, displayName, user.photoURL);
}

export async function signInWithGoogle(): Promise<void> {
  const authInstance = getFirebaseAuth();
  const result = await signInWithPopup(authInstance, googleProvider);
  const user = result.user;
  
  const firestore = getFirebaseDb();
  const userRef = doc(firestore, 'users', user.uid);
  const docSnap = await getDoc(userRef);
  
  if (!docSnap.exists()) {
    // New user via Google: createUserDocument will set the role correctly based on email.
    await createUserDocument(user.uid, user.email, user.displayName, user.photoURL);
  } else {
    // Existing user: explicitly check and set admin role if needed.
    if (user.email === 'cirellapietro@gmail.com' && docSnap.data().role !== 'Amministratore') {
        await updateDoc(userRef, { role: 'Amministratore' });
    }
  }
}

export async function signOut(): Promise<void> {
  const authInstance = getFirebaseAuth();
  await firebaseSignOut(authInstance);
}
