import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';

interface FlashCardProps {
  front: string | React.ReactNode;
  back: string | React.ReactNode;
  frontImage?: string;
  backImage?: string;
  onFlip?: (isFlipped: boolean) => void;
  isRevealed?: boolean;
}

export const FlashCard: React.FC<FlashCardProps> = ({
  front,
  back,
  frontImage,
  backImage,
  onFlip,
  isRevealed: _isRevealed = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);
    onFlip?.(newFlipped);
  };

  const handleTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto perspective-1000">
      {/* 3:2 aspect ratio container */}
      <div className="relative w-full pb-[66.67%]">
        <div
          className={`absolute inset-0 transition-transform duration-300 preserve-3d cursor-pointer ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={handleFlip}
        >
          {/* Front of card */}
          <div className="absolute inset-0 backface-hidden">
            <div className="w-full h-full bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8 flex flex-col">
              {frontImage && (
                <div className="flex-shrink-0 mb-4">
                  <img
                    src={frontImage}
                    alt="Card front"
                    className="max-h-32 mx-auto object-contain"
                  />
                </div>
              )}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-2xl font-medium text-gray-800 text-center">
                  {front}
                </div>
              </div>
              {typeof front === 'string' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTTS(front);
                  }}
                  className="mt-4 mx-auto p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label="Pronounce term"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              )}
              <div className="mt-4 text-center text-sm text-gray-500">
                Click to reveal
              </div>
            </div>
          </div>

          {/* Back of card */}
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border-2 border-blue-200 p-8 flex flex-col">
              {backImage && (
                <div className="flex-shrink-0 mb-4">
                  <img
                    src={backImage}
                    alt="Card back"
                    className="max-h-32 mx-auto object-contain"
                  />
                </div>
              )}
              <div className="flex-1 flex items-center justify-center overflow-y-auto">
                <div className="text-xl text-gray-800 text-center">
                  {back}
                </div>
              </div>
              {typeof back === 'string' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTTS(back);
                  }}
                  className="mt-4 mx-auto p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  aria-label="Pronounce definition"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
