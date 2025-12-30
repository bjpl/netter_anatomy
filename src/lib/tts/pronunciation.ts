/**
 * Medical Term Pronunciation Lexicon
 *
 * Custom pronunciation mappings for anatomical terms to ensure correct
 * Text-to-Speech output. Includes IPA notation and simplified pronunciation guides.
 *
 * Based on Netter's Atlas 6th Edition terminology and standard medical pronunciation.
 */

import type { PronunciationEntry } from '@/types/tts';

/**
 * Core pronunciation lexicon
 * Maps anatomical terms to pronunciation data
 */
export const pronunciationLexicon: Record<string, PronunciationEntry> = {
  // Upper Limb
  'biceps brachii': {
    term: 'biceps brachii',
    ipa: '/ˈbaɪsɛps ˈbreɪkiaɪ/',
    guide: 'BY-seps BRAY-kee-eye',
    ssml: '<phoneme alphabet="ipa" ph="ˈbaɪsɛps ˈbreɪkiaɪ">biceps brachii</phoneme>',
  },
  'triceps brachii': {
    term: 'triceps brachii',
    ipa: '/ˈtraɪsɛps ˈbreɪkiaɪ/',
    guide: 'TRY-seps BRAY-kee-eye',
  },
  'brachialis': {
    term: 'brachialis',
    ipa: '/breɪkiˈeɪlɪs/',
    guide: 'bray-kee-AY-lis',
  },
  'coracobrachialis': {
    term: 'coracobrachialis',
    ipa: '/ˌkɔrəkoʊbreɪkiˈeɪlɪs/',
    guide: 'KOR-ah-koh-bray-kee-AY-lis',
  },
  'brachioradialis': {
    term: 'brachioradialis',
    ipa: '/ˌbreɪkioʊreɪdiˈeɪlɪs/',
    guide: 'BRAY-kee-oh-ray-dee-AY-lis',
  },

  // Head and Neck
  'sternocleidomastoid': {
    term: 'sternocleidomastoid',
    ipa: '/ˌstɜːrnoʊˌklaɪdoʊˈmæstɔɪd/',
    guide: 'STERN-oh-KLYE-doh-MASS-toyd',
    ssml: '<phoneme alphabet="ipa" ph="ˌstɜːrnoʊˌklaɪdoʊˈmæstɔɪd">sternocleidomastoid</phoneme>',
  },
  'masseter': {
    term: 'masseter',
    ipa: '/məˈsiːtər/',
    guide: 'muh-SEE-ter',
  },
  'temporalis': {
    term: 'temporalis',
    ipa: '/ˌtɛmpəˈreɪlɪs/',
    guide: 'tem-poh-RAY-lis',
  },
  'pterygoid': {
    term: 'pterygoid',
    ipa: '/ˈtɛrɪɡɔɪd/',
    guide: 'TERR-ih-goyd',
    ssml: '<phoneme alphabet="ipa" ph="ˈtɛrɪɡɔɪd">pterygoid</phoneme>',
  },
  'digastric': {
    term: 'digastric',
    ipa: '/daɪˈɡæstrɪk/',
    guide: 'dye-GAS-trik',
  },
  'mylohyoid': {
    term: 'mylohyoid',
    ipa: '/ˌmaɪloʊˈhaɪɔɪd/',
    guide: 'MY-loh-HYE-oyd',
  },
  'geniohyoid': {
    term: 'geniohyoid',
    ipa: '/ˌdʒiːnioʊˈhaɪɔɪd/',
    guide: 'JEE-nee-oh-HYE-oyd',
  },

  // Thorax
  'pectoralis major': {
    term: 'pectoralis major',
    ipa: '/ˌpɛktəˈreɪlɪs ˈmeɪdʒər/',
    guide: 'pek-toh-RAY-lis MAY-jor',
  },
  'pectoralis minor': {
    term: 'pectoralis minor',
    ipa: '/ˌpɛktəˈreɪlɪs ˈmaɪnər/',
    guide: 'pek-toh-RAY-lis MY-nor',
  },
  'serratus anterior': {
    term: 'serratus anterior',
    ipa: '/səˈreɪtəs ænˈtɪəriər/',
    guide: 'seh-RAY-tus an-TEER-ee-or',
  },
  'intercostal': {
    term: 'intercostal',
    ipa: '/ˌɪntərˈkɒstəl/',
    guide: 'in-ter-KOS-tal',
  },
  'diaphragm': {
    term: 'diaphragm',
    ipa: '/ˈdaɪəfræm/',
    guide: 'DYE-uh-fram',
  },
  'xiphoid': {
    term: 'xiphoid',
    ipa: '/ˈzaɪfɔɪd/',
    guide: 'ZYE-foyd',
    ssml: '<phoneme alphabet="ipa" ph="ˈzaɪfɔɪd">xiphoid</phoneme>',
  },

  // Back
  'trapezius': {
    term: 'trapezius',
    ipa: '/trəˈpiːziəs/',
    guide: 'truh-PEE-zee-us',
  },
  'latissimus dorsi': {
    term: 'latissimus dorsi',
    ipa: '/ləˈtɪsɪməs ˈdɔːrsaɪ/',
    guide: 'luh-TIS-ih-mus DOR-sye',
  },
  'rhomboid': {
    term: 'rhomboid',
    ipa: '/ˈrɒmbɔɪd/',
    guide: 'ROM-boyd',
  },
  'levator scapulae': {
    term: 'levator scapulae',
    ipa: '/ləˈveɪtər ˈskæpjuliː/',
    guide: 'leh-VAY-tor SKAP-you-lee',
  },
  'erector spinae': {
    term: 'erector spinae',
    ipa: '/ɪˈrɛktər ˈspaɪniː/',
    guide: 'ih-REK-tor SPY-nee',
  },
  'iliocostalis': {
    term: 'iliocostalis',
    ipa: '/ˌɪlioʊkɒˈsteɪlɪs/',
    guide: 'IL-ee-oh-kos-TAY-lis',
  },
  'longissimus': {
    term: 'longissimus',
    ipa: '/lɒnˈdʒɪsɪməs/',
    guide: 'lon-JIS-ih-mus',
  },
  'spinalis': {
    term: 'spinalis',
    ipa: '/spaɪˈneɪlɪs/',
    guide: 'spy-NAY-lis',
  },

  // Abdomen
  'rectus abdominis': {
    term: 'rectus abdominis',
    ipa: '/ˈrɛktəs æbˈdɒmɪnɪs/',
    guide: 'REK-tus ab-DOM-ih-nis',
  },
  'oblique': {
    term: 'oblique',
    ipa: '/əˈbliːk/',
    guide: 'oh-BLEEK',
  },
  'transversus abdominis': {
    term: 'transversus abdominis',
    ipa: '/trænsˈvɜːrsəs æbˈdɒmɪnɪs/',
    guide: 'trans-VER-sus ab-DOM-ih-nis',
  },
  'psoas': {
    term: 'psoas',
    ipa: '/ˈsoʊæs/',
    guide: 'SO-as',
    ssml: '<phoneme alphabet="ipa" ph="ˈsoʊæs">psoas</phoneme>',
  },
  'iliacus': {
    term: 'iliacus',
    ipa: '/ɪˈlaɪəkəs/',
    guide: 'ih-LYE-uh-kus',
  },

  // Lower Limb
  'quadriceps femoris': {
    term: 'quadriceps femoris',
    ipa: '/ˈkwɒdrɪsɛps ˈfɛmərɪs/',
    guide: 'KWOD-rih-seps FEM-or-is',
  },
  'vastus lateralis': {
    term: 'vastus lateralis',
    ipa: '/ˈvæstəs ˌlætəˈreɪlɪs/',
    guide: 'VAS-tus lat-er-AY-lis',
  },
  'vastus medialis': {
    term: 'vastus medialis',
    ipa: '/ˈvæstəs ˌmiːdiˈeɪlɪs/',
    guide: 'VAS-tus mee-dee-AY-lis',
  },
  'vastus intermedius': {
    term: 'vastus intermedius',
    ipa: '/ˈvæstəs ˌɪntərˈmiːdiəs/',
    guide: 'VAS-tus in-ter-MEE-dee-us',
  },
  'rectus femoris': {
    term: 'rectus femoris',
    ipa: '/ˈrɛktəs ˈfɛmərɪs/',
    guide: 'REK-tus FEM-or-is',
  },
  'sartorius': {
    term: 'sartorius',
    ipa: '/sɑːrˈtɔːriəs/',
    guide: 'sar-TOR-ee-us',
  },
  'gracilis': {
    term: 'gracilis',
    ipa: '/ˈɡræsɪlɪs/',
    guide: 'GRAS-ih-lis',
  },
  'adductor': {
    term: 'adductor',
    ipa: '/əˈdʌktər/',
    guide: 'uh-DUK-tor',
  },
  'gastrocnemius': {
    term: 'gastrocnemius',
    ipa: '/ˌɡæstrɒkˈniːmiəs/',
    guide: 'gas-trok-NEE-mee-us',
    ssml: '<phoneme alphabet="ipa" ph="ˌɡæstrɒkˈniːmiəs">gastrocnemius</phoneme>',
  },
  'soleus': {
    term: 'soleus',
    ipa: '/ˈsoʊliəs/',
    guide: 'SO-lee-us',
  },
  'tibialis anterior': {
    term: 'tibialis anterior',
    ipa: '/ˌtɪbiˈeɪlɪs ænˈtɪəriər/',
    guide: 'tib-ee-AY-lis an-TEER-ee-or',
  },
  'peroneus': {
    term: 'peroneus',
    ipa: '/ˌpɛrəˈniːəs/',
    guide: 'per-oh-NEE-us',
    alternatives: ['fibularis'],
  },
  'gluteus maximus': {
    term: 'gluteus maximus',
    ipa: '/ˈɡluːtiəs ˈmæksɪməs/',
    guide: 'GLOO-tee-us MAK-sih-mus',
  },
  'gluteus medius': {
    term: 'gluteus medius',
    ipa: '/ˈɡluːtiəs ˈmiːdiəs/',
    guide: 'GLOO-tee-us MEE-dee-us',
  },
  'gluteus minimus': {
    term: 'gluteus minimus',
    ipa: '/ˈɡluːtiəs ˈmɪnɪməs/',
    guide: 'GLOO-tee-us MIN-ih-mus',
  },

  // General Anatomical Terms
  'anterior': {
    term: 'anterior',
    ipa: '/ænˈtɪəriər/',
    guide: 'an-TEER-ee-or',
  },
  'posterior': {
    term: 'posterior',
    ipa: '/pɒˈstɪəriər/',
    guide: 'pos-TEER-ee-or',
  },
  'superior': {
    term: 'superior',
    ipa: '/suːˈpɪəriər/',
    guide: 'soo-PEER-ee-or',
  },
  'inferior': {
    term: 'inferior',
    ipa: '/ɪnˈfɪəriər/',
    guide: 'in-FEER-ee-or',
  },
  'medial': {
    term: 'medial',
    ipa: '/ˈmiːdiəl/',
    guide: 'MEE-dee-ul',
  },
  'lateral': {
    term: 'lateral',
    ipa: '/ˈlætərəl/',
    guide: 'LAT-er-ul',
  },
  'proximal': {
    term: 'proximal',
    ipa: '/ˈprɒksɪməl/',
    guide: 'PROK-sih-mul',
  },
  'distal': {
    term: 'distal',
    ipa: '/ˈdɪstəl/',
    guide: 'DIS-tul',
  },
  'superficial': {
    term: 'superficial',
    ipa: '/ˌsuːpərˈfɪʃəl/',
    guide: 'soo-per-FISH-ul',
  },
  'deep': {
    term: 'deep',
    ipa: '/diːp/',
    guide: 'DEEP',
  },
};

