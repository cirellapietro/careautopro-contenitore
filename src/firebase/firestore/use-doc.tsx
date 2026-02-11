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
 * It remains in a loading state until the document reference is provided and the data is fetched.
 *
 * IMPORTANT! The inputted docRef MUST be memoized (e.g., with useMemo) to prevent infinite loops.
 *
 * @template T Optional type for document data. Defaults to any.
 * @param {DocumentReference<DocumentData> | null | undefined} docRef -
 * The memoized Firestore DocumentReference. The hook will wait if this is null/undefined.
 * @returns {UseDocResult<T>} Object with data, isLoading, and error.
 */
export function useDoc<T = any>(
  docRef: DocumentReference<DocumentData> | null | undefined,
): UseDocResult<T> {
  const [state, setState] = useState<UseDocResult<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const pathRef = useRef<string | null>(null);

  useEffect(() => {
    const newPath = docRef?.path || null;

    // If the reference is not provided, we should remain in a loading state.
    // If the reference was previously available and now is not, reset to loading.
    if (!docRef || !newPath) {
      if (pathRef.current !== null) { // It was previously set
        setState({ data: null, isLoading: true, error: null });
        pathRef.current = null;
      }
      return;
    }

    // If the path has not changed, no need to re-subscribe.
    if (newPath === pathRef.current) {
      return;
    }
    
    pathRef.current = newPath;
    
    // A new document reference has been provided. Start loading.
    setState({ data: null, isLoading: true, error: null });

    const unsubscribe = onSnapshot(
      docRef,
      (docSnapshot: DocumentSnapshot<DocumentData>) => {
        // Check if we are still subscribed to the same path before updating state
        if (pathRef.current === newPath) {
          const docData = docSnapshot.exists() ? { ...(docSnapshot.data() as T), id: docSnapshot.id } : null;
          setState({ data: docData, isLoading: false, error: null });
        }
      },
      (err: FirestoreError) => {
        const contextualError = new FirestorePermissionError({
          operation: 'get',
          path: docRef.path,
        });
        
        // Check if we are still subscribed to the same path before updating state
        if (pathRef.current === newPath) {
          setState({ data: null, isLoading: false, error: contextualError });
          errorEmitter.emit('permission-error', contextualError);
        }
      }
    );

    return () => unsubscribe();
  }, [docRef]); // Dependency is the memoized reference object itself.

  return state;
}
