/**
 * Database CRUD Operations and Query Helpers
 * Provides high-level API for interacting with IndexedDB
 */

import { db } from './index';
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
  StructureType,
  RelationshipType,
  ResourceType,
  ModuleType,
  CardType,
  SessionType,
} from '../../types';
import { CardState } from '../../types';

// ============================================================================
// Search Result Type
// ============================================================================

export interface SearchResult {
  structures: Structure[];
  regions: Region[];
  clinicalTerms: Array<{ term: string; relatedStructureIds: string[] }>;
}

// ============================================================================
// Structure Operations
// ============================================================================

export const structureOps = {
  /**
   * Get structure by ID
   */
  async getById(id: string): Promise<Structure | undefined> {
    return await db.structures.get(id);
  },

  /**
   * Get multiple structures by IDs
   */
  async getByIds(ids: string[]): Promise<Structure[]> {
    return await db.structures.bulkGet(ids).then((results) =>
      results.filter((s): s is Structure => s !== undefined)
    );
  },

  /**
   * Get all structures in a region
   */
  async getByRegion(regionId: string): Promise<Structure[]> {
    return await db.structures.where('region_id').equals(regionId).toArray();
  },

  /**
   * Get structures by system (structures can belong to multiple systems)
   */
  async getBySystem(systemId: string): Promise<Structure[]> {
    const allStructures = await db.structures.toArray();
    return allStructures.filter((s) => s.system_ids.includes(systemId));
  },

  /**
   * Get structures by type
   */
  async getByType(structureType: StructureType): Promise<Structure[]> {
    return await db.structures
      .where('structure_type')
      .equals(structureType)
      .toArray();
  },

  /**
   * Get child structures
   */
  async getChildren(parentId: string): Promise<Structure[]> {
    return await db.structures
      .where('parent_structure_id')
      .equals(parentId)
      .toArray();
  },

  /**
   * Search structures by name (case-insensitive partial match)
   */
  async searchByName(query: string): Promise<Structure[]> {
    const lowerQuery = query.toLowerCase();
    const allStructures = await db.structures.toArray();

    return allStructures.filter(
      (s) =>
        s.canonical_name.toLowerCase().includes(lowerQuery) ||
        s.common_names.some((name) => name.toLowerCase().includes(lowerQuery)) ||
        (s.latin_name && s.latin_name.toLowerCase().includes(lowerQuery))
    );
  },

  /**
   * Create structure
   */
  async create(structure: Omit<Structure, 'id'>): Promise<string> {
    return await db.structures.add({
      id: crypto.randomUUID(),
      ...structure,
    } as Structure);
  },

  /**
   * Update structure
   */
  async update(
    id: string,
    updates: Partial<Omit<Structure, 'id'>>
  ): Promise<void> {
    await db.structures.update(id, updates);
  },

  /**
   * Delete structure
   */
  async delete(id: string): Promise<void> {
    await db.structures.delete(id);
  },

  /**
   * Bulk create structures
   */
  async bulkCreate(structures: Omit<Structure, 'id'>[]): Promise<void> {
    const structuresWithIds = structures.map((s) => ({
      id: crypto.randomUUID(),
      ...s,
    })) as Structure[];

    await db.structures.bulkAdd(structuresWithIds);
  },
};

// ============================================================================
// Relationship Operations
// ============================================================================

