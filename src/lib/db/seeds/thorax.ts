/**
 * Thorax Region Seed Data
 * Comprehensive anatomical data for the thoracic region
 * Based on Netter's Atlas of Human Anatomy, Plates 178-241
 */

import type {
  UUID,
  Structure,
  Relationship,
  StructureType,
  RelationshipType,
} from '@/types';

// ============================================================================
// Seed Data Interface
// ============================================================================

export interface ThoraxSeedData {
  region: {
    id: UUID;
    name: string;
    slug: string;
    description: string;
    atlas_plate_range: string;
    sort_order: number;
    thumbnail_url: string;
    color_code: string;
  };
  systems: Array<{
    id: UUID;
    name: string;
    slug: string;
    description: string;
    color_code: string;
    sort_order: number;
  }>;
  structures: Omit<Structure, 'created_at' | 'updated_at'>[];
  relationships: Omit<Relationship, 'id'>[];
}

// ============================================================================
// Region Definition
// ============================================================================

const THORAX_REGION_ID = 'thorax-region-001';

const region = {
  id: THORAX_REGION_ID,
  name: 'Thorax',
  slug: 'thorax',
  description: 'Chest wall, lungs, heart, and mediastinum',
  atlas_plate_range: '178-241',
  sort_order: 3,
  thumbnail_url: '/assets/regions/thorax.png',
  color_code: '#DC2626', // Red for cardiac emphasis
};

// ============================================================================
// Body Systems
// ============================================================================

const SKELETAL_SYSTEM_ID = 'system-skeletal-001';
const MUSCULAR_SYSTEM_ID = 'system-muscular-001';
const CARDIOVASCULAR_SYSTEM_ID = 'system-cardiovascular-001';
const RESPIRATORY_SYSTEM_ID = 'system-respiratory-001';
const NERVOUS_SYSTEM_ID = 'system-nervous-001';

const systems = [
  {
    id: SKELETAL_SYSTEM_ID,
    name: 'Skeletal System',
    slug: 'skeletal',
    description: 'Bones, joints, and cartilage',
    color_code: '#F5F0E6',
    sort_order: 1,
  },
  {
    id: MUSCULAR_SYSTEM_ID,
    name: 'Muscular System',
    slug: 'muscular',
    description: 'Skeletal muscles and tendons',
    color_code: '#C45C5C',
    sort_order: 2,
  },
  {
    id: CARDIOVASCULAR_SYSTEM_ID,
    name: 'Cardiovascular System',
    slug: 'cardiovascular',
    description: 'Heart, arteries, and veins',
    color_code: '#D64545',
    sort_order: 4,
  },
  {
    id: RESPIRATORY_SYSTEM_ID,
    name: 'Respiratory System',
    slug: 'respiratory',
    description: 'Airways and lungs',
    color_code: '#87CEEB',
    sort_order: 6,
  },
  {
    id: NERVOUS_SYSTEM_ID,
    name: 'Nervous System',
    slug: 'nervous',
    description: 'Brain, spinal cord, and peripheral nerves',
    color_code: '#E6C744',
    sort_order: 3,
  },
];

// ============================================================================
// Anatomical Structures
// ============================================================================

