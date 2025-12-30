import React from 'react';
import { ArrowRight, CheckCircle, Circle } from 'lucide-react';

interface ChapterCardProps {
  chapterNumber: number;
  title: string;
  coverImage: string;
  moduleCount: number;
  completedModules: number;
  totalProgress: number; // 0-100
  onSelect: () => void;
  isStarted: boolean;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapterNumber,
  title,
  coverImage,
  moduleCount,
  completedModules,
  totalProgress,
  onSelect,
  isStarted,
}) => {
  const isComplete = completedModules === moduleCount;
  const progressColor = isComplete
    ? 'text-green-600'
    : totalProgress > 0
    ? 'text-blue-600'
    : 'text-gray-400';

  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border-2 border-transparent hover:border-blue-400"
    >
      {/* Cover image with overlay */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
        <img
          src={coverImage}
          alt={`Chapter ${chapterNumber}: ${title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
            Chapter {chapterNumber}
          </div>
        </div>

        {/* Progress ring */}
        <div className="absolute top-4 right-4">
          <div className="relative w-16 h-16">
            <svg className="transform -rotate-90 w-16 h-16">
              {/* Background circle */}
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-white/30"
              />
              {/* Progress circle */}
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - totalProgress / 100)}`}
                className={progressColor}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm drop-shadow-lg">
                {Math.round(totalProgress)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Module progress */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            {isComplete ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <Circle className="w-4 h-4" />
            )}
            <span>
              {completedModules} / {moduleCount} modules
            </span>
          </div>
        </div>

        {/* Module dots */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: moduleCount }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i < completedModules
                  ? 'bg-green-500'
                  : i === completedModules
                  ? 'bg-blue-500'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* CTA button */}
        <button
          onClick={onSelect}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            isComplete
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : isStarted
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isComplete ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Review Chapter
            </>
          ) : isStarted ? (
            <>
              Continue Learning
              <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            <>
              Start Chapter
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
