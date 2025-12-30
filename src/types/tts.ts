/**
 * Text-to-Speech System Types
 *
 * Type definitions for the TTS and pronunciation system used throughout
 * the Netter's Anatomy Learning Tool.
 */

/**
 * TTS playback speed options
 */
export type TTSRate = 0.75 | 1 | 1.25 | 1.5;

/**
 * TTS playback state
 */
export type TTSState = 'idle' | 'playing' | 'paused' | 'stopped';

/**
 * Options for TTS playback
 */
export interface TTSOptions {
  /**
   * Playback rate (speed multiplier)
   * @default 1
   */
  rate?: TTSRate;

  /**
   * Voice name to use for synthesis
   * If not specified, uses system default or user preference
   */
  voice?: string;

  /**
   * Voice pitch (0.5 to 2.0)
   * @default 1
   */
  pitch?: number;

  /**
   * Volume (0 to 1)
   * @default 1
   */
  volume?: number;

  /**
   * Language code (e.g., 'en-US')
   * @default 'en-US'
   */
  lang?: string;
}

/**
 * TTS event handlers
 */
export interface TTSEventHandlers {
  onStart?: () => void;
  onEnd?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onError?: (error: Error) => void;
  onBoundary?: (event: SpeechSynthesisEvent) => void;
}

/**
 * Complete TTS configuration including options and event handlers
 */
export interface TTSConfig extends TTSOptions {
  handlers?: TTSEventHandlers;
}

/**
 * Pronunciation entry for medical terms
 */
export interface PronunciationEntry {
  /**
   * The anatomical term
   */
  term: string;

  /**
   * IPA (International Phonetic Alphabet) notation
   */
  ipa: string;

  /**
   * Simplified pronunciation guide
   */
  guide: string;

  /**
   * Alternative pronunciations (if applicable)
   */
  alternatives?: string[];

  /**
   * SSML (Speech Synthesis Markup Language) override
   * For fine-tuned pronunciation control
   */
  ssml?: string;
}

/**
 * TTS service interface for dependency injection and testing
 */
export interface ITTSService {
  speak(text: string, options?: TTSOptions): void;
  speakWithPronunciation(text: string, options?: TTSOptions): void;
  pause(): void;
  resume(): void;
  stop(): void;
  setRate(rate: TTSRate): void;
  setVoice(voiceName: string): void;
  getVoices(): SpeechSynthesisVoice[];
  getCurrentVoice(): SpeechSynthesisVoice | null;
  isSupported(): boolean;
  isSpeaking(): boolean;
  isPaused(): boolean;
  getState(): TTSState;
}

/**
 * User TTS preferences stored in settings
 */
export interface TTSPreferences {
  defaultRate: TTSRate;
  defaultVoice: string | null;
  autoReadQuizQuestions: boolean;
  autoReadQuizFeedback: boolean;
  pronunciationOnlyMode: boolean;
  volume: number;
}
