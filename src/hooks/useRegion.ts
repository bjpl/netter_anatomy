/**
 * useRegion - Region data with structures hook
 * Fetches region metadata and associated structures
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { regionOps, structureOps } from '../lib/db/operations';
import type { Region, Structure } from '../types';

interface UseRegionReturn {
  region: Region | null;
  structures: Structure[];
  isLoading: boolean;
  error: Error | null;
  structureCount: number;
  filterBySystem: (systemId: string | null) => void;
}

/**
 * Hook for fetching region data with associated structures
 * @param regionSlug - URL slug of the region
 */
export function useRegion(regionSlug: string | null): UseRegionReturn {
  const [region, setRegion] = useState<Region | null>(null);
  const [structures, setStructures] = useState<Structure[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [systemFilter, setSystemFilter] = useState<string | null>(null);

  /**
   * Fetch region and structures
   */
  const fetchRegion = useCallback(async () => {
    if (!regionSlug) {
      setRegion(null);
      setStructures([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch region by slug
      const regionData = await regionOps.getBySlug(regionSlug);
      if (!regionData) {
        throw new Error(`Region not found: ${regionSlug}`);
      }

      setRegion(regionData);

      // Fetch all structures for this region
      const regionStructures = await structureOps.getByRegion(regionData.id);
      setStructures(regionStructures);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch region');
      setError(error);
      console.error('Error fetching region:', error);
    } finally {
      setIsLoading(false);
    }
  }, [regionSlug]);

  /**
   * Filter structures by system
   */
  const filterBySystem = useCallback((systemId: string | null) => {
    setSystemFilter(systemId);
  }, []);

  /**
   * Filtered structures based on system filter
   */
  const filteredStructures = useMemo(() => {
    if (!systemFilter) {
      return structures;
    }

    return structures.filter((structure) =>
      structure.system_ids.includes(systemFilter)
    );
  }, [structures, systemFilter]);

  /**
   * Structure count
   */
  const structureCount = useMemo(() => {
    return filteredStructures.length;
  }, [filteredStructures]);

  /**
   * Fetch region when slug changes
   */
  useEffect(() => {
    fetchRegion();
  }, [fetchRegion]);

  /**
   * Reset system filter when region changes
   */
  useEffect(() => {
    setSystemFilter(null);
  }, [regionSlug]);

  return {
    region,
    structures: filteredStructures,
    isLoading,
    error,
    structureCount,
    filterBySystem,
  };
}
