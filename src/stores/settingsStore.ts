import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';
export type TTSSpeed = 0.75 | 1 | 1.25 | 1.5;

export interface SettingsState {
  // Appearance
  theme: Theme;
  highContrastMode: boolean;
  colorblindMode: boolean;
  reducedMotion: boolean;

  // Text-to-Speech
  ttsEnabled: boolean;
  ttsSpeed: TTSSpeed;

  // Learning
  newCardsPerDay: number;
  maxReviewsPerDay: number;

  // Actions
  setTheme: (theme: Theme) => void;
  setHighContrastMode: (enabled: boolean) => void;
  setColorblindMode: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  setTTSEnabled: (enabled: boolean) => void;
  setTTSSpeed: (speed: TTSSpeed) => void;
  setNewCardsPerDay: (count: number) => void;
  setMaxReviewsPerDay: (count: number) => void;
  resetToDefaults: () => void;
}

const DEFAULT_SETTINGS = {
  theme: 'system' as Theme,
  highContrastMode: false,
  colorblindMode: false,
  reducedMotion: false,
  ttsEnabled: false,
  ttsSpeed: 1 as TTSSpeed,
  newCardsPerDay: 20,
  maxReviewsPerDay: 100,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Initial state
      ...DEFAULT_SETTINGS,

      // Actions
      setTheme: (theme) =>
        set({ theme }),

      setHighContrastMode: (enabled) =>
        set({ highContrastMode: enabled }),

      setColorblindMode: (enabled) =>
        set({ colorblindMode: enabled }),

      setReducedMotion: (enabled) =>
        set({ reducedMotion: enabled }),

      setTTSEnabled: (enabled) =>
        set({ ttsEnabled: enabled }),

      setTTSSpeed: (speed) =>
        set({ ttsSpeed: speed }),

      setNewCardsPerDay: (count) =>
        set({ newCardsPerDay: Math.max(1, Math.min(100, count)) }),

      setMaxReviewsPerDay: (count) =>
        set({ maxReviewsPerDay: Math.max(1, Math.min(500, count)) }),

      resetToDefaults: () =>
        set(DEFAULT_SETTINGS),
    }),
    {
      name: 'netter-anatomy-settings',
      storage: createJSONStorage(() => localStorage),
      // Only persist these fields
      partialize: (state) => ({
        theme: state.theme,
        highContrastMode: state.highContrastMode,
        colorblindMode: state.colorblindMode,
        reducedMotion: state.reducedMotion,
        ttsEnabled: state.ttsEnabled,
        ttsSpeed: state.ttsSpeed,
        newCardsPerDay: state.newCardsPerDay,
        maxReviewsPerDay: state.maxReviewsPerDay,
      }),
    }
  )
);
