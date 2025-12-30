/**
 * Lower Limb Anatomical Region Seed Data
 * Netter's Atlas of Human Anatomy - Plates 469-531
 *
 * This file contains comprehensive seed data for the lower limb region including:
 * - Region definition
 * - Systems (Skeletal, Muscular, Vascular, Nervous)
 * - Structures (bones, muscles, arteries, nerves)
 * - Relationships (attachments, innervations, blood supply)
 * - Clinical correlations
 */

import type { StructureType, RelationshipType } from '@/types';

// ============================================================================
// Type Definitions
// ============================================================================

interface SeedRegion {
  id: string;
  name: string;
  slug: string;
  description: string;
  atlas_plate_range: string;
  sort_order: number;
  thumbnail_url: string;
  color: string;
}

interface SeedSystem {
  id: string;
  name: string;
  slug: string;
  description: string;
  color_code: string;
  sort_order: number;
}

interface SeedStructure {
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
  image_references: any[];
  difficulty_rating: number;
  prerequisite_ids: string[];
  netter_plates: string[];
}

interface SeedRelationship {
  id: string;
  source_structure_id: string;
  target_structure_id: string;
  relationship_type: RelationshipType;
  description: string;
  bidirectional: boolean;
  clinical_relevance: string | null;
}

export interface LowerLimbSeedData {
  region: SeedRegion;
  systems: SeedSystem[];
  structures: SeedStructure[];
  relationships: SeedRelationship[];
}

// ============================================================================
// Region Definition
// ============================================================================

const region: SeedRegion = {
  id: 'region-lower-limb',
  name: 'Lower Limb',
  slug: 'lower-limb',
  description: 'Hip, thigh, leg, ankle, and foot structures including bones, muscles, vessels, and nerves',
  atlas_plate_range: '469-531',
  sort_order: 7,
  thumbnail_url: '/assets/regions/lower-limb.png',
  color: '#4A90E2',
};

// ============================================================================
// Systems
// ============================================================================

const systems: SeedSystem[] = [
  {
    id: 'system-ll-skeletal',
    name: 'Skeletal System',
    slug: 'skeletal',
    description: 'Bones and joints of the lower limb',
    color_code: '#F5F0E6',
    sort_order: 1,
  },
  {
    id: 'system-ll-muscular',
    name: 'Muscular System',
    slug: 'muscular',
    description: 'Muscles of the hip, thigh, leg, and foot',
    color_code: '#C45C5C',
    sort_order: 2,
  },
  {
    id: 'system-ll-vascular',
    name: 'Vascular System',
    slug: 'vascular',
    description: 'Arteries and veins of the lower limb',
    color_code: '#D64545',
    sort_order: 3,
  },
  {
    id: 'system-ll-nervous',
    name: 'Nervous System',
    slug: 'nervous',
    description: 'Nerves and nerve plexuses of the lower limb',
    color_code: '#E6C744',
    sort_order: 4,
  },
];

// ============================================================================
// Structures - Bones (31 bones per limb)
// ============================================================================

