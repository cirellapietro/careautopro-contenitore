'use client';

import { useMemo, type DependencyList } from 'react';

export function useMemoFirebase<T extends object | null>(
  factory: () => T,
  deps: DependencyList | undefined
): T {
  const value = useMemo(factory, deps);

  if (value) {
    Object.defineProperty(value, '__memo', {
      value: true,
      writable: false,
      enumerable: false,
      configurable: true,
    });
  }

  return value;
}
