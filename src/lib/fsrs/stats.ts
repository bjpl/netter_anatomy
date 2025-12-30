/**
 * FSRS Statistics Module
 * Based on Netter's Anatomy Tool Specification Section 7.7
 *
 * Provides review statistics, retention rates, and learning analytics.
 */

import { db } from '../db';
import { calculateRetention, reviewStateToCard } from './scheduler';
import type { StudySession } from '../../types/user';

/**
 * Review statistics
 */
export interface ReviewStats {
  /** Today's review stats */
  today: {
    /** Cards reviewed today */
    reviewed: number;
    /** Cards answered correctly (Good/Easy) */
    correct: number;
    /** Total study time in seconds */
    studyTimeSeconds: number;
  };
  /** This week's review stats */
  thisWeek: {
    /** Cards reviewed this week */
    reviewed: number;
    /** Cards answered correctly */
    correct: number;
    /** Total study time in seconds */
    studyTimeSeconds: number;
  };
  /** Overall retention rate (0-1) */
  retentionRate: number;
  /** Current consecutive day streak */
  streak: number;
  /** Upcoming review forecast */
  forecast: Array<{ date: Date; count: number }>;
}

/**
 * Card maturity breakdown
 */
export interface MaturityStats {
  /** New cards (never reviewed) */
  new: number;
  /** Cards in learning phase */
  learning: number;
  /** Cards in review phase (mature) */
  review: number;
  /** Cards being relearned */
  relearning: number;
  /** Total cards */
  total: number;
}

/**
 * Get comprehensive review statistics
 *
 * @param userId - User identifier (defaults to 'default')
 * @returns Review statistics
 */
export async function getReviewStats(
  userId: string = 'default'
): Promise<ReviewStats> {
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const weekStart = new Date(now);
  weekStart.setDate(weekStart.getDate() - 7);
  weekStart.setHours(0, 0, 0, 0);

  // Get sessions for time periods
  const [todaySessions, weekSessions, retentionRate, streak, forecast] =
    await Promise.all([
      getSessionsInRange(todayStart, now, userId),
      getSessionsInRange(weekStart, now, userId),
      getRetentionRate(30, userId),
      getCurrentStreak(userId),
      getForecast(7, userId),
    ]);

  // Calculate today's stats
  const todayStats = calculateSessionStats(todaySessions);

  // Calculate week's stats
  const weekStats = calculateSessionStats(weekSessions);

  return {
    today: todayStats,
    thisWeek: weekStats,
    retentionRate,
    streak,
    forecast,
  };
}

/**
 * Calculate retention rate over a period
 *
 * @param days - Number of days to analyze
 * @param userId - User identifier
 * @returns Retention rate (0-1)
 */
export async function getRetentionRate(
  days: number = 30,
  userId: string = 'default'
): Promise<number> {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  // Get all reviewed cards
  const reviewStates = await db.cardReviewStates
    .where('userId')
    .equals(userId)
    .and((state) => state.total_reviews > 0)
    .toArray();

  if (reviewStates.length === 0) {
    return 1.0; // No data yet
  }

  // Calculate average retention across all cards
  const retentions = reviewStates.map((state) => {
    const card = reviewStateToCard(state);
    return calculateRetention(card);
  });

  const avgRetention =
    retentions.reduce((sum, r) => sum + r, 0) / retentions.length;

  return avgRetention;
}

/**
 * Get forecast of upcoming reviews
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

  // Get all review states
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
 * Get current study streak in days
 *
 * @param userId - User identifier
 * @returns Number of consecutive days with reviews
 */
export async function getCurrentStreak(
  userId: string = 'default'
): Promise<number> {
  const userProgress = await db.userProgress
    .where('user_id')
    .equals(userId)
    .first();

  return userProgress?.current_streak_days ?? 0;
}

/**
 * Get card maturity distribution
 *
 * @param userId - User identifier
 * @returns Maturity statistics
 */
export async function getMaturityStats(
  userId: string = 'default'
): Promise<MaturityStats> {
  // Get total number of cards
  const totalCards = await db.flashCards.count();

  // Get review states grouped by state
  const reviewStates = await db.cardReviewStates
    .where('userId')
    .equals(userId)
    .toArray();

  const stateCounts = {
    new: 0,
    learning: 0,
    review: 0,
    relearning: 0,
  };

  reviewStates.forEach((state) => {
    stateCounts[state.state]++;
  });

  // New cards are those without review states
  const reviewedCount = reviewStates.length;
  const newCount = totalCards - reviewedCount;

  return {
    new: newCount,
    learning: stateCounts.learning,
    review: stateCounts.review,
    relearning: stateCounts.relearning,
    total: totalCards,
  };
}

/**
 * Get study time statistics
 *
 * @param days - Number of days to analyze
 * @param userId - User identifier
 * @returns Study time data
 */
