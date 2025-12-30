import { afterEach, vi, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Note: @testing-library/jest-dom/vitest auto-extends vitest expectations

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// ============================================================================
// Browser API Mocks
// ============================================================================

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(
    public callback: IntersectionObserverCallback,
    public options?: IntersectionObserverInit
  ) {}

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds = [];
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(public callback: ResizeObserverCallback) {}

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
} as any;

// ============================================================================
// Web Speech API Mock
// ============================================================================

// Mock SpeechSynthesisUtterance
global.SpeechSynthesisUtterance = class SpeechSynthesisUtterance {
  text = '';
  lang = '';
  voice = null;
  volume = 1;
  rate = 1;
  pitch = 1;
  onstart = null;
  onend = null;
  onerror = null;
  onpause = null;
  onresume = null;
  onmark = null;
  onboundary = null;

  constructor(text?: string) {
    if (text) this.text = text;
  }
} as any;

// Mock SpeechSynthesisVoice
class MockSpeechSynthesisVoice {
  voiceURI = 'mock-voice';
  name = 'Mock Voice';
  lang = 'en-US';
  localService = true;
  default = true;
}

// Mock speechSynthesis
const mockVoices = [new MockSpeechSynthesisVoice()];

Object.defineProperty(window, 'speechSynthesis', {
  writable: true,
  value: {
    speak: vi.fn(),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    getVoices: vi.fn(() => mockVoices),
    speaking: false,
    pending: false,
    paused: false,
    onvoiceschanged: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  },
});

// ============================================================================
// IndexedDB Mock (for Dexie)
// ============================================================================

// Use fake-indexeddb for better IndexedDB mocking
beforeAll(() => {
  // Basic IndexedDB mock - can be enhanced with fake-indexeddb package if needed
  const indexedDB = {
    open: vi.fn(() => ({
      onsuccess: null,
      onerror: null,
      onupgradeneeded: null,
    })),
    deleteDatabase: vi.fn(),
    databases: vi.fn(() => Promise.resolve([])),
  };

  Object.defineProperty(window, 'indexedDB', {
    writable: true,
    value: indexedDB,
  });
});

// ============================================================================
// Canvas & WebGL Mocks (for Three.js)
// ============================================================================

// Mock HTMLCanvasElement.getContext
HTMLCanvasElement.prototype.getContext = vi.fn((contextId: string) => {
  if (contextId === '2d') {
    return {
      fillRect: vi.fn(),
      clearRect: vi.fn(),
      getImageData: vi.fn(() => ({
        data: new Array(4),
      })),
      putImageData: vi.fn(),
      createImageData: vi.fn(() => []),
      setTransform: vi.fn(),
      drawImage: vi.fn(),
      save: vi.fn(),
      fillText: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      stroke: vi.fn(),
      translate: vi.fn(),
      scale: vi.fn(),
      rotate: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      measureText: vi.fn(() => ({ width: 0 })),
      transform: vi.fn(),
      rect: vi.fn(),
      clip: vi.fn(),
    };
  }
  if (contextId === 'webgl' || contextId === 'webgl2') {
    return {
      canvas: {},
      getExtension: vi.fn(),
      getParameter: vi.fn(),
      getShaderPrecisionFormat: vi.fn(() => ({
        precision: 1,
        rangeMin: 1,
        rangeMax: 1,
      })),
    };
  }
  return null;
}) as any;

// ============================================================================
// Console Suppressions (for cleaner test output)
// ============================================================================

// Suppress console errors/warnings in tests unless explicitly needed
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args: any[]) => {
    // Suppress React warnings about act() and missing keys
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: An update to') ||
        args[0].includes('Warning: Each child') ||
        args[0].includes('Not implemented: HTMLFormElement'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args: any[]) => {
    // Suppress common warnings
    if (
      typeof args[0] === 'string' &&
      args[0].includes('React Router Future Flag Warning')
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterEach(() => {
  console.error = originalError;
  console.warn = originalWarn;
});
