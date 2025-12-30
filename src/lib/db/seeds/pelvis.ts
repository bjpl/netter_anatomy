/**
 * Pelvis & Perineum Seed Data
 * Comprehensive anatomical structures, relationships, and clinical correlations
 * Atlas Plate Range: 329-399
 */

import { StructureType, RelationshipType } from '@/types';

// ============================================================================
// Type Definitions
// ============================================================================

interface SeedStructure {
  canonical_name: string;
  common_names: string[];
  latin_name: string | null;
  pronunciation_ipa: string;
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
  difficulty_rating: number;
  system_slugs: string[];
}

interface SeedRelationship {
  source_structure_name: string;
  target_structure_name: string;
  relationship_type: RelationshipType;
  description: string;
  bidirectional: boolean;
  clinical_relevance: string | null;
}

interface RegionSeedData {
  region: {
    name: string;
    slug: string;
    description: string;
    atlas_plate_range: string;
    color: string;
  };
  systems: string[];
  structures: SeedStructure[];
  relationships: SeedRelationship[];
}

// ============================================================================
// Pelvis & Perineum Seed Data
// ============================================================================

export const pelvisSeedData: RegionSeedData = {
  region: {
    name: 'Pelvis & Perineum',
    slug: 'pelvis-perineum',
    description: 'Pelvic bones, organs, and perineal structures including reproductive, urinary, and digestive systems',
    atlas_plate_range: '329-399',
    color: '#EC4899',
  },

  systems: [
    'skeletal',
    'muscular',
    'reproductive',
    'urinary',
    'nervous',
    'cardiovascular',
    'digestive',
  ],

  structures: [
    // ========================================================================
    // SKELETAL SYSTEM - Pelvic Bones
    // ========================================================================
    {
      canonical_name: 'Hip bone',
      common_names: ['Os coxae', 'Innominate bone', 'Pelvic bone'],
      latin_name: 'Os coxae',
      pronunciation_ipa: '/ɒs ˈkɒksiː/',
      structure_type: StructureType.BONE,
      parent_structure_id: null,
      definition_brief: 'Large irregular bone forming the lateral and anterior portions of the pelvis, composed of ilium, ischium, and pubis.',
      description_full: `The hip bone (os coxae) is a large, flattened irregular bone that forms the lateral wall of the pelvis. It consists of three fused bones: the ilium (superior), ischium (posteroinferior), and pubis (anteroinferior). These three bones meet at the acetabulum, a deep cup-shaped socket that articulates with the femoral head.

The ilium is the largest component, featuring the iliac crest superiorly, which serves as an attachment site for abdominal and back muscles. The ischium forms the posteroinferior portion and bears body weight when sitting. The pubis forms the anterior portion and articulates with its counterpart at the pubic symphysis.`,
      clinical_significance: 'Pelvic fractures often result from high-energy trauma and can be life-threatening due to associated hemorrhage from pelvic vessels. The greater sciatic notch is a common site for nerve entrapment. Pelvic dimensions are clinically important in obstetrics for assessing the adequacy of the birth canal.',
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: 'Branches of internal iliac artery, obturator artery',
      model_reference: 'hip_bone',
      difficulty_rating: 3,
      system_slugs: ['skeletal'],
    },
    {
      canonical_name: 'Ilium',
      common_names: ['Iliac bone'],
      latin_name: 'Os ilium',
      pronunciation_ipa: '/ˈɪliəm/',
      structure_type: StructureType.BONE,
      parent_structure_id: 'Hip bone',
      definition_brief: 'Superior and largest portion of the hip bone, featuring the iliac crest and iliac fossa.',
      description_full: `The ilium is the superior, fan-shaped portion of the hip bone. Its most prominent feature is the iliac crest, which extends from the anterior superior iliac spine (ASIS) to the posterior superior iliac spine (PSIS). The medial surface features the iliac fossa, a smooth concave surface that accommodates the iliacus muscle.

The lateral surface includes the gluteal lines (anterior, posterior, and inferior) that serve as attachment points for the gluteal muscles. The ilium contributes to the superior portion of the acetabulum and forms the greater sciatic notch posteriorly.`,
      clinical_significance: 'The ASIS is an important surgical landmark for abdominal and orthopedic procedures. The iliac crest is a common site for bone marrow biopsy and bone grafting. Avulsion fractures of the ASIS can occur in young athletes during forceful hip flexion.',
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: 'Iliolumbar artery, deep circumflex iliac artery',
      model_reference: 'ilium',
      difficulty_rating: 3,
      system_slugs: ['skeletal'],
    },
    {
      canonical_name: 'Ischium',
      common_names: ['Ischial bone', 'Sit bone'],
      latin_name: 'Os ischii',
      pronunciation_ipa: '/ˈɪskiəm/',
      structure_type: StructureType.BONE,
      parent_structure_id: 'Hip bone',
      definition_brief: 'Posteroinferior portion of the hip bone featuring the ischial tuberosity and ischial spine.',
      description_full: `The ischium forms the posteroinferior portion of the hip bone and consists of a body and ramus. The ischial body contributes to the acetabulum and contains the prominent ischial spine, which projects medially and separates the greater and lesser sciatic notches.

The ischial tuberosity is a large, rough prominence on the inferior aspect that bears body weight during sitting. The ischial ramus extends anteriorly to join with the inferior pubic ramus, forming the ischiopubic ramus that bounds the obturator foramen inferiorly.`,
      clinical_significance: 'The ischial tuberosity can develop bursitis from prolonged sitting. Avulsion fractures of the ischial tuberosity may occur in athletes during forceful hamstring contraction. The ischial spine is an important landmark during obstetric examination and for pudendal nerve blocks.',
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: 'Inferior gluteal artery, internal pudendal artery',
      model_reference: 'ischium',
      difficulty_rating: 3,
      system_slugs: ['skeletal'],
    },
    {
      canonical_name: 'Pubis',
      common_names: ['Pubic bone'],
      latin_name: 'Os pubis',
      pronunciation_ipa: '/ˈpjuːbɪs/',
      structure_type: StructureType.BONE,
      parent_structure_id: 'Hip bone',
      definition_brief: 'Anterior portion of the hip bone forming the pubic symphysis and contributing to the acetabulum.',
      description_full: `The pubis is the anterior component of the hip bone, consisting of a body and two rami (superior and inferior). The body contributes to the acetabulum and features the pubic crest and pubic tubercle on its superior surface.

The superior pubic ramus extends from the body to the pubic symphysis, a cartilaginous joint joining the two pubic bones in the midline. The inferior pubic ramus descends to join with the ischial ramus. Together with the opposite pubis, it forms the pubic arch, whose angle is wider in females (80-85°) than males (50-60°).`,
      clinical_significance: 'Pubic stress fractures are common in runners and military recruits. Athletic pubalgia (sports hernia) involves pain and weakness in the pubic region. The pubic tubercle is an important landmark for inguinal hernia repair and serves as the medial attachment of the inguinal ligament.',
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: 'Obturator artery, inferior epigastric artery',
      model_reference: 'pubis',
      difficulty_rating: 3,
      system_slugs: ['skeletal'],
    },
    {
      canonical_name: 'Sacrum',
      common_names: ['Sacral bone'],
      latin_name: 'Os sacrum',
      pronunciation_ipa: '/ˈseɪkrəm/',
      structure_type: StructureType.BONE,
      parent_structure_id: null,
      definition_brief: 'Triangular bone formed by fusion of five sacral vertebrae, articulating with the hip bones at the sacroiliac joints.',
      description_full: `The sacrum is a large triangular bone formed by the fusion of the five sacral vertebrae (S1-S5). It forms the posterior wall of the pelvis and articulates superiorly with L5 at the lumbosacral joint, laterally with the iliac bones at the sacroiliac joints, and inferiorly with the coccyx.

The anterior (pelvic) surface is concave and smooth, featuring four pairs of anterior sacral foramina for passage of ventral rami of sacral nerves. The posterior surface is convex and rough, with four pairs of posterior sacral foramina and the median sacral crest. The sacral canal contains the cauda equina and filum terminale.`,
      clinical_significance: 'Sacral fractures often result from high-energy trauma and may be associated with neurological injury. The sacral hiatus is used for caudal epidural anesthesia. Sacroiliac joint dysfunction is a common cause of lower back pain. The sacral promontory is an important obstetric landmark.',
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: 'Lateral sacral arteries, median sacral artery',
      model_reference: 'sacrum',
      difficulty_rating: 3,
      system_slugs: ['skeletal'],
    },
    {
      canonical_name: 'Coccyx',
      common_names: ['Tailbone'],
      latin_name: 'Os coccygis',
      pronunciation_ipa: '/ˈkɒksɪks/',
      structure_type: StructureType.BONE,
      parent_structure_id: null,
      definition_brief: 'Small triangular bone at the base of the vertebral column, formed by fusion of 3-5 coccygeal vertebrae.',
      description_full: `The coccyx is a small triangular bone at the inferior end of the vertebral column, typically formed by fusion of 3-5 rudimentary vertebrae. It articulates with the sacrum at the sacrococcygeal joint, which may be fused or remain mobile.

The coccyx serves as an attachment site for several muscles and ligaments, including the gluteus maximus, coccygeus, levator ani, and the anococcygeal ligament. It also provides support to the pelvic floor and contributes to weight distribution when sitting.`,
      clinical_significance: 'Coccydynia (coccyx pain) commonly results from falls or prolonged sitting on hard surfaces. Coccygeal fractures may occur from direct trauma. The coccyx can be palpated through the natal cleft and may require manipulation or injection for pain management. Rarely, surgical removal (coccygectomy) is performed for intractable pain.',
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: 'Median sacral artery, lateral sacral arteries',
      model_reference: 'coccyx',
      difficulty_rating: 2,
      system_slugs: ['skeletal'],
    },
    {
      canonical_name: 'Obturator foramen',
      common_names: ['Thyroid foramen'],
      latin_name: 'Foramen obturatum',
      pronunciation_ipa: '/fəˈreɪmən ɒbˈtjʊərətəm/',
      structure_type: StructureType.OTHER,
      parent_structure_id: 'Hip bone',
      definition_brief: 'Large opening in the hip bone bounded by the pubis and ischium, largely closed by the obturator membrane.',
      description_full: `The obturator foramen is a large opening in the anteroinferior portion of the hip bone, bounded by the pubic and ischial rami. It is the largest foramen in the human skeleton. In life, the foramen is almost completely closed by the obturator membrane, except for a small gap superolaterally (the obturator canal) through which the obturator vessels and nerve pass.

The foramen is larger and more oval in males, smaller and more triangular in females. It provides attachment for the obturator membrane and serves as the origin for the obturator externus and internus muscles.`,
      clinical_significance: 'Obturator hernias, though rare, occur when abdominal contents protrude through the obturator canal. This is more common in elderly, thin women. Compression of the obturator nerve in the canal can cause medial thigh pain and weakness of thigh adduction.',
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: null,
      model_reference: 'obturator_foramen',
      difficulty_rating: 2,
      system_slugs: ['skeletal'],
    },

    // ========================================================================
    // MUSCULAR SYSTEM - Pelvic Floor
    // ========================================================================
    {
      canonical_name: 'Levator ani',
      common_names: ['Pelvic floor muscle'],
      latin_name: 'Musculus levator ani',
      pronunciation_ipa: '/lɪˈveɪtər ˈeɪnaɪ/',
      structure_type: StructureType.MUSCLE,
      parent_structure_id: null,
      definition_brief: 'Broad muscular sheet forming the main component of the pelvic floor, supporting pelvic viscera.',
      description_full: `The levator ani is a broad, thin muscular sheet that forms the greater part of the pelvic floor. It consists of three parts: pubococcygeus, puborectalis, and iliococcygeus. Together, these muscles create a funnel-shaped diaphragm that supports the pelvic viscera and assists in maintaining continence.

The pubococcygeus arises from the pubis and inserts into the coccyx and anococcygeal ligament. The puborectalis forms a U-shaped sling around the anorectal junction, creating the anorectal angle crucial for fecal continence. The iliococcygeus extends from the ischial spine and pelvic sidewall to the coccyx and anococcygeal ligament.`,
      clinical_significance: 'Damage to the levator ani during childbirth can lead to pelvic organ prolapse and stress urinary incontinence. Levator ani syndrome causes chronic pelvic pain and spasm. Pelvic floor exercises (Kegel exercises) strengthen these muscles to prevent or treat incontinence and prolapse.',
      origin: 'Pubis, ischial spine, obturator fascia',
      insertion: 'Coccyx, anococcygeal ligament, perineal body',
      action: 'Supports pelvic viscera, maintains continence, elevates pelvic floor',
      innervation: 'Nerve to levator ani (S3-S4), pudendal nerve (S2-S4)',
      blood_supply: 'Inferior gluteal artery, internal pudendal artery',
      model_reference: 'levator_ani',
      difficulty_rating: 4,
      system_slugs: ['muscular'],
    },
    {
      canonical_name: 'Pubococcygeus',
      common_names: ['PC muscle'],
      latin_name: 'Musculus pubococcygeus',
      pronunciation_ipa: '/ˌpjuːboʊkɒkˈsɪdʒiəs/',
      structure_type: StructureType.MUSCLE,
      parent_structure_id: 'Levator ani',
      definition_brief: 'Medial component of levator ani extending from pubis to coccyx, supporting pelvic organs.',
      description_full: `The pubococcygeus is the main and most medial component of the levator ani. It arises from the posterior surface of the pubis and anterior part of the obturator fascia, passing posteriorly to insert into the coccyx and anococcygeal ligament.

Fibers of the pubococcygeus may blend with the prostate or vagina (levator prostatae or pubovaginalis), providing additional support to these structures. The muscle forms the medial border of the levator hiatus through which the urethra, vagina (in females), and anal canal pass.`,
      clinical_significance: 'The pubococcygeus is the primary target of Kegel exercises for strengthening the pelvic floor. Weakness contributes to stress urinary incontinence and pelvic organ prolapse. During childbirth, excessive stretching or tearing can lead to permanent dysfunction.',
      origin: 'Pubis, anterior obturator fascia',
      insertion: 'Coccyx, anococcygeal ligament',
      action: 'Supports pelvic organs, maintains urinary continence',
      innervation: 'Nerve to levator ani (S3-S4)',
      blood_supply: 'Inferior gluteal artery, internal pudendal artery',
      model_reference: 'pubococcygeus',
      difficulty_rating: 4,
      system_slugs: ['muscular'],
    },
    {
      canonical_name: 'Puborectalis',
      common_names: ['Puborectal sling'],
      latin_name: 'Musculus puborectalis',
      pronunciation_ipa: '/ˌpjuːboʊrɛkˈteɪlɪs/',
      structure_type: StructureType.MUSCLE,
      parent_structure_id: 'Levator ani',
      definition_brief: 'U-shaped muscle sling around the anorectal junction, maintaining the anorectal angle for fecal continence.',
      description_full: `The puborectalis is a U-shaped muscle that forms a sling around the anorectal junction. It arises from the posterior surface of the pubis and passes posteriorly on either side of the rectum, forming a loop without inserting into the coccyx. This sling pulls the anorectal junction anteriorly, creating an approximately 90-degree anorectal angle.

The anorectal angle is crucial for maintaining fecal continence at rest. During defecation, the puborectalis relaxes, straightening the anorectal angle and facilitating passage of stool. The muscle also contributes to the resistance felt during digital rectal examination.`,
      clinical_significance: 'Paradoxical contraction of the puborectalis during defecation leads to obstructed defecation syndrome. Damage during childbirth or surgery can result in fecal incontinence. The anorectal angle is assessed during defecography to evaluate pelvic floor dysfunction.',
      origin: 'Pubis (posterior surface)',
      insertion: 'Forms sling without bony insertion',
      action: 'Maintains anorectal angle, maintains fecal continence',
      innervation: 'Nerve to levator ani (S3-S4), pudendal nerve',
      blood_supply: 'Inferior gluteal artery, middle rectal artery',
      model_reference: 'puborectalis',
      difficulty_rating: 4,
      system_slugs: ['muscular'],
    },
    {
      canonical_name: 'Iliococcygeus',
      common_names: [],
      latin_name: 'Musculus iliococcygeus',
      pronunciation_ipa: '/ˌɪliəkɒkˈsɪdʒiəs/',
      structure_type: StructureType.MUSCLE,
      parent_structure_id: 'Levator ani',
      definition_brief: 'Lateral component of levator ani extending from the ischial spine to the coccyx.',
      description_full: `The iliococcygeus is the lateral and posterior component of the levator ani. It arises from the ischial spine and posterior part of the tendinous arch of the obturator fascia, extending medially and posteriorly to insert into the coccyx and anococcygeal ligament.

The iliococcygeus is thinner and more horizontal than the other components of levator ani. It forms the lateral boundary of the pelvic floor and contributes to the formation of the levator plate, a horizontal shelf that supports the pelvic viscera.`,
      clinical_significance: 'The iliococcygeus contributes to pelvic floor support and may be involved in pelvic floor dysfunction syndromes. During pelvic floor repair surgery, the iliococcygeus may be plicated to provide additional support.',
      origin: 'Ischial spine, obturator fascia (posterior)',
      insertion: 'Coccyx, anococcygeal ligament',
      action: 'Supports pelvic floor, elevates pelvic organs',
      innervation: 'Nerve to levator ani (S3-S4)',
      blood_supply: 'Inferior gluteal artery, internal pudendal artery',
      model_reference: 'iliococcygeus',
      difficulty_rating: 4,
      system_slugs: ['muscular'],
    },
    {
      canonical_name: 'Coccygeus',
      common_names: ['Ischiococcygeus'],
      latin_name: 'Musculus coccygeus',
      pronunciation_ipa: '/kɒkˈsɪdʒiəs/',
      structure_type: StructureType.MUSCLE,
      parent_structure_id: null,
      definition_brief: 'Triangular muscle of the pelvic floor extending from ischial spine to sacrum and coccyx.',
      description_full: `The coccygeus (ischiococcygeus) is a small triangular muscle that lies posterior to the levator ani on the pelvic floor. It arises from the ischial spine and sacrospinous ligament, inserting into the lateral borders of the lower sacrum and upper coccyx.

The coccygeus is closely related to the sacrospinous ligament, which it covers and reinforces. It forms the posterior portion of the pelvic diaphragm and helps to close the pelvic outlet. The muscle is often partly or entirely replaced by fibrous tissue.`,
      clinical_significance: 'The coccygeus may be involved in coccydynia and pelvic floor pain syndromes. The pudendal nerve passes medial to the ischial spine and can be anesthetized here for pudendal nerve blocks during childbirth or perineal surgery.',
      origin: 'Ischial spine, sacrospinous ligament',
      insertion: 'Lateral sacrum and coccyx (S4-Co1)',
      action: 'Supports pelvic floor, flexes coccyx',
      innervation: 'Branches from S4-S5',
      blood_supply: 'Inferior gluteal artery',
      model_reference: 'coccygeus',
      difficulty_rating: 3,
      system_slugs: ['muscular'],
    },
    {
      canonical_name: 'External anal sphincter',
      common_names: ['Sphincter ani externus'],
      latin_name: 'Musculus sphincter ani externus',
      pronunciation_ipa: '/ˈsfɪŋktər ˈeɪnaɪ ɛksˈtɜːrnəs/',
      structure_type: StructureType.MUSCLE,
      parent_structure_id: null,
      definition_brief: 'Voluntary skeletal muscle sphincter surrounding the anal canal, maintaining fecal continence.',
      description_full: `The external anal sphincter is a voluntary skeletal muscle that surrounds the anal canal and consists of three parts: subcutaneous, superficial, and deep. The muscle is under conscious control and maintains fecal continence by tonic contraction at rest and voluntary contraction during increases in intra-abdominal pressure.

The subcutaneous part surrounds the anal orifice. The superficial part extends from the perineal body to the coccyx. The deep part encircles the anal canal and blends with the puborectalis. Together with the internal anal sphincter (smooth muscle), it provides dual sphincteric control of defecation.`,
      clinical_significance: 'Damage to the external anal sphincter during childbirth or surgery can result in fecal incontinence. Anal fissures may cause sphincter spasm and pain. Lateral internal sphincterotomy may be performed for chronic anal fissures. Sphincter-preserving surgery is preferred for low rectal cancers.',
      origin: 'Perineal body, anococcygeal ligament',
      insertion: 'Surrounds anal canal',
      action: 'Maintains fecal continence, voluntary contraction',
      innervation: 'Inferior rectal nerve (branch of pudendal, S2-S4)',
      blood_supply: 'Inferior rectal artery',
      model_reference: 'external_anal_sphincter',
      difficulty_rating: 3,
      system_slugs: ['muscular'],
    },
    {
      canonical_name: 'External urethral sphincter',
      common_names: ['Sphincter urethrae'],
      latin_name: 'Musculus sphincter urethrae',
      pronunciation_ipa: '/ˈsfɪŋktər jʊˈriːθriː/',
      structure_type: StructureType.MUSCLE,
      parent_structure_id: null,
      definition_brief: 'Voluntary skeletal muscle sphincter of the membranous urethra, providing conscious urinary control.',
      description_full: `The external urethral sphincter is a voluntary striated muscle that surrounds the membranous urethra in males and the middle portion of the urethra in females. It forms part of the urogenital diaphragm and provides voluntary control of urination.

In males, the sphincter surrounds the membranous urethra below the prostate. In females, it encircles the urethra as it passes through the urogenital diaphragm. The muscle maintains urinary continence through tonic contraction and can be voluntarily contracted to interrupt urination.`,
      clinical_significance: 'Damage to the external urethral sphincter during prostatectomy or urethral surgery can lead to urinary incontinence. The sphincter can be strengthened through pelvic floor exercises. Artificial urinary sphincters may be implanted for severe incontinence. Urethral strictures may impair sphincter function.',
      origin: 'Pubic rami, urogenital diaphragm',
      insertion: 'Surrounds membranous urethra',
      action: 'Maintains urinary continence, voluntary urethral closure',
      innervation: 'Pudendal nerve (S2-S4)',
      blood_supply: 'Internal pudendal artery',
      model_reference: 'external_urethral_sphincter',
      difficulty_rating: 3,
      system_slugs: ['muscular'],
    },
    {
      canonical_name: 'Deep transverse perineal muscle',
      common_names: [],
      latin_name: 'Musculus transversus perinei profundus',
      pronunciation_ipa: '/trænzˈvɜːrsəs pɛrɪˈniːaɪ prəˈfʌndəs/',
      structure_type: StructureType.MUSCLE,
      parent_structure_id: null,
      definition_brief: 'Paired muscle forming the urogenital diaphragm, supporting the pelvic floor.',
      description_full: `The deep transverse perineal muscle is a paired muscle that extends transversely across the urogenital triangle, forming part of the urogenital diaphragm. It arises from the ischiopubic ramus and passes medially to insert into the perineal body and external anal sphincter.

Together with the external urethral sphincter and surrounding fascia, it forms the urogenital diaphragm, which provides additional support to the pelvic floor in the anterior perineum. The muscle is often poorly developed and may be absent in some individuals.`,
      clinical_significance: 'The deep transverse perineal muscle contributes to pelvic floor support and may be involved in pelvic floor dysfunction. It may be damaged during perineal tears or episiotomy during childbirth.',
      origin: 'Ischiopubic ramus',
      insertion: 'Perineal body',
      action: 'Supports pelvic floor, stabilizes perineal body',
      innervation: 'Pudendal nerve (S2-S4)',
      blood_supply: 'Internal pudendal artery',
      model_reference: 'deep_transverse_perineal',
      difficulty_rating: 3,
      system_slugs: ['muscular'],
    },
    {
      canonical_name: 'Superficial transverse perineal muscle',
      common_names: [],
      latin_name: 'Musculus transversus perinei superficialis',
      pronunciation_ipa: '/trænzˈvɜːrsəs pɛrɪˈniːaɪ ˌsuːpərˈfɪʃəlɪs/',
      structure_type: StructureType.MUSCLE,
      parent_structure_id: null,
      definition_brief: 'Small paired muscle of the superficial perineal space, stabilizing the perineal body.',
      description_full: `The superficial transverse perineal muscle is a small paired muscle that lies in the superficial perineal space. It arises from the ischial tuberosity and passes medially to insert into the perineal body.

The muscle is variable in size and may be absent in some individuals. It contributes to the support of the perineal body and helps to fix this important structure in the midline. It lies superficial to the deep transverse perineal muscle.`,
      clinical_significance: 'The superficial transverse perineal muscle provides support to the perineal body and may be torn during childbirth. Damage to the perineal body can result in pelvic floor weakness and perineal descent.',
      origin: 'Ischial tuberosity',
      insertion: 'Perineal body',
      action: 'Stabilizes perineal body',
      innervation: 'Pudendal nerve (S2-S4)',
      blood_supply: 'Internal pudendal artery',
      model_reference: 'superficial_transverse_perineal',
      difficulty_rating: 2,
      system_slugs: ['muscular'],
    },

    // ========================================================================
    // MUSCULAR SYSTEM - Pelvic Wall
    // ========================================================================
    {
      canonical_name: 'Obturator internus',
      common_names: ['Internal obturator'],
      latin_name: 'Musculus obturatorius internus',
      pronunciation_ipa: '/ɒbˈtjʊərətɔːriəs ɪnˈtɜːrnəs/',
      structure_type: StructureType.MUSCLE,
      parent_structure_id: null,
      definition_brief: 'Muscle arising from the pelvic surface of the obturator membrane, laterally rotating the hip.',
      description_full: `The obturator internus is a fan-shaped muscle that arises from the pelvic surface of the obturator membrane and surrounding bone. It exits the pelvis through the lesser sciatic foramen, making a sharp 90-degree turn around the ischium, and inserts onto the greater trochanter of the femur.

The muscle forms much of the lateral wall of the pelvis and is covered medially by the obturator fascia. Two gemellus muscles (superior and inferior) attach to the obturator internus tendon, acting together as the triceps coxae.`,
      clinical_significance: 'Obturator internus syndrome can cause deep gluteal pain and may mimic sciatica. The muscle can entrap the pudendal nerve as it exits the lesser sciatic foramen. MRI may show muscle edema in inflammatory conditions.',
      origin: 'Obturator membrane and surrounding bone (internal surface)',
      insertion: 'Greater trochanter of femur (medial surface)',
      action: 'Lateral rotation of hip, abduction of flexed hip',
      innervation: 'Nerve to obturator internus (L5-S2)',
      blood_supply: 'Obturator artery, internal pudendal artery',
      model_reference: 'obturator_internus',
      difficulty_rating: 4,
      system_slugs: ['muscular'],
    },
    {
      canonical_name: 'Piriformis',
      common_names: [],
      latin_name: 'Musculus piriformis',
      pronunciation_ipa: '/pɪrɪˈfɔːrmɪs/',
      structure_type: StructureType.MUSCLE,
      parent_structure_id: null,
      definition_brief: 'Pyramidal muscle extending from sacrum to femur through greater sciatic foramen, laterally rotating the hip.',
      description_full: `The piriformis is a pyramidal muscle that arises from the anterior surface of the sacrum (S2-S4) and exits the pelvis through the greater sciatic foramen. It inserts onto the superior aspect of the greater trochanter of the femur.

The piriformis is an important anatomical landmark in the gluteal region. The sciatic nerve typically emerges inferior to the muscle, though anatomical variations are common (nerve passing through or superior to the muscle in ~20% of individuals). The muscle divides the greater sciatic foramen into suprapiriform and infrapiriform foramina.`,
      clinical_significance: 'Piriformis syndrome occurs when the muscle compresses the sciatic nerve, causing pain, numbness, and tingling in the buttock and down the leg. This condition may mimic lumbar disc herniation. Anatomical variations in the relationship between piriformis and sciatic nerve may predispose to compression.',
      origin: 'Anterior sacrum (S2-S4)',
      insertion: 'Greater trochanter of femur (superior aspect)',
      action: 'Lateral rotation of hip, abduction of flexed hip',
      innervation: 'Nerve to piriformis (S1-S2)',
      blood_supply: 'Superior and inferior gluteal arteries',
      model_reference: 'piriformis',
      difficulty_rating: 3,
      system_slugs: ['muscular'],
    },

    // ========================================================================
    // REPRODUCTIVE SYSTEM - Male
    // ========================================================================
    {
      canonical_name: 'Prostate',
      common_names: ['Prostate gland'],
      latin_name: 'Prostata',
      pronunciation_ipa: '/ˈprɒsteɪt/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Walnut-sized gland surrounding the male urethra, producing fluid component of semen.',
      description_full: `The prostate is a fibromuscular gland about the size and shape of a walnut, weighing approximately 20 grams in young adults. It surrounds the prostatic urethra and is located inferior to the bladder, anterior to the rectum, and superior to the urogenital diaphragm.

The gland consists of peripheral, central, and transition zones. The peripheral zone (70% of glandular tissue) is the site of most prostate cancers. The transition zone surrounds the urethra and undergoes benign hyperplasia with age. The prostate produces prostatic fluid, which comprises 25-30% of seminal fluid and contains enzymes, citric acid, and prostate-specific antigen (PSA).`,
      clinical_significance: 'Benign prostatic hyperplasia (BPH) causes urinary obstruction in older men. Prostate cancer is the most common cancer in men, typically arising in the peripheral zone. Prostatitis can be acute or chronic. Digital rectal examination and PSA testing are used for screening. The prostate can be accessed surgically via transurethral, retropubic, or perineal approaches.',
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Inferior hypogastric plexus (sympathetic and parasympathetic)',
      blood_supply: 'Prostatic branches of inferior vesical and middle rectal arteries',
      model_reference: 'prostate',
      difficulty_rating: 3,
      system_slugs: ['reproductive', 'urinary'],
    },
    {
      canonical_name: 'Seminal vesicle',
      common_names: ['Seminal gland'],
      latin_name: 'Glandula seminalis',
      pronunciation_ipa: '/ˈsɛmɪnəl ˈvɛsɪkəl/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Paired coiled glands posterior to the bladder, producing most of the seminal fluid volume.',
      description_full: `The seminal vesicles are paired, elongated, coiled glands located between the bladder and rectum. Each measures approximately 5 cm in length when uncoiled. The seminal vesicles produce an alkaline, viscous fluid rich in fructose, prostaglandins, and other substances that constitute about 70% of seminal fluid volume.

The duct of each seminal vesicle joins with the corresponding vas deferens to form the ejaculatory duct, which passes through the prostate to open into the prostatic urethra. The seminal vesicles lie lateral to the vas deferens and superior to the prostate.`,
      clinical_significance: 'Seminal vesicle cysts may cause pain or urinary symptoms. Infection (seminal vesiculitis) often accompanies prostatitis. Agenesis or hypoplasia may cause male infertility. Seminal vesicle invasion is an important staging criterion in prostate cancer. Transrectal ultrasound or MRI can visualize the seminal vesicles.',
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Inferior hypogastric plexus',
      blood_supply: 'Deferential artery, inferior vesical artery',
      model_reference: 'seminal_vesicle',
      difficulty_rating: 3,
      system_slugs: ['reproductive'],
    },
    {
      canonical_name: 'Vas deferens',
      common_names: ['Ductus deferens', 'Sperm duct'],
      latin_name: 'Ductus deferens',
      pronunciation_ipa: '/væs ˈdɛfərɛnz/',
      structure_type: StructureType.OTHER,
      parent_structure_id: null,
      definition_brief: 'Muscular tube transporting sperm from the epididymis to the ejaculatory duct.',
      description_full: `The vas deferens is a thick-walled muscular tube, approximately 45 cm long, that transports sperm from the epididymis to the ejaculatory duct. It begins at the tail of the epididymis, ascends in the spermatic cord through the inguinal canal, crosses over the external iliac vessels, and descends along the lateral wall of the pelvis.

The terminal dilated portion (ampulla) joins with the seminal vesicle duct to form the ejaculatory duct. The thick muscular wall contains three layers (inner longitudinal, middle circular, outer longitudinal) that propel sperm during ejaculation through peristaltic contractions.`,
      clinical_significance: 'Vasectomy involves cutting and sealing the vas deferens for male sterilization. The vas can be palpated in the spermatic cord during physical examination. Congenital bilateral absence of the vas deferens (CBAVD) is associated with cystic fibrosis mutations and causes obstructive azoospermia. Vasal injury during hernia repair may cause infertility.',
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Testicular plexus (sympathetic)',
      blood_supply: 'Deferential artery (from superior or inferior vesical artery)',
      model_reference: 'vas_deferens',
      difficulty_rating: 2,
      system_slugs: ['reproductive'],
    },
    {
      canonical_name: 'Ejaculatory duct',
      common_names: [],
      latin_name: 'Ductus ejaculatorius',
      pronunciation_ipa: '/ˈdʌktəs ɪˈdʒækjʊlətɔːriəs/',
      structure_type: StructureType.OTHER,
      parent_structure_id: null,
      definition_brief: 'Short duct formed by union of vas deferens and seminal vesicle duct, passing through the prostate.',
      description_full: `The ejaculatory duct is a short paired duct, approximately 2 cm long, formed by the union of the ampulla of the vas deferens and the duct of the seminal vesicle. Each duct passes anteroinferiorly through the substance of the prostate gland to open into the prostatic urethra at the seminal colliculus, on either side of the prostatic utricle.

During ejaculation, the ducts convey seminal fluid (from seminal vesicles) and sperm (from vas deferens) into the prostatic urethra, where they mix with prostatic secretions.`,
      clinical_significance: 'Ejaculatory duct obstruction can cause male infertility, pelvic pain, and hemospermia. Obstruction may be congenital or acquired (from cysts, calculi, or inflammation). Transurethral resection of the ejaculatory ducts (TURED) may be performed for obstruction. Imaging with transrectal ultrasound or MRI can identify cysts or stones.',
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Inferior hypogastric plexus',
      blood_supply: 'Prostatic branches of inferior vesical artery',
      model_reference: 'ejaculatory_duct',
      difficulty_rating: 3,
      system_slugs: ['reproductive'],
    },
    {
      canonical_name: 'Bulbourethral gland',
      common_names: ["Cowper's gland"],
      latin_name: 'Glandula bulbourethralis',
      pronunciation_ipa: '/ˌbʌlboʊjʊˈriːθrəl/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Paired pea-sized glands in the urogenital diaphragm, secreting pre-ejaculatory fluid into the urethra.',
      description_full: `The bulbourethral glands (Cowper's glands) are paired, pea-sized glands located within the urogenital diaphragm, posterolateral to the membranous urethra. Each gland is approximately 1 cm in diameter and has a duct 2-3 cm long that opens into the proximal bulbar urethra.

The glands secrete a clear, slippery mucus-like fluid (pre-ejaculate) during sexual arousal that helps lubricate the urethra and neutralize acidity from residual urine. This secretion occurs before ejaculation and may contain small numbers of sperm.`,
      clinical_significance: 'Bulbourethral gland cysts may cause urinary symptoms or perineal pain. Infection (cowperitis) is rare but may occur with urethritis. The pre-ejaculate secretion can transmit sexually transmitted infections and may contain sperm, making withdrawal an unreliable contraceptive method. Syringoceles (cystic dilation of the duct) may be seen on urethrography.',
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Pudendal nerve',
      blood_supply: 'Branches of internal pudendal artery',
      model_reference: 'bulbourethral_gland',
      difficulty_rating: 2,
      system_slugs: ['reproductive'],
    },

    // ========================================================================
    // REPRODUCTIVE SYSTEM - Female
    // ========================================================================
    {
      canonical_name: 'Uterus',
      common_names: ['Womb'],
      latin_name: 'Uterus',
      pronunciation_ipa: '/ˈjuːtərəs/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Hollow muscular organ where fetal development occurs, consisting of fundus, body, and cervix.',
      description_full: `The uterus is a thick-walled, pear-shaped muscular organ located in the pelvis between the bladder and rectum. In nulliparous women, it measures approximately 7.5 cm long, 5 cm wide, and 2.5 cm thick. The organ consists of three parts: fundus (superior rounded portion above uterine tube openings), body (major portion), and cervix (inferior narrow portion).

The uterine wall has three layers: endometrium (inner mucosa that sheds during menstruation), myometrium (thick smooth muscle layer), and perimetrium (outer serous layer, part of peritoneum). The uterine cavity is triangular in coronal section and slit-like in sagittal section. The normal uterus is anteverted (tilted forward) and anteflexed (bent forward).`,
      clinical_significance: 'Uterine fibroids (leiomyomas) are common benign tumors. Endometriosis involves endometrial tissue outside the uterus. Uterine prolapse results from pelvic floor weakness. Endometrial cancer is the most common gynecologic malignancy. Cesarean section involves surgical incision of the uterus. Hysterectomy (surgical removal) is performed for various conditions.',
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Uterovaginal plexus (sympathetic T10-L1, parasympathetic S2-S4)',
      blood_supply: 'Uterine artery (from internal iliac), ovarian artery',
      model_reference: 'uterus',
      difficulty_rating: 3,
      system_slugs: ['reproductive'],
    },
    {
      canonical_name: 'Ovary',
      common_names: ['Female gonad'],
      latin_name: 'Ovarium',
      pronunciation_ipa: '/ˈoʊvəri/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Paired almond-shaped glands producing ova and female sex hormones.',
      description_full: `The ovaries are paired almond-shaped organs located on the lateral pelvic wall, suspended by the ovarian ligament (to uterus), suspensory ligament (containing vessels and nerves), and mesovarium (part of broad ligament). Each ovary measures approximately 3 × 2 × 1 cm and weighs 5-10 grams.

The ovary consists of an outer cortex (containing follicles in various stages of development) and inner medulla (containing blood vessels, nerves, and connective tissue). The ovary produces ova through ovulation and secretes sex hormones (estrogen and progesterone). The surface is covered by a single layer of cuboidal epithelium (germinal epithelium).`,
      clinical_significance: 'Ovarian cysts are common and usually benign. Polycystic ovary syndrome (PCOS) causes hormonal imbalance and fertility issues. Ovarian torsion is a surgical emergency. Ovarian cancer has poor prognosis due to late detection. Ectopic pregnancy may occur in the ovary. Oophorectomy (surgical removal) may be performed for various conditions.',
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Ovarian plexus (sympathetic T10-L1)',
      blood_supply: 'Ovarian artery (from abdominal aorta)',
      model_reference: 'ovary',
      difficulty_rating: 3,
      system_slugs: ['reproductive', 'endocrine'],
    },
    {
      canonical_name: 'Fallopian tube',
      common_names: ['Uterine tube', 'Oviduct'],
      latin_name: 'Tuba uterina',
      pronunciation_ipa: '/fəˈloʊpiən tuːb/',
      structure_type: StructureType.OTHER,
      parent_structure_id: null,
      definition_brief: 'Paired muscular tubes extending from the ovary to the uterus, site of fertilization.',
      description_full: `The fallopian tubes (uterine tubes) are paired muscular tubes, approximately 10-12 cm long, that extend laterally from the superior angles of the uterus to the ovaries. Each tube consists of four parts: intramural (within uterine wall), isthmus (narrow medial portion), ampulla (wide lateral portion where fertilization typically occurs), and infundibulum (funnel-shaped end with fimbriae).

The fimbriae are finger-like projections at the open end that help capture the ovulated egg. The tube wall has three layers: mucosa (with ciliated cells and secretory cells), muscularis (smooth muscle for peristalsis), and serosa. The tubes transport ova toward the uterus and sperm toward the ampulla for fertilization.`,
      clinical_significance: 'Ectopic pregnancy most commonly occurs in the ampulla and is life-threatening if ruptured. Pelvic inflammatory disease (PID) can cause tubal scarring and infertility. Hydrosalpinx (fluid-filled tube) reduces fertility. Tubal ligation is a common sterilization method. Salpingectomy may be performed for ectopic pregnancy or cancer. In vitro fertilization bypasses tubal function.',
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Ovarian and uterine plexuses',
      blood_supply: 'Uterine and ovarian arteries',
      model_reference: 'fallopian_tube',
      difficulty_rating: 3,
      system_slugs: ['reproductive'],
    },
    {
      canonical_name: 'Vagina',
      common_names: ['Birth canal'],
      latin_name: 'Vagina',
      pronunciation_ipa: '/vəˈdʒaɪnə/',
      structure_type: StructureType.OTHER,
      parent_structure_id: null,
      definition_brief: 'Fibromuscular tube extending from the uterine cervix to the vestibule of the external genitalia.',
      description_full: `The vagina is a fibromuscular tube approximately 7-10 cm long that extends from the uterine cervix to the vestibule. It is located between the bladder/urethra anteriorly and the rectum/anal canal posteriorly. The cervix projects into the superior vagina, creating recesses called fornices (anterior, posterior, and two lateral).

The vaginal wall has three layers: mucosa (stratified squamous epithelium without glands), muscularis (smooth muscle), and adventitia (connective tissue). The anterior and posterior walls normally lie in contact, with the lumen appearing H-shaped in cross-section. The vagina serves as the birth canal during delivery and the excretory duct for menstrual flow.`,
      clinical_significance: 'Vaginal atrophy occurs after menopause. Pelvic organ prolapse may involve the vaginal walls (cystocele, rectocele). Vaginal infections (vaginitis) are common. The posterior fornix provides access for culdocentesis. Vaginal birth may cause perineal tears. Vaginal cancer is rare. The vagina is examined during pelvic examination and Pap smear.',
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Uterovaginal plexus, pudendal nerve (inferior portion)',
      blood_supply: 'Vaginal artery, uterine artery, internal pudendal artery',
      model_reference: 'vagina',
      difficulty_rating: 2,
      system_slugs: ['reproductive'],
    },

    // ========================================================================
    // URINARY SYSTEM
    // ========================================================================
    {
      canonical_name: 'Urinary bladder',
      common_names: ['Bladder'],
      latin_name: 'Vesica urinaria',
      pronunciation_ipa: '/ˈjʊərɪnɛri ˈblædər/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Hollow muscular organ for storage and expulsion of urine, located in the pelvis.',
      description_full: `The urinary bladder is a hollow muscular organ that stores urine and expels it during micturition. When empty, it lies entirely within the pelvis; when full, it may extend into the abdomen. The bladder has a capacity of 400-600 mL. It has four parts: apex (anterior), body (main portion), fundus (posterior, between ureteric orifices), and neck (continuous with urethra).

The bladder wall consists of: mucosa (transitional epithelium that stretches), submucosa, detrusor muscle (three layers of smooth muscle), and adventitia/serosa. The trigone is a smooth triangular area between the two ureteric orifices and internal urethral orifice. The superior surface is covered by peritoneum.`,
      clinical_significance: 'Urinary tract infections commonly affect the bladder (cystitis). Bladder stones may cause pain and hematuria. Bladder cancer (usually transitional cell carcinoma) is associated with smoking. Neurogenic bladder results from nerve damage. Urinary retention may require catheterization. Cystoscopy allows direct visualization. Bladder rupture may occur with pelvic trauma.',
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Vesical plexus (sympathetic T11-L2, parasympathetic S2-S4, sensory S2-S4)',
      blood_supply: 'Superior and inferior vesical arteries',
      model_reference: 'urinary_bladder',
      difficulty_rating: 3,
      system_slugs: ['urinary'],
    },
    {
      canonical_name: 'Urethra (male)',
      common_names: ['Male urethra'],
      latin_name: 'Urethra masculina',
      pronunciation_ipa: '/jʊˈriːθrə/',
      structure_type: StructureType.OTHER,
      parent_structure_id: null,
      definition_brief: 'Tube conveying urine and semen from bladder and ejaculatory ducts to external meatus, approximately 20 cm long.',
      description_full: `The male urethra is approximately 20 cm long and extends from the internal urethral orifice of the bladder to the external urethral meatus at the tip of the penis. It has four parts: pre-prostatic (1 cm, from bladder to prostate), prostatic (3-4 cm, through prostate), membranous (1-2 cm, through urogenital diaphragm), and spongy/penile (15 cm, through corpus spongiosum).

The prostatic urethra contains the urethral crest, seminal colliculus (where ejaculatory ducts open), and prostatic utricle. The membranous urethra is the narrowest and least distensible portion, surrounded by the external urethral sphincter. The spongy urethra is widest at the navicular fossa near the external meatus.`,
      clinical_significance: 'Urethral strictures most commonly affect the bulbar urethra. Urethritis is inflammation often from STIs. Catheterization requires knowledge of urethral anatomy. Urethral injury may occur with pelvic fractures. Hypospadias is a congenital defect where the meatus opens on the ventral surface. Urethral cancer is rare.',
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Prostatic plexus, pudendal nerve',
      blood_supply: 'Prostatic, inferior vesical, internal pudendal, and dorsal penile arteries',
      model_reference: 'male_urethra',
      difficulty_rating: 4,
      system_slugs: ['urinary', 'reproductive'],
    },
    {
      canonical_name: 'Urethra (female)',
      common_names: ['Female urethra'],
      latin_name: 'Urethra feminina',
      pronunciation_ipa: '/jʊˈriːθrə/',
      structure_type: StructureType.OTHER,
      parent_structure_id: null,
      definition_brief: 'Short tube (3-4 cm) conveying urine from bladder to external urethral orifice in the vestibule.',
      description_full: `The female urethra is a short muscular tube, approximately 3-4 cm long, extending from the internal urethral orifice of the bladder to the external urethral orifice in the vestibule. It passes through the pelvic floor and urogenital diaphragm, running anteroinferior to the vagina.

The urethra is surrounded by the external urethral sphincter as it passes through the urogenital diaphragm. The wall consists of mucosa (transitional epithelium proximally, stratified squamous distally), submucosa (with urethral glands), and muscularis (smooth muscle). The proximity to the vagina makes it vulnerable to trauma during childbirth and surgery.`,
      clinical_significance: 'The short length makes women more susceptible to urinary tract infections. Urethral diverticula may cause recurrent UTIs and pain. Urethral caruncles (benign growths) may cause bleeding. Stress urinary incontinence is common, especially after childbirth. Urethral prolapse may occur. Urethral injuries may occur during pelvic surgery or childbirth.',
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Vesical plexus, pudendal nerve',
      blood_supply: 'Inferior vesical artery, internal pudendal artery, vaginal artery',
      model_reference: 'female_urethra',
      difficulty_rating: 2,
      system_slugs: ['urinary'],
    },

    // ========================================================================
    // DIGESTIVE SYSTEM
    // ========================================================================
    {
      canonical_name: 'Rectum',
      common_names: [],
      latin_name: 'Rectum',
      pronunciation_ipa: '/ˈrɛktəm/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Terminal portion of large intestine extending from sigmoid colon to anal canal, approximately 15 cm long.',
      description_full: `The rectum is the terminal portion of the large intestine, extending from the rectosigmoid junction (S3 level) to the anorectal junction. It is approximately 15 cm long and follows the curve of the sacrum and coccyx. The rectum has three lateral curves (superior and inferior to right, middle to left) corresponding to internal folds called valves of Houston.

The upper third is covered by peritoneum anteriorly and laterally, the middle third only anteriorly, and the lower third is entirely extraperitoneal. The rectal wall consists of mucosa, submucosa, and muscularis (with thickened longitudinal muscle). The rectum dilates just above the pelvic floor to form the rectal ampulla, which serves as a temporary fecal storage site.`,
      clinical_significance: 'Rectal prolapse involves protrusion through the anus. Hemorrhoids are dilated rectal veins. Rectal cancer requires accurate staging for treatment planning. Digital rectal examination assesses the prostate and detects rectal masses. Rectal temperature is often measured clinically. Proctoscopy allows direct visualization. Low anterior resection or abdominoperineal resection may be performed for cancer.',
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Inferior hypogastric plexus, pelvic splanchnic nerves (S2-S4)',
      blood_supply: 'Superior rectal artery (from IMA), middle and inferior rectal arteries (from internal iliac)',
      model_reference: 'rectum',
      difficulty_rating: 3,
      system_slugs: ['digestive'],
    },
    {
      canonical_name: 'Anal canal',
      common_names: ['Anus'],
      latin_name: 'Canalis analis',
      pronunciation_ipa: '/ˈeɪnəl kəˈnæl/',
      structure_type: StructureType.OTHER,
      parent_structure_id: null,
      definition_brief: 'Terminal portion of GI tract extending from anorectal junction to anal orifice, approximately 4 cm long.',
      description_full: `The anal canal is the terminal 4 cm of the gastrointestinal tract, extending from the anorectal junction to the anal orifice. It is surrounded by the internal anal sphincter (involuntary smooth muscle, continuation of rectal circular muscle) and external anal sphincter (voluntary striated muscle).

The upper half is lined by rectal mucosa and contains anal columns (columns of Morgagni) connected at their bases by anal valves. The lower half is lined by stratified squamous epithelium. The pectinate (dentate) line marks the junction between the two regions and represents the embryonic boundary between endoderm and ectoderm, with important clinical implications for innervation, blood supply, and lymphatic drainage.`,
      clinical_significance: 'Hemorrhoids occur above (internal) or below (external) the pectinate line. Anal fissures are painful tears, usually in the posterior midline. Anal fistulas may complicate inflammatory bowel disease or infection. Anorectal abscesses require drainage. Anal cancer has different characteristics above vs. below the pectinate line. Fecal incontinence may result from sphincter damage.',
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Above pectinate line: autonomic (visceral); Below: somatic (pudendal nerve)',
      blood_supply: 'Above pectinate line: superior rectal artery; Below: inferior rectal artery',
      model_reference: 'anal_canal',
      difficulty_rating: 4,
      system_slugs: ['digestive'],
    },

    // ========================================================================
    // NERVOUS SYSTEM
    // ========================================================================
    {
      canonical_name: 'Sacral plexus',
      common_names: [],
      latin_name: 'Plexus sacralis',
      pronunciation_ipa: '/ˈseɪkrəl ˈplɛksəs/',
      structure_type: StructureType.NERVE,
      parent_structure_id: null,
      definition_brief: 'Network of nerve fibers formed by ventral rami of L4-S4, giving rise to nerves of lower limb and pelvis.',
      description_full: `The sacral plexus is formed by the ventral rami of L4-S4 spinal nerves. It lies on the posterior pelvic wall, anterior to the piriformis muscle. The plexus receives contribution from the lumbosacral trunk (L4-L5) and sacral nerves S1-S4.

Major branches include the sciatic nerve (largest nerve in body, L4-S3), superior and inferior gluteal nerves, pudendal nerve, posterior femoral cutaneous nerve, and nerve to obturator internus. The plexus provides motor and sensory innervation to the pelvis, perineum, and lower limb.`,
      clinical_significance: 'Sacral plexus injury may result from pelvic trauma, surgery, or tumors. The sciatic nerve is vulnerable to compression by the piriformis (piriformis syndrome) or during hip surgery. Pudendal nerve entrapment causes perineal pain. Nerve blocks of the sacral plexus are used for pain management and anesthesia.',
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: 'Branches of internal iliac artery',
      model_reference: 'sacral_plexus',
      difficulty_rating: 5,
      system_slugs: ['nervous'],
    },
    {
      canonical_name: 'Pudendal nerve',
      common_names: [],
      latin_name: 'Nervus pudendus',
      pronunciation_ipa: '/pjuːˈdɛndəl nɜːrv/',
      structure_type: StructureType.NERVE,
      parent_structure_id: 'Sacral plexus',
      definition_brief: 'Main nerve of the perineum (S2-S4), providing motor and sensory innervation to perineal structures.',
      description_full: `The pudendal nerve arises from the sacral plexus (S2-S4) and is the main nerve of the perineum. It exits the pelvis through the greater sciatic foramen, hooks around the ischial spine, and re-enters through the lesser sciatic foramen. It then travels in the pudendal canal (Alcock's canal) along the lateral wall of the ischiorectal fossa.

The nerve gives off three terminal branches: inferior rectal nerve (to external anal sphincter and perianal skin), perineal nerve (to perineal muscles and skin), and dorsal nerve of penis/clitoris (sensory to glans). The pudendal nerve provides motor innervation to pelvic floor muscles and external sphincters, and sensory innervation to the perineum and external genitalia.`,
      clinical_significance: 'Pudendal nerve entrapment (cyclist syndrome) causes chronic perineal pain. Pudendal nerve blocks are performed at the ischial spine for obstetric anesthesia and pain management. Nerve damage during childbirth or surgery may cause fecal or urinary incontinence and sexual dysfunction. The nerve can be assessed through pudendal nerve terminal motor latency testing.',
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: null,
      model_reference: 'pudendal_nerve',
      difficulty_rating: 4,
      system_slugs: ['nervous'],
    },
    {
      canonical_name: 'Sciatic nerve',
      common_names: ['Ischiadic nerve'],
      latin_name: 'Nervus ischiadicus',
      pronunciation_ipa: '/saɪˈætɪk nɜːrv/',
      structure_type: StructureType.NERVE,
      parent_structure_id: 'Sacral plexus',
      definition_brief: 'Largest nerve in the body (L4-S3), exiting pelvis through greater sciatic foramen to supply lower limb.',
      description_full: `The sciatic nerve is the largest nerve in the human body, arising from the sacral plexus (L4-S3). It consists of two components that are usually bound together: the tibial division (from ventral divisions) and common fibular division (from dorsal divisions). The nerve exits the pelvis through the greater sciatic foramen, typically below the piriformis muscle.

In the gluteal region, the nerve runs deep to gluteus maximus and descends between the greater trochanter and ischial tuberosity. It supplies the posterior thigh muscles (hamstrings) and all muscles below the knee. The nerve usually divides into tibial and common fibular nerves in the distal thigh, though division may occur more proximally.`,
      clinical_significance: 'Sciatica is pain along the distribution of the sciatic nerve, often from lumbar disc herniation. Piriformis syndrome involves compression by the piriformis muscle. The nerve may be injured during hip surgery or intramuscular injections in the gluteal region (safe injection site is upper outer quadrant). Sciatic nerve palsy causes footdrop and sensory loss.',
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: 'Inferior gluteal artery, perforating branches of profunda femoris',
      model_reference: 'sciatic_nerve',
      difficulty_rating: 4,
      system_slugs: ['nervous'],
    },

    // ========================================================================
    // CARDIOVASCULAR SYSTEM
    // ========================================================================
    {
      canonical_name: 'Internal iliac artery',
      common_names: ['Hypogastric artery'],
      latin_name: 'Arteria iliaca interna',
      pronunciation_ipa: '/ɪnˈtɜːrnəl ˈɪliæk ˈɑːrtəri/',
      structure_type: StructureType.ARTERY,
      parent_structure_id: null,
      definition_brief: 'Main artery supplying the pelvis and perineum, branching from the common iliac artery.',
      description_full: `The internal iliac artery arises from the common iliac artery at the level of the sacroiliac joint (L5-S1). It descends into the pelvis and divides into anterior and posterior divisions. The artery supplies the pelvic walls and viscera, perineum, and gluteal region.

The posterior division gives rise to iliolumbar, lateral sacral, and superior gluteal arteries. The anterior division gives rise to umbilical (obliterated after birth except proximal portion giving superior vesical arteries), obturator, inferior vesical, middle rectal, internal pudendal, inferior gluteal, and in females, uterine and vaginal arteries.`,
      clinical_significance: 'Internal iliac artery aneurysms are rare but may rupture. The artery may be ligated to control pelvic hemorrhage from trauma or surgery. Selective embolization is used to treat postpartum hemorrhage or pelvic bleeding. The vessel is important in planning pelvic surgery and understanding pelvic vascular anatomy.',
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: null,
      model_reference: 'internal_iliac_artery',
      difficulty_rating: 4,
      system_slugs: ['cardiovascular'],
    },
    {
      canonical_name: 'Internal pudendal artery',
      common_names: [],
      latin_name: 'Arteria pudenda interna',
      pronunciation_ipa: '/ɪnˈtɜːrnəl pjuːˈdɛndəl ˈɑːrtəri/',
      structure_type: StructureType.ARTERY,
      parent_structure_id: 'Internal iliac artery',
      definition_brief: 'Main artery of the perineum, following the course of the pudendal nerve.',
      description_full: `The internal pudendal artery arises from the anterior division of the internal iliac artery. It follows the same course as the pudendal nerve: exiting the pelvis through the greater sciatic foramen, hooking around the ischial spine, and re-entering through the lesser sciatic foramen to travel in the pudendal canal.

The artery gives off inferior rectal, perineal, and dorsal/deep arteries of penis/clitoris. It supplies the external genitalia, perineal muscles, anal canal, and erectile tissues. The artery is the main blood supply to the perineum and external genitalia.`,
      clinical_significance: 'The artery may be damaged during perineal surgery or childbirth. It is used for pudendal artery revascularization in erectile dysfunction. The artery can be embolized to control perineal bleeding. Atherosclerosis may contribute to erectile dysfunction. The vessel is important in penile/clitoral reconstruction and flap surgery.',
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: null,
      model_reference: 'internal_pudendal_artery',
      difficulty_rating: 4,
      system_slugs: ['cardiovascular'],
    },
    {
      canonical_name: 'Superior gluteal artery',
      common_names: [],
      latin_name: 'Arteria glutea superior',
      pronunciation_ipa: '/suːˈpɪəriər ˈɡluːtiəl ˈɑːrtəri/',
      structure_type: StructureType.ARTERY,
      parent_structure_id: 'Internal iliac artery',
      definition_brief: 'Largest branch of internal iliac artery, supplying gluteal muscles and hip joint.',
      description_full: `The superior gluteal artery is the largest branch of the internal iliac artery, arising from the posterior division. It exits the pelvis through the greater sciatic foramen above the piriformis muscle, accompanied by the superior gluteal nerve and vein.

In the gluteal region, it divides into superficial and deep branches. The superficial branch supplies gluteus maximus, while the deep branch runs between gluteus medius and minimus, supplying these muscles and the hip joint. The artery is an important blood supply to the hip joint and gluteal muscles.`,
      clinical_significance: 'The artery may be injured in pelvic fractures, causing significant hemorrhage. It can be embolized to control bleeding. The vessel is at risk during hip surgery and may be damaged during posterior approaches to the hip. Gluteal compartment syndrome may occur from arterial injury. The artery is used in superior gluteal artery perforator (SGAP) flaps for reconstruction.',
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: null,
      model_reference: 'superior_gluteal_artery',
      difficulty_rating: 4,
      system_slugs: ['cardiovascular'],
    },
    {
      canonical_name: 'Inferior gluteal artery',
      common_names: [],
      latin_name: 'Arteria glutea inferior',
      pronunciation_ipa: '/ɪnˈfɪəriər ˈɡluːtiəl ˈɑːrtəri/',
      structure_type: StructureType.ARTERY,
      parent_structure_id: 'Internal iliac artery',
      definition_brief: 'Branch of internal iliac artery supplying gluteus maximus and posterior thigh.',
      description_full: `The inferior gluteal artery arises from the anterior division of the internal iliac artery. It exits the pelvis through the greater sciatic foramen below the piriformis muscle, accompanied by the inferior gluteal nerve, posterior femoral cutaneous nerve, and sciatic nerve.

The artery descends between the greater trochanter and ischial tuberosity, supplying gluteus maximus, obturator internus, quadratus femoris, and the superior parts of the hamstrings. It also gives branches to the sciatic nerve and hip joint. The artery anastomoses with the medial circumflex femoral artery.`,
      clinical_significance: 'The artery may be injured in pelvic fractures or penetrating trauma. It can be embolized to control hemorrhage. The vessel is at risk during posterior approaches to the hip. Inferior gluteal artery perforator (IGAP) flaps are used for breast and other reconstructions. The artery supplies the sciatic nerve and its injury may contribute to nerve ischemia.',
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: null,
      model_reference: 'inferior_gluteal_artery',
      difficulty_rating: 4,
      system_slugs: ['cardiovascular'],
    },
    {
      canonical_name: 'Obturator artery',
      common_names: [],
      latin_name: 'Arteria obturatoria',
      pronunciation_ipa: '/ˈɒbtjʊrətər ˈɑːrtəri/',
      structure_type: StructureType.ARTERY,
      parent_structure_id: 'Internal iliac artery',
      definition_brief: 'Branch of internal iliac artery passing through obturator canal to supply medial thigh.',
      description_full: `The obturator artery usually arises from the anterior division of the internal iliac artery, though it may originate from the inferior epigastric artery (aberrant obturator artery, present in ~20% of cases). It passes anteroinferiorly on the lateral pelvic wall and exits through the obturator canal along with the obturator nerve and vein.

Outside the pelvis, it divides into anterior and posterior branches that encircle the obturator foramen deep to obturator externus. The artery supplies the obturator muscles, adductor muscles of the thigh, and gives an important branch to the femoral head through the ligament of the femoral head.`,
      clinical_significance: 'An aberrant obturator artery may be injured during hernia repair, causing the "corona mortis" (crown of death) bleeding. The acetabular branch is important for blood supply to the femoral head in children. Avascular necrosis may occur if this supply is disrupted. The artery can be embolized for pelvic hemorrhage control.',
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: null,
      model_reference: 'obturator_artery',
      difficulty_rating: 4,
      system_slugs: ['cardiovascular'],
    },
    {
      canonical_name: 'Uterine artery',
      common_names: [],
      latin_name: 'Arteria uterina',
      pronunciation_ipa: '/ˈjuːtəraɪn ˈɑːrtəri/',
      structure_type: StructureType.ARTERY,
      parent_structure_id: 'Internal iliac artery',
      definition_brief: 'Major blood supply to the uterus, arising from anterior division of internal iliac artery.',
      description_full: `The uterine artery arises from the anterior division of the internal iliac artery. It descends on the lateral pelvic wall, then runs medially in the base of the broad ligament. The artery crosses superior to the ureter approximately 1.5 cm lateral to the cervix ("water under the bridge"), an important surgical landmark.

The artery ascends along the lateral border of the uterus in a tortuous course, giving off branches to the uterus and vagina. It terminates by anastomosing with the ovarian artery. During pregnancy, the uterine artery enlarges significantly to supply the placenta and growing uterus.`,
      clinical_significance: 'The relationship to the ureter is critical during hysterectomy to avoid ureteral injury. The artery is ligated during hysterectomy. Uterine artery embolization is used to treat fibroids and postpartum hemorrhage. The vessel is enlarged in pregnancy and may be injured during cesarean section. Uterine artery Doppler ultrasound assesses placental perfusion.',
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: null,
      model_reference: 'uterine_artery',
      difficulty_rating: 4,
      system_slugs: ['cardiovascular'],
    },

    // ========================================================================
    // LIGAMENTS & FASCIA
    // ========================================================================
    {
      canonical_name: 'Sacrospinous ligament',
      common_names: [],
      latin_name: 'Ligamentum sacrospinale',
      pronunciation_ipa: '/ˌseɪkroʊˈspaɪnəs ˈlɪɡəmənt/',
      structure_type: StructureType.LIGAMENT,
      parent_structure_id: null,
      definition_brief: 'Triangular ligament extending from sacrum/coccyx to ischial spine, forming greater and lesser sciatic foramina.',
      description_full: `The sacrospinous ligament is a thin triangular ligament extending from the lateral sacrum and coccyx to the ischial spine. Together with the sacrotuberous ligament, it converts the greater and lesser sciatic notches into foramina.

The ligament is closely related to the coccygeus muscle, which lies on its pelvic surface. The pudendal nerve and internal pudendal vessels cross the ligament near the ischial spine. The ligament helps to stabilize the sacroiliac joint and prevent posterior rotation of the sacrum.`,
      clinical_significance: 'The ischial spine and sacrospinous ligament are landmarks for pudendal nerve blocks. Sacrospinous ligament fixation is a surgical procedure for vaginal vault prolapse. The ligament may be involved in coccydynia. Calcification or ossification can occur.',
      origin: 'Lateral sacrum and coccyx',
      insertion: 'Ischial spine',
      action: 'Stabilizes sacroiliac joint, prevents sacral rotation',
      innervation: null,
      blood_supply: null,
      model_reference: 'sacrospinous_ligament',
      difficulty_rating: 3,
      system_slugs: ['skeletal'],
    },
    {
      canonical_name: 'Sacrotuberous ligament',
      common_names: [],
      latin_name: 'Ligamentum sacrotuberale',
      pronunciation_ipa: '/ˌseɪkroʊˈtuːbərəs ˈlɪɡəmənt/',
      structure_type: StructureType.LIGAMENT,
      parent_structure_id: null,
      definition_brief: 'Strong ligament extending from sacrum/coccyx to ischial tuberosity, forming boundaries of sciatic foramina.',
      description_full: `The sacrotuberous ligament is a strong, flat ligament extending from the posterolateral sacrum, coccyx, and posterior iliac spine to the ischial tuberosity. It is broader at its sacral attachment and narrows as it descends to the ischial tuberosity.

Together with the sacrospinous ligament, it converts the sciatic notches into the greater and lesser sciatic foramina. The gluteus maximus muscle overlies the ligament superficially. The ligament helps to stabilize the sacroiliac joint and counteract the tendency of the sacral promontory to tilt anteriorly.`,
      clinical_significance: 'The ligament is a common site of pain in sacroiliac dysfunction. It may be involved in hamstring tendinopathy at its attachment to the ischial tuberosity. The ligament can be palpated and may be tender in pelvic pain syndromes. Calcification may occur.',
      origin: 'Posterolateral sacrum, coccyx, PSIS',
      insertion: 'Ischial tuberosity',
      action: 'Stabilizes sacroiliac joint, limits sacral nutation',
      innervation: null,
      blood_supply: null,
      model_reference: 'sacrotuberous_ligament',
      difficulty_rating: 3,
      system_slugs: ['skeletal'],
    },
    {
      canonical_name: 'Broad ligament',
      common_names: [],
      latin_name: 'Ligamentum latum uteri',
      pronunciation_ipa: '/brɔːd ˈlɪɡəmənt/',
      structure_type: StructureType.LIGAMENT,
      parent_structure_id: null,
      definition_brief: 'Double layer of peritoneum extending from the lateral uterus to the pelvic sidewalls.',
      description_full: `The broad ligament is a double layer of peritoneum that extends from the lateral margins of the uterus to the lateral pelvic walls and floor. It forms a partition dividing the pelvis into anterior and posterior compartments and contains the fallopian tubes, ovarian ligament, round ligament, and uterine vessels.

The broad ligament has three parts: mesosalpinx (surrounds fallopian tube), mesovarium (suspends ovary), and mesometrium (largest portion, extends from uterus to pelvic wall). Despite its name, the broad ligament provides minimal support to the uterus.`,
      clinical_significance: 'The broad ligament contains the uterine vessels and ureter, making it important during hysterectomy. Broad ligament hematomas may occur after pelvic trauma or surgery. Ectopic pregnancy may rarely implant in the broad ligament. The ligament is divided during surgical access to the pelvis.',
      origin: 'Lateral uterus',
      insertion: 'Pelvic sidewalls',
      action: 'Minimal uterine support, contains vessels and structures',
      innervation: null,
      blood_supply: null,
      model_reference: 'broad_ligament',
      difficulty_rating: 3,
      system_slugs: ['reproductive'],
    },

    // Additional key structures to reach 50+ total...
    {
      canonical_name: 'Perineal body',
      common_names: ['Central tendon of perineum'],
      latin_name: 'Corpus perineale',
      pronunciation_ipa: '/ˌpɛrɪˈniːəl ˈbɒdi/',
      structure_type: StructureType.OTHER,
      parent_structure_id: null,
      definition_brief: 'Fibromuscular mass in the midline between the anal canal and vagina/bulb of penis.',
      description_full: `The perineal body is a pyramidal fibromuscular mass located in the midline between the anal canal posteriorly and the vagina (in females) or bulb of penis (in males) anteriorly. It is approximately 4 cm in diameter in females and 2 cm in males.

Multiple muscles insert into the perineal body, including: external anal sphincter, bulbospongiosus, superficial and deep transverse perineal muscles, and levator ani. It serves as a crucial anchoring point for pelvic floor support and is essential for maintaining the integrity of the pelvic floor.`,
      clinical_significance: 'Damage to the perineal body during childbirth (third- or fourth-degree perineal tears) can lead to fecal incontinence and pelvic floor dysfunction. Episiotomy is sometimes performed to prevent uncontrolled tearing. Perineal body reconstruction (perineorrhaphy) may be necessary after severe tears. The structure is important for maintaining continence and pelvic organ support.',
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Pudendal nerve',
      blood_supply: 'Internal pudendal artery',
      model_reference: 'perineal_body',
      difficulty_rating: 4,
      system_slugs: ['muscular'],
    },
  ],

  relationships: [
    // ========================================================================
    // SKELETAL RELATIONSHIPS
    // ========================================================================
    {
      source_structure_name: 'Hip bone',
      target_structure_name: 'Sacrum',
      relationship_type: RelationshipType.ARTICULATES_WITH,
      description: 'The hip bone articulates with the sacrum at the sacroiliac joint',
      bidirectional: true,
      clinical_relevance: 'Sacroiliac joint dysfunction is a common cause of lower back pain',
    },
    {
      source_structure_name: 'Sacrum',
      target_structure_name: 'Coccyx',
      relationship_type: RelationshipType.ARTICULATES_WITH,
      description: 'The sacrum articulates with the coccyx at the sacrococcygeal joint',
      bidirectional: true,
      clinical_relevance: 'Coccygeal fractures and dislocations may occur from falls',
    },
    {
      source_structure_name: 'Ilium',
      target_structure_name: 'Ischium',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The ilium is continuous with the ischium at the acetabulum',
      bidirectional: true,
      clinical_relevance: 'The three bones (ilium, ischium, pubis) fuse at the acetabulum',
    },
    {
      source_structure_name: 'Ischium',
      target_structure_name: 'Pubis',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The ischial ramus joins with the inferior pubic ramus forming the ischiopubic ramus',
      bidirectional: true,
      clinical_relevance: 'This forms the inferior boundary of the obturator foramen',
    },
    {
      source_structure_name: 'Sacrospinous ligament',
      target_structure_name: 'Sacrum',
      relationship_type: RelationshipType.ATTACHES_TO,
      description: 'The sacrospinous ligament attaches to the lateral sacrum',
      bidirectional: false,
      clinical_relevance: 'Important landmark for pudendal nerve blocks',
    },
    {
      source_structure_name: 'Sacrospinous ligament',
      target_structure_name: 'Ischium',
      relationship_type: RelationshipType.ATTACHES_TO,
      description: 'The sacrospinous ligament attaches to the ischial spine',
      bidirectional: false,
      clinical_relevance: 'The ischial spine is palpable per vaginum as a landmark',
    },
    {
      source_structure_name: 'Sacrotuberous ligament',
      target_structure_name: 'Sacrum',
      relationship_type: RelationshipType.ATTACHES_TO,
      description: 'The sacrotuberous ligament attaches to the posterolateral sacrum',
      bidirectional: false,
      clinical_relevance: 'Stabilizes the sacroiliac joint',
    },
    {
      source_structure_name: 'Sacrotuberous ligament',
      target_structure_name: 'Ischium',
      relationship_type: RelationshipType.ATTACHES_TO,
      description: 'The sacrotuberous ligament attaches to the ischial tuberosity',
      bidirectional: false,
      clinical_relevance: 'May be tender in sacroiliac dysfunction',
    },

    // ========================================================================
    // MUSCULAR RELATIONSHIPS
    // ========================================================================
    {
      source_structure_name: 'Levator ani',
      target_structure_name: 'Pubis',
      relationship_type: RelationshipType.ATTACHES_TO,
      description: 'The levator ani originates from the posterior surface of the pubis',
      bidirectional: false,
      clinical_relevance: 'Pubic attachment may be avulsed during childbirth',
    },
    {
      source_structure_name: 'Levator ani',
      target_structure_name: 'Coccyx',
      relationship_type: RelationshipType.ATTACHES_TO,
      description: 'The levator ani inserts onto the coccyx and anococcygeal ligament',
      bidirectional: false,
      clinical_relevance: 'Forms the pelvic floor supporting viscera',
    },
    {
      source_structure_name: 'Pubococcygeus',
      target_structure_name: 'Levator ani',
      relationship_type: RelationshipType.BRANCH_OF,
      description: 'The pubococcygeus is the main component of the levator ani',
      bidirectional: false,
      clinical_relevance: 'Primary target of Kegel exercises',
    },
    {
      source_structure_name: 'Puborectalis',
      target_structure_name: 'Levator ani',
      relationship_type: RelationshipType.BRANCH_OF,
      description: 'The puborectalis is part of the levator ani forming a sling around rectum',
      bidirectional: false,
      clinical_relevance: 'Maintains the anorectal angle for continence',
    },
    {
      source_structure_name: 'Iliococcygeus',
      target_structure_name: 'Levator ani',
      relationship_type: RelationshipType.BRANCH_OF,
      description: 'The iliococcygeus is the lateral component of levator ani',
      bidirectional: false,
      clinical_relevance: 'May be plicated during pelvic floor repair',
    },
    {
      source_structure_name: 'Coccygeus',
      target_structure_name: 'Ischium',
      relationship_type: RelationshipType.ATTACHES_TO,
      description: 'The coccygeus arises from the ischial spine',
      bidirectional: false,
      clinical_relevance: 'Located near pudendal nerve at ischial spine',
    },
    {
      source_structure_name: 'Coccygeus',
      target_structure_name: 'Coccyx',
      relationship_type: RelationshipType.ATTACHES_TO,
      description: 'The coccygeus inserts onto the lateral coccyx',
      bidirectional: false,
      clinical_relevance: 'May contribute to coccydynia',
    },
    {
      source_structure_name: 'Obturator internus',
      target_structure_name: 'Obturator foramen',
      relationship_type: RelationshipType.PASSES_THROUGH,
      description: 'The obturator internus arises from the internal surface of obturator membrane',
      bidirectional: false,
      clinical_relevance: 'Forms lateral pelvic wall, may entrap pudendal nerve',
    },
    {
      source_structure_name: 'Piriformis',
      target_structure_name: 'Sacrum',
      relationship_type: RelationshipType.ATTACHES_TO,
      description: 'The piriformis arises from the anterior sacrum',
      bidirectional: false,
      clinical_relevance: 'Important landmark dividing greater sciatic foramen',
    },
    {
      source_structure_name: 'External anal sphincter',
      target_structure_name: 'Perineal body',
      relationship_type: RelationshipType.ATTACHES_TO,
      description: 'The superficial part of external anal sphincter attaches to perineal body',
      bidirectional: false,
      clinical_relevance: 'Damage to perineal body affects sphincter function',
    },

    // ========================================================================
    // REPRODUCTIVE SYSTEM RELATIONSHIPS
    // ========================================================================
    {
      source_structure_name: 'Prostate',
      target_structure_name: 'Urinary bladder',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The prostate surrounds the urethra inferior to the bladder',
      bidirectional: false,
      clinical_relevance: 'Prostatic enlargement causes urinary obstruction',
    },
    {
      source_structure_name: 'Prostate',
      target_structure_name: 'Rectum',
      relationship_type: RelationshipType.SUPERFICIAL_TO,
      description: 'The prostate lies anterior to the rectum',
      bidirectional: false,
      clinical_relevance: 'The prostate is palpable on digital rectal examination',
    },
    {
      source_structure_name: 'Seminal vesicle',
      target_structure_name: 'Urinary bladder',
      relationship_type: RelationshipType.SUPERFICIAL_TO,
      description: 'The seminal vesicles lie posterior to the bladder',
      bidirectional: false,
      clinical_relevance: 'Visible on transrectal ultrasound and MRI',
    },
    {
      source_structure_name: 'Vas deferens',
      target_structure_name: 'Seminal vesicle',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The vas deferens joins with the seminal vesicle duct to form ejaculatory duct',
      bidirectional: false,
      clinical_relevance: 'Both structures may be damaged during pelvic surgery',
    },
    {
      source_structure_name: 'Ejaculatory duct',
      target_structure_name: 'Prostate',
      relationship_type: RelationshipType.PASSES_THROUGH,
      description: 'The ejaculatory duct passes through the prostate to open into prostatic urethra',
      bidirectional: false,
      clinical_relevance: 'Obstruction causes infertility and pelvic pain',
    },
    {
      source_structure_name: 'Uterus',
      target_structure_name: 'Urinary bladder',
      relationship_type: RelationshipType.SUPERFICIAL_TO,
      description: 'The uterus lies posterior to the bladder',
      bidirectional: false,
      clinical_relevance: 'Bladder injury risk during cesarean section',
    },
    {
      source_structure_name: 'Uterus',
      target_structure_name: 'Rectum',
      relationship_type: RelationshipType.SUPERFICIAL_TO,
      description: 'The uterus lies anterior to the rectum with rectouterine pouch between',
      bidirectional: false,
      clinical_relevance: 'The pouch of Douglas can accumulate fluid',
    },
    {
      source_structure_name: 'Ovary',
      target_structure_name: 'Fallopian tube',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The ovary is suspended near the fimbriated end of the fallopian tube',
      bidirectional: false,
      clinical_relevance: 'Ovulated eggs are captured by tubal fimbriae',
    },
    {
      source_structure_name: 'Fallopian tube',
      target_structure_name: 'Uterus',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The fallopian tube opens into the superior angle of the uterine cavity',
      bidirectional: false,
      clinical_relevance: 'Site of tubal cannulation for infertility',
    },
    {
      source_structure_name: 'Vagina',
      target_structure_name: 'Uterus',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The vagina surrounds the cervix with fornices',
      bidirectional: false,
      clinical_relevance: 'Posterior fornix provides access for culdocentesis',
    },
    {
      source_structure_name: 'Vagina',
      target_structure_name: 'Urethra (female)',
      relationship_type: RelationshipType.SUPERFICIAL_TO,
      description: 'The vagina lies posterior to the urethra',
      bidirectional: false,
      clinical_relevance: 'Cystocele involves anterior vaginal wall prolapse',
    },
    {
      source_structure_name: 'Vagina',
      target_structure_name: 'Rectum',
      relationship_type: RelationshipType.SUPERFICIAL_TO,
      description: 'The vagina lies anterior to the rectum separated by rectovaginal septum',
      bidirectional: false,
      clinical_relevance: 'Rectocele involves posterior vaginal wall prolapse',
    },
    {
      source_structure_name: 'Broad ligament',
      target_structure_name: 'Uterus',
      relationship_type: RelationshipType.ATTACHES_TO,
      description: 'The broad ligament extends from the lateral uterus to pelvic sidewalls',
      bidirectional: false,
      clinical_relevance: 'Contains uterine vessels and ureter',
    },

    // ========================================================================
    // URINARY SYSTEM RELATIONSHIPS
    // ========================================================================
    {
      source_structure_name: 'Urinary bladder',
      target_structure_name: 'Urethra (male)',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The bladder continues as the urethra at the internal urethral orifice',
      bidirectional: false,
      clinical_relevance: 'Site of urethral obstruction in BPH',
    },
    {
      source_structure_name: 'Urinary bladder',
      target_structure_name: 'Urethra (female)',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The bladder continues as the urethra at the internal urethral orifice',
      bidirectional: false,
      clinical_relevance: 'Shorter urethra predisposes to UTIs',
    },
    {
      source_structure_name: 'Urethra (male)',
      target_structure_name: 'Prostate',
      relationship_type: RelationshipType.PASSES_THROUGH,
      description: 'The prostatic urethra passes through the prostate gland',
      bidirectional: false,
      clinical_relevance: 'Prostatic enlargement compresses urethra',
    },
    {
      source_structure_name: 'External urethral sphincter',
      target_structure_name: 'Urethra (male)',
      relationship_type: RelationshipType.CONTAINS,
      description: 'The external sphincter surrounds the membranous urethra',
      bidirectional: false,
      clinical_relevance: 'Sphincter damage causes incontinence',
    },
    {
      source_structure_name: 'External urethral sphincter',
      target_structure_name: 'Urethra (female)',
      relationship_type: RelationshipType.CONTAINS,
      description: 'The external sphincter surrounds the mid urethra',
      bidirectional: false,
      clinical_relevance: 'Strengthened by pelvic floor exercises',
    },

    // ========================================================================
    // DIGESTIVE SYSTEM RELATIONSHIPS
    // ========================================================================
    {
      source_structure_name: 'Rectum',
      target_structure_name: 'Anal canal',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The rectum continues as the anal canal at the anorectal junction',
      bidirectional: false,
      clinical_relevance: 'Anorectal angle important for continence',
    },
    {
      source_structure_name: 'Puborectalis',
      target_structure_name: 'Rectum',
      relationship_type: RelationshipType.CONTAINS,
      description: 'The puborectalis forms a sling around the anorectal junction',
      bidirectional: false,
      clinical_relevance: 'Maintains anorectal angle',
    },
    {
      source_structure_name: 'External anal sphincter',
      target_structure_name: 'Anal canal',
      relationship_type: RelationshipType.CONTAINS,
      description: 'The external sphincter surrounds the anal canal',
      bidirectional: false,
      clinical_relevance: 'Voluntary control of defecation',
    },

    // ========================================================================
    // NERVOUS SYSTEM RELATIONSHIPS
    // ========================================================================
    {
      source_structure_name: 'Pudendal nerve',
      target_structure_name: 'Sacral plexus',
      relationship_type: RelationshipType.BRANCH_OF,
      description: 'The pudendal nerve arises from the sacral plexus (S2-S4)',
      bidirectional: false,
      clinical_relevance: 'Main nerve of the perineum',
    },
    {
      source_structure_name: 'Sciatic nerve',
      target_structure_name: 'Sacral plexus',
      relationship_type: RelationshipType.BRANCH_OF,
      description: 'The sciatic nerve arises from the sacral plexus (L4-S3)',
      bidirectional: false,
      clinical_relevance: 'Largest nerve in the body',
    },
    {
      source_structure_name: 'Pudendal nerve',
      target_structure_name: 'Ischium',
      relationship_type: RelationshipType.PASSES_THROUGH,
      description: 'The pudendal nerve hooks around the ischial spine',
      bidirectional: false,
      clinical_relevance: 'Site for pudendal nerve blocks',
    },
    {
      source_structure_name: 'Pudendal nerve',
      target_structure_name: 'Levator ani',
      relationship_type: RelationshipType.INNERVATED_BY,
      description: 'The pudendal nerve provides partial innervation to levator ani',
      bidirectional: false,
      clinical_relevance: 'Nerve damage causes pelvic floor dysfunction',
    },
    {
      source_structure_name: 'Pudendal nerve',
      target_structure_name: 'External anal sphincter',
      relationship_type: RelationshipType.INNERVATED_BY,
      description: 'The inferior rectal branch innervates the external anal sphincter',
      bidirectional: false,
      clinical_relevance: 'Damage causes fecal incontinence',
    },
    {
      source_structure_name: 'Pudendal nerve',
      target_structure_name: 'External urethral sphincter',
      relationship_type: RelationshipType.INNERVATED_BY,
      description: 'The pudendal nerve innervates the external urethral sphincter',
      bidirectional: false,
      clinical_relevance: 'Damage causes urinary incontinence',
    },
    {
      source_structure_name: 'Sciatic nerve',
      target_structure_name: 'Piriformis',
      relationship_type: RelationshipType.PASSES_THROUGH,
      description: 'The sciatic nerve typically exits below the piriformis',
      bidirectional: false,
      clinical_relevance: 'Piriformis syndrome compresses sciatic nerve',
    },

    // ========================================================================
    // VASCULAR RELATIONSHIPS
    // ========================================================================
    {
      source_structure_name: 'Internal pudendal artery',
      target_structure_name: 'Internal iliac artery',
      relationship_type: RelationshipType.BRANCH_OF,
      description: 'The internal pudendal artery branches from the anterior division of internal iliac',
      bidirectional: false,
      clinical_relevance: 'Main arterial supply to perineum',
    },
    {
      source_structure_name: 'Superior gluteal artery',
      target_structure_name: 'Internal iliac artery',
      relationship_type: RelationshipType.BRANCH_OF,
      description: 'The superior gluteal artery is the largest branch of internal iliac',
      bidirectional: false,
      clinical_relevance: 'May cause massive bleeding if injured',
    },
    {
      source_structure_name: 'Inferior gluteal artery',
      target_structure_name: 'Internal iliac artery',
      relationship_type: RelationshipType.BRANCH_OF,
      description: 'The inferior gluteal artery branches from the anterior division of internal iliac',
      bidirectional: false,
      clinical_relevance: 'Supplies gluteus maximus and sciatic nerve',
    },
    {
      source_structure_name: 'Obturator artery',
      target_structure_name: 'Internal iliac artery',
      relationship_type: RelationshipType.BRANCH_OF,
      description: 'The obturator artery usually branches from internal iliac',
      bidirectional: false,
      clinical_relevance: 'Aberrant course may be injured in hernia repair',
    },
    {
      source_structure_name: 'Uterine artery',
      target_structure_name: 'Internal iliac artery',
      relationship_type: RelationshipType.BRANCH_OF,
      description: 'The uterine artery branches from the anterior division of internal iliac',
      bidirectional: false,
      clinical_relevance: 'Crosses above ureter ("water under bridge")',
    },
    {
      source_structure_name: 'Internal pudendal artery',
      target_structure_name: 'Pudendal nerve',
      relationship_type: RelationshipType.SYNERGIST_WITH,
      description: 'The internal pudendal artery accompanies the pudendal nerve',
      bidirectional: true,
      clinical_relevance: 'Both pass through pudendal canal together',
    },
    {
      source_structure_name: 'Internal pudendal artery',
      target_structure_name: 'Perineal body',
      relationship_type: RelationshipType.SUPPLIED_BY,
      description: 'Branches of internal pudendal artery supply the perineal body',
      bidirectional: false,
      clinical_relevance: 'Hemorrhage may occur with perineal tears',
    },
    {
      source_structure_name: 'Uterine artery',
      target_structure_name: 'Uterus',
      relationship_type: RelationshipType.SUPPLIED_BY,
      description: 'The uterine artery is the main blood supply to the uterus',
      bidirectional: false,
      clinical_relevance: 'Ligated during hysterectomy, embolized for fibroids',
    },
    {
      source_structure_name: 'Internal iliac artery',
      target_structure_name: 'Prostate',
      relationship_type: RelationshipType.SUPPLIED_BY,
      description: 'Prostatic branches from inferior vesical artery supply the prostate',
      bidirectional: false,
      clinical_relevance: 'May be embolized to reduce prostate size',
    },
    {
      source_structure_name: 'Internal iliac artery',
      target_structure_name: 'Rectum',
      relationship_type: RelationshipType.SUPPLIED_BY,
      description: 'Middle and inferior rectal arteries supply lower rectum',
      bidirectional: false,
      clinical_relevance: 'Important in rectal surgery and hemorrhoid treatment',
    },
  ],
};
