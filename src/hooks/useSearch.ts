/**
 * useSearch - Global search functionality hook
 * Provides debounced search across structures, regions, and systems
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { searchOps } from '../lib/db/operations';
import type { SearchResult } from '../types';
import { useLocalStorage } from './useLocalStorage';

interface UseSearchOptions {
  debounceMs?: number;
  maxRecentSearches?: number;
}

interface UseSearchReturn {
  query: string;
  results: SearchResult | null;
  isSearching: boolean;
  recentSearches: string[];
  search: (newQuery: string) => void;
  clearResults: () => void;
  clearRecentSearches: () => void;
}

/**
 * Hook for global search functionality
 * @param initialQuery - Initial search query
 * @param options - Search configuration options
 */
export function useSearch(
  initialQuery: string = '',
  options: UseSearchOptions = {}
): UseSearchReturn {
  const { debounceMs = 300, maxRecentSearches = 10 } = options;

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(
    'netter-recent-searches',
    []
  );

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Execute search query
   */
  const executeSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(null);
      setIsSearching(false);
      return;
    }

    // Abort previous search if still running
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsSearching(true);

    try {
      const searchResults = await searchOps.search(searchQuery);
      setResults(searchResults);

      // Add to recent searches if not already present
      setRecentSearches((prev) => {
        const filtered = prev.filter((s) => s !== searchQuery);
        const updated = [searchQuery, ...filtered].slice(0, maxRecentSearches);
        return updated;
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // Search was aborted, ignore
        return;
      }
      console.error('Search error:', error);
      setResults(null);
    } finally {
      setIsSearching(false);
      abortControllerRef.current = null;
    }
  }, [maxRecentSearches, setRecentSearches]);

  /**
   * Debounced search handler
   */
  const search = useCallback((newQuery: string) => {
    setQuery(newQuery);

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer
    debounceTimer.current = setTimeout(() => {
      executeSearch(newQuery);
    }, debounceMs);
  }, [debounceMs, executeSearch]);

  /**
   * Clear search results
   */
  const clearResults = useCallback(() => {
    setQuery('');
    setResults(null);
    setIsSearching(false);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  /**
   * Clear recent searches
   */
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, [setRecentSearches]);

  /**
   * Execute initial search if provided
   */
  useEffect(() => {
    if (initialQuery) {
      executeSearch(initialQuery);
    }
  }, []); // Only run on mount

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    query,
    results,
    isSearching,
    recentSearches,
    search,
    clearResults,
    clearRecentSearches,
  };
}
