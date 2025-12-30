# Netter's Anatomy Learning Tool - Seed Data

## Overview

This directory contains the initial seed data for the Netter's Anatomy Learning Tool, focusing on the **Upper Limb** region as the MVP (Minimum Viable Product) implementation.

## Data Structure

### Files

- **`regions.json`** - All 7 anatomical regions from Netter's Atlas 6th Edition
- **`systems.json`** - All 10 body systems
- **`structures/upper-limb.json`** - 18 detailed anatomical structures for Upper Limb region
- **`relationships/upper-limb.json`** - 35 typed relationships between Upper Limb structures
- **`physical-references.json`** - 57 cross-references to Netter's Atlas and Flashcards

## Upper Limb Structures (18 Total)

### Bones (5)
1. **Humerus** - Upper arm bone
2. **Radius** - Lateral forearm bone
3. **Ulna** - Medial forearm bone
4. **Scapula** - Shoulder blade
5. **Clavicle** - Collarbone

### Muscles (5)
6. **Biceps brachii** - Two-headed elbow flexor and supinator
7. **Triceps brachii** - Three-headed elbow extensor
8. **Deltoid** - Primary shoulder abductor
9. **Brachialis** - Pure elbow flexor
10. **Brachioradialis** - Forearm flexor (mid-prone position)

### Nerves (5)
11. **Brachial plexus** - Complete nerve network (C5-T1)
12. **Musculocutaneous nerve** - Innervates anterior arm
13. **Radial nerve** - Largest branch, innervates extensors
14. **Median nerve** - Innervates forearm flexors and thenar muscles
15. **Ulnar nerve** - Innervates intrinsic hand muscles

### Arteries (3)
16. **Brachial artery** - Main artery of arm
17. **Radial artery** - Lateral forearm artery
18. **Ulnar artery** - Medial forearm artery

## Relationship Types

The data includes 9 relationship types:

- **`articulates_with`** (5) - Bone-to-bone joints
- **`attaches_to`** (11) - Muscle origins and insertions
- **`innervated_by`** (6) - Nerve-to-muscle connections
- **`supplied_by`** (1) - Arterial blood supply
- **`branch_of`** (5) - Nerve/vessel branching patterns
- **`passes_through`** (2) - Anatomical transit routes
- **`continuous_with`** (3) - Spatial continuity
- **`antagonist_to`** (1) - Opposing muscle actions
- **`synergist_with`** (1) - Cooperative muscle actions

## Cross-References

All structures include references to:

- **Netter's Atlas of Human Anatomy, 6th Edition** (Plates 400-468)
- **Netter's Anatomy Flash Cards, 4th Edition** (Cards 200-290)

### Example Atlas References
- Plate 400: Humerus and Scapula (Anterior View)
- Plate 411: Muscles of Arm (Anterior View)
- Plate 416: Brachial Plexus Schema
- Plate 420: Arteries of Upper Limb

## Data Fields

### Structure Entity
```json
{
  "id": "UUID",
  "canonicalName": "Terminologia Anatomica 2019 term",
  "commonNames": ["array of synonyms"],
  "latinName": "Latin terminology",
  "pronunciationIpa": "/IPA pronunciation/",
  "regionId": "UUID reference to region",
  "systemIds": ["array of system UUIDs"],
  "structureType": "bone|muscle|nerve|artery|vein|organ|ligament|fascia",
  "parentStructureId": "UUID or null",
  "definitionBrief": "1-2 sentence definition (≤280 chars)",
  "descriptionFull": "Markdown formatted comprehensive description",
  "clinicalSignificance": "Clinical relevance and pathology",
  "origin": "Muscle origin (muscles only)",
  "insertion": "Muscle insertion (muscles only)",
  "action": "Muscle actions (muscles only)",
  "innervation": "Nerve supply",
  "bloodSupply": "Arterial supply",
  "modelReference": "Z-Anatomy structure ID",
  "imageReferences": ["array of image references"],
  "difficultyRating": 1-5,
  "prerequisiteIds": ["array of prerequisite structure UUIDs"],
  "createdAt": "ISO 8601 timestamp",
  "updatedAt": "ISO 8601 timestamp"
}
```

### Relationship Entity
```json
{
  "id": "UUID",
  "sourceStructureId": "UUID",
  "targetStructureId": "UUID",
  "relationshipType": "see types above",
  "description": "Detailed relationship description",
  "bidirectional": true|false,
  "clinicalRelevance": "Clinical significance of relationship"
}
```

### Physical Reference Entity
```json
{
  "id": "UUID",
  "structureId": "UUID",
  "resourceType": "atlas|coloring_book|flashcard",
  "edition": "Edition string",
  "isbn": "ISBN-13",
  "primaryNumber": "Plate/Card/Exercise number",
  "pageNumber": "Page number or null",
  "title": "Plate/Card title",
  "notes": "Additional notes",
  "isPrimary": true|false
}
```

## Content Quality Standards

All content follows these principles:

1. **Anatomical Accuracy** - Verified against Terminologia Anatomica 2019 and Netter's Atlas 6th Edition
2. **Clinical Relevance** - Every major structure includes clinical significance
3. **Progressive Disclosure** - Content layered from brief definitions to comprehensive descriptions
4. **Relationship Focus** - Minimum 3 relationships per structure
5. **Educational Depth** - Descriptions suitable for non-medical learners with anatomical interest

## Usage

This seed data should be loaded into the application's IndexedDB database during initialization. The data structure supports:

- Interactive 3D model exploration (via modelReference IDs)
- Cross-reference navigation to physical Netter's resources
- Relationship-based learning and synthesis exercises
- Spaced repetition flashcard generation
- Clinical context for enhanced retention

## Future Expansion

Additional regions to be added in subsequent phases:
- Head & Neck (Plates 1-148)
- Back & Spinal Cord (Plates 149-177)
- Thorax (Plates 178-241)
- Abdomen (Plates 242-328)
- Pelvis & Perineum (Plates 329-399)
- Lower Limb (Plates 469-531)

Each region will follow the same data structure and quality standards established in this Upper Limb MVP implementation.

## Version History

- **v1.0** (2024-12-29) - Initial Upper Limb seed data
  - 18 structures
  - 35 relationships
  - 57 physical references
  - Complete coverage of major bones, muscles, nerves, and arteries

---

*Last Updated: December 29, 2024*