export async function getStudyTimeStats(
  days: number = 30,
  userId: string = 'default'
): Promise<{
  totalSeconds: number;
  averagePerDay: number;
  byDay: Array<{ date: Date; seconds: number }>;
}> {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const sessions = await db.studySessions
    .where('userId')
    .equals(userId)
    .and((session) => new Date(session.started_at) >= cutoffDate)
    .toArray();

  const totalSeconds = sessions.reduce(
    (sum, s) => sum + s.duration_seconds,
    0
  );

  const averagePerDay = totalSeconds / days;

  // Group by day
  const byDayMap = new Map<string, number>();
  sessions.forEach((session) => {
    const date = new Date(session.started_at);
    date.setHours(0, 0, 0, 0);
    const key = date.toISOString();
    byDayMap.set(key, (byDayMap.get(key) || 0) + session.duration_seconds);
  });

  const byDay = Array.from(byDayMap.entries()).map(([dateStr, seconds]) => ({
    date: new Date(dateStr),
    seconds,
  }));

  return {
    totalSeconds,
    averagePerDay,
    byDay,
  };
}

/**
 * Get accuracy statistics
 *
 * @param days - Number of days to analyze
 * @param userId - User identifier
 * @returns Accuracy metrics
 */
export async function getAccuracyStats(
  days: number = 30,
  userId: string = 'default'
): Promise<{
  overallAccuracy: number;
  byCardType: Record<string, number>;
  byDifficulty: Record<string, number>;
}> {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  // Get review states
  const reviewStates = await db.cardReviewStates
    .where('userId')
    .equals(userId)
    .and(
      (state) =>
        state.last_review !== null && new Date(state.last_review) >= cutoffDate
    )
    .toArray();

  if (reviewStates.length === 0) {
    return {
      overallAccuracy: 0,
      byCardType: {},
      byDifficulty: {},
    };
  }

  // Calculate overall accuracy
  const totalReviews = reviewStates.reduce((sum, s) => sum + s.total_reviews, 0);
  const totalCorrect = reviewStates.reduce((sum, s) => sum + s.total_correct, 0);
  const overallAccuracy = totalCorrect / totalReviews;

  // Get card details for grouping
  const cardIds = reviewStates.map((s) => s.card_id);
  const cards = await db.flashCards.where('id').anyOf(cardIds).toArray();
  const cardMap = new Map(cards.map((c) => [c.id, c]));

  // Group by card type
  const byCardType: Record<string, { correct: number; total: number }> = {};
  reviewStates.forEach((state) => {
    const card = cardMap.get(state.card_id);
    if (card) {
      const type = card.card_type;
      if (!byCardType[type]) {
        byCardType[type] = { correct: 0, total: 0 };
      }
      byCardType[type].correct += state.total_correct;
      byCardType[type].total += state.total_reviews;
    }
  });

  const byCardTypeAccuracy: Record<string, number> = {};
  Object.entries(byCardType).forEach(([type, stats]) => {
    byCardTypeAccuracy[type] = stats.correct / stats.total;
  });

  // Group by difficulty
  const byDifficulty: Record<string, { correct: number; total: number }> = {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 },
  };

  reviewStates.forEach((state) => {
    const diff = state.difficulty;
    const category = diff < 5 ? 'easy' : diff < 7 ? 'medium' : 'hard';
    const categoryData = byDifficulty[category];
    if (categoryData) {
      categoryData.correct += state.total_correct;
      categoryData.total += state.total_reviews;
    }
  });

  const byDifficultyAccuracy: Record<string, number> = {};
  Object.entries(byDifficulty).forEach(([cat, stats]) => {
    byDifficultyAccuracy[cat] = stats.total > 0 ? stats.correct / stats.total : 0;
  });

  return {
    overallAccuracy,
    byCardType: byCardTypeAccuracy,
    byDifficulty: byDifficultyAccuracy,
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get study sessions in a date range
 */
async function getSessionsInRange(
  start: Date,
  end: Date,
  userId: string
): Promise<StudySession[]> {
  return db.studySessions
    .where('userId')
    .equals(userId)
    .and((session) => {
      const sessionDate = new Date(session.started_at);
      return sessionDate >= start && sessionDate <= end;
    })
    .toArray();
}

/**
 * Calculate statistics from sessions
 */
function calculateSessionStats(
  sessions: StudySession[]
): {
  reviewed: number;
  correct: number;
  studyTimeSeconds: number;
} {
  const flashcardSessions = sessions.filter(
    (s) => s.session_type === 'flashcard_review'
  );

  const reviewed = flashcardSessions.reduce(
    (sum, s) => sum + (s.cards_reviewed ?? 0),
    0
  );

  const correct = flashcardSessions.reduce(
    (sum, s) => sum + (s.cards_correct ?? 0),
    0
  );

  const studyTimeSeconds = sessions.reduce(
    (sum, s) => sum + s.duration_seconds,
    0
  );

  return {
    reviewed,
    correct,
    studyTimeSeconds,
  };
}
