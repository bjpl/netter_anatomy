/**
 * User Data Type Definitions
 * Based on Netter's Anatomy Tool Specification Section 11.3
 */

import type { UUID } from './anatomy';

/**
 * Study session types
 */
export enum SessionType {
  /** Interactive explorer mode */
  EXPLORER = 'explorer',
  /** Guided learning module */
  GUIDED_MODULE = 'guided_module',
  /** Flashcard review session */
  FLASHCARD_REVIEW = 'flashcard_review',
}

/**
 * FSRS card states
 * Based on FSRS 4.5 algorithm
 */
export enum CardState {
  /** New card not yet reviewed */
  NEW = 'new',
  /** Card in learning phase */
  LEARNING = 'learning',
  /** Card in review phase */
  REVIEW = 'review',
  /** Card being relearned after lapse */
  RELEARNING = 'relearning',
}

/**
 * User progress tracking
 * Stores overall learning progress and completion state
 */
export interface UserProgress {
  /** Unique identifier */
  id: UUID;

  /** User identifier (local storage ID) */
  user_id: string;

  /** Structures viewed in Explorer mode */
  structures_viewed: UUID[];

  /** Bookmarked structures */
  structures_bookmarked: UUID[];

  /** Chapters started with timestamps */
  chapters_started: Record<UUID, Date>;

  /** Modules completed with completion data */
  modules_completed: Record<UUID, {
    completed_at: Date;
    score: number | null;
  }>;

  /** Assessments completed with scores */
  assessments_completed: Record<UUID, {
    completed_at: Date;
    score: number;
    attempts: number;
  }>;

  /** Total study time in seconds */
  total_study_time_seconds: number;

  /** Current consecutive day streak */
  current_streak_days: number;

  /** Longest consecutive day streak achieved */
  longest_streak_days: number;

  /** Last activity timestamp */
  last_activity_at: Date;
}

/**
 * Flashcard review state using FSRS algorithm
 * Tracks spaced repetition scheduling parameters
 */
export interface CardReviewState {
  /** Unique identifier */
  id: UUID;

  /** User identifier */
  user_id: string;

  /** Associated flashcard */
  card_id: UUID;

  /** When the card is due for review */
  due: Date;

  /** FSRS stability parameter */
  stability: number;

  /** FSRS difficulty parameter */
  difficulty: number;

  /** Days elapsed since last review */
  elapsed_days: number;

  /** Days until next scheduled review */
  scheduled_days: number;

  /** Number of repetitions */
  reps: number;

  /** Number of times card was forgotten */
  lapses: number;

  /** Current state in FSRS algorithm */
  state: CardState;

  /** Last review timestamp */
  last_review: Date | null;

  /** Ease factor (SuperMemo-style) */
  ease_factor: number;

  /** Current interval in days */
  interval: number;

  /** Total number of reviews */
  total_reviews: number;

  /** Total number of correct answers */
  total_correct: number;
}

/**
 * Study session tracking
 * Records individual study sessions for analytics
 */
export interface StudySession {
  /** Unique identifier */
  id: UUID;

  /** User identifier */
  user_id: string;

  /** Type of study session */
  session_type: SessionType;

  /** Session start time */
  started_at: Date;

  /** Session end time (null if ongoing) */
  ended_at: Date | null;

  /** Total duration in seconds */
  duration_seconds: number;

  /** Structures viewed (explorer sessions only) */
  structures_viewed: UUID[] | null;

  /** Module completed (guided module sessions only) */
  module_id: UUID | null;

  /** Cards reviewed (flashcard sessions only) */
  cards_reviewed: number | null;

  /** Cards answered correctly (flashcard sessions only) */
  cards_correct: number | null;
}