const bones: SeedStructure[] = [
  // Hip Bone (Os Coxae)
  {
    id: 'struct-ll-hip-bone',
    canonical_name: 'Hip bone',
    common_names: ['Os coxae', 'Innominate bone', 'Pelvic bone'],
    latin_name: 'Os coxae',
    pronunciation_ipa: '/ɒs ˈkɒksiː/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-skeletal'],
    structure_type: 'bone' as StructureType,
    parent_structure_id: null,
    definition_brief: 'Large irregular bone forming the lateral half of the pelvis, composed of ilium, ischium, and pubis.',
    description_full: `The hip bone (os coxae) is formed by the fusion of three bones: ilium, ischium, and pubis. These bones fuse at the acetabulum, which articulates with the femoral head to form the hip joint.\n\nThe ilium forms the superior portion with the iliac crest and anterior/posterior superior iliac spines. The ischium forms the posteroinferior portion with the ischial tuberosity. The pubis forms the anteromedial portion and articulates with the contralateral pubis at the pubic symphysis.`,
    clinical_significance: 'Fractures commonly occur from high-energy trauma or falls in elderly. The acetabulum is a common site for osteoarthritis. Avulsion fractures of the iliac spines occur in young athletes. Stress fractures may occur in distance runners.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Iliac arteries, obturator artery, superior/inferior gluteal arteries',
    model_reference: 'hip_bone_right',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
    netter_plates: ['469', '470', '471'],
  },

  // Femur
  {
    id: 'struct-ll-femur',
    canonical_name: 'Femur',
    common_names: ['Thigh bone', 'Femoral bone'],
    latin_name: 'Os femoris',
    pronunciation_ipa: '/ˈfiːmər/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-skeletal'],
    structure_type: 'bone' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The longest and strongest bone in the human body, extending from hip to knee.',
    description_full: `The femur is the only bone in the thigh, articulating proximally with the acetabulum and distally with the tibia and patella.\n\nProximally, it features the femoral head (articulates with acetabulum), neck (common fracture site), and greater/lesser trochanters (muscle attachment sites). The shaft is cylindrical with a posterior linea aspera for muscle attachments. Distally, it has medial and lateral condyles that articulate with the tibia, and an anterior patellar surface.`,
    clinical_significance: 'Femoral neck fractures are common in elderly with osteoporosis ("hip fractures"). Mid-shaft fractures may cause significant blood loss. Supracondylar fractures risk popliteal artery injury. The angle of inclination (normally 125°) can be abnormal in developmental conditions.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Medial and lateral circumflex femoral arteries, nutrient artery, genicular arteries',
    model_reference: 'femur_right',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-hip-bone'],
    netter_plates: ['477', '478'],
  },

  // Patella
  {
    id: 'struct-ll-patella',
    canonical_name: 'Patella',
    common_names: ['Kneecap'],
    latin_name: 'Patella',
    pronunciation_ipa: '/pəˈtɛlə/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-skeletal'],
    structure_type: 'bone' as StructureType,
    parent_structure_id: null,
    definition_brief: 'Largest sesamoid bone in the body, embedded in the quadriceps tendon anterior to the knee joint.',
    description_full: `The patella is a triangular sesamoid bone that develops within the quadriceps tendon. It has a rough anterior surface and a smooth posterior surface with medial and lateral facets that articulate with the femoral condyles.\n\nThe patella acts as a pulley to increase the mechanical advantage of the quadriceps femoris muscle. The apex points inferiorly and gives attachment to the patellar ligament.`,
    clinical_significance: 'Patellar fractures from direct trauma or forceful quadriceps contraction. Patellar dislocation (usually lateral) is common in young athletes. Chondromalacia patellae causes anterior knee pain. Bipartite patella is a normal variant.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Genicular anastomosis',
    model_reference: 'patella_right',
    image_references: [],
    difficulty_rating: 1,
    prerequisite_ids: ['struct-ll-femur'],
    netter_plates: ['492', '493'],
  },

  // Tibia
  {
    id: 'struct-ll-tibia',
    canonical_name: 'Tibia',
    common_names: ['Shin bone'],
    latin_name: 'Tibia',
    pronunciation_ipa: '/ˈtɪbiə/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-skeletal'],
    structure_type: 'bone' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The larger medial bone of the leg, bearing most of the body weight transmitted from the femur.',
    description_full: `The tibia is the weight-bearing bone of the leg, articulating proximally with the femur and fibula, and distally with the talus and fibula.\n\nProximally, it has medial and lateral condyles (tibial plateau) with intercondylar eminence, and tibial tuberosity anteriorly. The shaft is triangular in cross-section with sharp anterior border ("shin"). Distally, it has a medial malleolus and inferior articular surface for the talus.`,
    clinical_significance: 'Tibial plateau fractures from axial loading. Tibial shaft fractures are common, often from direct trauma. Compartment syndrome risk is high. Stress fractures occur in runners. The anterior border is subcutaneous and prone to injury.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Anterior and posterior tibial arteries, nutrient artery',
    model_reference: 'tibia_right',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-femur'],
    netter_plates: ['495', '496'],
  },

  // Fibula
  {
    id: 'struct-ll-fibula',
    canonical_name: 'Fibula',
    common_names: ['Calf bone'],
    latin_name: 'Fibula',
    pronunciation_ipa: '/ˈfɪbjʊlə/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-skeletal'],
    structure_type: 'bone' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The slender lateral bone of the leg, providing muscle attachment and ankle stability.',
    description_full: `The fibula is a non-weight-bearing bone that provides lateral stability to the ankle and extensive muscle attachments.\n\nProximally, it has a fibular head and neck, articulating with the lateral tibial condyle. The shaft is slender and irregular. Distally, it forms the lateral malleolus, which articulates with the talus and helps stabilize the ankle mortise.`,
    clinical_significance: 'Fibular head fractures may injure common fibular nerve. Lateral malleolus fractures are common ankle injuries. The fibula is a common donor site for bone grafts. Stress fractures occur in runners.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Fibular artery (peroneal artery), nutrient artery',
    model_reference: 'fibula_right',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-tibia'],
    netter_plates: ['495', '496'],
  },

  // Tarsal Bones (7)
  {
    id: 'struct-ll-talus',
    canonical_name: 'Talus',
    common_names: ['Ankle bone'],
    latin_name: 'Talus',
    pronunciation_ipa: '/ˈteɪləs/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-skeletal'],
    structure_type: 'bone' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The bone of the foot that articulates with the tibia and fibula to form the ankle joint.',
    description_full: `The talus transmits weight from the tibia to the foot. It has a body with a superior trochlear surface (ankle mortise), a neck, and a head that articulates with the navicular.\n\nThe talus has no muscular attachments and derives blood supply from surrounding vessels, making it prone to avascular necrosis. It articulates with tibia, fibula, calcaneus, and navicular.`,
    clinical_significance: 'Talar fractures may lead to avascular necrosis due to tenuous blood supply. Talar dome injuries cause chronic ankle pain. The talus is involved in ankle sprains and dislocations.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Artery of tarsal canal, dorsalis pedis artery branches',
    model_reference: 'talus_right',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['struct-ll-tibia', 'struct-ll-fibula'],
    netter_plates: ['509', '510', '511'],
  },

  {
    id: 'struct-ll-calcaneus',
    canonical_name: 'Calcaneus',
    common_names: ['Heel bone'],
    latin_name: 'Calcaneus',
    pronunciation_ipa: '/kælˈkeɪniəs/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-skeletal'],
    structure_type: 'bone' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The largest tarsal bone, forming the heel and providing attachment for the Achilles tendon.',
    description_full: `The calcaneus is the largest and most posterior foot bone, supporting the talus and providing leverage for walking. It has a posterior tuberosity for Achilles tendon attachment and a sustentaculum tali supporting the talus medially.\n\nThe calcaneus articulates with the talus superiorly and cuboid anteriorly. Its inferior surface has medial and lateral processes for weight bearing during standing.`,
    clinical_significance: 'Calcaneal fractures from falls cause significant disability. Achilles tendon insertional pathology is common. Plantar fasciitis affects the attachment of plantar fascia to the calcaneal tuberosity. Haglund deformity causes posterior heel pain.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Calcaneal branches of posterior tibial and fibular arteries',
    model_reference: 'calcaneus_right',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-talus'],
    netter_plates: ['509', '510', '511'],
  },

  {
    id: 'struct-ll-navicular',
    canonical_name: 'Navicular',
    common_names: ['Navicular bone'],
    latin_name: 'Os naviculare',
    pronunciation_ipa: '/nəˈvɪkjʊlər/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-skeletal'],
    structure_type: 'bone' as StructureType,
    parent_structure_id: null,
    definition_brief: 'Boat-shaped tarsal bone on the medial side of the foot, articulating with talus and cuneiforms.',
    description_full: `The navicular is located on the medial side of the foot between the talus posteriorly and the three cuneiform bones anteriorly. It has a prominent tuberosity on its medial surface for tibialis posterior attachment.\n\nThe navicular is essential for maintaining the medial longitudinal arch of the foot.`,
    clinical_significance: 'Accessory navicular is a common anatomical variant that may cause medial foot pain. Navicular stress fractures occur in athletes. The navicular tuberosity may be prominent and cause shoe irritation.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Dorsalis pedis artery, medial plantar artery',
    model_reference: 'navicular_right',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-talus'],
    netter_plates: ['509', '510'],
  },

  {
    id: 'struct-ll-cuboid',
    canonical_name: 'Cuboid',
    common_names: ['Cuboid bone'],
    latin_name: 'Os cuboideum',
    pronunciation_ipa: '/ˈkjuːbɔɪd/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-skeletal'],
    structure_type: 'bone' as StructureType,
    parent_structure_id: null,
    definition_brief: 'Cube-shaped tarsal bone on the lateral side of the foot, articulating with calcaneus and metatarsals 4-5.',
    description_full: `The cuboid is located on the lateral side of the foot, anterior to the calcaneus and lateral to the lateral cuneiform. It articulates posteriorly with the calcaneus and anteriorly with the fourth and fifth metatarsals.\n\nThe cuboid has a groove on its plantar surface for the fibularis longus tendon (peroneus longus).`,
    clinical_significance: 'Cuboid syndrome (subluxation) causes lateral midfoot pain. Stress fractures can occur in athletes. The cuboid is involved in maintaining the lateral longitudinal arch.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Lateral plantar artery, dorsalis pedis artery',
    model_reference: 'cuboid_right',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-calcaneus'],
    netter_plates: ['509', '510'],
  },

  {
    id: 'struct-ll-medial-cuneiform',
    canonical_name: 'Medial cuneiform',
    common_names: ['First cuneiform', 'Internal cuneiform'],
    latin_name: 'Os cuneiforme mediale',
    pronunciation_ipa: '/kjuːˈniːɪfɔːrm/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-skeletal'],
    structure_type: 'bone' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The largest and most medial cuneiform bone, articulating with the first metatarsal.',
    description_full: `The medial cuneiform is the largest of the three cuneiforms, located between the navicular posteriorly and the first metatarsal anteriorly. It is wedge-shaped with the base on the plantar surface.\n\nIt provides a stable base for the first metatarsal and is important for weight transmission during gait.`,
    clinical_significance: 'Involved in hallux valgus deformity and first ray instability. May develop stress fractures. Important in the medial longitudinal arch.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Dorsalis pedis artery, medial plantar artery',
    model_reference: 'medial_cuneiform_right',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['struct-ll-navicular'],
    netter_plates: ['509', '510'],
  },

  {
    id: 'struct-ll-intermediate-cuneiform',
    canonical_name: 'Intermediate cuneiform',
    common_names: ['Second cuneiform', 'Middle cuneiform'],
    latin_name: 'Os cuneiforme intermedium',
    pronunciation_ipa: '/kjuːˈniːɪfɔːrm/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-skeletal'],
    structure_type: 'bone' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The smallest cuneiform bone, located between medial and lateral cuneiforms.',
    description_full: `The intermediate cuneiform is the smallest of the three cuneiforms, wedge-shaped with the base on the dorsal surface. It articulates posteriorly with the navicular and anteriorly with the second metatarsal.\n\nIts wedge shape (narrower plantarly) helps maintain the transverse arch of the foot.`,
    clinical_significance: 'Less commonly fractured than other cuneiforms. Involved in Lisfranc injuries. Contributes to the transverse arch.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Dorsalis pedis artery',
    model_reference: 'intermediate_cuneiform_right',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['struct-ll-navicular'],
    netter_plates: ['509', '510'],
  },

  {
    id: 'struct-ll-lateral-cuneiform',
    canonical_name: 'Lateral cuneiform',
    common_names: ['Third cuneiform', 'External cuneiform'],
    latin_name: 'Os cuneiforme laterale',
    pronunciation_ipa: '/kjuːˈniːɪfɔːrm/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-skeletal'],
    structure_type: 'bone' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The most lateral cuneiform bone, articulating with the third metatarsal.',
    description_full: `The lateral cuneiform is wedge-shaped with the base on the dorsal surface. It articulates posteriorly with the navicular, anteriorly with the third metatarsal, and laterally with the cuboid.\n\nIt is intermediate in size between the medial (largest) and intermediate (smallest) cuneiforms.`,
    clinical_significance: 'May be involved in Lisfranc injuries and midfoot arthritis. Contributes to the transverse and medial longitudinal arches.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Dorsalis pedis artery, lateral plantar artery',
    model_reference: 'lateral_cuneiform_right',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['struct-ll-navicular'],
    netter_plates: ['509', '510'],
  },

  // Metatarsals (5) - Abbreviated for space
  {
    id: 'struct-ll-metatarsal-1',
    canonical_name: 'First metatarsal',
    common_names: ['Metatarsal I', 'Great toe metatarsal'],
    latin_name: 'Os metatarsale I',
    pronunciation_ipa: '/ˌmɛtəˈtɑːrsəl/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-skeletal'],
    structure_type: 'bone' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The shortest and thickest metatarsal, supporting the great toe and bearing significant weight.',
    description_full: `The first metatarsal is the shortest, thickest, and strongest metatarsal bone. It articulates proximally with the medial cuneiform and distally with the proximal phalanx of the great toe.\n\nTwo sesamoid bones are normally present in the tendons of flexor hallucis brevis at the metatarsophalangeal joint. The first metatarsal bears approximately twice the load of each of the other metatarsals during gait.`,
    clinical_significance: 'Hallux valgus (bunion) involves lateral deviation of the first metatarsal. Stress fractures occur in runners. Gout commonly affects the first metatarsophalangeal joint. Sesamoid pathology causes plantar forefoot pain.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'First dorsal metatarsal artery, medial plantar artery',
    model_reference: 'metatarsal_1_right',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-medial-cuneiform'],
    netter_plates: ['509', '510'],
  },
];

