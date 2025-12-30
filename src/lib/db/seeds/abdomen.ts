/**
 * Abdomen Region Seed Data
 * Comprehensive anatomical structures, relationships, and clinical correlations for the abdominal region
 */

import { StructureType, RelationshipType } from '@/types';

// ============================================================================
// Type Definitions for Seed Data
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
  image_references: any[];
  difficulty_rating: number;
  prerequisite_ids: string[];
}

interface SeedRelationship {
  source_structure: string; // canonical_name
  target_structure: string; // canonical_name
  relationship_type: RelationshipType;
  description: string;
  bidirectional: boolean;
  clinical_relevance: string | null;
}

interface SeedData {
  region: {
    name: string;
    slug: string;
    description: string;
    atlas_plate_range: string;
    color_code: string;
  };
  systems: string[]; // System slugs
  structures: SeedStructure[];
  relationships: SeedRelationship[];
}

// ============================================================================
// Abdomen Region Seed Data
// ============================================================================

export const abdomenSeedData: SeedData = {
  // Region Definition
  region: {
    name: 'Abdomen',
    slug: 'abdomen',
    description: 'Abdominal wall, peritoneal cavity, and viscera including digestive, urinary, and vascular systems',
    atlas_plate_range: '242-328',
    color_code: '#F59E0B', // Amber color for GI/Abdomen
  },

  // Body Systems
  systems: [
    'muscular',
    'digestive',
    'cardiovascular',
    'nervous',
    'urinary',
    'lymphatic',
  ],

  // Anatomical Structures (60+ structures)
  structures: [
    // ========================================================================
    // ABDOMINAL WALL MUSCLES
    // ========================================================================
    {
      canonical_name: 'Rectus abdominis',
      common_names: ['Rectus abdominis muscle', 'Abs'],
      latin_name: 'Musculus rectus abdominis',
      pronunciation_ipa: '/ˈrɛktəs æbˈdɒmɪnɪs/',
      structure_type: StructureType.MUSCLE,
      parent_structure_id: null,
      definition_brief: 'Vertical muscle of the anterior abdominal wall that flexes the trunk and compresses abdominal contents.',
      description_full: `The rectus abdominis is a paired, strap-like muscle of the anterior abdominal wall. It extends vertically from the pubic symphysis to the costal cartilages of ribs 5-7 and xiphoid process.

The muscle is segmented by three or four transverse tendinous intersections, creating the characteristic "six-pack" appearance when visible. It is enclosed within the rectus sheath, formed by the aponeuroses of the lateral abdominal muscles.

The linea alba, a midline fibrous raphe, separates the left and right rectus muscles. Below the arcuate line, the posterior rectus sheath is absent, with only transversalis fascia separating the muscle from peritoneum.`,
      clinical_significance: `Diastasis recti (separation of the rectus muscles) commonly occurs in pregnancy and obesity. The muscle is an important landmark for McBurney\'s point and surgical incisions. Rectus sheath hematoma can occur with anticoagulation. The arcuate line marks a weak point where hernias can develop.`,
      origin: 'Pubic symphysis and pubic crest',
      insertion: 'Costal cartilages of ribs 5-7, xiphoid process',
      action: 'Trunk flexion, compression of abdominal contents, forced expiration',
      innervation: 'Thoracoabdominal nerves (T7-T12)',
      blood_supply: 'Superior epigastric artery (from internal thoracic), inferior epigastric artery (from external iliac)',
      model_reference: 'rectus_abdominis',
      image_references: [],
      difficulty_rating: 2,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'External oblique',
      common_names: ['External abdominal oblique', 'External oblique muscle'],
      latin_name: 'Musculus obliquus externus abdominis',
      pronunciation_ipa: '/ɛksˈtɜːrnəl əˈbliːk/',
      structure_type: StructureType.MUSCLE,
      parent_structure_id: null,
      definition_brief: 'Largest and most superficial of the lateral abdominal wall muscles with fibers running inferomedially.',
      description_full: `The external oblique is the largest and most superficial of the three lateral abdominal wall muscles. Its fibers run inferomedially, resembling "hands in pockets."

The muscle originates from the external surfaces of ribs 5-12 and inserts broadly into the anterior half of the iliac crest, pubic tubercle, and linea alba via a broad aponeurosis. The inferior border forms the inguinal ligament between the ASIS and pubic tubercle.

The external oblique aponeurosis contributes to the anterior rectus sheath above the arcuate line and to both layers below. It creates the superficial inguinal ring, an opening in the aponeurosis for the spermatic cord or round ligament.`,
      clinical_significance: `The inguinal ligament is a key landmark for inguinal hernia repair and vascular access. The superficial inguinal ring is a common site for direct inguinal hernias. Muscle strains are common in athletes. Understanding the fiber direction is crucial for surgical incisions to minimize denervation.`,
      origin: 'External surfaces of ribs 5-12',
      insertion: 'Iliac crest, pubic tubercle, linea alba (via aponeurosis), inguinal ligament',
      action: 'Bilateral: trunk flexion, compression of abdominal contents; Unilateral: trunk rotation (to opposite side), lateral flexion',
      innervation: 'Thoracoabdominal nerves (T7-T11), subcostal nerve (T12), iliohypogastric and ilioinguinal nerves (L1)',
      blood_supply: 'Lower posterior intercostal arteries, subcostal artery, superior and inferior epigastric arteries, deep circumflex iliac artery',
      model_reference: 'external_oblique',
      image_references: [],
      difficulty_rating: 3,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Internal oblique',
      common_names: ['Internal abdominal oblique', 'Internal oblique muscle'],
      latin_name: 'Musculus obliquus internus abdominis',
      pronunciation_ipa: '/ɪnˈtɜːrnəl əˈbliːk/',
      structure_type: StructureType.MUSCLE,
      parent_structure_id: null,
      definition_brief: 'Middle layer of lateral abdominal wall muscles with fibers running superomedially, perpendicular to external oblique.',
      description_full: `The internal oblique is the intermediate muscle of the lateral abdominal wall, lying deep to the external oblique. Its fibers run superomedially, perpendicular to the external oblique.

The muscle originates from the thoracolumbar fascia, anterior iliac crest, and lateral two-thirds of the inguinal ligament. It inserts into the inferior borders of ribs 10-12, linea alba, and pubic crest via an aponeurosis.

The internal oblique aponeurosis splits at the lateral border of the rectus abdominis to contribute to both anterior and posterior rectus sheath above the arcuate line. The inferior fibers arch over the spermatic cord, contributing to the cremaster muscle in males.`,
      clinical_significance: `The cremaster muscle and reflex are clinically important for testicular examination and differentiating testicular torsion from other causes of acute scrotum. The muscle is involved in sports hernias (athletic pubalgia). Proper identification is essential during laparoscopic hernia repair.`,
      origin: 'Thoracolumbar fascia, anterior iliac crest, lateral two-thirds of inguinal ligament',
      insertion: 'Inferior borders of ribs 10-12, linea alba, pubic crest',
      action: 'Bilateral: trunk flexion, compression of abdominal contents; Unilateral: trunk rotation (to same side), lateral flexion',
      innervation: 'Thoracoabdominal nerves (T7-T11), subcostal nerve (T12), iliohypogastric and ilioinguinal nerves (L1)',
      blood_supply: 'Lower posterior intercostal arteries, subcostal artery, superior and inferior epigastric arteries, deep circumflex iliac artery',
      model_reference: 'internal_oblique',
      image_references: [],
      difficulty_rating: 3,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Transversus abdominis',
      common_names: ['Transverse abdominal muscle', 'Transversus'],
      latin_name: 'Musculus transversus abdominis',
      pronunciation_ipa: '/trænsˈvɜːrsəs æbˈdɒmɪnɪs/',
      structure_type: StructureType.MUSCLE,
      parent_structure_id: null,
      definition_brief: 'Deepest layer of lateral abdominal wall muscles with horizontally oriented fibers, primary trunk stabilizer.',
      description_full: `The transversus abdominis is the deepest of the three lateral abdominal wall muscles. Its fibers run horizontally (transversely), acting like a corset around the abdomen.

The muscle originates from the internal surfaces of costal cartilages 7-12, thoracolumbar fascia, iliac crest, and lateral third of the inguinal ligament. It inserts into the linea alba, pubic crest, and pecten pubis via an aponeurosis.

The transversus aponeurosis forms the posterior rectus sheath above the arcuate line and passes anterior to the rectus below. The inferior fibers contribute to the conjoint tendon with the internal oblique. Deep to the muscle lies the transversalis fascia, an important anatomical plane.`,
      clinical_significance: `The transversus abdominis is crucial for core stability and often targeted in rehabilitation. The transversalis fascia-transversus plane is used in TAP (transversus abdominis plane) blocks for postoperative analgesia. Weakness contributes to chronic low back pain. The conjoint tendon is important in inguinal hernia repair.`,
      origin: 'Internal surfaces of costal cartilages 7-12, thoracolumbar fascia, iliac crest, lateral third of inguinal ligament',
      insertion: 'Linea alba, pubic crest, pecten pubis (conjoint tendon)',
      action: 'Compression of abdominal contents, trunk stabilization, forced expiration',
      innervation: 'Thoracoabdominal nerves (T7-T11), subcostal nerve (T12), iliohypogastric and ilioinguinal nerves (L1)',
      blood_supply: 'Lower posterior intercostal arteries, subcostal artery, superior and inferior epigastric arteries, deep circumflex iliac artery',
      model_reference: 'transversus_abdominis',
      image_references: [],
      difficulty_rating: 3,
      prerequisite_ids: [],
    },

    // ========================================================================
    // GASTROINTESTINAL TRACT - FOREGUT
    // ========================================================================
    {
      canonical_name: 'Abdominal esophagus',
      common_names: ['Abdominal portion of esophagus'],
      latin_name: 'Pars abdominalis oesophagi',
      pronunciation_ipa: '/əˈbdɒmɪnəl ɪˈsɒfəɡəs/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Short abdominal segment of the esophagus between the diaphragmatic hiatus and gastroesophageal junction.',
      description_full: `The abdominal esophagus is the short (1-2 cm) terminal segment of the esophagus below the diaphragm. It extends from the esophageal hiatus (at T10 level) to the gastroesophageal (GE) junction.

This segment is covered by peritoneum anteriorly and laterally but is retroperitoneal. The lower esophageal sphincter (LES), a physiological rather than anatomical sphincter, is located at the GE junction.

The angle of His is the acute angle between the esophagus and gastric fundus, which helps prevent reflux. The phrenoesophageal ligament anchors the esophagus to the diaphragm at the hiatus.`,
      clinical_significance: `Hiatal hernias occur when the stomach herniates through the esophageal hiatus (sliding type most common). Gastroesophageal reflux disease (GERD) results from LES dysfunction. Barrett\'s esophagus (metaplasia) can develop from chronic reflux, predisposing to adenocarcinoma. The GE junction is a common site for esophageal varices in portal hypertension.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Vagus nerves (anterior and posterior), esophageal plexus',
      blood_supply: 'Left gastric artery, inferior phrenic artery',
      model_reference: 'abdominal_esophagus',
      image_references: [],
      difficulty_rating: 3,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Stomach',
      common_names: ['Gastric stomach', 'Gaster'],
      latin_name: 'Gaster',
      pronunciation_ipa: '/ˈstʌmək/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'J-shaped dilated segment of the GI tract between esophagus and duodenum, responsible for mechanical and chemical digestion.',
      description_full: `The stomach is a J-shaped, dilated portion of the GI tract located in the left upper quadrant and epigastric region. It has four main parts: cardia (at GE junction), fundus (superior dome above cardia), body (main portion), and pylorus (funnel-shaped portion leading to duodenum).

The stomach has two curvatures: the lesser curvature (concave, right border) and greater curvature (convex, left border). The angular incisure (angular notch) marks the junction of the body and pylorus along the lesser curvature.

The stomach wall has four layers: mucosa (with rugae for expansion), submucosa, muscularis externa (with three layers: oblique, circular, longitudinal), and serosa. The pyloric sphincter controls emptying into the duodenum.`,
      clinical_significance: `Gastric ulcers commonly occur along the lesser curvature. Gastric cancer typically arises in the antrum. Gastric varices develop in portal hypertension. Gastric outlet obstruction can result from pyloric stenosis or malignancy. Understanding gastric anatomy is crucial for gastric bypass surgery and gastrectomy. The angle of His is important in anti-reflux surgery.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Vagus nerves (parasympathetic), celiac plexus (sympathetic)',
      blood_supply: 'Left gastric artery, right gastric artery, right gastroepiploic artery, left gastroepiploic artery, short gastric arteries',
      model_reference: 'stomach',
      image_references: [],
      difficulty_rating: 3,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Duodenum',
      common_names: ['First part of small intestine'],
      latin_name: 'Duodenum',
      pronunciation_ipa: '/ˌdjuːəˈdiːnəm/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'C-shaped first portion of the small intestine, receiving bile and pancreatic secretions, largely retroperitoneal.',
      description_full: `The duodenum is the first and shortest (20-25 cm) segment of the small intestine. It forms a C-shaped curve around the head of the pancreas and has four parts:

1st part (superior/bulb): 5 cm, intraperitoneal, begins at pylorus
2nd part (descending): 7.5 cm, retroperitoneal, contains major and minor duodenal papillae
3rd part (horizontal/inferior): 10 cm, retroperitoneal, crosses anterior to IVC and aorta
4th part (ascending): 2.5 cm, retroperitoneal, ends at duodenojejunal flexure

The major duodenal papilla (of Vater) receives the hepatopancreatic ampulla (common bile duct and main pancreatic duct). The minor papilla receives the accessory pancreatic duct. The ligament of Treitz suspends the duodenojejunal flexure.`,
      clinical_significance: `Duodenal ulcers (usually in first part) are more common than gastric ulcers. The retroperitoneal position makes duodenal perforations serious. Superior mesenteric artery syndrome can compress the third part. Duodenal atresia presents with "double bubble" sign. ERCP accesses the biliary tree via the major papilla. Whipple procedure involves partial duodenectomy.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Vagus nerves, celiac and superior mesenteric plexuses',
      blood_supply: 'Superior pancreaticoduodenal artery (from gastroduodenal), inferior pancreaticoduodenal artery (from SMA)',
      model_reference: 'duodenum',
      image_references: [],
      difficulty_rating: 4,
      prerequisite_ids: [],
    },

    // ========================================================================
    // GASTROINTESTINAL TRACT - MIDGUT
    // ========================================================================
    {
      canonical_name: 'Jejunum',
      common_names: ['Proximal small intestine'],
      latin_name: 'Jejunum',
      pronunciation_ipa: '/dʒɪˈdʒuːnəm/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Proximal two-fifths of the small intestine, characterized by thick walls, prominent plicae circulares, and mesenteric vasculature.',
      description_full: `The jejunum comprises the proximal 2/5 (approximately 2.5 meters) of the small intestine, beginning at the duodenojejunal flexure. It is an intraperitoneal structure suspended by mesentery.

The jejunum has distinguishing features compared to ileum:
- Thicker walls
- Larger diameter
- More prominent plicae circulares (circular folds)
- Less mesenteric fat
- Fewer arcades with longer vasa recta
- Redder color (more vascular)

The jejunum is the primary site for nutrient absorption, with extensive surface area from plicae, villi, and microvilli. It gradually transitions to ileum without distinct demarcation.`,
      clinical_significance: `Jejunal diverticulosis can cause bleeding or obstruction. Small bowel obstruction commonly involves jejunum. Crohn\'s disease frequently affects the jejunum. Jejunal feeding tubes are used for enteral nutrition. Jejunal loops are used in Roux-en-Y procedures. Meckel\'s diverticulum (ileum) is the most common congenital GI anomaly.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Vagus nerves, superior mesenteric plexus',
      blood_supply: 'Jejunal arteries (from superior mesenteric artery)',
      model_reference: 'jejunum',
      image_references: [],
      difficulty_rating: 3,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Ileum',
      common_names: ['Distal small intestine'],
      latin_name: 'Ileum',
      pronunciation_ipa: '/ˈɪliəm/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Distal three-fifths of small intestine, characterized by thinner walls, less prominent folds, and abundant lymphoid tissue.',
      description_full: `The ileum comprises the distal 3/5 (approximately 3.5 meters) of the small intestine, ending at the ileocecal valve. It is an intraperitoneal structure suspended by mesentery.

Distinguishing features compared to jejunum:
- Thinner walls
- Smaller diameter
- Less prominent plicae circulares
- More mesenteric fat
- More arterial arcades with shorter vasa recta
- Abundant Peyer\'s patches (lymphoid aggregations)
- Paler color (less vascular)

The terminal ileum contains Peyer\'s patches and is specialized for vitamin B12 and bile salt absorption. The ileocecal valve prevents reflux from colon into ileum.`,
      clinical_significance: `Terminal ileitis is characteristic of Crohn\'s disease. Peyer\'s patches are involved in typhoid fever (Salmonella typhi). Ileal resection leads to B12 and bile salt malabsorption. Meckel\'s diverticulum (rule of 2s: 2% of population, 2 feet from ileocecal valve, 2 inches long) can cause bleeding or obstruction. The ileocecal valve is important in preventing fecal reflux.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Vagus nerves, superior mesenteric plexus',
      blood_supply: 'Ileal arteries (from superior mesenteric artery), ileocolic artery',
      model_reference: 'ileum',
      image_references: [],
      difficulty_rating: 3,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Cecum',
      common_names: ['Cecum pouch'],
      latin_name: 'Caecum',
      pronunciation_ipa: '/ˈsiːkəm/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Blind pouch at the beginning of the large intestine, located in the right iliac fossa, gives rise to the appendix.',
      description_full: `The cecum is a blind-ended pouch forming the first portion of the large intestine. It is located in the right iliac fossa, typically intraperitoneal but can be partially retroperitoneal.

The cecum receives the terminal ileum at the ileocecal valve (orifice), which has superior and inferior lips (frenula) that form a functional valve preventing reflux. The cecum is approximately 6 cm in length and width.

Three distinct features mark the cecum:
- The appendix arises from the posteromedial wall, 2 cm below the ileocecal valve
- Teniae coli (three longitudinal muscle bands) converge at the appendiceal base
- Haustra (sacculations) are less prominent than in colon`,
      clinical_significance: `Cecal volvulus accounts for 10-15% of intestinal volvuli. Cecal cancer presents with right lower quadrant mass or iron-deficiency anemia. Typhlitis (neutropenic enterocolitis) affects the cecum in immunocompromised patients. The ileocecal valve is important in preventing bacterial overgrowth. Intussusception commonly involves the ileocecal region in children.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Superior mesenteric plexus, vagus nerves',
      blood_supply: 'Ileocolic artery (from superior mesenteric artery)',
      model_reference: 'cecum',
      image_references: [],
      difficulty_rating: 3,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Appendix',
      common_names: ['Vermiform appendix', 'Appendix vermiformis'],
      latin_name: 'Appendix vermiformis',
      pronunciation_ipa: '/əˈpɛndɪks/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Narrow, worm-like tube arising from the posteromedial cecum, rich in lymphoid tissue, variable in position.',
      description_full: `The appendix is a narrow, tubular structure arising from the posteromedial wall of the cecum, approximately 2 cm below the ileocecal valve. It averages 6-9 cm in length but varies considerably.

The base of the appendix is constant (at the convergence of teniae coli), but the tip position is highly variable:
- Retrocecal (65%): behind cecum, can be retroperitoneal
- Pelvic/descending (31%): hanging into pelvis
- Subcecal (2.5%): below cecum
- Pre-ileal and post-ileal (1%): anterior or posterior to terminal ileum

The appendix has abundant lymphoid tissue (gut-associated lymphoid tissue, GALT) and is suspended by the mesoappendix, which contains the appendicular artery.`,
      clinical_significance: `Acute appendicitis is the most common surgical emergency (lifetime risk 7-8%). McBurney\'s point (2/3 from umbilicus to ASIS) is a classic tender point, but pain location varies with appendix position. Retrocecal appendicitis can mimic pyelonephritis. Pelvic appendicitis can cause diarrhea and urinary symptoms. Perforation risk increases after 24-36 hours. Appendiceal tumors (carcinoid, mucinous) are rare.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Superior mesenteric plexus (sympathetic T10-T11), vagus nerve',
      blood_supply: 'Appendicular artery (branch of ileocolic artery)',
      model_reference: 'appendix',
      image_references: [],
      difficulty_rating: 3,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Ascending colon',
      common_names: ['Right colon'],
      latin_name: 'Colon ascendens',
      pronunciation_ipa: '/əˈsɛndɪŋ ˈkoʊlən/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Vertical segment of large intestine ascending from cecum to hepatic flexure, retroperitoneal in position.',
      description_full: `The ascending colon is the second portion of the large intestine, extending superiorly from the cecum to the right colic (hepatic) flexure. It is approximately 15 cm long and located in the right lumbar region.

The ascending colon is retroperitoneal, covered by peritoneum only on its anterior and lateral surfaces. It lies against the posterior abdominal wall, lateral to the right kidney and anterior to quadratus lumborum.

Like other parts of the colon, it has characteristic features:
- Three teniae coli (bands of longitudinal muscle)
- Haustra (sacculations between teniae)
- Appendices epiploicae (fatty tags)

The ascending colon receives fecal material from the cecum and continues water absorption.`,
      clinical_significance: `Right-sided colon cancer (including ascending colon) often presents late with iron-deficiency anemia rather than obstruction. The retroperitoneal position limits spread laterally but allows posterior extension to kidney. Iatrogenic injury can occur during appendectomy or nephrectomy. Tuberculous ileocecal disease can affect the ascending colon.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Superior mesenteric plexus, vagus nerves',
      blood_supply: 'Ileocolic artery, right colic artery (from superior mesenteric artery)',
      model_reference: 'ascending_colon',
      image_references: [],
      difficulty_rating: 2,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Transverse colon',
      common_names: ['Midcolon'],
      latin_name: 'Colon transversum',
      pronunciation_ipa: '/trænsˈvɜːrs ˈkoʊlən/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Horizontal intraperitoneal segment of large intestine crossing the abdomen from hepatic to splenic flexure.',
      description_full: `The transverse colon is the longest (approximately 45 cm) and most mobile segment of the large intestine. It extends from the right colic (hepatic) flexure to the left colic (splenic) flexure.

The transverse colon is entirely intraperitoneal, suspended by the transverse mesocolon, which attaches to the anterior border of the pancreas. This allows significant mobility and variation in position.

The transverse colon is related to:
- Anteriorly: Greater omentum (attached along its anterior surface)
- Posteriorly: Second part of duodenum, head of pancreas, small intestine loops
- Superiorly: Liver (right), stomach, spleen (left)

The splenic flexure is typically higher and more acute than the hepatic flexure, and is anchored by the phrenocolic ligament.`,
      clinical_significance: `The embryological transition between midgut and hindgut occurs at the distal third of transverse colon, marking the watershed zone between SMA and IMA territories (Griffith\'s point). This area is vulnerable to ischemia. Transverse colon volvulus is rare but serious. The splenic flexure is a common site for colonoscopic difficulty. Colon cancer at the hepatic or splenic flexures can present with obstruction.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Proximal 2/3: superior mesenteric plexus, vagus; Distal 1/3: inferior mesenteric plexus, pelvic splanchnic nerves',
      blood_supply: 'Middle colic artery (from SMA), left colic artery (from IMA)',
      model_reference: 'transverse_colon',
      image_references: [],
      difficulty_rating: 3,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Descending colon',
      common_names: ['Left colon'],
      latin_name: 'Colon descendens',
      pronunciation_ipa: '/dɪˈsɛndɪŋ ˈkoʊlən/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Vertical retroperitoneal segment of large intestine descending from splenic flexure to sigmoid colon.',
      description_full: `The descending colon extends inferiorly from the left colic (splenic) flexure to the sigmoid colon. It is approximately 25 cm long and located in the left lumbar and left iliac regions.

Like the ascending colon, the descending colon is retroperitoneal, covered by peritoneum on its anterior and lateral surfaces only. It lies against the posterior abdominal wall, lateral to the left kidney and anterior to quadratus lumborum.

The descending colon is typically narrower than the ascending colon. The transition to the sigmoid colon occurs at the pelvic brim, where the colon regains a mesentery and becomes intraperitoneal.

The descending colon continues the absorption of water and electrolytes, and storage of fecal material.`,
      clinical_significance: `Left-sided colon cancer (including descending colon) more commonly presents with obstruction due to smaller luminal diameter and solid stool. Diverticulosis predominantly affects the sigmoid colon but can extend to the descending colon. The retroperitoneal position protects against volvulus but limits surgical mobilization. Iatrogenic injury can occur during left nephrectomy or splenectomy.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Inferior mesenteric plexus, pelvic splanchnic nerves (S2-S4)',
      blood_supply: 'Left colic artery, sigmoid arteries (from inferior mesenteric artery)',
      model_reference: 'descending_colon',
      image_references: [],
      difficulty_rating: 2,
      prerequisite_ids: [],
    },

    // ========================================================================
    // SOLID ORGANS
    // ========================================================================
    {
      canonical_name: 'Liver',
      common_names: ['Hepatic liver'],
      latin_name: 'Hepar',
      pronunciation_ipa: '/ˈlɪvər/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Largest internal organ and gland, located in right upper quadrant, responsible for metabolism, detoxification, and bile production.',
      description_full: `The liver is the largest solid organ (1.4-1.6 kg) and gland in the body, occupying most of the right upper quadrant and epigastrium. It has two anatomical lobes (right larger, left smaller) separated by the falciform ligament.

Functionally, the liver is divided into eight segments (Couinaud classification) based on portal vein and hepatic vein distribution. The segments are grouped into right and left hemilivers by Cantlie\'s line (from IVC to gallbladder fossa).

The liver has a dual blood supply:
- Hepatic artery proper (25%): oxygenated blood
- Portal vein (75%): nutrient-rich deoxygenated blood from GI tract

The liver is covered by peritoneum except at the bare area (posterior surface) and has peritoneal reflections forming ligaments: falciform, coronary, triangular (right and left), and lesser omentum.`,
      clinical_significance: `Cirrhosis can lead to portal hypertension, ascites, and liver failure. Hepatocellular carcinoma is a common primary malignancy, often arising in cirrhotic liver. The liver is a common site for metastases (colon cancer). Couinaud segmentation enables precise surgical resection. The porta hepatis contains the portal triad (portal vein, hepatic artery, common bile duct). TIPS procedure creates portosystemic shunt.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Hepatic plexus (sympathetic from celiac plexus, parasympathetic from vagus)',
      blood_supply: 'Hepatic artery proper (from common hepatic artery), portal vein',
      model_reference: 'liver',
      image_references: [],
      difficulty_rating: 4,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Gallbladder',
      common_names: ['Cholecyst'],
      latin_name: 'Vesica biliaris',
      pronunciation_ipa: '/ˈɡɔːlˌblædər/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Pear-shaped sac on the inferior surface of the liver that stores and concentrates bile.',
      description_full: `The gallbladder is a pear-shaped sac (7-10 cm long, 30-50 mL capacity) located in the gallbladder fossa on the inferior surface of the right hepatic lobe. It has three parts: fundus (rounded tip, projects below liver edge), body (main portion), and neck (tapered portion leading to cystic duct).

The neck contains a mucosal fold called Hartmann\'s pouch, a common site for gallstone impaction. The spiral valve of Heister in the cystic duct maintains patency.

The gallbladder is intraperitoneal on its inferior surface but attached directly to the liver superiorly. It stores and concentrates bile (5-10 fold) produced by the liver. Cholecystokinin (CCK) released during meals causes gallbladder contraction and sphincter of Oddi relaxation.`,
      clinical_significance: `Cholelithiasis (gallstones) affects 10-15% of adults. Acute cholecystitis results from cystic duct obstruction, with Murphy\'s sign (inspiratory arrest on RUQ palpation) being characteristic. Chronic cholecystitis causes porcelain gallbladder (calcification). Gallstone ileus occurs when a large stone erodes into duodenum causing small bowel obstruction. Mirizzi syndrome involves bile duct obstruction by impacted gallstone.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Celiac plexus (sympathetic), vagus nerve (parasympathetic)',
      blood_supply: 'Cystic artery (usually from right hepatic artery)',
      model_reference: 'gallbladder',
      image_references: [],
      difficulty_rating: 3,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Pancreas',
      common_names: ['Pancreatic gland'],
      latin_name: 'Pancreas',
      pronunciation_ipa: '/ˈpæŋkriəs/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Retroperitoneal gland extending from C-loop of duodenum to splenic hilum, with exocrine and endocrine functions.',
      description_full: `The pancreas is an elongated retroperitoneal organ (12-15 cm long) extending transversely across the posterior abdominal wall from the C-shaped curve of the duodenum to the splenic hilum. It has four parts: head (with uncinate process), neck, body, and tail.

The head lies within the duodenal C-loop, with the uncinate process extending posteriorly behind the superior mesenteric vessels. The neck overlies the portal vein confluence. The body extends to the left, crossing the aorta, IVC, and left kidney. The tail reaches the splenic hilum, becoming intraperitoneal within the splenorenal ligament.

The pancreas has dual function:
- Exocrine: produces digestive enzymes (via pancreatic duct)
- Endocrine: produces hormones insulin, glucagon, somatostatin (from islets of Langerhans)

The main pancreatic duct joins the common bile duct at the hepatopancreatic ampulla. The accessory pancreatic duct (of Santorini) drains the upper head.`,
      clinical_significance: `Acute pancreatitis causes severe epigastric pain radiating to back, elevated amylase/lipase, and can lead to necrotizing pancreatitis. Chronic pancreatitis causes exocrine insufficiency and diabetes. Pancreatic adenocarcinoma (head most common) has poor prognosis; Whipple procedure is the surgical treatment. The close relationship to major vessels limits resectability. Pancreas divisum is a common variant.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Celiac and superior mesenteric plexuses (sympathetic), vagus nerves (parasympathetic)',
      blood_supply: 'Superior and inferior pancreaticoduodenal arteries, splenic artery branches',
      model_reference: 'pancreas',
      image_references: [],
      difficulty_rating: 4,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Spleen',
      common_names: ['Splenic organ', 'Lien'],
      latin_name: 'Splen',
      pronunciation_ipa: '/spliːn/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Largest lymphoid organ, located in left upper quadrant, responsible for immune function and blood filtration.',
      description_full: `The spleen is the largest lymphoid organ (approximately 12 cm long, 150-200 g), located in the left upper quadrant beneath ribs 9-11. It is entirely intraperitoneal, connected to surrounding structures by peritoneal reflections.

The spleen has a smooth convex diaphragmatic surface and a concave visceral surface with impressions from adjacent organs (gastric, renal, colic). The splenic hilum on the visceral surface transmits the splenic vessels.

The spleen is anchored by several ligaments:
- Gastrosplenic ligament: connects to greater curvature of stomach, contains short gastric and left gastroepiploic vessels
- Splenorenal (lienorenal) ligament: connects to left kidney, contains splenic vessels and tail of pancreas
- Phrenicocolic ligament: from splenic flexure to diaphragm

The spleen functions in immune surveillance, blood filtration, removal of old RBCs, and storage of platelets.`,
      clinical_significance: `Splenomegaly has numerous causes (infection, hematologic malignancy, portal hypertension, storage diseases). Splenic rupture from blunt trauma can cause life-threatening hemorrhage; the spleen is the most commonly injured organ in blunt abdominal trauma. Splenectomy increases infection risk (encapsulated organisms). Accessory spleens (splenunculi) are common. Kehr\'s sign (left shoulder pain) suggests splenic rupture.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Celiac plexus (sympathetic)',
      blood_supply: 'Splenic artery (from celiac trunk)',
      model_reference: 'spleen',
      image_references: [],
      difficulty_rating: 3,
      prerequisite_ids: [],
    },

    // ========================================================================
    // URINARY SYSTEM
    // ========================================================================
    {
      canonical_name: 'Right kidney',
      common_names: ['Right renal organ'],
      latin_name: 'Ren dexter',
      pronunciation_ipa: '/raɪt ˈkɪdni/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Bean-shaped retroperitoneal organ in right upper quadrant responsible for urine formation and endocrine functions.',
      description_full: `The right kidney is a bean-shaped retroperitoneal organ located in the right upper lumbar region (T12-L3 level), slightly lower than the left kidney due to the liver. It measures approximately 10-12 cm long, 5-7 cm wide, and 3 cm thick.

The kidney has an outer cortex and inner medulla organized into 8-18 renal pyramids. Each pyramid drains into a minor calyx, which merge to form 2-3 major calyces, which unite to form the renal pelvis. The renal hilum transmits the renal vein (anterior), renal artery (middle), and renal pelvis (posterior).

The kidney is surrounded by three layers:
- Renal capsule (fibrous)
- Perirenal fat (adipose capsule)
- Renal fascia (Gerota\'s fascia)

The right kidney is related to: liver (superior), duodenum (medial), ascending colon (anterior), and quadratus lumborum (posterior).`,
      clinical_significance: `The right kidney is slightly lower, making it more accessible for biopsy. Nephrolithiasis (kidney stones) can cause severe flank pain radiating to groin. Renal cell carcinoma classically presents with hematuria, flank pain, and palpable mass. Polycystic kidney disease causes bilateral enlargement. The renal arteries are end arteries; infarction causes wedge-shaped necrosis. IVC tumor thrombus can extend from right renal vein.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Renal plexus (sympathetic T10-L1, parasympathetic from vagus)',
      blood_supply: 'Right renal artery (from abdominal aorta at L1-L2)',
      model_reference: 'right_kidney',
      image_references: [],
      difficulty_rating: 3,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Left kidney',
      common_names: ['Left renal organ'],
      latin_name: 'Ren sinister',
      pronunciation_ipa: '/lɛft ˈkɪdni/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Bean-shaped retroperitoneal organ in left upper quadrant, positioned slightly higher than right kidney.',
      description_full: `The left kidney is similar in structure to the right kidney but positioned slightly higher (T11-L2 level) and more medially positioned. It has the same internal organization with cortex, medulla, pyramids, and collecting system.

The left kidney is related to:
- Superiorly: spleen, stomach, pancreas tail
- Anteriorly: stomach, pancreas tail, splenic flexure, jejunum
- Medially: suprarenal gland
- Posteriorly: diaphragm, 11th-12th ribs, quadratus lumborum

The left renal vein is longer than the right (7 cm vs 2 cm) and crosses anterior to the aorta to reach the IVC. It receives the left gonadal and left suprarenal veins.`,
      clinical_significance: `The left renal vein\'s anterior position to aorta makes it vulnerable to compression by the SMA (nutcracker syndrome), causing hematuria and varicocele. The longer left renal vein is preferred for living donor nephrectomy. Splenic flexure or pancreatic tail pathology can affect the left kidney. The left kidney\'s higher position makes access more challenging.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Renal plexus (sympathetic T10-L1, parasympathetic from vagus)',
      blood_supply: 'Left renal artery (from abdominal aorta at L1-L2)',
      model_reference: 'left_kidney',
      image_references: [],
      difficulty_rating: 3,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Right ureter',
      common_names: ['Right ureteric tube'],
      latin_name: 'Ureter dexter',
      pronunciation_ipa: '/raɪt jʊˈriːtər/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Muscular tube (25-30 cm) conveying urine from right renal pelvis to bladder, with three physiological constrictions.',
      description_full: `The right ureter is a muscular tube approximately 25-30 cm long that conveys urine from the right renal pelvis to the urinary bladder. It descends retroperitoneally along the anterior surface of the psoas major muscle.

The ureter has three physiological constrictions where stones commonly lodge:
1. Ureteropelvic junction (UPJ)
2. Pelvic brim (where ureter crosses common iliac vessels)
3. Ureterovesical junction (UVJ)

The right ureter has specific anatomical relations:
- Crosses anterior to right common iliac artery at pelvic brim
- In males: crossed by testicular vessels, lies lateral to ductus deferens
- In females: crossed by ovarian vessels, runs lateral to cervix in parametrium

The ureter enters the bladder obliquely through the detrusor muscle, creating a flap-valve mechanism preventing reflux.`,
      clinical_significance: `Ureteral stones cause severe colicky flank pain radiating to groin. The three constriction points are common impaction sites. Iatrogenic ureteral injury can occur during colorectal, gynecologic, or vascular surgery. "Water under the bridge" mnemonic: ureter passes under uterine artery in females. Vesicoureteral reflux predisposes to pyelonephritis. Transitional cell carcinoma can affect the ureter.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Renal, testicular/ovarian, and hypogastric plexuses',
      blood_supply: 'Multiple sources: renal artery, gonadal artery, common iliac artery, internal iliac artery, vesical arteries',
      model_reference: 'right_ureter',
      image_references: [],
      difficulty_rating: 3,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Left ureter',
      common_names: ['Left ureteric tube'],
      latin_name: 'Ureter sinister',
      pronunciation_ipa: '/lɛft jʊˈriːtər/',
      structure_type: StructureType.ORGAN,
      parent_structure_id: null,
      definition_brief: 'Muscular tube conveying urine from left renal pelvis to bladder, similar course to right with slight anatomical variations.',
      description_full: `The left ureter has the same structure and length (25-30 cm) as the right ureter but with slightly different anatomical relations due to asymmetry of abdominal organs.

The left ureter descends along the left psoas major muscle and crosses anterior to the left common iliac artery at the pelvic brim. It has the same three physiological constrictions as the right ureter.

Specific anatomical relations:
- Crossed by left colic vessels
- In males: crossed by left testicular vessels
- In females: crossed by left ovarian vessels, runs lateral to cervix

The blood supply to the left ureter comes from multiple arterial sources along its length, creating a rich anastomotic network.`,
      clinical_significance: 'The left ureter has similar clinical considerations to the right. Descending colon pathology or diverticulitis can affect the left ureter. Left ureteral injury can occur during sigmoid colectomy or left hemicolectomy. The relationship to ovarian vessels in females is important during oophorectomy. Retroperitoneal fibrosis can encase both ureters.',
      origin: null,
      insertion: null,
      action: null,
      innervation: 'Renal, testicular/ovarian, and hypogastric plexuses',
      blood_supply: 'Multiple sources: renal artery, gonadal artery, common iliac artery, internal iliac artery, vesical arteries',
      model_reference: 'left_ureter',
      image_references: [],
      difficulty_rating: 3,
      prerequisite_ids: [],
    },

    // ========================================================================
    // MAJOR ARTERIES
    // ========================================================================
    {
      canonical_name: 'Celiac trunk',
      common_names: ['Celiac artery', 'Celiac axis'],
      latin_name: 'Truncus coeliacus',
      pronunciation_ipa: '/ˈsiːliæk trʌŋk/',
      structure_type: StructureType.ARTERY,
      parent_structure_id: null,
      definition_brief: 'First major unpaired branch of abdominal aorta (T12 level), supplying foregut derivatives via three branches.',
      description_full: `The celiac trunk is a short (1.5-2 cm), wide vessel arising from the anterior surface of the abdominal aorta at the T12 vertebral level, just below the aortic hiatus of the diaphragm.

It immediately divides into three major branches (classic trifurcation):
1. Left gastric artery (smallest): ascends to gastroesophageal junction
2. Common hepatic artery: runs right along superior border of pancreas
3. Splenic artery (largest): runs left along superior border of pancreas

The celiac trunk supplies all foregut derivatives: distal esophagus, stomach, proximal duodenum (to major papilla), liver, gallbladder, pancreas, and spleen.

The celiac trunk is surrounded by the celiac plexus (sympathetic) and celiac lymph nodes. The median arcuate ligament of the diaphragm crosses anteriorly, potentially causing compression.`,
      clinical_significance: `Median arcuate ligament syndrome (MALS) causes celiac artery compression and chronic mesenteric ischemia. Celiac artery stenosis can lead to pancreaticoduodenal arcade enlargement (collateral pathway with SMA). Celiac trunk aneurysms are rare. The celiac axis is important in liver transplantation. Variant anatomy is common (hepatosplenic trunk, hepatogastric trunk).`,
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: null,
      model_reference: 'celiac_trunk',
      image_references: [],
      difficulty_rating: 4,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Superior mesenteric artery',
      common_names: ['SMA'],
      latin_name: 'Arteria mesenterica superior',
      pronunciation_ipa: '/suːˈpɪəriər ˌmɛzənˈtɛrɪk ˈɑːrtəri/',
      structure_type: StructureType.ARTERY,
      parent_structure_id: null,
      definition_brief: 'Second major unpaired branch of abdominal aorta (L1 level), supplying midgut from distal duodenum to proximal two-thirds of transverse colon.',
      description_full: `The superior mesenteric artery (SMA) arises from the anterior surface of the abdominal aorta at the L1 vertebral level, approximately 1 cm below the celiac trunk. It descends behind the neck of the pancreas, crosses anterior to the uncinate process and third part of duodenum, then enters the root of the small bowel mesentery.

Major branches:
- Inferior pancreaticoduodenal artery (first branch)
- 15-18 jejunal and ileal arteries (from left side)
- Ileocolic artery (supplies terminal ileum, cecum, appendix)
- Right colic artery (supplies ascending colon)
- Middle colic artery (supplies transverse colon)

The SMA supplies all midgut derivatives: distal duodenum (from major papilla), jejunum, ileum, cecum, appendix, ascending colon, and proximal two-thirds of transverse colon.

The SMA and SMV run together in the mesentery root, with the vein to the right of the artery.`,
      clinical_significance: `Acute SMA occlusion (thrombosis or embolism) causes severe acute mesenteric ischemia, a surgical emergency. Chronic SMA stenosis causes intestinal angina (postprandial pain). SMA syndrome occurs when the third part of duodenum is compressed between SMA and aorta. The SMA-IMA watershed zone (Griffith\'s point at splenic flexure) is vulnerable to ischemia. SMA dissection is rare but serious.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: null,
      model_reference: 'superior_mesenteric_artery',
      image_references: [],
      difficulty_rating: 4,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Inferior mesenteric artery',
      common_names: ['IMA'],
      latin_name: 'Arteria mesenterica inferior',
      pronunciation_ipa: '/ɪnˈfɪəriər ˌmɛzənˈtɛrɪk ˈɑːrtəri/',
      structure_type: StructureType.ARTERY,
      parent_structure_id: null,
      definition_brief: 'Third major unpaired branch of abdominal aorta (L3 level), supplying hindgut from distal transverse colon to upper rectum.',
      description_full: `The inferior mesenteric artery (IMA) arises from the anterior surface of the abdominal aorta at the L3 vertebral level, approximately 3-4 cm above the aortic bifurcation.

Major branches:
- Left colic artery (ascends to supply descending colon and distal transverse colon)
- 2-3 sigmoid arteries (supply sigmoid colon)
- Superior rectal artery (terminal branch, supplies upper rectum)

The IMA supplies all hindgut derivatives: distal third of transverse colon, descending colon, sigmoid colon, and upper rectum.

The IMA is smaller in caliber than the SMA. The left colic artery anastomoses with the middle colic artery (from SMA) at the splenic flexure, forming the marginal artery of Drummond. An additional anastomosis (arc of Riolan) may exist between left and middle colic arteries.`,
      clinical_significance: `The IMA is ligated during left hemicolectomy and anterior resection for colon cancer. Collateral circulation via marginal artery and arc of Riolan is critical for colonic viability after IMA ligation. Sudeck\'s critical point (rectosigmoid junction) is a watershed zone between superior rectal and middle rectal arteries. IMA occlusion is better tolerated than SMA occlusion due to collaterals. The IMA origin is a landmark for aortic surgery.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: null,
      model_reference: 'inferior_mesenteric_artery',
      image_references: [],
      difficulty_rating: 4,
      prerequisite_ids: [],
    },

    // ========================================================================
    // MAJOR VEINS
    // ========================================================================
    {
      canonical_name: 'Portal vein',
      common_names: ['Hepatic portal vein'],
      latin_name: 'Vena portae hepatis',
      pronunciation_ipa: '/ˈpɔːrtəl veɪn/',
      structure_type: StructureType.VEIN,
      parent_structure_id: null,
      definition_brief: 'Large vein (8 cm) formed by confluence of SMV and splenic vein, carries nutrient-rich blood from GI tract to liver.',
      description_full: `The portal vein is formed behind the neck of the pancreas by the union of the superior mesenteric vein (SMV) and splenic vein. It is approximately 8 cm long and ascends to the right toward the porta hepatis.

The portal vein is a key component of the portal triad (along with hepatic artery proper and common bile duct) within the hepatoduodenal ligament. At the porta hepatis, it divides into right and left branches.

Tributaries:
- Superior mesenteric vein (drains midgut)
- Splenic vein (drains spleen, pancreas, left gastroepiploic, inferior mesenteric vein)
- Left and right gastric veins (directly to portal vein)
- Cystic vein
- Paraumbilical veins (in falciform ligament)

The portal venous system has no valves. It drains blood from the GI tract (esophagus to rectum), spleen, pancreas, and gallbladder, delivering nutrients and other substances to the liver for processing.`,
      clinical_significance: `Portal hypertension (>10 mmHg) develops from cirrhosis, leading to varices (esophageal, gastric, rectal), splenomegaly, and ascites. Portosystemic anastomoses enlarge: esophageal (left gastric-azygos), rectal (superior rectal-middle/inferior rectal), paraumbilical (caput medusae), retroperitoneal (colic-lumbar). TIPS (transjugular intrahepatic portosystemic shunt) treats portal hypertension. Bland-Altairi portal vein thrombosis causes mesenteric ischemia.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: null,
      model_reference: 'portal_vein',
      image_references: [],
      difficulty_rating: 4,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Inferior vena cava',
      common_names: ['IVC'],
      latin_name: 'Vena cava inferior',
      pronunciation_ipa: '/ɪnˈfɪəriər ˈviːnə ˈkeɪvə/',
      structure_type: StructureType.VEIN,
      parent_structure_id: null,
      definition_brief: 'Largest vein in the body, formed at L5 by confluence of common iliac veins, returns deoxygenated blood from lower body to right atrium.',
      description_full: `The inferior vena cava (IVC) is the largest vein in the body, formed at the L5 vertebral level by the union of the right and left common iliac veins. It ascends along the right side of the vertebral column, pierces the diaphragm at T8, and enters the right atrium.

The IVC is retroperitoneal throughout its abdominal course. It lies to the right of the aorta and grooves the posterior surface of the liver.

Tributaries (from inferior to superior):
- Common iliac veins (forming IVC)
- Lumbar veins (4 pairs, posterior)
- Right gonadal vein (left drains to left renal vein)
- Renal veins (left longer, crosses anterior to aorta)
- Right suprarenal vein (left drains to left renal vein)
- Inferior phrenic veins
- Hepatic veins (3 major: right, middle, left)

The IVC has no valves and can be compressed by masses, pregnancy, or during positive pressure ventilation.`,
      clinical_significance: `IVC thrombosis can result from extension of iliofemoral DVT or from hypercoagulable states. May-Thurner syndrome involves left common iliac vein compression by right common iliac artery. IVC filters prevent pulmonary embolism in patients with contraindications to anticoagulation. Renal cell carcinoma can form tumor thrombus extending into IVC and right atrium. The IVC-aortic gradient is important in liver disease assessment.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: null,
      model_reference: 'inferior_vena_cava',
      image_references: [],
      difficulty_rating: 3,
      prerequisite_ids: [],
    },

    // ========================================================================
    // NERVES
    // ========================================================================
    {
      canonical_name: 'Vagus nerve (abdominal)',
      common_names: ['Tenth cranial nerve', 'CN X'],
      latin_name: 'Nervus vagus (pars abdominalis)',
      pronunciation_ipa: '/ˈveɪɡəs nɜːrv/',
      structure_type: StructureType.NERVE,
      parent_structure_id: null,
      definition_brief: 'Parasympathetic nerve providing motor and sensory innervation to abdominal foregut and midgut structures.',
      description_full: `The vagus nerves enter the abdomen through the esophageal hiatus at T10, having formed the esophageal plexus in the thorax. The plexus reforms into anterior and posterior vagal trunks:

Anterior vagal trunk (mainly left vagus):
- Hepatic branch (to liver, gallbladder, pylorus)
- Anterior gastric branches (to lesser curvature)

Posterior vagal trunk (mainly right vagus):
- Celiac branch (largest, to celiac plexus, supplies midgut to splenic flexure)
- Posterior gastric branches (to lesser curvature)

The vagal trunks run along the esophagus and stomach, providing parasympathetic innervation to the GI tract from esophagus to splenic flexure (midgut-hindgut junction).

Vagal innervation promotes GI motility and secretion. The vagus contains both motor (parasympathetic) and sensory fibers.`,
      clinical_significance: `Truncal vagotomy (cutting both vagal trunks) was historically performed for peptic ulcer disease but caused gastric stasis requiring drainage procedure. Selective vagotomy spares the hepatic and celiac branches, preserving pyloric function. Highly selective vagotomy (proximal gastric vagotomy) preserves antral innervation. Vagal dysfunction can cause gastroparesis. The vagus mediates the gastrocolic reflex.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: null,
      model_reference: 'vagus_nerve_abdominal',
      image_references: [],
      difficulty_rating: 4,
      prerequisite_ids: [],
    },
    {
      canonical_name: 'Greater splanchnic nerve',
      common_names: ['Major splanchnic nerve'],
      latin_name: 'Nervus splanchnicus major',
      pronunciation_ipa: '/ˈɡreɪtər ˈsplæŋknɪk nɜːrv/',
      structure_type: StructureType.NERVE,
      parent_structure_id: null,
      definition_brief: 'Sympathetic nerve formed from T5-T9 ganglia, provides presynaptic fibers to celiac ganglion for foregut innervation.',
      description_full: `The greater splanchnic nerve is formed by preganglionic sympathetic fibers from the T5-T9 spinal cord segments and sympathetic trunk ganglia. It descends along the thoracic vertebral column, pierces the diaphragm, and synapses in the celiac ganglion.

The nerve carries:
- Preganglionic sympathetic fibers (to celiac ganglion)
- Visceral afferent (pain) fibers from foregut structures

Postganglionic fibers from the celiac ganglion distribute via the celiac plexus to foregut derivatives: stomach, liver, gallbladder, pancreas, spleen, and small intestine to mid-transverse colon.

The greater splanchnic nerve mediates sympathetic effects: vasoconstriction, decreased motility, decreased secretion, and sphincter contraction. It also carries visceral pain fibers.`,
      clinical_significance: `Splanchnic nerve blocks provide pain relief for chronic pancreatitis and upper abdominal malignancies. The splanchnic nerves carry visceral pain from foregut structures; referred pain is felt in the epigastrium. Splanchnicectomy was historically performed for hypertension. The nerve is preserved during celiac plexus neurolysis for cancer pain. Visceral pain from foregut pathology travels via splanchnic nerves.`,
      origin: null,
      insertion: null,
      action: null,
      innervation: null,
      blood_supply: null,
      model_reference: 'greater_splanchnic_nerve',
      image_references: [],
      difficulty_rating: 4,
      prerequisite_ids: [],
    },

    // Additional structures would continue here to reach 60+ total
    // Including: Lesser/Least splanchnic nerves, Lumbar plexus components,
    // Adrenal glands, Additional vessels, Peritoneal structures, etc.
  ],

  // ============================================================================
  // RELATIONSHIPS (80+ relationships)
  // ============================================================================
  relationships: [
    // Muscle relationships
    {
      source_structure: 'Rectus abdominis',
      target_structure: 'External oblique',
      relationship_type: RelationshipType.DEEP_TO,
      description: 'The rectus abdominis lies deep to the external oblique aponeurosis, which forms the anterior rectus sheath.',
      bidirectional: false,
      clinical_relevance: 'Understanding this relationship is crucial for abdominal wall incisions and hernia repair.',
    },
    {
      source_structure: 'Internal oblique',
      target_structure: 'External oblique',
      relationship_type: RelationshipType.DEEP_TO,
      description: 'The internal oblique lies immediately deep to the external oblique, with fibers running perpendicular.',
      bidirectional: false,
      clinical_relevance: 'These layers must be identified separately during surgical repair of abdominal wall defects.',
    },
    {
      source_structure: 'Transversus abdominis',
      target_structure: 'Internal oblique',
      relationship_type: RelationshipType.DEEP_TO,
      description: 'The transversus abdominis is the deepest of the three lateral abdominal wall muscles.',
      bidirectional: false,
      clinical_relevance: 'The transversus abdominis plane (TAP) between internal oblique and transversus is used for regional anesthesia.',
    },

    // GI tract continuity
    {
      source_structure: 'Abdominal esophagus',
      target_structure: 'Stomach',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The abdominal esophagus is continuous with the stomach at the gastroesophageal junction.',
      bidirectional: false,
      clinical_relevance: 'The GE junction is a critical area for reflux disease, Barrett\'s esophagus, and hiatal hernias.',
    },
    {
      source_structure: 'Stomach',
      target_structure: 'Duodenum',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The pyloric portion of the stomach is continuous with the first part of the duodenum at the pylorus.',
      bidirectional: false,
      clinical_relevance: 'The pylorus regulates gastric emptying; pyloric stenosis causes gastric outlet obstruction.',
    },
    {
      source_structure: 'Duodenum',
      target_structure: 'Jejunum',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The duodenum continues as the jejunum at the duodenojejunal flexure (ligament of Treitz).',
      bidirectional: false,
      clinical_relevance: 'The DJ flexure marks the transition from retroperitoneal to intraperitoneal bowel and is a key surgical landmark.',
    },
    {
      source_structure: 'Jejunum',
      target_structure: 'Ileum',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The jejunum gradually transitions to ileum without distinct anatomical demarcation.',
      bidirectional: false,
      clinical_relevance: 'The jejunum-ileum transition is based on cumulative differences in wall thickness, vascularity, and plicae.',
    },
    {
      source_structure: 'Ileum',
      target_structure: 'Cecum',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The terminal ileum enters the cecum at the ileocecal valve.',
      bidirectional: false,
      clinical_relevance: 'The ileocecal valve prevents reflux of colonic contents; competency is important in colon obstruction.',
    },
    {
      source_structure: 'Cecum',
      target_structure: 'Ascending colon',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The cecum is continuous with the ascending colon superiorly.',
      bidirectional: false,
      clinical_relevance: 'This junction is typically in the right iliac fossa; cecal bascule is a variant of cecal volvulus.',
    },
    {
      source_structure: 'Ascending colon',
      target_structure: 'Transverse colon',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The ascending colon continues as the transverse colon at the hepatic flexure.',
      bidirectional: false,
      clinical_relevance: 'The hepatic flexure is anchored by the hepatocolic ligament; it can be injured during right hemicolectomy.',
    },
    {
      source_structure: 'Transverse colon',
      target_structure: 'Descending colon',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The transverse colon continues as the descending colon at the splenic flexure.',
      bidirectional: false,
      clinical_relevance: 'The splenic flexure is the highest point of the colon and is a watershed zone (Griffith\'s point).',
    },

    // Appendix relationships
    {
      source_structure: 'Appendix',
      target_structure: 'Cecum',
      relationship_type: RelationshipType.BRANCH_OF,
      description: 'The appendix arises from the posteromedial wall of the cecum at the convergence of the teniae coli.',
      bidirectional: false,
      clinical_relevance: 'The appendiceal base is constant, but the tip position varies; this affects presentation of appendicitis.',
    },

    // Liver relationships
    {
      source_structure: 'Liver',
      target_structure: 'Gallbladder',
      relationship_type: RelationshipType.CONTAINS,
      description: 'The gallbladder is located in the gallbladder fossa on the inferior surface of the liver.',
      bidirectional: false,
      clinical_relevance: 'Cholecystitis can cause pericholecystic inflammation involving the liver; Fitz-Hugh-Curtis syndrome causes perihepatitis.',
    },

    // Pancreas relationships
    {
      source_structure: 'Pancreas',
      target_structure: 'Duodenum',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The pancreatic head is intimately related to the C-loop of the duodenum, with the uncinate process posterior to the SMV.',
      bidirectional: false,
      clinical_relevance: 'Pancreatic head tumors can cause biliary or duodenal obstruction; Whipple procedure removes both structures.',
    },
    {
      source_structure: 'Pancreas',
      target_structure: 'Spleen',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The tail of the pancreas extends to the splenic hilum within the splenorenal ligament.',
      bidirectional: false,
      clinical_relevance: 'Splenic preservation during distal pancreatectomy requires careful dissection of pancreatic tail from splenic vessels.',
    },

    // Vascular supply relationships - Celiac trunk
    {
      source_structure: 'Celiac trunk',
      target_structure: 'Stomach',
      relationship_type: RelationshipType.SUPPLIED_BY,
      description: 'The celiac trunk supplies the stomach via left gastric, right gastric, and gastroepiploic arteries.',
      bidirectional: false,
      clinical_relevance: 'Understanding gastric arterial anatomy is critical for gastric surgery and managing bleeding ulcers.',
    },
    {
      source_structure: 'Celiac trunk',
      target_structure: 'Liver',
      relationship_type: RelationshipType.SUPPLIED_BY,
      description: 'The celiac trunk supplies the liver via the common hepatic artery and its branches.',
      bidirectional: false,
      clinical_relevance: 'Variant hepatic arterial anatomy is common; preoperative imaging is essential for liver surgery.',
    },
    {
      source_structure: 'Celiac trunk',
      target_structure: 'Spleen',
      relationship_type: RelationshipType.SUPPLIED_BY,
      description: 'The celiac trunk supplies the spleen via the splenic artery.',
      bidirectional: false,
      clinical_relevance: 'The splenic artery is tortuous and prone to aneurysm formation, especially in pregnancy.',
    },
    {
      source_structure: 'Celiac trunk',
      target_structure: 'Pancreas',
      relationship_type: RelationshipType.SUPPLIED_BY,
      description: 'The celiac trunk supplies the pancreas via branches of the splenic and gastroduodenal arteries.',
      bidirectional: false,
      clinical_relevance: 'Pancreatic arterial anatomy is critical for pancreatic surgery; vascular injuries can be life-threatening.',
    },
    {
      source_structure: 'Celiac trunk',
      target_structure: 'Duodenum',
      relationship_type: RelationshipType.SUPPLIED_BY,
      description: 'The celiac trunk supplies the proximal duodenum (to major papilla) via superior pancreaticoduodenal arteries.',
      bidirectional: false,
      clinical_relevance: 'The pancreaticoduodenal arcade provides collateral circulation between celiac trunk and SMA.',
    },

    // Vascular supply relationships - SMA
    {
      source_structure: 'Superior mesenteric artery',
      target_structure: 'Duodenum',
      relationship_type: RelationshipType.SUPPLIED_BY,
      description: 'The SMA supplies the distal duodenum (from major papilla) via inferior pancreaticoduodenal arteries.',
      bidirectional: false,
      clinical_relevance: 'The transition at the major papilla marks the foregut-midgut embryological boundary.',
    },
    {
      source_structure: 'Superior mesenteric artery',
      target_structure: 'Jejunum',
      relationship_type: RelationshipType.SUPPLIED_BY,
      description: 'The SMA supplies the jejunum via jejunal arteries with 1-2 arterial arcades.',
      bidirectional: false,
      clinical_relevance: 'Jejunal arterial anatomy with fewer arcades and longer vasa recta creates distinct vascular patterns.',
    },
    {
      source_structure: 'Superior mesenteric artery',
      target_structure: 'Ileum',
      relationship_type: RelationshipType.SUPPLIED_BY,
      description: 'The SMA supplies the ileum via ileal arteries with 3-5 arterial arcades.',
      bidirectional: false,
      clinical_relevance: 'The extensive arterial arcades of the ileum provide robust collateral circulation.',
    },
    {
      source_structure: 'Superior mesenteric artery',
      target_structure: 'Cecum',
      relationship_type: RelationshipType.SUPPLIED_BY,
      description: 'The SMA supplies the cecum via the ileocolic artery.',
      bidirectional: false,
      clinical_relevance: 'The ileocolic artery is the most distal and reliable branch of the SMA.',
    },
    {
      source_structure: 'Superior mesenteric artery',
      target_structure: 'Appendix',
      relationship_type: RelationshipType.SUPPLIED_BY,
      description: 'The SMA supplies the appendix via the appendicular artery (branch of ileocolic artery).',
      bidirectional: false,
      clinical_relevance: 'The appendicular artery is an end artery; thrombosis can lead to appendiceal gangrene.',
    },
    {
      source_structure: 'Superior mesenteric artery',
      target_structure: 'Ascending colon',
      relationship_type: RelationshipType.SUPPLIED_BY,
      description: 'The SMA supplies the ascending colon via ileocolic and right colic arteries.',
      bidirectional: false,
      clinical_relevance: 'Right colic artery is absent in up to 20% of individuals; ileocolic artery provides collateral.',
    },
    {
      source_structure: 'Superior mesenteric artery',
      target_structure: 'Transverse colon',
      relationship_type: RelationshipType.SUPPLIED_BY,
      description: 'The SMA supplies the proximal two-thirds of transverse colon via the middle colic artery.',
      bidirectional: false,
      clinical_relevance: 'The middle colic artery territory meets the IMA territory at Griffith\'s point (splenic flexure watershed).',
    },

    // Vascular supply relationships - IMA
    {
      source_structure: 'Inferior mesenteric artery',
      target_structure: 'Transverse colon',
      relationship_type: RelationshipType.SUPPLIED_BY,
      description: 'The IMA supplies the distal third of transverse colon via the left colic artery.',
      bidirectional: false,
      clinical_relevance: 'The splenic flexure (Griffith\'s point) is a watershed zone between SMA and IMA territories.',
    },
    {
      source_structure: 'Inferior mesenteric artery',
      target_structure: 'Descending colon',
      relationship_type: RelationshipType.SUPPLIED_BY,
      description: 'The IMA supplies the descending colon via the left colic artery.',
      bidirectional: false,
      clinical_relevance: 'Collateral circulation via the marginal artery of Drummond is critical after IMA ligation.',
    },

    // Portal venous drainage
    {
      source_structure: 'Stomach',
      target_structure: 'Portal vein',
      relationship_type: RelationshipType.DRAINS_TO,
      description: 'The stomach drains via left and right gastric veins to the portal vein.',
      bidirectional: false,
      clinical_relevance: 'Left gastric vein (coronary vein) enlarges in portal hypertension, forming esophageal varices.',
    },
    {
      source_structure: 'Spleen',
      target_structure: 'Portal vein',
      relationship_type: RelationshipType.DRAINS_TO,
      description: 'The spleen drains via the splenic vein, which joins the SMV to form the portal vein.',
      bidirectional: false,
      clinical_relevance: 'Splenic vein thrombosis causes isolated gastric varices; splenectomy may be required.',
    },
    {
      source_structure: 'Pancreas',
      target_structure: 'Portal vein',
      relationship_type: RelationshipType.DRAINS_TO,
      description: 'The pancreas drains via multiple small veins into the splenic and superior mesenteric veins.',
      bidirectional: false,
      clinical_relevance: 'Pancreatic cancer can invade the portal vein, affecting resectability.',
    },
    {
      source_structure: 'Jejunum',
      target_structure: 'Portal vein',
      relationship_type: RelationshipType.DRAINS_TO,
      description: 'The jejunum drains via jejunal veins into the superior mesenteric vein.',
      bidirectional: false,
      clinical_relevance: 'SMV thrombosis causes hemorrhagic infarction of the small bowel.',
    },
    {
      source_structure: 'Ileum',
      target_structure: 'Portal vein',
      relationship_type: RelationshipType.DRAINS_TO,
      description: 'The ileum drains via ileal veins into the superior mesenteric vein.',
      bidirectional: false,
      clinical_relevance: 'Portal vein gas can result from bowel ischemia or infarction.',
    },

    // Nerve innervation
    {
      source_structure: 'Stomach',
      target_structure: 'Vagus nerve (abdominal)',
      relationship_type: RelationshipType.INNERVATED_BY,
      description: 'The stomach receives parasympathetic innervation from the anterior and posterior vagal trunks.',
      bidirectional: false,
      clinical_relevance: 'Vagotomy reduces gastric acid secretion; truncal vagotomy requires drainage procedure.',
    },
    {
      source_structure: 'Stomach',
      target_structure: 'Greater splanchnic nerve',
      relationship_type: RelationshipType.INNERVATED_BY,
      description: 'The stomach receives sympathetic innervation via the greater splanchnic nerve and celiac plexus.',
      bidirectional: false,
      clinical_relevance: 'Sympathetic fibers carry visceral pain; celiac plexus block treats chronic pancreatitis pain.',
    },
    {
      source_structure: 'Jejunum',
      target_structure: 'Vagus nerve (abdominal)',
      relationship_type: RelationshipType.INNERVATED_BY,
      description: 'The jejunum receives parasympathetic innervation from the vagus nerve via the superior mesenteric plexus.',
      bidirectional: false,
      clinical_relevance: 'Vagal innervation promotes peristalsis and secretion in the small bowel.',
    },

    // Kidney relationships
    {
      source_structure: 'Right kidney',
      target_structure: 'Right ureter',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The right renal pelvis is continuous with the right ureter at the ureteropelvic junction.',
      bidirectional: false,
      clinical_relevance: 'UPJ obstruction is a common site of congenital obstruction requiring pyeloplasty.',
    },
    {
      source_structure: 'Left kidney',
      target_structure: 'Left ureter',
      relationship_type: RelationshipType.CONTINUOUS_WITH,
      description: 'The left renal pelvis is continuous with the left ureter at the ureteropelvic junction.',
      bidirectional: false,
      clinical_relevance: 'Stones commonly lodge at the UPJ, pelvic brim, and UVJ (three constriction points).',
    },
    {
      source_structure: 'Right kidney',
      target_structure: 'Inferior vena cava',
      relationship_type: RelationshipType.DRAINS_TO,
      description: 'The right kidney drains via the short right renal vein directly into the IVC.',
      bidirectional: false,
      clinical_relevance: 'The short right renal vein makes right-sided renal tumors more prone to IVC tumor thrombus.',
    },
    {
      source_structure: 'Left kidney',
      target_structure: 'Inferior vena cava',
      relationship_type: RelationshipType.DRAINS_TO,
      description: 'The left kidney drains via the longer left renal vein, which crosses anterior to the aorta to reach the IVC.',
      bidirectional: false,
      clinical_relevance: 'The left renal vein can be compressed between aorta and SMA (nutcracker syndrome).',
    },

    // Liver-IVC relationship
    {
      source_structure: 'Liver',
      target_structure: 'Inferior vena cava',
      relationship_type: RelationshipType.DRAINS_TO,
      description: 'The liver drains via three main hepatic veins (right, middle, left) into the IVC.',
      bidirectional: false,
      clinical_relevance: 'Budd-Chiari syndrome results from hepatic vein thrombosis; IVC stenosis causes similar syndrome.',
    },

    // Additional spatial relationships
    {
      source_structure: 'Pancreas',
      target_structure: 'Portal vein',
      relationship_type: RelationshipType.SUPERFICIAL_TO,
      description: 'The neck of the pancreas lies anterior to the portal vein formation.',
      bidirectional: false,
      clinical_relevance: 'Portal vein involvement by pancreatic cancer affects surgical resectability.',
    },
    {
      source_structure: 'Transverse colon',
      target_structure: 'Stomach',
      relationship_type: RelationshipType.SUPERFICIAL_TO,
      description: 'The transverse colon lies inferior to the greater curvature of the stomach.',
      bidirectional: false,
      clinical_relevance: 'Gastrocolic ligament connects these structures; must be divided during gastrectomy.',
    },

    // Continue adding relationships to reach 80+ total
    // Additional categories to include:
    // - More vascular relationships
    // - Peritoneal ligament attachments
    // - Nerve plexus relationships
    // - Lymphatic drainage patterns
    // - Anatomical spaces and pouches
  ],
};
