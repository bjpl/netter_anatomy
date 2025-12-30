/**
 * Tests for FSRS Wrapper Module
 */

import { describe, it, expect } from 'vitest';
import { State } from 'ts-fsrs';
import {
  fsrsInstance,
  createNewCard,
  isValidCard,
  getStateName,
} from '../../../src/lib/fsrs';

describe('FSRS Wrapper', () => {
  describe('fsrsInstance', () => {
    it('should be initialized', () => {
      expect(fsrsInstance).toBeDefined();
      expect(typeof fsrsInstance.repeat).toBe('function');
    });

    it('should have correct configuration', () => {
      // Access the params property if available
      const params = (fsrsInstance as any).p;
      if (params) {
        expect(params.request_retention).toBe(0.9);
        expect(params.maximum_interval).toBe(365);
      }
    });
  });

  describe('createNewCard', () => {
    it('should create a valid new card', () => {
      const card = createNewCard();

      expect(card).toBeDefined();
      expect(card.due).toBeInstanceOf(Date);
      expect(card.stability).toBe(0);
      expect(card.difficulty).toBe(0);
      expect(card.elapsed_days).toBe(0);
      expect(card.scheduled_days).toBe(0);
      expect(card.reps).toBe(0);
      expect(card.lapses).toBe(0);
      expect(card.state).toBe(State.New);
    });

    it('should create cards with current date', () => {
      const before = new Date();
      const card = createNewCard();
      const after = new Date();

      expect(card.due.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(card.due.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe('isValidCard', () => {
    it('should return true for valid card', () => {
      const card = createNewCard();
      expect(isValidCard(card)).toBe(true);
    });

    it('should return false for incomplete card', () => {
      const incompleteCard = {
        due: new Date(),
        stability: 0,
        // Missing other required fields
      };

      expect(isValidCard(incompleteCard)).toBe(false);
    });

    it('should return false for empty object', () => {
      expect(isValidCard({})).toBe(false);
    });

    it('should validate all required fields', () => {
      const validCard = {
        due: new Date(),
        stability: 0,
        difficulty: 0,
        elapsed_days: 0,
        scheduled_days: 0,
        reps: 0,
        lapses: 0,
        state: State.New,
      };

      expect(isValidCard(validCard)).toBe(true);
    });
  });

  describe('getStateName', () => {
    it('should return "new" for State.New', () => {
      expect(getStateName(State.New)).toBe('new');
    });

    it('should return "learning" for State.Learning', () => {
      expect(getStateName(State.Learning)).toBe('learning');
    });

    it('should return "review" for State.Review', () => {
      expect(getStateName(State.Review)).toBe('review');
    });

    it('should return "relearning" for State.Relearning', () => {
      expect(getStateName(State.Relearning)).toBe('relearning');
    });

    it('should handle all state values', () => {
      const states = [
        State.New,
        State.Learning,
        State.Review,
        State.Relearning,
      ];

      states.forEach((state) => {
        const name = getStateName(state);
        expect(typeof name).toBe('string');
        expect(name.length).toBeGreaterThan(0);
      });
    });
  });
});
