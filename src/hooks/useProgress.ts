/**
 * useProgress - User progress tracking hook
 * Aggregates and calculates user learning statistics
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { userProgressOps, studySessionOps, cardReviewOps } from '../lib/db/operations';
import type { UserProgress, StudySession, CardReviewState } from '../types';

interface ProgressStats {
  structuresViewed: number;
  structuresBookmarked: number;
  chaptersStarted: number;
  modulesCompleted: number;
  totalStudyTimeSeconds: number;
  currentStreak: number;
  longestStreak: number;
  retentionRate: number;
  lastActivityAt: Date | null;
  recentSessions: StudySession[];
  cardStats: {
    totalCards: number;
    newCards: number;
    learningCards: number;
    reviewCards: number;
    dueCards: number;
  };
}

interface UseProgressReturn {
  progress: UserProgress | null;
  stats: ProgressStats;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  markStructureViewed: (structureId: string) => Promise<void>;
  toggleBookmark: (structureId: string) => Promise<boolean>;
  addStudyTime: (seconds: number) => Promise<void>;
}

const DEFAULT_STATS: ProgressStats = {
  structuresViewed: 0,
  structuresBookmarked: 0,
  chaptersStarted: 0,
  modulesCompleted: 0,
  totalStudyTimeSeconds: 0,
  currentStreak: 0,
  longestStreak: 0,
  retentionRate: 0,
  lastActivityAt: null,
  recentSessions: [],
  cardStats: {
    totalCards: 0,
    newCards: 0,
    learningCards: 0,
    reviewCards: 0,
    dueCards: 0,
  },
};

/**
 * Hook for user progress tracking
 * @param userId - User ID (defaults to 'default-user' for local storage)
 */
export function useProgress(userId: string = 'default-user'): UseProgressReturn {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [cardStates, setCardStates] = useState<CardReviewState[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Fetch user progress data
   */
  const fetchProgress = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch progress data in parallel
      const [userProgress, recentSessions, _retentionRate] = await Promise.all([
        userProgressOps.getOrCreate(userId),
        studySessionOps.getRecent(userId, 10),
        cardReviewOps.getRetentionRate(userId),
      ]);

      setProgress(userProgress);
      setSessions(recentSessions);

      // Fetch card states (note: we'd need to get all cards for the user)
      // For now, we'll fetch just the due cards
      const dueCards = await cardReviewOps.getDueCards(userId, 1000);
      setCardStates(dueCards);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch progress');
      setError(error);
      console.error('Error fetching progress:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  /**
   * Mark structure as viewed
   */
  const markStructureViewed = useCallback(async (structureId: string) => {
    try {
      await userProgressOps.markStructureViewed(userId, structureId);
      await userProgressOps.updateStreak(userId);
      await fetchProgress();
    } catch (err) {
      console.error('Error marking structure viewed:', err);
      throw err;
    }
  }, [userId, fetchProgress]);

  /**
   * Toggle bookmark for structure
   */
  const toggleBookmark = useCallback(async (structureId: string): Promise<boolean> => {
    try {
      const isBookmarked = await userProgressOps.toggleBookmark(userId, structureId);
      await fetchProgress();
      return isBookmarked;
    } catch (err) {
      console.error('Error toggling bookmark:', err);
      throw err;
    }
  }, [userId, fetchProgress]);

  /**
   * Add study time
   */
  const addStudyTime = useCallback(async (seconds: number) => {
    try {
      await userProgressOps.addStudyTime(userId, seconds);
      await fetchProgress();
    } catch (err) {
      console.error('Error adding study time:', err);
      throw err;
    }
  }, [userId, fetchProgress]);

  /**
   * Refetch progress data
   */
  const refetch = useCallback(async () => {
    await fetchProgress();
  }, [fetchProgress]);

  /**
   * Calculate progress statistics
   */
  const stats = useMemo((): ProgressStats => {
    if (!progress) {
      return DEFAULT_STATS;
    }

    // Calculate card statistics
    const cardStats = {
      totalCards: cardStates.length,
      newCards: cardStates.filter(s => s.state === 'new').length,
      learningCards: cardStates.filter(s => s.state === 'learning').length,
      reviewCards: cardStates.filter(s => s.state === 'review').length,
      dueCards: cardStates.filter(s => s.due <= new Date()).length,
    };

    // Calculate retention rate from card states
    const totalReviews = cardStates.reduce((sum, s) => sum + s.total_reviews, 0);
    const totalCorrect = cardStates.reduce((sum, s) => sum + s.total_correct, 0);
    const retentionRate = totalReviews > 0 ? (totalCorrect / totalReviews) * 100 : 0;

    return {
      structuresViewed: progress.structures_viewed.length,
      structuresBookmarked: progress.structures_bookmarked.length,
      chaptersStarted: Object.keys(progress.chapters_started).length,
      modulesCompleted: Object.keys(progress.modules_completed).length,
      totalStudyTimeSeconds: progress.total_study_time_seconds,
      currentStreak: progress.current_streak_days,
      longestStreak: progress.longest_streak_days,
      retentionRate,
      lastActivityAt: progress.last_activity_at,
      recentSessions: sessions,
      cardStats,
    };
  }, [progress, sessions, cardStates]);

  /**
   * Fetch progress on mount and when userId changes
   */
  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return {
    progress,
    stats,
    isLoading,
    error,
    refetch,
    markStructureViewed,
    toggleBookmark,
    addStudyTime,
  };
}
