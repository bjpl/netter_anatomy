/**
 * Back Anatomical Region Seed Data
 * Comprehensive data for the Back & Spinal Cord region
 * Based on Netter's Atlas plates 149-177
 */

import type { UUID } from '@/types';
import { StructureType, RelationshipType } from '@/types';

// ============================================================================
// Type Definitions
// ============================================================================

export interface SystemType {
  id: UUID;
  name: string;
  slug: string;
}

interface SeedStructure {
  canonical_name: string;
  common_names: string[];
  latin_name: string | null;
  pronunciation_ipa: string;
  region_id: UUID;
  system_ids: UUID[];
  structure_type: StructureType;
  parent_structure_id: UUID | null;
  definition_brief: string;
  description_full: string;
  clinical_significance: string;
  origin: string | null;
  insertion: string | null;
  action: string | null;
  innervation: string | null;
  blood_supply: string | null;
  model_reference: string;
  image_references: any[];
  difficulty_rating: number;
  prerequisite_ids: UUID[];
}

interface SeedRelationship {
  source_structure_id: UUID;
  target_structure_id: UUID;
  relationship_type: RelationshipType;
  description: string;
  bidirectional: boolean;
  clinical_relevance: string | null;
}

export interface BackSeedData {
  region: {
    name: string;
    slug: string;
    description: string;
    atlas_plate_range: string;
    color: string;
  };
  systems: SystemType[];
  structures: SeedStructure[];
  relationships: SeedRelationship[];
}

// ============================================================================
// Back Region Definition
// ============================================================================

const region = {
  name: 'Back & Spinal Cord',
  slug: 'back-spinal-cord',
  description: 'Vertebral column, spinal cord, back muscles, and associated structures',
  atlas_plate_range: '149-177',
  color: '#059669', // Emerald color
};

// ============================================================================
// Body Systems
// ============================================================================

const systems: SystemType[] = [
  {
    id: 'skeletal-system' as UUID,
    name: 'Skeletal System',
    slug: 'skeletal',
  },
  {
    id: 'muscular-system' as UUID,
    name: 'Muscular System',
    slug: 'muscular',
  },
  {
    id: 'nervous-system' as UUID,
    name: 'Nervous System',
    slug: 'nervous',
  },
];

// ============================================================================
// Anatomical Structures
// ============================================================================

