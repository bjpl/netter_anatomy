/**
 * Core Anatomical Type Definitions
 * Based on Netter's Anatomy Tool Specification Section 11.1
 */

/** UUID type alias for clarity */
export type UUID = string;

/**
 * Anatomical structure types
 */
export enum StructureType {
  BONE = 'bone',
  MUSCLE = 'muscle',
  NERVE = 'nerve',
  ARTERY = 'artery',
  VEIN = 'vein',
  ORGAN = 'organ',
  LIGAMENT = 'ligament',
  FASCIA = 'fascia',
  OTHER = 'other',
}

/**
 * Types of relationships between anatomical structures
 */
export enum RelationshipType {
  ARTICULATES_WITH = 'articulates_with',
  ATTACHES_TO = 'attaches_to',
  INNERVATED_BY = 'innervated_by',
  SUPPLIED_BY = 'supplied_by',
  DRAINS_TO = 'drains_to',
  CONTAINS = 'contains',
  PASSES_THROUGH = 'passes_through',
  ANTAGONIST_TO = 'antagonist_to',
  SYNERGIST_WITH = 'synergist_with',
  BRANCH_OF = 'branch_of',
  CONTINUOUS_WITH = 'continuous_with',
  SUPERFICIAL_TO = 'superficial_to',
  DEEP_TO = 'deep_to',
}

/**
 * Resource types for physical references
 */
export enum ResourceType {
  ATLAS = 'atlas',
  COLORING_BOOK = 'coloring_book',
  FLASHCARD = 'flashcard',
}

/**
 * External content source types
 */
export enum SourceType {
  OPENSTAX = 'openstax',
  WIKIPEDIA = 'wikipedia',
  Z_ANATOMY = 'z_anatomy',
  ANATOMOGRAPHY = 'anatomography',
  RADIOPAEDIA = 'radiopaedia',
  OTHER = 'other',
}

/**
 * Image reference metadata
 */
export interface ImageReference {
  /** Unique identifier */
  id: UUID;
  /** Image URL or path */
  url: string;
  /** Image caption/description */
  caption: string;
  /** Image source (e.g., "Gray's 1918") */
  source: string;
  /** License information */
  license?: string;
  /** Plate or figure number */
  plateNumber?: string;
}

/**
 * Core anatomical structure entity
 * Represents any anatomical structure in the system
 */
export interface Structure {
  /** Unique identifier */
  id: UUID;

  /** Canonical name from Terminologia Anatomica 2019 */
  canonical_name: string;

  /** Common alternative names and synonyms */
  common_names: string[];

  /** Latin name if applicable */
  latin_name: string | null;

  /** IPA pronunciation guide */
  pronunciation_ipa: string;

  /** Primary anatomical region */
  region_id: UUID;

  /** Body systems this structure belongs to (can be multiple) */
  system_ids: UUID[];

  /** Type of anatomical structure */
  structure_type: StructureType;

  /** Parent structure in hierarchy */
  parent_structure_id: UUID | null;

  /** Brief definition (≤280 characters, suitable for flashcards) */
  definition_brief: string;

  /** Full description in markdown format */
  description_full: string;

  /** Clinical significance and relevance in markdown */
  clinical_significance: string;

  /** Muscle origin (muscles only) */
  origin: string | null;

  /** Muscle insertion (muscles only) */
  insertion: string | null;

  /** Muscle action (muscles only) */
  action: string | null;

  /** Innervation information */
  innervation: string | null;

  /** Blood supply information */
  blood_supply: string | null;

  /** Z-Anatomy structure identifier for 3D model reference */
  model_reference: string;

  /** Associated image references */
  image_references: ImageReference[];

  /** Difficulty rating (1-5, where 5 is most difficult) */
  difficulty_rating: number;

  /** Prerequisite structures that should be learned first */
  prerequisite_ids: UUID[];

  /** Creation timestamp */
  created_at: Date;

  /** Last update timestamp */
  updated_at: Date;
}

/**
 * Anatomical region (e.g., Upper Limb, Thorax)
 */
export interface Region {
  /** Unique identifier */
  id: UUID;

  /** Region name */
  name: string;

  /** URL-friendly slug */
  slug: string;

  /** Region description */
  description: string;

  /** Atlas plate range for this region (e.g., "400-468") */
  atlas_plate_range: string;

  /** Sort order for display */
  sort_order: number;

  /** Thumbnail image URL */
  thumbnail_url: string;
}

/**
 * Body system (e.g., Nervous System, Cardiovascular System)
 */
export interface System {
  /** Unique identifier */
  id: UUID;

  /** System name */
  name: string;

  /** URL-friendly slug */
  slug: string;

  /** System description */
  description: string;

  /** Color code for visualization (hex format) */
  color_code: string;

  /** Sort order for display */
  sort_order: number;
}

/**
 * Relationship between two anatomical structures
 */
export interface Relationship {
  /** Unique identifier */
  id: UUID;

  /** Source structure */
  source_structure_id: UUID;

  /** Target structure */
  target_structure_id: UUID;

  /** Type of relationship */
  relationship_type: RelationshipType;

  /** Description of the relationship */
  description: string;

  /** Whether the relationship is bidirectional */
  bidirectional: boolean;

  /** Clinical relevance of this relationship */
  clinical_relevance: string | null;
}

/**
 * Physical resource reference (Netter's materials)
 */
export interface PhysicalReference {
  /** Unique identifier */
  id: UUID;

  /** Associated structure */
  structure_id: UUID;

  /** Type of resource */
  resource_type: ResourceType;

  /** Edition information (e.g., "6th Edition") */
  edition: string;

  /** ISBN of the resource */
  isbn: string;

  /** Plate/exercise/card number */
  primary_number: string;

  /** Page number (null for flashcards) */
  page_number: number | null;

  /** Title of the plate/exercise/card */
  title: string;

  /** Additional notes about this reference */
  notes: string | null;

  /** Whether this is the primary reference for the structure */
  is_primary: boolean;
}

/**
 * External resource link
 */
export interface ExternalLink {
  /** Unique identifier */
  id: UUID;

  /** Associated structure */
  structure_id: UUID;

  /** Source of the external link */
  source: SourceType;

  /** URL of the external resource */
  url: string;

  /** Title/description of the link */
  title: string;

  /** Additional description */
  description: string | null;

  /** Last time link was validated */
  last_validated: Date;

  /** Whether the link is currently active */
  is_active: boolean;
}
