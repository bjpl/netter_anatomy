/**
 * PronunciationGuide Component
 *
 * Displays pronunciation information for anatomical terms with IPA notation,
 * simplified guides, and TTS playback.
 */

import { Info } from 'lucide-react';
import { getPronunciation } from '../../lib/tts';
import { TTSButton } from './TTSButton';
import { cn } from '../../lib/utils';

export interface PronunciationGuideProps {
  /**
   * Anatomical term to show pronunciation for
   */
  term: string;

  /**
   * Whether to show IPA notation
   * @default true
   */
  showIPA?: boolean;

  /**
   * Whether to show simplified guide
   * @default true
   */
  showGuide?: boolean;

  /**
   * Whether to show TTS button
   * @default true
   */
  showTTS?: boolean;

  /**
   * Layout variant
   * @default 'inline'
   */
  variant?: 'inline' | 'card' | 'compact';

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Pronunciation Guide Component
 *
 * Shows detailed pronunciation information for anatomical terms.
 * Includes IPA notation, simplified guides, and TTS playback.
 *
 * @example
 * ```tsx
 * // Full pronunciation guide
 * <PronunciationGuide term="humerus" />
 *
 * // Compact version (guide only)
 * <PronunciationGuide
 *   term="scapula"
 *   variant="compact"
 *   showIPA={false}
 * />
 *
 * // Card layout
 * <PronunciationGuide
 *   term="brachial plexus"
 *   variant="card"
 * />
 * ```
 */
export function PronunciationGuide({
  term,
  showIPA = true,
  showGuide = true,
  showTTS = true,
  variant = 'inline',
  className,
}: PronunciationGuideProps) {
  const pronunciation = getPronunciation(term);

  // Don't render if no pronunciation found
  if (!pronunciation) {
    return null;
  }

  // Inline variant (minimal)
  if (variant === 'inline') {
    return (
      <div className={cn('inline-flex items-center gap-2', className)}>
        {showGuide && (
          <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">
            {pronunciation.guide}
          </span>
        )}
        {showTTS && <TTSButton text={term} size="small" />}
      </div>
    );
  }

  // Compact variant (guide + TTS)
  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-3 p-2 rounded-md bg-gray-50 dark:bg-gray-800', className)}>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {pronunciation.term}
          </div>
          {showGuide && (
            <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
              {pronunciation.guide}
            </div>
          )}
        </div>
        {showTTS && <TTSButton text={term} size="small" />}
      </div>
    );
  }

  // Card variant (full detail)
  return (
    <div
      className={cn(
        'p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {pronunciation.term}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
            <Info className="h-4 w-4" />
            <span>Pronunciation Guide</span>
          </div>
        </div>
        {showTTS && <TTSButton text={term} size="medium" variant="minimal" />}
      </div>

      {/* Pronunciation Details */}
      <div className="space-y-2">
        {showIPA && (
          <div className="flex gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[80px]">
              IPA:
            </span>
            <span className="text-sm text-gray-900 dark:text-gray-100 font-serif">
              {pronunciation.ipa}
            </span>
          </div>
        )}

        {showGuide && (
          <div className="flex gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[80px]">
              Guide:
            </span>
            <span className="text-sm text-gray-900 dark:text-gray-100 font-mono">
              {pronunciation.guide}
            </span>
          </div>
        )}

        {pronunciation.alternatives && pronunciation.alternatives.length > 0 && (
          <div className="flex gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[80px]">
              Note:
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400 italic">
              {pronunciation.alternatives.join(', ')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
