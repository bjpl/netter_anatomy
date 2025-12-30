/**
 * Database Seed Module
 * Provides functions to populate the database with initial/sample data
 *
 * Supports seeding from comprehensive regional anatomical data including:
 * - Head & Neck, Back, Thorax, Abdomen, Pelvis, Lower Limb, Neuroanatomy
 */

import { db } from './index';
import { operations } from './operations';
import type { StructureType } from '../../types';
import {
  getAllSeedStructures,
  getAllSeedRelationships,
  getSeedStatistics,
  type SeedStructure,
} from './seeds';
import type { ImageReference } from '../../types';

// ============================================================================
// Seed Data Interfaces
// ============================================================================

interface SeedOptions {
  clearExisting?: boolean;
  includeTestData?: boolean;
  includeComprehensiveData?: boolean;
}

// ============================================================================
// Main Seed Function
// ============================================================================

/**
 * Seed the database with initial data
 */
export async function seedDatabase(options: SeedOptions = {}): Promise<void> {
  const { clearExisting = false, includeTestData = false, includeComprehensiveData = true } = options;

  console.log('🌱 Starting database seeding...');

  try {
    // Clear existing data if requested
    if (clearExisting) {
      console.log('🗑️  Clearing existing data...');
      await db.clearAll();
    }

    // Seed in dependency order
    await seedRegions();
    await seedSystems();

    // Load comprehensive anatomical data from all regions
    if (includeComprehensiveData) {
      console.log('📚 Loading comprehensive anatomical data...');
      const stats = getSeedStatistics();
      console.log(`  📊 Available: ${stats.regions} regions, ${stats.structures} structures, ${stats.relationships} relationships`);

      await seedComprehensiveStructures();
      await seedComprehensiveRelationships();
      await seedComprehensiveChapters();
    }

    if (includeTestData) {
      await seedSampleStructures();
      await seedSampleRelationships();
      await seedSampleReferences();
      await seedSampleChapters();
      await seedSampleFlashCards();
    }

    console.log('✅ Database seeding completed successfully!');

    // Print statistics
    const dbStats = await db.getStats();
    console.log('📊 Database Statistics:', dbStats);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// ============================================================================
// Region Seeding
// ============================================================================

async function seedRegions(): Promise<void> {
  console.log('📍 Seeding regions...');

  const regions = [
    {
      name: 'Head & Neck',
      slug: 'head-neck',
      description: 'Cranium, face, neck structures',
      atlas_plate_range: '1-148',
      sort_order: 1,
      thumbnail_url: '/assets/regions/head-neck.png',
    },
    {
      name: 'Back & Spinal Cord',
      slug: 'back-spinal-cord',
      description: 'Vertebral column, spinal cord, and back muscles',
      atlas_plate_range: '149-177',
      sort_order: 2,
      thumbnail_url: '/assets/regions/back-spinal-cord.png',
    },
    {
      name: 'Thorax',
      slug: 'thorax',
      description: 'Chest wall, lungs, heart, and mediastinum',
      atlas_plate_range: '178-241',
      sort_order: 3,
      thumbnail_url: '/assets/regions/thorax.png',
    },
    {
      name: 'Abdomen',
      slug: 'abdomen',
      description: 'Abdominal wall and viscera',
      atlas_plate_range: '242-328',
      sort_order: 4,
      thumbnail_url: '/assets/regions/abdomen.png',
    },
    {
      name: 'Pelvis & Perineum',
      slug: 'pelvis-perineum',
      description: 'Pelvic bones, organs, and perineal structures',
      atlas_plate_range: '329-399',
      sort_order: 5,
      thumbnail_url: '/assets/regions/pelvis-perineum.png',
    },
    {
      name: 'Upper Limb',
      slug: 'upper-limb',
      description: 'Shoulder, arm, forearm, and hand',
      atlas_plate_range: '400-468',
      sort_order: 6,
      thumbnail_url: '/assets/regions/upper-limb.png',
    },
    {
      name: 'Lower Limb',
      slug: 'lower-limb',
      description: 'Hip, thigh, leg, and foot',
      atlas_plate_range: '469-531',
      sort_order: 7,
      thumbnail_url: '/assets/regions/lower-limb.png',
    },
  ];

  await operations.regions.bulkCreate(regions);
  console.log(`  ✓ Created ${regions.length} regions`);
}

// ============================================================================
// System Seeding
// ============================================================================

async function seedSystems(): Promise<void> {
  console.log('🔧 Seeding body systems...');

  const systems = [
    {
      name: 'Skeletal System',
      slug: 'skeletal',
      description: 'Bones, joints, and cartilage',
      color_code: '#F5F0E6',
      sort_order: 1,
    },
    {
      name: 'Muscular System',
      slug: 'muscular',
      description: 'Skeletal muscles and tendons',
      color_code: '#C45C5C',
      sort_order: 2,
    },
    {
      name: 'Nervous System',
      slug: 'nervous',
      description: 'Brain, spinal cord, and peripheral nerves',
      color_code: '#E6C744',
      sort_order: 3,
    },
    {
      name: 'Cardiovascular System',
      slug: 'cardiovascular',
      description: 'Heart, arteries, and veins',
      color_code: '#D64545',
      sort_order: 4,
    },
    {
      name: 'Lymphatic System',
      slug: 'lymphatic',
      description: 'Lymph nodes, vessels, and organs',
      color_code: '#7ED957',
      sort_order: 5,
    },
    {
      name: 'Respiratory System',
      slug: 'respiratory',
      description: 'Airways and lungs',
      color_code: '#87CEEB',
      sort_order: 6,
    },
    {
      name: 'Digestive System',
      slug: 'digestive',
      description: 'GI tract and accessory organs',
      color_code: '#DEB887',
      sort_order: 7,
    },
    {
      name: 'Urinary System',
      slug: 'urinary',
      description: 'Kidneys, ureters, bladder, urethra',
      color_code: '#FFD700',
      sort_order: 8,
    },
    {
      name: 'Reproductive System',
      slug: 'reproductive',
      description: 'Male and female reproductive organs',
      color_code: '#FFB6C1',
      sort_order: 9,
    },
    {
      name: 'Endocrine System',
      slug: 'endocrine',
      description: 'Hormone-producing glands',
      color_code: '#9370DB',
      sort_order: 10,
    },
  ];

  await operations.systems.bulkCreate(systems);
  console.log(`  ✓ Created ${systems.length} systems`);
}

// ============================================================================
// Comprehensive Structure Seeding (All Regions)
// ============================================================================

async function seedComprehensiveStructures(): Promise<void> {
  console.log('🦴 Seeding comprehensive structures from all regions...');

  const allStructures = getAllSeedStructures();
  const regions = await operations.regions.getAll();
  const systems = await operations.systems.getAll();

  // Create maps for ID lookup
  const regionMap = new Map(regions.map(r => [r.slug, r.id]));
  const systemMap = new Map(systems.map(s => [s.slug, s.id]));

  // Transform seed structures to database format
  const dbStructures = allStructures.map((structure: SeedStructure) => {
    // Extract region slug from region_id (e.g., 'region-lower-limb' -> 'lower-limb')
    const regionSlug = structure.region_id.replace('region-', '');
    const dbRegionId = regionMap.get(regionSlug) ?? regions[0]?.id ?? '';

    // Map system IDs
    const dbSystemIds = structure.system_ids
      .map(sysId => {
        // Extract system slug (e.g., 'system-ll-skeletal' -> 'skeletal')
        const parts = sysId.split('-');
        const systemSlug = parts[parts.length - 1] ?? sysId;
        return systemMap.get(systemSlug);
      })
      .filter((id): id is string => id !== undefined);

    return {
      canonical_name: structure.canonical_name,
      common_names: structure.common_names,
      latin_name: structure.latin_name,
      pronunciation_ipa: structure.pronunciation_ipa,
      region_id: dbRegionId,
      system_ids: dbSystemIds,
      structure_type: structure.structure_type as StructureType,
      parent_structure_id: null, // Will be updated in second pass if needed
      definition_brief: structure.definition_brief,
      description_full: structure.description_full,
      clinical_significance: structure.clinical_significance,
      origin: structure.origin,
      insertion: structure.insertion,
      action: structure.action,
      innervation: structure.innervation,
      blood_supply: structure.blood_supply,
      model_reference: structure.model_reference,
      image_references: structure.image_references as ImageReference[],
      difficulty_rating: structure.difficulty_rating,
      prerequisite_ids: [], // Will be populated after all structures exist
      created_at: new Date(),
      updated_at: new Date(),
    };
  });

  // Bulk create structures
  await operations.structures.bulkCreate(dbStructures);
  console.log(`  ✓ Created ${dbStructures.length} anatomical structures`);
}

async function seedComprehensiveRelationships(): Promise<void> {
  console.log('🔗 Seeding comprehensive relationships...');

  const allRelationships = getAllSeedRelationships();

  // Get all structures by querying each region
  const regions = await operations.regions.getAll();
  const allDbStructures: Array<{ id: string; canonical_name: string }> = [];

  for (const region of regions) {
    const regionStructures = await operations.structures.getByRegion(region.id);
    allDbStructures.push(...regionStructures.map(s => ({ id: s.id, canonical_name: s.canonical_name })));
  }

  // Create map of seed IDs to database IDs by canonical name
  const structureMap = new Map(allDbStructures.map(s => [s.canonical_name.toLowerCase(), s.id]));

  // Get seed structures for ID mapping
  const seedStructures = getAllSeedStructures();
  const seedIdToName = new Map(seedStructures.map((s: SeedStructure) => [s.id, s.canonical_name.toLowerCase()]));

  // Transform relationships
  const dbRelationships: Array<{
    source_structure_id: string;
    target_structure_id: string;
    relationship_type: typeof allRelationships[0]['relationship_type'];
    description: string;
    bidirectional: boolean;
    clinical_relevance: string | null;
    created_at: Date;
    updated_at: Date;
  }> = [];

  for (const rel of allRelationships) {
    const sourceName = seedIdToName.get(rel.source_structure_id);
    const targetName = seedIdToName.get(rel.target_structure_id);

    if (!sourceName || !targetName) continue;

    const sourceDbId = structureMap.get(sourceName);
    const targetDbId = structureMap.get(targetName);

    if (!sourceDbId || !targetDbId) continue;

    dbRelationships.push({
      source_structure_id: sourceDbId,
      target_structure_id: targetDbId,
      relationship_type: rel.relationship_type,
      description: rel.description,
      bidirectional: rel.bidirectional,
      clinical_relevance: rel.clinical_relevance,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  if (dbRelationships.length > 0) {
    await operations.relationships.bulkCreate(dbRelationships);
  }
  console.log(`  ✓ Created ${dbRelationships.length} anatomical relationships`);
}

async function seedComprehensiveChapters(): Promise<void> {
  console.log('📖 Seeding chapters for all regions...');

  const regions = await operations.regions.getAll();

  const chapters = regions.map((region, index) => ({
    number: index + 1,
    title: region.name,
    description: `Comprehensive study of ${region.name.toLowerCase()} anatomy`,
    region_id: region.id,
    estimated_duration_minutes: 360,
    sort_order: index + 1,
    prerequisite_chapter_id: null,
  }));

  await operations.chapters.bulkCreate(chapters);
  console.log(`  ✓ Created ${chapters.length} chapters`);
}

// ============================================================================
// Sample Structure Seeding (Test Data)
// ============================================================================

async function seedSampleStructures(): Promise<void> {
  console.log('🦴 Seeding sample structures...');

  // Get reference data
  const upperLimb = await operations.regions.getBySlug('upper-limb');
  const skeletal = await operations.systems.getBySlug('skeletal');
  const muscular = await operations.systems.getBySlug('muscular');
  const nervous = await operations.systems.getBySlug('nervous');

  if (!upperLimb || !skeletal || !muscular || !nervous) {
    throw new Error('Required regions/systems not found');
  }

  const sampleStructures = [
    {
      canonical_name: 'Humerus',
      common_names: ['Upper arm bone'],
      latin_name: 'Os humeri',
      pronunciation_ipa: '/ˈhjuːmərəs/',
      region_id: upperLimb.id,
      system_ids: [skeletal.id],
      structure_type: 'bone' as StructureType,
      parent_structure_id: null,
      definition_brief: 'The long bone of the upper arm, extending from the shoulder to the elbow.',
      description_full: `The humerus is the longest and largest bone of the upper limb. It articulates proximally with the scapula at the glenohumeral joint and distally with the radius and ulna at the elbow joint.\n\nThe proximal end features the humeral head, anatomical neck, greater and lesser tubercles, and surgical neck. The shaft is cylindrical proximally and triangular distally. The distal end includes the trochlea, capitulum, and medial and lateral epicondyles.`,
      clinical_significance: 'Fractures commonly occur at the surgical neck (especially in elderly), mid-shaft (radial nerve injury risk), and supracondylar region (in children). The radial groove houses the radial nerve, making it vulnerable in mid-shaft fractures.',
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: 'Profunda brachii artery (primary), anterior and posterior circumflex humeral arteries',
      model_reference: 'humerus_right',
      image_references: [],
      difficulty_rating: 2,
      prerequisite_ids: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      canonical_name: 'Biceps brachii',
      common_names: ['Biceps'],
      latin_name: 'Musculus biceps brachii',
      pronunciation_ipa: '/ˈbaɪsɛps ˈbreɪkiaɪ/',
      region_id: upperLimb.id,
      system_ids: [muscular.id],
      structure_type: 'muscle' as StructureType,
      parent_structure_id: null,
      definition_brief: 'A two-headed muscle of the anterior arm that flexes the elbow and supinates the forearm.',
      description_full: `The biceps brachii is a prominent muscle of the anterior compartment of the arm. It has two heads that arise from the scapula and unite to form a single muscle belly that inserts on the radius.\n\nThe long head originates from the supraglenoid tubercle of the scapula, passing through the intertubercular groove. The short head originates from the coracoid process. Both heads converge to insert via a common tendon onto the radial tuberosity, with an additional insertion via the bicipital aponeurosis into the deep fascia of the forearm.`,
      clinical_significance: 'Rupture of the long head tendon produces the characteristic "Popeye" deformity. The biceps reflex (C5-C6) is commonly tested. Bicipital tendinitis is a common cause of shoulder pain.',
      origin: 'Long head: supraglenoid tubercle; Short head: coracoid process',
      insertion: 'Radial tuberosity and bicipital aponeurosis',
      action: 'Elbow flexion, forearm supination, weak shoulder flexion',
      innervation: 'Musculocutaneous nerve (C5-C6)',
      blood_supply: 'Muscular branches of brachial artery',
      model_reference: 'biceps_brachii',
      image_references: [],
      difficulty_rating: 3,
      prerequisite_ids: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await operations.structures.bulkCreate(sampleStructures);
  console.log(`  ✓ Created ${sampleStructures.length} sample structures`);
}

// ============================================================================
// Sample Relationship Seeding
// ============================================================================

async function seedSampleRelationships(): Promise<void> {
  console.log('🔗 Seeding sample relationships...');

  // This would create relationships between the sample structures
  // For now, just a stub
  console.log('  ℹ️  Relationship seeding stub (to be implemented with actual structure IDs)');
}

// ============================================================================
// Sample Physical Reference Seeding
// ============================================================================

async function seedSampleReferences(): Promise<void> {
  console.log('📚 Seeding sample physical references...');

  // This would create references to Netter's resources
  // For now, just a stub
  console.log('  ℹ️  Physical reference seeding stub (to be implemented)');
}

// ============================================================================
// Sample Chapter Seeding
// ============================================================================

async function seedSampleChapters(): Promise<void> {
  console.log('📖 Seeding sample chapters...');

  const upperLimb = await operations.regions.getBySlug('upper-limb');
  if (!upperLimb) throw new Error('Upper limb region not found');

  const chapters = [
    {
      number: 6,
      title: 'Upper Limb',
      description: 'Comprehensive study of upper limb anatomy including shoulder, arm, forearm, and hand',
      region_id: upperLimb.id,
      estimated_duration_minutes: 360,
      sort_order: 6,
      prerequisite_chapter_id: null,
    },
  ];

  await operations.chapters.bulkCreate(chapters);
  console.log(`  ✓ Created ${chapters.length} sample chapters`);
}

// ============================================================================
// Sample FlashCard Seeding
// ============================================================================

async function seedSampleFlashCards(): Promise<void> {
  console.log('🎴 Seeding sample flashcards...');

  // This would create flashcards for the sample structures
  // For now, just a stub
  console.log('  ℹ️  Flashcard seeding stub (to be implemented)');
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Reset database to initial state
 */
export async function resetDatabase(): Promise<void> {
  console.log('🔄 Resetting database...');
  await seedDatabase({ clearExisting: true, includeTestData: false });
}

/**
 * Load full test dataset
 */
export async function loadTestData(): Promise<void> {
  console.log('🧪 Loading test data...');
  await seedDatabase({ clearExisting: true, includeTestData: true });
}

/**
 * Check if database is empty
 */
export async function isDatabaseEmpty(): Promise<boolean> {
  const stats = await db.getStats();
  return stats.regions === 0 && stats.systems === 0;
}

/**
 * Initialize database with minimal required data
 */
export async function initializeDatabase(): Promise<void> {
  const isEmpty = await isDatabaseEmpty();

  if (isEmpty) {
    console.log('📦 Initializing empty database...');
    await seedDatabase({ clearExisting: false, includeTestData: false });
  } else {
    console.log('✓ Database already initialized');
  }
}
