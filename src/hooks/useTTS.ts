/**
 * useTTS Hook
 *
 * React hook for managing Text-to-Speech functionality in components.
 * Provides a clean interface to the TTS service with state management.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { getTTSService } from '@/lib/tts';
import { getPronunciation } from '@/lib/tts/pronunciation';
import type { TTSOptions, TTSState, TTSRate } from '@/types/tts';

/**
 * TTS Hook configuration options
 */
interface UseTTSOptions {
  /**
   * Auto-stop on component unmount
   * @default true
   */
  autoStop?: boolean;

  /**
   * Default playback rate
   * @default 1
   */
  defaultRate?: TTSRate;

  /**
   * Default voice name
   */
  defaultVoice?: string;

  /**
   * Callback when speech starts
   */
  onStart?: () => void;

  /**
   * Callback when speech ends
   */
  onEnd?: () => void;

  /**
   * Callback when speech is paused
   */
  onPause?: () => void;

  /**
   * Callback when speech is resumed
   */
  onResume?: () => void;

  /**
   * Callback on error
   */
  onError?: (error: Error) => void;
}

/**
 * TTS Hook return type
 */
interface UseTTSReturn {
  /**
   * Current playback state
   */
  state: TTSState;

  /**
   * Is currently speaking
   */
  isPlaying: boolean;

  /**
   * Is currently paused
   */
  isPaused: boolean;

  /**
   * Is TTS supported in this browser
   */
  isSupported: boolean;

  /**
   * Current playback rate
   */
  rate: TTSRate;

  /**
   * Available voices
   */
  voices: SpeechSynthesisVoice[];

  /**
   * Currently selected voice
   */
  currentVoice: SpeechSynthesisVoice | null;

  /**
   * Speak plain text
   */
  speak: (text: string, options?: TTSOptions) => void;

  /**
   * Speak anatomical term with correct pronunciation
   */
  speakTerm: (term: string, options?: TTSOptions) => void;

  /**
   * Speak text with medical terminology formatting
   */
  speakWithPronunciation: (text: string, options?: TTSOptions) => void;

  /**
   * Pause current speech
   */
  pause: () => void;

  /**
   * Resume paused speech
   */
  resume: () => void;

  /**
   * Stop speech and clear queue
   */
  stop: () => void;

  /**
   * Set playback rate
   */
  setRate: (rate: TTSRate) => void;

  /**
   * Set voice by name
   */
  setVoice: (voiceName: string) => void;

  /**
   * Toggle play/pause
   */
  togglePlayPause: () => void;
}

/**
 * React hook for Text-to-Speech functionality
 */
export function useTTS(options: UseTTSOptions = {}): UseTTSReturn {
  const {
    autoStop = true,
    defaultRate = 1,
    defaultVoice,
    onStart,
    onEnd,
    onPause,
    onResume,
    onError,
  } = options;

  const [state, setState] = useState<TTSState>('idle');
  const [rate, setRateState] = useState<TTSRate>(defaultRate);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  const ttsRef = useRef(getTTSService());

  // Initialize TTS service and load voices
  useEffect(() => {
    const tts = ttsRef.current;

    if (!tts) {
      setIsSupported(false);
      return;
    }

    setIsSupported(tts.isSupported());

    if (tts.isSupported()) {
      // Load voices
      const loadVoices = () => {
        const availableVoices = tts.getVoices();
        setVoices(availableVoices);

        const current = tts.getCurrentVoice();
        setCurrentVoice(current);

        // Set default voice if specified
        if (defaultVoice && availableVoices.length > 0) {
          tts.setVoice(defaultVoice);
          setCurrentVoice(tts.getCurrentVoice());
        }
      };

      loadVoices();

      // Voices may load asynchronously in some browsers
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }

      // Set event handlers
      tts.setEventHandlers({
        onStart: () => {
          setState('playing');
          onStart?.();
        },
        onEnd: () => {
          setState('idle');
          onEnd?.();
        },
        onPause: () => {
          setState('paused');
          onPause?.();
        },
        onResume: () => {
          setState('playing');
          onResume?.();
        },
        onError: (error) => {
          setState('idle');
          onError?.(error);
        },
      });

      // Set initial rate
      tts.setRate(defaultRate);
    }

    // Cleanup on unmount
    return () => {
      if (autoStop) {
        tts?.stop();
      }
      tts?.clearEventHandlers();
    };
  }, [autoStop, defaultRate, defaultVoice, onStart, onEnd, onPause, onResume, onError]);

  /**
   * Speak plain text
   */
  const speak = useCallback(
    (text: string, speakOptions?: TTSOptions) => {
      const tts = ttsRef.current;
      if (!tts) return;

      const opts = {
        rate,
        ...speakOptions,
      };

      tts.speak(text, opts);
    },
    [rate]
  );

  /**
   * Speak anatomical term with proper pronunciation
   */
  const speakTerm = useCallback(
    (term: string, speakOptions?: TTSOptions) => {
      const tts = ttsRef.current;
      if (!tts) return;

      // Check if we have pronunciation data
      const pronunciation = getPronunciation(term);

      if (pronunciation?.ssml) {
        // Use SSML if available (some browsers support it)
        speak(pronunciation.ssml, speakOptions);
      } else if (pronunciation?.guide) {
        // Fall back to simplified guide
        speak(pronunciation.guide, speakOptions);
      } else {
        // Fall back to plain term
        speak(term, speakOptions);
      }
    },
    [speak]
  );

  /**
   * Speak text with medical terminology pronunciation enhancements
   */
  const speakWithPronunciation = useCallback(
    (text: string, speakOptions?: TTSOptions) => {
      const tts = ttsRef.current;
      if (!tts) return;

      const opts = {
        rate,
        ...speakOptions,
      };

      tts.speakWithPronunciation(text, opts);
    },
    [rate]
  );

  /**
   * Pause current speech
   */
  const pause = useCallback(() => {
    ttsRef.current?.pause();
  }, []);

  /**
   * Resume paused speech
   */
  const resume = useCallback(() => {
    ttsRef.current?.resume();
  }, []);

  /**
   * Stop speech and clear queue
   */
  const stop = useCallback(() => {
    ttsRef.current?.stop();
    setState('idle');
  }, []);

  /**
   * Set playback rate
   */
  const setRate = useCallback((newRate: TTSRate) => {
    setRateState(newRate);
    ttsRef.current?.setRate(newRate);
  }, []);

  /**
   * Set voice by name
   */
  const setVoice = useCallback((voiceName: string) => {
    const tts = ttsRef.current;
    if (!tts) return;

    tts.setVoice(voiceName);
    setCurrentVoice(tts.getCurrentVoice());
  }, []);

  /**
   * Toggle between play and pause
   */
  const togglePlayPause = useCallback(() => {
    if (state === 'playing') {
      pause();
    } else if (state === 'paused') {
      resume();
    }
  }, [state, pause, resume]);

  return {
    state,
    isPlaying: state === 'playing',
    isPaused: state === 'paused',
    isSupported,
    rate,
    voices,
    currentVoice,
    speak,
    speakTerm,
    speakWithPronunciation,
    pause,
    resume,
    stop,
    setRate,
    setVoice,
    togglePlayPause,
  };
}

/**
 * Helper hook for simple term pronunciation
 * Simplified version of useTTS focused on single-term pronunciation
 */
export function useTermPronunciation() {
  const { speakTerm, isSupported } = useTTS({ autoStop: true });

  const pronounce = useCallback(
    (term: string) => {
      speakTerm(term);
    },
    [speakTerm]
  );

  return {
    pronounce,
    isSupported,
  };
}