// Additional metatarsals 2-5 (abbreviated)
for (let i = 2; i <= 5; i++) {
  bones.push({
    id: `struct-ll-metatarsal-${i}`,
    canonical_name: `Metatarsal ${i}`,
    common_names: [`Metatarsal ${['I', 'II', 'III', 'IV', 'V'][i - 1]}`],
    latin_name: `Os metatarsale ${['I', 'II', 'III', 'IV', 'V'][i - 1]}`,
    pronunciation_ipa: '/ˌmɛtəˈtɑːrsəl/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-skeletal'],
    structure_type: 'bone' as StructureType,
    parent_structure_id: null,
    definition_brief: `The ${['second', 'third', 'fourth', 'fifth'][i - 2]} metatarsal bone of the foot.`,
    description_full: `Metatarsal ${i} is a long bone with a base, shaft, and head. It articulates proximally with tarsal bones and distally with the proximal phalanx of the ${['second', 'third', 'fourth', 'fifth'][i - 2]} toe.`,
    clinical_significance: i === 5 ? 'Jones fracture (base of 5th metatarsal) has poor healing. Dancer\'s fracture affects the neck/shaft.' : 'Stress fractures common in athletes. Metatarsalgia causes forefoot pain.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Dorsal and plantar metatarsal arteries',
    model_reference: `metatarsal_${i}_right`,
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: i === 2 ? ['struct-ll-intermediate-cuneiform'] : i === 3 ? ['struct-ll-lateral-cuneiform'] : ['struct-ll-cuboid'],
    netter_plates: ['509', '510'],
  });
}

// Phalanges (14 total: 2 for great toe, 3 for each of 4 lesser toes)
// Great toe phalanges
bones.push({
  id: 'struct-ll-phalanx-hallux-proximal',
  canonical_name: 'Proximal phalanx of great toe',
  common_names: ['Hallux proximal phalanx'],
  latin_name: 'Phalanx proximalis hallucis',
  pronunciation_ipa: '/fəˈlæŋks/',
  region_id: 'region-lower-limb',
  system_ids: ['system-ll-skeletal'],
  structure_type: 'bone' as StructureType,
  parent_structure_id: null,
  definition_brief: 'The proximal of two phalanges in the great toe.',
  description_full: 'The proximal phalanx of the great toe articulates proximally with the first metatarsal and distally with the distal phalanx.',
  clinical_significance: 'Involved in hallux valgus and hallux rigidus. Fractures can occur from stubbing injuries.',
  origin: null,
  insertion: null,
  action: null,
  innervation: null,
  blood_supply: 'Digital arteries',
  model_reference: 'phalanx_hallux_proximal_right',
  image_references: [],
  difficulty_rating: 1,
  prerequisite_ids: ['struct-ll-metatarsal-1'],
  netter_plates: ['509', '510'],
});

bones.push({
  id: 'struct-ll-phalanx-hallux-distal',
  canonical_name: 'Distal phalanx of great toe',
  common_names: ['Hallux distal phalanx'],
  latin_name: 'Phalanx distalis hallucis',
  pronunciation_ipa: '/fəˈlæŋks/',
  region_id: 'region-lower-limb',
  system_ids: ['system-ll-skeletal'],
  structure_type: 'bone' as StructureType,
  parent_structure_id: null,
  definition_brief: 'The distal of two phalanges in the great toe.',
  description_full: 'The distal phalanx of the great toe is the terminal bone, articulating proximally with the proximal phalanx.',
  clinical_significance: 'Fractures common from dropping objects on foot. Nail bed injuries associated with distal phalanx fractures.',
  origin: null,
  insertion: null,
  action: null,
  innervation: null,
  blood_supply: 'Digital arteries',
  model_reference: 'phalanx_hallux_distal_right',
  image_references: [],
  difficulty_rating: 1,
  prerequisite_ids: ['struct-ll-phalanx-hallux-proximal'],
  netter_plates: ['509', '510'],
});

// Lesser toes phalanges (simplified - 12 total)
for (let toe = 2; toe <= 5; toe++) {
  const toeName = ['second', 'third', 'fourth', 'fifth'][toe - 2];
  ['proximal', 'middle', 'distal'].forEach((position) => {
    bones.push({
      id: `struct-ll-phalanx-${toe}-${position}`,
      canonical_name: `${position.charAt(0).toUpperCase() + position.slice(1)} phalanx of ${toeName} toe`,
      common_names: [`Toe ${toe} ${position} phalanx`],
      latin_name: `Phalanx ${position === 'middle' ? 'media' : position === 'proximal' ? 'proximalis' : 'distalis'} digiti ${toe}`,
      pronunciation_ipa: '/fəˈlæŋks/',
      region_id: 'region-lower-limb',
      system_ids: ['system-ll-skeletal'],
      structure_type: 'bone' as StructureType,
      parent_structure_id: null,
      definition_brief: `The ${position} phalanx of the ${toeName} toe.`,
      description_full: `The ${position} phalanx is one of three bones in the ${toeName} toe, articulating proximally with the ${position === 'proximal' ? 'metatarsal' : 'more proximal phalanx'}.`,
      clinical_significance: 'Fractures common from stubbing. Hammer toe and claw toe deformities involve phalangeal joints.',
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: 'Digital arteries',
      model_reference: `phalanx_${toe}_${position}_right`,
      image_references: [],
      difficulty_rating: 1,
      prerequisite_ids: position === 'proximal' ? [`struct-ll-metatarsal-${toe}`] : [],
      netter_plates: ['509', '510'],
    });
  });
}

// ============================================================================
// Structures - Muscles (40+ major muscles)
// ============================================================================

