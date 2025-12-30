/**
 * TTSPlayer Component
 *
 * Full-featured audio player for longer text content.
 * Includes progress tracking, skip controls, and speed adjustment.
 */

import { Play, Pause, Square, SkipForward, SkipBack, Settings } from 'lucide-react';
import { useTTS } from '@/hooks/useTTS';
import type { TTSRate } from '@/types/tts';
import { useState, useEffect, useRef } from 'react';

interface TTSPlayerProps {
  /**
   * Text content to read
   */
  text: string;

  /**
   * Title/heading for the content
   */
  title?: string;

  /**
   * Use pronunciation enhancement for medical terms
   * @default true
   */
  usePronunciation?: boolean;

  /**
   * Show the text being read
   * @default false
   */
  showText?: boolean;

  /**
   * Highlight current sentence being read
   * @default false
   */
  highlightCurrent?: boolean;

  /**
   * Custom class name
   */
  className?: string;

  /**
   * Callback when playback starts
   */
  onStart?: () => void;

  /**
   * Callback when playback ends
   */
  onEnd?: () => void;
}

const RATE_OPTIONS: TTSRate[] = [0.75, 1, 1.25, 1.5];

/**
 * Full-featured TTS player component
 */
export function TTSPlayer({
  text,
  title,
  usePronunciation = true,
  showText = false,
  highlightCurrent = false,
  className = '',
  onStart,
  onEnd,
}: TTSPlayerProps) {
  const {
    isPlaying,
    isPaused,
    speak,
    speakWithPronunciation,
    pause,
    resume,
    stop,
    rate,
    setRate,
    isSupported,
  } = useTTS({
    onStart,
    onEnd,
  });

  const [showSettings, setShowSettings] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [sentences, setSentences] = useState<string[]>([]);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Split text into sentences for highlighting
  useEffect(() => {
    const splitSentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    setSentences(splitSentences.map((s) => s.trim()));
  }, [text]);

  // Simulate progress (Web Speech API doesn't provide real progress)
  useEffect(() => {
    if (isPlaying) {
      const wordsPerMinute = 150 * rate; // Average speaking rate adjusted for speed
      const wordCount = text.split(/\s+/).length;
      const estimatedDuration = (wordCount / wordsPerMinute) * 60 * 1000; // milliseconds
      const updateInterval = 100; // Update every 100ms
      const progressPerUpdate = (updateInterval / estimatedDuration) * 100;

      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          const next = prev + progressPerUpdate;
          if (next >= 100) {
            clearInterval(progressInterval.current!);
            return 100;
          }
          return next;
        });
      }, updateInterval);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      if (!isPaused) {
        setProgress(0);
        setCurrentSentenceIndex(0);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, isPaused, text, rate]);

  // Update current sentence based on progress
  useEffect(() => {
    if (highlightCurrent && sentences.length > 0) {
      const sentenceIndex = Math.floor((progress / 100) * sentences.length);
      setCurrentSentenceIndex(Math.min(sentenceIndex, sentences.length - 1));
    }
  }, [progress, sentences.length, highlightCurrent]);

  if (!isSupported) {
    return (
      <div className={`p-4 bg-gray-50 rounded-lg border border-gray-200 ${className}`}>
        <p className="text-sm text-gray-600">
          Text-to-speech is not supported in your browser.
        </p>
      </div>
    );
  }

  const handlePlay = () => {
    if (isPlaying) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      setProgress(0);
      setCurrentSentenceIndex(0);
      if (usePronunciation) {
        speakWithPronunciation(text);
      } else {
        speak(text);
      }
    }
  };

  const handleStop = () => {
    stop();
    setProgress(0);
    setCurrentSentenceIndex(0);
    setShowSettings(false);
  };

  const handleSkipForward = () => {
    // Skip 10 seconds worth of content
    const skipAmount = (10 / (text.split(/\s+/).length / (150 * rate))) * 100;
    const newProgress = Math.min(progress + skipAmount, 100);
    setProgress(newProgress);

    // Restart from new position (approximate)
    if (isPlaying || isPaused) {
      stop();
      // In a real implementation, you'd need to track position and resume from there
      // Web Speech API doesn't support seeking, so this is a limitation
    }
  };

  const handleSkipBack = () => {
    const skipAmount = (10 / (text.split(/\s+/).length / (150 * rate))) * 100;
    const newProgress = Math.max(progress - skipAmount, 0);
    setProgress(newProgress);

    if (isPlaying || isPaused) {
      stop();
    }
  };

  const handleRateChange = (newRate: TTSRate) => {
    setRate(newRate);
    setShowSettings(false);

    // Restart if currently playing
    if (isPlaying) {
      const currentProgress = progress;
      stop();
      setTimeout(() => {
        setProgress(currentProgress);
        if (usePronunciation) {
          speakWithPronunciation(text, { rate: newRate });
        } else {
          speak(text, { rate: newRate });
        }
      }, 100);
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {/* Header */}
      {title && (
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
      )}

      {/* Text Display */}
      {showText && (
        <div className="px-4 py-3 border-b border-gray-200 max-h-48 overflow-y-auto">
          {highlightCurrent ? (
            <div className="text-sm text-gray-700 leading-relaxed space-y-2">
              {sentences.map((sentence, index) => (
                <span
                  key={index}
                  className={`
                    ${index === currentSentenceIndex && isPlaying ? 'bg-blue-100 font-medium' : ''}
                    transition-colors duration-200
                  `}
                >
                  {sentence}{' '}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
          )}
        </div>
      )}

      {/* Player Controls */}
      <div className="px-4 py-3 space-y-3">
        {/* Progress Bar */}
        <div className="relative">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>{Math.floor(progress)}%</span>
            <span>{rate}× speed</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-2">
          {/* Skip Back */}
          <button
            type="button"
            onClick={handleSkipBack}
            disabled={!isPlaying && !isPaused}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Skip back 10 seconds"
            title="Skip back 10 seconds"
          >
            <SkipBack size={20} />
          </button>

          {/* Play/Pause */}
          <button
            type="button"
            onClick={handlePlay}
            className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={isPlaying ? 'Pause' : isPaused ? 'Resume' : 'Play'}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          {/* Skip Forward */}
          <button
            type="button"
            onClick={handleSkipForward}
            disabled={!isPlaying && !isPaused}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Skip forward 10 seconds"
            title="Skip forward 10 seconds"
          >
            <SkipForward size={20} />
          </button>

          {/* Stop */}
          <button
            type="button"
            onClick={handleStop}
            disabled={!isPlaying && !isPaused}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Stop"
            title="Stop"
          >
            <Square size={20} />
          </button>

          {/* Settings */}
          <div className="relative ml-2">
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Settings"
              title="Playback settings"
            >
              <Settings size={20} />
            </button>

            {showSettings && (
              <div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[140px]">
                <div className="p-2 space-y-1">
                  <div className="text-xs font-semibold text-gray-700 px-2 py-1">
                    Playback Speed
                  </div>
                  {RATE_OPTIONS.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleRateChange(option)}
                      className={`
                        w-full text-left px-3 py-1.5 text-sm rounded
                        hover:bg-blue-50 transition-colors
                        ${rate === option ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700'}
                      `}
                    >
                      {option}×
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Compact version of TTSPlayer
 * Minimal interface for embedded use
 */
export function CompactTTSPlayer({
  text,
  usePronunciation = true,
  className = '',
}: {
  text: string;
  usePronunciation?: boolean;
  className?: string;
}) {
  const { isPlaying, isPaused, speak, speakWithPronunciation, pause, resume, stop, isSupported } =
    useTTS();

  if (!isSupported) return null;

  const handleToggle = () => {
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

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        className="p-2 rounded-full hover:bg-blue-50 text-blue-600 transition-colors"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>
      {(isPlaying || isPaused) && (
        <button
          type="button"
          onClick={stop}
          className="p-1.5 rounded hover:bg-gray-100 text-gray-600 text-xs"
          aria-label="Stop"
        >
          <Square size={14} />
        </button>
      )}
    </div>
  );
}
