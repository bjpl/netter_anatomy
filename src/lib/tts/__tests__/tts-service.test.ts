/**
 * Tests for TTS Service
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { TTSService } from '../index';

// Mock SpeechSynthesis API
class MockSpeechSynthesisUtterance {
  text: string;
  rate: number = 1;
  pitch: number = 1;
  volume: number = 1;
  voice: SpeechSynthesisVoice | null = null;
  lang: string = 'en-US';
  onstart: ((event: SpeechSynthesisEvent) => void) | null = null;
  onend: ((event: SpeechSynthesisEvent) => void) | null = null;
  onpause: ((event: SpeechSynthesisEvent) => void) | null = null;
  onresume: ((event: SpeechSynthesisEvent) => void) | null = null;
  onerror: ((event: SpeechSynthesisErrorEvent) => void) | null = null;
  onboundary: ((event: SpeechSynthesisEvent) => void) | null = null;

  constructor(text: string) {
    this.text = text;
  }
}

class MockSpeechSynthesis {
  speaking: boolean = false;
  pending: boolean = false;
  paused: boolean = false;
  onvoiceschanged: (() => void) | null = null;

  private voices: SpeechSynthesisVoice[] = [];

  speak(utterance: SpeechSynthesisUtterance) {
    this.speaking = true;
    this.paused = false;
    setTimeout(() => {
      if (utterance.onstart) {
        utterance.onstart({} as SpeechSynthesisEvent);
      }
    }, 10);
  }

  cancel() {
    this.speaking = false;
    this.pending = false;
    this.paused = false;
  }

  pause() {
    if (this.speaking && !this.paused) {
      this.paused = true;
    }
  }

  resume() {
    if (this.paused) {
      this.paused = false;
    }
  }

  getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  setVoices(voices: SpeechSynthesisVoice[]) {
    this.voices = voices;
    if (this.onvoiceschanged) {
      this.onvoiceschanged();
    }
  }
}

describe('TTSService', () => {
  let mockSynth: MockSpeechSynthesis;
  let service: TTSService;

  beforeEach(() => {
    mockSynth = new MockSpeechSynthesis();

    global.window = {
      speechSynthesis: mockSynth,
      SpeechSynthesisUtterance: MockSpeechSynthesisUtterance,
    } as any;

    global.speechSynthesis = mockSynth as any;

    const mockVoice1 = {
      name: 'English (US)',
      lang: 'en-US',
      localService: true,
      default: true,
    } as SpeechSynthesisVoice;

    const mockVoice2 = {
      name: 'English (UK)',
      lang: 'en-GB',
      localService: true,
      default: false,
    } as SpeechSynthesisVoice;

    mockSynth.setVoices([mockVoice1, mockVoice2]);

    service = new TTSService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize successfully', () => {
      expect(service).toBeDefined();
      expect(service.isSupported()).toBe(true);
    });

    it('should load voices', () => {
      const voices = service.getVoices();
      expect(voices.length).toBe(2);
      expect(voices[0]?.name).toBe('English (US)');
    });

    it('should select a default voice', () => {
      const currentVoice = service.getCurrentVoice();
      expect(currentVoice).toBeDefined();
      expect(currentVoice?.lang).toBe('en-US');
    });
  });

  describe('speak()', () => {
    it('should speak text', () => {
      const speakSpy = vi.spyOn(mockSynth, 'speak');
      service.speak('Hello world');

      expect(speakSpy).toHaveBeenCalled();
      expect(mockSynth.speaking).toBe(true);
    });

    it('should accept options', () => {
      const speakSpy = vi.spyOn(mockSynth, 'speak');
      service.speak('Hello world', { rate: 1.5, pitch: 1.2 });

      expect(speakSpy).toHaveBeenCalled();
    });

    it('should not speak empty text', () => {
      const speakSpy = vi.spyOn(mockSynth, 'speak');
      service.speak('');

      expect(speakSpy).not.toHaveBeenCalled();
    });

    it('should stop previous speech before speaking new text', () => {
      const cancelSpy = vi.spyOn(mockSynth, 'cancel');

      service.speak('First text');
      service.speak('Second text');

      expect(cancelSpy).toHaveBeenCalled();
    });
  });

  describe('pause() and resume()', () => {
    it('should pause speaking', () => {
      const pauseSpy = vi.spyOn(mockSynth, 'pause');
      service.speak('Hello world');
      service.pause();

      expect(pauseSpy).toHaveBeenCalled();
    });

    it('should resume paused speech', () => {
      const resumeSpy = vi.spyOn(mockSynth, 'resume');
      mockSynth.paused = true;
      service.resume();

      expect(resumeSpy).toHaveBeenCalled();
    });
  });

  describe('stop()', () => {
    it('should stop speaking', () => {
      const cancelSpy = vi.spyOn(mockSynth, 'cancel');
      service.speak('Hello world');
      service.stop();

      expect(cancelSpy).toHaveBeenCalled();
    });
  });

  describe('State Management', () => {
    it('should track speaking state', () => {
      expect(service.getState()).toBe('idle');
    });

    it('should report isSpeaking correctly', () => {
      service.speak('Hello world');
      expect(service.isSpeaking()).toBe(true);

      service.stop();
      expect(service.isSpeaking()).toBe(false);
    });
  });

  describe('Browser Support', () => {
    it('should detect support', () => {
      expect(service.isSupported()).toBe(true);
    });
  });
});
