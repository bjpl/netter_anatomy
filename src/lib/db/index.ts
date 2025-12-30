/**
 * IndexedDB Database Layer using Dexie.js
 * Implements data storage strategy from Section 11.4
 */

import Dexie, { Table } from 'dexie';
import type {
  Structure,
  Region,
  System,
  Relationship,
  PhysicalReference,
  ExternalLink,
  Chapter,
  Module,
  FlashCard,
  UserProgress,
  CardReviewState,
  StudySession,
} from '../../types';

// ============================================================================
// Database Class Definition
// ============================================================================

export class NetterAnatomyDB extends Dexie {
  // Core content tables
  structures!: Table<Structure, string>;
  regions!: Table<Region, string>;
  systems!: Table<System, string>;
  relationships!: Table<Relationship, string>;
  physicalReferences!: Table<PhysicalReference, string>;
  externalLinks!: Table<ExternalLink, string>;

  // Learning content tables
  chapters!: Table<Chapter, string>;
  modules!: Table<Module, string>;
  flashCards!: Table<FlashCard, string>;

  // User data tables
  userProgress!: Table<UserProgress, string>;
  cardReviewStates!: Table<CardReviewState, string>;
  studySessions!: Table<StudySession, string>;

  constructor() {
    super('NetterAnatomyDB');

    // Database version 1 - Initial schema
    this.version(1).stores({
      // Core content tables
      // Primary key is always 'id'
      // Indexes specified after comma for efficient querying
      structures:
        '++id, canonical_name, region_id, *system_ids, structure_type, parent_structure_id',
      regions: '++id, slug, sort_order',
      systems: '++id, slug, sort_order',
      relationships:
        '++id, source_structure_id, target_structure_id, relationship_type',
      physicalReferences: '++id, structure_id, resource_type, is_primary',
      externalLinks: '++id, structure_id, source, is_active',

      // Learning content tables
      chapters: '++id, number, region_id, sort_order, prerequisite_chapter_id',
      modules: '++id, chapter_id, module_type, sort_order',
      flashCards: '++id, structure_id, card_type, source_module_id, *tags',

      // User data tables
      // For single-user local app, user_id will typically be a constant
      userProgress: '++id, user_id, last_activity_at',
      // Compound index [card_id+due] for efficient review queue queries
      cardReviewStates: '++id, user_id, card_id, [card_id+due], state, due',
      studySessions: '++id, user_id, session_type, started_at, module_id',
    });

    // Define hooks for automatic timestamp updates
    this.structures.hook('creating', (_primKey, obj) => {
      const now = new Date();
      obj.created_at = now;
      obj.updated_at = now;
    });

    this.structures.hook('updating', (modifications) => {
      (modifications as Record<string, unknown>).updated_at = new Date();
    });
  }

  /**
   * Clear all data from the database (useful for testing/reset)
   */
  async clearAll(): Promise<void> {
    await Promise.all([
      this.structures.clear(),
      this.regions.clear(),
      this.systems.clear(),
      this.relationships.clear(),
      this.physicalReferences.clear(),
      this.externalLinks.clear(),
      this.chapters.clear(),
      this.modules.clear(),
      this.flashCards.clear(),
      this.userProgress.clear(),
      this.cardReviewStates.clear(),
      this.studySessions.clear(),
    ]);
  }

  /**
   * Get database statistics
   */
  async getStats(): Promise<{
    structures: number;
    regions: number;
    systems: number;
    relationships: number;
    chapters: number;
    modules: number;
    flashCards: number;
    userProgressRecords: number;
    cardReviewStates: number;
    studySessions: number;
  }> {
    const [
      structures,
      regions,
      systems,
      relationships,
      chapters,
      modules,
      flashCards,
      userProgressRecords,
      cardReviewStates,
      studySessions,
    ] = await Promise.all([
      this.structures.count(),
      this.regions.count(),
      this.systems.count(),
      this.relationships.count(),
      this.chapters.count(),
      this.modules.count(),
      this.flashCards.count(),
      this.userProgress.count(),
      this.cardReviewStates.count(),
      this.studySessions.count(),
    ]);

    return {
      structures,
      regions,
      systems,
      relationships,
      chapters,
      modules,
      flashCards,
      userProgressRecords,
      cardReviewStates,
      studySessions,
    };
  }
}

// ============================================================================
// Database Instance (Singleton)
// ============================================================================

export const db = new NetterAnatomyDB();

// ============================================================================
// Migration Strategy
// ============================================================================

/**
 * Future database versions will be added here
 *
 * Example:
 *
 * db.version(2).stores({
 *   structures: '++id, canonicalName, regionId, *systemIds, structureType, parentStructureId, difficultyRating'
 * }).upgrade(async tx => {
 *   // Migration logic
 *   const structures = await tx.table('structures').toArray();
 *   await Promise.all(
 *     structures.map(s =>
 *       tx.table('structures').update(s.id, { difficultyRating: 3 })
 *     )
 *   );
 * });
 */

// Export types for convenience
export type { Table };
