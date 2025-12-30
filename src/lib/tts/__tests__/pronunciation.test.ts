/**
 * TTS Pronunciation Lexicon Tests
 * Tests for pronunciation lookup, fuzzy matching, and lexicon integrity
 */

import { describe, it, expect } from 'vitest';
import {
  getPronunciation,
  getPronunciationGuide,
  getIPANotation,
  formatForTTS,
  hasPronunciation,
  getAllTerms,
  searchTerms,
  getTermsByCategory,
  pronunciationLexicon,
} from '../pronunciation';

describe('TTS Pronunciation Lexicon', () => {
  describe('getPronunciation', () => {
    it('should return pronunciation data for valid term', () => {
      const result = getPronunciation('biceps brachii');

      expect(result).toBeDefined();
      expect(result?.term).toBe('biceps brachii');
      expect(result?.ipa).toBeDefined();
      expect(result?.guide).toBe('BY-seps BRAY-kee-eye');
    });

    it('should be case-insensitive', () => {
      const lower = getPronunciation('biceps brachii');
      const upper = getPronunciation('BICEPS BRACHII');
      const mixed = getPronunciation('Biceps Brachii');

      expect(lower).toEqual(upper);
      expect(upper).toEqual(mixed);
    });

    it('should handle whitespace trimming', () => {
      const result = getPronunciation('  biceps brachii  ');

      expect(result).toBeDefined();
      expect(result?.term).toBe('biceps brachii');
    });

    it('should return null for unknown terms', () => {
      const result = getPronunciation('nonexistent muscle');

      expect(result).toBeNull();
    });

    it('should handle empty strings', () => {
      const result = getPronunciation('');

      expect(result).toBeNull();
    });
  });

  describe('getPronunciationGuide', () => {
    it('should return simplified guide for known terms', () => {
      const guide = getPronunciationGuide('sternocleidomastoid');

      expect(guide).toBe('STERN-oh-KLYE-doh-MASS-toyd');
    });

    it('should return null for unknown terms', () => {
      const guide = getPronunciationGuide('unknown term');

      expect(guide).toBeNull();
    });
  });

  describe('getIPANotation', () => {
    it('should return IPA notation for known terms', () => {
      const ipa = getIPANotation('masseter');

      expect(ipa).toBe('/məˈsiːtər/');
    });

    it('should return null for unknown terms', () => {
      const ipa = getIPANotation('unknown term');

      expect(ipa).toBeNull();
    });
  });

  describe('formatForTTS', () => {
    it('should replace terms with SSML phoneme tags', () => {
      const text = 'The biceps brachii is a major muscle.';
      const formatted = formatForTTS(text);

      expect(formatted).toContain('phoneme');
      expect(formatted).toContain('biceps brachii');
    });

    it('should handle text without special terms', () => {
      const text = 'This is a normal sentence.';
      const formatted = formatForTTS(text);

      expect(formatted).toBe(text);
    });

    it('should handle multiple occurrences', () => {
      const text = 'The pterygoid muscle and pterygoid process.';
      const formatted = formatForTTS(text);

      const matches = (formatted.match(/pterygoid/g) || []).length;
      expect(matches).toBeGreaterThanOrEqual(2);
    });

    it('should be case-insensitive', () => {
      const text = 'The BICEPS BRACHII is important.';
      const formatted = formatForTTS(text);

      expect(formatted).toContain('phoneme');
    });
  });

  describe('hasPronunciation', () => {
    it('should return true for known terms', () => {
      expect(hasPronunciation('trapezius')).toBe(true);
      expect(hasPronunciation('latissimus dorsi')).toBe(true);
    });

    it('should return false for unknown terms', () => {
      expect(hasPronunciation('unknown muscle')).toBe(false);
    });

    it('should be case-insensitive', () => {
      expect(hasPronunciation('TRAPEZIUS')).toBe(true);
      expect(hasPronunciation('Trapezius')).toBe(true);
    });
  });

  describe('getAllTerms', () => {
    it('should return array of all terms', () => {
      const terms = getAllTerms();

      expect(Array.isArray(terms)).toBe(true);
      expect(terms.length).toBeGreaterThan(0);
    });

    it('should contain expected terms', () => {
      const terms = getAllTerms();

      expect(terms).toContain('biceps brachii');
      expect(terms).toContain('trapezius');
      expect(terms).toContain('gastrocnemius');
    });

    it('should not contain duplicates', () => {
      const terms = getAllTerms();
      const uniqueTerms = new Set(terms);

      expect(terms.length).toBe(uniqueTerms.size);
    });
  });

  describe('searchTerms', () => {
    it('should find terms by partial match', () => {
      const results = searchTerms('biceps');

      expect(results.length).toBeGreaterThan(0);
      expect(results[0]?.term).toContain('biceps');
    });

    it('should be case-insensitive', () => {
      const lower = searchTerms('biceps');
      const upper = searchTerms('BICEPS');

      expect(lower.length).toBe(upper.length);
    });

    it('should return empty array for no matches', () => {
      const results = searchTerms('zzz-nonexistent-zzz');

      expect(results).toEqual([]);
    });

    it('should find multiple matches', () => {
      const results = searchTerms('gluteus');

      expect(results.length).toBeGreaterThanOrEqual(3); // maximus, medius, minimus
      expect(results.every((r) => r.term.includes('gluteus'))).toBe(true);
    });

    it('should handle whitespace in queries', () => {
      const results = searchTerms('  biceps  ');

      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('getTermsByCategory', () => {
    it('should return terms for upper limb category', () => {
      const terms = getTermsByCategory('upper limb');

      expect(terms.length).toBeGreaterThan(0);
      expect(terms.some((t) => t.term.includes('biceps'))).toBe(true);
    });

    it('should return terms for lower limb category', () => {
      const terms = getTermsByCategory('lower limb');

      expect(terms.length).toBeGreaterThan(0);
      expect(terms.some((t) => t.term.includes('gluteus'))).toBe(true);
    });

    it('should return terms for head and neck category', () => {
      const terms = getTermsByCategory('head and neck');

      expect(terms.length).toBeGreaterThan(0);
      expect(terms.some((t) => t.term.includes('masseter'))).toBe(true);
    });

    it('should be case-insensitive', () => {
      const lower = getTermsByCategory('upper limb');
      const upper = getTermsByCategory('UPPER LIMB');

      expect(lower.length).toBe(upper.length);
    });

    it('should return empty array for unknown category', () => {
      const terms = getTermsByCategory('nonexistent category');

      expect(terms).toEqual([]);
    });
  });

  describe('Lexicon Data Integrity', () => {
    it('should have required fields for all entries', () => {
      Object.entries(pronunciationLexicon).forEach(([_key, entry]) => {
        expect(entry.term).toBeDefined();
        expect(entry.ipa).toBeDefined();
        expect(entry.guide).toBeDefined();
        expect(typeof entry.term).toBe('string');
        expect(typeof entry.ipa).toBe('string');
        expect(typeof entry.guide).toBe('string');
      });
    });

    it('should have matching keys and term values (lowercase)', () => {
      Object.entries(pronunciationLexicon).forEach(([_key, entry]) => {
        expect(_key.toLowerCase()).toBe(entry.term.toLowerCase());
      });
    });

    it('should have valid IPA notation format', () => {
      Object.values(pronunciationLexicon).forEach((entry) => {
        // IPA should start and end with /
        expect(entry.ipa).toMatch(/^\/.*\/$/);
      });
    });

    it('should have uppercase guides with hyphens or spaces', () => {
      Object.values(pronunciationLexicon).forEach((entry) => {
        // Guide should contain uppercase letters and hyphens
        expect(entry.guide).toMatch(/[A-Z]/);
      });
    });

    it('should have valid SSML format if present', () => {
      Object.values(pronunciationLexicon).forEach((entry) => {
        if (entry.ssml) {
          expect(entry.ssml).toContain('<phoneme');
          expect(entry.ssml).toContain('alphabet="ipa"');
          expect(entry.ssml).toContain('ph=');
          expect(entry.ssml).toContain('</phoneme>');
        }
      });
    });

    it('should have consistent term naming', () => {
      Object.values(pronunciationLexicon).forEach((entry) => {
        // Terms should be lowercase
        expect(entry.term).toBe(entry.term.toLowerCase());
        // No leading/trailing whitespace
        expect(entry.term).toBe(entry.term.trim());
      });
    });
  });

  describe('Coverage of Common Anatomical Terms', () => {
    it('should include major muscle groups', () => {
      const majorMuscles = [
        'biceps brachii',
        'triceps brachii',
        'pectoralis major',
        'trapezius',
        'latissimus dorsi',
        'quadriceps femoris',
        'gastrocnemius',
        'gluteus maximus',
      ];

      majorMuscles.forEach((muscle) => {
        expect(hasPronunciation(muscle)).toBe(true);
      });
    });

    it('should include anatomical direction terms', () => {
      const directions = [
        'anterior',
        'posterior',
        'superior',
        'inferior',
        'medial',
        'lateral',
        'proximal',
        'distal',
      ];

      directions.forEach((direction) => {
        expect(hasPronunciation(direction)).toBe(true);
      });
    });

    it('should include complex terms with proper pronunciation', () => {
      const complexTerms = ['sternocleidomastoid', 'gastrocnemius', 'pterygoid'];

      complexTerms.forEach((term) => {
        const entry = getPronunciation(term);
        expect(entry).toBeDefined();
        expect(entry?.guide).toBeDefined();
        expect(entry?.ipa).toBeDefined();
      });
    });
  });
});
