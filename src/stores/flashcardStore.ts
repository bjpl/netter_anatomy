import { create } from 'zustand';

export type FlashcardRating = 'again' | 'hard' | 'good' | 'easy';

export interface SessionStats {
  reviewed: number;
  correct: number;
  ratings: {
    again: number;
    hard: number;
    good: number;
    easy: number;
  };
}

export interface FlashcardState {
  currentSessionCards: string[];
  currentCardIndex: number;
  isRevealed: boolean;
  sessionStats: SessionStats;
  isSessionActive: boolean;

  // Actions
  startSession: (cardIds: string[]) => void;
  revealCard: () => void;
  rateCard: (rating: FlashcardRating) => void;
  nextCard: () => void;
  previousCard: () => void;
  endSession: () => void;
  reset: () => void;
}

const INITIAL_STATS: SessionStats = {
  reviewed: 0,
  correct: 0,
  ratings: {
    again: 0,
    hard: 0,
    good: 0,
    easy: 0,
  },
};

export const useFlashcardStore = create<FlashcardState>((set, _get) => ({
  // Initial state
  currentSessionCards: [],
  currentCardIndex: 0,
  isRevealed: false,
  sessionStats: INITIAL_STATS,
  isSessionActive: false,

  // Actions
  startSession: (cardIds) =>
    set({
      currentSessionCards: cardIds,
      currentCardIndex: 0,
      isRevealed: false,
      sessionStats: INITIAL_STATS,
      isSessionActive: true,
    }),

  revealCard: () =>
    set({ isRevealed: true }),

  rateCard: (rating) =>
    set((state) => {
      const isCorrect = rating === 'good' || rating === 'easy';
      return {
        sessionStats: {
          reviewed: state.sessionStats.reviewed + 1,
          correct: state.sessionStats.correct + (isCorrect ? 1 : 0),
          ratings: {
            ...state.sessionStats.ratings,
            [rating]: state.sessionStats.ratings[rating] + 1,
          },
        },
      };
    }),

  nextCard: () =>
    set((state) => {
      const nextIndex = state.currentCardIndex + 1;
      if (nextIndex >= state.currentSessionCards.length) {
        // End of session
        return {
          isSessionActive: false,
          isRevealed: false,
        };
      }
      return {
        currentCardIndex: nextIndex,
        isRevealed: false,
      };
    }),

  previousCard: () =>
    set((state) => ({
      currentCardIndex: Math.max(0, state.currentCardIndex - 1),
      isRevealed: false,
    })),

  endSession: () =>
    set({
      isSessionActive: false,
      currentSessionCards: [],
      currentCardIndex: 0,
      isRevealed: false,
    }),

  reset: () =>
    set({
      currentSessionCards: [],
      currentCardIndex: 0,
      isRevealed: false,
      sessionStats: INITIAL_STATS,
      isSessionActive: false,
    }),
}));
