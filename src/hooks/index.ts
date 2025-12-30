/**
 * Custom React Hooks - Netter's Anatomy Tool
 * Central export file for all custom hooks
 */

// Search functionality
export { useSearch } from './useSearch';
export type { SearchResult } from '../types';

// Structure data
export { useStructure } from './useStructure';

// Region data
export { useRegion } from './useRegion';

// Local storage
export { useLocalStorage } from './useLocalStorage';

// Media queries and responsive design
export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useBreakpoint,
} from './useMediaQuery';

// Keyboard shortcuts
export {
  useKeyboardShortcuts,
  createShortcut,
} from './useKeyboardShortcuts';
export type { KeyboardShortcut, ShortcutMap } from './useKeyboardShortcuts';

// User progress tracking
export { useProgress } from './useProgress';

// Flashcards (existing)
export { useFlashcards } from './useFlashcards';

// Text-to-speech (existing)
export { useTTS } from './useTTS';
