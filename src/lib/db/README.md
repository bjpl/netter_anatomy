# IndexedDB Database Layer

This directory contains the IndexedDB database implementation using Dexie.js for the Netter's Anatomy Learning Tool.

## Files

- **index.ts** - Database schema definition and Dexie.js configuration
- **operations.ts** - CRUD operations and query helpers for all entities
- **seed.ts** - Database seeding functions for initial and test data

## Database Schema

### Core Content Tables

- **structures** - Anatomical structures (bones, muscles, nerves, etc.)
- **regions** - Body regions (Upper Limb, Thorax, etc.)
- **systems** - Body systems (Skeletal, Muscular, Nervous, etc.)
- **relationships** - Relationships between structures
- **physicalReferences** - References to physical Netter's resources
- **externalLinks** - Links to external resources (OpenStax, Wikipedia, etc.)

### Learning Content Tables

- **chapters** - Learning chapters aligned with Atlas regions
- **modules** - Learning modules within chapters
- **flashCards** - Spaced repetition flashcards

### User Data Tables

- **userProgress** - Overall user progress tracking
- **cardReviewStates** - FSRS spaced repetition state
- **studySessions** - Individual study session records

## Usage

### Basic Usage

```typescript
import { db, operations } from '@/lib/db';

// Get all regions
const regions = await operations.regions.getAll();

// Get structures in a region
const structures = await operations.structures.getByRegion(regionId);

// Search for structures
const results = await operations.search.search('biceps');

// Track user progress
await operations.userProgress.markStructureViewed(userId, structureId);
```

### Database Initialization

```typescript
import { initializeDatabase } from '@/lib/db/seed';

// Initialize empty database with required data
await initializeDatabase();
```

### Seeding Test Data

```typescript
import { seedDatabase, loadTestData } from '@/lib/db/seed';

// Seed with all data including test structures
await seedDatabase({ clearExisting: true, includeTestData: true });

// Or use the convenience function
await loadTestData();
```

### Database Statistics

```typescript
const stats = await db.getStats();
console.log('Database contains:');
console.log(`- ${stats.structures} structures`);
console.log(`- ${stats.flashCards} flashcards`);
console.log(`- ${stats.studySessions} study sessions`);
```

## Operations API

### Structure Operations

```typescript
// Get structure by ID
const structure = await operations.structures.getById(id);

// Get structures by region
const structures = await operations.structures.getByRegion(regionId);

// Get structures by system
const structures = await operations.structures.getBySystem(systemId);

// Get structures by type
const bones = await operations.structures.getByType(StructureType.BONE);

// Search structures by name
const results = await operations.structures.searchByName('biceps');

// Create structure
const id = await operations.structures.create({
  canonical_name: 'Triceps brachii',
  // ... other fields
});

// Bulk create
await operations.structures.bulkCreate([structure1, structure2]);
```

### Relationship Operations

```typescript
// Get all relationships for a structure
const relationships = await operations.relationships.getForStructure(structureId);

// Get relationships by type
const innervations = await operations.relationships.getByType(
  structureId,
  RelationshipType.INNERVATED_BY
);

// Get related structures with full Structure objects
const related = await operations.relationships.getRelatedStructures(structureId);
// Returns: Array<{ relationship: Relationship, structure: Structure }>
```

### User Progress Operations

```typescript
// Get or create user progress
const progress = await operations.userProgress.getOrCreate(userId);

// Mark structure as viewed
await operations.userProgress.markStructureViewed(userId, structureId);

// Toggle bookmark
const isNowBookmarked = await operations.userProgress.toggleBookmark(userId, structureId);

// Mark module completed
await operations.userProgress.markModuleCompleted(userId, moduleId, score);

// Update study time
await operations.userProgress.addStudyTime(userId, seconds);

// Update streak
await operations.userProgress.updateStreak(userId);
```

### Flashcard Review Operations (FSRS)

```typescript
// Get or create card review state
const state = await operations.cardReviews.getOrCreate(userId, cardId);

// Get due cards
const dueCards = await operations.cardReviews.getDueCards(userId, limit);

// Get new cards
const newCards = await operations.cardReviews.getNewCards(userId, limit);

// Update card state after review
await operations.cardReviews.updateState(stateId, {
  due: newDueDate,
  stability: newStability,
  difficulty: newDifficulty,
  // ... other FSRS parameters
});

// Get retention rate
const retentionRate = await operations.cardReviews.getRetentionRate(userId);
```

### Study Session Operations

```typescript
// Start session
const sessionId = await operations.studySessions.start(userId, SessionType.EXPLORER);

// End session
await operations.studySessions.end(sessionId, {
  structures_viewed: [structureId1, structureId2],
  // ... session-specific data
});

// Get recent sessions
const sessions = await operations.studySessions.getRecent(userId, 10);
```

### Search Operations

```typescript
// Comprehensive search
const results = await operations.search.search('carpal tunnel');
// Returns: { structures[], regions[], clinicalTerms[] }
```

## Indexes

The database uses the following indexes for efficient querying:

- **structures**: `canonical_name`, `region_id`, `system_ids` (multi-entry), `structure_type`, `parent_structure_id`
- **relationships**: `source_structure_id`, `target_structure_id`, `relationship_type`
- **cardReviewStates**: `user_id`, `card_id`, compound `[card_id+due]` for efficient review queue queries
- **regions/systems**: `slug`, `sort_order`
- **chapters/modules**: `sort_order` for ordering

## Data Migration

When schema changes are needed, add a new version in `index.ts`:

```typescript
db.version(2).stores({
  // Updated schema
  structures: '++id, canonical_name, region_id, *system_ids, structure_type, new_field'
}).upgrade(async tx => {
  // Migration logic
  const structures = await tx.table('structures').toArray();
  await Promise.all(
    structures.map(s =>
      tx.table('structures').update(s.id, { new_field: defaultValue })
    )
  );
});
```

## Performance Considerations

1. **Compound Indexes**: Used for common query patterns (e.g., `[card_id+due]` for review queue)
2. **Multi-Entry Indexes**: Used for array fields (e.g., `*system_ids`)
3. **Bulk Operations**: Prefer `bulkCreate`, `bulkGet`, `bulkAdd` over individual operations
4. **Hooks**: Automatic timestamp updates on create/update via Dexie hooks
5. **Offline-First**: All data stored locally for offline capability

## Type Safety

All operations are fully typed using TypeScript interfaces defined in `src/types/`:

- Database entities use snake_case naming (matching API conventions)
- Operations return properly typed Promises
- Enum types ensure valid values for categorical fields
