/**
 * Central Type Definitions Export
 * Netter's Anatomy Learning Tool
 *
 * This file exports all TypeScript type definitions used throughout the application.
 * Based on Netter's Anatomy Tool Specification Section 11 (Data Models)
 */

// Re-export all anatomy types
export type {
  UUID,
  ImageReference,
  Structure,
  Region,
  System,
  Relationship,
  PhysicalReference,
  ExternalLink,
} from './anatomy';

export {
  StructureType,
  RelationshipType,
  ResourceType,
  SourceType,
} from './anatomy';

// Re-export all learning types
export type {
  Chapter,
  Module,
  ModuleContent,
  FlashCard,
} from './learning';

export {
  ModuleType,
  CardType,
} from './learning';

// Re-export all user types
export type {
  UserProgress,
  CardReviewState,
  StudySession,
} from './user';

export {
  SessionType,
  CardState,
} from './user';

// Re-export all UI types
export type {
  Theme,
  DisplayPreferences,
  AudioPreferences,
  SpacedRepetitionPreferences,
  UserPreferences,
  Toast,
  ModalConfig,
  ViewerControlState,
  PaginationState,
  LoadingState,
  PaginationParams,
  PaginatedResult,
  SearchResult,
} from './ui';

export {
  ViewMode,
  ExplorerView,
  Colors,
  SystemColors,
} from './ui';
