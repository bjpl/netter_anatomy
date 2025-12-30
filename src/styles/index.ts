/**
 * Style constants exported for JavaScript/TypeScript usage
 */

/**
 * Color palette
 */
export const colors = {
  // Primary Colors
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  secondary: '#059669',

  // Neutral Colors
  background: '#FAFAFA',
  surface: '#FFFFFF',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',

  // Anatomical System Colors
  bone: '#F5F0E6',
  muscle: '#C45C5C',
  nerve: '#E6C744',
  artery: '#D64545',
  vein: '#4571D6',
  organ: '#7E57C2',
  ligament: '#8D9E78',
  fascia: '#B8A99A',

  // Semantic Colors
  success: '#059669',
  warning: '#D97706',
  error: '#DC2626',
  info: '#2563EB',

  // Dark Mode Colors
  dark: {
    background: '#111827',
    surface: '#1F2937',
    textPrimary: '#F9FAFB',
    textSecondary: '#D1D5DB',
    border: '#374151',
  },
} as const;

/**
 * Breakpoint values (in pixels)
 */
export const breakpoints = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Z-index scale for layering
 */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
} as const;

/**
 * Animation duration values (in milliseconds)
 */
export const transitions = {
  fast: 150,
  normal: 250,
  slow: 350,
} as const;

/**
 * Spacing scale (in rem)
 */
export const spacing = {
  page: 1.5,
  section: 2,
  xs: 0.25,
  sm: 0.5,
  md: 1,
  lg: 1.5,
  xl: 2,
  '2xl': 3,
  '3xl': 4,
  '4xl': 6,
} as const;

/**
 * Font families
 */
export const fonts = {
  sans: "'Inter', system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
} as const;

/**
 * Font sizes (in rem)
 */
export const fontSizes = {
  xs: 0.75,
  sm: 0.875,
  base: 1,
  lg: 1.125,
  xl: 1.25,
  '2xl': 1.5,
  '3xl': 1.875,
  '4xl': 2.25,
} as const;

/**
 * Border radius values (in rem)
 */
export const borderRadius = {
  none: 0,
  sm: 0.125,
  base: 0.25,
  md: 0.375,
  lg: 0.5,
  xl: 0.75,
  '2xl': 1,
  full: 9999,
} as const;

/**
 * Shadow values
 */
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
} as const;

/**
 * Media query helpers
 */
export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
  dark: '@media (prefers-color-scheme: dark)',
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
} as const;

/**
 * Type exports for TypeScript
 */
export type Color = keyof typeof colors;
export type Breakpoint = keyof typeof breakpoints;
export type ZIndex = keyof typeof zIndex;
export type Transition = keyof typeof transitions;
export type Spacing = keyof typeof spacing;
export type FontSize = keyof typeof fontSizes;
export type BorderRadius = keyof typeof borderRadius;
export type Shadow = keyof typeof shadows;
