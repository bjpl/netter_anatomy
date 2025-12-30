/**
 * Zustand State Management Stores
 *
 * Centralized state management for Netter's Anatomy Learning Tool.
 * Each store handles a specific domain of the application.
 */

// Explorer mode state
export { useExplorerStore } from './explorerStore';
export type { ExplorerState } from './explorerStore';

// Guided learning state
export { useLearningStore } from './learningStore';
export type { LearningState } from './learningStore';

// Flashcard review state
export { useFlashcardStore } from './flashcardStore';
export type {
  FlashcardState,
  FlashcardRating,
  SessionStats
} from './flashcardStore';

// User preferences and settings
export { useSettingsStore } from './settingsStore';
export type {
  SettingsState,
  Theme,
  TTSSpeed
} from './settingsStore';
