import React, { useState } from 'react';
import { ChapterAssessment, Question } from './ChapterAssessment';

/**
 * Example usage of the ChapterAssessment component
 * This file demonstrates how to create and configure assessments
 */

export const AssessmentExample: React.FC = () => {
  const [showAssessment, setShowAssessment] = useState(false);

  // Example questions for a musculoskeletal system chapter
  const exampleQuestions: Question[] = [
    // Multiple choice question
    {
      id: 'q1',
      type: 'multiple-choice',
      questionText: 'Which muscle is the primary flexor of the elbow joint?',
      answers: [
        { id: 'a1', text: 'Triceps brachii', isCorrect: false },
        { id: 'a2', text: 'Biceps brachii', isCorrect: true },
        { id: 'a3', text: 'Brachioradialis', isCorrect: false },
        { id: 'a4', text: 'Deltoid', isCorrect: false },
      ],
      explanation:
        'The biceps brachii is the primary flexor of the elbow joint. It has two heads (long and short) that originate from the scapula and insert on the radial tuberosity.',
      points: 1,
    },

    // Image-based question
    {
      id: 'q2',
      type: 'image-labeling',
      questionText:
        'Identify the anatomical structure indicated by the arrow in this cross-section of the upper arm.',
      image: '/images/anatomy/upper-arm-cross-section.jpg', // Placeholder path
      answers: [
        { id: 'a5', text: 'Humerus', isCorrect: true },
        { id: 'a6', text: 'Radius', isCorrect: false },
        { id: 'a7', text: 'Ulna', isCorrect: false },
        { id: 'a8', text: 'Scapula', isCorrect: false },
      ],
      explanation:
        'The humerus is the long bone of the upper arm, extending from the shoulder to the elbow.',
      points: 1,
    },

    // Fill in the blank style question
    {
      id: 'q3',
      type: 'fill-blank',
      questionText:
        'The ___ nerve innervates the muscles in the anterior compartment of the arm.',
      answers: [
        { id: 'a9', text: 'Musculocutaneous nerve', isCorrect: true },
        { id: 'a10', text: 'Radial nerve', isCorrect: false },
        { id: 'a11', text: 'Median nerve', isCorrect: false },
        { id: 'a12', text: 'Ulnar nerve', isCorrect: false },
      ],
      explanation:
        'The musculocutaneous nerve (C5-C7) innervates all muscles in the anterior compartment of the arm: biceps brachii, brachialis, and coracobrachialis.',
      points: 1,
    },

    // Another multiple choice
    {
      id: 'q4',
      type: 'multiple-choice',
      questionText:
        'What is the primary action of the rotator cuff muscles?',
      answers: [
        { id: 'a13', text: 'Flexion of the shoulder', isCorrect: false },
        {
          id: 'a14',
          text: 'Stabilization of the glenohumeral joint',
          isCorrect: true,
        },
        { id: 'a15', text: 'Extension of the elbow', isCorrect: false },
        { id: 'a16', text: 'Abduction of the scapula', isCorrect: false },
      ],
      explanation:
        'The rotator cuff muscles (supraspinatus, infraspinatus, teres minor, and subscapularis) primarily stabilize the glenohumeral joint by holding the humeral head in the glenoid fossa.',
      points: 1,
    },

    // Advanced clinical question
    {
      id: 'q5',
      type: 'multiple-choice',
      questionText:
        'A patient presents with "wrist drop" following a humeral shaft fracture. Which nerve is most likely damaged?',
      answers: [
        { id: 'a17', text: 'Median nerve', isCorrect: false },
        { id: 'a18', text: 'Ulnar nerve', isCorrect: false },
        { id: 'a19', text: 'Radial nerve', isCorrect: true },
        { id: 'a20', text: 'Axillary nerve', isCorrect: false },
      ],
      explanation:
        'The radial nerve spirals around the humeral shaft in the radial groove and is vulnerable to injury in mid-shaft fractures. Damage results in wrist drop due to paralysis of wrist and finger extensors.',
      points: 2,
    },
  ];

  const handleComplete = (score: number, passed: boolean) => {
    console.log('Assessment completed!', { score, passed });
    // Here you would typically save the results to a backend or local storage
  };

  const handleRetry = () => {
    console.log('User is retrying the assessment');
    // Reset any state or reload questions
  };

  const handleExit = () => {
    setShowAssessment(false);
    console.log('User exited assessment');
  };

  if (!showAssessment) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Chapter 3: Upper Limb - Assessment
          </h1>
          <p className="text-gray-600 mb-6">
            Test your knowledge of upper limb anatomy with this comprehensive
            assessment. You need to score at least 80% to pass.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              <span>{exampleQuestions.length} questions</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              <span>Multiple choice and image identification</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              <span>80% passing score</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              <span>Immediate feedback on completion</span>
            </div>
          </div>
          <button
            onClick={() => setShowAssessment(true)}
            className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <ChapterAssessment
      chapterNumber={3}
      chapterTitle="Upper Limb Anatomy"
      questions={exampleQuestions}
      config={{
        passingScore: 80,
        randomizeQuestions: false,
        randomizeAnswers: true,
        timeLimit: 15, // 15 minutes (optional)
      }}
      onComplete={handleComplete}
      onRetry={handleRetry}
      onExit={handleExit}
    />
  );
};

/**
 * USAGE EXAMPLES:
 *
 * 1. Basic usage:
 * <ChapterAssessment
 *   chapterNumber={1}
 *   chapterTitle="Introduction to Anatomy"
 *   questions={myQuestions}
 * />
 *
 * 2. With custom configuration:
 * <ChapterAssessment
 *   chapterNumber={2}
 *   chapterTitle="Musculoskeletal System"
 *   questions={myQuestions}
 *   config={{
 *     passingScore: 85,
 *     randomizeQuestions: true,
 *     randomizeAnswers: true,
 *     timeLimit: 20,
 *     description: "Custom assessment description"
 *   }}
 * />
 *
 * 3. With callbacks:
 * <ChapterAssessment
 *   chapterNumber={3}
 *   chapterTitle="Nervous System"
 *   questions={myQuestions}
 *   onComplete={(score, passed) => {
 *     console.log(`Score: ${score}%, Passed: ${passed}`);
 *     // Save to backend, update progress, etc.
 *   }}
 *   onRetry={() => {
 *     console.log('User is retrying');
 *     // Track retry attempts, reload questions, etc.
 *   }}
 *   onExit={() => {
 *     console.log('User exited');
 *     // Navigate away, save progress, etc.
 *   }}
 * />
 *
 * 4. Creating questions:
 * const questions: Question[] = [
 *   {
 *     id: 'unique-id-1',
 *     type: 'multiple-choice',
 *     questionText: 'What is the longest bone in the body?',
 *     answers: [
 *       { id: 'a1', text: 'Femur', isCorrect: true },
 *       { id: 'a2', text: 'Humerus', isCorrect: false },
 *       { id: 'a3', text: 'Tibia', isCorrect: false },
 *       { id: 'a4', text: 'Fibula', isCorrect: false },
 *     ],
 *     explanation: 'The femur is the longest and strongest bone...',
 *     points: 1,
 *   },
 *   {
 *     id: 'unique-id-2',
 *     type: 'image-labeling',
 *     questionText: 'Identify the labeled structure',
 *     image: '/path/to/image.jpg',
 *     answers: [...],
 *   },
 *   // Add more questions...
 * ];
 */
