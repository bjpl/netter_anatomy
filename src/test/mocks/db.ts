/**
 * Database Mock Utilities
 * Factory functions for creating test data
 */

import { vi } from 'vitest';
import {
  StructureType,
  CardType,
  CardState,
  ModuleType,
  type Structure,
  type Region,
  type System,
  type FlashCard,
  type CardReviewState,
  type Chapter,
  type Module,
} from '@/types';
import type { UUID } from '@/types/anatomy';

// ============================================================================
// Mock Data Factories
// ============================================================================

let idCounter = 0;
function generateId(): UUID {
  return `test-id-${++idCounter}` as UUID;
}

/**
 * Create a mock anatomical structure
 */
export function createMockStructure(overrides?: Partial<Structure>): Structure {
  return {
    id: generateId(),
    canonical_name: 'Test Structure',
    common_names: ['Test Alt Name'],
    latin_name: null,
    pronunciation_ipa: '/test/',
    region_id: 'region-1' as UUID,
    system_ids: ['system-1' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Test brief definition',
    description_full: 'Test structure description',
    clinical_significance: 'Test clinical significance',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'test-model',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };
}

/**
 * Create a mock anatomical region
 */
export function createMockRegion(overrides?: Partial<Region>): Region {
  return {
    id: generateId(),
    name: 'Test Region',
    slug: 'test-region',
    description: 'Test region description',
    atlas_plate_range: '1-10',
    sort_order: 1,
    thumbnail_url: '/images/test-region.jpg',
    ...overrides,
  };
}

/**
 * Create a mock anatomical system
 */
export function createMockSystem(overrides?: Partial<System>): System {
  return {
    id: generateId(),
    name: 'Test System',
    slug: 'test-system',
    description: 'Test system description',
    color_code: '#FF5733',
    sort_order: 1,
    ...overrides,
  };
}

/**
 * Create a mock flashcard
 */
export function createMockFlashCard(overrides?: Partial<FlashCard>): FlashCard {
  return {
    id: generateId(),
    structure_id: 'structure-1' as UUID,
    card_type: CardType.IDENTIFICATION,
    front_content: 'What is this structure?',
    back_content: 'Test Structure',
    front_image_url: null,
    back_image_url: null,
    tags: ['test', 'anatomy'],
    source_module_id: 'module-1' as UUID,
    ...overrides,
  };
}

/**
 * Create a mock card review state
 */
export function createMockCardReviewState(
  overrides?: Partial<CardReviewState>
): CardReviewState {
  return {
    id: generateId(),
    user_id: 'test-user',
    card_id: generateId(),
    due: new Date(),
    stability: 2.5,
    difficulty: 5.0,
    elapsed_days: 0,
    scheduled_days: 1,
    reps: 0,
    lapses: 0,
    state: CardState.NEW,
    last_review: null,
    ease_factor: 2.5,
    interval: 1,
    total_reviews: 0,
    total_correct: 0,
    ...overrides,
  };
}

/**
 * Create a mock chapter
 */
export function createMockChapter(overrides?: Partial<Chapter>): Chapter {
  return {
    id: generateId(),
    number: 1,
    title: 'Test Chapter',
    description: 'Test chapter description',
    region_id: 'region-1' as UUID,
    estimated_duration_minutes: 30,
    sort_order: 1,
    prerequisite_chapter_id: null,
    ...overrides,
  };
}

/**
 * Create a mock module
 */
export function createMockModule(overrides?: Partial<Module>): Module {
  return {
    id: generateId(),
    chapter_id: 'chapter-1' as UUID,
    title: 'Test Module',
    module_type: ModuleType.OVERVIEW,
    content: {
      sections: [],
    },
    estimated_duration_minutes: 15,
    sort_order: 1,
    ...overrides,
  };
}

// ============================================================================
// Mock Database Instance
// ============================================================================

/**
 * Create a mock Dexie database instance
 */
export function createMockDB() {
  const mockData = {
    structures: [] as Structure[],
    regions: [] as Region[],
    systems: [] as System[],
    flashCards: [] as FlashCard[],
    cardReviewStates: [] as CardReviewState[],
    chapters: [] as Chapter[],
    modules: [] as Module[],
  };

  const createTable = (tableName: keyof typeof mockData) => ({
    add: vi.fn(async (item: any) => {
      const id = generateId();
      const newItem = { ...item, id };
      mockData[tableName].push(newItem);
      return id;
    }),
    get: vi.fn(async (id: string) => {
      return mockData[tableName].find((item: any) => item.id === id);
    }),
    put: vi.fn(async (item: any) => {
      const index = mockData[tableName].findIndex((i: any) => i.id === item.id);
      if (index >= 0) {
        mockData[tableName][index] = item;
      } else {
        mockData[tableName].push(item);
      }
      return item.id;
    }),
    delete: vi.fn(async (id: string) => {
      const index = mockData[tableName].findIndex((i: any) => i.id === id);
      if (index >= 0) {
        mockData[tableName].splice(index, 1);
      }
    }),
    clear: vi.fn(async () => {
      mockData[tableName] = [] as any;
    }),
    toArray: vi.fn(async () => [...mockData[tableName]]),
    count: vi.fn(async () => mockData[tableName].length),
    where: vi.fn((criteria: string | object) => ({
      equals: vi.fn(() => ({
        toArray: vi.fn(async () => {
          if (typeof criteria === 'string') {
            return mockData[tableName].filter(
              (item: any) => item[criteria] !== undefined
            );
          }
          const key = Object.keys(criteria)[0];
          if (!key) return [];
          return mockData[tableName].filter(
            (item: any) => item[key] === (criteria as any)[key]
          );
        }),
        first: vi.fn(async () => {
          if (typeof criteria === 'string') {
            return mockData[tableName].find(
              (item: any) => item[criteria] !== undefined
            );
          }
          const key = Object.keys(criteria)[0];
          if (!key) return undefined;
          return mockData[tableName].find(
            (item: any) => item[key] === (criteria as any)[key]
          );
        }),
      })),
      anyOf: vi.fn(() => ({
        toArray: vi.fn(async () => [...mockData[tableName]]),
      })),
    })),
  });

  return {
    structures: createTable('structures'),
    regions: createTable('regions'),
    systems: createTable('systems'),
    flashCards: createTable('flashCards'),
    cardReviewStates: createTable('cardReviewStates'),
    chapters: createTable('chapters'),
    modules: createTable('modules'),
    clearAll: vi.fn(async () => {
      Object.keys(mockData).forEach((key) => {
        mockData[key as keyof typeof mockData] = [] as any;
      });
    }),
    getStats: vi.fn(async () => ({
      structures: mockData.structures.length,
      regions: mockData.regions.length,
      systems: mockData.systems.length,
      relationships: 0,
      chapters: mockData.chapters.length,
      modules: mockData.modules.length,
      flashCards: mockData.flashCards.length,
      userProgressRecords: 0,
      cardReviewStates: mockData.cardReviewStates.length,
      studySessions: 0,
    })),
  };
}

/**
 * Reset ID counter for consistent test IDs
 */
export function resetIdCounter() {
  idCounter = 0;
}
