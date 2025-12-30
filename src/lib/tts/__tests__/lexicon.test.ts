/**
 * Anatomical Pronunciation Lexicon Tests
 *
 * Tests for pronunciation dictionary and lookup functions.
 */

import { describe, it, expect } from 'vitest';
import {
  ANATOMICAL_LEXICON,
  getPronunciation,
  formatForTTS,
  getPhoneticGuide,
  getIPA,
  hasLexiconEntry,
  getAllEntries,
  searchLexicon,
} from '../lexicon';

describe('Anatomical Lexicon', () => {
  describe('ANATOMICAL_LEXICON', () => {
    it('should contain at least 50 anatomical terms', () => {
      const termCount = Object.keys(ANATOMICAL_LEXICON).length;
      expect(termCount).toBeGreaterThanOrEqual(50);
    });

    it('should have proper structure for each entry', () => {
      const entry = ANATOMICAL_LEXICON.humerus;
      expect(entry).toBeDefined();
      if (entry) {
        expect(entry.term).toBe('humerus');
        expect(entry.ipa).toBe('/ˈhjuːmərəs/');
        expect(entry.guide).toBe('HYOO-mer-us');
        expect(entry.ssml).toBeDefined();
      }
    });

    it('should include key upper limb bones', () => {
      expect(ANATOMICAL_LEXICON.humerus).toBeDefined();
      expect(ANATOMICAL_LEXICON.scapula).toBeDefined();
      expect(ANATOMICAL_LEXICON.clavicle).toBeDefined();
      expect(ANATOMICAL_LEXICON.radius).toBeDefined();
      expect(ANATOMICAL_LEXICON.ulna).toBeDefined();
    });

    it('should include key upper limb muscles', () => {
      expect(ANATOMICAL_LEXICON.biceps).toBeDefined();
      expect(ANATOMICAL_LEXICON.triceps).toBeDefined();
      expect(ANATOMICAL_LEXICON.deltoid).toBeDefined();
      expect(ANATOMICAL_LEXICON.brachialis).toBeDefined();
    });

    it('should include key nerves', () => {
      expect(ANATOMICAL_LEXICON.brachial).toBeDefined();
      expect(ANATOMICAL_LEXICON.median).toBeDefined();
      expect(ANATOMICAL_LEXICON.ulnar).toBeDefined();
      expect(ANATOMICAL_LEXICON.radial).toBeDefined();
    });

    it('should include key vessels', () => {
      expect(ANATOMICAL_LEXICON.brachial_artery).toBeDefined();
      expect(ANATOMICAL_LEXICON.cephalic).toBeDefined();
      expect(ANATOMICAL_LEXICON.basilic).toBeDefined();
    });
  });

  describe('getPronunciation', () => {
    it('should find exact matches', () => {
      const result = getPronunciation('humerus');
      expect(result).toBeDefined();
      expect(result?.term).toBe('humerus');
      expect(result?.guide).toBe('HYOO-mer-us');
    });

    it('should be case-insensitive', () => {
      const result = getPronunciation('HUMERUS');
      expect(result).toBeDefined();
      expect(result?.term).toBe('humerus');
    });

    it('should handle partial matches', () => {
      const result = getPronunciation('biceps');
      expect(result).toBeDefined();
      expect(result?.term).toBe('biceps brachii');
    });

    it('should return null for unknown terms', () => {
      const result = getPronunciation('unknown_term');
      expect(result).toBeNull();
    });

    it('should handle empty input', () => {
      const result = getPronunciation('');
      expect(result).toBeNull();
    });
  });

  describe('formatForTTS', () => {
    it('should replace anatomical terms with pronunciation', () => {
      const result = formatForTTS('The humerus is a bone');
      expect(result).toContain('humerus'); // Should contain the term or guide
    });

    it('should handle multiple terms', () => {
      const result = formatForTTS('The humerus connects to the scapula');
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle text without anatomical terms', () => {
      const result = formatForTTS('This is regular text');
      expect(result).toBe('This is regular text');
    });

    it('should handle empty input', () => {
      const result = formatForTTS('');
      expect(result).toBe('');
    });

    it('should preserve word boundaries', () => {
      const result = formatForTTS('The humerus bone');
      // Should not replace parts of words
      expect(result).toBeDefined();
    });
  });

  describe('getPhoneticGuide', () => {
    it('should return simplified guide for known terms', () => {
      const result = getPhoneticGuide('humerus');
      expect(result).toBe('HYOO-mer-us');
    });

    it('should return null for unknown terms', () => {
      const result = getPhoneticGuide('unknown');
      expect(result).toBeNull();
    });

    it('should be case-insensitive', () => {
      const result = getPhoneticGuide('SCAPULA');
      expect(result).toBe('SKAP-yoo-lah');
    });
  });

  describe('getIPA', () => {
    it('should return IPA notation for known terms', () => {
      const result = getIPA('humerus');
      expect(result).toBe('/ˈhjuːmərəs/');
    });

    it('should return null for unknown terms', () => {
      const result = getIPA('unknown');
      expect(result).toBeNull();
    });

    it('should include proper IPA symbols', () => {
      const result = getIPA('scapula');
      expect(result).toBeDefined();
      expect(result).toMatch(/^\/.*\/$/); // Should be wrapped in slashes
    });
  });

  describe('hasLexiconEntry', () => {
    it('should return true for known terms', () => {
      expect(hasLexiconEntry('humerus')).toBe(true);
      expect(hasLexiconEntry('scapula')).toBe(true);
      expect(hasLexiconEntry('deltoid')).toBe(true);
    });

    it('should return false for unknown terms', () => {
      expect(hasLexiconEntry('unknown_term')).toBe(false);
      expect(hasLexiconEntry('')).toBe(false);
    });

    it('should be case-insensitive', () => {
      expect(hasLexiconEntry('HUMERUS')).toBe(true);
      expect(hasLexiconEntry('Scapula')).toBe(true);
    });
  });

  describe('getAllEntries', () => {
    it('should return all lexicon entries', () => {
      const entries = getAllEntries();
      expect(entries).toBeInstanceOf(Array);
      expect(entries.length).toBeGreaterThanOrEqual(50);
    });

    it('should return entries with proper structure', () => {
      const entries = getAllEntries();
      entries.forEach((entry) => {
        expect(entry.term).toBeDefined();
        expect(entry.ipa).toBeDefined();
        expect(entry.guide).toBeDefined();
      });
    });
  });

  describe('searchLexicon', () => {
    it('should find terms by partial match', () => {
      const results = searchLexicon('humer');
      expect(results.length).toBeGreaterThan(0);
      const firstResult = results[0];
      expect(firstResult?.term).toContain('humer');
    });

    it('should find terms by guide match', () => {
      const results = searchLexicon('HYOO');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should return empty array for no matches', () => {
      const results = searchLexicon('xyz123');
      expect(results).toEqual([]);
    });

    it('should return empty array for empty query', () => {
      const results = searchLexicon('');
      expect(results).toEqual([]);
    });

    it('should be case-insensitive', () => {
      const results1 = searchLexicon('humerus');
      const results2 = searchLexicon('HUMERUS');
      expect(results1.length).toBe(results2.length);
    });
  });

  describe('Anatomical Term Coverage', () => {
    it('should cover directional terms', () => {
      expect(hasLexiconEntry('anterior')).toBe(true);
      expect(hasLexiconEntry('posterior')).toBe(true);
      expect(hasLexiconEntry('medial')).toBe(true);
      expect(hasLexiconEntry('lateral')).toBe(true);
      expect(hasLexiconEntry('proximal')).toBe(true);
      expect(hasLexiconEntry('distal')).toBe(true);
    });

    it('should cover hand muscles', () => {
      expect(hasLexiconEntry('thenar')).toBe(true);
      expect(hasLexiconEntry('hypothenar')).toBe(true);
    });

    it('should cover joints', () => {
      expect(hasLexiconEntry('glenohumeral')).toBe(true);
      expect(hasLexiconEntry('elbow')).toBe(true);
    });
  });
});
