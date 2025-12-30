/**
 * React Hook for Flashcard Operations
 * Based on Netter's Anatomy Tool Specification Section 7.7
 *
 * Provides React components with flashcard review functionality,
 * session management, and statistics.
 */

import { useState, useEffect, useCallback } from 'react';
import { Rating } from '../lib/fsrs';
import { db } from '../lib/db';
import {
  scheduleCard,
  reviewStateToCard,
  cardToReviewState,
} from '../lib/fsrs/scheduler';
import {
  createReviewSession,
  getDueCounts,
  initializeCardReviewState,
  type ReviewSession,
  type QueueOptions,
} from '../lib/fsrs/queue';
import {
  getReviewStats,
  getMaturityStats,
  type ReviewStats,
  type MaturityStats,
} from '../lib/fsrs/stats';
import { SessionType, type StudySession, type FlashCard, type CardReviewState } from '../types';
import type { UUID } from '../types/anatomy';
import { State } from 'ts-fsrs';

/**
 * Session configuration options
 */
export interface SessionOptions {
  /** Maximum number of new cards */
  newCardsLimit?: number;
  /** Maximum number of review cards */
  reviewLimit?: number;
  /** Filter by tags */
  tags?: string[];
  /** Filter by structure IDs */
  structureIds?: UUID[];
  /** User ID */
  userId?: string;
}

/**
 * Hook return type
 */
export interface UseFlashcardsReturn {
  // Session management
  session: ReviewSession | null;
  currentCard: FlashCard | null;
  currentReviewState: CardReviewState | null;
  isLoading: boolean;
  error: Error | null;

  // Actions
  startSession: (options?: SessionOptions) => Promise<void>;
  reviewCard: (cardId: string, rating: Rating) => Promise<void>;
  nextCard: () => void;
  previousCard: () => void;
  endSession: () => Promise<void>;

  // Statistics
  stats: ReviewStats | null;
  maturityStats: MaturityStats | null;
  dueCounts: { due: number; new: number; total: number } | null;
  refreshStats: () => Promise<void>;

  // Utilities
  getDueCount: () => Promise<number>;
  getCard: (cardId: string) => Promise<FlashCard | undefined>;
}

/**
 * React hook for flashcard operations
 *
 * @param userId - User identifier (defaults to 'default')
 * @returns Flashcard operations and state
 */
