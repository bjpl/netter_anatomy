/**
 * FSRS Card Scheduling Module
 * Based on Netter's Anatomy Tool Specification Section 7.7
 *
 * Handles card scheduling logic, interval calculations,
 * and retention predictions.
 */

import { Card, Rating, State, RecordLog } from 'ts-fsrs';
import { fsrsInstance } from './index';
import { CardState, type CardReviewState } from '../../types/user';
import type { UUID } from '../../types/anatomy';

/**
 * Card schedule information
 */
export interface CardSchedule {
  /** Card identifier */
  cardId: string;
  /** Next review date */
  due: Date;
  /** FSRS stability parameter */
  stability: number;
  /** FSRS difficulty parameter */
  difficulty: number;
  /** Current card state */
  state: 'new' | 'learning' | 'review' | 'relearning';
  /** Days until next review */
  interval: number;
  /** Number of repetitions */
  reps: number;
  /** Number of lapses */
  lapses: number;
}

/**
 * Review result with updated card state
 */
export interface ReviewResult {
  /** Updated FSRS card */
  card: Card;
  /** Review log entry */
  log: RecordLog;
  /** Next review date */
  nextReview: Date;
}

/**
 * Schedule a card based on review rating
 *
 * @param card - Current FSRS card state
 * @param rating - Review rating (Again, Hard, Good, Easy)
 * @param reviewDate - Date of the review (defaults to now)
 * @returns Card schedule with updated parameters
 */
export function scheduleCard(
  card: Card,
  rating: Rating,
  reviewDate: Date = new Date()
): CardSchedule {
  // Get scheduling info from FSRS
  const schedulingCards = fsrsInstance.repeat(card, reviewDate);

  // Select the card based on rating
  let updatedCard: Card;
  switch (rating) {
    case Rating.Again:
      updatedCard = schedulingCards[Rating.Again].card;
      break;
    case Rating.Hard:
      updatedCard = schedulingCards[Rating.Hard].card;
      break;
    case Rating.Good:
      updatedCard = schedulingCards[Rating.Good].card;
      break;
    case Rating.Easy:
      updatedCard = schedulingCards[Rating.Easy].card;
      break;
    default:
      throw new Error(`Invalid rating: ${rating}`);
  }

  return cardToSchedule('', updatedCard);
}

/**
 * Get next review date for a card
 *
 * @param card - Current FSRS card state
 * @param rating - Expected rating for scheduling
 * @returns Next review date
 */
export function getNextReview(card: Card, rating: Rating): Date {
  const schedule = scheduleCard(card, rating);
  return schedule.due;
}

/**
 * Calculate current retention rate for a card
 *
 * @param card - FSRS card state
 * @param now - Current date (defaults to now)
 * @returns Retention probability (0-1)
 */
export function calculateRetention(card: Card, now: Date = new Date()): number {
  // FSRS retrievability formula: R = (1 + DECAY * t / S) ^ FACTOR
  // Simplified to: R = 0.9 ^ (t / S)
  // Where t = time elapsed since last review, S = stability
  if (card.state === State.New) {
    return 1.0; // New cards haven't been studied yet
  }

  const timeSinceDue = (now.getTime() - card.due.getTime()) / (1000 * 60 * 60 * 24);
  const t = Math.max(0, card.elapsed_days + timeSinceDue);
  const S = card.stability;

  if (S === 0 || S < 0.1) {
    return 0.0; // Very unstable cards have near-zero retention
  }

  // FSRS retrievability formula: R = 0.9^(t/S)
  // This gives decay where R approaches 0 as t increases relative to S
  const retrievability = Math.pow(0.9, t / S);
  return Math.max(0, Math.min(1, retrievability));
}

/**
 * Get all possible scheduling outcomes for a card
 *
 * @param card - Current FSRS card state
 * @param reviewDate - Date of review (defaults to now)
 * @returns Map of ratings to scheduling outcomes
 */
export function getSchedulingOutcomes(
  card: Card,
  reviewDate: Date = new Date()
): Partial<Record<Rating, CardSchedule>> {
  const schedulingCards = fsrsInstance.repeat(card, reviewDate);

  return {
    [Rating.Again]: cardToSchedule('', schedulingCards[Rating.Again].card),
    [Rating.Hard]: cardToSchedule('', schedulingCards[Rating.Hard].card),
    [Rating.Good]: cardToSchedule('', schedulingCards[Rating.Good].card),
    [Rating.Easy]: cardToSchedule('', schedulingCards[Rating.Easy].card),
  };
}

