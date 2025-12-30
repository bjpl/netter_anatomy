/**
 * Anatomical Pronunciation Lexicon
 *
 * Comprehensive pronunciation guide for anatomical and medical terms.
 * Includes IPA notation and simplified pronunciation guides.
 */

import type { PronunciationEntry } from '../../types/tts';

/**
 * Anatomical Pronunciation Lexicon
 *
 * Contains 50+ medical and anatomical terms with:
 * - IPA (International Phonetic Alphabet) notation
 * - Simplified pronunciation guides
 * - Alternative pronunciations where applicable
 * - SSML overrides for fine-tuned TTS control
 */
export const ANATOMICAL_LEXICON: Record<string, PronunciationEntry> = {
  // Upper Limb - Bones
  humerus: {
    term: 'humerus',
    ipa: '/ˈhjuːmərəs/',
    guide: 'HYOO-mer-us',
    alternatives: ['humorous (incorrect)'],
    ssml: 'humerus',
  },
  scapula: {
    term: 'scapula',
    ipa: '/ˈskæpjələ/',
    guide: 'SKAP-yoo-lah',
    ssml: 'scapula',
  },
  clavicle: {
    term: 'clavicle',
    ipa: '/ˈklævɪkəl/',
    guide: 'KLAV-ih-kul',
    ssml: 'clavicle',
  },
  radius: {
    term: 'radius',
    ipa: '/ˈreɪdiəs/',
    guide: 'RAY-dee-us',
    ssml: 'radius',
  },
  ulna: {
    term: 'ulna',
    ipa: '/ˈʌlnə/',
    guide: 'UL-nuh',
    ssml: 'ulna',
  },
  carpals: {
    term: 'carpals',
    ipa: '/ˈkɑːrpəlz/',
    guide: 'KAR-pulz',
    ssml: 'carpals',
  },
  metacarpals: {
    term: 'metacarpals',
    ipa: '/ˌmɛtəˈkɑːrpəlz/',
    guide: 'met-uh-KAR-pulz',
    ssml: 'metacarpals',
  },
  phalanges: {
    term: 'phalanges',
    ipa: '/fəˈlændʒiːz/',
    guide: 'fuh-LAN-jeez',
    ssml: 'phalanges',
  },

  // Upper Limb - Muscles
  biceps: {
    term: 'biceps brachii',
    ipa: '/ˈbaɪsɛps ˈbreɪkiaɪ/',
    guide: 'BY-seps BRAY-kee-eye',
    ssml: 'biceps brachii',
  },
  triceps: {
    term: 'triceps brachii',
    ipa: '/ˈtraɪsɛps ˈbreɪkiaɪ/',
    guide: 'TRY-seps BRAY-kee-eye',
    ssml: 'triceps brachii',
  },
  deltoid: {
    term: 'deltoid',
    ipa: '/ˈdɛltɔɪd/',
    guide: 'DEL-toyd',
    ssml: 'deltoid',
  },
  pectoralis: {
    term: 'pectoralis major',
    ipa: '/ˌpɛktəˈreɪlɪs ˈmeɪdʒər/',
    guide: 'pek-tor-AL-iss MAY-jer',
    ssml: 'pectoralis major',
  },
  latissimus: {
    term: 'latissimus dorsi',
    ipa: '/ləˈtɪsɪməs ˈdɔːrsaɪ/',
    guide: 'luh-TISS-ih-mus DOR-sigh',
    ssml: 'latissimus dorsi',
  },
  brachialis: {
    term: 'brachialis',
    ipa: '/ˌbreɪkiˈeɪlɪs/',
    guide: 'bray-kee-AL-iss',
    ssml: 'brachialis',
  },
  brachioradialis: {
    term: 'brachioradialis',
    ipa: '/ˌbreɪkioʊreɪdiˈeɪlɪs/',
    guide: 'bray-kee-oh-ray-dee-AL-iss',
    ssml: 'brachioradialis',
  },
  flexor: {
    term: 'flexor digitorum',
    ipa: '/ˈflɛksər ˌdɪdʒɪˈtɔːrəm/',
    guide: 'FLEK-sor dij-ih-TOR-um',
    ssml: 'flexor digitorum',
  },
  extensor: {
    term: 'extensor digitorum',
    ipa: '/ɪkˈstɛnsər ˌdɪdʒɪˈtɔːrəm/',
    guide: 'ek-STEN-sor dij-ih-TOR-um',
    ssml: 'extensor digitorum',
  },
  pronator: {
    term: 'pronator teres',
    ipa: '/proʊˈneɪtər ˈtɛriːz/',
    guide: 'pro-NAY-tor TEER-eez',
    ssml: 'pronator teres',
  },
  supinator: {
    term: 'supinator',
    ipa: '/ˈsuːpɪneɪtər/',
    guide: 'SOO-pih-nay-tor',
    ssml: 'supinator',
  },
  thenar: {
    term: 'thenar',
    ipa: '/ˈθiːnɑːr/',
    guide: 'THEE-nar',
    ssml: 'thenar',
  },
  hypothenar: {
    term: 'hypothenar',
    ipa: '/ˌhaɪpəˈθiːnɑːr/',
    guide: 'high-po-THEE-nar',
    ssml: 'hypothenar',
  },

  // Nerves
  brachial: {
    term: 'brachial plexus',
    ipa: '/ˈbreɪkiəl ˈplɛksəs/',
    guide: 'BRAY-kee-ul PLEK-sus',
    ssml: 'brachial plexus',
  },
  median: {
    term: 'median nerve',
    ipa: '/ˈmiːdiən nɜːrv/',
    guide: 'MEE-dee-un nerv',
    ssml: 'median nerve',
  },
  ulnar: {
    term: 'ulnar nerve',
    ipa: '/ˈʌlnər nɜːrv/',
    guide: 'UL-nar nerv',
    ssml: 'ulnar nerve',
  },
  radial: {
    term: 'radial nerve',
    ipa: '/ˈreɪdiəl nɜːrv/',
    guide: 'RAY-dee-ul nerv',
    ssml: 'radial nerve',
  },
  musculocutaneous: {
    term: 'musculocutaneous',
    ipa: '/ˌmʌskjʊloʊkjuːˈteɪniəs/',
    guide: 'mus-kyoo-lo-kyoo-TAY-nee-us',
    ssml: 'musculocutaneous',
  },
  axillary: {
    term: 'axillary nerve',
    ipa: '/ˈæksɪləri nɜːrv/',
    guide: 'AK-sih-lair-ee nerv',
    ssml: 'axillary nerve',
  },

  // Arteries
  brachial_artery: {
    term: 'brachial artery',
    ipa: '/ˈbreɪkiəl ˈɑːrtəri/',
    guide: 'BRAY-kee-ul AR-ter-ee',
    ssml: 'brachial artery',
  },
  subclavian: {
    term: 'subclavian artery',
    ipa: '/sʌbˈkleɪviən ˈɑːrtəri/',
    guide: 'sub-KLAY-vee-un AR-ter-ee',
    ssml: 'subclavian artery',
  },
  axillary_artery: {
    term: 'axillary artery',
    ipa: '/ˈæksɪləri ˈɑːrtəri/',
    guide: 'AK-sih-lair-ee AR-ter-ee',
    ssml: 'axillary artery',
  },
  radial_artery: {
    term: 'radial artery',
    ipa: '/ˈreɪdiəl ˈɑːrtəri/',
    guide: 'RAY-dee-ul AR-ter-ee',
    ssml: 'radial artery',
  },
  ulnar_artery: {
    term: 'ulnar artery',
    ipa: '/ˈʌlnər ˈɑːrtəri/',
    guide: 'UL-nar AR-ter-ee',
    ssml: 'ulnar artery',
  },

  // Veins
  cephalic: {
    term: 'cephalic vein',
    ipa: '/sɪˈfælɪk veɪn/',
    guide: 'seh-FAL-ik vayn',
    ssml: 'cephalic vein',
  },
  basilic: {
    term: 'basilic vein',
    ipa: '/bəˈsɪlɪk veɪn/',
    guide: 'buh-SIL-ik vayn',
    ssml: 'basilic vein',
  },
  subclavian_vein: {
    term: 'subclavian vein',
    ipa: '/sʌbˈkleɪviən veɪn/',
    guide: 'sub-KLAY-vee-un vayn',
    ssml: 'subclavian vein',
  },
  axillary_vein: {
    term: 'axillary vein',
    ipa: '/ˈæksɪləri veɪn/',
    guide: 'AK-sih-lair-ee vayn',
    ssml: 'axillary vein',
  },
  brachial_vein: {
    term: 'brachial vein',
    ipa: '/ˈbreɪkiəl veɪn/',
    guide: 'BRAY-kee-ul vayn',
    ssml: 'brachial vein',
  },

  // Joints and Regions
  glenohumeral: {
    term: 'glenohumeral joint',
    ipa: '/ˌɡliːnoʊˈhjuːmərəl dʒɔɪnt/',
    guide: 'glee-no-HYOO-mer-ul joynt',
    ssml: 'glenohumeral joint',
  },
  acromioclavicular: {
    term: 'acromioclavicular joint',
    ipa: '/əˌkroʊmioʊkləˈvɪkjʊlər dʒɔɪnt/',
    guide: 'uh-kro-mee-oh-kluh-VIK-yoo-lar joynt',
    ssml: 'acromioclavicular joint',
  },
  elbow: {
    term: 'elbow joint',
    ipa: '/ˈɛlboʊ dʒɔɪnt/',
    guide: 'EL-boh joynt',
    ssml: 'elbow joint',
  },
  cubital: {
    term: 'cubital fossa',
    ipa: '/ˈkjuːbɪtəl ˈfɒsə/',
    guide: 'KYOO-bih-tul FAW-suh',
    ssml: 'cubital fossa',
  },
  antecubital: {
    term: 'antecubital',
    ipa: '/ˌæntiˈkjuːbɪtəl/',
    guide: 'an-tee-KYOO-bih-tul',
    ssml: 'antecubital',
  },

  // Additional Anatomical Terms
  anatomical: {
    term: 'anatomical position',
    ipa: '/ˌænəˈtɒmɪkəl pəˈzɪʃən/',
    guide: 'an-uh-TOM-ih-kul puh-ZISH-un',
    ssml: 'anatomical position',
  },
  anterior: {
    term: 'anterior',
    ipa: '/ænˈtɪəriər/',
    guide: 'an-TEER-ee-or',
    ssml: 'anterior',
  },
  posterior: {
    term: 'posterior',
    ipa: '/pɒˈstɪəriər/',
    guide: 'paw-STEER-ee-or',
    ssml: 'posterior',
  },
  medial: {
    term: 'medial',
    ipa: '/ˈmiːdiəl/',
    guide: 'MEE-dee-ul',
    ssml: 'medial',
  },
  lateral: {
    term: 'lateral',
    ipa: '/ˈlætərəl/',
    guide: 'LAT-er-ul',
    ssml: 'lateral',
  },
  proximal: {
    term: 'proximal',
    ipa: '/ˈprɒksɪməl/',
    guide: 'PROK-sih-mul',
    ssml: 'proximal',
  },
  distal: {
    term: 'distal',
    ipa: '/ˈdɪstəl/',
    guide: 'DIS-tul',
    ssml: 'distal',
  },
  superficial: {
    term: 'superficial',
    ipa: '/ˌsuːpərˈfɪʃəl/',
    guide: 'soo-per-FISH-ul',
    ssml: 'superficial',
  },
  deep: {
    term: 'deep',
    ipa: '/diːp/',
    guide: 'deep',
    ssml: 'deep',
  },
};