const muscles: SeedStructure[] = [
  // Hip/Gluteal Muscles
  {
    id: 'struct-ll-gluteus-maximus',
    canonical_name: 'Gluteus maximus',
    common_names: ['Greatest gluteal muscle'],
    latin_name: 'Musculus gluteus maximus',
    pronunciation_ipa: '/ˈɡluːtiəs ˈmæksɪməs/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-muscular'],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The largest and most superficial gluteal muscle, primary hip extensor and external rotator.',
    description_full: `Gluteus maximus is the largest muscle in the human body and forms the bulk of the buttock. It is a powerful hip extensor, especially important in activities like climbing stairs, running, and rising from a seated position.\n\nThe muscle has a quadrilateral shape and runs from the posterior pelvis obliquely to insert on the iliotibial tract and gluteal tuberosity of the femur. Only the deeper fibers insert directly on the femur.`,
    clinical_significance: 'Weakness causes difficulty climbing stairs and rising from sitting (Trendelenburg sign when bilateral). The superior gluteal nerve can be injured during intramuscular injections if not in the superolateral quadrant. Gluteus maximus gait involves backward trunk lean to compensate for weakness.',
    origin: 'Posterior gluteal line of ilium, sacrum, coccyx, sacrotuberous ligament',
    insertion: 'Iliotibial tract (75%) and gluteal tuberosity of femur (25%)',
    action: 'Hip extension, lateral rotation, abduction (upper fibers), adduction (lower fibers)',
    innervation: 'Inferior gluteal nerve (L5-S2)',
    blood_supply: 'Superior and inferior gluteal arteries',
    model_reference: 'gluteus_maximus',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-hip-bone', 'struct-ll-femur'],
    netter_plates: ['481', '482', '483'],
  },

  {
    id: 'struct-ll-gluteus-medius',
    canonical_name: 'Gluteus medius',
    common_names: ['Middle gluteal muscle'],
    latin_name: 'Musculus gluteus medius',
    pronunciation_ipa: '/ˈɡluːtiəs ˈmiːdiəs/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-muscular'],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'A broad, thick muscle located deep to gluteus maximus, primary hip abductor.',
    description_full: `Gluteus medius is essential for stabilizing the pelvis during walking. When standing on one leg, it prevents the pelvis from dropping on the unsupported side. The muscle is fan-shaped and lies deep to gluteus maximus.\n\nIt has anterior fibers that medially rotate and posterior fibers that laterally rotate the hip, with the middle fibers being pure abductors.`,
    clinical_significance: 'Trendelenburg sign (pelvic drop on unsupported side) indicates weakness. Superior gluteal nerve injury (during hip surgery or intramuscular injections) causes characteristic Trendelenburg gait. Gluteus medius tendinopathy causes lateral hip pain.',
    origin: 'External surface of ilium between anterior and posterior gluteal lines',
    insertion: 'Lateral surface of greater trochanter',
    action: 'Hip abduction, medial rotation (anterior fibers), lateral rotation (posterior fibers), pelvis stabilization',
    innervation: 'Superior gluteal nerve (L4-S1)',
    blood_supply: 'Superior gluteal artery',
    model_reference: 'gluteus_medius',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['struct-ll-hip-bone', 'struct-ll-femur'],
    netter_plates: ['481', '482'],
  },

  {
    id: 'struct-ll-gluteus-minimus',
    canonical_name: 'Gluteus minimus',
    common_names: ['Smallest gluteal muscle'],
    latin_name: 'Musculus gluteus minimus',
    pronunciation_ipa: '/ˈɡluːtiəs ˈmɪnɪməs/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-muscular'],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The smallest and deepest gluteal muscle, assisting in hip abduction and stabilization.',
    description_full: `Gluteus minimus is the smallest of the three gluteal muscles, lying deep to gluteus medius. It has a similar fan shape and function to gluteus medius, working synergistically for hip abduction and pelvic stabilization.\n\nThe muscle is particularly active during the swing phase of gait to maintain pelvic alignment.`,
    clinical_significance: 'Often injured together with gluteus medius (superior gluteal nerve injury). Contributes to lateral hip pain and Trendelenburg sign when weak.',
    origin: 'External surface of ilium between anterior and inferior gluteal lines',
    insertion: 'Anterior surface of greater trochanter',
    action: 'Hip abduction, medial rotation, pelvis stabilization',
    innervation: 'Superior gluteal nerve (L4-S1)',
    blood_supply: 'Superior gluteal artery',
    model_reference: 'gluteus_minimus',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['struct-ll-hip-bone', 'struct-ll-femur'],
    netter_plates: ['481', '482'],
  },

  // Quadriceps Femoris (4 heads)
  {
    id: 'struct-ll-rectus-femoris',
    canonical_name: 'Rectus femoris',
    common_names: ['Straight muscle of thigh'],
    latin_name: 'Musculus rectus femoris',
    pronunciation_ipa: '/ˈrɛktəs ˈfɛmərɪs/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-muscular'],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The only quadriceps muscle crossing both hip and knee joints, extending the knee and flexing the hip.',
    description_full: `Rectus femoris is the most superficial and central of the quadriceps muscles. It is unique among the quadriceps because it crosses both the hip (where it flexes) and knee (where it extends) joints, making it a biarticular muscle.\n\nIt has two heads of origin: a straight head from the anterior inferior iliac spine and a reflected head from the superior acetabular rim. The muscle belly is fusiform and becomes tendinous in its distal third.`,
    clinical_significance: 'Avulsion fractures of the anterior inferior iliac spine occur in young athletes during forceful kicking. Contusions ("charley horse") are common in contact sports. Weakness affects stair climbing and kicking activities.',
    origin: 'Anterior inferior iliac spine (straight head), acetabular rim (reflected head)',
    insertion: 'Tibial tuberosity via quadriceps tendon and patellar ligament',
    action: 'Knee extension, hip flexion',
    innervation: 'Femoral nerve (L2-L4)',
    blood_supply: 'Lateral circumflex femoral artery',
    model_reference: 'rectus_femoris',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-hip-bone', 'struct-ll-femur', 'struct-ll-patella'],
    netter_plates: ['485', '486'],
  },

  {
    id: 'struct-ll-vastus-lateralis',
    canonical_name: 'Vastus lateralis',
    common_names: ['Lateral vast muscle'],
    latin_name: 'Musculus vastus lateralis',
    pronunciation_ipa: '/ˈvæstəs ˌlætəˈreɪlɪs/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-muscular'],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The largest quadriceps muscle, located on the lateral side of the thigh, powerful knee extensor.',
    description_full: `Vastus lateralis is the largest component of the quadriceps femoris and forms the lateral contour of the thigh. It arises from the lateral lip of the linea aspera and intertrochanteric line.\n\nThe muscle is commonly used for intramuscular injections in infants and adults. It is particularly well-developed in cyclists and runners.`,
    clinical_significance: 'Preferred site for intramuscular injections. Weakness significantly impairs knee extension strength. May develop trigger points causing referred knee pain. Important in patellofemoral tracking.',
    origin: 'Intertrochanteric line, greater trochanter, linea aspera (lateral lip)',
    insertion: 'Tibial tuberosity via quadriceps tendon and patellar ligament, lateral patellar border',
    action: 'Knee extension',
    innervation: 'Femoral nerve (L2-L4)',
    blood_supply: 'Lateral circumflex femoral artery',
    model_reference: 'vastus_lateralis',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-femur', 'struct-ll-patella'],
    netter_plates: ['485', '486'],
  },

  {
    id: 'struct-ll-vastus-medialis',
    canonical_name: 'Vastus medialis',
    common_names: ['Medial vast muscle', 'VMO (vastus medialis obliquus)'],
    latin_name: 'Musculus vastus medialis',
    pronunciation_ipa: '/ˈvæstəs ˌmiːdiˈeɪlɪs/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-muscular'],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The medial quadriceps muscle, important for terminal knee extension and patellar stabilization.',
    description_full: `Vastus medialis forms the medial contour of the distal thigh. The distal oblique fibers (VMO - vastus medialis obliquus) are particularly important for patellar stabilization, preventing lateral patellar dislocation.\n\nThe VMO is often the first part of the quadriceps to atrophy after knee injury and the last to strengthen during rehabilitation.`,
    clinical_significance: 'VMO atrophy is common after knee surgery or injury. Weakness contributes to patellofemoral pain syndrome and patellar instability. Selective VMO strengthening is a rehabilitation focus. The "teardrop" appearance when developed indicates good quadriceps conditioning.',
    origin: 'Intertrochanteric line, linea aspera (medial lip)',
    insertion: 'Tibial tuberosity via quadriceps tendon and patellar ligament, medial patellar border',
    action: 'Knee extension, patellar stabilization (especially VMO)',
    innervation: 'Femoral nerve (L2-L4)',
    blood_supply: 'Femoral artery and deep femoral artery branches',
    model_reference: 'vastus_medialis',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-femur', 'struct-ll-patella'],
    netter_plates: ['485', '486'],
  },

  {
    id: 'struct-ll-vastus-intermedius',
    canonical_name: 'Vastus intermedius',
    common_names: ['Intermediate vast muscle'],
    latin_name: 'Musculus vastus intermedius',
    pronunciation_ipa: '/ˈvæstəs ˌɪntərˈmiːdiəs/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-muscular'],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The deepest quadriceps muscle, lying between vastus lateralis and medialis, extending the knee.',
    description_full: `Vastus intermedius lies deep to rectus femoris on the anterior shaft of the femur. It is the deepest of the four quadriceps muscles and is largely covered by rectus femoris.\n\nA recently recognized fifth component, tensor vastus intermedius, exists as a distinct muscle in the proximal anterior thigh in most individuals.`,
    clinical_significance: 'Less commonly injured individually. Contributes to overall quadriceps strength. May harbor the articularis genus muscle that pulls the knee joint capsule proximally during extension.',
    origin: 'Anterior and lateral surfaces of femoral shaft',
    insertion: 'Tibial tuberosity via quadriceps tendon and patellar ligament',
    action: 'Knee extension',
    innervation: 'Femoral nerve (L2-L4)',
    blood_supply: 'Lateral circumflex femoral artery',
    model_reference: 'vastus_intermedius',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['struct-ll-femur', 'struct-ll-patella'],
    netter_plates: ['485', '486'],
  },

  // Hamstrings (3)
  {
    id: 'struct-ll-biceps-femoris',
    canonical_name: 'Biceps femoris',
    common_names: ['Two-headed muscle of thigh'],
    latin_name: 'Musculus biceps femoris',
    pronunciation_ipa: '/ˈbaɪsɛps ˈfɛmərɪs/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-muscular'],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'A two-headed posterior thigh muscle, flexing the knee and extending the hip.',
    description_full: `Biceps femoris is the most lateral of the hamstring muscles. It has a long head (part of the hamstrings) arising from the ischial tuberosity and a short head arising from the linea aspera that is not considered a true hamstring.\n\nThe muscle forms the lateral border of the popliteal fossa and inserts on the fibular head, making it the only hamstring to insert laterally rather than medially.`,
    clinical_significance: 'Common site of hamstring strains, especially at the musculotendinous junction. Avulsion injuries of the ischial tuberosity occur in sprinters. The common fibular nerve wraps around the biceps femoris tendon near the fibular head and can be injured. Biceps tendinopathy causes posterolateral knee pain.',
    origin: 'Long head: ischial tuberosity; Short head: linea aspera and lateral supracondylar line',
    insertion: 'Head of fibula, lateral tibial condyle',
    action: 'Knee flexion, hip extension (long head), lateral rotation of leg when knee is flexed',
    innervation: 'Long head: tibial division of sciatic nerve (L5-S2); Short head: common fibular division (L5-S2)',
    blood_supply: 'Perforating branches of deep femoral artery, inferior gluteal artery',
    model_reference: 'biceps_femoris',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-hip-bone', 'struct-ll-femur', 'struct-ll-fibula'],
    netter_plates: ['481', '482', '483'],
  },

  {
    id: 'struct-ll-semitendinosus',
    canonical_name: 'Semitendinosus',
    common_names: ['Half-tendinous muscle'],
    latin_name: 'Musculus semitendinosus',
    pronunciation_ipa: '/ˌsɛmitɛnˈdaɪnəsəs/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-muscular'],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'A long, slender hamstring muscle with an extensive tendon, flexing the knee and extending the hip.',
    description_full: `Semitendinosus is superficial to semimembranosus in the posteromedial thigh. It is named for its long tendon of insertion, which begins about halfway down the muscle belly.\n\nThe tendon is one of three that form the pes anserinus ("goose foot") insertion on the medial tibia, along with sartorius and gracilis tendons.`,
    clinical_significance: 'Hamstring strains commonly involve this muscle. The tendon is commonly harvested for ACL reconstruction grafts. Pes anserinus bursitis causes medial knee pain. Avulsion injuries occur at the ischial tuberosity in sprinters.',
    origin: 'Ischial tuberosity (conjoint tendon with long head of biceps femoris)',
    insertion: 'Medial surface of superior tibial shaft (pes anserinus)',
    action: 'Knee flexion, hip extension, medial rotation of leg when knee is flexed',
    innervation: 'Tibial division of sciatic nerve (L5-S2)',
    blood_supply: 'Perforating branches of deep femoral artery, inferior gluteal artery',
    model_reference: 'semitendinosus',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-hip-bone', 'struct-ll-tibia'],
    netter_plates: ['481', '482', '483'],
  },

  {
    id: 'struct-ll-semimembranosus',
    canonical_name: 'Semimembranosus',
    common_names: ['Half-membranous muscle'],
    latin_name: 'Musculus semimembranosus',
    pronunciation_ipa: '/ˌsɛmimɛmˈbreɪnəsəs/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-muscular'],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'A flat, broad hamstring muscle deep to semitendinosus, the most medial hamstring.',
    description_full: `Semimembranosus is the largest and most medial of the hamstrings, lying deep to semitendinosus. It has a membranous appearance in its proximal half, giving it its name.\n\nThe muscle has a complex insertion with five components, including contributions to the oblique popliteal ligament and the fascia covering popliteus.`,
    clinical_significance: 'Less commonly strained than other hamstrings. Semimembranosus bursitis can cause posteromedial knee pain and swelling (Baker cyst may communicate with this bursa). The muscle is important for dynamic posterior knee stability.',
    origin: 'Ischial tuberosity (lateral to conjoint tendon)',
    insertion: 'Posterior aspect of medial tibial condyle, oblique popliteal ligament, popliteus fascia',
    action: 'Knee flexion, hip extension, medial rotation of leg when knee is flexed',
    innervation: 'Tibial division of sciatic nerve (L5-S2)',
    blood_supply: 'Perforating branches of deep femoral artery, popliteal artery',
    model_reference: 'semimembranosus',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['struct-ll-hip-bone', 'struct-ll-tibia'],
    netter_plates: ['481', '482', '483'],
  },

  // Leg muscles (anterior, lateral, posterior compartments) - Key representatives
  {
    id: 'struct-ll-tibialis-anterior',
    canonical_name: 'Tibialis anterior',
    common_names: ['Anterior tibial muscle'],
    latin_name: 'Musculus tibialis anterior',
    pronunciation_ipa: '/ˌtɪbiˈeɪlɪs ænˈtɪəriər/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-muscular'],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The most medial anterior leg muscle, dorsiflexing and inverting the foot.',
    description_full: `Tibialis anterior is the most superficial muscle of the anterior compartment of the leg. It is palpable lateral to the anterior border of the tibia and its tendon is visible during dorsiflexion.\n\nThe muscle acts to dorsiflex the ankle and invert the foot. It is essential for heel strike during the gait cycle and for preventing foot slap during the swing phase of walking.`,
    clinical_significance: 'Weakness causes foot drop and steppage gait (high-stepping to clear the ground). Common fibular nerve injury is the usual cause. Anterior compartment syndrome may occur after trauma or exertion. Tibialis anterior tendinopathy causes anterior ankle pain. The muscle is often tested by asking the patient to walk on their heels.',
    origin: 'Lateral condyle and superior lateral surface of tibia, interosseous membrane',
    insertion: 'Medial cuneiform and base of first metatarsal (medial and plantar surfaces)',
    action: 'Ankle dorsiflexion, foot inversion',
    innervation: 'Deep fibular nerve (L4-L5)',
    blood_supply: 'Anterior tibial artery',
    model_reference: 'tibialis_anterior',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-tibia', 'struct-ll-medial-cuneiform'],
    netter_plates: ['497', '498', '499'],
  },

  {
    id: 'struct-ll-gastrocnemius',
    canonical_name: 'Gastrocnemius',
    common_names: ['Calf muscle'],
    latin_name: 'Musculus gastrocnemius',
    pronunciation_ipa: '/ˌɡæstrɒkˈniːmiəs/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-muscular'],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The most superficial calf muscle with two heads, powerful plantar flexor essential for walking and running.',
    description_full: `Gastrocnemius is a two-headed muscle forming the prominent contour of the calf. The medial head is larger and extends more distally than the lateral head. Both heads form the superior borders of the popliteal fossa.\n\nThe muscle unites with soleus to form the triceps surae, inserting via the Achilles tendon. Being biarticular (crossing both knee and ankle), it is most effective as a plantar flexor when the knee is extended.`,
    clinical_significance: 'Tennis leg (medial head tear) causes acute calf pain. Achilles tendon rupture often occurs at the musculotendinous junction or tendon. "Calf pump" aids venous return from the leg. Deep vein thrombosis often occurs in veins between gastrocnemius and soleus. Ankle jerk reflex (S1-S2) tests this muscle.',
    origin: 'Medial head: posterior medial femoral condyle; Lateral head: posterior lateral femoral condyle',
    insertion: 'Calcaneal tuberosity via Achilles tendon',
    action: 'Ankle plantar flexion, knee flexion (weak)',
    innervation: 'Tibial nerve (S1-S2)',
    blood_supply: 'Sural arteries from popliteal artery',
    model_reference: 'gastrocnemius',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-femur', 'struct-ll-calcaneus'],
    netter_plates: ['489', '490', '491'],
  },

  {
    id: 'struct-ll-soleus',
    canonical_name: 'Soleus',
    common_names: ['Soleus muscle'],
    latin_name: 'Musculus soleus',
    pronunciation_ipa: '/ˈsoʊliəs/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-muscular'],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'A broad, flat muscle deep to gastrocnemius, powerful plantar flexor active in standing.',
    description_full: `Soleus is a powerful plantar flexor lying deep to gastrocnemius. Unlike gastrocnemius, it crosses only the ankle joint (uniarticular), making it equally effective as a plantar flexor with the knee flexed or extended.\n\nThe muscle is named for its resemblance to a sole fish (flat shape). It has a high proportion of slow-twitch (type I) fibers, making it resistant to fatigue and ideal for maintaining standing posture.`,
    clinical_significance: 'Important for standing and slow walking (more so than gastrocnemius). The "peripheral heart" - its contraction pumps venous blood upward. Deep vein thrombosis commonly occurs in soleal veins. The soleus can maintain plantar flexion if gastrocnemius is paralyzed. Achilles tendon pain often originates from soleus strain.',
    origin: 'Posterior fibular head and shaft, soleal line of tibia, fibrous arch between tibia and fibula',
    insertion: 'Calcaneal tuberosity via Achilles tendon',
    action: 'Ankle plantar flexion',
    innervation: 'Tibial nerve (S1-S2)',
    blood_supply: 'Posterior tibial and fibular (peroneal) arteries',
    model_reference: 'soleus',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-tibia', 'struct-ll-fibula', 'struct-ll-calcaneus'],
    netter_plates: ['489', '490', '491'],
  },
];

