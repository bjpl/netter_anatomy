# Netter's Anatomy Learning Tool
## Complete Product Specification

**Version:** 1.0  
**Last Updated:** December 2024  
**Status:** Specification Complete

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Goals](#2-product-vision--goals)
3. [User Context & Requirements](#3-user-context--requirements)
4. [Information Architecture](#4-information-architecture)
5. [Content System Specification](#5-content-system-specification)
6. [Mode 1: Interactive Explorer](#6-mode-1-interactive-explorer)
7. [Mode 2: Guided Learning](#7-mode-2-guided-learning)
8. [Cross-Reference System](#8-cross-reference-system)
9. [Audio & Text-to-Speech System](#9-audio--text-to-speech-system)
10. [External Resource Integration](#10-external-resource-integration)
11. [Data Models](#11-data-models)
12. [User Interface Specification](#12-user-interface-specification)
13. [Technical Architecture](#13-technical-architecture)
14. [Accessibility Requirements](#14-accessibility-requirements)
15. [Performance Requirements](#15-performance-requirements)
16. [Content Sources & Licensing](#16-content-sources--licensing)
17. [Implementation Phases](#17-implementation-phases)
18. [Appendices](#18-appendices)

---

## 1. Executive Summary

### 1.1 Product Definition

A personal anatomy learning application designed to complement physical Netter's Atlas resources (6th Edition Atlas, Coloring Book, and Flashcards) with an interactive digital experience. The tool provides two distinct learning modes optimized for different cognitive goals: exploratory spatial learning and structured synthesis-focused progression.

### 1.2 Core Value Proposition

- **Bridge physical and digital learning**: Every digital interaction references specific pages, plates, and card numbers in owned physical resources
- **Modern pedagogical approach**: Move beyond passive reading to active exploration and retrieval-based learning
- **Relationship-focused understanding**: Emphasize anatomical connections, functional interdependencies, and clinical relevance over isolated memorization
- **Self-paced mastery**: Spaced repetition algorithms optimize review timing for long-term retention

### 1.3 Scope Boundaries

**In Scope:**
- Human gross anatomy aligned with Netter's Atlas 6th Edition organization
- Two learning modes (Explorer and Guided)
- Integration with open-source 3D models and encyclopedic content
- Cross-references to physical Netter resources
- TTS for productivity on explanatory content
- Offline-capable progressive web application

**Out of Scope (v1):**
- Histology or microscopic anatomy
- Physiology beyond anatomical context
- Multi-user or classroom features
- Mobile native applications (PWA serves mobile)
- AI-generated quiz questions
- User-uploaded content or annotations shared externally

---

## 2. Product Vision & Goals

### 2.1 Vision Statement

Create a learning companion that transforms anatomy study from memorization of isolated structures into understanding of an integrated, functional human body—making the complexity approachable through progressive exploration and guided synthesis.

### 2.2 Primary Goals

| Goal | Success Metric | Target |
|------|---------------|--------|
| **Effective Learning** | Retention rate on spaced repetition reviews | >85% recall at 30-day intervals |
| **Engagement** | Average session duration | 20-45 minutes |
| **Physical Resource Utilization** | Cross-reference clicks per session | >3 references to physical materials |
| **Relationship Understanding** | Completion of synthesis modules | 100% of guided learning chapters |
| **Accessibility** | WCAG compliance level | AA minimum |

### 2.3 Design Principles

1. **Clarity over decoration**: Medical content demands precision; visual design supports comprehension, never obscures it
2. **Active over passive**: Every screen invites interaction; no purely static content pages
3. **Connected over isolated**: Every structure links to related structures, clinical applications, and physical resources
4. **Progressive over overwhelming**: Complexity reveals gradually; users control depth of exploration
5. **Forgiving over punitive**: Mistakes are learning opportunities; no penalties, only adjusted review schedules

---

## 3. User Context & Requirements

### 3.1 Primary User Profile

**Context:** Solo learner with pedagogical background (TESOL MA), technical proficiency, and experience building educational tools. Learning anatomy for personal enrichment and potential future application development.

**Physical Resources Owned:**
- Netter's Atlas of Human Anatomy, 6th Edition (ISBN: 978-1-4557-0418-7)
- Netter's Anatomy Coloring Book (ISBN: 978-0-323-18798-5)
- Netter's Anatomy Flash Cards, 4th Edition (ISBN: 978-0-323-29546-8)

**Learning Style Preferences:**
- Visual-spatial learning with interactive manipulation
- Systems thinking and relationship mapping
- Self-directed pacing with structured milestones
- Clinical context increases motivation

### 3.2 Use Case Scenarios

**UC-1: Focused Exploration Session**
> User opens the tool wanting to understand the brachial plexus. They navigate to the upper limb section, explore the 3D model by rotating and isolating nerve branches, read the expanded annotation explaining clinical significance (Erb's palsy, etc.), then note the cross-reference to Atlas Plate 416 and Flashcard #287 for later physical review.

**UC-2: Guided Learning Session**
> User has 30 minutes and wants structured progress. They open Guided Learning mode, continue Chapter 6 (Upper Limb), complete a synthesis module on shoulder joint relationships (bones, muscles, ligaments, nerves, vessels), answer reflection questions, and receive updated spaced repetition cards for weak areas.

**UC-3: Quick Review Session**
> User has 10 minutes before an appointment. They open the spaced repetition queue, review 15 due cards with immediate feedback, hear TTS pronunciation for challenging terms, and sync progress for later continuation on another device.

**UC-4: Deep Dive on Clinical Connection**
> User encounters a clinical case mentioning "carpal tunnel syndrome." They search for the term, see the carpal tunnel structure highlighted in 3D, read about the median nerve relationship, explore connected structures (flexor retinaculum, tendons), and follow external links to OpenStax chapter on peripheral nerve injuries.

### 3.3 Functional Requirements Summary

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | Display 3D anatomical models with rotation, zoom, and layer controls | Must Have |
| FR-02 | Show/hide anatomical labels on demand | Must Have |
| FR-03 | Display expanded annotations for each structure | Must Have |
| FR-04 | Cross-reference every structure to Netter's physical resources | Must Have |
| FR-05 | Provide chapter-by-chapter guided progression | Must Have |
| FR-06 | Implement spaced repetition flashcard system | Must Have |
| FR-07 | Include TTS for definitions and explanations | Should Have |
| FR-08 | Link to external visualizations and encyclopedic content | Should Have |
| FR-09 | Support offline use with background sync | Should Have |
| FR-10 | Enable structure search with autocomplete | Must Have |
| FR-11 | Track learning progress with visual indicators | Must Have |
| FR-12 | Provide synthesis questions focused on relationships | Must Have |

---

## 4. Information Architecture

### 4.1 Content Hierarchy

```
Root
├── Interactive Explorer
│   ├── Regional Navigation
│   │   ├── Head & Neck (Plates 1-148)
│   │   ├── Back & Spinal Cord (Plates 149-177)
│   │   ├── Thorax (Plates 178-241)
│   │   ├── Abdomen (Plates 242-328)
│   │   ├── Pelvis & Perineum (Plates 329-399)
│   │   ├── Upper Limb (Plates 400-468)
│   │   └── Lower Limb (Plates 469-531)
│   ├── Systems Navigation (Alternative View)
│   │   ├── Skeletal System
│   │   ├── Muscular System
│   │   ├── Nervous System
│   │   ├── Cardiovascular System
│   │   ├── Lymphatic System
│   │   ├── Respiratory System
│   │   ├── Digestive System
│   │   ├── Urinary System
│   │   ├── Reproductive System
│   │   └── Endocrine System
│   ├── Structure Detail View
│   │   ├── 3D Model Viewer
│   │   ├── Annotation Panel
│   │   ├── Relationships Panel
│   │   ├── Clinical Context Panel
│   │   └── Cross-References Panel
│   └── Search Results
│
├── Guided Learning
│   ├── Chapter Selection
│   │   └── [8 Regional Chapters mirroring Atlas]
│   ├── Chapter View
│   │   ├── Overview Module
│   │   ├── Structure Modules (sequential)
│   │   ├── Synthesis Module
│   │   └── Chapter Assessment
│   ├── Progress Dashboard
│   │   ├── Chapter Completion Status
│   │   ├── Mastery Indicators
│   │   └── Recommended Next Steps
│   └── Spaced Repetition Queue
│       ├── Due Cards
│       ├── New Cards
│       └── Review Statistics
│
├── Study Tools
│   ├── Flashcard Deck Manager
│   ├── Search (Global)
│   ├── Bookmarks
│   └── Study History
│
└── Settings
    ├── Display Preferences
    ├── Audio Settings
    ├── Spaced Repetition Parameters
    ├── Offline Data Management
    └── Cross-Reference Preferences
```

### 4.2 Navigation Model

**Primary Navigation:** Persistent sidebar (collapsible on mobile) with mode selection and regional/chapter access.

**Secondary Navigation:** Contextual within each mode—breadcrumbs in Explorer, progress stepper in Guided Learning.

**Tertiary Navigation:** Panel tabs within detail views (Annotations, Relationships, Clinical, References).

**Global Access:** Search bar always visible; keyboard shortcut (Cmd/Ctrl+K) opens search overlay.

### 4.3 URL Structure

```
/explorer                           # Explorer home (regional overview)
/explorer/region/:regionSlug        # Regional view
/explorer/structure/:structureId    # Structure detail
/explorer/search?q=:query           # Search results

/learn                              # Guided Learning home (chapter grid)
/learn/chapter/:chapterId           # Chapter overview
/learn/chapter/:chapterId/:moduleId # Module view
/learn/review                       # Spaced repetition queue

/tools/flashcards                   # Flashcard deck manager
/tools/bookmarks                    # Saved items
/tools/history                      # Study history

/settings                           # All settings
```

---

## 5. Content System Specification

### 5.1 Anatomical Structure Entity

Every anatomical structure in the system is represented as a unified entity with multiple content facets:

**Core Identity:**
- Unique identifier (UUID)
- Canonical name (Terminologia Anatomica 2019)
- Common name(s) / synonyms
- Latin name (where applicable)
- Phonetic pronunciation (IPA)

**Classification:**
- Body region (primary)
- Body system(s) (can be multiple)
- Structure type (bone, muscle, nerve, vessel, organ, ligament, fascia, etc.)
- Hierarchical parent structure
- Child structures

**Descriptive Content:**
- Brief definition (1-2 sentences, suitable for flashcard)
- Expanded description (2-3 paragraphs, suitable for TTS)
- Origin/insertion (muscles only)
- Innervation
- Blood supply
- Anatomical relations (superior, inferior, medial, lateral, anterior, posterior)
- Key landmarks

**Clinical Content:**
- Clinical significance summary
- Common pathologies
- Examination techniques (where applicable)
- Clinical case connections

**Visual Assets:**
- 3D model reference (Z-Anatomy structure ID)
- 2D image references (Gray's 1918 plate numbers, other open sources)
- Anatomical position indicators

**Cross-References:**
- Netter's Atlas plate number(s) and page(s)
- Netter's Coloring Book exercise number(s) and page(s)
- Netter's Flashcard number(s)
- External links (OpenStax sections, Wikipedia, specialized atlases)

**Learning Metadata:**
- Difficulty rating (1-5)
- Prerequisite structures
- Related structures (functional/spatial)
- Associated spaced repetition cards

### 5.2 Content Types

| Type | Purpose | Example |
|------|---------|---------|
| **Definition** | Quick reference, flashcard front | "The biceps brachii is a two-headed muscle of the anterior arm that flexes the elbow and supinates the forearm." |
| **Explanation** | Deep understanding, TTS candidate | Multi-paragraph description covering embryology, detailed attachments, functional biomechanics, and variations. |
| **Clinical Note** | Real-world relevance | "Rupture of the long head tendon causes a 'Popeye' deformity due to muscle belly retraction." |
| **Relationship Description** | Synthesis content | "The biceps brachii works synergistically with brachialis for elbow flexion, but antagonistically to triceps brachii." |
| **Mnemonic** | Memory aid | "Biceps: Bends the elbow, rotates the radius (supination)." |
| **Self-Test Question** | Active recall | "What nerve innervates the biceps brachii?" with answer reveal. |

### 5.3 Relationship Types

Structures connect to other structures through typed relationships:

| Relationship Type | Description | Example |
|-------------------|-------------|---------|
| **Articulates With** | Bone-to-bone joint connection | Humerus articulates with scapula (glenohumeral joint) |
| **Attaches To** | Muscle/ligament origin or insertion | Biceps attaches to radial tuberosity |
| **Innervated By** | Nerve supply | Biceps innervated by musculocutaneous nerve |
| **Supplied By** | Arterial blood supply | Biceps supplied by brachial artery branches |
| **Drains To** | Venous/lymphatic drainage | Arm muscles drain to axillary nodes |
| **Contains** | Spatial containment | Carpal tunnel contains median nerve |
| **Passes Through** | Transit relationship | Median nerve passes through carpal tunnel |
| **Antagonist To** | Opposing muscle action | Biceps antagonist to triceps |
| **Synergist With** | Cooperative muscle action | Biceps synergist with brachialis |
| **Branch Of** | Nerve/vessel branching | Musculocutaneous branch of lateral cord |
| **Continuous With** | Fascial/structural continuity | Deep fascia continuous with periosteum |
| **Superficial To / Deep To** | Layer relationships | Biceps superficial to brachialis |

### 5.4 Content Curation Principles

1. **Accuracy first**: All anatomical content verified against Terminologia Anatomica 2019 and cross-referenced with Netter's Atlas 6th Edition
2. **Appropriate depth**: Definitions concise; explanations comprehensive but accessible to non-medical learner
3. **Clinical relevance**: Every major structure includes at least one clinical connection
4. **Relationship emphasis**: No structure exists in isolation; minimum 3 relationships per structure
5. **Progressive disclosure**: Content layered from essential (definition) to detailed (full explanation)

---

## 6. Mode 1: Interactive Explorer

### 6.1 Purpose & Philosophy

Interactive Explorer enables **self-directed spatial learning** through manipulation of 3D models and exploration of annotated content. The philosophy is curiosity-driven: users follow their interests, click what catches their attention, and build mental models through active discovery rather than prescribed sequences.

**Key pedagogical principles:**
- Spatial manipulation builds stronger mental representations than passive viewing
- Toggle-able labels support self-testing without formal quiz structure
- Clinical context maintains motivation and relevance
- Freedom to explore prevents cognitive overload from forced sequencing

### 6.2 Regional Overview Screen

**Layout:**
- Full-width header with mode title and search bar
- Body region cards in responsive grid (2-4 columns based on viewport)
- Each card shows: region name, structure count, thumbnail 3D preview, completion indicator

**Interactions:**
- Click card → Navigate to regional view
- Hover card → Subtle 3D rotation animation
- Search → Global search overlay

**Content per region card:**
- Region name (e.g., "Upper Limb")
- Netter's Atlas plate range (e.g., "Plates 400-468")
- Structure count (e.g., "127 structures")
- Progress indicator (e.g., "34% explored")

### 6.3 Regional View Screen

**Layout (Desktop):**
- Left panel (30%): Structure tree navigation with collapsible hierarchy
- Center panel (50%): 3D model viewer
- Right panel (20%): Quick info panel (expands to detail view)

**Layout (Mobile):**
- Full-screen 3D viewer with floating action buttons
- Bottom sheet for structure list (swipe up)
- Tap structure → Bottom sheet expands to detail view

**3D Viewer Controls:**
- Rotate: Click and drag (mouse) or single-finger drag (touch)
- Zoom: Scroll wheel (mouse) or pinch (touch)
- Pan: Right-click drag (mouse) or two-finger drag (touch)
- Reset view: Double-click empty space or dedicated button
- Isolate structure: Click structure in viewer or tree
- Layer toggle: System-based visibility controls (show/hide muscles, vessels, nerves, etc.)

**Structure Tree:**
- Hierarchical organization matching anatomical containment
- Expand/collapse nodes
- Search filter within tree
- Icons indicating structure type (bone, muscle, nerve, etc.)
- Checkbox for multi-select visibility control
- Click structure name → Highlight in 3D + show quick info
- Double-click → Open full detail view

**Label System:**
- Toggle button: "Labels On/Off"
- When on: Leader lines from structures to floating labels
- Label positioning: Automatic with collision avoidance
- Label interaction: Click label → Select structure
- Self-test mode: Labels hidden until hover/tap reveals

### 6.4 Structure Detail View

**Trigger:** Double-click structure in 3D/tree, or click "View Details" in quick info panel

**Layout:**
- Modal overlay (80% viewport) or dedicated page (based on user preference setting)
- Tabbed interface for content sections

**Tab 1: Overview**
- Structure name (large, primary heading)
- Pronunciation button (plays TTS of term)
- Brief definition
- Type badge (e.g., "Muscle" with icon)
- Region/system tags
- Mini 3D viewer (isolated structure, rotatable)
- "See Also" quick links to related structures

**Tab 2: Full Description**
- Expanded multi-paragraph description
- TTS play button for entire description
- Collapsible sections:
  - Anatomical Description
  - Attachments (muscles) / Borders (bones) / Course (nerves/vessels)
  - Relations
  - Variations (if notable)
  - Embryological origin (optional, collapsed by default)

**Tab 3: Relationships**
- Visual relationship diagram (node-link or radial)
- Grouped by relationship type
- Each related structure is clickable → Navigate to that structure
- Relationship descriptions shown on hover/tap
- Filter by relationship type

**Tab 4: Clinical**
- Clinical significance summary
- List of associated conditions/pathologies
- Each condition expandable for brief description
- Links to external resources for conditions

**Tab 5: References**
- **Physical Resources (Primary)**
  - Netter's Atlas: Plate number(s), page number(s), with plate title
  - Netter's Coloring Book: Exercise number(s), page number(s)
  - Netter's Flashcard: Card number(s), with card title
- **Digital Resources (Secondary)**
  - OpenStax A&P chapter/section links
  - Wikipedia article link
  - Specialized atlas links (if applicable)
  - Z-Anatomy direct link

### 6.5 Systems View (Alternative Navigation)

**Purpose:** Allow exploration organized by body system rather than region, supporting functional understanding.

**Implementation:**
- Toggle in Explorer header: "View by: Region | System"
- System view shows same 3D models but filtered/colored by system
- Useful for tracing continuous structures (e.g., entire nervous system)
- Cross-regional structures visible together (e.g., vagus nerve from brainstem to abdomen)

### 6.6 Search Functionality

**Search Input:**
- Always-visible search bar in header
- Keyboard shortcut: Cmd/Ctrl+K opens focused search
- Autocomplete suggestions as user types
- Recent searches shown before typing

**Search Results:**
- Grouped by content type (Structures, Regions, Clinical Terms)
- Each result shows: Name, type icon, region, brief snippet
- Click result → Navigate to structure detail
- Highlight matching terms in results

**Search Capabilities:**
- Exact name match (highest priority)
- Synonym/alternative name match
- Partial match (prefix, contains)
- Anatomical term components (e.g., "brachi" finds brachialis, brachial, brachiocephalic)
- Clinical term search (e.g., "carpal tunnel" finds relevant structures)

---

## 7. Mode 2: Guided Learning

### 7.1 Purpose & Philosophy

Guided Learning provides **structured, synthesis-focused progression** through anatomical content. Unlike Explorer's freedom, this mode prescribes a sequence designed to build understanding systematically—introducing foundational structures before dependent ones, and explicitly teaching relationships and functional integration.

**Key pedagogical principles:**
- Scaffolded complexity prevents overwhelm
- Explicit relationship instruction builds integrated mental models
- Frequent low-stakes retrieval strengthens memory
- Clinical cases demonstrate relevance and aid encoding
- Chapter completion provides motivating milestones

### 7.2 Chapter Organization

Eight chapters mirror Netter's Atlas regional organization:

| Chapter | Title | Module Count | Estimated Duration |
|---------|-------|--------------|-------------------|
| 1 | Head & Neck | 12 modules | 8-10 hours |
| 2 | Back & Spinal Cord | 6 modules | 3-4 hours |
| 3 | Thorax | 8 modules | 5-6 hours |
| 4 | Abdomen | 10 modules | 6-8 hours |
| 5 | Pelvis & Perineum | 9 modules | 5-7 hours |
| 6 | Upper Limb | 8 modules | 5-6 hours |
| 7 | Lower Limb | 8 modules | 5-6 hours |
| 8 | Integration & Review | 4 modules | 3-4 hours |

### 7.3 Chapter Selection Screen

**Layout:**
- Chapter cards in single column (mobile) or 2-column grid (desktop)
- Visual progress indicator per chapter (progress bar or pie)
- Lock/unlock status (chapters unlock sequentially or freely, user setting)

**Card Content:**
- Chapter number and title
- Cover illustration (representative anatomical image)
- Module count
- Estimated time remaining
- Progress percentage
- "Continue" or "Start" CTA

### 7.4 Module Types

Each chapter contains multiple modules of varying types:

**7.4.1 Overview Module**
- Introduces the region's scope and key concepts
- Provides anatomical orientation (boundaries, surface landmarks)
- Presents "big picture" before details
- Includes region 3D model for spatial orientation
- Lists learning objectives for the chapter
- Duration: 10-15 minutes

**7.4.2 Structure Modules**
- Focus on a logical grouping of structures (e.g., "Muscles of the Rotator Cuff")
- Content flow:
  1. Introduction: Why these structures matter together
  2. Individual structure presentations (3-8 structures per module)
  3. Mini-quiz: Quick recall questions
  4. Summary: Key takeaways
- Each structure presentation includes:
  - Name and pronunciation
  - Definition
  - Key facts (origin/insertion, innervation, etc.)
  - 3D visualization
  - Cross-references to physical resources
- Duration: 15-25 minutes

**7.4.3 Synthesis Module**
- Explicitly teaches relationships and functional integration
- Content types:
  - Relationship diagrams with explanations
  - "What connects to what" exercises
  - Functional groupings (e.g., "muscles that flex the elbow")
  - Blood supply and innervation patterns
  - Clinical scenario walkthroughs
- Interactive elements:
  - Drag-and-drop relationship matching
  - "Trace the pathway" exercises (nerve courses, blood flow)
  - Compare/contrast activities
- Duration: 20-30 minutes

**7.4.4 Chapter Assessment**
- Comprehensive review of chapter content
- Question types:
  - Structure identification (image with pointer)
  - Relationship questions ("What innervates X?")
  - Clinical application ("Which structure is compressed in Y syndrome?")
  - Spatial reasoning ("What lies medial to Z?")
- Immediate feedback with explanations
- Results inform spaced repetition card scheduling
- Minimum 70% to "complete" chapter (can retry)
- Duration: 15-20 minutes

### 7.5 Module View Interface

**Layout:**
- Clean, focused reading view (no sidebar distractions)
- Progress indicator at top (current position in module)
- Content area (centered, comfortable reading width)
- Navigation: Back/Next buttons + keyboard arrows
- Exit module button (with progress save confirmation)

**Content Presentation:**
- Cards/sections that advance on user action (not auto-advance)
- Rich media embedded inline (3D viewers, images)
- TTS button on text sections longer than 100 words
- Highlight key terms (clickable for quick definition)
- "Add to review" button on any structure mention

**Interactive Elements:**
- Embedded mini-quizzes (2-3 questions between content sections)
- Tap-to-reveal for self-testing
- Drag-and-drop for relationship exercises
- "Show in 3D" buttons that open mini-viewer inline

### 7.6 Synthesis Module Special Features

**Relationship Diagram Viewer:**
- Central structure with radiating connections
- Color-coded by relationship type
- Tap connection line to see relationship description
- Tap connected structure to see its details
- Ability to pivot (make any structure the new center)

**Pathway Tracer:**
- For nerves: Trace from origin through branches to targets
- For vessels: Trace arterial supply or venous drainage
- Interactive: User clicks correct next step in sequence
- Visual feedback: Path illuminates as correctly traced

**Functional Grouping Exercise:**
- Given a function (e.g., "Wrist extension")
- User selects all structures that contribute
- Immediate feedback with explanation of any missed/incorrect

**Clinical Case Integration:**
- Brief patient scenario (2-3 sentences)
- Questions that require applying anatomical knowledge
- Example: "A patient cannot extend their wrist after a humeral shaft fracture. Which nerve is likely damaged?"
- Explanation reveals anatomical basis for clinical finding

### 7.7 Spaced Repetition System

**Card Generation:**
- Cards auto-generated from structure content
- Card types:
  - Term → Definition
  - Image → Identify structure
  - Function → Name structure(s)
  - Innervation/Blood supply questions
  - Relationship completion ("X attaches to ___")
- Users can create custom cards (optional)

**Review Queue:**
- Accessible from Guided Learning home or global nav
- Shows due card count
- Session length options: 5, 10, 15, 20 minutes or "All due"
- Card presentation:
  - Front: Question/prompt
  - User action: Tap to reveal answer
  - Self-rating: Again (forgot) / Hard / Good / Easy
- Immediate feedback on rating selection
- TTS available for term pronunciation

**Algorithm:**
- FSRS 4.5 implementation (via ts-fsrs)
- Parameters:
  - New cards per day: User configurable (default: 20)
  - Maximum reviews per day: User configurable (default: 100)
  - Learning steps: 1m, 10m, 1d
  - Graduating interval: 1 day
  - Easy interval: 4 days

**Statistics Dashboard:**
- Cards reviewed today/this week/this month
- Retention rate (% recalled correctly)
- Forecast (cards due upcoming days)
- Heat map of study activity
- Difficult cards list (lowest retention)

### 7.8 Progress Tracking

**Chapter Level:**
- Modules completed / total modules
- Assessment score (if attempted)
- Time spent
- Last activity date

**Overall Level:**
- Chapters completed / total chapters
- Total structures learned
- Current streak (consecutive days with activity)
- Mastery score (weighted average of assessments + retention)

**Visual Indicators:**
- Progress bars (linear, determinate)
- Completion checkmarks
- Streak flame icon
- Mastery badges (Bronze/Silver/Gold per chapter)

---

## 8. Cross-Reference System

### 8.1 Purpose

The cross-reference system is a core differentiator—ensuring the digital tool enhances rather than replaces physical Netter's resources. Every relevant digital content piece links to specific locations in owned physical materials.

### 8.2 Reference Types

**8.2.1 Netter's Atlas References**
- Plate number (1-532)
- Page number
- Plate title
- View type (anterior, posterior, lateral, etc.)
- Specific structures highlighted on that plate

**8.2.2 Netter's Coloring Book References**
- Exercise number
- Page number
- Exercise title
- Related Atlas plates

**8.2.3 Netter's Flashcard References**
- Card number (1-300+)
- Card title (structure name)
- Card category (regional grouping)

### 8.3 Reference Data Structure

```
Reference:
  id: UUID
  type: "atlas" | "coloring_book" | "flashcard"
  resource_edition: string (e.g., "6th Edition")
  resource_isbn: string
  primary_identifier: string (plate/exercise/card number)
  page_number: integer (nullable for flashcards)
  title: string
  structures_featured: [Structure IDs]
  notes: string (optional, e.g., "Best view of brachial plexus")
```

### 8.4 Display Patterns

**Inline Reference (within content):**
- Appears as styled badge: "📖 Atlas Plate 412"
- Tooltip on hover shows full details
- Click opens reference detail modal

**Reference Panel (Structure Detail View):**
- Dedicated tab showing all references for structure
- Grouped by resource type
- Each reference shows:
  - Resource icon and type
  - Number and page
  - Title
  - "This plate also shows:" list of other structures

**Quick Reference Card:**
- Floating action in Explorer 3D view
- Shows most relevant reference for selected structure
- One-tap access to reference details

### 8.5 Reference Utility Features

**"Open Physical Book" Prompt:**
- When viewing reference, option to mark "I have this open"
- Tracks which physical resources user has consulted
- Feeds into progress/mastery calculations

**Print Reference List:**
- Generate printable list of references for a chapter
- Format: "Chapter 6: Upper Limb - Atlas plates to review: 400-412, 415-418..."
- Useful for planning physical study sessions

**Reference Search:**
- Search by plate/card number directly
- "What's on Plate 412?" → Shows all structures on that plate

---

## 9. Audio & Text-to-Speech System

### 9.1 Purpose & Scope

TTS serves as a **productivity feature**, not a language learning feature. It enables:
- Hands-free review while doing other activities
- Correct pronunciation of anatomical terms
- Accessibility for users with reading difficulties
- Reduced eye strain during long study sessions

### 9.2 Audio Content Types

| Content Type | TTS Behavior | User Control |
|--------------|--------------|--------------|
| Structure name | On-demand (tap pronunciation button) | Always available |
| Brief definition | On-demand | Button appears if >20 words |
| Full description | On-demand | Button always present; can play section-by-section |
| Clinical notes | On-demand | Button appears if >50 words |
| Quiz questions | Optional auto-read | User preference setting |
| Quiz feedback | Optional auto-read | User preference setting |

### 9.3 Pronunciation System

**Medical Term Handling:**
- Custom pronunciation lexicon for ~500 high-frequency anatomical terms
- IPA-based pronunciation data stored per structure
- Fallback to TTS engine's medical dictionary
- User can report pronunciation errors

**Pronunciation Lexicon Examples:**
```
biceps brachii: /ˈbaɪsɛps ˈbreɪkiaɪ/
sternocleidomastoid: /ˌstɜːrnoʊˌklaɪdoʊˈmæstɔɪd/
pterygoid: /ˈtɛrɪɡɔɪd/
xiphoid: /ˈzaɪfɔɪd/
```

### 9.4 TTS Interface

**Single Term Pronunciation:**
- Speaker icon button next to structure name
- Tap → Immediate playback
- No visible player controls (short duration)

**Long Content Playback:**
- Play/Pause button
- Progress indicator (thin bar)
- Speed control: 0.75x, 1x, 1.25x, 1.5x
- Skip forward/back 10 seconds
- Stop button

**Reading Mode:**
- Full-screen distraction-free view
- Large text display
- Auto-scroll synced with TTS playback
- Highlight current sentence being read

### 9.5 Audio Settings

- TTS voice selection (if multiple available)
- Default playback speed
- Auto-read quiz questions: On/Off
- Auto-read quiz feedback: On/Off
- Pronunciation-only mode: Only play term names, not descriptions

---

## 10. External Resource Integration

### 10.1 Integration Philosophy

When direct content integration isn't possible due to licensing, provide seamless outbound links to authoritative external resources. Links should be deep (directly to relevant content) rather than shallow (site homepage).

### 10.2 Integrated External Resources

**10.2.1 OpenStax Anatomy & Physiology 2e**
- License: CC-BY 4.0 (allows content integration)
- Integration type: Deep links to specific sections
- URL pattern: `https://openstax.org/books/anatomy-and-physiology-2e/pages/{chapter}-{section}`
- Use: Extended explanations, physiology context
- Display: "Learn more in OpenStax" link in description tab

**10.2.2 Wikipedia Anatomy Articles**
- License: CC-BY-SA (allows linking, content use with attribution)
- Integration type: Deep links to article sections
- URL pattern: `https://en.wikipedia.org/wiki/{Article_Name}#{Section}`
- Use: Additional context, historical information, detailed descriptions
- Display: "Wikipedia article" link in references tab

**10.2.3 Z-Anatomy Web Viewer**
- License: CC-BY-SA 4.0
- Integration type: Deep links to specific structures
- URL pattern: `https://www.z-anatomy.com/viewer?structure={structure_id}`
- Use: Alternative 3D visualization, confirmation of structure identification
- Display: "View in Z-Anatomy" link in references tab

**10.2.4 Anatomography (BodyParts3D)**
- License: CC-BY-SA 2.1 Japan
- Integration type: Deep links to custom views
- URL pattern: Generated URLs with structure parameters
- Use: Alternative visualization, combination views
- Display: "View in Anatomography" link in references tab

**10.2.5 Radiopaedia**
- License: CC-BY-NC-SA for educational content
- Integration type: Deep links to anatomy articles
- URL pattern: `https://radiopaedia.org/articles/{article_name}`
- Use: Clinical imaging context, radiology perspective
- Display: "Radiology perspective" link in clinical tab

### 10.3 Link Management

**Link Validation:**
- Automated monthly check for broken links
- Manual review queue for reported broken links
- Fallback: If primary link broken, show Wayback Machine archive link

**Link Display Pattern:**
- External links open in new tab
- Visual indicator (external link icon) distinguishes from internal navigation
- Link preview on hover (title, domain, brief description)

**Link Tracking:**
- Log external link clicks (for usage analytics)
- Track which external resources users find most valuable
- No personal data in tracking; aggregate metrics only

### 10.4 Future Integration Candidates

- Visible Human Project (NLM) - when stable deep-linking available
- AnatomyZone YouTube - for video explanations
- Kenhub - if partnership/API becomes available
- IMAIOS - for radiological anatomy correlation

---

## 11. Data Models

### 11.1 Core Entities

**Structure**
```
Structure:
  id: UUID
  canonical_name: string (TA2019 term)
  common_names: [string]
  latin_name: string | null
  pronunciation_ipa: string
  
  region_id: UUID (FK → Region)
  system_ids: [UUID] (FK → System)
  structure_type: enum (bone, muscle, nerve, artery, vein, organ, ligament, fascia, other)
  parent_structure_id: UUID | null (FK → Structure)
  
  definition_brief: string (≤280 chars)
  description_full: markdown string
  clinical_significance: markdown string
  
  origin: string | null (muscles)
  insertion: string | null (muscles)
  action: string | null (muscles)
  innervation: string | null
  blood_supply: string | null
  
  model_reference: string (Z-Anatomy structure ID)
  image_references: [ImageReference]
  
  difficulty_rating: integer (1-5)
  prerequisite_ids: [UUID] (FK → Structure)
  
  created_at: timestamp
  updated_at: timestamp
```

**Region**
```
Region:
  id: UUID
  name: string
  slug: string
  description: string
  atlas_plate_range: string (e.g., "400-468")
  sort_order: integer
  thumbnail_url: string
```

**System**
```
System:
  id: UUID
  name: string
  slug: string
  description: string
  color_code: string (hex, for visualization)
  sort_order: integer
```

**Relationship**
```
Relationship:
  id: UUID
  source_structure_id: UUID (FK → Structure)
  target_structure_id: UUID (FK → Structure)
  relationship_type: enum (see Section 5.3)
  description: string
  bidirectional: boolean
  clinical_relevance: string | null
```

**PhysicalReference**
```
PhysicalReference:
  id: UUID
  structure_id: UUID (FK → Structure)
  resource_type: enum (atlas, coloring_book, flashcard)
  edition: string
  isbn: string
  primary_number: string (plate/exercise/card number)
  page_number: integer | null
  title: string
  notes: string | null
  is_primary: boolean (primary reference for this structure)
```

**ExternalLink**
```
ExternalLink:
  id: UUID
  structure_id: UUID (FK → Structure)
  source: enum (openstax, wikipedia, z_anatomy, anatomography, radiopaedia, other)
  url: string
  title: string
  description: string | null
  last_validated: timestamp
  is_active: boolean
```

### 11.2 Learning Entities

**Chapter**
```
Chapter:
  id: UUID
  number: integer
  title: string
  description: string
  region_id: UUID (FK → Region)
  estimated_duration_minutes: integer
  sort_order: integer
  prerequisite_chapter_id: UUID | null
```

**Module**
```
Module:
  id: UUID
  chapter_id: UUID (FK → Chapter)
  title: string
  module_type: enum (overview, structure, synthesis, assessment)
  sort_order: integer
  estimated_duration_minutes: integer
  content: JSON (module-specific content structure)
```

**FlashCard**
```
FlashCard:
  id: UUID
  structure_id: UUID (FK → Structure)
  card_type: enum (definition, identification, function, innervation, relationship, clinical)
  front_content: markdown string
  back_content: markdown string
  front_image_url: string | null
  back_image_url: string | null
  tags: [string]
  source_module_id: UUID | null (if auto-generated from module)
```

### 11.3 User Data Entities

**UserProgress**
```
UserProgress:
  id: UUID
  user_id: string (local user identifier)
  
  # Explorer progress
  structures_viewed: [UUID]
  structures_bookmarked: [UUID]
  
  # Guided Learning progress
  chapters_started: {chapter_id: timestamp}
  modules_completed: {module_id: {completed_at: timestamp, score: float | null}}
  assessments_completed: {chapter_id: {completed_at: timestamp, score: float, attempts: integer}}
  
  # Overall metrics
  total_study_time_seconds: integer
  current_streak_days: integer
  longest_streak_days: integer
  last_activity_at: timestamp
```

**CardReviewState** (FSRS data)
```
CardReviewState:
  id: UUID
  user_id: string
  card_id: UUID (FK → FlashCard)
  
  # FSRS parameters
  due: timestamp
  stability: float
  difficulty: float
  elapsed_days: integer
  scheduled_days: integer
  reps: integer
  lapses: integer
  state: enum (new, learning, review, relearning)
  last_review: timestamp | null
  
  # Additional tracking
  ease_factor: float
  interval: integer
  total_reviews: integer
  total_correct: integer
```

**StudySession**
```
StudySession:
  id: UUID
  user_id: string
  session_type: enum (explorer, guided_module, flashcard_review)
  started_at: timestamp
  ended_at: timestamp | null
  duration_seconds: integer
  
  # Session-specific data
  structures_viewed: [UUID] | null
  module_id: UUID | null
  cards_reviewed: integer | null
  cards_correct: integer | null
```

### 11.4 Data Storage Strategy

**Local Storage (IndexedDB via Dexie.js):**
- All user progress data
- Card review states
- Study session history
- Cached structure data for offline access
- User preferences

**Static Content (Bundled/CDN):**
- Structure definitions and descriptions
- Relationship data
- Module content
- Reference mappings
- 3D model files

**Sync Strategy:**
- Local-first: All operations work offline
- Background sync when online (if multi-device needed)
- Conflict resolution: Last-write-wins for progress; merge for bookmarks

---

## 12. User Interface Specification

### 12.1 Design System Foundation

**Visual Identity:**
- Clean, professional aesthetic suitable for medical/educational context
- Calm, focused color palette avoiding harsh contrasts
- Typography optimized for readability of technical terms
- Whitespace used generously to reduce cognitive load

**Color Palette:**
```
Primary:       #2563EB (Blue - interactive elements)
Secondary:     #0F766E (Teal - secondary actions)
Background:    #FAFAFA (Off-white)
Surface:       #FFFFFF (White - cards, panels)
Text Primary:  #1F2937 (Near-black)
Text Secondary:#6B7280 (Gray)
Border:        #E5E7EB (Light gray)
Success:       #059669 (Green)
Warning:       #D97706 (Amber)
Error:         #DC2626 (Red)

System Colors (for anatomy visualization):
Bone:          #F5F0E6 (Ivory)
Muscle:        #C45C5C (Muted red)
Nerve:         #E6C744 (Yellow)
Artery:        #D64545 (Red)
Vein:          #4571D6 (Blue)
Organ:         #7E57C2 (Purple)
Ligament:      #8D9E78 (Sage)
Fascia:        #B8A99A (Tan)
```

**Typography:**
```
Font Family:   Inter (UI), Source Serif Pro (long-form content)
Scale:
  - Display:   36px / 40px line-height
  - H1:        30px / 36px
  - H2:        24px / 32px
  - H3:        20px / 28px
  - Body:      16px / 24px
  - Small:     14px / 20px
  - Caption:   12px / 16px

Medical Term Styling:
  - Italicized Latin terms
  - Pronunciation in parentheses, smaller size
```

**Spacing Scale:**
```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
```

**Border Radius:**
```
Small:  4px (buttons, inputs)
Medium: 8px (cards, panels)
Large:  12px (modals, large containers)
```

### 12.2 Component Specifications

**12.2.1 Navigation Sidebar**
- Width: 280px (desktop), full-width overlay (mobile)
- Collapsible to 64px icon-only mode
- Sections:
  - Mode selector (Explorer / Guided Learning)
  - Regional/Chapter navigation (context-dependent)
  - Study Tools section
  - Settings link
- Active item indicated by background highlight + left border accent
- Collapse trigger: Hamburger icon (mobile), chevron (desktop)

**12.2.2 Structure Card**
- Used in: Search results, region overview, related structures list
- Dimensions: Full-width (mobile), 320px fixed width (desktop grid)
- Content:
  - Structure type icon (left)
  - Name (primary text)
  - Region/System badge (secondary)
  - Brief definition (truncated, 2 lines max)
  - Bookmark toggle (right)
- States: Default, Hover (subtle lift shadow), Selected (border accent), Bookmarked (filled bookmark icon)

**12.2.3 3D Viewer Component**
- Aspect ratio: 16:9 (landscape) or 4:3 (portrait, mobile)
- Controls overlay:
  - Top-left: Layer toggles (expandable menu)
  - Top-right: Fullscreen toggle, reset view, screenshot
  - Bottom-left: Zoom slider (desktop), pinch instruction (mobile)
  - Bottom-right: Label toggle, rotate instructions
- Loading state: Skeleton with spinner
- Error state: Placeholder image with retry button

**12.2.4 Annotation Panel**
- Width: 320px (desktop side panel) or bottom sheet (mobile)
- Sections (collapsible):
  - Definition (always expanded)
  - Description (collapsed by default for long content)
  - Key Facts (origin, insertion, innervation - list format)
  - Clinical (collapsed)
- TTS button: Fixed position within scrollable panel
- "View Full Details" link at bottom

**12.2.5 Flashcard Component**
- Dimensions: Max 400px wide, aspect ratio 3:2
- Front/Back flip animation (300ms, ease-in-out)
- Front content: Question/prompt, image (if applicable)
- Back content: Answer, explanation, "See in Atlas" link
- Rating buttons: Below card, appear after flip
  - Again (red), Hard (orange), Good (green), Easy (blue)
- Progress indicator: "Card X of Y" above card

**12.2.6 Progress Indicators**
- Linear progress bar: Height 8px, rounded, with percentage label
- Chapter completion: Circular progress ring with chapter number center
- Streak indicator: Flame icon with day count, animated on increment
- Mastery badge: Icon badge (Bronze/Silver/Gold) with tooltip

**12.2.7 Modal/Dialog**
- Max width: 800px (large), 480px (standard), 320px (small/alert)
- Backdrop: Semi-transparent (#000 at 50% opacity)
- Animation: Fade in + scale up (200ms)
- Close: X button (top-right), click outside, Escape key
- Focus trap: Tab navigation contained within modal

### 12.3 Page Layouts

**12.3.1 Explorer - Regional View (Desktop)**
```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]  Interactive Explorer    [Search............] [⚙️]      │
├────────────┬────────────────────────────────────────┬───────────┤
│            │                                        │           │
│  REGION    │                                        │  QUICK    │
│  TREE      │           3D VIEWER                    │  INFO     │
│            │                                        │  PANEL    │
│  ▼ Bones   │        [Layer] [Labels] [Full]         │           │
│    Humerus │                                        │  ────────-│
│    Radius  │                                        │  Selected:│
│    Ulna    │                                        │  Biceps   │
│  ▼ Muscles │                                        │           │
│    Biceps ●│                                        │  [Brief   │
│    Triceps │                                        │   def...] │
│    ...     │                                        │           │
│            │                                        │  [Details]│
│            │                                        │           │
├────────────┴────────────────────────────────────────┴───────────┤
│  📖 Atlas Plate 411 | 🎴 Card #287                  [Bookmark]  │
└─────────────────────────────────────────────────────────────────┘
```

**12.3.2 Guided Learning - Module View**
```
┌─────────────────────────────────────────────────────────────────┐
│  [←Back]  Chapter 6: Upper Limb                      [⋮ Menu]   │
│  ═══════════════════●═══════════════════════════════════════    │
│  Module 3 of 8: Muscles of the Arm                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    ┌─────────────────────┐                      │
│                    │                     │                      │
│                    │    3D VIEWER        │                      │
│                    │    (inline)         │                      │
│                    │                     │                      │
│                    └─────────────────────┘                      │
│                                                                 │
│  ## Biceps Brachii                            [🔊 Listen]       │
│                                                                 │
│  The biceps brachii is the primary flexor of the elbow          │
│  and supinator of the forearm...                                │
│                                                                 │
│  **Origin:** Long head - supraglenoid tubercle                  │
│              Short head - coracoid process                      │
│                                                                 │
│  **Insertion:** Radial tuberosity, bicipital aponeurosis        │
│                                                                 │
│  📖 See: Atlas Plate 411 (p.425)                                │
│                                                                 │
│             [← Previous]              [Next →]                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**12.3.3 Flashcard Review**
```
┌─────────────────────────────────────────────────────────────────┐
│  Flashcard Review                    Card 7 of 23    [✕ End]    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│           ┌───────────────────────────────────────┐             │
│           │                                       │             │
│           │    What muscle is the primary         │             │
│           │    supinator of the forearm?          │             │
│           │                                       │             │
│           │           [Tap to reveal]             │             │
│           │                                       │             │
│           └───────────────────────────────────────┘             │
│                                                                 │
│                                                                 │
│                                                                 │
│                                                                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  ⏱️ Review time: 4:32       Today: 15 cards | Streak: 7 days 🔥 │
└─────────────────────────────────────────────────────────────────┘
```

### 12.4 Responsive Behavior

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Mobile Adaptations:**
- Sidebar becomes hamburger-triggered overlay
- 3D viewer fills full width
- Side panels become bottom sheets
- Two-column grids become single column
- Tab bars for panel navigation (instead of side tabs)
- Touch-optimized button sizes (min 44px tap targets)

**Tablet Adaptations:**
- Collapsible sidebar (collapsed by default)
- 3D viewer + single side panel (toggleable)
- Two-column grids maintained
- Modals remain centered (not full-screen)

### 12.5 Animation & Micro-interactions

**Transitions:**
- Navigation: Slide (150ms, ease-out)
- Modal: Fade + scale (200ms, ease-out)
- Panel expand/collapse: Height transition (250ms, ease-in-out)
- Card flip: 3D rotate (300ms, ease-in-out)

**Feedback:**
- Button press: Scale down 98% (100ms)
- Success action: Brief green flash + checkmark
- Error: Brief shake + red highlight
- Loading: Skeleton placeholders or spinner

**Delighters (subtle):**
- Streak milestone: Confetti burst (5, 10, 30 days)
- Chapter complete: Badge reveal animation
- Correct answer: Subtle pulse effect

---

## 13. Technical Architecture

### 13.1 Application Architecture

**Pattern:** Single-page application (SPA) with progressive web app (PWA) capabilities

**Framework:** React 18+ with TypeScript

**State Management:**
- Server state: TanStack Query (React Query) for caching external data
- Client state: Zustand for UI state (selected structure, view preferences)
- Persistent state: IndexedDB via Dexie.js for offline data

**Routing:** React Router v6 with lazy-loaded route components

### 13.2 Project Structure

```
src/
├── app/                    # App entry, providers, global config
├── assets/                 # Static assets (icons, images)
├── components/
│   ├── ui/                 # Primitive UI components (Button, Card, Modal)
│   ├── layout/             # Layout components (Sidebar, Header, PageContainer)
│   ├── explorer/           # Explorer mode components
│   ├── guided/             # Guided Learning components
│   ├── flashcards/         # Flashcard system components
│   └── shared/             # Shared feature components (StructureCard, TTSPlayer)
├── hooks/                  # Custom React hooks
├── lib/
│   ├── db/                 # IndexedDB setup and operations
│   ├── fsrs/               # Spaced repetition algorithm wrapper
│   ├── tts/                # Text-to-speech service
│   └── three/              # Three.js setup and utilities
├── pages/                  # Route page components
├── services/               # External API integrations
├── stores/                 # Zustand stores
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
└── data/                   # Static content data (JSON)
```

### 13.3 Key Technical Decisions

**3D Rendering:**
- Library: Three.js with React Three Fiber wrapper
- Model format: GLTF/GLB (optimized from Z-Anatomy source)
- Loading: Progressive loading with LOD (level of detail) support
- Performance: Instanced rendering for repeated structures, frustum culling

**Image Handling:**
- High-resolution images: OpenSeadragon for deep-zoom (DZI format)
- Standard images: Next-gen formats (WebP with JPEG fallback)
- Lazy loading: Intersection Observer for below-fold images

**Text-to-Speech:**
- Primary: Web Speech API (SpeechSynthesis) for offline capability
- Fallback: Cloud TTS API for quality pronunciation (when online)
- Caching: Pre-generated audio files for common terms

**Offline Capability:**
- Service Worker: Workbox for caching strategies
- Static assets: Cache-first strategy
- API data: Stale-while-revalidate for structure content
- User data: IndexedDB with background sync queue

**Data Synchronization (Multi-device):**
- Local-first architecture
- Sync protocol: CRDT-based (Automerge) for conflict-free merge
- Sync transport: Optional cloud sync (future consideration)

### 13.4 Build & Deployment

**Build Tool:** Vite

**Deployment Options:**
- Vercel (recommended for edge functions, easy deployment)
- Static hosting (Netlify, GitHub Pages) for simpler deployment
- Self-hosted option for complete data control

**Asset Pipeline:**
- 3D models: Pre-processed and optimized, served from CDN
- Images: Automatic optimization via build pipeline
- Fonts: Self-hosted subsets (Inter, Source Serif Pro)

### 13.5 Performance Budgets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Total Bundle Size (initial) | < 300KB |
| 3D Model Load Time | < 3s (regional model) |
| Lighthouse Performance Score | > 90 |

---

## 14. Accessibility Requirements

### 14.1 Compliance Target

WCAG 2.1 Level AA compliance minimum, with select AAA criteria where feasible.

### 14.2 Specific Requirements

**14.2.1 Perceivable**

- **Color contrast:** Minimum 4.5:1 for normal text, 3:1 for large text and UI components
- **Color independence:** Information not conveyed by color alone (icons, patterns as supplements)
- **Text resizing:** Support up to 200% zoom without horizontal scrolling
- **Image alternatives:** All informational images have alt text; 3D models have text descriptions
- **Media alternatives:** Audio content has text transcripts; TTS has visible text source

**14.2.2 Operable**

- **Keyboard navigation:** All functionality accessible via keyboard
- **Focus visibility:** Visible focus indicators on all interactive elements
- **Focus order:** Logical tab order matching visual layout
- **Skip links:** "Skip to main content" link at page top
- **No time limits:** No timed interactions (or user-adjustable if implemented)
- **Motion control:** Option to disable animations (prefers-reduced-motion respected)

**14.2.3 Understandable**

- **Language declaration:** HTML lang attribute set appropriately
- **Consistent navigation:** Navigation location and pattern consistent across pages
- **Error identification:** Form errors clearly identified with suggestions
- **Labels:** All form inputs have associated labels

**14.2.4 Robust**

- **Valid HTML:** Markup validates against current standards
- **ARIA usage:** ARIA roles, states, and properties used correctly
- **Name, role, value:** Custom components expose accessibility information

### 14.3 Accessibility Features

**High Contrast Mode:**
- Toggle in settings
- Increases contrast beyond minimum ratios
- Applies to all UI including 3D viewer overlays

**Colorblind Mode:**
- Alternative color palette (Okabe-Ito)
- Pattern fills supplement colors in visualizations
- Structure type indicated by shape + color

**Screen Reader Optimization:**
- Landmark regions properly defined
- Heading hierarchy maintained
- Live regions for dynamic content updates
- 3D viewer: Text description of visible structures, verbalized selection

**Motor Accessibility:**
- Large click targets (minimum 44x44px)
- No drag-only interactions (always keyboard alternative)
- Adjustable click timing (settings)

---

## 15. Performance Requirements

### 15.1 Load Time Requirements

| Scenario | Max Load Time |
|----------|---------------|
| Initial app load (cold cache) | 3 seconds |
| Initial app load (warm cache) | 1 second |
| Navigate between modes | 500ms |
| Load regional 3D model | 3 seconds |
| Load structure detail view | 500ms |
| Search results display | 200ms |
| Flashcard flip animation | 300ms |

### 15.2 Runtime Performance

- **60 FPS** target for 3D viewer interactions (rotate, zoom, pan)
- **Smooth scrolling** (no jank) in content lists
- **Input responsiveness**: < 100ms response to user input
- **TTS latency**: < 500ms from button press to audio start

### 15.3 Resource Limits

| Resource | Limit |
|----------|-------|
| Initial JavaScript bundle | 300KB (gzipped) |
| Total JavaScript (lazy loaded) | 1MB |
| CSS bundle | 50KB |
| Single 3D model (regional) | 5MB |
| Total offline cache | 500MB |
| IndexedDB storage | 100MB |

### 15.4 Optimization Strategies

**Code:**
- Tree shaking and dead code elimination
- Route-based code splitting
- Component lazy loading for below-fold content

**Assets:**
- Image compression and next-gen formats
- 3D model optimization (mesh decimation, texture compression)
- Font subsetting (only used characters)

**Caching:**
- Service worker for static assets
- IndexedDB for frequently accessed data
- Memory caching for current session data

**Loading:**
- Progressive 3D model loading (low-res first, then detail)
- Skeleton placeholders during data fetch
- Above-fold content prioritized

---

## 16. Content Sources & Licensing

### 16.1 Licensed/Owned Content (Not Distributable)

| Source | Usage | Notes |
|--------|-------|-------|
| Netter's Atlas 6th Ed | Reference only | Cross-references point to user's physical copy; no Netter images in app |
| Netter's Coloring Book | Reference only | Exercise references only |
| Netter's Flash Cards | Reference only | Card number references only |

### 16.2 Open-Source Content (Integrable)

| Source | License | Usage |
|--------|---------|-------|
| Z-Anatomy 3D Models | CC-BY-SA 4.0 | 3D model integration with attribution |
| BodyParts3D | CC-BY-SA 2.1 JP | Supplementary models with attribution |
| OpenStax A&P 2e | CC-BY 4.0 | Text content integration with attribution |
| Gray's 1918 Illustrations | Public Domain | Historical illustrations, unrestricted |
| UBERON Ontology | CC0 | Anatomical term data, unrestricted |
| Wikipedia Content | CC-BY-SA 3.0 | Selected content with attribution |

### 16.3 Attribution Requirements

**In-App Attribution Page:**
- List all CC-licensed sources with links
- Display license badges/text
- Acknowledge original creators

**Per-Content Attribution:**
- Z-Anatomy: Credit on any screen displaying Z-Anatomy models
- OpenStax: Credit when displaying OpenStax-derived text
- Wikipedia: Credit with link to source article

### 16.4 External Links (No License Concern)

- OpenStax chapter links
- Wikipedia article links
- Z-Anatomy web viewer links
- Anatomography viewer links
- Radiopaedia article links

---

## 17. Implementation Phases

### 17.1 Phase 1: Foundation (Weeks 1-3)

**Objectives:**
- Establish project infrastructure
- Implement core data layer
- Build basic UI shell

**Deliverables:**
- Project setup with React, TypeScript, Vite
- IndexedDB integration with Dexie.js
- Basic routing and navigation structure
- Design system components (buttons, cards, typography)
- Static data loading (structure definitions in JSON)

**Success Criteria:**
- App loads and navigates between placeholder pages
- Data persists across sessions
- Basic UI components render correctly

### 17.2 Phase 2: Interactive Explorer MVP (Weeks 4-6)

**Objectives:**
- Implement 3D viewer with basic controls
- Build structure navigation and selection
- Create annotation panel with core content

**Deliverables:**
- Three.js integration with React Three Fiber
- 3D model loading (one region: Upper Limb)
- Structure tree navigation
- Basic annotation panel (definition, key facts)
- Structure search functionality

**Success Criteria:**
- User can navigate Upper Limb structures
- 3D model responds to rotation, zoom, pan
- Selected structure displays annotation

### 17.3 Phase 3: Cross-Reference & Content Expansion (Weeks 7-8)

**Objectives:**
- Implement cross-reference system
- Expand to all anatomical regions
- Add relationship data

**Deliverables:**
- Cross-reference panel with Atlas, Coloring Book, Flashcard references
- All 8 regions with structure data
- Relationship display in annotation panel
- External link integration

**Success Criteria:**
- Every structure links to physical resources
- All regions navigable
- Relationships displayed for major structures

### 17.4 Phase 4: Guided Learning Mode (Weeks 9-11)

**Objectives:**
- Build chapter/module structure
- Implement module content types
- Create synthesis exercises

**Deliverables:**
- Chapter selection and progress tracking
- Structure module content flow
- Synthesis module with relationship exercises
- Chapter assessments

**Success Criteria:**
- User can progress through one complete chapter
- Synthesis exercises functional
- Progress persists across sessions

### 17.5 Phase 5: Spaced Repetition System (Weeks 12-13)

**Objectives:**
- Implement FSRS algorithm
- Build flashcard interface
- Connect to learning progress

**Deliverables:**
- ts-fsrs integration
- Flashcard review interface
- Card scheduling and queue management
- Review statistics dashboard

**Success Criteria:**
- Cards schedule according to FSRS algorithm
- Review sessions functional with rating system
- Statistics display correctly

### 17.6 Phase 6: Audio & Polish (Weeks 14-16)

**Objectives:**
- Implement TTS system
- Accessibility audit and fixes
- Performance optimization
- PWA configuration

**Deliverables:**
- TTS playback for definitions and descriptions
- Pronunciation system for anatomical terms
- Accessibility improvements from audit
- Service worker for offline functionality
- Performance optimizations

**Success Criteria:**
- TTS works for all supported content
- WCAG AA compliance verified
- Lighthouse performance > 90
- App works offline

### 17.7 Future Considerations (Post-MVP)

- Multi-device sync
- User-created cards and notes
- Advanced quiz modes
- Additional anatomical detail levels (histology)
- Sharing/export features
- Mobile native apps

---

## 18. Appendices

### Appendix A: Netter's Atlas 6th Edition Plate Reference

**Section 1: Head and Neck (Plates 1-148)**
- Skull (1-18)
- Meninges and Brain (19-48)
- Cranial Nerves (49-75)
- Face (76-98)
- Neck (99-148)

**Section 2: Back and Spinal Cord (Plates 149-177)**
- Vertebral Column (149-162)
- Spinal Cord (163-177)

**Section 3: Thorax (Plates 178-241)**
- Thoracic Wall (178-195)
- Lungs (196-213)
- Heart (214-241)

**Section 4: Abdomen (Plates 242-328)**
- Abdominal Wall (242-262)
- Peritoneum (263-271)
- Stomach/Duodenum (272-284)
- Intestines (285-302)
- Liver/Biliary (303-316)
- Kidney/Suprarenal (317-328)

**Section 5: Pelvis and Perineum (Plates 329-399)**
- Pelvic Structure (329-348)
- Urinary (349-362)
- Reproductive (363-390)
- Perineum (391-399)

**Section 6: Upper Limb (Plates 400-468)**
- Shoulder (400-419)
- Arm (420-432)
- Forearm (433-450)
- Hand (451-468)

**Section 7: Lower Limb (Plates 469-531)**
- Hip/Thigh (469-492)
- Knee/Leg (493-512)
- Ankle/Foot (513-531)

**Section 8: Cross-Sectional (Plate 532)**
- Orientation figure

### Appendix B: Netter's Flashcard Organization (4th Edition)

**300+ cards organized regionally:**
- Head and Neck (~60 cards)
- Back and Spinal Cord (~25 cards)
- Thorax (~45 cards)
- Abdomen (~50 cards)
- Pelvis and Perineum (~40 cards)
- Upper Limb (~45 cards)
- Lower Limb (~45 cards)

Each card features:
- Front: Netter illustration with numbered labels
- Back: Structure names keyed to numbers, anatomical comments, clinical notes

### Appendix C: Netter's Coloring Book Chapter Structure

1. Orientation to the Body
2. Skeletal System
3. Muscular System
4. Nervous System
5. Cardiovascular System
6. Lymphatic System
7. Respiratory System
8. Digestive System
9. Urinary System
10. Reproductive System
11. Endocrine System

Each chapter includes multiple exercises with cross-references to Atlas plates.

### Appendix D: Anatomical Term Pronunciation Guide (Sample)

| Term | IPA | Common Mispronunciation |
|------|-----|------------------------|
| Biceps brachii | /ˈbaɪsɛps ˈbreɪkiaɪ/ | "brack-ee-eye" |
| Sternocleidomastoid | /ˌstɜːrnoʊˌklaɪdoʊˈmæstɔɪd/ | Various |
| Pterygoid | /ˈtɛrɪɡɔɪd/ | "terri-goid" |
| Xiphoid | /ˈzaɪfɔɪd/ | "ziff-oid" |
| Thoracolumbar | /ˌθɔːrəkoʊˈlʌmbər/ | "thoraco-lumber" |
| Gastrocnemius | /ˌɡæstrɒkˈniːmiəs/ | "gastro-nee-mus" |
| Popliteal | /ˌpɒplɪˈtiːəl/ | "pop-li-tee-al" |
| Brachioradialis | /ˌbreɪkioʊˌreɪdiˈælɪs/ | Various |

### Appendix E: Key Relationships by Region (Sample - Upper Limb)

**Shoulder Complex:**
- Glenohumeral joint: Humerus articulates with scapula
- Rotator cuff muscles (SITS): Stabilize glenohumeral joint
- Suprascapular nerve: Innervates supraspinatus and infraspinatus
- Axillary nerve: At risk in shoulder dislocation

**Brachial Plexus:**
- Roots (C5-T1) → Trunks → Divisions → Cords → Branches
- Lateral cord → Musculocutaneous nerve → Biceps
- Posterior cord → Radial nerve → Triceps, extensors
- Medial cord → Ulnar nerve → Hand intrinsics

**Carpal Tunnel:**
- Contents: Median nerve + 9 flexor tendons
- Boundaries: Carpal bones + flexor retinaculum
- Clinical: Compression → Carpal tunnel syndrome

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | December 2024 | Claude | Initial specification |

---

*End of Specification Document*
