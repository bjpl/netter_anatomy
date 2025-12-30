/**
 * Centralized exports for all page components
 * Enables lazy loading and code splitting
 */

// Explorer pages
export { default as ExplorerHome } from './explorer/ExplorerHome';
export { default as RegionalView } from './explorer/RegionalView';
export { default as StructureDetail } from './explorer/StructureDetail';
export { default as SearchResults } from './explorer/SearchResults';

// Guided learning pages
export { default as GuidedLearningHome } from './guided/GuidedLearningHome';
export { default as ChapterOverview } from './guided/ChapterOverview';
export { default as ModuleView } from './guided/ModuleView';
export { default as SpacedRepetitionQueue } from './guided/SpacedRepetitionQueue';

// Study tools pages
export { default as FlashcardDeckManager } from './tools/FlashcardDeckManager';
export { default as Bookmarks } from './tools/Bookmarks';
export { default as StudyHistory } from './tools/StudyHistory';

// Settings page
export { default as Settings } from './Settings';
