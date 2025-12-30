/**
 * TTS System Usage Examples
 *
 * Demonstrates how to use the Text-to-Speech system in various scenarios.
 */

import React from 'react';
import {
  PronunciationButton,
  InlineTermWithPronunciation,
  TermWithGuide,
  TTSButton,
  TTSPlayer,
  CompactTTSPlayer,
} from '@/components/shared';
import { useTTS, useTermPronunciation } from '@/hooks/useTTS';
import { getPronunciation, hasPronunciation } from '@/lib/tts/pronunciation';

/**
 * Example 1: Simple Term Pronunciation
 * Use PronunciationButton for single anatomical terms
 */
export function TermCardExample() {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">Biceps Brachii</h3>
        <PronunciationButton term="biceps brachii" />
      </div>
      <p className="text-sm text-gray-600 mt-2">
        A large muscle that lies on the front of the upper arm between the shoulder and the elbow.
      </p>
    </div>
  );
}

/**
 * Example 2: Inline Term with Pronunciation
 * Show term with pronunciation button inline
 */
export function InlineTermExample() {
  return (
    <p className="text-gray-700">
      The <InlineTermWithPronunciation term="sternocleidomastoid" /> is one of the largest and
      most superficial cervical muscles.
    </p>
  );
}

/**
 * Example 3: Term with Pronunciation Guide
 * Display term with visual pronunciation guide below
 */
export function TermWithGuideExample() {
  return (
    <div className="space-y-4">
      <TermWithGuide term="gastrocnemius" />
      <TermWithGuide term="pterygoid" />
      <TermWithGuide term="thoracolumbar" />
    </div>
  );
}

/**
 * Example 4: Simple TTS Button
 * Quick play/pause for short content
 */
export function SimpleTTSExample() {
  const description = `
    The biceps brachii is a large, thick muscle on the ventral portion of the upper arm.
    The muscle is composed of a short head and a long head, which work in tandem to produce
    flexion at the elbow and supination of the forearm.
  `;

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Description</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <TTSButton text={description} label="Listen to description" usePronunciation />
    </div>
  );
}

/**
 * Example 5: Full TTS Player
 * Feature-rich player for longer content
 */
export function FullPlayerExample() {
  const longContent = `
    The gastrocnemius muscle is a very powerful superficial bipennate muscle that is in the
    back part of the lower leg. It runs from its two heads just above the knee to the heel,
    and is involved in standing and walking. Together with the soleus muscle, it forms the
    calcaneal tendon, commonly known as the Achilles tendon.

    The muscle is named from Greek γαστήρ (gaster) 'belly' or 'stomach' and κνήμη (kneme)
    'leg', meaning 'stomach of the leg', referring to the bulging shape of the calf.
  `;

  return (
    <div className="max-w-2xl mx-auto">
      <TTSPlayer
        text={longContent}
        title="Gastrocnemius Muscle - Detailed Description"
        usePronunciation
        showText
        highlightCurrent
      />
    </div>
  );
}

/**
 * Example 6: Compact Player
 * Minimal player for embedded use
 */
export function CompactPlayerExample() {
  const briefText = 'The deltoid muscle covers the shoulder and forms its rounded contour.';

  return (
    <div className="flex items-center gap-2">
      <p className="text-gray-700">{briefText}</p>
      <CompactTTSPlayer text={briefText} usePronunciation />
    </div>
  );
}

/**
 * Example 7: Custom TTS Controls with Hook
 * Build custom UI using the useTTS hook
 */