const structures: SeedStructure[] = [
  // ==========================================================================
  // Vertebrae - Cervical
  // ==========================================================================
  {
    canonical_name: 'Atlas (C1)',
    common_names: ['First cervical vertebra', 'C1'],
    latin_name: 'Atlas',
    pronunciation_ipa: '/ˈætləs/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.BONE,
    parent_structure_id: null,
    definition_brief: 'The first cervical vertebra, supporting the skull and allowing nodding movements.',
    description_full: `The atlas (C1) is the most superior cervical vertebra, uniquely designed to support the skull. It lacks a vertebral body and spinous process, consisting instead of anterior and posterior arches connected by lateral masses.

Key features include:
- Superior articular facets (kidney-shaped) that articulate with the occipital condyles
- Inferior articular facets that articulate with the axis (C2)
- Transverse foramina for vertebral arteries
- Groove for vertebral artery on posterior arch
- Anterior tubercle for attachment of anterior longitudinal ligament
- Posterior tubercle (rudimentary spinous process)`,
    clinical_significance: 'Jefferson fracture (burst fracture of C1) occurs from axial loading. Atlantooccipital dislocation is often fatal. The vertebral artery can be injured during manipulation.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Branches of vertebral artery',
    model_reference: 'atlas_c1',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Axis (C2)',
    common_names: ['Second cervical vertebra', 'C2'],
    latin_name: 'Axis',
    pronunciation_ipa: '/ˈæksɪs/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.BONE,
    parent_structure_id: null,
    definition_brief: 'The second cervical vertebra, featuring the dens that allows rotational movement of the head.',
    description_full: `The axis (C2) is characterized by the odontoid process (dens), a vertical projection from the superior aspect of the vertebral body that articulates with the anterior arch of the atlas.

Key features include:
- Dens (odontoid process) with apex, body, and bifid tip
- Superior articular facets on lateral masses
- Inferior articular facets (similar to typical cervical vertebrae)
- Bifid spinous process
- Transverse foramina
- Strong vertebral body`,
    clinical_significance: 'Odontoid fractures (Anderson-D\'Alonso classification) are common in elderly falls. Atlantoaxial instability can cause spinal cord compression. Hangman\'s fracture involves C2 pedicles.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Branches of vertebral and ascending cervical arteries',
    model_reference: 'axis_c2',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Third Cervical Vertebra (C3)',
    common_names: ['C3', 'C3 vertebra'],
    latin_name: 'Vertebra cervicalis III',
    pronunciation_ipa: '/siː θriː ˈvɜːrtɪbrə/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.BONE,
    parent_structure_id: null,
    definition_brief: 'Typical cervical vertebra with bifid spinous process and transverse foramina.',
    description_full: `C3 is the first typical cervical vertebra, displaying the characteristic features of cervical vertebrae C3-C6.

Key features:
- Small, oval vertebral body
- Large triangular vertebral foramen
- Bifid (split) spinous process
- Transverse processes with anterior and posterior tubercles
- Transverse foramina for vertebral arteries
- Superior and inferior articular facets at 45° angle`,
    clinical_significance: 'C3-C4 disc herniation can affect C4 nerve root. Part of the upper cervical spine involved in whiplash injuries.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Vertebral and ascending cervical arteries',
    model_reference: 'c3_vertebra',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Fourth Cervical Vertebra (C4)',
    common_names: ['C4', 'C4 vertebra'],
    latin_name: 'Vertebra cervicalis IV',
    pronunciation_ipa: '/siː fɔːr ˈvɜːrtɪbrə/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.BONE,
    parent_structure_id: null,
    definition_brief: 'Typical cervical vertebra at the level of the superior thyroid cartilage.',
    description_full: `C4 is a typical cervical vertebra located at the level of the superior margin of the thyroid cartilage.

Shares typical cervical features:
- Small oval body
- Large triangular foramen
- Bifid spinous process
- Transverse foramina
- Articular facets oriented at 45°`,
    clinical_significance: 'C4-C5 is a common site for disc herniation. C5 nerve root exits here. Injury above C4 may require mechanical ventilation (phrenic nerve originates C3-C5).',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Vertebral and ascending cervical arteries',
    model_reference: 'c4_vertebra',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Fifth Cervical Vertebra (C5)',
    common_names: ['C5', 'C5 vertebra'],
    latin_name: 'Vertebra cervicalis V',
    pronunciation_ipa: '/siː faɪv ˈvɜːrtɪbrə/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.BONE,
    parent_structure_id: null,
    definition_brief: 'Typical cervical vertebra, commonly involved in disc herniation.',
    description_full: `C5 is a typical cervical vertebra with all characteristic features of the cervical spine.

Features include:
- Oval vertebral body
- Large vertebral foramen
- Bifid spinous process
- Transverse foramina
- Anterior and posterior tubercles on transverse processes`,
    clinical_significance: 'C5-C6 is the most common level for cervical disc herniation. C6 nerve root exits here, affecting biceps and wrist extensors when compressed.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Vertebral artery branches',
    model_reference: 'c5_vertebra',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Sixth Cervical Vertebra (C6)',
    common_names: ['C6', 'C6 vertebra'],
    latin_name: 'Vertebra cervicalis VI',
    pronunciation_ipa: '/siː sɪks ˈvɜːrtɪbrə/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.BONE,
    parent_structure_id: null,
    definition_brief: 'Typical cervical vertebra with prominent anterior tubercle (carotid tubercle).',
    description_full: `C6 is notable for its prominent anterior tubercle on the transverse process, known as the carotid tubercle (Chassaignac tubercle), used as a landmark for carotid artery compression.

Distinctive features:
- Prominent carotid tubercle
- Standard cervical vertebra features
- Located at level of cricoid cartilage`,
    clinical_significance: 'Carotid tubercle is an important landmark for compressing the carotid artery. C6-C7 disc herniation affects C7 nerve root (triceps, wrist flexors).',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Vertebral artery branches',
    model_reference: 'c6_vertebra',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Seventh Cervical Vertebra (C7)',
    common_names: ['C7', 'Vertebra prominens'],
    latin_name: 'Vertebra prominens',
    pronunciation_ipa: '/siː ˈsɛvən ˈvɜːrtɪbrə/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.BONE,
    parent_structure_id: null,
    definition_brief: 'Transitional cervical vertebra with prominent non-bifid spinous process, easily palpable.',
    description_full: `C7 is known as the vertebra prominens due to its long, non-bifid spinous process that is easily palpable at the base of the neck.

Distinctive features:
- Long, prominent, non-bifid spinous process
- Larger vertebral body (transitional to thoracic)
- Transverse foramina may be small or absent (vertebral artery usually doesn't pass through)
- Small anterior tubercles on transverse processes`,
    clinical_significance: 'Important surface landmark for counting vertebrae. Cervical rib may originate from C7. C7-T1 disc herniation affects C8 nerve root.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Vertebral and deep cervical arteries',
    model_reference: 'c7_vertebra',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },

  // ==========================================================================
  // Vertebrae - Thoracic (Representative samples)
  // ==========================================================================
  {
    canonical_name: 'First Thoracic Vertebra (T1)',
    common_names: ['T1', 'T1 vertebra'],
    latin_name: 'Vertebra thoracica I',
    pronunciation_ipa: '/tiː wʌn ˈvɜːrtɪbrə/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.BONE,
    parent_structure_id: null,
    definition_brief: 'First thoracic vertebra with transitional features between cervical and thoracic regions.',
    description_full: `T1 is a transitional vertebra sharing features of both cervical and thoracic vertebrae.

Key features:
- Complete superior costal facet for first rib
- Demifacet (half facet) for second rib inferiorly
- Long, nearly horizontal spinous process (cervical-like)
- Circular vertebral foramen (smaller than cervical)
- No transverse foramina
- Articular facets transitioning to thoracic orientation`,
    clinical_significance: 'T1 nerve root contributes to brachial plexus. Disc herniation rare but can affect lower trunk of brachial plexus. Important landmark for thoracic outlet.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Supreme intercostal and deep cervical arteries',
    model_reference: 't1_vertebra',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Typical Thoracic Vertebra (T5-T8)',
    common_names: ['Mid-thoracic vertebra'],
    latin_name: 'Vertebra thoracica',
    pronunciation_ipa: '/ˈvɜːrtɪbrə θəˈræsɪkə/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.BONE,
    parent_structure_id: null,
    definition_brief: 'Representative thoracic vertebra with costal facets for rib articulation.',
    description_full: `Typical thoracic vertebrae (T5-T8) display characteristic features for rib articulation and rotation.

Key features:
- Heart-shaped vertebral body
- Circular vertebral foramen (smaller than cervical)
- Superior and inferior costal demifacets on vertebral body
- Costal facets on transverse processes
- Long, inferiorly angled spinous process
- Articular facets in coronal plane (allow rotation)
- Superior articular facets face posterolaterally
- Inferior articular facets face anteriorly`,
    clinical_significance: 'Thoracic disc herniation less common due to rib cage stability. Scheuermann disease affects thoracic vertebrae. Wedge fractures common in osteoporosis.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Posterior intercostal arteries',
    model_reference: 'thoracic_vertebra',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Twelfth Thoracic Vertebra (T12)',
    common_names: ['T12', 'T12 vertebra'],
    latin_name: 'Vertebra thoracica XII',
    pronunciation_ipa: '/tiː twɛlv ˈvɜːrtɪbrə/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.BONE,
    parent_structure_id: null,
    definition_brief: 'Last thoracic vertebra with transitional features toward lumbar region.',
    description_full: `T12 is a transitional vertebra between thoracic and lumbar regions with features of both.

Key features:
- Complete superior costal facets for 12th rib
- No inferior costal facets
- Articular facets transitioning to lumbar orientation
- Inferior facets face laterally (lumbar-like)
- Shorter spinous process than mid-thoracic
- Larger body than mid-thoracic vertebrae`,
    clinical_significance: 'Common site for fractures due to transition between rigid thoracic and mobile lumbar spine. Marks thoracolumbar junction, important for spinal cord injury classification.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Subcostal artery',
    model_reference: 't12_vertebra',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },

  // ==========================================================================
  // Vertebrae - Lumbar
  // ==========================================================================
  {
    canonical_name: 'First Lumbar Vertebra (L1)',
    common_names: ['L1', 'L1 vertebra'],
    latin_name: 'Vertebra lumbalis I',
    pronunciation_ipa: '/ɛl wʌn ˈvɜːrtɪbrə/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.BONE,
    parent_structure_id: null,
    definition_brief: 'First lumbar vertebra marking the termination of the spinal cord (conus medullaris).',
    description_full: `L1 is the first lumbar vertebra, typically at the level where the spinal cord terminates as the conus medullaris.

Key features:
- Large, kidney-shaped vertebral body
- Triangular vertebral foramen
- Short, thick pedicles
- Broad, flat laminae
- Accessory and mamillary processes
- Superior articular facets face medially
- Inferior articular facets face laterally
- Short, broad spinous process`,
    clinical_significance: 'Conus medullaris typically ends at L1-L2 level in adults. L1 compression fracture common in osteoporosis. Cauda equina syndrome can occur with injuries below this level.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Lumbar arteries',
    model_reference: 'l1_vertebra',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Second Lumbar Vertebra (L2)',
    common_names: ['L2', 'L2 vertebra'],
    latin_name: 'Vertebra lumbalis II',
    pronunciation_ipa: '/ɛl tuː ˈvɜːrtɪbrə/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.BONE,
    parent_structure_id: null,
    definition_brief: 'Typical lumbar vertebra, common site for lumbar puncture.',
    description_full: `L2 is a typical lumbar vertebra with all characteristic features of the lumbar spine.

Features include:
- Large vertebral body for weight-bearing
- Triangular vertebral foramen
- Strong pedicles and laminae
- Long, slender transverse processes
- Mamillary and accessory processes
- Articular facets oriented in sagittal plane
- Thick, horizontal spinous process`,
    clinical_significance: 'L2-L3 interspace commonly used for lumbar puncture (below conus medullaris). L2 nerve root controls hip flexion and knee extension.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Second lumbar artery',
    model_reference: 'l2_vertebra',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Third Lumbar Vertebra (L3)',
    common_names: ['L3', 'L3 vertebra'],
    latin_name: 'Vertebra lumbalis III',
    pronunciation_ipa: '/ɛl θriː ˈvɜːrtɪbrə/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.BONE,
    parent_structure_id: null,
    definition_brief: 'Typical lumbar vertebra at the level of the umbilicus.',
    description_full: `L3 is a typical lumbar vertebra, usually located at the level of the umbilicus.

Standard lumbar features:
- Large, kidney-shaped body
- Triangular foramen
- Strong pedicles projecting posteriorly
- Broad laminae
- Long transverse processes (costal elements)
- Horizontal spinous process`,
    clinical_significance: 'L3-L4 is a common lumbar puncture site. L3 nerve root damage affects knee extension. This level used for epidural anesthesia.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Third lumbar artery',
    model_reference: 'l3_vertebra',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Fourth Lumbar Vertebra (L4)',
    common_names: ['L4', 'L4 vertebra'],
    latin_name: 'Vertebra lumbalis IV',
    pronunciation_ipa: '/ɛl fɔːr ˈvɜːrtɪbrə/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.BONE,
    parent_structure_id: null,
    definition_brief: 'Lumbar vertebra at the level of the iliac crests, important anatomical landmark.',
    description_full: `L4 is located at the level of the highest points of the iliac crests (supracristal plane), making it an important surface landmark.

Shares typical lumbar features:
- Large vertebral body
- Triangular foramen
- Strong pedicles and laminae
- Prominent transverse processes
- Horizontal spinous process`,
    clinical_significance: 'L4-L5 is the most common site for disc herniation. Iliac crest used as landmark to identify L4. L4 nerve root controls ankle dorsiflexion.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Fourth lumbar artery',
    model_reference: 'l4_vertebra',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Fifth Lumbar Vertebra (L5)',
    common_names: ['L5', 'L5 vertebra'],
    latin_name: 'Vertebra lumbalis V',
    pronunciation_ipa: '/ɛl faɪv ˈvɜːrtɪbrə/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.BONE,
    parent_structure_id: null,
    definition_brief: 'Last lumbar vertebra with unique features for lumbosacral articulation.',
    description_full: `L5 is the largest and most distinctive lumbar vertebra, articulating with the sacrum at the lumbosacral joint.

Distinctive features:
- Largest vertebral body (wedge-shaped, taller anteriorly)
- Massive transverse processes (costal elements)
- Inferior articular facets face anterolaterally
- Shorter, more rounded spinous process
- Supports significant weight transfer to sacrum`,
    clinical_significance: 'L5-S1 is the second most common site for disc herniation. Spondylolisthesis commonly occurs at L5. L5 nerve root controls great toe extension (EHL).',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Fifth lumbar and iliolumbar arteries',
    model_reference: 'l5_vertebra',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: [],
  },

  // ==========================================================================
  // Sacrum and Coccyx
  // ==========================================================================
  {
    canonical_name: 'Sacrum',
    common_names: ['Sacral bone'],
    latin_name: 'Os sacrum',
    pronunciation_ipa: '/ˈseɪkrəm/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.BONE,
    parent_structure_id: null,
    definition_brief: 'Triangular fusion of five sacral vertebrae forming the posterior pelvic wall.',
    description_full: `The sacrum is a large, triangular bone formed by the fusion of five sacral vertebrae (S1-S5), forming the posterior wall of the pelvis.

Key features:
- Base (superior): articulates with L5, promontory projects anteriorly
- Apex (inferior): articulates with coccyx
- Pelvic (anterior) surface: smooth, concave, four transverse lines
- Dorsal (posterior) surface: convex, median sacral crest, intermediate crests, lateral crests
- Four pairs of anterior (pelvic) sacral foramina
- Four pairs of posterior (dorsal) sacral foramina
- Auricular surfaces laterally for sacroiliac joints
- Sacral canal (continuation of vertebral canal)
- Sacral hiatus (gap at inferior end of sacral canal)`,
    clinical_significance: 'Sacral fractures occur in high-energy trauma. Sacroiliac joint dysfunction common cause of low back pain. Caudal epidurals performed through sacral hiatus. Sacralization (L5 fused to sacrum) or lumbarization (S1 separate) can occur.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Lateral sacral arteries, median sacral artery',
    model_reference: 'sacrum',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Coccyx',
    common_names: ['Tailbone', 'Coccygeal bone'],
    latin_name: 'Os coccygis',
    pronunciation_ipa: '/ˈkɒksɪks/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.BONE,
    parent_structure_id: null,
    definition_brief: 'Small, triangular bone formed by fusion of 3-5 coccygeal vertebrae, articulating with the sacrum.',
    description_full: `The coccyx is a small triangular bone formed by the fusion of three to five coccygeal vertebrae, representing the vestigial tail.

Key features:
- Usually four segments (Co1-Co4), sometimes three or five
- Base articulates with sacral apex via sacrococcygeal joint
- First coccygeal segment has coccygeal cornua (articulate with sacral cornua)
- Apex points inferiorly and anteriorly
- Provides attachment for muscles and ligaments
- Pelvic floor muscles attach to coccyx`,
    clinical_significance: 'Coccydynia (tailbone pain) from trauma, childbirth, or prolonged sitting. Coccygeal fracture typically from falls. Can be palpated per rectum.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Median sacral artery, lateral sacral arteries',
    model_reference: 'coccyx',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },

  // ==========================================================================
  // Intervertebral Discs
  // ==========================================================================
  {
    canonical_name: 'Intervertebral Disc',
    common_names: ['IV disc', 'Disc'],
    latin_name: 'Discus intervertebralis',
    pronunciation_ipa: '/ˌɪntərˈvɜːrtɪbrəl dɪsk/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.OTHER,
    parent_structure_id: null,
    definition_brief: 'Fibrocartilaginous structure between vertebral bodies, providing shock absorption and flexibility.',
    description_full: `Intervertebral discs are fibrocartilaginous structures between adjacent vertebral bodies from C2-C3 to L5-S1, comprising about 25% of vertebral column length.

Structure:
- Nucleus pulposus: central gelatinous core, 88% water in young adults, remnant of notochord
- Anulus fibrosus: outer fibrocartilaginous ring, concentric lamellae of type I collagen
- Cartilaginous endplates: hyaline cartilage covering superior and inferior surfaces of disc

Function:
- Shock absorption
- Load distribution
- Permits movement between vertebrae
- Varies in thickness by region (thickest in lumbar)`,
    clinical_significance: 'Disc herniation (nucleus pulposus protrudes through anulus) most common in lumbar (L4-L5, L5-S1) and cervical (C5-C6, C6-C7) regions. Degenerative disc disease leads to loss of height and pain. Schmorl nodes (herniation into vertebral body).',
    origin: null,
    insertion: null,
    action: null,
    innervation: 'Sinuvertebral nerves (outer third of anulus)',
    blood_supply: 'Avascular in adults; nutrients via diffusion',
    model_reference: 'intervertebral_disc',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },

  // ==========================================================================
  // Ligaments
  // ==========================================================================
  {
    canonical_name: 'Anterior Longitudinal Ligament',
    common_names: ['ALL'],
    latin_name: 'Ligamentum longitudinale anterius',
    pronunciation_ipa: '/ˌlɪɡəˈmɛntəm ˌlɒŋɡɪtjuːdɪˈneɪli ænˈtɪəriər/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.LIGAMENT,
    parent_structure_id: null,
    definition_brief: 'Strong ligament running along the anterior surface of vertebral bodies from skull to sacrum.',
    description_full: `The anterior longitudinal ligament (ALL) is a strong fibrous band extending along the anterior and anterolateral surfaces of the vertebral bodies.

Characteristics:
- Extends from anterior tubercle of atlas to sacrum
- Firmly attached to vertebral bodies and intervertebral discs
- Thicker and broader than posterior longitudinal ligament
- Wider than PLL, covering more of the vertebral body
- Multiple layers: superficial (span several vertebrae), intermediate, deep (vertebra to vertebra)
- Prevents hyperextension of vertebral column
- Limits anterior disc herniation`,
    clinical_significance: 'Strong attachment prevents anterior disc herniation (rare). Can ossify in diffuse idiopathic skeletal hyperostosis (DISH). Protects against hyperextension injuries.',
    origin: null,
    insertion: null,
    action: 'Limits extension, maintains stability',
    innervation: null,
    blood_supply: 'Segmental arteries',
    model_reference: 'anterior_longitudinal_ligament',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Posterior Longitudinal Ligament',
    common_names: ['PLL'],
    latin_name: 'Ligamentum longitudinale posterius',
    pronunciation_ipa: '/ˌlɪɡəˈmɛntəm ˌlɒŋɡɪtjuːdɪˈneɪli pɒˈstɪəriər/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.LIGAMENT,
    parent_structure_id: null,
    definition_brief: 'Ligament running along posterior surface of vertebral bodies within vertebral canal.',
    description_full: `The posterior longitudinal ligament (PLL) extends along the posterior surfaces of the vertebral bodies within the vertebral canal.

Characteristics:
- Extends from axis (C2) to sacrum
- Continuous with tectorial membrane superiorly
- Lies within vertebral canal, anterior to spinal cord
- Narrower than ALL
- Wider over intervertebral discs, narrower over vertebral bodies
- Firmly attached to discs, loosely to vertebral bodies
- Weakest in lumbar region
- Prevents hyperflexion`,
    clinical_significance: 'Weakness in lumbar region contributes to posterolateral disc herniation being most common. Ossification (OPLL) can cause spinal stenosis. Important landmark in spinal surgery.',
    origin: null,
    insertion: null,
    action: 'Limits flexion, prevents posterior disc herniation',
    innervation: 'Sinuvertebral nerves',
    blood_supply: 'Segmental arteries',
    model_reference: 'posterior_longitudinal_ligament',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Ligamentum Flavum',
    common_names: ['Yellow ligament'],
    latin_name: 'Ligamentum flavum',
    pronunciation_ipa: '/ˌlɪɡəˈmɛntəm ˈfleɪvəm/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.LIGAMENT,
    parent_structure_id: null,
    definition_brief: 'Elastic yellow ligament connecting adjacent vertebral laminae, forming posterior wall of vertebral canal.',
    description_full: `The ligamentum flavum is a series of elastic ligaments connecting the laminae of adjacent vertebrae from C2 to sacrum.

Characteristics:
- Composed of elastic tissue (appears yellow)
- Connects laminae of adjacent vertebrae
- Forms posterior wall of vertebral canal
- Paired structures (right and left) that meet at midline
- Thickest and strongest in lumbar region
- Highly elastic (80% elastic fibers)
- Prevents sudden flexion
- Helps restore upright position after flexion`,
    clinical_significance: 'Hypertrophy contributes to spinal stenosis, especially lumbar. Penetrated during epidural anesthesia and lumbar puncture. Loss of resistance when needle passes through indicates epidural space entry.',
    origin: null,
    insertion: null,
    action: 'Limits separation of laminae, assists in upright posture',
    innervation: null,
    blood_supply: 'Segmental arteries',
    model_reference: 'ligamentum_flavum',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Interspinous Ligament',
    common_names: ['Interspinal ligament'],
    latin_name: 'Ligamentum interspinale',
    pronunciation_ipa: '/ˌlɪɡəˈmɛntəm ˌɪntərˈspaɪnəl/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.LIGAMENT,
    parent_structure_id: null,
    definition_brief: 'Thin ligament connecting adjacent spinous processes.',
    description_full: `The interspinous ligaments are thin, weak ligaments connecting adjacent spinous processes from root to apex.

Characteristics:
- Extend from root to apex of spinous processes
- Best developed in lumbar region
- Weak or absent in cervical region
- Thin membranous structures
- Continuous with supraspinous ligament posteriorly
- Continuous with ligamentum flavum anteriorly
- Limit flexion of vertebral column`,
    clinical_significance: 'Can be injured in hyperflexion. Weak point in lumbar spine. Can be accessed for interspinous spacer devices in spinal stenosis treatment.',
    origin: null,
    insertion: null,
    action: 'Limits flexion',
    innervation: null,
    blood_supply: 'Segmental arteries',
    model_reference: 'interspinous_ligament',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Supraspinous Ligament',
    common_names: ['Supraspinal ligament'],
    latin_name: 'Ligamentum supraspinale',
    pronunciation_ipa: '/ˌlɪɡəˈmɛntəm ˌsuːprəˈspaɪnəl/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.LIGAMENT,
    parent_structure_id: null,
    definition_brief: 'Strong cord-like ligament connecting tips of spinous processes from C7 to sacrum.',
    description_full: `The supraspinous ligament is a strong fibrous cord connecting the tips of the spinous processes from C7 to the sacrum.

Characteristics:
- Extends from C7 spinous process to sacrum
- More prominent in lumbar region
- Continuous with ligamentum nuchae in cervical region
- Merges with thoracolumbar fascia posteriorly
- Limits flexion
- Palpable in living subject in lumbar region`,
    clinical_significance: 'Frequently injured or torn in hyperflexion. Can ossify with age. Site for posterior midline surgical approaches. Ligamentous disruption indicates significant instability.',
    origin: null,
    insertion: null,
    action: 'Limits flexion of vertebral column',
    innervation: null,
    blood_supply: 'Dorsal branches of segmental arteries',
    model_reference: 'supraspinous_ligament',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Ligamentum Nuchae',
    common_names: ['Nuchal ligament'],
    latin_name: 'Ligamentum nuchae',
    pronunciation_ipa: '/ˌlɪɡəˈmɛntəm ˈnuːki/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['skeletal-system' as UUID],
    structure_type: StructureType.LIGAMENT,
    parent_structure_id: null,
    definition_brief: 'Fibroelastic ligament extending from external occipital protuberance to C7 spinous process.',
    description_full: `The ligamentum nuchae is a strong fibroelastic intermuscular septum in the midline of the posterior neck.

Characteristics:
- Extends from external occipital protuberance and superior nuchal line to C7 spinous process
- Triangular in shape (sagittal plane)
- Formed by thickening of supraspinous ligament
- Provides attachment for neck muscles (trapezius, rhomboids, serratus posterior superior, splenius capitis)
- More developed in quadrupeds; relatively rudimentary in humans
- Helps support head position`,
    clinical_significance: 'Can be site of bursa formation. Important surgical landmark. Supports head with minimal muscle effort. Well-developed in animals that hold head horizontally.',
    origin: null,
    insertion: null,
    action: 'Limits flexion, supports head',
    innervation: null,
    blood_supply: 'Occipital and deep cervical arteries',
    model_reference: 'ligamentum_nuchae',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },

  // ==========================================================================
  // Deep Back Muscles - Erector Spinae Group
  // ==========================================================================
  {
    canonical_name: 'Iliocostalis',
    common_names: ['Iliocostalis muscle'],
    latin_name: 'Musculus iliocostalis',
    pronunciation_ipa: '/ˌɪlioʊkɒˈsteɪlɪs/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['muscular-system' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Lateral column of erector spinae, extending from pelvis to ribs and cervical vertebrae.',
    description_full: `The iliocostalis is the most lateral column of the erector spinae muscle group, divided into three parts: lumborum, thoracis, and cervicis.

Three divisions:
1. Iliocostalis lumborum: Lower 6 ribs → iliac crest and sacrum
2. Iliocostalis thoracis: Lower 6 ribs → upper 6 ribs
3. Iliocostalis cervicis: Ribs 3-6 → C4-C6 transverse processes

Forms lateral column of erector spinae alongside longissimus (intermediate) and spinalis (medial).`,
    clinical_significance: 'Part of paraspinal muscle group assessed in back pain. Spasm causes lateral deviation. Atrophy visible on MRI in chronic back pain.',
    origin: 'Iliac crest, sacrum, lower ribs (depending on division)',
    insertion: 'Ribs, cervical transverse processes (depending on division)',
    action: 'Bilateral: extends vertebral column; Unilateral: lateral flexion',
    innervation: 'Posterior rami of spinal nerves',
    blood_supply: 'Dorsal branches of posterior intercostal, subcostal, lumbar arteries',
    model_reference: 'iliocostalis',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Longissimus',
    common_names: ['Longissimus muscle'],
    latin_name: 'Musculus longissimus',
    pronunciation_ipa: '/lɒnˈdʒɪsɪməs/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['muscular-system' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Intermediate column of erector spinae, the largest and longest component.',
    description_full: `The longissimus is the intermediate and largest column of the erector spinae, divided into three parts based on superior attachments.

Three divisions:
1. Longissimus thoracis: Largest component, from sacrum/ilium to ribs and thoracic transverse processes
2. Longissimus cervicis: From upper thoracic transverse processes to cervical transverse processes (C2-C6)
3. Longissimus capitis: From upper thoracic/lower cervical transverse processes to mastoid process

Largest component of erector spinae group.`,
    clinical_significance: 'Major extensor of vertebral column. Commonly involved in paraspinal muscle spasm. Important in maintaining posture. Tender in myofascial pain syndromes.',
    origin: 'Sacrum, ilium, thoracic and cervical transverse processes',
    insertion: 'Ribs, transverse processes, mastoid process (depending on division)',
    action: 'Bilateral: extends vertebral column and head; Unilateral: lateral flexion',
    innervation: 'Posterior rami of spinal nerves',
    blood_supply: 'Dorsal branches of posterior intercostal, subcostal, lumbar, lateral sacral arteries',
    model_reference: 'longissimus',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Spinalis',
    common_names: ['Spinalis muscle'],
    latin_name: 'Musculus spinalis',
    pronunciation_ipa: '/spaɪˈneɪlɪs/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['muscular-system' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Medial column of erector spinae, connecting spinous processes.',
    description_full: `The spinalis is the most medial and smallest column of the erector spinae, running along spinous processes.

Three divisions:
1. Spinalis thoracis: Most developed, from upper lumbar/lower thoracic spinous processes to upper thoracic spinous processes
2. Spinalis cervicis: Often poorly defined or absent, C7-T2 to C2-C4 spinous processes
3. Spinalis capitis: Usually blends with semispinalis capitis

Often blends with longissimus and semispinalis muscles.`,
    clinical_significance: 'Smallest and most medial erector spinae component. Often difficult to distinguish from other muscles. Contributes to extension and posture maintenance.',
    origin: 'Spinous processes of upper lumbar, lower thoracic, and cervical vertebrae',
    insertion: 'Spinous processes of upper thoracic and cervical vertebrae',
    action: 'Extends vertebral column',
    innervation: 'Posterior rami of spinal nerves',
    blood_supply: 'Dorsal branches of posterior intercostal and cervical arteries',
    model_reference: 'spinalis',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },

  // ==========================================================================
  // Deep Back Muscles - Transversospinalis Group
  // ==========================================================================
  {
    canonical_name: 'Semispinalis',
    common_names: ['Semispinalis muscle'],
    latin_name: 'Musculus semispinalis',
    pronunciation_ipa: '/ˌsɛmɪspaɪˈneɪlɪs/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['muscular-system' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Deep muscle spanning 5-6 vertebrae, part of transversospinalis group.',
    description_full: `The semispinalis is the most superficial layer of the transversospinalis group, spanning approximately 5-6 vertebral segments.

Three divisions:
1. Semispinalis thoracis: T6-T10 transverse processes → C6-T4 spinous processes
2. Semispinalis cervicis: T1-T6 transverse processes → C2-C5 spinous processes
3. Semispinalis capitis: Largest component, C4-T6 transverse processes → between superior and inferior nuchal lines

Semispinalis capitis is the largest muscle in the posterior neck.`,
    clinical_significance: 'Semispinalis capitis is a common source of tension headaches. Involved in whiplash injuries. Important for head and neck extension.',
    origin: 'Transverse processes of C4-T10',
    insertion: 'Spinous processes 5-6 segments superior, occipital bone (capitis)',
    action: 'Extends and rotates vertebral column and head to opposite side',
    innervation: 'Posterior rami of spinal nerves',
    blood_supply: 'Deep cervical, occipital, and posterior intercostal arteries',
    model_reference: 'semispinalis',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Multifidus',
    common_names: ['Multifidus muscle'],
    latin_name: 'Musculus multifidus',
    pronunciation_ipa: '/mʌlˈtɪfɪdəs/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['muscular-system' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Deep segmental muscle spanning 2-4 vertebrae, important for spinal stability.',
    description_full: `The multifidus is the middle layer of the transversospinalis group, consisting of multiple fascicles spanning 2-4 vertebral segments.

Characteristics:
- Best developed in lumbar region
- Fascicles span 2-4 vertebrae
- Deep to semispinalis, superficial to rotatores
- From sacrum to C2 (most developed in lumbar and cervical regions)
- Each fascicle: transverse process → spinous process 2-4 segments above
- Critical for segmental stability of spine`,
    clinical_significance: 'Atrophy associated with chronic low back pain. Important for spinal stability. Selective retraining used in physical therapy. MRI shows fatty infiltration in degenerative spine disease.',
    origin: 'Sacrum, erector spinae aponeurosis, posterior superior iliac spines, mamillary processes (lumbar), transverse processes (thoracic), articular processes (cervical)',
    insertion: 'Spinous processes 2-4 segments superior',
    action: 'Extends and rotates vertebral column to opposite side, stabilizes vertebrae',
    innervation: 'Medial branches of posterior rami of spinal nerves',
    blood_supply: 'Dorsal branches of segmental arteries',
    model_reference: 'multifidus',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Rotatores',
    common_names: ['Rotator muscles'],
    latin_name: 'Musculi rotatores',
    pronunciation_ipa: '/roʊˈteɪtɔːriːz/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['muscular-system' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Deepest layer of transversospinalis, spanning 1-2 vertebrae, most developed in thoracic region.',
    description_full: `The rotatores are the deepest and shortest muscles of the transversospinalis group, best developed in the thoracic region.

Characteristics:
- Deepest layer of transversospinalis
- Best developed in thoracic region (rotatores thoracis)
- Two types:
  1. Rotatores breves: span one vertebra (transverse process → spinous process of vertebra above)
  2. Rotatores longi: span two vertebrae
- 11 pairs in thoracic region
- Function more in proprioception than movement
- Rich in muscle spindles`,
    clinical_significance: 'High density of muscle spindles suggests proprioceptive role. May contribute to segmental stability. Often studied in spinal biomechanics research.',
    origin: 'Transverse processes of vertebrae',
    insertion: 'Spinous process of vertebra 1-2 segments above',
    action: 'Weak rotation to opposite side, proprioception, segmental stability',
    innervation: 'Medial branches of posterior rami',
    blood_supply: 'Dorsal branches of posterior intercostal arteries',
    model_reference: 'rotatores',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: [],
  },

  // ==========================================================================
  // Deep Back Muscles - Segmental/Minor Deep Muscles
  // ==========================================================================
  {
    canonical_name: 'Interspinales',
    common_names: ['Interspinal muscles'],
    latin_name: 'Musculi interspinales',
    pronunciation_ipa: '/ˌɪntərˈspaɪneɪliːz/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['muscular-system' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Short muscles connecting adjacent spinous processes, best developed in cervical and lumbar regions.',
    description_full: `The interspinales are short, paired muscles connecting the spinous processes of adjacent vertebrae.

Characteristics:
- Best developed in cervical and lumbar regions
- Poorly developed or absent in thoracic region
- Cervical: six pairs between C2-T1
- Lumbar: four pairs between L1-L5
- Lie on either side of interspinous ligament
- Short segmental muscles
- High density of muscle spindles (proprioceptive function)`,
    clinical_significance: 'Primary role appears to be proprioceptive rather than motor. Contribute to postural sense and position awareness. May help with segmental extension.',
    origin: 'Superior surface of spinous process',
    insertion: 'Inferior surface of spinous process of vertebra above',
    action: 'Weak extension, primarily proprioceptive function',
    innervation: 'Posterior rami of spinal nerves',
    blood_supply: 'Dorsal branches of segmental arteries',
    model_reference: 'interspinales',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Intertransversarii',
    common_names: ['Intertransverse muscles'],
    latin_name: 'Musculi intertransversarii',
    pronunciation_ipa: '/ˌɪntərtrænsˈvɜːrsəraɪ/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['muscular-system' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Small muscles connecting transverse processes of adjacent vertebrae.',
    description_full: `The intertransversarii are small muscles connecting the transverse processes of adjacent vertebrae, best developed in cervical and lumbar regions.

Divisions:
1. Cervical:
   - Anterior intertransversarii (C1-C7)
   - Posterior intertransversarii (C1-C7)
2. Lumbar:
   - Medial intertransversarii lumborum
   - Lateral intertransversarii lumborum
3. Thoracic: rudimentary or absent

Rich in muscle spindles, suggesting proprioceptive role.`,
    clinical_significance: 'Primarily proprioceptive function. May assist in lateral flexion. Contribute to segmental stability. Important for postural control.',
    origin: 'Transverse process of vertebra',
    insertion: 'Transverse process of adjacent vertebra',
    action: 'Lateral flexion, stabilization, proprioception',
    innervation: 'Anterior and posterior rami of spinal nerves',
    blood_supply: 'Segmental arteries',
    model_reference: 'intertransversarii',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Levatores Costarum',
    common_names: ['Rib elevator muscles'],
    latin_name: 'Musculi levatores costarum',
    pronunciation_ipa: '/lɛvəˈtɔːriːz kɒˈsteərəm/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['muscular-system' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Twelve paired muscles elevating ribs, extending from transverse processes to ribs.',
    description_full: `The levatores costarum are twelve pairs of small muscles extending from the transverse processes of C7-T11 to the ribs below.

Characteristics:
- 12 pairs total
- Each arises from tip of transverse process
- Two types:
  1. Levatores costarum breves: most common, span one rib
  2. Levatores costarum longi: present in lower thorax, span two ribs
- Fan out to insert on rib between tubercle and angle
- Continuous with external intercostals`,
    clinical_significance: 'Assist in respiration (elevation of ribs). May contribute to lateral flexion and rotation. Minor accessory muscles of respiration.',
    origin: 'Tips of transverse processes C7-T11',
    insertion: 'Rib below, between tubercle and angle',
    action: 'Elevates ribs (inspiration), lateral flexion, rotation',
    innervation: 'Posterior rami of C8-T11',
    blood_supply: 'Posterior intercostal arteries',
    model_reference: 'levatores_costarum',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },

  // ==========================================================================
  // Suboccipital Muscles
  // ==========================================================================
  {
    canonical_name: 'Rectus Capitis Posterior Major',
    common_names: ['Greater posterior rectus capitis'],
    latin_name: 'Musculus rectus capitis posterior major',
    pronunciation_ipa: '/ˈrɛktəs ˈkæpɪtɪs pɒˈstɪəriər ˈmeɪdʒər/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['muscular-system' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Suboccipital muscle extending from C2 spinous process to occipital bone.',
    description_full: `The rectus capitis posterior major is one of the four suboccipital muscles forming the suboccipital triangle.

Characteristics:
- Larger than rectus capitis posterior minor
- Forms medial border of suboccipital triangle
- Deep to semispinalis capitis and trapezius
- Part of suboccipital muscle group
- Highly vascularized
- Rich in muscle spindles (proprioceptive role)`,
    clinical_significance: 'Can contribute to tension headaches when tight. Forms part of suboccipital triangle containing vertebral artery and C1 nerve. Involved in cervicogenic headaches.',
    origin: 'Spinous process of axis (C2)',
    insertion: 'Lateral part of inferior nuchal line',
    action: 'Extends and rotates head ipsilaterally',
    innervation: 'Suboccipital nerve (posterior ramus of C1)',
    blood_supply: 'Occipital artery, vertebral artery',
    model_reference: 'rectus_capitis_posterior_major',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Rectus Capitis Posterior Minor',
    common_names: ['Lesser posterior rectus capitis'],
    latin_name: 'Musculus rectus capitis posterior minor',
    pronunciation_ipa: '/ˈrɛktəs ˈkæpɪtɪs pɒˈstɪəriər ˈmaɪnər/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['muscular-system' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Small suboccipital muscle from atlas to occipital bone.',
    description_full: `The rectus capitis posterior minor is the smaller of the two rectus capitis posterior muscles.

Characteristics:
- Smaller and more medial than major
- Does not form border of suboccipital triangle
- Deep to rectus capitis posterior major
- Bridges ponticulus posticus (when present)
- May have connection to dura mater
- High density of muscle spindles`,
    clinical_significance: 'Proposed connection to dura mater may contribute to headaches. Involved in proprioception of head position. May play role in preventing dural infolding during neck extension.',
    origin: 'Posterior tubercle of atlas (C1)',
    insertion: 'Medial part of inferior nuchal line',
    action: 'Extends head',
    innervation: 'Suboccipital nerve (posterior ramus of C1)',
    blood_supply: 'Occipital artery, vertebral artery',
    model_reference: 'rectus_capitis_posterior_minor',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Obliquus Capitis Superior',
    common_names: ['Superior oblique of head'],
    latin_name: 'Musculus obliquus capitis superior',
    pronunciation_ipa: '/əˈbliːkwəs ˈkæpɪtɪs suːˈpɪəriər/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['muscular-system' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Suboccipital muscle forming superolateral border of suboccipital triangle.',
    description_full: `The obliquus capitis superior runs superolaterally from the atlas to the occipital bone.

Characteristics:
- Forms superolateral border of suboccipital triangle
- Passes lateral to rectus capitis posterior major
- Smaller than obliquus capitis inferior
- Covered by semispinalis capitis
- Crosses vertebral artery`,
    clinical_significance: 'Part of suboccipital triangle. Involved in fine motor control of head. Can contribute to cervicogenic headaches when tight.',
    origin: 'Transverse process of atlas (C1)',
    insertion: 'Between superior and inferior nuchal lines',
    action: 'Extends head and bends it laterally',
    innervation: 'Suboccipital nerve (posterior ramus of C1)',
    blood_supply: 'Occipital artery, vertebral artery',
    model_reference: 'obliquus_capitis_superior',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Obliquus Capitis Inferior',
    common_names: ['Inferior oblique of head'],
    latin_name: 'Musculus obliquus capitis inferior',
    pronunciation_ipa: '/əˈbliːkwəs ˈkæpɪtɪs ɪnˈfɪəriər/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['muscular-system' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Largest suboccipital muscle, forming inferolateral border of suboccipital triangle.',
    description_full: `The obliquus capitis inferior is the largest and most inferior of the suboccipital muscles.

Characteristics:
- Largest and strongest suboccipital muscle
- Forms inferolateral border of suboccipital triangle
- Runs laterally from C2 to C1
- Covers vertebral artery groove
- Does not attach to skull
- Involved in rotation at atlantoaxial joint`,
    clinical_significance: 'Primary rotator of head at atlantoaxial joint. Forms floor of suboccipital triangle. Can compress vertebral artery during rotation if hypertrophied.',
    origin: 'Spinous process and lamina of axis (C2)',
    insertion: 'Transverse process of atlas (C1)',
    action: 'Rotates head ipsilaterally at atlantoaxial joint',
    innervation: 'Suboccipital nerve (posterior ramus of C1)',
    blood_supply: 'Occipital artery, vertebral artery',
    model_reference: 'obliquus_capitis_inferior',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: [],
  },

  // ==========================================================================
  // Superficial/Intermediate Back Muscles
  // ==========================================================================
  {
    canonical_name: 'Trapezius',
    common_names: ['Trapezius muscle', 'Traps'],
    latin_name: 'Musculus trapezius',
    pronunciation_ipa: '/trəˈpiːziəs/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['muscular-system' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Large superficial muscle extending from skull and vertebrae to shoulder, with three functional parts.',
    description_full: `The trapezius is a large, flat, triangular muscle covering the upper back and posterior neck.

Three functional parts:
1. Descending (superior) fibers: Elevate scapula
2. Middle (transverse) fibers: Retract scapula
3. Ascending (inferior) fibers: Depress scapula

Together, upper and lower fibers rotate scapula during arm abduction.

Coverage: external occipital protuberance, superior nuchal line, ligamentum nuchae, C7-T12 spinous processes → lateral third of clavicle, acromion, spine of scapula`,
    clinical_significance: 'Common site of tension and trigger points (upper fibers). Accessory nerve (CN XI) injury causes characteristic drooping shoulder. Frequently tight in desk workers.',
    origin: 'Medial third of superior nuchal line, external occipital protuberance, ligamentum nuchae, spinous processes C7-T12',
    insertion: 'Lateral third of clavicle, acromion, spine of scapula',
    action: 'Upper: elevates scapula; Middle: retracts scapula; Lower: depresses scapula; Upper+Lower: upward rotation of scapula',
    innervation: 'Accessory nerve (CN XI) motor; C3-C4 proprioception',
    blood_supply: 'Transverse cervical artery, dorsal scapular artery',
    model_reference: 'trapezius',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Latissimus Dorsi',
    common_names: ['Lats', 'Latissimus'],
    latin_name: 'Musculus latissimus dorsi',
    pronunciation_ipa: '/ləˈtɪsɪməs ˈdɔːrsaɪ/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['muscular-system' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Broad muscle of the back extending from vertebrae and ilium to humerus, major shoulder extensor and adductor.',
    description_full: `The latissimus dorsi is a large, flat muscle covering the lumbar region and lower thorax, the widest muscle in the human body.

Characteristics:
- Arises from extensive origin: T7-L5 spinous processes (via thoracolumbar fascia), posterior iliac crest, lower 3-4 ribs, inferior angle of scapula
- Fibers converge laterally
- Forms posterior axillary fold
- Twists 180° before insertion
- Creates floor of triangle of auscultation

Largest muscle of upper body by surface area.`,
    clinical_significance: 'Used in breast reconstruction (latissimus dorsi flap). Triangle of auscultation (medial border of scapula, trapezius, latissimus dorsi) used for lung auscultation. Injury affects shoulder extension and adduction.',
    origin: 'Spinous processes T7-L5 (via thoracolumbar fascia), posterior iliac crest, lower 3-4 ribs, inferior angle of scapula',
    insertion: 'Floor of intertubercular groove (bicipital groove) of humerus',
    action: 'Extends, adducts, medially rotates arm; raises body toward arms in climbing',
    innervation: 'Thoracodorsal nerve (C6-C8)',
    blood_supply: 'Thoracodorsal artery',
    model_reference: 'latissimus_dorsi',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Rhomboid Major',
    common_names: ['Greater rhomboid'],
    latin_name: 'Musculus rhomboideus major',
    pronunciation_ipa: '/rɒmˈbɔɪdiəs ˈmeɪdʒər/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['muscular-system' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Rhomboid-shaped muscle deep to trapezius, retracting and fixing the scapula.',
    description_full: `The rhomboid major is a quadrilateral muscle lying deep to the trapezius in the upper back.

Characteristics:
- Lies inferior to rhomboid minor
- Larger than rhomboid minor
- Runs obliquely from vertebrae to scapula
- Deep to trapezius
- Parallel to rhomboid minor
- Forms part of medial scapular stabilizers`,
    clinical_significance: 'Works with rhomboid minor to retract scapula. Weakness leads to scapular winging. Important for maintaining scapular position during overhead activities. Dorsal scapular nerve injury affects both rhomboids.',
    origin: 'Spinous processes of T2-T5',
    insertion: 'Medial border of scapula from spine to inferior angle',
    action: 'Retracts and elevates scapula, rotates glenoid cavity inferiorly',
    innervation: 'Dorsal scapular nerve (C5)',
    blood_supply: 'Dorsal scapular artery',
    model_reference: 'rhomboid_major',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Rhomboid Minor',
    common_names: ['Lesser rhomboid'],
    latin_name: 'Musculus rhomboideus minor',
    pronunciation_ipa: '/rɒmˈbɔɪdiəs ˈmaɪnər/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['muscular-system' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Small rhomboid muscle superior to rhomboid major, retracting the scapula.',
    description_full: `The rhomboid minor is a small quadrilateral muscle superior to rhomboid major.

Characteristics:
- Lies superior to rhomboid major
- Smaller than rhomboid major
- Sometimes fused with rhomboid major
- Deep to trapezius
- Parallel to rhomboid major
- Runs from lower cervical/upper thoracic vertebrae to scapula`,
    clinical_significance: 'Often acts in concert with rhomboid major. May be absent or fused with major. Together they are key scapular retractors. Weakness contributes to rounded shoulder posture.',
    origin: 'Nuchal ligament, spinous processes of C7-T1',
    insertion: 'Medial border of scapula at root of spine',
    action: 'Retracts and elevates scapula, rotates glenoid cavity inferiorly',
    innervation: 'Dorsal scapular nerve (C5)',
    blood_supply: 'Dorsal scapular artery',
    model_reference: 'rhomboid_minor',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Levator Scapulae',
    common_names: ['Scapula elevator'],
    latin_name: 'Musculus levator scapulae',
    pronunciation_ipa: '/lɪˈveɪtər ˈskæpjʊli/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['muscular-system' as UUID],
    structure_type: StructureType.MUSCLE,
    parent_structure_id: null,
    definition_brief: 'Muscle of posterior neck and shoulder elevating the scapula.',
    description_full: `The levator scapulae is a slender muscle of the posterior neck connecting the cervical vertebrae to the scapula.

Characteristics:
- Descends obliquely from cervical transverse processes
- Deep to sternocleidomastoid and trapezius in neck
- Superficial at superior angle of scapula
- Crosses lateral to deep cervical muscles
- Variable attachment pattern to cervical vertebrae`,
    clinical_significance: 'Common source of neck pain and stiffness ("crick in the neck"). Tight levator scapulae contributes to elevated shoulder and neck pain. Often overactive in upper crossed syndrome. Trigger points cause characteristic neck and shoulder blade pain.',
    origin: 'Transverse processes of C1-C4',
    insertion: 'Superior angle and superior part of medial border of scapula',
    action: 'Elevates scapula, rotates glenoid cavity inferiorly; with scapula fixed, laterally flexes neck',
    innervation: 'Dorsal scapular nerve (C5) and cervical nerves C3-C4',
    blood_supply: 'Dorsal scapular artery, transverse cervical artery',
    model_reference: 'levator_scapulae',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },

  // ==========================================================================
  // Spinal Cord and Meninges
  // ==========================================================================
  {
    canonical_name: 'Spinal Cord',
    common_names: ['Medulla spinalis'],
    latin_name: 'Medulla spinalis',
    pronunciation_ipa: '/ˈspaɪnəl kɔːrd/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['nervous-system' as UUID],
    structure_type: StructureType.NERVE,
    parent_structure_id: null,
    definition_brief: 'Major neural pathway extending from medulla oblongata to conus medullaris, transmitting signals between brain and body.',
    description_full: `The spinal cord is a cylindrical bundle of nerve fibers extending from the medulla oblongata (at foramen magnum) to the conus medullaris (typically L1-L2 in adults).

Characteristics:
- Length: approximately 45 cm in adults
- Extends from foramen magnum to L1-L2 vertebral level
- Two enlargements:
  1. Cervical enlargement (C4-T1): innervates upper limbs
  2. Lumbosacral enlargement (L1-S3): innervates lower limbs
- Conus medullaris: tapered inferior end
- Filum terminale: fibrous extension from conus to coccyx
- Cauda equina: nerve roots below conus medullaris

Internal structure:
- Gray matter (H-shaped): cell bodies (anterior/posterior/lateral horns)
- White matter: ascending and descending tracts
- Central canal: remnant of neural tube`,
    clinical_significance: 'Spinal cord injury causes motor/sensory deficits below lesion level. Complete transection causes paraplegia (thoracic/lumbar) or quadriplegia (cervical). Conus medullaris syndrome vs cauda equina syndrome have different presentations. Syringomyelia involves central canal expansion.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Anterior spinal artery (1), posterior spinal arteries (2), segmental medullary arteries',
    model_reference: 'spinal_cord',
    image_references: [],
    difficulty_rating: 5,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Dura Mater (Spinal)',
    common_names: ['Spinal dura', 'Dural sac'],
    latin_name: 'Dura mater spinalis',
    pronunciation_ipa: '/ˈdjʊərə ˈmeɪtər/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['nervous-system' as UUID],
    structure_type: StructureType.OTHER,
    parent_structure_id: null,
    definition_brief: 'Outermost meningeal layer surrounding spinal cord, extending from foramen magnum to S2.',
    description_full: `The spinal dura mater is the tough, outermost layer of the meninges surrounding the spinal cord.

Characteristics:
- Continuous with cranial dura at foramen magnum
- Tubular sac from foramen magnum to S2 vertebral level
- Separated from vertebral canal walls by epidural space (contains fat and venous plexus)
- Anchored to coccyx by filum terminale externum
- Lateral extensions form dural sleeves around nerve roots
- Single layer (unlike cranial dura which has two layers)

Spaces:
- Epidural space: between dura and vertebral canal (real space)
- Subdural space: potential space between dura and arachnoid`,
    clinical_significance: 'Epidural anesthesia/analgesia injected into epidural space. Lumbar puncture needle passes through dura into subarachnoid space. Dural tear can cause CSF leak and post-spinal headache. Epidural hematoma can cause cord compression.',
    origin: null,
    insertion: null,
    action: null,
    innervation: 'Meningeal branches of spinal nerves, sinuvertebral nerves',
    blood_supply: 'Meningeal branches of vertebral, ascending cervical, intercostal arteries',
    model_reference: 'spinal_dura',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Arachnoid Mater (Spinal)',
    common_names: ['Spinal arachnoid'],
    latin_name: 'Arachnoidea mater spinalis',
    pronunciation_ipa: '/əˈræknɔɪd ˈmeɪtər/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['nervous-system' as UUID],
    structure_type: StructureType.OTHER,
    parent_structure_id: null,
    definition_brief: 'Middle meningeal layer, delicate avascular membrane deep to dura and superficial to pia.',
    description_full: `The spinal arachnoid mater is the middle layer of the spinal meninges, a delicate avascular membrane.

Characteristics:
- Continuous with cranial arachnoid at foramen magnum
- Separated from dura by subdural space (potential space)
- Separated from pia by subarachnoid space (real space containing CSF)
- Avascular membrane
- Connected to pia by arachnoid trabeculae
- Follows dural sac, ending at S2

The subarachnoid space contains:
- Cerebrospinal fluid (CSF)
- Spinal cord (to L1-L2)
- Cauda equina (below L1-L2)
- Blood vessels
- Nerve roots`,
    clinical_significance: 'Lumbar puncture enters subarachnoid space to obtain CSF or measure pressure. Subarachnoid hemorrhage (SAH) occurs in this space. Spinal anesthesia injected into subarachnoid space.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Avascular',
    model_reference: 'spinal_arachnoid',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: [],
  },
  {
    canonical_name: 'Pia Mater (Spinal)',
    common_names: ['Spinal pia'],
    latin_name: 'Pia mater spinalis',
    pronunciation_ipa: '/ˈpiːə ˈmeɪtər/',
    region_id: 'back-spinal-cord' as UUID,
    system_ids: ['nervous-system' as UUID],
    structure_type: StructureType.OTHER,
    parent_structure_id: null,
    definition_brief: 'Innermost meningeal layer, vascular membrane intimately adhering to spinal cord surface.',
    description_full: `The spinal pia mater is the delicate innermost layer of the meninges, intimately adherent to the spinal cord surface.

Characteristics:
- Continuous with cranial pia at foramen magnum
- Directly covers spinal cord and nerve roots
- Highly vascular (carries blood vessels to cord)
- Extends along nerve roots as they exit
- Forms denticulate ligaments (lateral extensions)
- Continues as filum terminale internum from conus medullaris
- Invests anterior spinal artery in anterior median fissure

Denticulate ligaments:
- 21 pairs of lateral extensions
- Attach to dura between nerve roots
- Suspend and stabilize spinal cord`,
    clinical_significance: 'Intimately involved in spinal cord vascularization. Denticulate ligaments used as landmarks in spinal surgery. Thickening can occur in meningitis. Filum terminale tethering can cause tethered cord syndrome.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Continuous with spinal cord blood supply',
    model_reference: 'spinal_pia',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: [],
  },

  // Additional structures can be added here (spinal nerves, blood vessels, etc.)
];