const structures: Omit<Structure, 'created_at' | 'updated_at'>[] = [
  // ==========================================================================
  // SKELETAL STRUCTURES (Bones)
  // ==========================================================================
  {
    id: 'thorax-bone-sternum',
    canonical_name: 'Sternum',
    common_names: ['Breastbone'],
    latin_name: 'Os sternum',
    pronunciation_ipa: '/ˈstɜːrnəm/',
    region_id: THORAX_REGION_ID,
    system_ids: [SKELETAL_SYSTEM_ID],
    structure_type: 'bone' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The flat bone forming the anterior midline of the thoracic cage.',
    description_full: `The sternum is a dagger-shaped flat bone located in the anterior midline of the thorax. It consists of three parts: the manubrium (superior), body (middle), and xiphoid process (inferior).

The manubrium articulates with the clavicles laterally and the first two costal cartilages. The sternal angle (of Louis) marks the junction between manubrium and body, an important clinical landmark at the level of T4-T5 and the second costal cartilage.

The body articulates with costal cartilages 2-7. The xiphoid process is the smallest and most variable portion, often remaining cartilaginous into adulthood.`,
    clinical_significance: `The sternum is a common site for bone marrow biopsy. The sternal angle is a key landmark for counting ribs and marking the level of the carina, aortic arch, and T4-T5 intervertebral disc. Sternal fractures typically result from blunt thoracic trauma (steering wheel injuries) and may indicate cardiac contusion.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Internal thoracic artery branches',
    model_reference: 'sternum',
    image_references: [
      {
        id: 'img-sternum-001',
        url: '/assets/images/netter/plate-180.jpg',
        caption: 'Anterior view of sternum and ribs',
        source: "Netter's Atlas 8th Ed",
        license: 'Educational use',
        plateNumber: '180',
      },
    ],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },
  {
    id: 'thorax-bone-rib-1',
    canonical_name: 'First Rib',
    common_names: ['Rib 1', 'First thoracic rib'],
    latin_name: 'Costa prima',
    pronunciation_ipa: '/ˈkɒstə ˈpraɪmə/',
    region_id: THORAX_REGION_ID,
    system_ids: [SKELETAL_SYSTEM_ID],
    structure_type: 'bone' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The most superior and atypical rib, shorter and broader than other ribs.',
    description_full: `The first rib is the shortest, flattest, and most curved of all ribs. Unlike typical ribs, it has superior and inferior surfaces rather than external and internal surfaces.

Key features include the scalene tubercle (for anterior scalene attachment), grooves for the subclavian artery and vein, and articulation with T1 vertebra posteriorly and the manubrium anteriorly via its costal cartilage.`,
    clinical_significance: 'First rib fractures usually indicate severe thoracic trauma. Cervical ribs (anatomical variants) may compress the brachial plexus or subclavian vessels, causing thoracic outlet syndrome.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Supreme intercostal artery',
    model_reference: 'rib_01',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },
  {
    id: 'thorax-bone-rib-typical',
    canonical_name: 'Typical Rib',
    common_names: ['Ribs 3-9', 'True ribs'],
    latin_name: 'Costa typica',
    pronunciation_ipa: '/ˈkɒstə ˈtɪpɪkə/',
    region_id: THORAX_REGION_ID,
    system_ids: [SKELETAL_SYSTEM_ID],
    structure_type: 'bone' as StructureType,
    parent_structure_id: null,
    definition_brief: 'Ribs 3-9 demonstrating characteristic rib anatomy with head, neck, tubercle, and shaft.',
    description_full: `Typical ribs (3-9) have standard anatomical features including:
- Head: articulates with vertebral bodies (two facets for adjacent vertebrae)
- Neck: connects head to tubercle
- Tubercle: articulates with transverse process
- Shaft/Body: curved with costal groove on inferior border
- Angle: point of maximum curvature

The costal groove contains the intercostal neurovascular bundle (vein, artery, nerve from superior to inferior - "VAN").`,
    clinical_significance: 'Rib fractures are common injuries. The neurovascular bundle in the costal groove is at risk during thoracentesis - needle insertion above the rib avoids injury. Flail chest occurs with multiple adjacent rib fractures.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Posterior and anterior intercostal arteries',
    model_reference: 'rib_typical',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },
  {
    id: 'thorax-vertebra-t1',
    canonical_name: 'First Thoracic Vertebra',
    common_names: ['T1', 'First dorsal vertebra'],
    latin_name: 'Vertebra thoracica I',
    pronunciation_ipa: '/ˈvɜːrtɪbrə θəˈræsɪkə/',
    region_id: THORAX_REGION_ID,
    system_ids: [SKELETAL_SYSTEM_ID],
    structure_type: 'bone' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The first thoracic vertebra, transitional between cervical and thoracic regions.',
    description_full: `T1 is the most superior thoracic vertebra, showing transitional features between cervical and thoracic vertebrae. It has a prominent spinous process similar to C7 but possesses rib facets characteristic of thoracic vertebrae.

Features include superior costal facets (full facet for first rib), inferior demifacets (for second rib), transverse costal facets, and a vertebral foramen similar to cervical vertebrae.`,
    clinical_significance: 'T1 level marks the superior thoracic aperture. Compression fractures at this level may affect the brachial plexus. The T1 dermatome includes the medial forearm.',
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'Segmental arteries from thoracic aorta',
    model_reference: 'vertebra_t01',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },

  // ==========================================================================
  // CARDIOVASCULAR STRUCTURES - HEART
  // ==========================================================================
  {
    id: 'thorax-heart-right-atrium',
    canonical_name: 'Right Atrium',
    common_names: ['Right atrial chamber'],
    latin_name: 'Atrium dextrum',
    pronunciation_ipa: '/ˈeɪtriəm ˈdɛkstrəm/',
    region_id: THORAX_REGION_ID,
    system_ids: [CARDIOVASCULAR_SYSTEM_ID],
    structure_type: 'organ' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The right upper chamber of the heart receiving deoxygenated blood from systemic circulation.',
    description_full: `The right atrium forms the right border of the heart and receives deoxygenated blood from three sources: superior vena cava, inferior vena cava, and coronary sinus.

Internal features include:
- Pectinate muscles in the right auricle
- Smooth-walled sinus venarum posteriorly
- Crista terminalis (ridge separating rough and smooth portions)
- Fossa ovalis (remnant of foramen ovale)
- Tricuspid valve orifice leading to right ventricle

The SA node is located in the superior posterolateral wall near the SVC opening.`,
    clinical_significance: `Atrial septal defects (ASD) most commonly occur at the fossa ovalis. Right atrial enlargement occurs with tricuspid regurgitation, pulmonary hypertension, or right ventricular failure. Patent foramen ovale may allow paradoxical embolism.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: 'Autonomic innervation via cardiac plexus',
    blood_supply: 'Right coronary artery',
    model_reference: 'heart_right_atrium',
    image_references: [
      {
        id: 'img-heart-ra-001',
        url: '/assets/images/netter/plate-211.jpg',
        caption: 'Right atrium opened to show internal features',
        source: "Netter's Atlas 8th Ed",
        license: 'Educational use',
        plateNumber: '211',
      },
    ],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },
  {
    id: 'thorax-heart-right-ventricle',
    canonical_name: 'Right Ventricle',
    common_names: ['RV'],
    latin_name: 'Ventriculus dexter',
    pronunciation_ipa: '/vɛnˈtrɪkjələs ˈdɛkstər/',
    region_id: THORAX_REGION_ID,
    system_ids: [CARDIOVASCULAR_SYSTEM_ID],
    structure_type: 'organ' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The right lower chamber pumping deoxygenated blood to the pulmonary circulation.',
    description_full: `The right ventricle forms most of the anterior (sternocostal) surface of the heart. It has a crescent-shaped cross-section and a thinner wall (~3-5mm) compared to the left ventricle.

Internal features include:
- Trabeculae carneae (muscular ridges)
- Papillary muscles (anterior, posterior, septal)
- Chordae tendineae attaching to tricuspid valve
- Moderator band (septomarginal trabecula) conducting right bundle branch
- Conus arteriosus (smooth-walled outflow tract)
- Pulmonary valve at apex of outflow tract`,
    clinical_significance: `Right ventricular hypertrophy occurs with pulmonary stenosis or pulmonary hypertension. Right ventricular infarction may complicate inferior MI. The moderator band is important for conduction and visible on echocardiography.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: 'Autonomic innervation via cardiac plexus',
    blood_supply: 'Right coronary artery, anterior interventricular branch of left coronary',
    model_reference: 'heart_right_ventricle',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['thorax-heart-right-atrium'],
  },
  {
    id: 'thorax-heart-left-atrium',
    canonical_name: 'Left Atrium',
    common_names: ['LA'],
    latin_name: 'Atrium sinistrum',
    pronunciation_ipa: '/ˈeɪtriəm sɪˈnɪstrəm/',
    region_id: THORAX_REGION_ID,
    system_ids: [CARDIOVASCULAR_SYSTEM_ID],
    structure_type: 'organ' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The left upper chamber receiving oxygenated blood from the pulmonary veins.',
    description_full: `The left atrium forms most of the base (posterior surface) of the heart. It receives oxygenated blood from four pulmonary veins (two from each lung).

Internal features include:
- Four pulmonary vein orifices (posteriorly)
- Smooth-walled chamber (mostly derived from primitive pulmonary vein)
- Small left auricle with pectinate muscles
- Mitral valve orifice leading to left ventricle
- Interatrial septum with fossa ovalis on right side

The left atrium has the thinnest wall of all cardiac chambers.`,
    clinical_significance: `Left atrial enlargement occurs with mitral stenosis or regurgitation and is associated with atrial fibrillation. Atrial fibrillation increases stroke risk due to thrombus formation in the left atrial appendage. Pulmonary vein isolation is used to treat atrial fibrillation.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: 'Autonomic innervation via cardiac plexus',
    blood_supply: 'Left coronary artery branches, right coronary artery',
    model_reference: 'heart_left_atrium',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },
  {
    id: 'thorax-heart-left-ventricle',
    canonical_name: 'Left Ventricle',
    common_names: ['LV'],
    latin_name: 'Ventriculus sinister',
    pronunciation_ipa: '/vɛnˈtrɪkjələs sɪˈnɪstər/',
    region_id: THORAX_REGION_ID,
    system_ids: [CARDIOVASCULAR_SYSTEM_ID],
    structure_type: 'organ' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The left lower chamber pumping oxygenated blood to systemic circulation.',
    description_full: `The left ventricle has the thickest myocardial wall (8-12mm) to generate systemic blood pressure. It forms the apex and most of the left border of the heart.

Internal features include:
- Circular cross-section
- Trabeculae carneae
- Two papillary muscles (anterior and posterior)
- Mitral valve (between LA and LV)
- Aortic vestibule (smooth-walled outflow tract)
- Aortic valve at origin of ascending aorta

The interventricular septum separates it from the right ventricle.`,
    clinical_significance: `Left ventricular hypertrophy occurs with hypertension or aortic stenosis. Myocardial infarction most commonly affects the left ventricle. Ejection fraction (normal >55%) is a key measure of cardiac function. Heart failure often results from left ventricular dysfunction.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: 'Autonomic innervation via cardiac plexus',
    blood_supply: 'Left coronary artery (anterior and posterior interventricular branches, circumflex)',
    model_reference: 'heart_left_ventricle',
    image_references: [
      {
        id: 'img-heart-lv-001',
        url: '/assets/images/netter/plate-212.jpg',
        caption: 'Left ventricle opened to show internal structures',
        source: "Netter's Atlas 8th Ed",
        license: 'Educational use',
        plateNumber: '212',
      },
    ],
    difficulty_rating: 3,
    prerequisite_ids: ['thorax-heart-left-atrium'],
  },

  // ==========================================================================
  // HEART VALVES
  // ==========================================================================
  {
    id: 'thorax-valve-tricuspid',
    canonical_name: 'Tricuspid Valve',
    common_names: ['Right atrioventricular valve'],
    latin_name: 'Valva atrioventricularis dextra',
    pronunciation_ipa: '/traɪˈkʌspɪd vælv/',
    region_id: THORAX_REGION_ID,
    system_ids: [CARDIOVASCULAR_SYSTEM_ID],
    structure_type: 'other' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The three-leaflet valve between the right atrium and right ventricle.',
    description_full: `The tricuspid valve consists of three cusps (anterior, posterior, and septal) attached to a fibrous annulus. Chordae tendineae connect the cusps to three papillary muscles in the right ventricle.

The valve opens during diastole allowing blood flow from RA to RV, and closes during systole preventing backflow. The septal cusp attaches to the interventricular septum.`,
    clinical_significance: `Tricuspid regurgitation occurs with right ventricular dilation, pulmonary hypertension, or endocarditis. IV drug use increases risk of tricuspid valve endocarditis. Ebstein anomaly is a congenital malformation with apical displacement of the septal leaflet.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'valve_tricuspid',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['thorax-heart-right-atrium', 'thorax-heart-right-ventricle'],
  },
  {
    id: 'thorax-valve-pulmonary',
    canonical_name: 'Pulmonary Valve',
    common_names: ['Pulmonic valve'],
    latin_name: 'Valva trunci pulmonalis',
    pronunciation_ipa: '/ˈpʌlmənɛri vælv/',
    region_id: THORAX_REGION_ID,
    system_ids: [CARDIOVASCULAR_SYSTEM_ID],
    structure_type: 'other' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The semilunar valve at the origin of the pulmonary trunk.',
    description_full: `The pulmonary valve is a semilunar valve with three cusps (anterior, right, and left) located at the junction of the right ventricular outflow tract and pulmonary trunk.

Each cusp has a lunule (free edge) and nodule (central thickening). During systole, cusps are pressed against the pulmonary trunk wall; during diastole, blood fills the sinuses causing cusp closure.`,
    clinical_significance: `Pulmonary stenosis is the most common congenital valvular lesion. Pulmonary regurgitation may follow repair of tetralogy of Fallot. The valve may be affected by carcinoid syndrome or endocarditis. Auscultated in 2nd left intercostal space.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'valve_pulmonary',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['thorax-heart-right-ventricle'],
  },
  {
    id: 'thorax-valve-mitral',
    canonical_name: 'Mitral Valve',
    common_names: ['Bicuspid valve', 'Left atrioventricular valve'],
    latin_name: 'Valva atrioventricularis sinistra',
    pronunciation_ipa: '/ˈmaɪtrəl vælv/',
    region_id: THORAX_REGION_ID,
    system_ids: [CARDIOVASCULAR_SYSTEM_ID],
    structure_type: 'other' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The two-leaflet valve between the left atrium and left ventricle.',
    description_full: `The mitral valve has two cusps (anterior/aortic and posterior/mural) that form a funnel during diastole. The anterior cusp is larger and continuous with the aortic valve fibrous skeleton.

Chordae tendineae from two papillary muscles (anterolateral and posteromedial) prevent prolapse during systole. The valve opens in diastole and closes in systole with peak closure at S1 heart sound.`,
    clinical_significance: `Mitral stenosis (commonly rheumatic) causes left atrial enlargement and pulmonary congestion. Mitral regurgitation may be acute (papillary muscle rupture, chordae rupture) or chronic (mitral valve prolapse). Mitral valve prolapse affects 2-3% of population.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'valve_mitral',
    image_references: [
      {
        id: 'img-valve-mitral-001',
        url: '/assets/images/netter/plate-213.jpg',
        caption: 'Mitral valve viewed from left atrium',
        source: "Netter's Atlas 8th Ed",
        license: 'Educational use',
        plateNumber: '213',
      },
    ],
    difficulty_rating: 3,
    prerequisite_ids: ['thorax-heart-left-atrium', 'thorax-heart-left-ventricle'],
  },
  {
    id: 'thorax-valve-aortic',
    canonical_name: 'Aortic Valve',
    common_names: ['Aortic semilunar valve'],
    latin_name: 'Valva aortae',
    pronunciation_ipa: '/eɪˈɔːrtɪk vælv/',
    region_id: THORAX_REGION_ID,
    system_ids: [CARDIOVASCULAR_SYSTEM_ID],
    structure_type: 'other' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The semilunar valve at the origin of the ascending aorta.',
    description_full: `The aortic valve is a semilunar valve with three cusps (right, left, and posterior/non-coronary) located at the left ventricular outflow tract.

The right and left coronary arteries arise from sinuses above the right and left cusps respectively. The cusps have lunulae and nodules of Arantius similar to the pulmonary valve. Closure produces the S2 heart sound (A2 component).`,
    clinical_significance: `Aortic stenosis (calcific, congenital bicuspid, rheumatic) causes syncope, angina, and heart failure. Aortic regurgitation may be acute (dissection, endocarditis) or chronic (aortic root dilation). Bicuspid aortic valve is the most common congenital heart defect (1-2%).`,
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'valve_aortic',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['thorax-heart-left-ventricle'],
  },

  // ==========================================================================
  // GREAT VESSELS
  // ==========================================================================
  {
    id: 'thorax-vessel-aortic-arch',
    canonical_name: 'Aortic Arch',
    common_names: ['Arch of aorta'],
    latin_name: 'Arcus aortae',
    pronunciation_ipa: '/eɪˈɔːrtɪk ɑːrtʃ/',
    region_id: THORAX_REGION_ID,
    system_ids: [CARDIOVASCULAR_SYSTEM_ID],
    structure_type: 'artery' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The curved portion of the aorta giving rise to brachiocephalic, left common carotid, and left subclavian arteries.',
    description_full: `The aortic arch is the curved segment connecting ascending and descending aorta. It begins at the level of the sternal angle (T4) and arches posteriorly over the left main bronchus.

Three major branches arise from superior aspect:
1. Brachiocephalic trunk (most anterior)
2. Left common carotid artery
3. Left subclavian artery (most posterior)

The ligamentum arteriosum connects the arch to the pulmonary trunk (remnant of ductus arteriosus).`,
    clinical_significance: `Aortic arch aneurysm may compress left recurrent laryngeal nerve causing hoarseness. Coarctation typically occurs distal to left subclavian origin. Traumatic aortic injury occurs at the ligamentum arteriosum attachment (aortic isthmus) in deceleration injuries.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'aortic_arch',
    image_references: [
      {
        id: 'img-aortic-arch-001',
        url: '/assets/images/netter/plate-205.jpg',
        caption: 'Aortic arch and branches',
        source: "Netter's Atlas 8th Ed",
        license: 'Educational use',
        plateNumber: '205',
      },
    ],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },
  {
    id: 'thorax-artery-left-coronary',
    canonical_name: 'Left Coronary Artery',
    common_names: ['LCA', 'Left main coronary'],
    latin_name: 'Arteria coronaria sinistra',
    pronunciation_ipa: '/ˈkɒrənɛri ˈɑːrtəri/',
    region_id: THORAX_REGION_ID,
    system_ids: [CARDIOVASCULAR_SYSTEM_ID],
    structure_type: 'artery' as StructureType,
    parent_structure_id: null,
    definition_brief: 'Main coronary artery arising from left aortic sinus, dividing into LAD and circumflex branches.',
    description_full: `The left coronary artery originates from the left aortic sinus just above the left cusp of the aortic valve. It courses between the pulmonary trunk and left auricle before dividing into:

1. Left anterior descending (LAD) - descends in anterior interventricular groove
2. Left circumflex (LCx) - courses in left atrioventricular groove

The left main is typically 1-2.5 cm long. It supplies the left ventricle, left atrium, and interventricular septum (anterior 2/3).`,
    clinical_significance: `Left main stenosis is high-risk and usually requires revascularization. LAD occlusion causes anterior MI (most common). The LAD is called "the widow-maker" due to its critical supply to anterior LV and septum. First diagonal branch supplies anterolateral wall.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'coronary_left',
    image_references: [
      {
        id: 'img-coronary-left-001',
        url: '/assets/images/netter/plate-209.jpg',
        caption: 'Coronary arteries and cardiac veins',
        source: "Netter's Atlas 8th Ed",
        license: 'Educational use',
        plateNumber: '209',
      },
    ],
    difficulty_rating: 4,
    prerequisite_ids: ['thorax-heart-left-ventricle'],
  },
  {
    id: 'thorax-artery-right-coronary',
    canonical_name: 'Right Coronary Artery',
    common_names: ['RCA'],
    latin_name: 'Arteria coronaria dextra',
    pronunciation_ipa: '/ˈkɒrənɛri ˈɑːrtəri/',
    region_id: THORAX_REGION_ID,
    system_ids: [CARDIOVASCULAR_SYSTEM_ID],
    structure_type: 'artery' as StructureType,
    parent_structure_id: null,
    definition_brief: 'Main coronary artery arising from right aortic sinus, supplying right ventricle and inferior left ventricle.',
    description_full: `The right coronary artery originates from the right aortic sinus and courses in the right atrioventricular groove. Major branches include:

1. SA nodal artery (60% of people)
2. Right marginal artery
3. Posterior descending artery (PDA) - in 70% (right dominant)
4. AV nodal artery

It supplies the right atrium, right ventricle, SA node (usually), AV node, and inferior/posterior LV.`,
    clinical_significance: `RCA occlusion causes inferior MI (leads II, III, aVF). May extend to right ventricle (ST elevation in V4R) or posterior wall. AV nodal artery occlusion causes heart block. Right dominance (PDA from RCA) occurs in 70% of people.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'coronary_right',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: ['thorax-heart-right-ventricle'],
  },
  {
    id: 'thorax-vessel-svc',
    canonical_name: 'Superior Vena Cava',
    common_names: ['SVC'],
    latin_name: 'Vena cava superior',
    pronunciation_ipa: '/suːˈpɪəriər ˈviːnə ˈkeɪvə/',
    region_id: THORAX_REGION_ID,
    system_ids: [CARDIOVASCULAR_SYSTEM_ID],
    structure_type: 'vein' as StructureType,
    parent_structure_id: null,
    definition_brief: 'Large vein returning deoxygenated blood from upper body to right atrium.',
    description_full: `The SVC is formed by the union of right and left brachiocephalic veins posterior to the right first costal cartilage. It descends vertically ~7 cm before entering the upper right atrium.

The azygos vein enters the posterior SVC just before it enters the pericardium. No valves are present. It lies in the superior mediastinum, anterior to the trachea and right of the aortic arch.`,
    clinical_significance: `SVC syndrome results from obstruction (lung cancer, lymphoma, thrombosis) causing facial/upper extremity edema and dilated chest wall veins. Central venous catheters enter via subclavian or internal jugular veins. SVC is a common site for pacemaker lead placement.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'vena_cava_superior',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['thorax-heart-right-atrium'],
  },
  {
    id: 'thorax-vessel-ivc',
    canonical_name: 'Inferior Vena Cava',
    common_names: ['IVC'],
    latin_name: 'Vena cava inferior',
    pronunciation_ipa: '/ɪnˈfɪəriər ˈviːnə ˈkeɪvə/',
    region_id: THORAX_REGION_ID,
    system_ids: [CARDIOVASCULAR_SYSTEM_ID],
    structure_type: 'vein' as StructureType,
    parent_structure_id: null,
    definition_brief: 'Large vein returning deoxygenated blood from lower body to right atrium.',
    description_full: `The IVC enters the thorax through the diaphragm at T8 level (caval opening) and almost immediately enters the right atrium. It is the largest vein in the body.

The thoracic portion is very short (~2-3 cm), lying in the posterior mediastinum. It enters the inferior aspect of the right atrium.`,
    clinical_significance: `IVC filters may be placed to prevent pulmonary embolism. The IVC is visualized on echocardiography to assess volume status - it collapses with inspiration when volume depleted. Thrombosis may occur with hypercoagulable states.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'vena_cava_inferior',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: ['thorax-heart-right-atrium'],
  },
  {
    id: 'thorax-vessel-pulmonary-trunk',
    canonical_name: 'Pulmonary Trunk',
    common_names: ['Main pulmonary artery'],
    latin_name: 'Truncus pulmonalis',
    pronunciation_ipa: '/ˈpʌlmənɛri trʌŋk/',
    region_id: THORAX_REGION_ID,
    system_ids: [CARDIOVASCULAR_SYSTEM_ID, RESPIRATORY_SYSTEM_ID],
    structure_type: 'artery' as StructureType,
    parent_structure_id: null,
    definition_brief: 'Vessel carrying deoxygenated blood from right ventricle to lungs.',
    description_full: `The pulmonary trunk arises from the right ventricle and is ~5 cm long before bifurcating into right and left pulmonary arteries at the level of T5-T6 (sternal angle).

It is the only artery in adults carrying deoxygenated blood. It spirals around the ascending aorta anteriorly and to the left. The ligamentum arteriosum connects it to the aortic arch.`,
    clinical_significance: `Pulmonary embolism may cause acute right heart strain. Pulmonary hypertension increases pulmonary trunk pressure. Patent ductus arteriosus represents failure of closure of the ductus arteriosus (connecting pulmonary trunk to aorta). Pulmonary artery catheters measure pulmonary pressures.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'pulmonary_trunk',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['thorax-heart-right-ventricle'],
  },

  // ==========================================================================
  // RESPIRATORY STRUCTURES - LUNGS
  // ==========================================================================
  {
    id: 'thorax-lung-right',
    canonical_name: 'Right Lung',
    common_names: ['Right pulmonary organ'],
    latin_name: 'Pulmo dexter',
    pronunciation_ipa: '/ˈpʊlməʊ ˈdɛkstər/',
    region_id: THORAX_REGION_ID,
    system_ids: [RESPIRATORY_SYSTEM_ID],
    structure_type: 'organ' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The right lung with three lobes (superior, middle, inferior) separated by horizontal and oblique fissures.',
    description_full: `The right lung is larger but shorter than the left lung. It is divided into three lobes by two fissures:
- Oblique fissure (separates inferior from middle and superior lobes)
- Horizontal fissure (separates superior from middle lobe)

The right lung has 10 bronchopulmonary segments. The hilum contains the right main bronchus (most posterior), pulmonary artery (superior), and pulmonary veins (inferior and anterior).

The right lung has a deeper cardiac impression and accommodates the liver inferiorly.`,
    clinical_significance: `Right lower lobe pneumonia is most common (gravity-dependent). Aspiration preferentially affects the right lung due to more vertical bronchus. Middle lobe syndrome involves recurrent infection/collapse. Horizontal fissure is visible on chest X-ray.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: 'Pulmonary plexus (sympathetic and parasympathetic)',
    blood_supply: 'Pulmonary artery (deoxygenated), bronchial arteries (oxygenated)',
    model_reference: 'lung_right',
    image_references: [
      {
        id: 'img-lung-right-001',
        url: '/assets/images/netter/plate-194.jpg',
        caption: 'Right lung anatomy showing lobes and fissures',
        source: "Netter's Atlas 8th Ed",
        license: 'Educational use',
        plateNumber: '194',
      },
    ],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },
  {
    id: 'thorax-lung-left',
    canonical_name: 'Left Lung',
    common_names: ['Left pulmonary organ'],
    latin_name: 'Pulmo sinister',
    pronunciation_ipa: '/ˈpʊlməʊ sɪˈnɪstər/',
    region_id: THORAX_REGION_ID,
    system_ids: [RESPIRATORY_SYSTEM_ID],
    structure_type: 'organ' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The left lung with two lobes (superior and inferior) separated by the oblique fissure.',
    description_full: `The left lung is smaller than the right to accommodate the heart. It has two lobes divided by the oblique fissure:
- Superior lobe (includes lingula - equivalent to right middle lobe)
- Inferior lobe

The left lung has 9 bronchopulmonary segments (superior lobe: 4, lingula: 2, inferior lobe: 4).

The cardiac notch is a concavity in the anterior border of the superior lobe. The hilum contains the left main bronchus (most posterior), pulmonary artery (superior), and pulmonary veins.`,
    clinical_significance: `The lingula is prone to recurrent infection. Cardiac enlargement may compress left lower lobe bronchus. Left upper lobe collapse creates a "veil sign" on chest X-ray. The oblique fissure courses from T3 posteriorly to 6th rib anteriorly.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: 'Pulmonary plexus (sympathetic and parasympathetic)',
    blood_supply: 'Pulmonary artery (deoxygenated), bronchial arteries (oxygenated)',
    model_reference: 'lung_left',
    image_references: [
      {
        id: 'img-lung-left-001',
        url: '/assets/images/netter/plate-195.jpg',
        caption: 'Left lung anatomy showing lobes and cardiac notch',
        source: "Netter's Atlas 8th Ed",
        license: 'Educational use',
        plateNumber: '195',
      },
    ],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },
  {
    id: 'thorax-airway-trachea',
    canonical_name: 'Trachea',
    common_names: ['Windpipe'],
    latin_name: 'Trachea',
    pronunciation_ipa: '/trəˈkiːə/',
    region_id: THORAX_REGION_ID,
    system_ids: [RESPIRATORY_SYSTEM_ID],
    structure_type: 'other' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The cartilaginous tube conducting air from larynx to main bronchi.',
    description_full: `The trachea extends from the cricoid cartilage (C6) to the carina (T4-T5 level, sternal angle). It is 10-12 cm long and 2-2.5 cm in diameter.

Structure:
- 16-20 C-shaped cartilaginous rings (anterior and lateral)
- Posterior membranous wall (smooth muscle - trachealis muscle)
- Pseudostratified ciliated columnar epithelium with goblet cells

The trachea enters the superior mediastinum, anterior to the esophagus. The carina is the bifurcation point into right and left main bronchi.`,
    clinical_significance: `Emergency cricothyrotomy provides airway access above the trachea. Tracheostomy is performed between rings 2-4. Foreign body aspiration typically enters right main bronchus. Tracheal deviation indicates mediastinal shift (tension pneumothorax, large effusion).`,
    origin: null,
    insertion: null,
    action: null,
    innervation: 'Recurrent laryngeal nerves, sympathetic',
    blood_supply: 'Inferior thyroid artery, bronchial arteries',
    model_reference: 'trachea',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },
  {
    id: 'thorax-airway-right-main-bronchus',
    canonical_name: 'Right Main Bronchus',
    common_names: ['Right primary bronchus'],
    latin_name: 'Bronchus principalis dexter',
    pronunciation_ipa: '/ˈbrɒŋkəs/',
    region_id: THORAX_REGION_ID,
    system_ids: [RESPIRATORY_SYSTEM_ID],
    structure_type: 'other' as StructureType,
    parent_structure_id: 'thorax-airway-trachea',
    definition_brief: 'The wider, shorter, and more vertical main bronchus serving the right lung.',
    description_full: `The right main bronchus is ~2.5 cm long and more vertical than the left (25° from vertical). It is wider and shorter, making it the preferential path for aspirated foreign bodies.

It divides into:
1. Superior lobar bronchus (above pulmonary artery)
2. Intermediate bronchus → middle and inferior lobar bronchi

The pulmonary artery crosses anterior to the right main bronchus.`,
    clinical_significance: `Foreign body aspiration most commonly lodges in the right main bronchus or right lower lobe due to its vertical orientation. Right main bronchus intubation may occur with excessive ET tube advancement. Lung transplantation involves bronchial anastomosis.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: 'Pulmonary plexus',
    blood_supply: 'Bronchial arteries',
    model_reference: 'bronchus_right_main',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['thorax-airway-trachea'],
  },
  {
    id: 'thorax-airway-left-main-bronchus',
    canonical_name: 'Left Main Bronchus',
    common_names: ['Left primary bronchus'],
    latin_name: 'Bronchus principalis sinister',
    pronunciation_ipa: '/ˈbrɒŋkəs/',
    region_id: THORAX_REGION_ID,
    system_ids: [RESPIRATORY_SYSTEM_ID],
    structure_type: 'other' as StructureType,
    parent_structure_id: 'thorax-airway-trachea',
    definition_brief: 'The narrower, longer, and more horizontal main bronchus serving the left lung.',
    description_full: `The left main bronchus is ~5 cm long and more horizontal than the right (45° from vertical). It is narrower and longer than the right.

It passes inferior to the aortic arch and anterior to the esophagus and descending aorta before dividing into:
1. Superior lobar bronchus
2. Inferior lobar bronchus

The pulmonary artery crosses superior to the left main bronchus.`,
    clinical_significance: `Left main bronchus compression may occur with enlarged left atrium (mitral stenosis) or aortic aneurysm. Bronchoscopy shows the carina at the bifurcation. Double-lumen endotracheal tubes allow one-lung ventilation.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: 'Pulmonary plexus',
    blood_supply: 'Bronchial arteries',
    model_reference: 'bronchus_left_main',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['thorax-airway-trachea'],
  },

  // ==========================================================================
  // MUSCLES
  // ==========================================================================
  {
    id: 'thorax-muscle-diaphragm',
    canonical_name: 'Diaphragm',
    common_names: ['Thoracic diaphragm'],
    latin_name: 'Diaphragma',
    pronunciation_ipa: '/ˈdaɪəfræm/',
    region_id: THORAX_REGION_ID,
    system_ids: [MUSCULAR_SYSTEM_ID, RESPIRATORY_SYSTEM_ID],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The dome-shaped musculotendinous partition separating thoracic and abdominal cavities, primary muscle of respiration.',
    description_full: `The diaphragm is the principal muscle of inspiration. It consists of a central tendon surrounded by muscular portions that attach peripherally.

Peripheral attachments:
- Sternal part: xiphoid process
- Costal part: ribs 7-12 and costal cartilages
- Lumbar part: right and left crura (L1-L3 vertebrae), medial and lateral arcuate ligaments

Major openings (from anterior to posterior):
- T8: IVC opening (caval hiatus) in central tendon
- T10: Esophageal hiatus (with vagal trunks)
- T12: Aortic hiatus (with thoracic duct and azygos vein)

Contraction causes the dome to flatten, increasing thoracic volume and decreasing pressure, drawing air into lungs.`,
    clinical_significance: `Diaphragmatic paralysis (phrenic nerve injury) causes dyspnea and reduced lung volumes. Congenital diaphragmatic hernia allows abdominal contents into thorax. Eventration is congenital abnormal elevation. Hiatal hernia involves herniation through esophageal hiatus. Paradoxical movement occurs with paralysis.`,
    origin: 'Xiphoid process, ribs 7-12, L1-L3 vertebrae',
    insertion: 'Central tendon',
    action: 'Primary muscle of inspiration; increases vertical thoracic diameter',
    innervation: 'Phrenic nerve (C3-C5) - "C3, 4, 5 keeps the diaphragm alive"',
    blood_supply: 'Superior and inferior phrenic arteries, musculophrenic artery, pericardiacophrenic artery',
    model_reference: 'diaphragm',
    image_references: [
      {
        id: 'img-diaphragm-001',
        url: '/assets/images/netter/plate-188.jpg',
        caption: 'Diaphragm viewed from above showing openings',
        source: "Netter's Atlas 8th Ed",
        license: 'Educational use',
        plateNumber: '188',
      },
    ],
    difficulty_rating: 4,
    prerequisite_ids: [],
  },
  {
    id: 'thorax-muscle-intercostal-external',
    canonical_name: 'External Intercostal Muscles',
    common_names: ['External intercostals'],
    latin_name: 'Musculi intercostales externi',
    pronunciation_ipa: '/ˌɪntərˈkɒstəl/',
    region_id: THORAX_REGION_ID,
    system_ids: [MUSCULAR_SYSTEM_ID, RESPIRATORY_SYSTEM_ID],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The most superficial intercostal muscles, active during inspiration.',
    description_full: `The external intercostals are 11 paired muscles occupying the intercostal spaces. They are the most superficial of the three intercostal muscle layers.

Fiber direction: inferoanteriorly (hands in pockets direction)
Extent: from tubercles of ribs posteriorly to costochondral junctions anteriorly
Anteriorly replaced by: external intercostal membrane

They elevate the ribs during inspiration, increasing thoracic volume.`,
    clinical_significance: `Intercostal muscle strain causes pleuritic chest pain. Accessory muscles of respiration become active in respiratory distress. The intercostal spaces widen with chronic obstructive lung disease. Intercostal retractions indicate respiratory distress.`,
    origin: 'Inferior border of rib above',
    insertion: 'Superior border of rib below',
    action: 'Elevate ribs during inspiration',
    innervation: 'Intercostal nerves (T1-T11)',
    blood_supply: 'Posterior and anterior intercostal arteries',
    model_reference: 'intercostal_external',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },
  {
    id: 'thorax-muscle-intercostal-internal',
    canonical_name: 'Internal Intercostal Muscles',
    common_names: ['Internal intercostals'],
    latin_name: 'Musculi intercostales interni',
    pronunciation_ipa: '/ˌɪntərˈkɒstəl/',
    region_id: THORAX_REGION_ID,
    system_ids: [MUSCULAR_SYSTEM_ID, RESPIRATORY_SYSTEM_ID],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The middle layer of intercostal muscles, active during forced expiration.',
    description_full: `The internal intercostals lie deep to the external intercostals. They have 11 paired muscles in each intercostal space.

Fiber direction: inferoposteriorly (perpendicular to external intercostals)
Extent: from sternum anteriorly to angles of ribs posteriorly
Posteriorly replaced by: internal intercostal membrane

The interchondral part (parasternal intercostals) assists inspiration, while the interosseous part assists forced expiration by depressing ribs.`,
    clinical_significance: `Intercostal nerve blocks target the space between internal and innermost layers. Thoracentesis should be performed at the superior border of a rib to avoid the neurovascular bundle. Intercostal muscle weakness contributes to respiratory failure.`,
    origin: 'Superior border of rib below and costal cartilage',
    insertion: 'Inferior border of rib above',
    action: 'Depress ribs during forced expiration; interchondral part assists inspiration',
    innervation: 'Intercostal nerves (T1-T11)',
    blood_supply: 'Posterior and anterior intercostal arteries',
    model_reference: 'intercostal_internal',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['thorax-muscle-intercostal-external'],
  },
  {
    id: 'thorax-muscle-pectoralis-major',
    canonical_name: 'Pectoralis Major',
    common_names: ['Pecs', 'Chest muscle'],
    latin_name: 'Musculus pectoralis major',
    pronunciation_ipa: '/ˌpɛktəˈreɪlɪs ˈmeɪdʒər/',
    region_id: THORAX_REGION_ID,
    system_ids: [MUSCULAR_SYSTEM_ID],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'Large, fan-shaped muscle of the anterior chest wall acting on the shoulder joint.',
    description_full: `The pectoralis major is a thick, fan-shaped muscle forming the anterior axillary fold. It has two heads:

Clavicular head: from medial half of clavicle
Sternocostal head: from sternum, costal cartilages 1-6, aponeurosis of external oblique

Both heads converge to insert on the lateral lip of the intertubercular groove of the humerus. The muscle fibers twist so that the inferior fibers insert most superiorly.

It forms the anterior wall of the axilla.`,
    clinical_significance: `Pectoralis major rupture may occur during weight lifting (bench press). Poland syndrome involves unilateral absence of pectoralis major. The muscle may be used for breast reconstruction (pectoralis major flap). Pectoralis major is an accessory muscle of respiration in distress.`,
    origin: 'Clavicle (medial half), sternum, costal cartilages 1-6, external oblique aponeurosis',
    insertion: 'Lateral lip of intertubercular groove of humerus',
    action: 'Adducts and medially rotates humerus; clavicular head flexes shoulder; sternocostal head extends from flexed position',
    innervation: 'Medial and lateral pectoral nerves (C5-T1)',
    blood_supply: 'Pectoral branch of thoracoacromial artery, lateral thoracic artery',
    model_reference: 'pectoralis_major',
    image_references: [],
    difficulty_rating: 2,
    prerequisite_ids: [],
  },
  {
    id: 'thorax-muscle-pectoralis-minor',
    canonical_name: 'Pectoralis Minor',
    common_names: ['Minor pectoral muscle'],
    latin_name: 'Musculus pectoralis minor',
    pronunciation_ipa: '/ˌpɛktəˈreɪlɪs ˈmaɪnər/',
    region_id: THORAX_REGION_ID,
    system_ids: [MUSCULAR_SYSTEM_ID],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'Thin triangular muscle deep to pectoralis major, acting on the scapula.',
    description_full: `The pectoralis minor is a thin, triangular muscle lying deep to pectoralis major. It arises from ribs 3-5 and inserts on the coracoid process of the scapula.

The muscle is an important landmark:
- Divides the axillary artery into three parts (medial, posterior, lateral to muscle)
- Forms part of the anterior axillary wall

It stabilizes the scapula by drawing it anteroinferiorly against the thoracic wall.`,
    clinical_significance: `Pectoralis minor syndrome (controversial) may cause neurovascular compression. The muscle is released in some thoracic outlet syndrome surgeries. It serves as an anatomical landmark for axillary artery and brachial plexus relations. Hypertonicity may contribute to rounded shoulder posture.`,
    origin: 'Ribs 3-5 near costal cartilages',
    insertion: 'Coracoid process of scapula',
    action: 'Stabilizes scapula by drawing it anteroinferiorly; assists in respiration when scapula is fixed',
    innervation: 'Medial pectoral nerve (C8-T1)',
    blood_supply: 'Pectoral branch of thoracoacromial artery, lateral thoracic artery',
    model_reference: 'pectoralis_minor',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: ['thorax-muscle-pectoralis-major'],
  },
  {
    id: 'thorax-muscle-serratus-anterior',
    canonical_name: 'Serratus Anterior',
    common_names: ['Boxer\'s muscle'],
    latin_name: 'Musculus serratus anterior',
    pronunciation_ipa: '/sɛˈreɪtəs ænˈtɪəriər/',
    region_id: THORAX_REGION_ID,
    system_ids: [MUSCULAR_SYSTEM_ID],
    structure_type: 'muscle' as StructureType,
    parent_structure_id: null,
    definition_brief: 'Muscle of the lateral thoracic wall that protracts and rotates the scapula.',
    description_full: `The serratus anterior is a large muscle originating from ribs 1-8 laterally. It has a serrated (saw-toothed) appearance. The muscle passes posteriorly between the scapula and thoracic wall to insert on the costal (anterior) surface of the medial border of scapula.

Three functional parts:
- Superior fibers: ribs 1-2 → superior angle of scapula
- Middle fibers: ribs 2-3 → medial border of scapula
- Inferior fibers: ribs 4-8 → inferior angle of scapula

It forms the medial wall of the axilla and is important for scapular stability.`,
    clinical_significance: `Long thoracic nerve injury (during axillary surgery or trauma) causes scapular winging - the medial border and inferior angle protrude posteriorly. The muscle is essential for overhead reaching and pushing motions. Weakness impairs shoulder function and causes fatigue with repetitive movements.`,
    origin: 'External surfaces of lateral parts of ribs 1-8',
    insertion: 'Costal (anterior) surface of medial border of scapula',
    action: 'Protracts scapula, rotates it for overhead reaching; holds scapula against thoracic wall',
    innervation: 'Long thoracic nerve (C5-C7)',
    blood_supply: 'Lateral thoracic artery, thoracodorsal artery',
    model_reference: 'serratus_anterior',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },

  // ==========================================================================
  // NERVOUS SYSTEM
  // ==========================================================================
  {
    id: 'thorax-nerve-phrenic',
    canonical_name: 'Phrenic Nerve',
    common_names: ['Phrenic'],
    latin_name: 'Nervus phrenicus',
    pronunciation_ipa: '/ˈfrɛnɪk nɜːrv/',
    region_id: THORAX_REGION_ID,
    system_ids: [NERVOUS_SYSTEM_ID],
    structure_type: 'nerve' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The sole motor nerve to the diaphragm, arising from C3-C5 spinal nerve roots.',
    description_full: `The phrenic nerve provides motor innervation to the diaphragm and sensory innervation to the central diaphragm, pericardium, and mediastinal pleura.

Course:
- Origin: C3, C4, C5 ("C3, 4, 5 keeps the diaphragm alive")
- Descends through neck on anterior scalene muscle
- Enters thorax between subclavian artery and vein
- Descends in mediastinum between mediastinal pleura and pericardium
- Right: lateral to SVC, right atrium
- Left: lateral to left ventricle, crosses aortic arch

Terminates by penetrating diaphragm.`,
    clinical_significance: `Phrenic nerve palsy causes diaphragmatic paralysis with dyspnea and reduced lung volumes. May result from lung cancer, cardiac surgery, trauma, or viral infection. Fluoroscopic "sniff test" shows paradoxical upward movement. Bilateral injury requires mechanical ventilation. Referred pain to shoulder (C4 dermatome).`,
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'nerve_phrenic',
    image_references: [
      {
        id: 'img-phrenic-001',
        url: '/assets/images/netter/plate-186.jpg',
        caption: 'Phrenic nerve course through thorax',
        source: "Netter's Atlas 8th Ed",
        license: 'Educational use',
        plateNumber: '186',
      },
    ],
    difficulty_rating: 3,
    prerequisite_ids: ['thorax-muscle-diaphragm'],
  },
  {
    id: 'thorax-nerve-vagus',
    canonical_name: 'Vagus Nerve',
    common_names: ['Cranial nerve X', 'Pneumogastric nerve'],
    latin_name: 'Nervus vagus',
    pronunciation_ipa: '/ˈveɪɡəs nɜːrv/',
    region_id: THORAX_REGION_ID,
    system_ids: [NERVOUS_SYSTEM_ID],
    structure_type: 'nerve' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The tenth cranial nerve providing parasympathetic innervation to thoracic and abdominal viscera.',
    description_full: `The vagus nerve is the longest cranial nerve, providing parasympathetic innervation to thoracic and abdominal organs. In the thorax:

Right vagus:
- Enters thorax between right subclavian artery and brachiocephalic vein
- Passes posterior to right main bronchus
- Contributes to esophageal plexus
- Forms posterior vagal trunk

Left vagus:
- Enters thorax between left common carotid and subclavian arteries
- Descends anterior to aortic arch
- Gives off left recurrent laryngeal nerve (hooks under aortic arch)
- Forms anterior vagal trunk

Both nerves contribute to cardiac, pulmonary, and esophageal plexuses.`,
    clinical_significance: `Vagal stimulation slows heart rate and increases GI motility. Left recurrent laryngeal nerve palsy (from aortic aneurysm, lung cancer) causes hoarseness. Vagotomy was historically used for peptic ulcer disease. Vagal nerve stimulation is used for epilepsy and depression. Injury during esophagectomy affects GI function.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'nerve_vagus',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: [],
  },
  {
    id: 'thorax-nerve-recurrent-laryngeal-left',
    canonical_name: 'Left Recurrent Laryngeal Nerve',
    common_names: ['Left recurrent nerve'],
    latin_name: 'Nervus laryngeus recurrens sinister',
    pronunciation_ipa: '/rɪˈkʌrənt ləˈrɪndʒiəl/',
    region_id: THORAX_REGION_ID,
    system_ids: [NERVOUS_SYSTEM_ID],
    structure_type: 'nerve' as StructureType,
    parent_structure_id: 'thorax-nerve-vagus',
    definition_brief: 'Branch of left vagus nerve that loops under aortic arch to innervate intrinsic laryngeal muscles.',
    description_full: `The left recurrent laryngeal nerve is a branch of the left vagus nerve with a unique course:

Course:
- Branches from vagus at level of aortic arch
- Loops posteriorly under aortic arch (lateral to ligamentum arteriosum)
- Ascends in groove between trachea and esophagus
- Enters larynx to innervate all intrinsic laryngeal muscles except cricothyroid

The recurrent course is due to embryological descent of the aortic arch.`,
    clinical_significance: `Compression or injury causes vocal cord paralysis with hoarseness (breathy voice). Causes include aortic aneurysm, enlarged left atrium (Ortner syndrome), lung cancer, thyroid surgery, or mediastinal masses. The nerve is at risk during thoracic surgery. Bilateral injury may require tracheostomy.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'nerve_recurrent_laryngeal_left',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: ['thorax-nerve-vagus', 'thorax-vessel-aortic-arch'],
  },
  {
    id: 'thorax-nerve-intercostal',
    canonical_name: 'Intercostal Nerves',
    common_names: ['Thoracic spinal nerves'],
    latin_name: 'Nervi intercostales',
    pronunciation_ipa: '/ˌɪntərˈkɒstəl nɜːrvz/',
    region_id: THORAX_REGION_ID,
    system_ids: [NERVOUS_SYSTEM_ID],
    structure_type: 'nerve' as StructureType,
    parent_structure_id: null,
    definition_brief: 'Anterior rami of thoracic spinal nerves T1-T11 providing segmental innervation to thoracic and abdominal walls.',
    description_full: `The intercostal nerves are the anterior rami of thoracic spinal nerves T1-T11. They travel in the intercostal spaces between internal and innermost intercostal muscles, inferior to the intercostal vessels ("VAN" - Vein, Artery, Nerve from superior to inferior).

Branches:
- Lateral cutaneous branch (mid-axillary line)
- Anterior cutaneous branch (lateral to sternum)
- Collateral branches
- Muscular branches (to intercostal muscles)

T7-T11 continue beyond costal margin as thoracoabdominal nerves.
T12 is the subcostal nerve.`,
    clinical_significance: `Intercostal nerve blocks provide analgesia for rib fractures, thoracotomy, or herpes zoster (shingles). Post-thoracotomy pain syndrome may result from nerve injury. Dermatomal mapping helps localize spinal cord lesions. T4 dermatome corresponds to nipple level; T10 to umbilicus.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'nerve_intercostal',
    image_references: [],
    difficulty_rating: 3,
    prerequisite_ids: [],
  },
  {
    id: 'thorax-plexus-cardiac',
    canonical_name: 'Cardiac Plexus',
    common_names: ['Heart nerve plexus'],
    latin_name: 'Plexus cardiacus',
    pronunciation_ipa: '/ˈkɑːrdiæk ˈplɛksəs/',
    region_id: THORAX_REGION_ID,
    system_ids: [NERVOUS_SYSTEM_ID, CARDIOVASCULAR_SYSTEM_ID],
    structure_type: 'nerve' as StructureType,
    parent_structure_id: null,
    definition_brief: 'Network of autonomic nerve fibers providing sympathetic and parasympathetic innervation to the heart.',
    description_full: `The cardiac plexus is a network of autonomic nerves located at the base of the heart. It consists of:

Components:
- Sympathetic fibers: from cervical and thoracic sympathetic ganglia
- Parasympathetic fibers: from vagus nerves (CN X)
- Visceral afferent fibers (pain)

The plexus is divided into:
- Superficial cardiac plexus (anterior to aortic arch)
- Deep cardiac plexus (between aortic arch and tracheal bifurcation)

Fibers distribute along coronary arteries to innervate SA node, AV node, conducting system, and myocardium.`,
    clinical_significance: `Sympathetic activation increases heart rate and contractility (β1 adrenergic). Parasympathetic activation (vagal) decreases heart rate (M2 muscarinic). Cardiac pain travels via sympathetic afferents (T1-T4), referring to left arm and jaw. Cardiac sympathetic denervation occurs in some autonomic neuropathies.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: null,
    model_reference: 'plexus_cardiac',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: ['thorax-nerve-vagus'],
  },

  // ==========================================================================
  // CONDUCTION SYSTEM
  // ==========================================================================
  {
    id: 'thorax-conduction-sa-node',
    canonical_name: 'Sinoatrial Node',
    common_names: ['SA node', 'Sinus node', 'Pacemaker of the heart'],
    latin_name: 'Nodus sinuatrialis',
    pronunciation_ipa: '/ˌsaɪnoʊˈeɪtriəl noʊd/',
    region_id: THORAX_REGION_ID,
    system_ids: [CARDIOVASCULAR_SYSTEM_ID],
    structure_type: 'other' as StructureType,
    parent_structure_id: null,
    definition_brief: 'The primary cardiac pacemaker located in the right atrium, generating rhythmic electrical impulses.',
    description_full: `The SA node is a specialized region of cardiac muscle tissue that generates spontaneous electrical impulses at a rate of 60-100 beats per minute.

Location: Superior posterolateral wall of right atrium, near SVC opening
Size: ~15mm × 3mm × 1mm
Composition: Pacemaker cells (P cells) and transitional cells

The impulse spreads through atrial myocardium, causing atrial contraction, then reaches the AV node. The SA node receives dual autonomic innervation controlling heart rate.`,
    clinical_significance: `Sinus node dysfunction causes bradycardia or sick sinus syndrome, potentially requiring pacemaker implantation. Ectopic pacemakers (atrial, junctional, ventricular) may take over if SA node fails. The SA node is supplied by the SA nodal artery (60% from RCA, 40% from LCx). Sinus rhythm is the normal cardiac rhythm.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: 'Sympathetic and parasympathetic via cardiac plexus',
    blood_supply: 'SA nodal artery (branch of RCA or LCx)',
    model_reference: 'conduction_sa_node',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: ['thorax-heart-right-atrium'],
  },
  {
    id: 'thorax-conduction-av-node',
    canonical_name: 'Atrioventricular Node',
    common_names: ['AV node'],
    latin_name: 'Nodus atrioventricularis',
    pronunciation_ipa: '/ˌeɪtrioʊvɛnˈtrɪkjələr noʊd/',
    region_id: THORAX_REGION_ID,
    system_ids: [CARDIOVASCULAR_SYSTEM_ID],
    structure_type: 'other' as StructureType,
    parent_structure_id: null,
    definition_brief: 'Specialized cardiac tissue that delays electrical impulses before ventricular activation.',
    description_full: `The AV node is the only normal electrical connection between atria and ventricles. It delays impulse transmission (~0.1 seconds) allowing ventricular filling.

Location: Right atrium, in triangle of Koch (bordered by tricuspid valve, coronary sinus, and tendon of Todaro)
Size: ~5mm × 3mm × 1mm

The AV node continues as the bundle of His, which penetrates the fibrous skeleton of the heart. The delay allows coordination of atrial and ventricular contraction.`,
    clinical_significance: `AV nodal block (first, second, or third degree) slows or prevents impulse conduction. Complete heart block may require pacemaker. AV nodal reentrant tachycardia (AVNRT) is a common supraventricular arrhythmia. The AV node can be ablated in atrial fibrillation. Supplied by AV nodal artery (90% from RCA).`,
    origin: null,
    insertion: null,
    action: null,
    innervation: 'Sympathetic and parasympathetic via cardiac plexus',
    blood_supply: 'AV nodal artery (usually from RCA)',
    model_reference: 'conduction_av_node',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: ['thorax-conduction-sa-node'],
  },
  {
    id: 'thorax-conduction-bundle-his',
    canonical_name: 'Bundle of His',
    common_names: ['AV bundle', 'Common bundle'],
    latin_name: 'Fasciculus atrioventricularis',
    pronunciation_ipa: '/ˈbʌndəl əv hɪs/',
    region_id: THORAX_REGION_ID,
    system_ids: [CARDIOVASCULAR_SYSTEM_ID],
    structure_type: 'other' as StructureType,
    parent_structure_id: 'thorax-conduction-av-node',
    definition_brief: 'Specialized conducting fibers connecting the AV node to the bundle branches.',
    description_full: `The bundle of His is a collection of specialized conducting fibers that transmits electrical impulses from the AV node to the ventricles.

Course:
- Originates from AV node
- Penetrates the fibrous skeleton (central fibrous body)
- Travels along the membranous interventricular septum
- Divides into right and left bundle branches at muscular septum

Length: ~15-20mm
The bundle is the only normal electrical pathway from atria to ventricles.`,
    clinical_significance: `Bundle of His recordings are used in electrophysiology studies. His bundle pacing is an emerging alternative to traditional right ventricular pacing. Damage (from MI, surgery, or degeneration) causes complete heart block. The bundle is protected by its location within the fibrous skeleton.`,
    origin: null,
    insertion: null,
    action: null,
    innervation: null,
    blood_supply: 'AV nodal artery, branches from left coronary artery',
    model_reference: 'conduction_bundle_his',
    image_references: [],
    difficulty_rating: 4,
    prerequisite_ids: ['thorax-conduction-av-node'],
  },
];

// ============================================================================
// Relationships Between Structures
// ============================================================================

const relationships: Omit<Relationship, 'id'>[] = [
  // Heart chamber relationships
  {
    source_structure_id: 'thorax-heart-right-atrium',
    target_structure_id: 'thorax-heart-right-ventricle',
    relationship_type: 'continuous_with' as RelationshipType,
    description: 'Right atrium connects to right ventricle through tricuspid valve',
    bidirectional: false,
    clinical_relevance: 'Tricuspid regurgitation causes backflow from RV to RA',
  },
  {
    source_structure_id: 'thorax-heart-left-atrium',
    target_structure_id: 'thorax-heart-left-ventricle',
    relationship_type: 'continuous_with' as RelationshipType,
    description: 'Left atrium connects to left ventricle through mitral valve',
    bidirectional: false,
    clinical_relevance: 'Mitral stenosis restricts flow from LA to LV causing LA enlargement',
  },
  {
    source_structure_id: 'thorax-heart-right-ventricle',
    target_structure_id: 'thorax-vessel-pulmonary-trunk',
    relationship_type: 'continuous_with' as RelationshipType,
    description: 'Right ventricle ejects blood into pulmonary trunk through pulmonary valve',
    bidirectional: false,
    clinical_relevance: 'Pulmonary stenosis increases RV afterload',
  },
  {
    source_structure_id: 'thorax-heart-left-ventricle',
    target_structure_id: 'thorax-vessel-aortic-arch',
    relationship_type: 'continuous_with' as RelationshipType,
    description: 'Left ventricle ejects blood into ascending aorta through aortic valve',
    bidirectional: false,
    clinical_relevance: 'Aortic stenosis increases LV afterload causing hypertrophy',
  },

  // Valve relationships
  {
    source_structure_id: 'thorax-valve-tricuspid',
    target_structure_id: 'thorax-heart-right-atrium',
    relationship_type: 'contains' as RelationshipType,
    description: 'Tricuspid valve separates right atrium from right ventricle',
    bidirectional: false,
    clinical_relevance: 'Tricuspid regurgitation visible on echocardiography',
  },
  {
    source_structure_id: 'thorax-valve-mitral',
    target_structure_id: 'thorax-heart-left-atrium',
    relationship_type: 'contains' as RelationshipType,
    description: 'Mitral valve separates left atrium from left ventricle',
    bidirectional: false,
    clinical_relevance: 'Mitral valve prolapse is common valvular abnormality',
  },

  // Great vessel relationships
  {
    source_structure_id: 'thorax-vessel-svc',
    target_structure_id: 'thorax-heart-right-atrium',
    relationship_type: 'drains_to' as RelationshipType,
    description: 'SVC drains deoxygenated blood from upper body into right atrium',
    bidirectional: false,
    clinical_relevance: 'SVC syndrome causes upper body venous congestion',
  },
  {
    source_structure_id: 'thorax-vessel-ivc',
    target_structure_id: 'thorax-heart-right-atrium',
    relationship_type: 'drains_to' as RelationshipType,
    description: 'IVC drains deoxygenated blood from lower body into right atrium',
    bidirectional: false,
    clinical_relevance: 'IVC diameter reflects volume status',
  },

  // Coronary artery relationships
  {
    source_structure_id: 'thorax-artery-left-coronary',
    target_structure_id: 'thorax-heart-left-ventricle',
    relationship_type: 'supplied_by' as RelationshipType,
    description: 'Left coronary artery supplies left ventricle, septum, and left atrium',
    bidirectional: false,
    clinical_relevance: 'LAD occlusion causes anterior wall MI',
  },
  {
    source_structure_id: 'thorax-artery-right-coronary',
    target_structure_id: 'thorax-heart-right-ventricle',
    relationship_type: 'supplied_by' as RelationshipType,
    description: 'Right coronary artery supplies right ventricle and inferior LV',
    bidirectional: false,
    clinical_relevance: 'RCA occlusion causes inferior wall MI',
  },

  // Respiratory relationships
  {
    source_structure_id: 'thorax-airway-trachea',
    target_structure_id: 'thorax-airway-right-main-bronchus',
    relationship_type: 'branch_of' as RelationshipType,
    description: 'Trachea bifurcates into right and left main bronchi at carina',
    bidirectional: false,
    clinical_relevance: 'Foreign bodies preferentially enter right bronchus',
  },
  {
    source_structure_id: 'thorax-airway-trachea',
    target_structure_id: 'thorax-airway-left-main-bronchus',
    relationship_type: 'branch_of' as RelationshipType,
    description: 'Trachea bifurcates into right and left main bronchi at carina',
    bidirectional: false,
    clinical_relevance: 'Left bronchus more horizontal, less common aspiration site',
  },
  {
    source_structure_id: 'thorax-airway-right-main-bronchus',
    target_structure_id: 'thorax-lung-right',
    relationship_type: 'supplies_by' as RelationshipType,
    description: 'Right main bronchus conducts air to right lung',
    bidirectional: false,
    clinical_relevance: 'Right main bronchus obstruction causes right lung collapse',
  },
  {
    source_structure_id: 'thorax-airway-left-main-bronchus',
    target_structure_id: 'thorax-lung-left',
    relationship_type: 'supplies_by' as RelationshipType,
    description: 'Left main bronchus conducts air to left lung',
    bidirectional: false,
    clinical_relevance: 'Left bronchus compression by enlarged LA or aortic aneurysm',
  },

  // Nerve relationships
  {
    source_structure_id: 'thorax-nerve-phrenic',
    target_structure_id: 'thorax-muscle-diaphragm',
    relationship_type: 'innervated_by' as RelationshipType,
    description: 'Phrenic nerve provides sole motor innervation to diaphragm',
    bidirectional: false,
    clinical_relevance: 'Phrenic nerve injury causes diaphragmatic paralysis',
  },
  {
    source_structure_id: 'thorax-nerve-vagus',
    target_structure_id: 'thorax-plexus-cardiac',
    relationship_type: 'branch_of' as RelationshipType,
    description: 'Vagus nerves contribute parasympathetic fibers to cardiac plexus',
    bidirectional: false,
    clinical_relevance: 'Vagal stimulation slows heart rate',
  },
  {
    source_structure_id: 'thorax-nerve-recurrent-laryngeal-left',
    target_structure_id: 'thorax-vessel-aortic-arch',
    relationship_type: 'passes_through' as RelationshipType,
    description: 'Left recurrent laryngeal nerve loops under aortic arch',
    bidirectional: false,
    clinical_relevance: 'Aortic aneurysm may compress nerve causing hoarseness',
  },
  {
    source_structure_id: 'thorax-nerve-intercostal',
    target_structure_id: 'thorax-muscle-intercostal-external',
    relationship_type: 'innervated_by' as RelationshipType,
    description: 'Intercostal nerves innervate intercostal muscles',
    bidirectional: false,
    clinical_relevance: 'Intercostal nerve blocks provide thoracic analgesia',
  },

  // Conduction system relationships
  {
    source_structure_id: 'thorax-conduction-sa-node',
    target_structure_id: 'thorax-conduction-av-node',
    relationship_type: 'continuous_with' as RelationshipType,
    description: 'Electrical impulse travels from SA node to AV node through atrial myocardium',
    bidirectional: false,
    clinical_relevance: 'SA node is primary pacemaker; AV node is secondary',
  },
  {
    source_structure_id: 'thorax-conduction-av-node',
    target_structure_id: 'thorax-conduction-bundle-his',
    relationship_type: 'continuous_with' as RelationshipType,
    description: 'AV node continues as bundle of His',
    bidirectional: false,
    clinical_relevance: 'AV nodal block prevents ventricular activation',
  },
  {
    source_structure_id: 'thorax-conduction-sa-node',
    target_structure_id: 'thorax-heart-right-atrium',
    relationship_type: 'contains' as RelationshipType,
    description: 'SA node located in superior posterolateral right atrium',
    bidirectional: false,
    clinical_relevance: 'SA node visible on specialized cardiac imaging',
  },
  {
    source_structure_id: 'thorax-plexus-cardiac',
    target_structure_id: 'thorax-conduction-sa-node',
    relationship_type: 'innervated_by' as RelationshipType,
    description: 'Cardiac plexus provides autonomic control of SA node',
    bidirectional: false,
    clinical_relevance: 'Autonomic dysfunction affects heart rate variability',
  },

  // Muscle relationships
  {
    source_structure_id: 'thorax-muscle-pectoralis-minor',
    target_structure_id: 'thorax-muscle-pectoralis-major',
    relationship_type: 'deep_to' as RelationshipType,
    description: 'Pectoralis minor lies deep to pectoralis major',
    bidirectional: false,
    clinical_relevance: 'Both muscles form anterior axillary wall',
  },
  {
    source_structure_id: 'thorax-muscle-intercostal-internal',
    target_structure_id: 'thorax-muscle-intercostal-external',
    relationship_type: 'deep_to' as RelationshipType,
    description: 'Internal intercostals lie deep to external intercostals',
    bidirectional: false,
    clinical_relevance: 'Neurovascular bundle runs between internal and innermost layers',
  },
  {
    source_structure_id: 'thorax-muscle-intercostal-external',
    target_structure_id: 'thorax-muscle-intercostal-internal',
    relationship_type: 'antagonist_to' as RelationshipType,
    description: 'External intercostals elevate ribs (inspiration), internal intercostals depress ribs (expiration)',
    bidirectional: true,
    clinical_relevance: 'Intercostal muscle coordination essential for breathing',
  },

  // Skeletal relationships
  {
    source_structure_id: 'thorax-bone-rib-1',
    target_structure_id: 'thorax-bone-sternum',
    relationship_type: 'articulates_with' as RelationshipType,
    description: 'First rib articulates with manubrium via first costal cartilage',
    bidirectional: true,
    clinical_relevance: 'First rib fractures indicate severe trauma',
  },
  {
    source_structure_id: 'thorax-bone-rib-typical',
    target_structure_id: 'thorax-vertebra-t1',
    relationship_type: 'articulates_with' as RelationshipType,
    description: 'Ribs articulate with thoracic vertebrae at costovertebral joints',
    bidirectional: true,
    clinical_relevance: 'Costovertebral joint arthritis causes thoracic back pain',
  },

  // Additional clinical relationships
  {
    source_structure_id: 'thorax-vessel-pulmonary-trunk',
    target_structure_id: 'thorax-lung-right',
    relationship_type: 'supplied_by' as RelationshipType,
    description: 'Pulmonary arteries carry deoxygenated blood to lungs for oxygenation',
    bidirectional: false,
    clinical_relevance: 'Pulmonary embolism obstructs pulmonary arteries',
  },
  {
    source_structure_id: 'thorax-vessel-pulmonary-trunk',
    target_structure_id: 'thorax-lung-left',
    relationship_type: 'supplied_by' as RelationshipType,
    description: 'Pulmonary arteries carry deoxygenated blood to lungs for oxygenation',
    bidirectional: false,
    clinical_relevance: 'Pulmonary embolism obstructs pulmonary arteries',
  },
  {
    source_structure_id: 'thorax-muscle-diaphragm',
    target_structure_id: 'thorax-lung-right',
    relationship_type: 'contains' as RelationshipType,
    description: 'Diaphragm forms inferior boundary of thoracic cavity containing lungs',
    bidirectional: false,
    clinical_relevance: 'Diaphragmatic paralysis reduces lung volumes',
  },
  {
    source_structure_id: 'thorax-muscle-diaphragm',
    target_structure_id: 'thorax-lung-left',
    relationship_type: 'contains' as RelationshipType,
    description: 'Diaphragm forms inferior boundary of thoracic cavity containing lungs',
    bidirectional: false,
    clinical_relevance: 'Diaphragmatic paralysis reduces lung volumes',
  },
];

// ============================================================================
// Export Seed Data
// ============================================================================

export const thoraxSeedData: ThoraxSeedData = {
  region,
  systems,
  structures,
  relationships,
};