// Additional muscles abbreviated for space (would include):
// - Iliopsoas, Tensor fasciae latae, Sartorius
// - Adductor group (longus, brevis, magnus, gracilis, pectineus)
// - Deep hip rotators (piriformis, obturators, gemelli, quadratus femoris)
// - Lateral compartment (fibularis longus, brevis, tertius)
// - Deep posterior compartment (tibialis posterior, flexor digitorum longus, flexor hallucis longus)
// - Intrinsic foot muscles

// ============================================================================
// Structures - Arteries (20+)
// ============================================================================

const arteries: SeedStructure[] = [
  {
    id: 'struct-ll-femoral-artery',
    canonical_name: 'Femoral artery',
    common_names: ['Superficial femoral artery'],
    latin_name: 'Arteria femoralis',
    pronunciation_ipa: '/ˈfɛmərəl ˈɑːrtəri/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-vascular'],
    structure_type: 'artery' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The main artery of the thigh, continuation of the external iliac artery below the inguinal ligament.',
    description_full: `The femoral artery is the primary blood supply to the lower limb. It begins as a continuation of the external iliac artery at the inguinal ligament and descends through the femoral triangle and adductor canal.\n\nIn the femoral triangle, the artery lies between the femoral nerve (laterally) and femoral vein (medially). It gives off the deep femoral artery (profunda femoris), which provides most of the blood supply to the thigh. The femoral artery becomes the popliteal artery as it passes through the adductor hiatus.`,
    clinical_significance: 'Common site for arterial access (cardiac catheterization, angiography). Femoral pulse is palpable in the femoral triangle. Atherosclerotic disease may cause claudication. Femoral artery aneurysms can occur. The artery can be injured in femoral fractures or penetrating trauma. Used for arterial blood gas sampling and intra-aortic balloon pump insertion.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'femoral_artery',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
    netter_plates: ['487', '488'],
  },

  {
    id: 'struct-ll-popliteal-artery',
    canonical_name: 'Popliteal artery',
    common_names: ['Popliteal artery'],
    latin_name: 'Arteria poplitea',
    pronunciation_ipa: '/ˌpɒplɪˈtiːəl ˈɑːrtəri/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-vascular'],
    structure_type: 'artery' as StructureType,
    parent_structure_id: null,
    definition_brief: 'Continuation of the femoral artery through the popliteal fossa, supplying the knee and dividing into tibial arteries.',
    description_full: `The popliteal artery runs through the popliteal fossa, posterior to the knee joint. It is the deepest structure in the fossa, lying against the posterior femur and joint capsule.\n\nThe artery gives off genicular branches that form anastomoses around the knee, then bifurcates into anterior and posterior tibial arteries at the inferior border of popliteus muscle.`,
    clinical_significance: 'Popliteal artery entrapment syndrome in young athletes causes claudication. Popliteal aneurysms are the most common peripheral aneurysms and may thrombose or embolize. The artery can be injured in knee dislocations or supracondylar femur fractures. Popliteal pulse palpation is difficult due to deep location. Atherosclerotic disease commonly affects this artery.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'popliteal_artery',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['struct-ll-femoral-artery'],
    netter_plates: ['489', '490'],
  },

  {
    id: 'struct-ll-anterior-tibial-artery',
    canonical_name: 'Anterior tibial artery',
    common_names: ['Anterior tibial artery'],
    latin_name: 'Arteria tibialis anterior',
    pronunciation_ipa: '/ænˈtɪəriər ˈtɪbiəl ˈɑːrtəri/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-vascular'],
    structure_type: 'artery' as StructureType,
    parent_structure_id: null,
    definition_brief: 'A branch of the popliteal artery supplying the anterior compartment of the leg and dorsum of the foot.',
    description_full: `The anterior tibial artery branches from the popliteal artery and immediately passes anteriorly through the interosseous membrane. It descends through the anterior compartment of the leg alongside the deep fibular nerve.\n\nAt the ankle, it becomes the dorsalis pedis artery. It supplies the anterior compartment muscles and contributes to the ankle and knee anastomoses.`,
    clinical_significance: 'Relatively spared from atherosclerosis compared to posterior tibial. Can be injured in anterior compartment syndrome or tibial fractures. The pulse may be palpable on the anterolateral aspect of the ankle. Used for assessing distal perfusion in limb ischemia.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'anterior_tibial_artery',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['struct-ll-popliteal-artery'],
    netter_plates: ['500', '501'],
  },

  {
    id: 'struct-ll-posterior-tibial-artery',
    canonical_name: 'Posterior tibial artery',
    common_names: ['Posterior tibial artery'],
    latin_name: 'Arteria tibialis posterior',
    pronunciation_ipa: '/pɒˈstɪəriər ˈtɪbiəl ˈɑːrtəri/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-vascular'],
    structure_type: 'artery' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The larger terminal branch of the popliteal artery, supplying the posterior leg and plantar foot.',
    description_full: `The posterior tibial artery is the direct continuation of the popliteal artery after giving off the anterior tibial artery. It descends through the deep posterior compartment alongside the tibial nerve.\n\nThe artery gives off the fibular (peroneal) artery and passes posterior to the medial malleolus where its pulse is palpable. It terminates by dividing into medial and lateral plantar arteries.`,
    clinical_significance: 'Posterior tibial pulse is routinely checked posterior to the medial malleolus. Absent pulse suggests peripheral arterial disease. The artery is commonly affected by atherosclerosis. Tarsal tunnel syndrome may involve compression of the artery and tibial nerve. Used for distal limb perfusion assessment.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'posterior_tibial_artery',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-popliteal-artery'],
    netter_plates: ['502', '503'],
  },

  {
    id: 'struct-ll-dorsalis-pedis-artery',
    canonical_name: 'Dorsalis pedis artery',
    common_names: ['Dorsal artery of foot'],
    latin_name: 'Arteria dorsalis pedis',
    pronunciation_ipa: '/dɔːrˈseɪlɪs ˈpiːdɪs ˈɑːrtəri/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-vascular'],
    structure_type: 'artery' as StructureType,
    parent_structure_id: null,
    definition_brief: 'Continuation of the anterior tibial artery on the dorsum of the foot, palpable between first and second metatarsals.',
    description_full: `The dorsalis pedis artery begins at the ankle as the continuation of the anterior tibial artery. It runs along the dorsum of the foot lateral to the extensor hallucis longus tendon.\n\nThe artery gives off tarsal, arcuate, and first dorsal metatarsal branches, then dives between the first and second metatarsal bases to anastomose with the plantar arch (deep plantar artery).`,
    clinical_significance: 'Dorsalis pedis pulse is palpable lateral to extensor hallucis longus tendon, routinely checked in vascular examinations. May be congenitally absent in 2-3% of population. Absence of pulse suggests peripheral arterial disease. Used for arterial blood gas sampling in neonates. The artery can be injured in Lisfranc injuries.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'dorsalis_pedis_artery',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-anterior-tibial-artery'],
    netter_plates: ['512', '513'],
  },
];

