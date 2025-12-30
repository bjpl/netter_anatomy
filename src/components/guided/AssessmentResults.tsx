import React, { useState } from 'react';
import {
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Target,
} from 'lucide-react';
import { Question, UserAnswer } from './ChapterAssessment';
import { AssessmentQuestion } from './AssessmentQuestion';

interface AssessmentResultsProps {
  score: number;
  passed: boolean;
  passingScore: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number; // in seconds
  questions: Question[];
  userAnswers: UserAnswer[];
  onRetry?: () => void;
  onExit?: () => void;
  onContinue?: () => void;
}

export const AssessmentResults: React.FC<AssessmentResultsProps> = ({
  score,
  passed,
  passingScore,
  totalQuestions,
  correctAnswers,
  timeSpent,
  questions,
  userAnswers,
  onRetry,
  onExit,
  onContinue,
}) => {
  const [showReview, setShowReview] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(
    new Set()
  );

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const incorrectAnswers = totalQuestions - correctAnswers;
  const skippedAnswers = totalQuestions - userAnswers.length;
  const averageTimePerQuestion = Math.round(timeSpent / totalQuestions);

  const toggleQuestionExpanded = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const getScoreColor = () => {
    if (score >= 90) return 'text-green-600';
    if (score >= passingScore) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGrade = () => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  const getPerformanceMessage = () => {
    if (score >= 95) return 'Outstanding! Perfect mastery of the material.';
    if (score >= 90) return 'Excellent work! You have a strong understanding.';
    if (score >= passingScore)
      return 'Good job! You passed the assessment.';
    if (score >= 60)
      return 'You\'re close! Review the material and try again.';
    return 'Keep studying. Review the chapter and retake the assessment.';
  };

  if (!showReview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Results card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header with pass/fail indicator */}
            <div
              className={`px-8 py-12 text-center ${
                passed
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                  : 'bg-gradient-to-br from-red-500 to-rose-600'
              }`}
            >
              <div className="flex justify-center mb-4">
                {passed ? (
                  <Trophy className="w-20 h-20 text-white animate-bounce" />
                ) : (
                  <Target className="w-20 h-20 text-white" />
                )}
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {passed ? 'Congratulations!' : 'Not Quite There'}
              </h1>
              <p className="text-xl text-white/90">
                {passed
                  ? `You passed with ${Math.round(score)}%`
                  : `You scored ${Math.round(score)}% (${passingScore}% needed to pass)`}
              </p>
            </div>

            {/* Score display */}
            <div className="px-8 py-8">
              <div className="text-center mb-8">
                <div className={`text-8xl font-bold mb-2 ${getScoreColor()}`}>
                  {Math.round(score)}%
                </div>
                <div className="text-3xl font-semibold text-gray-600 mb-2">
                  Grade: {getScoreGrade()}
                </div>
                <p className="text-lg text-gray-600">
                  {getPerformanceMessage()}
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {/* Correct answers */}
                <div className="bg-green-50 rounded-lg p-4 text-center border-2 border-green-200">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-green-900">
                    {correctAnswers}
                  </div>
                  <div className="text-sm text-green-700">Correct</div>
                </div>

                {/* Incorrect answers */}
                <div className="bg-red-50 rounded-lg p-4 text-center border-2 border-red-200">
                  <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-red-900">
                    {incorrectAnswers}
                  </div>
                  <div className="text-sm text-red-700">Incorrect</div>
                </div>

                {/* Time spent */}
                <div className="bg-blue-50 rounded-lg p-4 text-center border-2 border-blue-200">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-blue-900">
                    {formatTime(timeSpent)}
                  </div>
                  <div className="text-sm text-blue-700">Total Time</div>
                </div>

                {/* Average time */}
                <div className="bg-purple-50 rounded-lg p-4 text-center border-2 border-purple-200">
                  <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-purple-900">
                    {averageTimePerQuestion}s
                  </div>
                  <div className="text-sm text-purple-700">Avg/Question</div>
                </div>
              </div>

              {/* Progress breakdown */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Question Breakdown
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {correctAnswers} / {totalQuestions}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden flex">
                  <div
                    className="bg-green-500 h-full"
                    style={{
                      width: `${(correctAnswers / totalQuestions) * 100}%`,
                    }}
                    title={`${correctAnswers} correct`}
                  />
                  <div
                    className="bg-red-500 h-full"
                    style={{
                      width: `${(incorrectAnswers / totalQuestions) * 100}%`,
                    }}
                    title={`${incorrectAnswers} incorrect`}
                  />
                  {skippedAnswers > 0 && (
                    <div
                      className="bg-gray-400 h-full"
                      style={{
                        width: `${(skippedAnswers / totalQuestions) * 100}%`,
                      }}
                      title={`${skippedAnswers} skipped`}
                    />
                  )}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded" />
                    Correct
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded" />
                    Incorrect
                  </span>
                  {skippedAnswers > 0 && (
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-gray-400 rounded" />
                      Skipped
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {incorrectAnswers > 0 && (
                  <button
                    onClick={() => setShowReview(true)}
                    className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Review Incorrect Answers
                  </button>
                )}

                {!passed && onRetry && (
                  <button
                    onClick={onRetry}
                    className="flex-1 px-6 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Retry Assessment
                  </button>
                )}

                {passed && onContinue && (
                  <button
                    onClick={onContinue}
                    className="flex-1 px-6 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Continue to Next Chapter
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}

                {onExit && (
                  <button
                    onClick={onExit}
                    className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Exit
                  </button>
                )}
              </div>

              {/* Retry hint for failed assessment */}
              {!passed && (
                <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-900">
                    <strong>Tip:</strong> Review the chapter content and pay
                    special attention to the topics you missed. You can retake
                    the assessment when you're ready.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Review mode - show all questions with answers
  const incorrectQuestions = questions.filter((q) => {
    const answer = userAnswers.find((a) => a.questionId === q.id);
    return answer && !answer.isCorrect;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Review header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Review Incorrect Answers
              </h2>
              <p className="text-gray-600">
                {incorrectQuestions.length} question
                {incorrectQuestions.length !== 1 ? 's' : ''} to review
              </p>
            </div>
            <button
              onClick={() => setShowReview(false)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Back to Results
            </button>
          </div>
        </div>

        {/* Question review list */}
        <div className="space-y-4">
          {incorrectQuestions.map((question, index) => {
            const userAnswer = userAnswers.find(
              (a) => a.questionId === question.id
            );
            const isExpanded = expandedQuestions.has(question.id);
            const questionNumber =
              questions.findIndex((q) => q.id === question.id) + 1;

            return (
              <div
                key={question.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {/* Question summary */}
                <button
                  onClick={() => toggleQuestionExpanded(question.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-100 text-red-700 rounded-lg flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-sm text-gray-500">
                        Q{questionNumber}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 line-clamp-2">
                      {question.questionText}
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {/* Expanded question details */}
                {isExpanded && (
                  <div className="px-6 pb-6">
                    <AssessmentQuestion
                      question={question}
                      questionNumber={questionNumber}
                      selectedAnswerId={userAnswer?.selectedAnswerId || null}
                      onAnswerSelect={() => {}}
                      showFeedback={true}
                      isReview={true}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Back to results button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowReview(false)}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            Back to Results
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