/**
 * Get pronunciation data for a specific term
 * Case-insensitive lookup
 */
export function getPronunciation(term: string): PronunciationEntry | null {
  const normalized = term.toLowerCase().trim();
  return pronunciationLexicon[normalized] || null;
}

/**
 * Get simplified pronunciation guide for display
 */
export function getPronunciationGuide(term: string): string | null {
  const entry = getPronunciation(term);
  return entry?.guide || null;
}

/**
 * Get IPA notation for a term
 */
export function getIPANotation(term: string): string | null {
  const entry = getPronunciation(term);
  return entry?.ipa || null;
}

/**
 * Format text for TTS by replacing anatomical terms with pronunciation-friendly versions
 * This helps the TTS engine pronounce medical terms correctly
 */
export function formatForTTS(text: string): string {
  let formattedText = text;

  // Replace terms with SSML phoneme tags if available
  Object.values(pronunciationLexicon).forEach((entry) => {
    if (entry.ssml) {
      const regex = new RegExp(entry.term, 'gi');
      formattedText = formattedText.replace(regex, entry.ssml);
    }
  });

  return formattedText;
}

/**
 * Check if a term has pronunciation data
 */
export function hasPronunciation(term: string): boolean {
  return getPronunciation(term) !== null;
}

/**
 * Get all terms in the pronunciation lexicon
 * Useful for autocomplete or term listing
 */
