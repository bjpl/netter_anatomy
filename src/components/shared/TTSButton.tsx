/**
 * TTSButton Component
 *
 * Simple play/pause button for TTS playback of longer content.
 * Includes speed control dropdown.
 */

import { Play, Pause, Volume2, Settings } from 'lucide-react';
import { useTTS } from '@/hooks/useTTS';
import type { TTSRate } from '@/types/tts';
import { useState } from 'react';

interface TTSButtonProps {
  /**
   * Text content to read
   */
  text: string;

  /**
   * Use pronunciation enhancement for medical terms
   * @default true
   */
  usePronunciation?: boolean;

  /**
   * Show speed control
   * @default true
   */
  showSpeedControl?: boolean;

  /**
   * Button variant
   * @default 'default'
   */
  variant?: 'default' | 'minimal' | 'icon';

  /**
   * Button size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Custom class name
   */
  className?: string;

  /**
   * Label text (only for default variant)
   */
  label?: string;
}

const RATE_OPTIONS: { value: TTSRate; label: string }[] = [
  { value: 0.75, label: '0.75×' },
  { value: 1, label: '1×' },
  { value: 1.25, label: '1.25×' },
  { value: 1.5, label: '1.5×' },
];

/**
 * TTS Button with play/pause and speed control
 */
export function TTSButton({
  text,
  usePronunciation = true,
  showSpeedControl = true,
  variant = 'default',
  size = 'medium',
  className = '',
  label,
}: TTSButtonProps) {
  const { isPlaying, isPaused, speak, speakWithPronunciation, pause, resume, stop, rate, setRate, isSupported } =
    useTTS();
  const [showSettings, setShowSettings] = useState(false);

  if (!isSupported) {
    return null;
  }

  const handlePlay = () => {
    if (isPlaying) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      if (usePronunciation) {
        speakWithPronunciation(text);
      } else {
        speak(text);
      }
    }
  };

  const handleStop = () => {
    stop();
    setShowSettings(false);
  };

  const handleRateChange = (newRate: TTSRate) => {
    setRate(newRate);
    // Restart if currently playing
    if (isPlaying) {
      stop();
      setTimeout(() => {
        if (usePronunciation) {
          speakWithPronunciation(text, { rate: newRate });
        } else {
          speak(text, { rate: newRate });
        }
      }, 100);
    }
  };

  const sizeClasses = {
    small: 'h-7 px-2 text-xs',
    medium: 'h-9 px-3 text-sm',
    large: 'h-11 px-4 text-base',
  };

  const iconSizes = {
    small: 14,
    medium: 16,
    large: 20,
  };

  // Minimal variant - just icon button
  if (variant === 'minimal' || variant === 'icon') {
    return (
      <div className="relative inline-flex items-center gap-1">
        <button
          type="button"
          onClick={handlePlay}
          className={`
            inline-flex items-center justify-center
            rounded transition-colors
            ${variant === 'icon' ? 'hover:bg-gray-100' : 'hover:bg-blue-50'}
            ${variant === 'icon' ? 'text-gray-600' : 'text-blue-600'}
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
            ${sizeClasses[size]}
            ${className}
          `}
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying || isPaused ? (
            <>
              {isPlaying ? (
                <Pause size={iconSizes[size]} />
              ) : (
                <Play size={iconSizes[size]} />
              )}
            </>
          ) : (
            <Volume2 size={iconSizes[size]} />
          )}
        </button>

        {showSpeedControl && (isPlaying || isPaused) && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="h-7 px-2 text-xs rounded hover:bg-gray-100 focus:outline-none"
              aria-label="Speed settings"
            >
              <Settings size={14} />
            </button>

            {showSettings && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[100px]">
                <div className="p-2 space-y-1">
                  <div className="text-xs font-medium text-gray-700 px-2 py-1">Speed</div>
                  {RATE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        handleRateChange(option.value);
                        setShowSettings(false);
                      }}
                      className={`
                        w-full text-left px-2 py-1 text-xs rounded
                        hover:bg-blue-50 transition-colors
                        ${rate === option.value ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'}
                      `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Default variant - button with label
  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={handlePlay}
        className={`
          inline-flex items-center gap-2
          rounded-md transition-colors
          bg-blue-600 hover:bg-blue-700 active:bg-blue-800
          text-white font-medium
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${sizeClasses[size]}
          ${className}
        `}
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      >
        {isPlaying ? (
          <Pause size={iconSizes[size]} />
        ) : isPaused ? (
          <Play size={iconSizes[size]} />
        ) : (
          <Volume2 size={iconSizes[size]} />
        )}
        <span>{label || (isPlaying ? 'Pause' : isPaused ? 'Resume' : 'Listen')}</span>
      </button>

      {showSpeedControl && (isPlaying || isPaused) && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className={`
              inline-flex items-center gap-1
              rounded-md border border-gray-300
              bg-white hover:bg-gray-50
              text-gray-700 font-medium
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${sizeClasses[size]}
            `}
            aria-label="Speed settings"
          >
            <Settings size={iconSizes[size]} />
            <span>{rate}×</span>
          </button>

          {showSettings && (
            <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
              <div className="p-2 space-y-1">
                <div className="text-xs font-semibold text-gray-700 px-2 py-1">Playback Speed</div>
                {RATE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      handleRateChange(option.value);
                      setShowSettings(false);
                    }}
                    className={`
                      w-full text-left px-3 py-1.5 text-sm rounded
                      hover:bg-blue-50 transition-colors
                      ${rate === option.value ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700'}
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {(isPlaying || isPaused) && (
        <button
          type="button"
          onClick={handleStop}
          className={`
            rounded-md transition-colors
            border border-gray-300
            bg-white hover:bg-gray-50
            text-gray-700
            focus:outline-none focus:ring-2 focus:ring-gray-500
            ${sizeClasses[size]}
          `}
          aria-label="Stop audio"
        >
          Stop
        </button>
      )}
    </div>
  );
}
