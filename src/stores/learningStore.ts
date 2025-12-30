import { create } from 'zustand';

export interface LearningState {
  currentChapterId: string | null;
  currentModuleId: string | null;
  moduleProgress: number; // 0-100

  // Actions
  setCurrentChapter: (id: string) => void;
  setCurrentModule: (id: string) => void;
  updateModuleProgress: (progress: number) => void;
  completeModule: () => void;
  reset: () => void;
}

export const useLearningStore = create<LearningState>((set) => ({
  // Initial state
  currentChapterId: null,
  currentModuleId: null,
  moduleProgress: 0,

  // Actions
  setCurrentChapter: (id) =>
    set({ currentChapterId: id }),

  setCurrentModule: (id) =>
    set({ currentModuleId: id, moduleProgress: 0 }),

  updateModuleProgress: (progress) =>
    set({ moduleProgress: Math.max(0, Math.min(100, progress)) }),

  completeModule: () =>
    set({ moduleProgress: 100 }),

  reset: () =>
    set({
      currentChapterId: null,
      currentModuleId: null,
      moduleProgress: 0,
    }),
}));
