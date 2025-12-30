/**
 * FSRS (Free Spaced Repetition Scheduler) Wrapper
 * Based on Netter's Anatomy Tool Specification Section 7.7
 *
 * This module wraps the ts-fsrs library with custom parameters
 * optimized for medical anatomy learning.
 */

import { fsrs, Rating, Card, FSRS, State } from 'ts-fsrs';

/**
 * FSRS Configuration Parameters
 *
 * These parameters are optimized for anatomy learning:
 * - request_retention: 0.9 (90% retention target - high for medical accuracy)
 * - maximum_interval: 365 days (annual review cycle)
 * - w: FSRS model weights (optimized through research)
 */
const FSRS_CONFIG = {
  request_retention: 0.9, // Target 90% retention rate
  maximum_interval: 365, // Max 1 year between reviews
  // FSRS 4.5 default weights (17 parameters)
  w: [
    0.4, // Initial stability for new cards
    0.6, // Initial difficulty
    2.4, // Stability increase on "Hard"
    5.8, // Stability increase on "Good"
    4.93, // Stability increase on "Easy"
    0.94, // Difficulty decay on correct
    0.86, // Difficulty increase on wrong
    0.01, // Difficulty increase on hard
    1.49, // Retrievability curve parameter
    0.14, // Lapse stability multiplier
    0.94, // Lapse difficulty increase
    2.18, // Review stability increase
    0.05, // Review difficulty decay
    0.34, // Fuzz factor for intervals
    1.26, // Stability threshold parameter
    0.29, // Difficulty threshold parameter
    2.61, // Retrievability threshold parameter
  ],
};

/**
 * Initialize FSRS instance with custom parameters
 */
export const fsrsInstance: FSRS = fsrs(FSRS_CONFIG);

/**
 * Re-export ts-fsrs types for convenience
 * Note: Grade is an alias for Rating for backward compatibility
 */
export { Rating, State } from 'ts-fsrs';
export type { Card, FSRS, RecordLog } from 'ts-fsrs';

// Create Grade alias for better API naming
export const Grade = Rating;

/**
 * Helper function to create a new FSRS card
 * @returns A new card in the "New" state
 */
export function createNewCard(): Card {
  return {
    due: new Date(),
    stability: 0,
    difficulty: 0,
    elapsed_days: 0,
    scheduled_days: 0,
    reps: 0,
    lapses: 0,
    state: State.New,
    last_review: undefined,
  };
}

/**
 * Helper function to validate FSRS card data
 * @param card - Card to validate
 * @returns true if card is valid
 */
export function isValidCard(card: Partial<Card>): card is Card {
  return (
    card.stability !== undefined &&
    card.difficulty !== undefined &&
    card.elapsed_days !== undefined &&
    card.scheduled_days !== undefined &&
    card.reps !== undefined &&
    card.lapses !== undefined &&
    card.state !== undefined &&
    card.due !== undefined
  );
}

/**
 * Get human-readable state name
 * @param state - FSRS card state
 * @returns State name as string
 */
export function getStateName(state: State): string {
  switch (state) {
    case State.New:
      return 'new';
    case State.Learning:
      return 'learning';
    case State.Review:
      return 'review';
    case State.Relearning:
      return 'relearning';
    default:
      return 'unknown';
  }
}

// Export all FSRS modules
export * from './scheduler';
export * from './queue';
export * from './stats';

// Export getForecast from stats module
export { getForecast } from './stats';
