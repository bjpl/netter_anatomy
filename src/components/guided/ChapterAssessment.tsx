import React, { useState, useEffect } from 'react';
import { Clock, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { AssessmentQuestion } from './AssessmentQuestion';
import { AssessmentResults } from './AssessmentResults';

export type QuestionType = 'multiple-choice' | 'image-labeling' | 'fill-blank';

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  questionText: string;
  image?: string;
  answers: Answer[];
  explanation?: string;
  points?: number;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswerId: string | null;
  isCorrect: boolean;
  timeSpent: number; // in seconds
}

export interface AssessmentConfig {
  title: string;
  description?: string;
  passingScore: number; // percentage (default 80)
  timeLimit?: number; // in minutes (optional)
  randomizeQuestions?: boolean;
  randomizeAnswers?: boolean;
}

interface ChapterAssessmentProps {
  chapterNumber: number;
  chapterTitle: string;
  questions: Question[];
  config?: Partial<AssessmentConfig>;
  onComplete?: (score: number, passed: boolean) => void;
  onExit?: () => void;
  onRetry?: () => void;
}

export const ChapterAssessment: React.FC<ChapterAssessmentProps> = ({
  chapterNumber,
  chapterTitle,
  questions,
  config = {},
  onComplete,
  onExit,
  onRetry,
}) => {
  const assessmentConfig: AssessmentConfig = {
    title: `Chapter ${chapterNumber}: ${chapterTitle} Assessment`,
    description: 'Answer all questions to test your understanding of this chapter.',
    passingScore: 80,
    randomizeQuestions: false,
    randomizeAnswers: true,
    ...config,
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(new Date());
  const [displayQuestions, setDisplayQuestions] = useState<Question[]>([]);

  // Initialize questions (with optional randomization)
  useEffect(() => {
    const processedQuestions = assessmentConfig.randomizeQuestions
      ? [...questions].sort(() => Math.random() - 0.5)
      : questions;

    const questionsWithRandomizedAnswers = processedQuestions.map((q) => ({
      ...q,
      answers: assessmentConfig.randomizeAnswers
        ? [...q.answers].sort(() => Math.random() - 0.5)
        : q.answers,
    }));

    setDisplayQuestions(questionsWithRandomizedAnswers);
  }, [questions, assessmentConfig.randomizeQuestions, assessmentConfig.randomizeAnswers]);

  // Timer
  useEffect(() => {
    if (isCompleted) return;

    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      setElapsedTime(elapsed);

      // Check time limit
      if (assessmentConfig.timeLimit) {
        const limitInSeconds = assessmentConfig.timeLimit * 60;
        if (elapsed >= limitInSeconds) {
          handleSubmitAssessment();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isCompleted, assessmentConfig.timeLimit]);

  const currentQuestion = displayQuestions[currentQuestionIndex];
  const totalQuestions = displayQuestions.length;
  const answeredCount = userAnswers.length;

  const handleAnswerSelect = (answerId: string) => {
    const question = displayQuestions[currentQuestionIndex];
    if (!question) return;

    const selectedAnswer = question.answers.find((a) => a.id === answerId);
    const isCorrect = selectedAnswer?.isCorrect || false;

    const now = new Date();
    const timeSpent = Math.floor((now.getTime() - questionStartTime.getTime()) / 1000);

    const newAnswer: UserAnswer = {
      questionId: question.id,
      selectedAnswerId: answerId,
      isCorrect,
      timeSpent,
    };

    // Update or add answer
    const existingAnswerIndex = userAnswers.findIndex(
      (a) => a.questionId === question.id
    );

    if (existingAnswerIndex >= 0) {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[existingAnswerIndex] = newAnswer;
      setUserAnswers(updatedAnswers);
    } else {
      setUserAnswers([...userAnswers, newAnswer]);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionStartTime(new Date());
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setQuestionStartTime(new Date());
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setQuestionStartTime(new Date());
  };

  const handleSubmitAssessment = () => {
    // Calculate score
    const correctAnswers = userAnswers.filter((a) => a.isCorrect).length;
    const scorePercentage = (correctAnswers / totalQuestions) * 100;
    const passed = scorePercentage >= assessmentConfig.passingScore;

    setIsCompleted(true);
    onComplete?.(scorePercentage, passed);
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setIsCompleted(false);
    setQuestionStartTime(new Date());
    onRetry?.();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentAnswer = () => {
    return userAnswers.find((a) => a.questionId === currentQuestion?.id);
  };

  if (displayQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    const correctAnswers = userAnswers.filter((a) => a.isCorrect).length;
    const scorePercentage = (correctAnswers / totalQuestions) * 100;
    const passed = scorePercentage >= assessmentConfig.passingScore;

    return (
      <AssessmentResults
        score={scorePercentage}
        passed={passed}
        passingScore={assessmentConfig.passingScore}
        totalQuestions={totalQuestions}
        correctAnswers={correctAnswers}
        timeSpent={elapsedTime}
        questions={displayQuestions}
        userAnswers={userAnswers}
        onRetry={handleRetry}
        onExit={onExit}
      />
    );
  }

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const canSubmit = userAnswers.length === totalQuestions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {onExit && (
                <button
                  onClick={onExit}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Exit assessment"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {assessmentConfig.title}
                </h1>
                {assessmentConfig.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {assessmentConfig.description}
                  </p>
                )}
              </div>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="font-mono text-lg font-semibold text-gray-800">
                {formatTime(elapsedTime)}
              </span>
              {assessmentConfig.timeLimit && (
                <span className="text-sm text-gray-600">
                  / {assessmentConfig.timeLimit}m
                </span>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span>{answeredCount} answered</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question navigator (sidebar) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-3">Questions</h3>
              <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                {displayQuestions.map((q, index) => {
                  const answer = userAnswers.find((a) => a.questionId === q.id);
                  const isAnswered = !!answer;
                  const isCurrent = index === currentQuestionIndex;

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleJumpToQuestion(index)}
                      className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-200 ${
                        isCurrent
                          ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                          : isAnswered
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      aria-label={`Go to question ${index + 1}`}
                      aria-current={isCurrent ? 'true' : undefined}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-600 rounded" />
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 rounded" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 rounded" />
                  <span>Not answered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Question content */}
          <div className="lg:col-span-3">
            {currentQuestion && (
              <AssessmentQuestion
                question={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
                selectedAnswerId={getCurrentAnswer()?.selectedAnswerId || null}
                onAnswerSelect={handleAnswerSelect}
                showFeedback={false}
              />
            )}

            {/* Navigation buttons */}
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="flex gap-3">
                {isLastQuestion && canSubmit && (
                  <button
                    onClick={handleSubmitAssessment}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Submit Assessment
                  </button>
                )}

                {!isLastQuestion && (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    Next
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Submit warning if not all answered */}
            {isLastQuestion && !canSubmit && (
              <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  You have not answered all questions yet. Please complete all
                  questions before submitting.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
