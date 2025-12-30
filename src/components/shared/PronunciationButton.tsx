/**
 * PronunciationButton Component
 *
 * Small speaker button for pronouncing individual anatomical terms.
 * Displays next to medical terminology throughout the app.
 */

import { Volume2 } from 'lucide-react';
import { useTermPronunciation } from '@/hooks/useTTS';
import { getPronunciationGuide } from '@/lib/tts/pronunciation';
import type { ButtonHTMLAttributes } from 'react';

interface PronunciationButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /**
   * The anatomical term to pronounce
   */
  term: string;

  /**
   * Button size variant
   * @default 'small'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Show pronunciation guide tooltip
   * @default true
   */
  showTooltip?: boolean;

  /**
   * Custom class name
   */
  className?: string;

  /**
   * Callback when pronunciation is triggered
   */
  onPronounce?: (term: string) => void;
}

/**
 * Button for pronouncing anatomical terms
 */
export function PronunciationButton({
  term,
  size = 'small',
  showTooltip = true,
  className = '',
  onPronounce,
  ...props
}: PronunciationButtonProps) {
  const { pronounce, isSupported } = useTermPronunciation();
  const pronunciationGuide = getPronunciationGuide(term);

  const handleClick = () => {
    pronounce(term);
    onPronounce?.(term);
  };

  // Don't render if TTS not supported
  if (!isSupported) {
    return null;
  }

  const sizeClasses = {
    small: 'h-5 w-5 p-0.5',
    medium: 'h-6 w-6 p-1',
    large: 'h-8 w-8 p-1.5',
  };

  const iconSizes = {
    small: 14,
    medium: 16,
    large: 20,
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center
        rounded transition-colors
        hover:bg-blue-100 active:bg-blue-200
        text-blue-600 hover:text-blue-700
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
        ${sizeClasses[size]}
        ${className}
      `}
      title={
        showTooltip && pronunciationGuide
          ? `Pronounce: ${pronunciationGuide}`
          : `Pronounce ${term}`
      }
      aria-label={`Pronounce ${term}`}
      {...props}
    >
      <Volume2 size={iconSizes[size]} strokeWidth={2} />
    </button>
  );
}

/**
 * Inline pronunciation button with term label
 * Shows term name with pronunciation button
 */
export function InlineTermWithPronunciation({
  term,
  className = '',
}: {
  term: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="font-medium">{term}</span>
      <PronunciationButton term={term} size="small" />
    </span>
  );
}

/**
 * Term with pronunciation guide displayed below
 */
export function TermWithGuide({ term, className = '' }: { term: string; className?: string }) {
  const guide = getPronunciationGuide(term);

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-1">
        <span className="font-medium">{term}</span>
        <PronunciationButton term={term} size="small" />
      </div>
      {guide && (
        <span className="text-xs text-gray-500 italic" aria-label="pronunciation guide">
          {guide}
        </span>
      )}
    </div>
  );
}
