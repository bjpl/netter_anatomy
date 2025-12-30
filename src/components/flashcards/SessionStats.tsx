import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle, Flame, TrendingUp } from 'lucide-react';

interface SessionStatsProps {
  cardsReviewed: number;
  totalCards: number;
  startTime: Date;
  streak: number;
  accuracy?: number;
}

export const SessionStats: React.FC<SessionStatsProps> = ({
  cardsReviewed,
  totalCards,
  startTime,
  streak,
  accuracy = 0,
}) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      setElapsed(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (cardsReviewed / totalCards) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress: {cardsReviewed} / {totalCards}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Cards reviewed */}
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <CheckCircle className="w-8 h-8 text-blue-600" />
          <div>
            <div className="text-2xl font-bold text-blue-900">
              {cardsReviewed}
            </div>
            <div className="text-xs text-blue-700">Cards Reviewed</div>
          </div>
        </div>

        {/* Time elapsed */}
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
          <Clock className="w-8 h-8 text-green-600" />
          <div>
            <div className="text-2xl font-bold text-green-900">
              {formatTime(elapsed)}
            </div>
            <div className="text-xs text-green-700">Time Elapsed</div>
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
          <Flame className="w-8 h-8 text-orange-600" />
          <div>
            <div className="text-2xl font-bold text-orange-900">{streak}</div>
            <div className="text-xs text-orange-700">Day Streak</div>
          </div>
        </div>

        {/* Accuracy */}
        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
          <TrendingUp className="w-8 h-8 text-purple-600" />
          <div>
            <div className="text-2xl font-bold text-purple-900">
              {Math.round(accuracy)}%
            </div>
            <div className="text-xs text-purple-700">Accuracy</div>
          </div>
        </div>
      </div>

      {/* Streak milestone */}
      {streak > 0 && streak % 7 === 0 && (
        <div className="mt-4 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-lg flex items-center gap-3">
          <Flame className="w-6 h-6 text-orange-600 animate-pulse" />
          <div>
            <div className="font-semibold text-orange-900">
              {streak} Day Milestone! 🎉
            </div>
            <div className="text-sm text-orange-700">
              Keep up the great work!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
