/**
 * FSRS Review Queue Management
 * Based on Netter's Anatomy Tool Specification Section 7.7
 *
 * Manages review queues, session building, and card prioritization.
 */

import { db } from '../db';
import { createNewCard } from './index';
import { CardState, type CardReviewState } from '../../types/user';
import type { UUID } from '../../types/anatomy';

/**
 * Review session state
 */
export interface ReviewSession {
  /** Card IDs in the session */
  cards: string[];
  /** Current card index */
  currentIndex: number;
  /** Session start time */
  startedAt: Date;
  /** Review statistics */
  stats: {
    /** Cards reviewed so far */
    reviewed: number;
    /** Cards answered correctly (Good/Easy) */
    correct: number;
    /** Cards answered Again */
    again: number;
  };
}

/**
 * Queue building options
 */
export interface QueueOptions {
  /** Maximum number of new cards per day */
  newPerDay?: number;
  /** Maximum number of reviews per day */
  maxReviews?: number;
  /** User ID (defaults to 'default') */
  userId?: string;
  /** Filter by tags */
  tags?: string[];
  /** Filter by structure IDs */
  structureIds?: UUID[];
}

/**
 * Get cards due for review
 *
 * @param limit - Maximum number of cards to return
 * @param userId - User identifier (defaults to 'default')
 * @returns Array of card IDs due for review
 */
export async function getDueCards(
  limit: number = 50,
  userId: string = 'default'
): Promise<string[]> {
  const now = new Date();

  // Query cards that are due
  const dueStates = await db.cardReviewStates
    .where('[cardId+due]')
    .below([Infinity, now])
    .and((state) => state.user_id === userId && state.state !== 'new')
    .limit(limit)
    .toArray();

  // Sort by days overdue (most overdue first)
  dueStates.sort((a, b) => {
    const aDue = new Date(a.due).getTime();
    const bDue = new Date(b.due).getTime();
    return aDue - bDue;
  });

  return dueStates.map((state) => state.card_id);
}

/**
 * Get new cards that haven't been reviewed yet
 *
 * @param limit - Maximum number of cards to return
 * @param userId - User identifier (defaults to 'default')
 * @returns Array of new card IDs
 */
export async function getNewCards(
  limit: number = 20,
  userId: string = 'default'
): Promise<string[]> {
  // Get all flashcards
  const allCards = await db.flashCards.toArray();
  const allCardIds = new Set(allCards.map((c) => c.id));

  // Get cards that have review states
  const existingStates = await db.cardReviewStates
    .where('userId')
    .equals(userId)
    .toArray();
  const reviewedCardIds = new Set(existingStates.map((s) => s.card_id));

  // Find cards without review states (new cards)
  const newCardIds = Array.from(allCardIds).filter(
    (id) => !reviewedCardIds.has(id)
  );

  // Return limited number of new cards
  return newCardIds.slice(0, limit);
}

/**
 * Build review queue based on options
 *
 * @param options - Queue building options
 * @returns Array of card IDs in priority order
 */
export async function buildReviewQueue(
  options: QueueOptions = {}
): Promise<string[]> {
  const {
    newPerDay = 20,
    maxReviews = 100,
    userId = 'default',
    tags,
    structureIds,
  } = options;

  // Get due cards and new cards
  const [dueCardIds, newCardIds] = await Promise.all([
    getDueCards(maxReviews, userId),
    getNewCards(newPerDay, userId),
  ]);

  // Apply filters if specified
  let filteredDue = dueCardIds;
  let filteredNew = newCardIds;

  if (tags || structureIds) {
    // Get flashcard details for filtering
    const [dueCards, newCards] = await Promise.all([
      db.flashCards.where('id').anyOf(dueCardIds).toArray(),
      db.flashCards.where('id').anyOf(newCardIds).toArray(),
    ]);

    if (tags) {
      filteredDue = dueCards
        .filter((card) => tags.some((tag) => card.tags.includes(tag)))
        .map((c) => c.id);
      filteredNew = newCards
        .filter((card) => tags.some((tag) => card.tags.includes(tag)))
        .map((c) => c.id);
    }

    if (structureIds) {
      const structureIdSet = new Set(structureIds);
      filteredDue = dueCards
        .filter((card) => structureIdSet.has(card.structure_id))
        .map((c) => c.id);
      filteredNew = newCards
        .filter((card) => structureIdSet.has(card.structure_id))
        .map((c) => c.id);
    }
  }

  // Combine queues: due cards first, then new cards
  return [...filteredDue, ...filteredNew];
}