export const relationshipOps = {
  /**
   * Get all relationships for a structure
   */
  async getForStructure(structureId: string): Promise<Relationship[]> {
    const [outgoing, incoming] = await Promise.all([
      db.relationships.where('source_structure_id').equals(structureId).toArray(),
      db.relationships.where('target_structure_id').equals(structureId).toArray(),
    ]);

    return [...outgoing, ...incoming];
  },

  /**
   * Get relationships by type for a structure
   */
  async getByType(
    structureId: string,
    relationshipType: RelationshipType
  ): Promise<Relationship[]> {
    const allRelationships = await this.getForStructure(structureId);
    return allRelationships.filter(
      (r) => r.relationship_type === relationshipType
    );
  },

  /**
   * Get related structures (returns the actual Structure objects)
   */
  async getRelatedStructures(structureId: string): Promise<{
    relationship: Relationship;
    structure: Structure;
  }[]> {
    const relationships = await this.getForStructure(structureId);
    const relatedIds = relationships.map((r) =>
      r.source_structure_id === structureId
        ? r.target_structure_id
        : r.source_structure_id
    );

    const structures = await structureOps.getByIds(relatedIds);
    const structureMap = new Map(structures.map(s => [s.id, s]));

    return relationships
      .map((relationship) => {
        const relatedId = relationship.source_structure_id === structureId
          ? relationship.target_structure_id
          : relationship.source_structure_id;
        const structure = structureMap.get(relatedId);
        return structure ? { relationship, structure } : null;
      })
      .filter((item): item is { relationship: Relationship; structure: Structure } => item !== null);
  },

  /**
   * Create relationship
   */
  async create(relationship: Omit<Relationship, 'id'>): Promise<string> {
    return await db.relationships.add({
      id: crypto.randomUUID(),
      ...relationship,
    } as Relationship);
  },

  /**
   * Bulk create relationships
   */
  async bulkCreate(relationships: Omit<Relationship, 'id'>[]): Promise<void> {
    const relationshipsWithIds = relationships.map((r) => ({
      id: crypto.randomUUID(),
      ...r,
    })) as Relationship[];

    await db.relationships.bulkAdd(relationshipsWithIds);
  },
};

// ============================================================================
// Physical Reference Operations
// ============================================================================

export const physicalRefOps = {
  /**
   * Get all references for a structure
   */
  async getForStructure(structureId: string): Promise<PhysicalReference[]> {
    return await db.physicalReferences
      .where('structure_id')
      .equals(structureId)
      .toArray();
  },

  /**
   * Get references by type
   */
  async getByType(
    structureId: string,
    resourceType: ResourceType
  ): Promise<PhysicalReference[]> {
    return await db.physicalReferences
      .where({ structure_id: structureId, resource_type: resourceType })
      .toArray();
  },

  /**
   * Get primary reference for a structure
   */
  async getPrimary(structureId: string): Promise<PhysicalReference | undefined> {
    return await db.physicalReferences
      .where({ structure_id: structureId, is_primary: 1 as any })
      .first();
  },

  /**
   * Get structures by plate/card number
   */
  async getByNumber(
    resourceType: ResourceType,
    primaryNumber: string
  ): Promise<PhysicalReference[]> {
    return await db.physicalReferences
      .where({ resource_type: resourceType, primary_number: primaryNumber })
      .toArray();
  },

  /**
   * Create reference
   */
  async create(reference: Omit<PhysicalReference, 'id'>): Promise<string> {
    return await db.physicalReferences.add({
      id: crypto.randomUUID(),
      ...reference,
    } as PhysicalReference);
  },

  /**
   * Bulk create references
   */
  async bulkCreate(references: Omit<PhysicalReference, 'id'>[]): Promise<void> {
    const referencesWithIds = references.map((r) => ({
      id: crypto.randomUUID(),
      ...r,
    })) as PhysicalReference[];

    await db.physicalReferences.bulkAdd(referencesWithIds);
  },
};

// ============================================================================
// External Link Operations
// ============================================================================

export const externalLinkOps = {
  /**
   * Get all active links for a structure
   */
  async getForStructure(structureId: string): Promise<ExternalLink[]> {
    return await db.externalLinks
      .where({ structure_id: structureId, is_active: 1 as any })
      .toArray();
  },

  /**
   * Create external link
   */
  async create(link: Omit<ExternalLink, 'id'>): Promise<string> {
    return await db.externalLinks.add({
      id: crypto.randomUUID(),
      ...link,
    } as ExternalLink);
  },

  /**
   * Mark link as inactive (soft delete)
   */
  async deactivate(id: string): Promise<void> {
    await db.externalLinks.update(id, { is_active: false });
  },
};

// ============================================================================
// Region and System Operations
// ============================================================================

export const regionOps = {
  async getAll(): Promise<Region[]> {
    return await db.regions.orderBy('sort_order').toArray();
  },

  async getById(id: string): Promise<Region | undefined> {
    return await db.regions.get(id);
  },

  async getBySlug(slug: string): Promise<Region | undefined> {
    return await db.regions.where('slug').equals(slug).first();
  },

  async create(region: Omit<Region, 'id'>): Promise<string> {
    return await db.regions.add({
      id: crypto.randomUUID(),
      ...region,
    } as Region);
  },

  async bulkCreate(regions: Omit<Region, 'id'>[]): Promise<void> {
    const regionsWithIds = regions.map((r) => ({
      id: crypto.randomUUID(),
      ...r,
    })) as Region[];

    await db.regions.bulkAdd(regionsWithIds);
  },
};