export function CustomControlsExample() {
  const {
    speak,
    pause,
    resume,
    stop,
    isPlaying,
    isPaused,
    rate,
    setRate,
    voices,
    currentVoice,
    setVoice,
  } = useTTS({
    defaultRate: 1,
    onStart: () => console.log('Started speaking'),
    onEnd: () => console.log('Finished speaking'),
  });

  const text = 'The trapezius is a large paired surface muscle that extends longitudinally.';

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <p className="text-gray-700">{text}</p>

      <div className="flex items-center gap-2">
        {!isPlaying && !isPaused && (
          <button
            onClick={() => speak(text)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Play
          </button>
        )}

        {isPlaying && (
          <button
            onClick={pause}
            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
          >
            Pause
          </button>
        )}

        {isPaused && (
          <button
            onClick={resume}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Resume
          </button>
        )}

        {(isPlaying || isPaused) && (
          <button
            onClick={stop}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Stop
          </button>
        )}

        <select
          value={rate}
          onChange={(e) => setRate(Number(e.target.value) as 0.75 | 1 | 1.25 | 1.5)}
          className="px-3 py-2 border rounded-md"
        >
          <option value={0.75}>0.75×</option>
          <option value={1}>1×</option>
          <option value={1.25}>1.25×</option>
          <option value={1.5}>1.5×</option>
        </select>

        <select
          value={currentVoice?.name || ''}
          onChange={(e) => setVoice(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

/**
 * Example 8: Term Pronunciation Hook
 * Simplified hook for pronouncing individual terms
 */
export function SimpleTermPronunciationExample() {
  const { pronounce } = useTermPronunciation();

  const terms = [
    'biceps brachii',
    'sternocleidomastoid',
    'gastrocnemius',
    'gluteus maximus',
    'trapezius',
  ];

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Click a term to hear pronunciation:</h3>
      <div className="flex flex-wrap gap-2">
        {terms.map((term) => (
          <button
            key={term}
            onClick={() => pronounce(term)}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Example 9: Check Pronunciation Availability
 * Conditionally show pronunciation features
 */
export function ConditionalPronunciationExample({ term }: { term: string }) {
  const pronunciation = getPronunciation(term);

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">{term}</h3>
        {hasPronunciation(term) && <PronunciationButton term={term} />}
      </div>

      {pronunciation && (
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-600">
            <span className="font-medium">IPA:</span> {pronunciation.ipa}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Guide:</span> {pronunciation.guide}
          </p>
        </div>
      )}

      {!pronunciation && (
        <p className="text-sm text-gray-500 mt-2">No pronunciation guide available</p>
      )}
    </div>
  );
}

/**
 * Example 10: Quiz Question with Auto-Read
 * Read quiz questions and feedback aloud
 */
export function QuizWithTTSExample() {
  const [showAnswer, setShowAnswer] = React.useState(false);
  const { speak } = useTTS();

  const question = 'Which muscle is responsible for flexion at the elbow and supination?';
  const answer = 'The biceps brachii';

  React.useEffect(() => {
    // Auto-read question when component mounts
    speak(question);
  }, [question, speak]);

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Question</h3>
        <TTSButton text={question} variant="icon" size="small" />
      </div>

      <p className="text-gray-700">{question}</p>

      <button
        onClick={() => {
          setShowAnswer(true);
          speak(answer);
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        disabled={showAnswer}
      >
        Show Answer
      </button>

      {showAnswer && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-green-900">Answer</h4>
            <TTSButton text={answer} variant="icon" size="small" />
          </div>
          <p className="text-green-800 mt-2">{answer}</p>
        </div>
      )}
    </div>
  );
}

/**
 * Complete Example Page
 * Shows all TTS features in one demo
 */
export function TTSExamplesPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">TTS System Examples</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Simple Term Pronunciation</h2>
        <TermCardExample />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Inline Term</h2>
        <InlineTermExample />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Term with Guide</h2>
        <TermWithGuideExample />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Simple TTS Button</h2>
        <SimpleTTSExample />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Full TTS Player</h2>
        <FullPlayerExample />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">6. Compact Player</h2>
        <CompactPlayerExample />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">7. Custom Controls</h2>
        <CustomControlsExample />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">8. Simple Term Pronunciation</h2>
        <SimpleTermPronunciationExample />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">9. Conditional Pronunciation</h2>
        <ConditionalPronunciationExample term="biceps brachii" />
        <ConditionalPronunciationExample term="unknown muscle" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">10. Quiz with TTS</h2>
        <QuizWithTTSExample />
      </section>
    </div>
  );
}
