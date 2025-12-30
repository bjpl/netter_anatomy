# Chapter Assessment System Documentation

## Overview

The Chapter Assessment System provides a comprehensive, accessible quiz interface for testing student knowledge of anatomy chapters. It includes multiple question types, progress tracking, immediate feedback, and detailed results analysis.

## Components

### 1. ChapterAssessment (Main Component)

The primary assessment container that manages the entire quiz flow.

**Location:** `src/components/guided/ChapterAssessment.tsx`

**Features:**
- Quiz interface with navigation
- Progress tracking (question navigator sidebar)
- Timer with optional time limits
- Question randomization (optional)
- Answer randomization (optional)
- Pass/fail threshold (default 80%)
- Comprehensive results screen

**Props:**
```typescript
interface ChapterAssessmentProps {
  chapterNumber: number;         // Chapter identifier
  chapterTitle: string;          // Chapter name
  questions: Question[];         // Array of questions
  config?: Partial<AssessmentConfig>;  // Optional configuration
  onComplete?: (score: number, passed: boolean) => void;  // Completion callback
  onExit?: () => void;          // Exit callback
  onRetry?: () => void;         // Retry callback
}
```

**Configuration:**
```typescript
interface AssessmentConfig {
  title: string;                 // Assessment title
  description?: string;          // Assessment description
  passingScore: number;          // Passing percentage (default: 80)
  timeLimit?: number;            // Time limit in minutes (optional)
  randomizeQuestions?: boolean;  // Randomize question order (default: false)
  randomizeAnswers?: boolean;    // Randomize answer order (default: true)
}
```

### 2. AssessmentQuestion (Question Display)

Renders individual questions with support for multiple question types.

**Location:** `src/components/guided/AssessmentQuestion.tsx`

**Features:**
- Multiple question types support
- Answer selection interface
- Feedback display (correct/incorrect)
- Explanations
- Accessibility features (ARIA labels, keyboard navigation)

**Question Types:**
1. **Multiple Choice** - Standard multiple-choice questions
2. **Image Labeling** - Image-based identification questions
3. **Fill in the Blank** - Fill-in-the-blank style questions

**Props:**
```typescript
interface AssessmentQuestionProps {
  question: Question;            // Question object
  questionNumber: number;        // Display number
  selectedAnswerId: string | null;  // Currently selected answer
  onAnswerSelect: (answerId: string) => void;  // Selection handler
  showFeedback?: boolean;        // Show correct/incorrect feedback
  isReview?: boolean;            // Review mode (read-only)
}
```

### 3. AssessmentResults (Results Display)

Shows comprehensive assessment results and review options.

**Location:** `src/components/guided/AssessmentResults.tsx`

**Features:**
- Score percentage and grade display
- Pass/fail indicator
- Detailed statistics breakdown
- Time spent tracking
- Review incorrect answers
- Retry option for failed assessments
- Continue to next chapter (if passed)

**Props:**
```typescript
interface AssessmentResultsProps {
  score: number;                 // Score percentage
  passed: boolean;               // Pass/fail status
  passingScore: number;          // Required passing score
  totalQuestions: number;        // Total question count
  correctAnswers: number;        // Correct answer count
  timeSpent: number;            // Time in seconds
  questions: Question[];         // All questions
  userAnswers: UserAnswer[];     // User's answers
  onRetry?: () => void;         // Retry handler
  onExit?: () => void;          // Exit handler
  onContinue?: () => void;      // Continue handler
}
```

## Data Structures

### Question Object
```typescript
interface Question {
  id: string;                    // Unique identifier
  type: QuestionType;            // Question type
  questionText: string;          // Question text
  image?: string;                // Optional image path
  answers: Answer[];             // Answer options
  explanation?: string;          // Explanation text
  points?: number;               // Point value (default: 1)
}

type QuestionType = 'multiple-choice' | 'image-labeling' | 'fill-blank';
```

### Answer Object
```typescript
interface Answer {
  id: string;                    // Unique identifier
  text: string;                  // Answer text
  isCorrect: boolean;            // Correct answer flag
}
```