export const systemOps = {
  async getAll(): Promise<System[]> {
    return await db.systems.orderBy('sort_order').toArray();
  },

  async getById(id: string): Promise<System | undefined> {
    return await db.systems.get(id);
  },

  async getBySlug(slug: string): Promise<System | undefined> {
    return await db.systems.where('slug').equals(slug).first();
  },

  async create(system: Omit<System, 'id'>): Promise<string> {
    return await db.systems.add({
      id: crypto.randomUUID(),
      ...system,
    } as System);
  },

  async bulkCreate(systems: Omit<System, 'id'>[]): Promise<void> {
    const systemsWithIds = systems.map((s) => ({
      id: crypto.randomUUID(),
      ...s,
    })) as System[];

    await db.systems.bulkAdd(systemsWithIds);
  },
};

// ============================================================================
// Chapter and Module Operations
// ============================================================================

export const chapterOps = {
  async getAll(): Promise<Chapter[]> {
    return await db.chapters.orderBy('sort_order').toArray();
  },

  async getById(id: string): Promise<Chapter | undefined> {
    return await db.chapters.get(id);
  },

  async getByRegion(regionId: string): Promise<Chapter[]> {
    return await db.chapters.where('region_id').equals(regionId).toArray();
  },

  async create(chapter: Omit<Chapter, 'id'>): Promise<string> {
    return await db.chapters.add({
      id: crypto.randomUUID(),
      ...chapter,
    } as Chapter);
  },

  async bulkCreate(chapters: Omit<Chapter, 'id'>[]): Promise<void> {
    const chaptersWithIds = chapters.map((c) => ({
      id: crypto.randomUUID(),
      ...c,
    })) as Chapter[];

    await db.chapters.bulkAdd(chaptersWithIds);
  },
};

export const moduleOps = {
  async getByChapter(chapterId: string): Promise<Module[]> {
    return await db.modules
      .where('chapter_id')
      .equals(chapterId)
      .sortBy('sort_order');
  },

  async getById(id: string): Promise<Module | undefined> {
    return await db.modules.get(id);
  },

  async getByType(
    chapterId: string,
    moduleType: ModuleType
  ): Promise<Module[]> {
    return await db.modules.where({ chapter_id: chapterId, module_type: moduleType }).toArray();
  },

  async create(module: Omit<Module, 'id'>): Promise<string> {
    return await db.modules.add({
      id: crypto.randomUUID(),
      ...module,
    } as Module);
  },

  async bulkCreate(modules: Omit<Module, 'id'>[]): Promise<void> {
    const modulesWithIds = modules.map((m) => ({
      id: crypto.randomUUID(),
      ...m,
    })) as Module[];

    await db.modules.bulkAdd(modulesWithIds);
  },
};

// ============================================================================
// FlashCard Operations
// ============================================================================

export const flashCardOps = {
  async getAll(): Promise<FlashCard[]> {
    return await db.flashCards.toArray();
  },

  async getById(id: string): Promise<FlashCard | undefined> {
    return await db.flashCards.get(id);
  },

  async getByStructure(structureId: string): Promise<FlashCard[]> {
    return await db.flashCards.where('structure_id').equals(structureId).toArray();
  },

  async getByType(cardType: CardType): Promise<FlashCard[]> {
    return await db.flashCards.where('card_type').equals(cardType).toArray();
  },

  async getByTag(tag: string): Promise<FlashCard[]> {
    const allCards = await db.flashCards.toArray();
    return allCards.filter((card) => card.tags.includes(tag));
  },

  async create(card: Omit<FlashCard, 'id'>): Promise<string> {
    return await db.flashCards.add({
      id: crypto.randomUUID(),
      ...card,
    } as FlashCard);
  },

  async bulkCreate(cards: Omit<FlashCard, 'id'>[]): Promise<void> {
    const cardsWithIds = cards.map((c) => ({
      id: crypto.randomUUID(),
      ...c,
    })) as FlashCard[];

    await db.flashCards.bulkAdd(cardsWithIds);
  },
};

// ============================================================================
// User Progress Operations
// ============================================================================

