/**
 * Tests for FSRS Scheduler Module
 */

import { describe, it, expect } from 'vitest';
import { State, Rating as Grade } from 'ts-fsrs';
import {
  scheduleCard,
  getNextReview,
  calculateRetention,
  getSchedulingOutcomes,
  reviewStateToCard,
  cardToReviewState,
  isCardDue,
  getDaysOverdue,
} from './scheduler';
import { createNewCard } from './index';
import type { CardReviewState } from '../../types/user';
import { CardState } from '../../types/user';

describe('FSRS Scheduler', () => {
  describe('scheduleCard', () => {
    it('should schedule a new card with Good rating', () => {
      const card = createNewCard();
      const schedule = scheduleCard(card, Grade.Good);

      expect(schedule).toBeDefined();
      expect(schedule.state).toBe('learning');
      expect(schedule.reps).toBe(1);
      expect(schedule.stability).toBeGreaterThan(0);
      expect(schedule.difficulty).toBeGreaterThan(0);
    });

    it('should schedule a new card with Again rating', () => {
      const card = createNewCard();
      const schedule = scheduleCard(card, Grade.Again);

      expect(schedule.state).toBe('learning');
      expect(schedule.reps).toBe(1);
      expect(schedule.lapses).toBe(0);
    });

    it('should schedule a new card with Easy rating', () => {
      const card = createNewCard();
      const schedule = scheduleCard(card, Grade.Easy);

      expect(schedule.state).toBe('review');
      expect(schedule.reps).toBe(1);
      expect(schedule.interval).toBeGreaterThan(0);
    });

    it('should increase reps on subsequent reviews', () => {
      let card = createNewCard();
      const firstReview = scheduleCard(card, Grade.Good);

      card = {
        ...firstReview,
        due: firstReview.due,
        stability: firstReview.stability,
        difficulty: firstReview.difficulty,
        elapsed_days: 0,
        scheduled_days: firstReview.interval,
        reps: firstReview.reps,
        lapses: firstReview.lapses,
        state: State.Learning,
        last_review: new Date(),
      };

      const secondReview = scheduleCard(card, Grade.Good);
      expect(secondReview.reps).toBeGreaterThan(firstReview.reps);
    });
  });

  describe('getNextReview', () => {
    it('should return a future date', () => {
      const card = createNewCard();
      const nextReview = getNextReview(card, Grade.Good);

      expect(nextReview).toBeInstanceOf(Date);
      expect(nextReview.getTime()).toBeGreaterThan(Date.now());
    });

    it('should return sooner date for Again rating', () => {
      const card = createNewCard();
      const againDate = getNextReview(card, Grade.Again);
      const goodDate = getNextReview(card, Grade.Good);

      expect(againDate.getTime()).toBeLessThanOrEqual(goodDate.getTime());
    });

    it('should return later date for Easy rating', () => {
      const card = createNewCard();
      const goodDate = getNextReview(card, Grade.Good);
      const easyDate = getNextReview(card, Grade.Easy);

      expect(easyDate.getTime()).toBeGreaterThanOrEqual(goodDate.getTime());
    });
  });

  describe('calculateRetention', () => {
    it('should return 1.0 for new cards', () => {
      const card = createNewCard();
      const retention = calculateRetention(card);

      expect(retention).toBe(1.0);
    });

    it('should return high retention for recently reviewed cards', () => {
      const card = {
        due: new Date(Date.now() + 86400000), // Tomorrow
        stability: 10,
        difficulty: 5,
        elapsed_days: 1,
        scheduled_days: 1,
        reps: 1,
        lapses: 0,
        state: State.Review,
        last_review: new Date(),
      };

      const retention = calculateRetention(card);
      expect(retention).toBeGreaterThan(0.8);
      expect(retention).toBeLessThanOrEqual(1.0);
    });

    it('should return lower retention for overdue cards', () => {
      const card = {
        due: new Date(Date.now() - 86400000 * 30), // 30 days ago (very overdue)
        stability: 1, // Very low stability for faster decay
        difficulty: 7,
        elapsed_days: 5,
        scheduled_days: 2,
        reps: 2,
        lapses: 1,
        state: State.Review,
        last_review: new Date(Date.now() - 86400000 * 35),
      };

      const retention = calculateRetention(card);
      // With 30 days overdue and very low stability, retention should decrease significantly
      // FSRS formula: R = exp(-t/S * ln(0.9)) where t is elapsed time, S is stability
      expect(retention).toBeLessThan(0.9);
      expect(retention).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getSchedulingOutcomes', () => {
    it('should return outcomes for all ratings', () => {
      const card = createNewCard();
      const outcomes = getSchedulingOutcomes(card);

      expect(outcomes[Grade.Again]).toBeDefined();
      expect(outcomes[Grade.Hard]).toBeDefined();
      expect(outcomes[Grade.Good]).toBeDefined();
      expect(outcomes[Grade.Easy]).toBeDefined();
    });

    it('should have increasing intervals from Again to Easy', () => {
      const card = createNewCard();
      const outcomes = getSchedulingOutcomes(card);

      // Generally, Easy should have the longest interval
      const easyOutcome = outcomes[Grade.Easy];
      const againOutcome = outcomes[Grade.Again];
      expect(easyOutcome?.interval).toBeGreaterThanOrEqual(
        againOutcome?.interval ?? 0
      );
    });
  });

  describe('reviewStateToCard', () => {
    it('should convert CardReviewState to FSRS Card', () => {
      const reviewState: CardReviewState = {
        id: 'test-id',
        user_id: 'user1',
        card_id: 'card1',
        due: new Date(),
        stability: 5.0,
        difficulty: 6.0,
        elapsed_days: 2,
        scheduled_days: 7,
        reps: 3,
        lapses: 1,
        state: CardState.REVIEW,
        last_review: new Date(),
        ease_factor: 2.5,
        interval: 7,
        total_reviews: 5,
        total_correct: 4,
      };

      const card = reviewStateToCard(reviewState);

      expect(card.stability).toBe(5.0);
      expect(card.difficulty).toBe(6.0);
      expect(card.reps).toBe(3);
      expect(card.lapses).toBe(1);
      expect(card.state).toBe(State.Review);
    });

    it('should handle all state types', () => {
      const states: CardState[] = [
        CardState.NEW,
        CardState.LEARNING,
        CardState.REVIEW,
        CardState.RELEARNING,
      ];

      states.forEach((stateValue) => {
        const reviewState: CardReviewState = {
          id: 'test-id',
          user_id: 'user1',
          card_id: 'card1',
          due: new Date(),
          stability: 5.0,
          difficulty: 6.0,
          elapsed_days: 0,
          scheduled_days: 1,
          reps: 0,
          lapses: 0,
          state: stateValue,
          last_review: null,
          ease_factor: 2.5,
          interval: 0,
          total_reviews: 0,
          total_correct: 0,
        };

        const card = reviewStateToCard(reviewState);
        expect(card).toBeDefined();
      });
    });
  });

  describe('cardToReviewState', () => {
    it('should convert FSRS Card to CardReviewState', () => {
      const card = createNewCard();
      const reviewState = cardToReviewState('card1', 'user1', card);

      expect(reviewState.card_id).toBe('card1');
      expect(reviewState.user_id).toBe('user1');
      expect(reviewState.stability).toBe(card.stability);
      expect(reviewState.difficulty).toBe(card.difficulty);
      expect(reviewState.reps).toBe(card.reps);
    });

    it('should preserve existing metadata', () => {
      const card = createNewCard();
      const existingState = {
        total_reviews: 10,
        total_correct: 8,
        ease_factor: 2.8,
      };

      const reviewState = cardToReviewState('card1', 'user1', card, existingState);

      expect(reviewState.total_reviews).toBe(11); // Incremented
      expect(reviewState.total_correct).toBe(8); // Preserved
      expect(reviewState.ease_factor).toBe(2.8); // Preserved
    });
  });

  describe('isCardDue', () => {
    it('should return true for past due date', () => {
      const card = {
        due: new Date(Date.now() - 86400000), // Yesterday
        stability: 5,
        difficulty: 5,
        elapsed_days: 1,
        scheduled_days: 1,
        reps: 1,
        lapses: 0,
        state: State.Review,
        last_review: new Date(),
      };

      expect(isCardDue(card)).toBe(true);
    });

    it('should return false for future due date', () => {
      const card = {
        due: new Date(Date.now() + 86400000), // Tomorrow
        stability: 5,
        difficulty: 5,
        elapsed_days: 0,
        scheduled_days: 1,
        reps: 1,
        lapses: 0,
        state: State.Review,
        last_review: new Date(),
      };

      expect(isCardDue(card)).toBe(false);
    });
  });

  describe('getDaysOverdue', () => {
    it('should return positive days for overdue cards', () => {
      const card = {
        due: new Date(Date.now() - 86400000 * 3), // 3 days ago
        stability: 5,
        difficulty: 5,
        elapsed_days: 1,
        scheduled_days: 1,
        reps: 1,
        lapses: 0,
        state: State.Review,
        last_review: new Date(),
      };

      const daysOverdue = getDaysOverdue(card);
      expect(daysOverdue).toBeGreaterThan(2.5);
      expect(daysOverdue).toBeLessThan(3.5);
    });

    it('should return negative days for future due cards', () => {
      const card = {
        due: new Date(Date.now() + 86400000 * 2), // 2 days from now
        stability: 5,
        difficulty: 5,
        elapsed_days: 0,
        scheduled_days: 2,
        reps: 1,
        lapses: 0,
        state: State.Review,
        last_review: new Date(),
      };

      const daysOverdue = getDaysOverdue(card);
      expect(daysOverdue).toBeLessThan(-1.5);
      expect(daysOverdue).toBeGreaterThan(-2.5);
    });
  });
});
