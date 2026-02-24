'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Query,
  onSnapshot,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  CollectionReference,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/** Utility type to add an 'id' field to a given type T. */
export type WithId<T> = T & { id: string };

/**
 * Interface for the return value of the useCollection hook.
 * @template T Type of the document data.
 */
export interface UseCollectionResult<T> {
  data: WithId<T>[] | null; // Document data with ID, or null.
  isLoading: boolean;       // True if loading.
  error: FirestoreError | Error | null; // Error object, or null.
}

// Internal type to access private properties for creating a stable key.
export interface InternalQuery extends Query<DocumentData> {
  _query: {
    path: {
      canonicalString(): string;
    }
  }
}

/**
 * React hook to subscribe to a Firestore collection or query in real-time.
 * It remains in a loading state until the query is provided and the data is fetched.
 *
 * IMPORTANT! The inputted query MUST be memoized (e.g., with useMemo) to prevent infinite loops.
 * 
 * @template T Optional type for document data. Defaults to any.
 * @param {CollectionReference<DocumentData> | Query<DocumentData> | null | undefined} query -
 * The memoized Firestore CollectionReference or Query. The hook will wait if this is null/undefined.
 * @returns {UseCollectionResult<T>} Object with data, isLoading, and error.
 */
export function useCollection<T = any>(
    query: CollectionReference<DocumentData> | Query<DocumentData> | null | undefined,
): UseCollectionResult<T> {
  const [state, setState] = useState<UseCollectionResult<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const queryKeyRef = useRef<string | null>(null);
  
  useEffect(() => {
    const newQueryKey = query ? (query as unknown as InternalQuery)._query.path.canonicalString() : null;

    // If the query is not provided, we should remain in a loading state.
    if (!query || !newQueryKey) {
        if (queryKeyRef.current !== null) { // It was previously set
            setState({ data: null, isLoading: true, error: null });
            queryKeyRef.current = null;
        }
        return;
    }

    // If the query key has not changed, no need to re-subscribe.
    if (newQueryKey === queryKeyRef.current) {
        return;
    }

    queryKeyRef.current = newQueryKey;
    
    // A new query has been provided. Start loading.
    setState({ data: null, isLoading: true, error: null });

    const unsubscribe = onSnapshot(
      query,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        // Check if we are still subscribed to the same query before updating state
        if (queryKeyRef.current === newQueryKey) {
          const results: WithId<T>[] = querySnapshot.docs.map(doc => ({ ...(doc.data() as T), id: doc.id }));
          
          setState(prevState => {
              if (JSON.stringify(prevState.data) === JSON.stringify(results) && !prevState.isLoading) {
                  return prevState;
              }
              return { data: results, isLoading: false, error: null };
          });
        }
      },
      (err: FirestoreError) => {
        const path: string = (query as unknown as InternalQuery)._query.path.canonicalString();

        const contextualError = new FirestorePermissionError({
          operation: 'list',
          path,
        });
        
        // Check if we are still subscribed to the same query before updating state
        if (queryKeyRef.current === newQueryKey) {
          setState({ data: null, isLoading: false, error: contextualError });
          errorEmitter.emit('permission-error', contextualError);
        }
      }
    );

    return () => unsubscribe();
  }, [query]); // Dependency is the memoized query object itself.

  return state;
}