export function useFlashcards(userId: string = 'default'): UseFlashcardsReturn {
  // State
  const [session, setSession] = useState<ReviewSession | null>(null);
  const [currentCard, setCurrentCard] = useState<FlashCard | null>(null);
  const [currentReviewState, setCurrentReviewState] =
    useState<CardReviewState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [maturityStats, setMaturityStats] = useState<MaturityStats | null>(null);
  const [dueCounts, setDueCounts] = useState<{
    due: number;
    new: number;
    total: number;
  } | null>(null);

  /**
   * Start a new review session
   */
  const startSession = useCallback(
    async (options: SessionOptions = {}) => {
      setIsLoading(true);
      setError(null);

      try {
        const queueOptions: QueueOptions = {
          newPerDay: options.newCardsLimit ?? 20,
          maxReviews: options.reviewLimit ?? 100,
          userId,
          tags: options.tags,
          structureIds: options.structureIds,
        };

        const newSession = await createReviewSession(queueOptions);
        setSession(newSession);

        // Load first card
        if (newSession.cards.length > 0 && newSession.cards[0]) {
          await loadCard(newSession.cards[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to start session'));
      } finally {
        setIsLoading(false);
      }
    },
    [userId]
  );

  /**
   * Review a card with a rating
   */
  const reviewCard = useCallback(
    async (cardId: string, rating: Rating) => {
      if (!session) {
        throw new Error('No active session');
      }

      setIsLoading(true);
      setError(null);

      try {
        // Get or create review state
        let reviewState = await db.cardReviewStates
          .where('[cardId+userId]')
          .equals([cardId, userId])
          .first();

        if (!reviewState) {
          // Initialize new card
          reviewState = await initializeCardReviewState(cardId, userId);
        }

        // Convert to FSRS card and schedule
        const fsrsCard = reviewStateToCard(reviewState);
        const scheduled = scheduleCard(fsrsCard, rating);

        // Update review state - use the scheduled card directly
        const updatedReviewState = cardToReviewState(
          cardId as UUID,
          userId,
          {
            due: scheduled.due,
            stability: scheduled.stability,
            difficulty: scheduled.difficulty,
            elapsed_days: 0,
            scheduled_days: scheduled.interval,
            reps: scheduled.reps,
            lapses: scheduled.lapses,
            state: mapStateToFSRS(scheduled.state),
            last_review: new Date(),
          },
          {
            ...reviewState,
            total_reviews: reviewState.total_reviews + 1,
            total_correct:
              reviewState.total_correct +
              (rating === Rating.Good || rating === Rating.Easy ? 1 : 0),
          }
        );

        // Save to database
        await db.cardReviewStates.update(reviewState.id!, updatedReviewState);

        // Update session stats
        const updatedSession = {
          ...session,
          stats: {
            ...session.stats,
            reviewed: session.stats.reviewed + 1,
            correct:
              session.stats.correct +
              (rating === Rating.Good || rating === Rating.Easy ? 1 : 0),
            again: session.stats.again + (rating === Rating.Again ? 1 : 0),
          },
        };
        setSession(updatedSession);

        // Move to next card
        nextCard();
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to review card'));
      } finally {
        setIsLoading(false);
      }
    },
    [session, userId]
  );

  /**
   * Move to next card in session
   */
  const nextCard = useCallback(() => {
    if (!session) return;

    const nextIndex = session.currentIndex + 1;
    if (nextIndex < session.cards.length) {
      const cardId = session.cards[nextIndex];
      const updatedSession = {
        ...session,
        currentIndex: nextIndex,
      };
      setSession(updatedSession);
      if (cardId) {
        loadCard(cardId);
      }
    } else {
      // Session complete
      setCurrentCard(null);
      setCurrentReviewState(null);
    }
  }, [session]);

  /**
   * Move to previous card in session
   */
  const previousCard = useCallback(() => {
    if (!session) return;

    const prevIndex = session.currentIndex - 1;
    if (prevIndex >= 0) {
      const cardId = session.cards[prevIndex];
      const updatedSession = {
        ...session,
        currentIndex: prevIndex,
      };
      setSession(updatedSession);
      if (cardId) {
        loadCard(cardId);
      }
    }
  }, [session]);

  /**
   * End current session
   */
  const endSession = useCallback(async () => {
    if (!session) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create study session record
      const sessionRecord: Omit<StudySession, 'id'> & { id: UUID } = {
        id: crypto.randomUUID() as UUID,
        user_id: userId,
        session_type: SessionType.FLASHCARD_REVIEW,
        started_at: session.startedAt,
        ended_at: new Date(),
        duration_seconds: Math.floor(
          (new Date().getTime() - session.startedAt.getTime()) / 1000
        ),
        structures_viewed: null,
        module_id: null,
        cards_reviewed: session.stats.reviewed,
        cards_correct: session.stats.correct,
      };

      await db.studySessions.add(sessionRecord);

      // Update user progress
      const userProgress = await db.userProgress
        .where('user_id')
        .equals(userId)
        .first();

      if (userProgress) {
        await db.userProgress.update(userProgress.id, {
          total_study_time_seconds:
            userProgress.total_study_time_seconds +
            sessionRecord.duration_seconds,
          last_activity_at: new Date(),
        });
      }

      // Clear session
      setSession(null);
      setCurrentCard(null);
      setCurrentReviewState(null);

      // Refresh stats
      await refreshStats();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to end session'));
    } finally {
      setIsLoading(false);
    }
  }, [session, userId]);

  /**
   * Refresh statistics
   */
  const refreshStats = useCallback(async () => {
    try {
      const [reviewStats, maturity, counts] = await Promise.all([
        getReviewStats(userId),
        getMaturityStats(userId),
        getDueCounts(userId),
      ]);

      setStats(reviewStats);
      setMaturityStats(maturity);
      setDueCounts(counts);
    } catch (err) {
      console.error('Failed to refresh stats:', err);
    }
  }, [userId]);

  /**
   * Get count of due cards
   */
  const getDueCount = useCallback(async (): Promise<number> => {
    const counts = await getDueCounts(userId);
    return counts.due;
  }, [userId]);

  /**
   * Get a flashcard by ID
   */
  const getCard = useCallback(
    async (cardId: string): Promise<FlashCard | undefined> => {
      return db.flashCards.get(cardId);
    },
    []
  );

  /**
   * Load a card and its review state
   */
  const loadCard = async (cardId: string) => {
    const [card, reviewState] = await Promise.all([
      db.flashCards.get(cardId),
      db.cardReviewStates.where('[cardId+userId]').equals([cardId, userId]).first(),
    ]);

    setCurrentCard(card ?? null);
    setCurrentReviewState(reviewState ?? null);
  };

  // Load initial stats on mount
  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  return {
    // Session state
    session,
    currentCard,
    currentReviewState,
    isLoading,
    error,

    // Actions
    startSession,
    reviewCard,
    nextCard,
    previousCard,
    endSession,

    // Statistics
    stats,
    maturityStats,
    dueCounts,
    refreshStats,

    // Utilities
    getDueCount,
    getCard,
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Map CardSchedule state string to FSRS State enum for cardToReviewState
 */
function mapStateToFSRS(
  stateStr: 'new' | 'learning' | 'review' | 'relearning'
): State {
  switch (stateStr) {
    case 'new':
      return State.New;
    case 'learning':
      return State.Learning;
    case 'review':
      return State.Review;
    case 'relearning':
      return State.Relearning;
    default:
      return State.New;
  }
}