### User Answer
```typescript
interface UserAnswer {
  questionId: string;            // Question reference
  selectedAnswerId: string | null;  // Selected answer
  isCorrect: boolean;            // Correctness flag
  timeSpent: number;             // Time spent in seconds
}
```

## Usage Examples

### Basic Usage

```typescript
import { ChapterAssessment, Question } from '@/components/guided';

const questions: Question[] = [
  {
    id: 'q1',
    type: 'multiple-choice',
    questionText: 'What is the longest bone in the human body?',
    answers: [
      { id: 'a1', text: 'Femur', isCorrect: true },
      { id: 'a2', text: 'Humerus', isCorrect: false },
      { id: 'a3', text: 'Tibia', isCorrect: false },
      { id: 'a4', text: 'Fibula', isCorrect: false },
    ],
    explanation: 'The femur is the longest and strongest bone in the body.',
    points: 1,
  },
  // More questions...
];

function MyAssessment() {
  return (
    <ChapterAssessment
      chapterNumber={1}
      chapterTitle="Introduction to Anatomy"
      questions={questions}
      onComplete={(score, passed) => {
        console.log(`Score: ${score}%, Passed: ${passed}`);
      }}
    />
  );
}
```

### Advanced Configuration

```typescript
<ChapterAssessment
  chapterNumber={3}
  chapterTitle="Upper Limb Anatomy"
  questions={questions}
  config={{
    passingScore: 85,              // 85% required to pass
    timeLimit: 20,                 // 20-minute time limit
    randomizeQuestions: true,      // Randomize question order
    randomizeAnswers: true,        // Randomize answer order
    description: 'Test your mastery of upper limb anatomy',
  }}
  onComplete={(score, passed) => {
    // Save to backend
    saveAssessmentResult({ score, passed });

    // Update user progress
    if (passed) {
      unlockNextChapter();
    }
  }}
  onRetry={() => {
    // Track retry attempts
    trackRetryAttempt();
  }}
  onExit={() => {
    // Navigate back
    navigate('/chapters');
  }}
/>
```

### Image-Based Questions

```typescript
const imageQuestion: Question = {
  id: 'q2',
  type: 'image-labeling',
  questionText: 'Identify the structure indicated by the arrow.',
  image: '/images/anatomy/skeletal-system.jpg',
  answers: [
    { id: 'a5', text: 'Femur', isCorrect: true },
    { id: 'a6', text: 'Tibia', isCorrect: false },
    { id: 'a7', text: 'Fibula', isCorrect: false },
    { id: 'a8', text: 'Patella', isCorrect: false },
  ],
  explanation: 'The femur is clearly visible in this anterior view.',
};
```

### Fill-in-the-Blank Questions

```typescript
const fillBlankQuestion: Question = {
  id: 'q3',
  type: 'fill-blank',
  questionText: 'The ___ is the largest artery in the body.',
  answers: [
    { id: 'a9', text: 'Aorta', isCorrect: true },
    { id: 'a10', text: 'Pulmonary artery', isCorrect: false },
    { id: 'a11', text: 'Carotid artery', isCorrect: false },
    { id: 'a12', text: 'Femoral artery', isCorrect: false },
  ],
  explanation: 'The aorta carries oxygenated blood from the heart.',
};
```

## Accessibility Features

### Keyboard Navigation
- **Tab**: Navigate between elements
- **Enter/Space**: Select answers
- **Arrow Keys**: Navigate question grid (sidebar)

### ARIA Labels
- All interactive elements have proper `aria-label` attributes
- Current question marked with `aria-current="true"`
- Answer buttons have `aria-pressed` states
- Proper heading hierarchy for screen readers

### Visual Accessibility
- High contrast colors for readability
- Clear visual feedback for selected answers
- Color-blind friendly (uses icons + colors)
- Large touch targets for mobile devices

## Styling

The assessment system uses Tailwind CSS with a consistent design language:

### Color Scheme
- **Primary**: Blue (600-700) - Navigation, progress
- **Success**: Green (500-700) - Correct answers, passing
- **Error**: Red (500-700) - Incorrect answers, failing
- **Warning**: Yellow/Orange (500-700) - Hints, retries
- **Neutral**: Gray (50-900) - UI elements