/**
 * Create a new review session
 *
 * @param options - Queue building options
 * @returns Review session object
 */
export async function createReviewSession(
  options: QueueOptions = {}
): Promise<ReviewSession> {
  const cards = await buildReviewQueue(options);

  return {
    cards,
    currentIndex: 0,
    startedAt: new Date(),
    stats: {
      reviewed: 0,
      correct: 0,
      again: 0,
    },
  };
}

/**
 * Initialize review state for a new card
 *
 * @param cardId - Card identifier
 * @param userId - User identifier
 * @returns Created review state
 */
export async function initializeCardReviewState(
  cardId: UUID,
  userId: string = 'default'
): Promise<CardReviewState> {
  // Create new FSRS card
  const fsrsCard = createNewCard();

  // Convert to review state
  const reviewState: Omit<CardReviewState, 'id'> = {
    user_id: userId,
    card_id: cardId,
    due: fsrsCard.due,
    stability: fsrsCard.stability,
    difficulty: fsrsCard.difficulty,
    elapsed_days: fsrsCard.elapsed_days,
    scheduled_days: fsrsCard.scheduled_days,
    reps: fsrsCard.reps,
    lapses: fsrsCard.lapses,
    state: CardState.NEW,
    last_review: null,
    ease_factor: 2.5,
    interval: 0,
    total_reviews: 0,
    total_correct: 0,
  };

  // Save to database
  const id = await db.cardReviewStates.add(reviewState as CardReviewState);

  return {
    id: id as UUID,
    ...reviewState,
  };
}

/**
 * Get count of cards due today
 *
 * @param userId - User identifier
 * @returns Object with due and new card counts
 */
export async function getDueCounts(
  userId: string = 'default'
): Promise<{ due: number; new: number; total: number }> {
  const now = new Date();

  // Count due cards
  const dueCount = await db.cardReviewStates
    .where('[cardId+due]')
    .below([Infinity, now])
    .and((state) => state.user_id === userId && state.state !== 'new')
    .count();

  // Count new cards
  const allCards = await db.flashCards.count();
  const reviewedCount = await db.cardReviewStates
    .where('userId')
    .equals(userId)
    .count();
  const newCount = allCards - reviewedCount;

  return {
    due: dueCount,
    new: Math.max(0, newCount),
    total: dueCount + newCount,
  };
}

/**
 * Get upcoming review forecast
 *
 * @param days - Number of days to forecast
 * @param userId - User identifier
 * @returns Array of dates with card counts
 */
export async function getForecast(
  days: number = 7,
  userId: string = 'default'
): Promise<Array<{ date: Date; count: number }>> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const forecast: Array<{ date: Date; count: number }> = [];

  // Get all review states for this user
  const reviewStates = await db.cardReviewStates
    .where('userId')
    .equals(userId)
    .toArray();

  // Count cards due each day
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const count = reviewStates.filter((state) => {
      const due = new Date(state.due);
      return due >= date && due < nextDate;
    }).length;

    forecast.push({ date, count });
  }

  return forecast;
}

/**
 * Shuffle an array of card IDs for random review order
 *
 * @param cardIds - Array of card IDs
 * @returns Shuffled array
 */
export function shuffleCards(cardIds: string[]): string[] {
  const shuffled = [...cardIds];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    const swap = shuffled[j];
    if (temp !== undefined && swap !== undefined) {
      shuffled[i] = swap;
      shuffled[j] = temp;
    }
  }
  return shuffled;
}