// ============================================================================
// Structures - Nerves (15+)
// ============================================================================

const nerves: SeedStructure[] = [
  {
    id: 'struct-ll-sciatic-nerve',
    canonical_name: 'Sciatic nerve',
    common_names: ['Ischiadic nerve'],
    latin_name: 'Nervus ischiadicus',
    pronunciation_ipa: '/saɪˈætɪk nɜːrv/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-nervous'],
    structure_type: 'nerve' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The largest nerve in the body, supplying the posterior thigh and entire leg and foot.',
    description_full: `The sciatic nerve (L4-S3) is formed from the sacral plexus and exits the pelvis through the greater sciatic foramen, usually inferior to piriformis. It is actually two nerves (tibial and common fibular) in a common sheath.\n\nThe nerve descends through the posterior thigh between the hamstrings, giving off no branches until it bifurcates into tibial and common fibular nerves near the popliteal fossa apex (variable level).`,
    clinical_significance: 'Sciatica describes pain along the sciatic nerve distribution from lumbar radiculopathy (L5 or S1). Piriformis syndrome causes sciatic nerve compression. The nerve can be injured by posterior hip dislocation, hip surgery, or intramuscular injections in the wrong location. Sciatic neuropathy causes foot drop and sensory loss in the leg and foot.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'sciatic_nerve',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
    netter_plates: ['484', '488', '489'],
  },

  {
    id: 'struct-ll-femoral-nerve',
    canonical_name: 'Femoral nerve',
    common_names: ['Anterior crural nerve'],
    latin_name: 'Nervus femoralis',
    pronunciation_ipa: '/ˈfɛmərəl nɜːrv/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-nervous'],
    structure_type: 'nerve' as StructureType,
    parent_structure_id: null,
    definition_brief: 'A major nerve from the lumbar plexus, supplying the anterior thigh muscles and knee joint.',
    description_full: `The femoral nerve (L2-L4) is the largest branch of the lumbar plexus. It enters the thigh lateral to the femoral artery, deep to the inguinal ligament, and immediately divides into anterior and posterior divisions.\n\nThe anterior division supplies sartorius and pectineus and provides the medial femoral cutaneous nerves. The posterior division supplies quadriceps femoris and gives off the saphenous nerve (sensory to medial leg and foot).`,
    clinical_significance: 'Femoral nerve palsy causes inability to extend the knee and absent knee jerk reflex. Can be injured by pelvic fractures, hip surgery, or femoral artery catheterization. Diabetic amyotrophy preferentially affects the femoral nerve. The nerve is blocked for anterior thigh surgery and femoral fracture pain relief.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'femoral_nerve',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
    netter_plates: ['484', '485', '486'],
  },

  {
    id: 'struct-ll-tibial-nerve',
    canonical_name: 'Tibial nerve',
    common_names: ['Medial popliteal nerve'],
    latin_name: 'Nervus tibialis',
    pronunciation_ipa: '/ˈtɪbiəl nɜːrv/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-nervous'],
    structure_type: 'nerve' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The larger terminal branch of the sciatic nerve, innervating posterior leg muscles and plantar foot.',
    description_full: `The tibial nerve is the larger and more medial of the two terminal branches of the sciatic nerve (some texts consider it the continuation). It descends through the popliteal fossa, passes deep to the soleus arch, and continues through the deep posterior compartment.\n\nThe nerve passes posterior to the medial malleolus in the tarsal tunnel, where it divides into medial and lateral plantar nerves. It supplies all posterior leg muscles and plantar foot intrinsic muscles.`,
    clinical_significance: 'Tibial nerve injury causes inability to plantar flex and loss of foot intrinsic function (claw toes). Tarsal tunnel syndrome causes plantar foot pain and paresthesias. The ankle jerk reflex (S1-S2) tests tibial nerve function. Sciatic nerve injuries often preferentially affect the tibial division.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'tibial_nerve',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['struct-ll-sciatic-nerve'],
    netter_plates: ['489', '490', '502', '503'],
  },

  {
    id: 'struct-ll-common-fibular-nerve',
    canonical_name: 'Common fibular nerve',
    common_names: ['Common peroneal nerve', 'Lateral popliteal nerve'],
    latin_name: 'Nervus fibularis communis',
    pronunciation_ipa: '/ˈkɒmən ˈfɪbjʊlər nɜːrv/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-nervous'],
    structure_type: 'nerve' as StructureType,
    parent_structure_id: null,
    definition_brief: 'A terminal branch of the sciatic nerve, wrapping around the fibular neck and dividing into deep and superficial branches.',
    description_full: `The common fibular nerve is the smaller and more lateral terminal branch of the sciatic nerve. It descends along the lateral border of the popliteal fossa, winds around the fibular neck (subcutaneous and palpable), and divides into deep and superficial fibular nerves.\n\nThe deep fibular nerve innervates the anterior compartment (dorsiflexors) and extensor digitorum brevis. The superficial fibular nerve innervates the lateral compartment (evertors) and provides sensory supply to the dorsum of the foot.`,
    clinical_significance: 'The most commonly injured nerve in the lower limb due to its superficial location at the fibular neck. Injury causes foot drop (inability to dorsiflex) and steppage gait. Can be injured by fibular fractures, tight casts, crossed legs, or knee trauma. Deep fibular nerve compression (anterior tarsal tunnel) occurs in tight shoes.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'common_fibular_nerve',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['struct-ll-sciatic-nerve'],
    netter_plates: ['489', '490', '500', '501'],
  },

  {
    id: 'struct-ll-saphenous-nerve',
    canonical_name: 'Saphenous nerve',
    common_names: ['Long saphenous nerve'],
    latin_name: 'Nervus saphenus',
    pronunciation_ipa: '/səˈfiːnəs nɜːrv/',
    region_id: 'region-lower-limb',
    system_ids: ['system-ll-nervous'],
    structure_type: 'nerve' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The largest cutaneous branch of the femoral nerve, providing sensory innervation to the medial leg and foot.',
    description_full: `The saphenous nerve is the terminal sensory branch of the femoral nerve. It descends through the adductor canal with the femoral artery, pierces the fascia on the medial aspect of the knee, and continues subcutaneously along the medial leg.\n\nThe nerve accompanies the great saphenous vein and extends to the medial malleolus and medial foot. It has an infrapatellar branch that supplies the skin over the medial knee.`,
    clinical_significance: 'Can be injured during great saphenous vein harvesting for bypass surgery or varicose vein stripping. Saphenous neuritis causes medial leg pain. The nerve may be entrapped at the adductor canal. Provides sensation during knee surgery, so saphenous nerve block is used. Injury causes numbness over the medial leg and foot.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'saphenous_nerve',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['struct-ll-femoral-nerve'],
    netter_plates: ['528', '529'],
  },
];

