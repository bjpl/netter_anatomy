# Text-to-Speech System Documentation

## Overview

The TTS (Text-to-Speech) system provides comprehensive audio pronunciation support for anatomical terminology in the Netter's Anatomy Learning Tool. It includes custom pronunciation for 50+ medical terms and supports multiple playback speeds and voice options.

## Architecture

### Core Components

1. **TTS Service** (`src/lib/tts/index.ts`)
   - Singleton service wrapping Web Speech API
   - Voice management and selection
   - Playback rate control (0.75x - 1.5x)
   - Event handling for playback state

2. **Pronunciation Lexicon** (`src/lib/tts/pronunciation.ts`)
   - 50+ anatomical term pronunciations
   - IPA notation and simplified guides
   - SSML support for complex terms
   - Category-based organization

3. **React Hook** (`src/hooks/useTTS.ts`)
   - State management for TTS functionality
   - Clean API for components
   - Auto-cleanup on unmount

4. **UI Components** (`src/components/shared/`)
   - `PronunciationButton` - Single-term pronunciation
   - `TTSButton` - Simple play/pause with speed control
   - `TTSPlayer` - Full-featured audio player

## Usage

### Basic Text-to-Speech

```typescript
import { useTTS } from '@/hooks/useTTS';

function MyComponent() {
  const { speak, isPlaying, pause, resume, stop } = useTTS();

  return (
    <button onClick={() => speak('Hello world')}>
      {isPlaying ? 'Pause' : 'Play'}
    </button>
  );
}
```

### Anatomical Term Pronunciation

```typescript
import { PronunciationButton } from '@/components/shared';

function TermCard({ term }: { term: string }) {
  return (
    <div>
      <h3>{term}</h3>
      <PronunciationButton term={term} />
    </div>
  );
}
```

### Full Audio Player

```typescript
import { TTSPlayer } from '@/components/shared';

function ContentView({ text }: { text: string }) {
  return (
    <TTSPlayer
      text={text}
      title="Description"
      usePronunciation
      showText
      highlightCurrent
    />
  );
}
```

## Pronunciation Lexicon

### Coverage

The lexicon includes 50+ anatomical terms organized by region:

- **Upper Limb**: biceps brachii, triceps brachii, brachialis, etc.
- **Lower Limb**: quadriceps femoris, gastrocnemius, gluteus maximus, etc.
- **Head and Neck**: sternocleidomastoid, masseter, temporalis, etc.
- **Thorax**: pectoralis major, diaphragm, intercostals, etc.
- **Back**: trapezius, latissimus dorsi, erector spinae, etc.
- **Abdomen**: rectus abdominis, obliques, psoas, etc.
- **Directional Terms**: anterior, posterior, superior, inferior, etc.

### Adding New Terms

```typescript
// In src/lib/tts/pronunciation.ts
export const pronunciationLexicon: Record<string, PronunciationEntry> = {
  'new term': {
    term: 'new term',
    ipa: '/njuː tɜːrm/',
    guide: 'NEW term',
    ssml: '<phoneme alphabet="ipa" ph="njuː tɜːrm">new term</phoneme>',
  },
  // ... other terms
};
```

## API Reference

### useTTS Hook

```typescript
function useTTS(options?: UseTTSOptions): UseTTSReturn
```

**Options:**
- `autoStop?: boolean` - Auto-stop on unmount (default: true)
- `defaultRate?: TTSRate` - Initial playback rate (default: 1)
- `defaultVoice?: string` - Voice name
- `onStart?: () => void` - Start callback
- `onEnd?: () => void` - End callback
- `onPause?: () => void` - Pause callback
- `onResume?: () => void` - Resume callback
- `onError?: (error: Error) => void` - Error callback

**Returns:**
- `state: TTSState` - Current state (idle/playing/paused/stopped)
- `isPlaying: boolean` - Is currently playing
- `isPaused: boolean` - Is currently paused
- `isSupported: boolean` - Browser supports TTS
- `rate: TTSRate` - Current playback rate
- `voices: SpeechSynthesisVoice[]` - Available voices
- `currentVoice: SpeechSynthesisVoice | null` - Selected voice
- `speak(text, options?)` - Speak plain text
- `speakTerm(term, options?)` - Speak with pronunciation
- `speakWithPronunciation(text, options?)` - Format and speak
- `pause()` - Pause playback
- `resume()` - Resume playback
- `stop()` - Stop and clear
- `setRate(rate)` - Change playback speed
- `setVoice(voiceName)` - Select voice
- `togglePlayPause()` - Toggle play/pause state

### Components

#### PronunciationButton

```typescript
interface PronunciationButtonProps {
  term: string;
  size?: 'small' | 'medium' | 'large';
  showTooltip?: boolean;
  className?: string;
  onPronounce?: (term: string) => void;
}
```

#### TTSButton

```typescript
interface TTSButtonProps {
  text: string;
  usePronunciation?: boolean;
  showSpeedControl?: boolean;
  variant?: 'default' | 'minimal' | 'icon';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  label?: string;
}
```

#### TTSPlayer

```typescript
interface TTSPlayerProps {
  text: string;
  title?: string;
  usePronunciation?: boolean;
  showText?: boolean;
  highlightCurrent?: boolean;
  className?: string;
  onStart?: () => void;
  onEnd?: () => void;
}
```

## Browser Support

The TTS system uses the Web Speech API, which is supported in:

- ✅ Chrome/Edge (full support)
- ✅ Safari (full support)
- ⚠️ Firefox (limited voice selection)
- ❌ IE11 (not supported)

The system gracefully degrades when TTS is not supported, hiding TTS buttons and controls.

## Accessibility

- All TTS buttons have proper ARIA labels
- Keyboard accessible (standard button controls)
- Screen reader compatible
- Focus indicators for keyboard navigation
- Pronunciation guides provided for screen readers

## Performance Considerations

1. **Voice Loading**: Voices load asynchronously in some browsers
2. **Singleton Service**: Single TTS instance prevents conflicts
3. **Auto-cleanup**: Hooks automatically stop playback on unmount
4. **Lazy Pronunciation**: Lexicon loaded on-demand

## Testing

Run TTS tests:

```bash
npm test tests/lib/tts
npm test tests/hooks/useTTS
npm test tests/components/shared/PronunciationButton
```

## Future Enhancements

1. **Extended Lexicon**: Add 450+ more terms (target: 500 total)
2. **Voice Download**: Option to download offline voices
3. **Highlighting**: Sentence-by-sentence highlighting during playback
4. **Bookmarking**: Save position in long content
5. **Playlist**: Queue multiple content pieces
6. **Custom Voices**: User-uploaded voice packs
7. **Phonetic Practice**: Repeat-after-me exercises

## Troubleshooting

### TTS Not Working

1. Check browser compatibility
2. Verify `window.speechSynthesis` exists
3. Check voice availability: `ttsService.getVoices()`
4. Ensure autoplay policies allow speech synthesis

### Pronunciation Issues

1. Check if term exists in lexicon: `hasPronunciation(term)`
2. Verify IPA notation is correct
3. Test with simplified guide instead of SSML
4. Report issues for lexicon updates

### Performance Issues

1. Stop previous speech before starting new
2. Don't create multiple TTS service instances
3. Clean up event handlers on unmount
4. Avoid very long text blocks (split into paragraphs)

## Contributing

To add new pronunciation entries:

1. Research correct IPA notation
2. Create simplified pronunciation guide
3. Test with multiple voices
4. Add to appropriate category
5. Update tests
6. Document in lexicon coverage
