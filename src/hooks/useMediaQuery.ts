/**
 * useMediaQuery - Responsive breakpoints hook
 * Provides SSR-safe media query matching
 */

import { useState, useEffect } from 'react';

/**
 * Hook for matching media queries
 * @param query - Media query string (e.g., "(min-width: 768px)")
 * @param defaultValue - Default value for SSR (default: false)
 */
export function useMediaQuery(query: string, defaultValue: boolean = false): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    // SSR-safe initialization
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    // SSR-safe check
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event listener
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    // Legacy browsers (fallback)
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [query]);

  return matches;
}

/**
 * Convenience hook for mobile breakpoint
 * Mobile: < 768px
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)', false);
}

/**
 * Convenience hook for tablet breakpoint
 * Tablet: 768px - 1023px
 */
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)', false);
}

/**
 * Convenience hook for desktop breakpoint
 * Desktop: >= 1024px
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)', true);
}

/**
 * Get current breakpoint name
 */
export function useBreakpoint(): 'mobile' | 'tablet' | 'desktop' {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  if (isMobile) return 'mobile';
  if (isTablet) return 'tablet';
  return 'desktop';
}
