import React from 'react';
import { Clock, Lightbulb, Target, TrendingUp } from 'lucide-react';

interface ExerciseProgressProps {
  currentStep: number;
  totalSteps: number;
  timeSpent: number; // in seconds
  hintsUsed: number;
  score?: number; // 0-100
  showScore?: boolean;
}

export const ExerciseProgress: React.FC<ExerciseProgressProps> = ({
  currentStep,
  totalSteps,
  timeSpent,
  hintsUsed,
  score = 0,
  showScore = false,
}) => {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          Exercise Progress
        </h4>
        <span className="text-sm font-medium text-gray-600">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm font-semibold text-blue-600">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="relative h-3 bg-white rounded-full overflow-hidden border-2 border-blue-200">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex justify-between mt-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${
                index <= currentStep ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all ${
                  index < currentStep
                    ? 'bg-green-500 border-green-600'
                    : index === currentStep
                    ? 'bg-blue-500 border-blue-600 ring-4 ring-blue-200'
                    : 'bg-white border-gray-300'
                }`}
              />
              <span className="text-xs text-gray-500 mt-1">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Time spent */}
        <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-gray-600" />
            <span className="text-xs font-medium text-gray-600">Time</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {formatTime(timeSpent)}
          </div>
        </div>

        {/* Hints used */}
        <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <span className="text-xs font-medium text-gray-600">Hints</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{hintsUsed}</div>
        </div>

        {/* Current step */}
        <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="text-xs font-medium text-gray-600">Step</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {currentStep + 1}/{totalSteps}
          </div>
        </div>

        {/* Score (if available) */}
        {showScore && (
          <div className={`rounded-lg p-4 border-2 ${getScoreBgColor(score)}`}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className={`w-5 h-5 ${getScoreColor(score)}`} />
              <span className="text-xs font-medium text-gray-600">Score</span>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
              {Math.round(score)}%
            </div>
          </div>
        )}
      </div>

      {/* Performance indicators */}
      <div className="mt-4 pt-4 border-t-2 border-blue-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-gray-600">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 ring-2 ring-blue-200" />
              <span className="text-gray-600">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300" />
              <span className="text-gray-600">Upcoming</span>
            </div>
          </div>

          {showScore && (
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Performance:</span>
              <span className={`font-semibold ${getScoreColor(score)}`}>
                {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Improvement'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
