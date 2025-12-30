/**
 * useStructure - Single structure data hook
 * Fetches and caches structure data from IndexedDB
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { structureOps, relationshipOps } from '../lib/db/operations';
import type { Structure, Relationship } from '../types';

interface RelatedStructure {
  relationship: Relationship;
  structure: Structure;
}

interface UseStructureReturn {
  structure: Structure | null;
  relatedStructures: RelatedStructure[];
  childStructures: Structure[];
  parentStructure: Structure | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: Structure;
  timestamp: number;
}

const cacheStore = new Map<string, CacheEntry>();

/**
 * Hook for fetching single structure with related data
 * @param structureId - ID of the structure to fetch
 */
export function useStructure(structureId: string | null): UseStructureReturn {
  const [structure, setStructure] = useState<Structure | null>(null);
  const [relatedStructures, setRelatedStructures] = useState<RelatedStructure[]>([]);
  const [childStructures, setChildStructures] = useState<Structure[]>([]);
  const [parentStructure, setParentStructure] = useState<Structure | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Check if cached data is still valid
   */
  const getCachedStructure = useCallback((id: string): Structure | null => {
    const cached = cacheStore.get(id);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;
    if (isExpired) {
      cacheStore.delete(id);
      return null;
    }

    return cached.data;
  }, []);

  /**
   * Cache structure data
   */
  const cacheStructure = useCallback((id: string, data: Structure) => {
    cacheStore.set(id, {
      data,
      timestamp: Date.now(),
    });
  }, []);

  /**
   * Fetch structure and related data
   */
  const fetchStructure = useCallback(async () => {
    if (!structureId) {
      setStructure(null);
      setRelatedStructures([]);
      setChildStructures([]);
      setParentStructure(null);
      return;
    }

    // Abort previous fetch if still running
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setError(null);

    try {
      // Check cache first
      const cached = getCachedStructure(structureId);
      if (cached) {
        setStructure(cached);
      } else {
        // Fetch from database
        const data = await structureOps.getById(structureId);
        if (!data) {
          throw new Error(`Structure not found: ${structureId}`);
        }
        setStructure(data);
        cacheStructure(structureId, data);
      }

      // Fetch related data in parallel
      const [related, children, parent] = await Promise.all([
        relationshipOps.getRelatedStructures(structureId),
        structureOps.getChildren(structureId),
        (async () => {
          const struct = cached || await structureOps.getById(structureId);
          if (struct?.parent_structure_id) {
            return await structureOps.getById(struct.parent_structure_id);
          }
          return null;
        })(),
      ]);

      setRelatedStructures(related);
      setChildStructures(children);
      setParentStructure(parent || null);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        // Fetch was aborted, ignore
        return;
      }
      const error = err instanceof Error ? err : new Error('Failed to fetch structure');
      setError(error);
      console.error('Error fetching structure:', error);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [structureId, getCachedStructure, cacheStructure]);

  /**
   * Refetch structure data (bypasses cache)
   */
  const refetch = useCallback(async () => {
    if (structureId) {
      cacheStore.delete(structureId);
      await fetchStructure();
    }
  }, [structureId, fetchStructure]);

  /**
   * Fetch structure when ID changes
   */
  useEffect(() => {
    fetchStructure();
  }, [fetchStructure]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    structure,
    relatedStructures,
    childStructures,
    parentStructure,
    isLoading,
    error,
    refetch,
  };
}
