/**
 * Text-to-Speech Service
 *
 * Provides a robust wrapper around the Web Speech API's SpeechSynthesis interface
 * with enhanced features for medical terminology pronunciation.
 *
 * Features:
 * - Voice selection and management
 * - Playback rate control (0.75x - 1.5x)
 * - Medical term pronunciation via custom lexicon
 * - Event handling for playback state
 * - Browser compatibility detection
 */

import type { TTSOptions, TTSState, TTSEventHandlers, ITTSService } from '@/types/tts';
import { formatForTTS } from './pronunciation';

/**
 * Default TTS configuration
 */
const DEFAULT_OPTIONS: Required<TTSOptions> = {
  rate: 1,
  voice: '',
  pitch: 1,
  volume: 1,
  lang: 'en-US',
};

/**
 * TTS Service Implementation
 * Singleton service for managing Text-to-Speech across the application
 */
export class TTSService implements ITTSService {
  private synth: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private currentVoice: SpeechSynthesisVoice | null = null;
  private currentRate: number = DEFAULT_OPTIONS.rate;
  private state: TTSState = 'idle';
  private eventHandlers: TTSEventHandlers = {};

  constructor() {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      throw new Error('SpeechSynthesis API not available in this environment');
    }

    this.synth = window.speechSynthesis;
    this.loadVoices();

    // Load voices when they become available (some browsers load async)
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  /**
   * Load available voices from the browser
   */
  private loadVoices(): void {
    this.voices = this.synth.getVoices();

    // Try to find a good default English voice
    if (!this.currentVoice && this.voices.length > 0) {
      // Prefer US English voices
      const preferredVoice =
        this.voices.find((voice) => voice.lang === 'en-US' && voice.localService) ||
        this.voices.find((voice) => voice.lang.startsWith('en')) ||
        this.voices[0];

      this.currentVoice = preferredVoice ?? null;
    }
  }

  /**
   * Create and configure a new utterance
   */
  private createUtterance(text: string, options?: TTSOptions): SpeechSynthesisUtterance {
    const utterance = new SpeechSynthesisUtterance(text);
    const opts = { ...DEFAULT_OPTIONS, ...options };

    utterance.rate = opts.rate ?? this.currentRate;
    utterance.pitch = opts.pitch;
    utterance.volume = opts.volume;
    utterance.lang = opts.lang;

    // Set voice if specified or use current default
    if (opts.voice) {
      const voice = this.voices.find((v) => v.name === opts.voice);
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
      this.utterance = null;
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
      console.error('TTS error:', event);
      this.state = 'idle';
      this.utterance = null;
      this.eventHandlers.onError?.(new Error(event.error || 'Unknown TTS error'));
    };

    utterance.onboundary = (event) => {
      this.eventHandlers.onBoundary?.(event);
    };

    return utterance;
  }

  /**
   * Speak text using the TTS engine
   * @param text Text to speak
   * @param options TTS configuration options
   */
  speak(text: string, options?: TTSOptions): void {
    if (!text.trim()) {
      console.warn('TTS: Empty text provided');
      return;
    }

    // Stop any current speech
    this.stop();

    // Create and speak utterance
    this.utterance = this.createUtterance(text, options);
    this.synth.speak(this.utterance);
  }

  /**
   * Speak text with medical term pronunciation enhancement
   * Formats text using the pronunciation lexicon before speaking
   * @param text Text containing medical terms
   * @param options TTS configuration options
   */
  speakWithPronunciation(text: string, options?: TTSOptions): void {
    const formattedText = formatForTTS(text);
    this.speak(formattedText, options);
  }

  /**
   * Pause current speech
   */
  pause(): void {
    if (this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
    }
  }

  /**
   * Resume paused speech
   */
  resume(): void {
    if (this.synth.paused) {
      this.synth.resume();
    }
  }

  /**
   * Stop current speech and clear queue
   */
  stop(): void {
    if (this.synth.speaking || this.synth.pending) {
      this.synth.cancel();
      this.state = 'stopped';
      this.utterance = null;
    }
  }

  /**
   * Set playback rate
   * @param rate Speed multiplier (0.75, 1, 1.25, 1.5)
   */
  setRate(rate: number): void {
    this.currentRate = rate;
    if (this.utterance) {
      // Update current utterance if speaking
      this.utterance.rate = rate;
    }
  }

  /**
   * Set voice by name
   * @param voiceName Name of the voice to use
   */
  setVoice(voiceName: string): void {
    const voice = this.voices.find((v) => v.name === voiceName);
    if (voice) {
      this.currentVoice = voice;
    } else {
      console.warn(`Voice "${voiceName}" not found`);
    }
  }

  /**
   * Get list of available voices
   */
  getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  /**
   * Get currently selected voice
   */
  getCurrentVoice(): SpeechSynthesisVoice | null {
    return this.currentVoice;
  }

  /**
   * Check if TTS is supported in this browser
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
    return this.synth.paused;
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

/**
 * Singleton TTS service instance
 * Use this throughout the application for consistent TTS behavior
 */
let ttsServiceInstance: TTSService | null = null;

/**
 * Get the singleton TTS service instance
 * Creates instance on first call
 */
export function getTTSService(): TTSService {
  if (!ttsServiceInstance) {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      ttsServiceInstance = new TTSService();
    } else {
      throw new Error('TTS not supported in this environment');
    }
  }
  return ttsServiceInstance;
}

/**
 * Export singleton instance for convenience
 * Note: In SSR environments, check isSupported() before using
 */
export const ttsService = typeof window !== 'undefined' ? getTTSService() : null;

// Re-export types and utilities
export type { TTSOptions, TTSState, TTSEventHandlers, ITTSService } from '@/types/tts';
export * from './pronunciation';
