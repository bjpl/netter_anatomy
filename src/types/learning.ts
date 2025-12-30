/**
 * Learning Module Type Definitions
 * Based on Netter's Anatomy Tool Specification Section 11.2
 */

import type { UUID } from './anatomy';

/**
 * Types of learning modules
 */
export enum ModuleType {
  /** Introduces regional scope and key concepts */
  OVERVIEW = 'overview',
  /** Focuses on specific anatomical structures */
  STRUCTURE = 'structure',
  /** Teaches relationships and functional integration */
  SYNTHESIS = 'synthesis',
  /** Comprehensive chapter review */
  ASSESSMENT = 'assessment',
}

/**
 * Types of flashcards
 */
export enum CardType {
  /** Term to definition */
  DEFINITION = 'definition',
  /** Image-based structure identification */
  IDENTIFICATION = 'identification',
  /** Function to structure */
  FUNCTION = 'function',
  /** Innervation questions */
  INNERVATION = 'innervation',
  /** Relationship completion */
  RELATIONSHIP = 'relationship',
  /** Clinical application */
  CLINICAL = 'clinical',
}

/**
 * Learning chapter (regional organization)
 */
export interface Chapter {
  /** Unique identifier */
  id: UUID;

  /** Chapter number (1-8) */
  number: number;

  /** Chapter title */
  title: string;

  /** Chapter description */
  description: string;

  /** Associated anatomical region */
  region_id: UUID;

  /** Estimated duration in minutes */
  estimated_duration_minutes: number;

  /** Sort order for display */
  sort_order: number;

  /** Prerequisite chapter (null if none) */
  prerequisite_chapter_id: UUID | null;
}

/**
 * Module content structure
 * This is a flexible JSON structure that varies by module type
 */
export type ModuleContent = {
  /** Content sections */
  sections?: Array<{
    /** Section title */
    title: string;
    /** Section content in markdown */
    content: string;
    /** Associated structure IDs */
    structure_ids?: UUID[];
    /** Embedded media */
    media?: Array<{
      type: 'image' | '3d_model' | 'video';
      url: string;
      caption?: string;
    }>;
  }>;

  /** Learning objectives */
  objectives?: string[];

  /** Interactive exercises */
  exercises?: Array<{
    /** Exercise type */
    type: 'quiz' | 'drag_drop' | 'pathway_trace' | 'matching';
    /** Exercise prompt */
    prompt: string;
    /** Exercise data (structure varies by type) */
    data: Record<string, unknown>;
  }>;

  /** Summary points */
  summary?: string[];
};

/**
 * Learning module
 */
export interface Module {
  /** Unique identifier */
  id: UUID;

  /** Parent chapter */
  chapter_id: UUID;

  /** Module title */
  title: string;

  /** Type of module */
  module_type: ModuleType;

  /** Sort order within chapter */
  sort_order: number;

  /** Estimated duration in minutes */
  estimated_duration_minutes: number;

  /** Module content (structure varies by module_type) */
  content: ModuleContent;
}

/**
 * Flashcard for spaced repetition
 */
export interface FlashCard {
  /** Unique identifier */
  id: UUID;

  /** Associated anatomical structure */
  structure_id: UUID;

  /** Type of flashcard */
  card_type: CardType;

  /** Front content in markdown */
  front_content: string;

  /** Back content in markdown */
  back_content: string;

  /** Front image URL (optional) */
  front_image_url: string | null;

  /** Back image URL (optional) */
  back_image_url: string | null;

  /** Tags for categorization */
  tags: string[];

  /** Source module if auto-generated */
  source_module_id: UUID | null;
}