export function getAllTerms(): string[] {
  return Object.keys(pronunciationLexicon);
}

/**
 * Search for terms by partial match
 */
export function searchTerms(query: string): PronunciationEntry[] {
  const normalizedQuery = query.toLowerCase().trim();
  return Object.values(pronunciationLexicon).filter((entry) =>
    entry.term.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * Get terms by category (based on common anatomical groupings)
 */
export function getTermsByCategory(category: string): PronunciationEntry[] {
  // This is a simplified version - in production, you'd have category metadata
  const categoryKeywords: Record<string, string[]> = {
    'upper limb': ['biceps', 'triceps', 'brachialis', 'brachioradialis'],
    'lower limb': ['quadriceps', 'vastus', 'gastrocnemius', 'gluteus', 'soleus'],
    'head and neck': ['sternocleidomastoid', 'masseter', 'temporalis', 'pterygoid'],
    'thorax': ['pectoralis', 'intercostal', 'diaphragm', 'serratus'],
    'back': ['trapezius', 'latissimus', 'rhomboid', 'erector'],
    'abdomen': ['rectus abdominis', 'oblique', 'transversus', 'psoas'],
  };

  const keywords = categoryKeywords[category.toLowerCase()] || [];
  return Object.values(pronunciationLexicon).filter((entry) =>
    keywords.some((keyword) => entry.term.includes(keyword))
  );
}
