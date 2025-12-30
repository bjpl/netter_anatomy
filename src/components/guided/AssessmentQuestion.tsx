import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Question } from './ChapterAssessment';

interface AssessmentQuestionProps {
  question: Question;
  questionNumber: number;
  selectedAnswerId: string | null;
  onAnswerSelect: (answerId: string) => void;
  showFeedback?: boolean;
  isReview?: boolean;
}

export const AssessmentQuestion: React.FC<AssessmentQuestionProps> = ({
  question,
  questionNumber,
  selectedAnswerId,
  onAnswerSelect,
  showFeedback = false,
  isReview = false,
}) => {
  const getAnswerStyle = (answerId: string) => {
    const isSelected = selectedAnswerId === answerId;
    const answer = question.answers.find((a) => a.id === answerId);
    const isCorrect = answer?.isCorrect || false;

    if (showFeedback || isReview) {
      if (isCorrect) {
        return 'bg-green-100 border-green-400 text-green-900 hover:bg-green-200';
      }
      if (isSelected && !isCorrect) {
        return 'bg-red-100 border-red-400 text-red-900 hover:bg-red-200';
      }
      return 'bg-gray-50 border-gray-300 text-gray-600';
    }

    if (isSelected) {
      return 'bg-blue-100 border-blue-400 text-blue-900 ring-2 ring-blue-300';
    }

    return 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400';
  };

  const getAnswerIcon = (answerId: string) => {
    if (!showFeedback && !isReview) return null;

    const answer = question.answers.find((a) => a.id === answerId);
    const isCorrect = answer?.isCorrect || false;
    const isSelected = selectedAnswerId === answerId;

    if (isCorrect) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    if (isSelected && !isCorrect) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }
    return null;
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => !isReview && onAnswerSelect(answer.id)}
                disabled={isReview}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between ${getAnswerStyle(
                  answer.id
                )} ${isReview ? 'cursor-default' : 'cursor-pointer'}`}
                aria-pressed={selectedAnswerId === answer.id}
              >
                <span className="flex-1 font-medium">{answer.text}</span>
                {getAnswerIcon(answer.id)}
              </button>
            ))}
          </div>
        );

      case 'image-labeling':
        return (
          <div className="space-y-6">
            {question.image && (
              <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                <img
                  src={question.image}
                  alt="Question image"
                  className="max-h-96 rounded-lg shadow-md object-contain"
                />
              </div>
            )}
            <div className="space-y-3">
              {question.answers.map((answer) => (
                <button
                  key={answer.id}
                  onClick={() => !isReview && onAnswerSelect(answer.id)}
                  disabled={isReview}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between ${getAnswerStyle(
                    answer.id
                  )} ${isReview ? 'cursor-default' : 'cursor-pointer'}`}
                  aria-pressed={selectedAnswerId === answer.id}
                >
                  <span className="flex-1 font-medium">{answer.text}</span>
                  {getAnswerIcon(answer.id)}
                </button>
              ))}
            </div>
          </div>
        );

      case 'fill-blank':
        return (
          <div className="space-y-3">
            {question.answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => !isReview && onAnswerSelect(answer.id)}
                disabled={isReview}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between ${getAnswerStyle(
                  answer.id
                )} ${isReview ? 'cursor-default' : 'cursor-pointer'}`}
                aria-pressed={selectedAnswerId === answer.id}
              >
                <span className="flex-1 font-medium">{answer.text}</span>
                {getAnswerIcon(answer.id)}
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const getQuestionTypeLabel = () => {
    switch (question.type) {
      case 'multiple-choice':
        return 'Multiple Choice';
      case 'image-labeling':
        return 'Image Identification';
      case 'fill-blank':
        return 'Fill in the Blank';
      default:
        return '';
    }
  };

  const getQuestionTypeColor = () => {
    switch (question.type) {
      case 'multiple-choice':
        return 'bg-blue-100 text-blue-700';
      case 'image-labeling':
        return 'bg-purple-100 text-purple-700';
      case 'fill-blank':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
      {/* Question header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
            {questionNumber}
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getQuestionTypeColor()}`}
          >
            {getQuestionTypeLabel()}
          </span>
        </div>
        {question.points && (
          <div className="text-sm font-medium text-gray-600">
            {question.points} {question.points === 1 ? 'point' : 'points'}
          </div>
        )}
      </div>

      {/* Question text */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">
          {question.questionText}
        </h3>
      </div>

      {/* Question content (answers/image) */}
      {renderQuestionContent()}

      {/* Explanation (shown after feedback) */}
      {(showFeedback || isReview) && question.explanation && (
        <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Explanation</h4>
              <p className="text-sm text-blue-800">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Feedback message */}
      {(showFeedback || isReview) && selectedAnswerId && (
        <div className="mt-4">
          {question.answers.find((a) => a.id === selectedAnswerId)?.isCorrect ? (
            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="font-semibold text-green-900">Correct!</h4>
                <p className="text-sm text-green-700">
                  You selected the right answer.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-600" />
              <div>
                <h4 className="font-semibold text-red-900">Incorrect</h4>
                <p className="text-sm text-red-700">
                  The correct answer is highlighted in green above.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      {!showFeedback && !isReview && (
        <div className="mt-6 text-sm text-gray-500 text-center">
          Select one answer to continue
        </div>
      )}
    </div>
  );
};