/**
 * Get pronunciation entry for a term
 * Supports fuzzy matching (case-insensitive, partial matches)
 */
export function getPronunciation(term: string): PronunciationEntry | null {
  if (!term) return null;

  const normalizedTerm = term.toLowerCase().trim();

  // Exact match
  if (ANATOMICAL_LEXICON[normalizedTerm]) {
    return ANATOMICAL_LEXICON[normalizedTerm];
  }

  // Partial match (term contains lexicon key or vice versa)
  for (const [key, entry] of Object.entries(ANATOMICAL_LEXICON)) {
    if (normalizedTerm.includes(key) || key.includes(normalizedTerm)) {
      return entry;
    }

    // Check if term matches entry term
    if (entry.term.toLowerCase().includes(normalizedTerm)) {
      return entry;
    }
  }

  return null;
}

/**
 * Format text for TTS with pronunciation corrections
 * Replaces anatomical terms with TTS-friendly pronunciations
 */
export function formatForTTS(text: string): string {
  if (!text) return '';

  let formattedText = text;

  // Sort lexicon keys by length (longest first) to avoid partial replacements
  const sortedKeys = Object.keys(ANATOMICAL_LEXICON).sort(
    (a, b) => b.length - a.length
  );

  // Replace each term with SSML or guide pronunciation
  for (const key of sortedKeys) {
    const entry = ANATOMICAL_LEXICON[key];
    const regex = new RegExp(`\\b${key}\\b`, 'gi');

    // Use SSML if available, otherwise use the term as-is (browser will handle)
    if (entry) {
      const replacement = entry.ssml || entry.guide;
      formattedText = formattedText.replace(regex, replacement);
    }
  }

  return formattedText;
}

/**
 * Get phonetic guide for a term
 * Returns simplified pronunciation guide
 */
export function getPhoneticGuide(term: string): string | null {
  const entry = getPronunciation(term);
  return entry?.guide || null;
}

/**
 * Get IPA notation for a term
 */
export function getIPA(term: string): string | null {
  const entry = getPronunciation(term);
  return entry?.ipa || null;
}

/**
 * Check if a term exists in the lexicon
 */
export function hasLexiconEntry(term: string): boolean {
  return getPronunciation(term) !== null;
}

/**
 * Get all lexicon entries as an array
 */
export function getAllEntries(): PronunciationEntry[] {
  return Object.values(ANATOMICAL_LEXICON);
}

/**
 * Search lexicon by partial term match
 */
export function searchLexicon(query: string): PronunciationEntry[] {
  if (!query) return [];

  const normalizedQuery = query.toLowerCase().trim();
  const results: PronunciationEntry[] = [];

  for (const entry of Object.values(ANATOMICAL_LEXICON)) {
    if (
      entry.term.toLowerCase().includes(normalizedQuery) ||
      entry.guide.toLowerCase().includes(normalizedQuery)
    ) {
      results.push(entry);
    }
  }

  return results;
}
