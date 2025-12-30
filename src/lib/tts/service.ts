/**
 * Text-to-Speech Service Implementation
 *
 * Core TTS service using Web Speech API for anatomical term pronunciation.
 * Implements singleton pattern for global instance management.
 */

import type {
  ITTSService,
  TTSOptions,
  TTSRate,
  TTSState,
  TTSEventHandlers,
} from '../../types/tts';
import { formatForTTS } from './lexicon';

/**
 * Core TTS Service Implementation
 *
 * Features:
 * - Web Speech API integration
 * - Pronunciation lexicon support
 * - Playback controls (play, pause, resume, stop)
 * - Voice and rate configuration
 * - Event handling for lifecycle events
 */
export class TTSService implements ITTSService {
  private synth: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private state: TTSState = 'idle';
  private currentRate: TTSRate = 1;
  private currentVoice: SpeechSynthesisVoice | null = null;
  private eventHandlers: TTSEventHandlers = {};

  constructor() {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      throw new Error('Web Speech API is not supported in this environment');
    }

    this.synth = window.speechSynthesis;

    // Load voices (may be async on some browsers)
    this.loadVoices();

    // Handle voices changed event
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  /**
   * Load available voices from the browser
   */
  private loadVoices(): void {
    const voices = this.synth.getVoices();
    if (voices.length > 0) {

      // Set default to first English voice if no voice selected
      if (!this.currentVoice) {
        const englishVoice = voices.find(
          (voice) =>
            voice.lang.startsWith('en-') &&
            (voice.name.includes('Female') || voice.name.includes('Samantha'))
        );
        this.currentVoice = englishVoice ?? voices[0] ?? null;
      }
    }
  }

  /**
   * Create and configure a speech utterance
   */
  private createUtterance(text: string, options?: TTSOptions): SpeechSynthesisUtterance {
    const utterance = new SpeechSynthesisUtterance(text);

    // Apply options
    utterance.rate = options?.rate ?? this.currentRate;
    utterance.pitch = options?.pitch ?? 1;
    utterance.volume = options?.volume ?? 1;
    utterance.lang = options?.lang ?? 'en-US';

    // Set voice
    if (options?.voice) {
      const voice = this.getVoices().find((v) => v.name === options.voice);
      if (voice) {
        utterance.voice = voice;
      }
    } else if (this.currentVoice) {
      utterance.voice = this.currentVoice;
    }

    // Attach event handlers
    utterance.onstart = () => {
      this.state = 'playing';
      this.eventHandlers.onStart?.();
    };

    utterance.onend = () => {
      this.state = 'idle';
      this.currentUtterance = null;
      this.eventHandlers.onEnd?.();
    };

    utterance.onpause = () => {
      this.state = 'paused';
      this.eventHandlers.onPause?.();
    };

    utterance.onresume = () => {
      this.state = 'playing';
      this.eventHandlers.onResume?.();
    };

    utterance.onerror = (event) => {
      this.state = 'idle';
      this.currentUtterance = null;
      const error = new Error(`TTS Error: ${event.error}`);
      this.eventHandlers.onError?.(error);
    };

    utterance.onboundary = (event) => {
      this.eventHandlers.onBoundary?.(event);
    };

    return utterance;
  }

  /**
   * Speak plain text
   */
  speak(text: string, options?: TTSOptions): void {
    if (!text.trim()) return;

    // Stop any current speech
    this.stop();

    // Create and speak utterance
    this.currentUtterance = this.createUtterance(text, options);
    this.synth.speak(this.currentUtterance);
  }

  /**
   * Speak text with pronunciation lexicon applied
   * Automatically corrects anatomical term pronunciations
   */
  speakWithPronunciation(text: string, options?: TTSOptions): void {
    if (!text.trim()) return;

    // Format text with pronunciation corrections
    const formattedText = formatForTTS(text);

    // Speak formatted text
    this.speak(formattedText, options);
  }

  /**
   * Pause current speech
   */
  pause(): void {
    if (this.state === 'playing') {
      this.synth.pause();
    }
  }

  /**
   * Resume paused speech
   */
  resume(): void {
    if (this.state === 'paused') {
      this.synth.resume();
    }
  }

  /**
   * Stop current speech
   */
  stop(): void {
    if (this.state !== 'idle') {
      this.synth.cancel();
      this.state = 'idle';
      this.currentUtterance = null;
    }
  }

  /**
   * Set playback rate
   */
  setRate(rate: TTSRate): void {
    this.currentRate = rate;

    // Update current utterance if speaking
    if (this.currentUtterance) {
      this.currentUtterance.rate = rate;
    }
  }

  /**
   * Set voice by name
   */
  setVoice(voiceName: string): void {
    const voice = this.getVoices().find((v) => v.name === voiceName);
    if (voice) {
      this.currentVoice = voice;

      // Update current utterance if speaking
      if (this.currentUtterance) {
        this.currentUtterance.voice = voice;
      }
    }
  }

  /**
   * Get all available voices
   */
  getVoices(): SpeechSynthesisVoice[] {
    return this.synth.getVoices();
  }

  /**
   * Get currently selected voice
   */
  getCurrentVoice(): SpeechSynthesisVoice | null {
    return this.currentVoice;
  }

  /**
   * Check if Web Speech API is supported
   */
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  /**
   * Check if currently speaking
   */
  isSpeaking(): boolean {
    return this.synth.speaking;
  }

  /**
   * Check if speech is paused
   */
  isPaused(): boolean {
    return this.state === 'paused';
  }

  /**
   * Get current playback state
   */
  getState(): TTSState {
    return this.state;
  }

  /**
   * Set event handlers
   */
  setEventHandlers(handlers: TTSEventHandlers): void {
    this.eventHandlers = { ...this.eventHandlers, ...handlers };
  }

  /**
   * Clear all event handlers
   */
  clearEventHandlers(): void {
    this.eventHandlers = {};
  }
}

// Singleton instance
let ttsInstance: TTSService | null = null;

/**
 * Get the global TTS service instance
 * Creates instance on first call
 */
export function getTTSService(): TTSService {
  if (!ttsInstance) {
    try {
      ttsInstance = new TTSService();
    } catch (error) {
      console.warn('Failed to initialize TTS service:', error);
      throw error;
    }
  }
  return ttsInstance;
}

/**
 * Check if TTS is available in the current environment
 */
export function isTTSAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}