export const userProgressOps = {
  /**
   * Get or create user progress for a given user
   */
  async getOrCreate(userId: string): Promise<UserProgress> {
    let progress = await db.userProgress.where('user_id').equals(userId).first();

    if (!progress) {
      const newProgress: UserProgress = {
        id: crypto.randomUUID(),
        user_id: userId,
        structures_viewed: [],
        structures_bookmarked: [],
        chapters_started: {},
        modules_completed: {},
        assessments_completed: {},
        total_study_time_seconds: 0,
        current_streak_days: 0,
        longest_streak_days: 0,
        last_activity_at: new Date(),
      };

      await db.userProgress.add(newProgress);
      progress = newProgress;
    }

    return progress;
  },

  /**
   * Mark structure as viewed
   */
  async markStructureViewed(userId: string, structureId: string): Promise<void> {
    const progress = await this.getOrCreate(userId);

    if (!progress.structures_viewed.includes(structureId)) {
      await db.userProgress.update(progress.id, {
        structures_viewed: [...progress.structures_viewed, structureId],
        last_activity_at: new Date(),
      });
    }
  },

  /**
   * Toggle bookmark for a structure
   */
  async toggleBookmark(userId: string, structureId: string): Promise<boolean> {
    const progress = await this.getOrCreate(userId);
    const isBookmarked = progress.structures_bookmarked.includes(structureId);

    const newBookmarks = isBookmarked
      ? progress.structures_bookmarked.filter((id) => id !== structureId)
      : [...progress.structures_bookmarked, structureId];

    await db.userProgress.update(progress.id, {
      structures_bookmarked: newBookmarks,
      last_activity_at: new Date(),
    });

    return !isBookmarked; // Return new bookmark state
  },

  /**
   * Mark module as completed
   */
  async markModuleCompleted(
    userId: string,
    moduleId: string,
    score: number | null = null
  ): Promise<void> {
    const progress = await this.getOrCreate(userId);

    await db.userProgress.update(progress.id, {
      modules_completed: {
        ...progress.modules_completed,
        [moduleId]: {
          completed_at: new Date(),
          score,
        },
      },
      last_activity_at: new Date(),
    });
  },

  /**
   * Update study time
   */
  async addStudyTime(userId: string, seconds: number): Promise<void> {
    const progress = await this.getOrCreate(userId);

    await db.userProgress.update(progress.id, {
      total_study_time_seconds: progress.total_study_time_seconds + seconds,
      last_activity_at: new Date(),
    });
  },

  /**
   * Update streak
   */
  async updateStreak(userId: string): Promise<void> {
    const progress = await this.getOrCreate(userId);
    const lastActivity = progress.last_activity_at;
    const now = new Date();

    // Check if same day
    const isSameDay =
      lastActivity.toDateString() === now.toDateString();

    // Check if consecutive day
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isConsecutiveDay =
      lastActivity.toDateString() === yesterday.toDateString();

    let newStreak = progress.current_streak_days;

    if (!isSameDay) {
      newStreak = isConsecutiveDay ? progress.current_streak_days + 1 : 1;
    }

    await db.userProgress.update(progress.id, {
      current_streak_days: newStreak,
      longest_streak_days: Math.max(newStreak, progress.longest_streak_days),
      last_activity_at: now,
    });
  },
};

// ============================================================================
// Card Review State Operations (FSRS)
// ============================================================================

