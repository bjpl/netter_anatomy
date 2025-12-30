import React from 'react';
import { XCircle, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';

export type Rating = 'again' | 'hard' | 'good' | 'easy';

interface RatingButtonsProps {
  onRate: (rating: Rating) => void;
  isVisible: boolean;
}

export const RatingButtons: React.FC<RatingButtonsProps> = ({
  onRate,
  isVisible,
}) => {
  if (!isVisible) return null;

  const buttons = [
    {
      rating: 'again' as Rating,
      label: 'Again',
      icon: XCircle,
      color: 'bg-red-500 hover:bg-red-600 text-white',
      description: '<1 min',
    },
    {
      rating: 'hard' as Rating,
      label: 'Hard',
      icon: AlertCircle,
      color: 'bg-orange-500 hover:bg-orange-600 text-white',
      description: '<6 min',
    },
    {
      rating: 'good' as Rating,
      label: 'Good',
      icon: CheckCircle,
      color: 'bg-green-500 hover:bg-green-600 text-white',
      description: '<10 min',
    },
    {
      rating: 'easy' as Rating,
      label: 'Easy',
      icon: Sparkles,
      color: 'bg-blue-500 hover:bg-blue-600 text-white',
      description: '4 days',
    },
  ];

  return (
    <div className="mt-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch">
        {buttons.map(({ rating, label, icon: Icon, color, description }) => (
          <button
            key={rating}
            onClick={() => onRate(rating)}
            className={`${color} px-6 py-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 flex flex-col items-center gap-2 min-w-[120px]`}
          >
            <Icon className="w-6 h-6" />
            <span className="font-semibold text-lg">{label}</span>
            <span className="text-xs opacity-90">{description}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        <kbd className="px-2 py-1 bg-gray-100 rounded border">1</kbd>
        <kbd className="ml-2 px-2 py-1 bg-gray-100 rounded border">2</kbd>
        <kbd className="ml-2 px-2 py-1 bg-gray-100 rounded border">3</kbd>
        <kbd className="ml-2 px-2 py-1 bg-gray-100 rounded border">4</kbd>
        <span className="ml-2">or click to rate</span>
      </div>

    </div>
  );
};
