/**
 * Seed Data Index
 * Aggregates all regional anatomical seed data for database initialization
 */

import { lowerLimbSeedData } from './lower-limb';
import { thoraxSeedData } from './thorax';
import { abdomenSeedData } from './abdomen';
import { headNeckSeedData } from './head-neck';
import { backSeedData } from './back';
import { pelvisSeedData } from './pelvis';
import { neuroanatomySeedData } from './neuroanatomy';

// ============================================================================
// Common Types for Seed Data
// ============================================================================

import type { StructureType, RelationshipType } from '@/types';

export interface SeedRegion {
  id?: string;
  name: string;
  slug: string;
  description: string;
  atlas_plate_range?: string;
  sort_order?: number;
  thumbnail_url?: string;
  color?: string;
  color_code?: string;
}

export interface SeedSystem {
  id: string;
  name: string;
  slug: string;
  description: string;
  color_code: string;
  sort_order: number;
}

export interface SeedStructure {
  id: string;
  canonical_name: string;
  common_names: string[];
  latin_name: string | null;
  pronunciation_ipa: string;
  region_id: string;
  system_ids: string[];
  structure_type: StructureType;
  parent_structure_id: string | null;
  definition_brief: string;
  description_full: string;
  clinical_significance: string;
  origin: string | null;
  insertion: string | null;
  action: string | null;
  innervation: string | null;
  blood_supply: string | null;
  model_reference: string;
  image_references: unknown[];
  difficulty_rating: number;
  prerequisite_ids: string[];
  netter_plates?: string[];
}

export interface SeedRelationship {
  id: string;
  source_structure_id: string;
  target_structure_id: string;
  relationship_type: RelationshipType;
  description: string;
  bidirectional: boolean;
  clinical_relevance: string | null;
}

// Flexible interface to accept different seed data shapes
interface FlexibleRegionSeedData {
  region: SeedRegion;
  systems: SeedSystem[];
  structures: SeedStructure[];
  relationships: SeedRelationship[];
}

// ============================================================================
// Aggregated Seed Data
// ============================================================================

/**
 * All regional seed data collections
 * Using unknown + type assertion to handle varying seed file interfaces
 */
const seedDataSources: unknown[] = [
  headNeckSeedData,
  backSeedData,
  thoraxSeedData,
  abdomenSeedData,
  pelvisSeedData,
  lowerLimbSeedData,
  neuroanatomySeedData,
];

export const allRegionSeedData: FlexibleRegionSeedData[] = seedDataSources as FlexibleRegionSeedData[];

/**
 * Get all regions from seed data
 */
export function getAllSeedRegions(): SeedRegion[] {
  return allRegionSeedData.map(data => data.region);
}

/**
 * Get all systems from seed data (deduplicated by slug)
 */
export function getAllSeedSystems(): SeedSystem[] {
  const systemMap = new Map<string, SeedSystem>();

  allRegionSeedData.forEach(regionData => {
    regionData.systems.forEach(system => {
      // Use global system ID rather than regional
      const globalSlug = system.slug.replace(/^system-\w+-/, '');
      if (!systemMap.has(globalSlug)) {
        systemMap.set(globalSlug, {
          ...system,
          slug: globalSlug,
          id: `system-${globalSlug}`,
        });
      }
    });
  });

  return Array.from(systemMap.values());
}

/**
 * Get all structures from seed data
 */
export function getAllSeedStructures(): SeedStructure[] {
  return allRegionSeedData.flatMap(data => data.structures);
}

/**
 * Get all relationships from seed data
 */
export function getAllSeedRelationships(): SeedRelationship[] {
  return allRegionSeedData.flatMap(data => data.relationships);
}

/**
 * Get seed statistics
 */
export function getSeedStatistics(): {
  regions: number;
  systems: number;
  structures: number;
  relationships: number;
  byRegion: Record<string, { structures: number; relationships: number }>;
} {
  const byRegion: Record<string, { structures: number; relationships: number }> = {};

  allRegionSeedData.forEach(data => {
    byRegion[data.region.slug] = {
      structures: data.structures.length,
      relationships: data.relationships.length,
    };
  });

  return {
    regions: allRegionSeedData.length,
    systems: getAllSeedSystems().length,
    structures: getAllSeedStructures().length,
    relationships: getAllSeedRelationships().length,
    byRegion,
  };
}

// Re-export individual region data for direct access
export {
  lowerLimbSeedData,
  thoraxSeedData,
  abdomenSeedData,
  headNeckSeedData,
  backSeedData,
  pelvisSeedData,
  neuroanatomySeedData,
};