export const cardReviewOps = {
  /**
   * Get or create review state for a card
   */
  async getOrCreate(userId: string, cardId: string): Promise<CardReviewState> {
    let state = await db.cardReviewStates
      .where({ user_id: userId, card_id: cardId })
      .first();

    if (!state) {
      const newState: CardReviewState = {
        id: crypto.randomUUID(),
        user_id: userId,
        card_id: cardId,
        due: new Date(),
        stability: 0,
        difficulty: 0,
        elapsed_days: 0,
        scheduled_days: 0,
        reps: 0,
        lapses: 0,
        state: CardState.NEW,
        last_review: null,
        ease_factor: 2.5,
        interval: 0,
        total_reviews: 0,
        total_correct: 0,
      };

      await db.cardReviewStates.add(newState);
      state = newState;
    }

    return state;
  },

  /**
   * Get all due cards for review
   */
  async getDueCards(userId: string, limit: number = 100): Promise<CardReviewState[]> {
    const now = new Date();

    return await db.cardReviewStates
      .where('user_id')
      .equals(userId)
      .and((state) => state.due <= now)
      .limit(limit)
      .toArray();
  },

  /**
   * Get new cards
   */
  async getNewCards(userId: string, limit: number = 20): Promise<CardReviewState[]> {
    return await db.cardReviewStates
      .where({ user_id: userId, state: CardState.NEW })
      .limit(limit)
      .toArray();
  },

  /**
   * Update review state (after rating)
   */
  async updateState(id: string, updates: Partial<CardReviewState>): Promise<void> {
    await db.cardReviewStates.update(id, updates);
  },

  /**
   * Get retention rate for user
   */
  async getRetentionRate(userId: string): Promise<number> {
    const states = await db.cardReviewStates.where('user_id').equals(userId).toArray();

    if (states.length === 0) return 0;

    const totalReviews = states.reduce((sum, s) => sum + s.total_reviews, 0);
    const totalCorrect = states.reduce((sum, s) => sum + s.total_correct, 0);

    return totalReviews > 0 ? (totalCorrect / totalReviews) * 100 : 0;
  },
};

// ============================================================================
// Study Session Operations
// ============================================================================

export const studySessionOps = {
  /**
   * Create new session
   */
  async start(userId: string, sessionType: SessionType): Promise<string> {
    const session: StudySession = {
      id: crypto.randomUUID(),
      user_id: userId,
      session_type: sessionType,
      started_at: new Date(),
      ended_at: null,
      duration_seconds: 0,
      structures_viewed: null,
      module_id: null,
      cards_reviewed: null,
      cards_correct: null,
    };

    return await db.studySessions.add(session);
  },

  /**
   * End session
   */
  async end(
    id: string,
    data: {
      structures_viewed?: string[];
      module_id?: string;
      cards_reviewed?: number;
      cards_correct?: number;
    }
  ): Promise<void> {
    const session = await db.studySessions.get(id);
    if (!session) return;

    const endedAt = new Date();
    const startedAt = session.started_at;
    const durationSeconds = Math.floor(
      (endedAt.getTime() - startedAt.getTime()) / 1000
    );

    await db.studySessions.update(id, {
      ended_at: endedAt,
      duration_seconds: durationSeconds,
      ...data,
    });

    // Update user's total study time
    await userProgressOps.addStudyTime(session.user_id, durationSeconds);
  },

  /**
   * Get recent sessions
   */
  async getRecent(userId: string, limit: number = 10): Promise<StudySession[]> {
    return await db.studySessions
      .where('user_id')
      .equals(userId)
      .reverse()
      .limit(limit)
      .toArray();
  },

  /**
   * Get sessions by type
   */
  async getByType(
    userId: string,
    sessionType: SessionType
  ): Promise<StudySession[]> {
    return await db.studySessions
      .where({ user_id: userId, session_type: sessionType })
      .reverse()
      .toArray();
  },
};

// ============================================================================
// Global Search Operations
// ============================================================================

export const searchOps = {
  /**
   * Comprehensive search across structures and related content
   */
  async search(query: string): Promise<SearchResult> {
    const lowerQuery = query.toLowerCase();

    // Search structures
    const structures = await structureOps.searchByName(query);

    // Search regions
    const allRegions = await db.regions.toArray();
    const regions = allRegions.filter((r) =>
      r.name.toLowerCase().includes(lowerQuery)
    );

    // Search clinical terms (from structure clinical significance)
    const allStructures = await db.structures.toArray();
    const clinicalMatches = allStructures
      .filter((s) => s.clinical_significance.toLowerCase().includes(lowerQuery))
      .map((s) => ({
        term: s.canonical_name,
        relatedStructureIds: [s.id],
      }));

    return {
      structures,
      regions,
      clinicalTerms: clinicalMatches,
    };
  },
};

// ============================================================================
// Export all operations
// ============================================================================

export const operations = {
  structures: structureOps,
  relationships: relationshipOps,
  physicalReferences: physicalRefOps,
  externalLinks: externalLinkOps,
  regions: regionOps,
  systems: systemOps,
  chapters: chapterOps,
  modules: moduleOps,
  flashCards: flashCardOps,
  userProgress: userProgressOps,
  cardReviews: cardReviewOps,
  studySessions: studySessionOps,
  search: searchOps,
};