// ============================================================================
// Anatomical Relationships
// ============================================================================

const relationships: SeedRelationship[] = [
  // Atlas relationships
  {
    source_structure_id: 'atlas-c1' as UUID,
    target_structure_id: 'axis-c2' as UUID,
    relationship_type: RelationshipType.ARTICULATES_WITH,
    description: 'The atlas articulates inferiorly with the axis at the atlantoaxial joint, allowing rotational movement of the head.',
    bidirectional: true,
    clinical_relevance: 'The atlantoaxial joint is critical for head rotation; instability or fractures can cause serious neurological injury.',
  },
  {
    source_structure_id: 'rectus-capitis-posterior-major' as UUID,
    target_structure_id: 'atlas-c1' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Rectus capitis posterior major originates from the spinous process of C2 and inserts on the lateral inferior nuchal line.',
    bidirectional: false,
    clinical_relevance: 'Part of suboccipital triangle; tightness can contribute to cervicogenic headaches.',
  },

  // Intervertebral disc relationships
  {
    source_structure_id: 'intervertebral-disc' as UUID,
    target_structure_id: 'c3-vertebra' as UUID,
    relationship_type: RelationshipType.ARTICULATES_WITH,
    description: 'Intervertebral discs lie between adjacent vertebral bodies, providing shock absorption and flexibility.',
    bidirectional: false,
    clinical_relevance: 'Disc herniation is most common in cervical (C5-C6, C6-C7) and lumbar regions (L4-L5, L5-S1).',
  },

  // Ligament relationships
  {
    source_structure_id: 'anterior-longitudinal-ligament' as UUID,
    target_structure_id: 'c3-vertebra' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'The anterior longitudinal ligament runs along the anterior surface of vertebral bodies, providing stability.',
    bidirectional: false,
    clinical_relevance: 'Prevents hyperextension and anterior disc herniation.',
  },
  {
    source_structure_id: 'posterior-longitudinal-ligament' as UUID,
    target_structure_id: 'l4-vertebra' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'The posterior longitudinal ligament runs within the vertebral canal along the posterior vertebral bodies.',
    bidirectional: false,
    clinical_relevance: 'Weakest in lumbar region, contributing to posterolateral disc herniation being most common.',
  },
  {
    source_structure_id: 'ligamentum-flavum' as UUID,
    target_structure_id: 'l3-vertebra' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Ligamentum flavum connects adjacent vertebral laminae, forming the posterior wall of the vertebral canal.',
    bidirectional: false,
    clinical_relevance: 'Hypertrophy contributes to spinal stenosis. Penetrated during epidural anesthesia.',
  },
  {
    source_structure_id: 'interspinous-ligament' as UUID,
    target_structure_id: 't5-t8-vertebra' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Interspinous ligaments connect adjacent spinous processes.',
    bidirectional: false,
    clinical_relevance: 'Can be injured in hyperflexion; weak point in lumbar spine.',
  },
  {
    source_structure_id: 'supraspinous-ligament' as UUID,
    target_structure_id: 'l5-vertebra' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Supraspinous ligament connects the tips of spinous processes.',
    bidirectional: false,
    clinical_relevance: 'Frequently injured in hyperflexion; disruption indicates instability.',
  },

  // Erector spinae relationships
  {
    source_structure_id: 'iliocostalis' as UUID,
    target_structure_id: 'sacrum' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Iliocostalis lumborum arises from the sacrum and iliac crest.',
    bidirectional: false,
    clinical_relevance: 'Part of erector spinae group; spasm causes pain and lateral deviation.',
  },
  {
    source_structure_id: 'longissimus' as UUID,
    target_structure_id: 't5-t8-vertebra' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Longissimus thoracis attaches to thoracic transverse processes and ribs.',
    bidirectional: false,
    clinical_relevance: 'Major vertebral column extensor; commonly involved in back spasm.',
  },
  {
    source_structure_id: 'spinalis' as UUID,
    target_structure_id: 'c7-vertebra' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Spinalis connects spinous processes of vertebrae.',
    bidirectional: false,
    clinical_relevance: 'Smallest erector spinae component; contributes to extension.',
  },

  // Transversospinalis relationships
  {
    source_structure_id: 'semispinalis' as UUID,
    target_structure_id: 't12-vertebra' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Semispinalis spans 5-6 vertebrae, from transverse processes to spinous processes.',
    bidirectional: false,
    clinical_relevance: 'Semispinalis capitis is a common source of tension headaches.',
  },
  {
    source_structure_id: 'multifidus' as UUID,
    target_structure_id: 'l1-vertebra' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Multifidus fascicles span 2-4 vertebrae, providing segmental stability.',
    bidirectional: false,
    clinical_relevance: 'Atrophy associated with chronic low back pain; critical for spinal stability.',
  },
  {
    source_structure_id: 'rotatores' as UUID,
    target_structure_id: 't5-t8-vertebra' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Rotatores are deepest transversospinalis muscles, spanning 1-2 vertebrae.',
    bidirectional: false,
    clinical_relevance: 'High density of spindles suggests proprioceptive role.',
  },

  // Suboccipital relationships
  {
    source_structure_id: 'obliquus-capitis-superior' as UUID,
    target_structure_id: 'atlas-c1' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Obliquus capitis superior runs from atlas transverse process to occipital bone.',
    bidirectional: false,
    clinical_relevance: 'Forms superolateral border of suboccipital triangle.',
  },
  {
    source_structure_id: 'obliquus-capitis-inferior' as UUID,
    target_structure_id: 'axis-c2' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Obliquus capitis inferior runs from C2 to C1, primary rotator at atlantoaxial joint.',
    bidirectional: false,
    clinical_relevance: 'Forms inferolateral border of suboccipital triangle.',
  },

  // Superficial muscle relationships
  {
    source_structure_id: 'trapezius' as UUID,
    target_structure_id: 'c7-vertebra' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Trapezius originates from the external occipital protuberance, nuchal ligament, and spinous processes C7-T12.',
    bidirectional: false,
    clinical_relevance: 'Accessory nerve injury causes drooping shoulder.',
  },
  {
    source_structure_id: 'latissimus-dorsi' as UUID,
    target_structure_id: 'l5-vertebra' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Latissimus dorsi arises from spinous processes T7-L5 via thoracolumbar fascia.',
    bidirectional: false,
    clinical_relevance: 'Used in breast reconstruction; forms posterior axillary fold.',
  },
  {
    source_structure_id: 'rhomboid-major' as UUID,
    target_structure_id: 't1-vertebra' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Rhomboid major originates from spinous processes of T2-T5.',
    bidirectional: false,
    clinical_relevance: 'Retracts scapula; weakness causes scapular winging.',
  },
  {
    source_structure_id: 'rhomboid-minor' as UUID,
    target_structure_id: 'c7-vertebra' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Rhomboid minor originates from nuchal ligament and spinous processes C7-T1.',
    bidirectional: false,
    clinical_relevance: 'Often acts with rhomboid major in scapular retraction.',
  },
  {
    source_structure_id: 'levator-scapulae' as UUID,
    target_structure_id: 'atlas-c1' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Levator scapulae originates from transverse processes of C1-C4.',
    bidirectional: false,
    clinical_relevance: 'Common source of neck pain and stiffness.',
  },

  // Spinal cord and meninges relationships
  {
    source_structure_id: 'spinal-cord' as UUID,
    target_structure_id: 'dura-mater-spinal' as UUID,
    relationship_type: RelationshipType.CONTAINS,
    description: 'The spinal cord is enclosed by the dura mater within the vertebral canal.',
    bidirectional: false,
    clinical_relevance: 'Dural sac extends to S2; lumbar puncture performed below L2 to avoid cord.',
  },
  {
    source_structure_id: 'dura-mater-spinal' as UUID,
    target_structure_id: 'arachnoid-mater-spinal' as UUID,
    relationship_type: RelationshipType.SUPERFICIAL_TO,
    description: 'Dura mater is superficial to arachnoid mater, separated by potential subdural space.',
    bidirectional: false,
    clinical_relevance: 'Subdural hematoma can occur from vessel tearing.',
  },
  {
    source_structure_id: 'arachnoid-mater-spinal' as UUID,
    target_structure_id: 'pia-mater-spinal' as UUID,
    relationship_type: RelationshipType.SUPERFICIAL_TO,
    description: 'Arachnoid mater is superficial to pia mater, separated by CSF-filled subarachnoid space.',
    bidirectional: false,
    clinical_relevance: 'Lumbar puncture enters subarachnoid space to obtain CSF.',
  },
  {
    source_structure_id: 'pia-mater-spinal' as UUID,
    target_structure_id: 'spinal-cord' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Pia mater intimately adheres to spinal cord surface.',
    bidirectional: false,
    clinical_relevance: 'Carries blood vessels to spinal cord; forms denticulate ligaments.',
  },

  // Additional relationships for completeness
  {
    source_structure_id: 'interspinales' as UUID,
    target_structure_id: 'l2-vertebra' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Interspinales connect adjacent spinous processes, best developed in lumbar region.',
    bidirectional: false,
    clinical_relevance: 'Primary proprioceptive function.',
  },
  {
    source_structure_id: 'intertransversarii' as UUID,
    target_structure_id: 'l3-vertebra' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Intertransversarii connect transverse processes of adjacent vertebrae.',
    bidirectional: false,
    clinical_relevance: 'Assist in lateral flexion and proprioception.',
  },
  {
    source_structure_id: 'levatores-costarum' as UUID,
    target_structure_id: 't5-t8-vertebra' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Levatores costarum extend from transverse processes to ribs below.',
    bidirectional: false,
    clinical_relevance: 'Minor accessory muscles of respiration.',
  },

  // Spinal nerve relationships (examples)
  {
    source_structure_id: 'spinal-cord' as UUID,
    target_structure_id: 'c7-vertebra' as UUID,
    relationship_type: RelationshipType.PASSES_THROUGH,
    description: 'Spinal cord passes through the vertebral canal formed by stacked vertebrae.',
    bidirectional: false,
    clinical_relevance: 'Spinal stenosis can compress cord, causing myelopathy.',
  },

  // Sacrum and coccyx relationships
  {
    source_structure_id: 'sacrum' as UUID,
    target_structure_id: 'l5-vertebra' as UUID,
    relationship_type: RelationshipType.ARTICULATES_WITH,
    description: 'Sacrum articulates superiorly with L5 at the lumbosacral joint.',
    bidirectional: true,
    clinical_relevance: 'L5-S1 is a common site for disc herniation and spondylolisthesis.',
  },
  {
    source_structure_id: 'coccyx' as UUID,
    target_structure_id: 'sacrum' as UUID,
    relationship_type: RelationshipType.ARTICULATES_WITH,
    description: 'Coccyx articulates with sacrum at the sacrococcygeal joint.',
    bidirectional: true,
    clinical_relevance: 'Coccygeal fractures typically result from falls; coccydynia is chronic tailbone pain.',
  },

  // Additional muscle-bone attachments
  {
    source_structure_id: 'rectus-capitis-posterior-minor' as UUID,
    target_structure_id: 'atlas-c1' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Rectus capitis posterior minor originates from the posterior tubercle of atlas.',
    bidirectional: false,
    clinical_relevance: 'May have connections to dura mater; role in preventing dural infolding.',
  },

  // Ligamentum nuchae relationships
  {
    source_structure_id: 'ligamentum-nuchae' as UUID,
    target_structure_id: 'c7-vertebra' as UUID,
    relationship_type: RelationshipType.ATTACHES_TO,
    description: 'Ligamentum nuchae extends from external occipital protuberance to C7 spinous process.',
    bidirectional: false,
    clinical_relevance: 'Supports head position; continuation of supraspinous ligament in cervical region.',
  },
];

// ============================================================================
// Export Seed Data
// ============================================================================

export const backSeedData: BackSeedData = {
  region,
  systems,
  structures,
  relationships,
};
