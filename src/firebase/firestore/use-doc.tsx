'use client';
    
import { useState, useEffect, useRef } from 'react';
import {
  DocumentReference,
  onSnapshot,
  DocumentData,
  FirestoreError,
  DocumentSnapshot,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/** Utility type to add an 'id' field to a given type T. */
type WithId<T> = T & { id: string };

/**
 * Interface for the return value of the useDoc hook.
 * @template T Type of the document data.
 */
export interface UseDocResult<T> {
  data: WithId<T> | null; // Document data with ID, or null.
  isLoading: boolean;       // True if loading.
  error: FirestoreError | Error | null; // Error object, or null.
}

/**
 * React hook to subscribe to a single Firestore document in real-time.
 * Handles nullable references.
 * 
 * IMPORTANT! YOU MUST MEMOIZE the inputted memoizedDocRef or BAD THINGS WILL HAPPEN
 * use useMemoFirebase to memoize it per React guidance.
 *
 *
 * @template T Optional type for document data. Defaults to any.
 * @param {DocumentReference<DocumentData> | null | undefined} memoizedDocRef -
 * The Firestore DocumentReference. Waits if null/undefined.
 * @returns {UseDocResult<T>} Object with data, isLoading, error.
 */
export function useDoc<T = any>(
  memoizedDocRef: DocumentReference<DocumentData> | null | undefined,
): UseDocResult<T> {
  const [data, setData] = useState<WithId<T> | null>(null);
  const [error, setError] = useState<FirestoreError | Error | null>(null);
  
  // isLoading is true only if we have a ref but no data and no error yet.
  const isLoading = !!memoizedDocRef && data === null && error === null;

  // Use a ref to track the path to avoid re-subscribing for the exact same doc.
  const pathRef = useRef<string | null>(null);

  useEffect(() => {
    const newPath = memoizedDocRef?.path || null;

    // If the new path is the same as the one we're already subscribed to, do nothing.
    if (newPath === pathRef.current) {
      return;
    }
    pathRef.current = newPath;

    // If the new path is null, it means we should not be listening.
    // Reset the state completely.
    if (!newPath || !memoizedDocRef) {
      setData(null);
      setError(null);
      return;
    }
    
    // If we have a new, valid path, reset state before subscribing
    setData(null);
    setError(null);

    const unsubscribe = onSnapshot(
      memoizedDocRef,
      (doc: DocumentSnapshot<DocumentData>) => {
        if (doc.exists()) {
          setData({ ...(doc.data() as T), id: doc.id });
        } else {
          // Document does not exist. We are no longer loading, and data is null.
          setData(null);
        }
        setError(null);
      },
      (err: FirestoreError) => {
        const contextualError = new FirestorePermissionError({
          operation: 'get',
          path: memoizedDocRef.path,
        });
        
        setError(contextualError);
        setData(null);
        errorEmitter.emit('permission-error', contextualError);
      }
    );

    return () => unsubscribe();
    // The dependency is the memoized reference object itself. This is crucial.
  }, [memoizedDocRef]);

  return { data, isLoading, error };
}
