/**
 * UI-Related Type Definitions
 * Based on Netter's Anatomy Tool Specification Section 12
 */

/**
 * Application view modes
 */
export enum ViewMode {
  /** Interactive 3D explorer mode */
  EXPLORER = 'explorer',
  /** Guided structured learning mode */
  GUIDED = 'guided',
  /** Flashcard review mode */
  FLASHCARDS = 'flashcards',
}

/**
 * Navigation view types for Explorer mode
 */
export enum ExplorerView {
  /** View by anatomical region */
  REGIONAL = 'regional',
  /** View by body system */
  SYSTEMS = 'systems',
}

/**
 * Design system color palette
 */
export const Colors = {
  /** Interactive elements */
  primary: '#2563EB',
  /** Secondary actions */
  secondary: '#0F766E',
  /** Main background */
  background: '#FAFAFA',
  /** Card/panel surface */
  surface: '#FFFFFF',
  /** Primary text */
  textPrimary: '#1F2937',
  /** Secondary text */
  textSecondary: '#6B7280',
  /** Border color */
  border: '#E5E7EB',
  /** Success state */
  success: '#059669',
  /** Warning state */
  warning: '#D97706',
  /** Error state */
  error: '#DC2626',
} as const;

/**
 * Anatomical system colors for visualization
 */
export const SystemColors = {
  /** Bone structures */
  bone: '#F5F0E6',
  /** Muscle structures */
  muscle: '#C45C5C',
  /** Nerve structures */
  nerve: '#E6C744',
  /** Arterial structures */
  artery: '#D64545',
  /** Venous structures */
  vein: '#4571D6',
  /** Organ structures */
  organ: '#7E57C2',
  /** Ligament structures */
  ligament: '#8D9E78',
  /** Fascia structures */
  fascia: '#B8A99A',
} as const;

/**
 * Theme configuration
 */
export interface Theme {
  /** Color palette */
  colors: typeof Colors;
  /** System-specific colors */
  systemColors: typeof SystemColors;
  /** Font family settings */
  fonts: {
    ui: string;
    content: string;
  };
  /** Spacing scale (in pixels) */
  spacing: number[];
  /** Border radius values */
  borderRadius: {
    small: number;
    medium: number;
    large: number;
  };
}

/**
 * Display preferences
 */
export interface DisplayPreferences {
  /** High contrast mode enabled */
  highContrast: boolean;
  /** Colorblind-friendly mode */
  colorblindMode: boolean;
  /** Reduced motion for accessibility */
  reducedMotion: boolean;
  /** Show labels on 3D models */
  showLabels: boolean;
  /** Font size multiplier */
  fontSizeScale: number;
}

/**
 * Audio/TTS preferences
 */
export interface AudioPreferences {
  /** TTS voice identifier */
  voice: string | null;
  /** Playback speed (0.75, 1.0, 1.25, 1.5) */
  playbackSpeed: number;
  /** Auto-read quiz questions */
  autoReadQuestions: boolean;
  /** Auto-read quiz feedback */
  autoReadFeedback: boolean;
  /** Pronunciation-only mode */
  pronunciationOnly: boolean;
}

/**
 * Spaced repetition preferences
 */
export interface SpacedRepetitionPreferences {
  /** New cards per day */
  newCardsPerDay: number;
  /** Maximum reviews per day */
  maxReviewsPerDay: number;
  /** Learning steps in minutes */
  learningSteps: number[];
  /** Graduating interval in days */
  graduatingInterval: number;
  /** Easy interval in days */
  easyInterval: number;
}

/**
 * Complete user preferences
 */
export interface UserPreferences {
  /** Display settings */
  display: DisplayPreferences;
  /** Audio settings */
  audio: AudioPreferences;
  /** Spaced repetition settings */
  spacedRepetition: SpacedRepetitionPreferences;
  /** Explorer view preference */
  explorerView: ExplorerView;
  /** Preferred view mode */
  defaultViewMode: ViewMode;
}

/**
 * UI toast notification
 */
export interface Toast {
  /** Unique identifier */
  id: string;
  /** Toast type */
  type: 'success' | 'error' | 'warning' | 'info';
  /** Toast message */
  message: string;
  /** Duration in milliseconds (0 = persist) */
  duration: number;
}

/**
 * Modal dialog configuration
 */
export interface ModalConfig {
  /** Modal title */
  title: string;
  /** Modal content */
  content: React.ReactNode;
  /** Size variant */
  size: 'small' | 'standard' | 'large';
  /** Show close button */
  showClose: boolean;
  /** Close on backdrop click */
  closeOnBackdrop: boolean;
  /** Action buttons */
  actions?: Array<{
    label: string;
    variant: 'primary' | 'secondary' | 'danger';
    onClick: () => void;
  }>;
}

/**
 * 3D viewer control state
 */
export interface ViewerControlState {
  /** Show/hide labels */
  labelsVisible: boolean;
  /** Layer visibility by system */
  layerVisibility: Record<string, boolean>;
  /** Camera position */
  cameraPosition: [number, number, number];
  /** Camera target */
  cameraTarget: [number, number, number];
  /** Selected structure ID */
  selectedStructureId: string | null;
}

/**
 * Pagination state
 */
export interface PaginationState {
  /** Current page (0-indexed) */
  currentPage: number;
  /** Items per page */
  itemsPerPage: number;
  /** Total item count */
  totalItems: number;
}

/**
 * Loading state wrapper
 */
export type LoadingState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

/**
 * Pagination parameters
 */
export interface PaginationParams {
  /** Page number (0-indexed) */
  page: number;
  /** Items per page */
  limit: number;
  /** Sort field */
  sortBy?: string;
  /** Sort direction */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated result
 */
export interface PaginatedResult<T> {
  /** Result items */
  items: T[];
  /** Total count of items */
  total: number;
  /** Current page */
  page: number;
  /** Items per page */
  limit: number;
  /** Total pages */
  totalPages: number;
  /** Has next page */
  hasNext: boolean;
  /** Has previous page */
  hasPrevious: boolean;
}

/**
 * Search result
 */
export interface SearchResult {
  /** Matching structures */
  structures: import('./anatomy').Structure[];
  /** Matching regions */
  regions: import('./anatomy').Region[];
  /** Clinical term matches */
  clinicalTerms: Array<{
    term: string;
    relatedStructureIds: string[];
  }>;
}