### Responsive Design
- Mobile-first approach
- Sidebar navigation (desktop) → collapsible (mobile)
- Touch-friendly buttons (minimum 44px height)
- Readable text sizes (18px+ for questions)

## State Management

### Internal State
- Current question index
- User answers array
- Timer/elapsed time
- Question start times
- Completion status

### Persisted State (Recommendations)
Store assessment results to:
- Local Storage (for offline access)
- Backend API (for cross-device sync)
- Learning Management System (LMS integration)

```typescript
// Example: Saving to localStorage
const handleComplete = (score: number, passed: boolean) => {
  const result = {
    chapterNumber: 1,
    score,
    passed,
    timestamp: new Date().toISOString(),
    userAnswers,
  };

  localStorage.setItem(
    `assessment-chapter-${chapterNumber}`,
    JSON.stringify(result)
  );
};
```

## Performance Considerations

### Question Randomization
- Randomization happens once at component mount
- Use `useMemo` for large question sets
- Seed random number generator for reproducibility

### Image Optimization
- Use lazy loading for question images
- Optimize image sizes (WebP format recommended)
- Provide placeholder images
- Preload next question's image

### Timer Optimization
- Timer uses 1-second intervals (not excessive)
- Cleanup intervals on unmount
- Pause timer when tab is inactive (optional)

## Testing

### Unit Tests
Test individual components:
```typescript
describe('AssessmentQuestion', () => {
  it('displays question text', () => {
    // Test implementation
  });

  it('handles answer selection', () => {
    // Test implementation
  });

  it('shows feedback when requested', () => {
    // Test implementation
  });
});
```

### Integration Tests
Test full assessment flow:
```typescript
describe('ChapterAssessment', () => {
  it('completes full assessment flow', () => {
    // Navigate through all questions
    // Submit assessment
    // Verify results
  });
});
```

## Future Enhancements

### Planned Features
1. **Question Bank Integration**: Pull questions from database
2. **Adaptive Difficulty**: Adjust difficulty based on performance
3. **Detailed Analytics**: Track performance over time
4. **Collaborative Features**: Compare with peers
5. **Spaced Repetition**: Resurface missed questions
6. **Export Results**: PDF/CSV export functionality
7. **Offline Support**: Service worker integration
8. **Multi-language**: i18n support
9. **Audio Questions**: Pronunciation tests
10. **Video Integration**: Video-based questions

### Enhancement Ideas
- Confidence ratings for answers
- Partial credit for multiple-choice questions
- Essay/short answer questions with AI grading
- Peer review system
- Gamification (badges, leaderboards)
- Study recommendations based on results

## Troubleshooting

### Common Issues

**Issue**: Questions not randomizing
```typescript
// Solution: Ensure config is set
config={{
  randomizeQuestions: true,
  randomizeAnswers: true,
}}
```

**Issue**: Timer not stopping on completion
```typescript
// Solution: Check cleanup in useEffect
useEffect(() => {
  if (isCompleted) return; // Early return
  const interval = setInterval(/* ... */);
  return () => clearInterval(interval);
}, [isCompleted]);
```

**Issue**: Images not loading
```typescript
// Solution: Verify image paths and use public directory
image: '/images/anatomy/structure.jpg' // Correct
image: '../images/anatomy/structure.jpg' // Incorrect
```

## API Integration

### Backend Integration Example

```typescript
// Save assessment result to backend
const handleComplete = async (score: number, passed: boolean) => {
  try {
    const response = await fetch('/api/assessments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chapterId: chapterNumber,
        score,
        passed,
        userAnswers,
        timeSpent: elapsedTime,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Result saved:', data);
    }
  } catch (error) {
    console.error('Failed to save result:', error);
  }
};
```

### Load Questions from API

```typescript
const [questions, setQuestions] = useState<Question[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch(`/api/chapters/${chapterNumber}/questions`)
    .then(res => res.json())
    .then(data => {
      setQuestions(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Failed to load questions:', error);
      setLoading(false);
    });
}, [chapterNumber]);
```

## License & Credits

Part of the Netter's Anatomy Learning Tool.
Components built with React, TypeScript, and Tailwind CSS.

---

**Last Updated**: December 29, 2025
**Version**: 1.0.0