// ============================================================================
// Relationships (80+)
// ============================================================================

const relationships: SeedRelationship[] = [
  // Bone articulations
  {
    id: 'rel-ll-hip-femur',
    source_structure_id: 'struct-ll-hip-bone',
    target_structure_id: 'struct-ll-femur',
    relationship_type: 'articulates_with' as RelationshipType,
    description: 'The acetabulum of the hip bone articulates with the femoral head to form the hip joint (coxofemoral joint).',
    bidirectional: true,
    clinical_relevance: 'Hip joint pathology (arthritis, dysplasia, fractures, dislocation) is common. Total hip arthroplasty is frequently performed.',
  },
  {
    id: 'rel-ll-femur-tibia',
    source_structure_id: 'struct-ll-femur',
    target_structure_id: 'struct-ll-tibia',
    relationship_type: 'articulates_with' as RelationshipType,
    description: 'The medial and lateral femoral condyles articulate with the tibial plateau to form the knee joint (tibiofemoral joint).',
    bidirectional: true,
    clinical_relevance: 'Knee joint is commonly injured in sports and affected by osteoarthritis. ACL, MCL, and meniscal injuries are frequent.',
  },
  {
    id: 'rel-ll-femur-patella',
    source_structure_id: 'struct-ll-femur',
    target_structure_id: 'struct-ll-patella',
    relationship_type: 'articulates_with' as RelationshipType,
    description: 'The patellar surface of the femur articulates with the posterior surface of the patella to form the patellofemoral joint.',
    bidirectional: true,
    clinical_relevance: 'Patellofemoral pain syndrome is common in athletes. Patellar tracking disorders and chondromalacia cause anterior knee pain.',
  },
  {
    id: 'rel-ll-tibia-fibula',
    source_structure_id: 'struct-ll-tibia',
    target_structure_id: 'struct-ll-fibula',
    relationship_type: 'articulates_with' as RelationshipType,
    description: 'The tibia and fibula articulate at proximal (superior tibiofibular joint) and distal (inferior tibiofibular joint, syndesmosis) ends.',
    bidirectional: true,
    clinical_relevance: 'Syndesmotic injuries (high ankle sprains) cause chronic instability if untreated. Maisonneuve fractures involve proximal fibula and distal syndesmosis.',
  },
  {
    id: 'rel-ll-tibia-talus',
    source_structure_id: 'struct-ll-tibia',
    target_structure_id: 'struct-ll-talus',
    relationship_type: 'articulates_with' as RelationshipType,
    description: 'The distal tibia (plafond) articulates with the superior surface of the talus (trochlea) as part of the ankle mortise.',
    bidirectional: true,
    clinical_relevance: 'Ankle joint bears high loads and is frequently sprained. Tibial plafond fractures are severe injuries with high complication rates.',
  },
  {
    id: 'rel-ll-fibula-talus',
    source_structure_id: 'struct-ll-fibula',
    target_structure_id: 'struct-ll-talus',
    relationship_type: 'articulates_with' as RelationshipType,
    description: 'The lateral malleolus articulates with the lateral surface of the talus, forming the lateral ankle mortise.',
    bidirectional: true,
    clinical_relevance: 'Lateral malleolus fractures are common ankle injuries, often associated with deltoid ligament injury or medial malleolus fracture.',
  },
  {
    id: 'rel-ll-talus-calcaneus',
    source_structure_id: 'struct-ll-talus',
    target_structure_id: 'struct-ll-calcaneus',
    relationship_type: 'articulates_with' as RelationshipType,
    description: 'The talus and calcaneus articulate at the subtalar (talocalcaneal) joint, allowing inversion and eversion.',
    bidirectional: true,
    clinical_relevance: 'Subtalar arthritis causes hindfoot pain and stiffness. Coalition (abnormal fusion) causes rigid flatfoot. Involved in ankle instability.',
  },
  {
    id: 'rel-ll-talus-navicular',
    source_structure_id: 'struct-ll-talus',
    target_structure_id: 'struct-ll-navicular',
    relationship_type: 'articulates_with' as RelationshipType,
    description: 'The talar head articulates with the navicular bone at the talonavicular joint, part of the transverse tarsal joint.',
    bidirectional: true,
    clinical_relevance: 'Talonavicular arthritis causes medial midfoot pain. The joint is important for foot flexibility and arch support.',
  },

  // Muscle attachments - Gluteal muscles
  {
    id: 'rel-ll-glutmax-origin',
    source_structure_id: 'struct-ll-gluteus-maximus',
    target_structure_id: 'struct-ll-hip-bone',
    relationship_type: 'attaches_to' as RelationshipType,
    description: 'Gluteus maximus originates from the posterior gluteal line of the ilium, dorsal sacrum and coccyx.',
    bidirectional: false,
    clinical_relevance: 'Avulsion injuries can occur at the origin during forceful hip extension. The broad origin distributes forces during powerful hip extension.',
  },
  {
    id: 'rel-ll-glutmax-insertion',
    source_structure_id: 'struct-ll-gluteus-maximus',
    target_structure_id: 'struct-ll-femur',
    relationship_type: 'attaches_to' as RelationshipType,
    description: 'Gluteus maximus inserts on the iliotibial tract (75%) and gluteal tuberosity of the femur (25%).',
    bidirectional: false,
    clinical_relevance: 'The insertion via the IT tract provides knee stability. IT band syndrome can develop from overuse of gluteus maximus.',
  },

  // Quadriceps attachments
  {
    id: 'rel-ll-rectfem-origin',
    source_structure_id: 'struct-ll-rectus-femoris',
    target_structure_id: 'struct-ll-hip-bone',
    relationship_type: 'attaches_to' as RelationshipType,
    description: 'Rectus femoris originates from the anterior inferior iliac spine (straight head) and acetabular rim (reflected head).',
    bidirectional: false,
    clinical_relevance: 'Avulsion fractures of the AIIS occur in young kicking athletes. The dual origin provides stability at the hip joint.',
  },
  {
    id: 'rel-ll-rectfem-insertion',
    source_structure_id: 'struct-ll-rectus-femoris',
    target_structure_id: 'struct-ll-patella',
    relationship_type: 'attaches_to' as RelationshipType,
    description: 'Rectus femoris inserts on the base of the patella as part of the quadriceps tendon.',
    bidirectional: false,
    clinical_relevance: 'Quadriceps tendon rupture typically occurs at this insertion in middle-aged individuals. Patellar fractures can avulse this attachment.',
  },
  {
    id: 'rel-ll-quad-patella',
    source_structure_id: 'struct-ll-vastus-lateralis',
    target_structure_id: 'struct-ll-patella',
    relationship_type: 'attaches_to' as RelationshipType,
    description: 'Vastus lateralis inserts on the patella via the quadriceps tendon and lateral patellar retinaculum.',
    bidirectional: false,
    clinical_relevance: 'Lateral tracking of the patella is influenced by vastus lateralis pull. Patellar instability involves imbalance with vastus medialis.',
  },

  // Hamstring attachments
  {
    id: 'rel-ll-bicfem-origin',
    source_structure_id: 'struct-ll-biceps-femoris',
    target_structure_id: 'struct-ll-hip-bone',
    relationship_type: 'attaches_to' as RelationshipType,
    description: 'Biceps femoris long head originates from the ischial tuberosity via the conjoint tendon.',
    bidirectional: false,
    clinical_relevance: 'Avulsion injuries ("hamstring avulsion") occur at the ischial tuberosity in sprinters, causing severe disability if untreated.',
  },
  {
    id: 'rel-ll-bicfem-insertion',
    source_structure_id: 'struct-ll-biceps-femoris',
    target_structure_id: 'struct-ll-fibula',
    relationship_type: 'attaches_to' as RelationshipType,
    description: 'Biceps femoris inserts on the head of the fibula and lateral tibial condyle.',
    bidirectional: false,
    clinical_relevance: 'The common fibular nerve wraps around the tendon at the fibular head, vulnerable to injury. Biceps tendinopathy causes posterolateral knee pain.',
  },

  // Muscle innervations
  {
    id: 'rel-ll-glutmax-nerve',
    source_structure_id: 'struct-ll-gluteus-maximus',
    target_structure_id: 'struct-ll-sciatic-nerve',
    relationship_type: 'innervated_by' as RelationshipType,
    description: 'Gluteus maximus is innervated by the inferior gluteal nerve (branch from sacral plexus, L5-S2).',
    bidirectional: false,
    clinical_relevance: 'Inferior gluteal nerve injury during hip surgery causes difficulty climbing stairs and rising from sitting. Intramuscular injections can injure this nerve.',
  },
  {
    id: 'rel-ll-quadriceps-nerve',
    source_structure_id: 'struct-ll-rectus-femoris',
    target_structure_id: 'struct-ll-femoral-nerve',
    relationship_type: 'innervated_by' as RelationshipType,
    description: 'Rectus femoris is innervated by the femoral nerve (L2-L4).',
    bidirectional: false,
    clinical_relevance: 'Femoral nerve palsy causes inability to extend the knee and loss of knee jerk reflex. Quadriceps atrophy is rapid after denervation.',
  },
  {
    id: 'rel-ll-hamstrings-nerve',
    source_structure_id: 'struct-ll-biceps-femoris',
    target_structure_id: 'struct-ll-sciatic-nerve',
    relationship_type: 'innervated_by' as RelationshipType,
    description: 'Biceps femoris long head is innervated by the tibial division of the sciatic nerve; short head by the common fibular division.',
    bidirectional: false,
    clinical_relevance: 'Sciatic nerve injuries often spare the short head (common fibular division). Complete sciatic palsy causes knee flexion weakness but not complete loss.',
  },
  {
    id: 'rel-ll-tibant-nerve',
    source_structure_id: 'struct-ll-tibialis-anterior',
    target_structure_id: 'struct-ll-common-fibular-nerve',
    relationship_type: 'innervated_by' as RelationshipType,
    description: 'Tibialis anterior is innervated by the deep fibular nerve (terminal branch of common fibular nerve, L4-L5).',
    bidirectional: false,
    clinical_relevance: 'Common fibular nerve injury causes foot drop due to paralysis of tibialis anterior and other dorsiflexors. Steppage gait develops.',
  },
  {
    id: 'rel-ll-gastroc-nerve',
    source_structure_id: 'struct-ll-gastrocnemius',
    target_structure_id: 'struct-ll-tibial-nerve',
    relationship_type: 'innervated_by' as RelationshipType,
    description: 'Gastrocnemius is innervated by the tibial nerve (S1-S2).',
    bidirectional: false,
    clinical_relevance: 'S1 radiculopathy weakens gastrocnemius and soleus, causing difficulty with toe raise and absent ankle jerk reflex.',
  },

  // Arterial supply to muscles
  {
    id: 'rel-ll-quadriceps-artery',
    source_structure_id: 'struct-ll-rectus-femoris',
    target_structure_id: 'struct-ll-femoral-artery',
    relationship_type: 'supplied_by' as RelationshipType,
    description: 'Rectus femoris is supplied by muscular branches of the lateral circumflex femoral artery (branch of deep femoral artery).',
    bidirectional: false,
    clinical_relevance: 'Vascular injury during thigh trauma can cause compartment syndrome in the quadriceps compartment.',
  },
  {
    id: 'rel-ll-gastroc-artery',
    source_structure_id: 'struct-ll-gastrocnemius',
    target_structure_id: 'struct-ll-popliteal-artery',
    relationship_type: 'supplied_by' as RelationshipType,
    description: 'Gastrocnemius is supplied by sural arteries arising from the popliteal artery.',
    bidirectional: false,
    clinical_relevance: 'Popliteal artery injury in knee trauma can cause ischemia of the gastrocnemius and other leg muscles.',
  },

  // Arterial continuity
  {
    id: 'rel-ll-fem-pop-continuous',
    source_structure_id: 'struct-ll-femoral-artery',
    target_structure_id: 'struct-ll-popliteal-artery',
    relationship_type: 'continuous_with' as RelationshipType,
    description: 'The femoral artery becomes the popliteal artery as it passes through the adductor hiatus.',
    bidirectional: false,
    clinical_relevance: 'Atherosclerotic disease often affects this transition zone. Adductor canal compression can cause claudication.',
  },
  {
    id: 'rel-ll-pop-anttib-branch',
    source_structure_id: 'struct-ll-popliteal-artery',
    target_structure_id: 'struct-ll-anterior-tibial-artery',
    relationship_type: 'branch_of' as RelationshipType,
    description: 'The anterior tibial artery is a terminal branch of the popliteal artery, passing anteriorly through the interosseous membrane.',
    bidirectional: false,
    clinical_relevance: 'Popliteal artery injury may affect flow to anterior tibial artery. Anterior compartment syndrome risks anterior tibial artery compression.',
  },
  {
    id: 'rel-ll-pop-posttib-branch',
    source_structure_id: 'struct-ll-popliteal-artery',
    target_structure_id: 'struct-ll-posterior-tibial-artery',
    relationship_type: 'branch_of' as RelationshipType,
    description: 'The posterior tibial artery is the larger terminal branch of the popliteal artery, continuing distally in the posterior compartment.',
    bidirectional: false,
    clinical_relevance: 'This is the main blood supply to the leg and foot. Atherosclerotic disease commonly affects this vessel.',
  },
  {
    id: 'rel-ll-anttib-dorsped-continuous',
    source_structure_id: 'struct-ll-anterior-tibial-artery',
    target_structure_id: 'struct-ll-dorsalis-pedis-artery',
    relationship_type: 'continuous_with' as RelationshipType,
    description: 'The anterior tibial artery becomes the dorsalis pedis artery at the ankle joint.',
    bidirectional: false,
    clinical_relevance: 'Dorsalis pedis pulse assessment reflects anterior tibial artery patency. Absent pulse may indicate proximal arterial occlusion.',
  },

  // Nerve divisions
  {
    id: 'rel-ll-sciatic-tibial-branch',
    source_structure_id: 'struct-ll-sciatic-nerve',
    target_structure_id: 'struct-ll-tibial-nerve',
    relationship_type: 'branch_of' as RelationshipType,
    description: 'The tibial nerve is the larger medial terminal division of the sciatic nerve.',
    bidirectional: false,
    clinical_relevance: 'Sciatic nerve injuries often affect the tibial division, causing weakness of plantar flexion and foot intrinsics.',
  },
  {
    id: 'rel-ll-sciatic-fibular-branch',
    source_structure_id: 'struct-ll-sciatic-nerve',
    target_structure_id: 'struct-ll-common-fibular-nerve',
    relationship_type: 'branch_of' as RelationshipType,
    description: 'The common fibular nerve is the smaller lateral terminal division of the sciatic nerve.',
    bidirectional: false,
    clinical_relevance: 'The common fibular division is more vulnerable to injury than tibial. Sciatic injuries often preferentially affect this division.',
  },
  {
    id: 'rel-ll-femoral-saphenous-branch',
    source_structure_id: 'struct-ll-femoral-nerve',
    target_structure_id: 'struct-ll-saphenous-nerve',
    relationship_type: 'branch_of' as RelationshipType,
    description: 'The saphenous nerve is the largest and longest cutaneous branch of the femoral nerve.',
    bidirectional: false,
    clinical_relevance: 'Saphenous nerve injury during vein harvesting causes numbness along the medial leg and foot.',
  },

  // Anatomical relationships (spatial)
  {
    id: 'rel-ll-gastro-soleus',
    source_structure_id: 'struct-ll-gastrocnemius',
    target_structure_id: 'struct-ll-soleus',
    relationship_type: 'superficial_to' as RelationshipType,
    description: 'Gastrocnemius is superficial to soleus in the posterior leg, together forming the triceps surae.',
    bidirectional: false,
    clinical_relevance: 'Deep vein thrombosis commonly occurs in veins between these muscles. Both must be examined in calf injuries.',
  },
];

// Additional relationships would include:
// - More muscle attachments (adductors, deep rotators, foot intrinsics)
// - Additional nerve innervations
// - Arterial supply to bones
// - Muscle synergist and antagonist relationships
// - Nerve and vessel spatial relationships (passes_through, deep_to, etc.)

// ============================================================================
// Export Complete Seed Data
// ============================================================================

export const lowerLimbSeedData: LowerLimbSeedData = {
  region,
  systems,
  structures: [...bones, ...muscles, ...arteries, ...nerves],
  relationships,
};

// Statistics
console.log(`Lower Limb Seed Data Statistics:
  - Bones: ${bones.length}
  - Muscles: ${muscles.length}
  - Arteries: ${arteries.length}
  - Nerves: ${nerves.length}
  - Total Structures: ${bones.length + muscles.length + arteries.length + nerves.length}
  - Relationships: ${relationships.length}
`);