/**
 * Convert CardReviewState to FSRS Card
 *
 * @param reviewState - Database card review state
 * @returns FSRS card object
 */
export function reviewStateToCard(reviewState: CardReviewState): Card {
  // Map CardState enum to FSRS State enum
  let state: State;
  switch (reviewState.state) {
    case CardState.NEW:
      state = State.New;
      break;
    case CardState.LEARNING:
      state = State.Learning;
      break;
    case CardState.REVIEW:
      state = State.Review;
      break;
    case CardState.RELEARNING:
      state = State.Relearning;
      break;
    default:
      state = State.New;
  }

  return {
    due: new Date(reviewState.due),
    stability: reviewState.stability,
    difficulty: reviewState.difficulty,
    elapsed_days: reviewState.elapsed_days,
    scheduled_days: reviewState.scheduled_days,
    reps: reviewState.reps,
    lapses: reviewState.lapses,
    state,
    last_review: reviewState.last_review ? new Date(reviewState.last_review) : undefined,
  };
}

/**
 * Convert FSRS Card to CardReviewState
 *
 * @param cardId - Card identifier
 * @param userId - User identifier
 * @param card - FSRS card object
 * @param existingState - Existing review state (for preserving metadata)
 * @returns Database card review state
 */
export function cardToReviewState(
  cardId: UUID,
  userId: string,
  card: Card,
  existingState?: Partial<CardReviewState>
): Omit<CardReviewState, 'id'> {
  // Map FSRS State enum to CardState enum
  let cardState: CardReviewState['state'];
  switch (card.state) {
    case State.New:
      cardState = CardState.NEW;
      break;
    case State.Learning:
      cardState = CardState.LEARNING;
      break;
    case State.Review:
      cardState = CardState.REVIEW;
      break;
    case State.Relearning:
      cardState = CardState.RELEARNING;
      break;
    default:
      cardState = CardState.NEW;
  }

  return {
    user_id: userId,
    card_id: cardId,
    due: card.due,
    stability: card.stability,
    difficulty: card.difficulty,
    elapsed_days: card.elapsed_days,
    scheduled_days: card.scheduled_days,
    reps: card.reps,
    lapses: card.lapses,
    state: cardState,
    last_review: card.last_review ? card.last_review : null,
    // Preserve existing metadata
    ease_factor: existingState?.ease_factor ?? 2.5,
    interval: Math.round(card.scheduled_days),
    total_reviews: (existingState?.total_reviews ?? 0) + 1,
    total_correct: existingState?.total_correct ?? 0,
  };
}

/**
 * Helper to convert FSRS Card to CardSchedule
 */
function cardToSchedule(cardId: string, card: Card): CardSchedule {
  let stateString: 'new' | 'learning' | 'review' | 'relearning';
  switch (card.state) {
    case State.New:
      stateString = 'new';
      break;
    case State.Learning:
      stateString = 'learning';
      break;
    case State.Review:
      stateString = 'review';
      break;
    case State.Relearning:
      stateString = 'relearning';
      break;
    default:
      stateString = 'new';
  }

  return {
    cardId,
    due: card.due,
    stability: card.stability,
    difficulty: card.difficulty,
    state: stateString,
    interval: Math.round(card.scheduled_days),
    reps: card.reps,
    lapses: card.lapses,
  };
}

/**
 * Check if a card is due for review
 *
 * @param card - FSRS card or CardReviewState
 * @param now - Current date (defaults to now)
 * @returns true if card is due
 */
export function isCardDue(
  card: Card | CardReviewState,
  now: Date = new Date()
): boolean {
  return new Date(card.due) <= now;
}

/**
 * Calculate days overdue (negative if not yet due)
 *
 * @param card - FSRS card or CardReviewState
 * @param now - Current date (defaults to now)
 * @returns Days overdue (negative if future due date)
 */
export function getDaysOverdue(
  card: Card | CardReviewState,
  now: Date = new Date()
): number {
  const dueDate = new Date(card.due);
  const diffMs = now.getTime() - dueDate.getTime();
  return diffMs / (1000 * 60 * 60 * 24);
}
