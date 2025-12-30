import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlashCard } from '../../components/flashcards/FlashCard';
import { RatingButtons, Rating } from '../../components/flashcards/RatingButtons';
import { SessionStats } from '../../components/flashcards/SessionStats';
import { ArrowLeft, Award } from 'lucide-react';

interface Card {
  id: string;
  front: string;
  back: string;
  frontImage?: string;
  backImage?: string;
}

const SpacedRepetitionQueue: React.FC = () => {
  const navigate = useNavigate();
  const [sessionStartTime] = useState(new Date());
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [cardsReviewed, setCardsReviewed] = useState(0);
  const [streak, _setStreak] = useState(12); // From user profile
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  // Mock data - replace with actual spaced repetition queue
  const [cards] = useState<Card[]>([
    {
      id: 'card1',
      front: 'Foramen Magnum',
      back: 'Large opening in the occipital bone where the spinal cord passes from the brain stem into the vertebral canal.',
      frontImage: '/images/cards/foramen-magnum-front.jpg',
      backImage: '/images/cards/foramen-magnum-back.jpg',
    },
    {
      id: 'card2',
      front: 'Dens (Odontoid Process)',
      back: 'Superior projection from the body of C2 (axis) that articulates with the atlas (C1) to allow rotation of the head.',
    },
    {
      id: 'card3',
      front: 'Cauda Equina',
      back: 'Bundle of spinal nerve roots that descend from the conus medullaris, resembling a horse\'s tail. Located in the lumbar cistern.',
    },
    {
      id: 'card4',
      front: 'Intervertebral Foramen',
      back: 'Opening between adjacent vertebrae through which spinal nerves exit the vertebral canal.',
    },
    {
      id: 'card5',
      front: 'Nucleus Pulposus',
      back: 'Gel-like center of an intervertebral disc that acts as a shock absorber. Can herniate and compress spinal nerves.',
    },
  ]);

  const currentCard = cards[currentCardIndex] as Card | undefined;
  const totalCards = cards.length;
  const accuracy =
    ratings.length > 0
      ? (ratings.filter((r) => r === 'good' || r === 'easy').length /
          ratings.length) *
        100
      : 0;

  const handleCardFlip = (flipped: boolean) => {
    if (flipped && !isRevealed) {
      setIsRevealed(true);
    }
  };

  const handleRating = (rating: Rating) => {
    setRatings([...ratings, rating]);
    setCardsReviewed(cardsReviewed + 1);

    if (currentCardIndex < cards.length - 1) {
      // Move to next card
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex + 1);
        setIsRevealed(false);
      }, 300);
    } else {
      // Session complete
      setIsSessionComplete(true);
    }
  };

  // Keyboard shortcuts for rating
  useEffect(() => {
    if (!isRevealed) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case '1':
          handleRating('again');
          break;
        case '2':
          handleRating('hard');
          break;
        case '3':
          handleRating('good');
          break;
        case '4':
          handleRating('easy');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRevealed, currentCardIndex]);

  if (isSessionComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center">
            <div className="mb-6">
              <Award className="w-20 h-20 text-yellow-500 mx-auto mb-4 animate-bounce" />
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Session Complete! 🎉
              </h1>
              <p className="text-lg text-gray-600">
                Great work on completing your review session
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-900 mb-1">
                  {cardsReviewed}
                </div>
                <div className="text-sm text-blue-700">Cards Reviewed</div>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-900 mb-1">
                  {Math.round(accuracy)}%
                </div>
                <div className="text-sm text-green-700">Accuracy</div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/guided')}
                className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                Continue Learning
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
              >
                Start New Session
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate('/guided')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Guided Learning</span>
        </button>

        {/* Session stats */}
        <SessionStats
          cardsReviewed={cardsReviewed}
          totalCards={totalCards}
          startTime={sessionStartTime}
          streak={streak}
          accuracy={accuracy}
        />

        {/* Flashcard */}
        <div className="mb-8">
          {currentCard && (
            <FlashCard
              front={currentCard.front}
              back={currentCard.back}
              frontImage={currentCard.frontImage}
              backImage={currentCard.backImage}
              onFlip={handleCardFlip}
              isRevealed={isRevealed}
            />
          )}
        </div>

        {/* Rating buttons */}
        <RatingButtons onRate={handleRating} isVisible={isRevealed} />

        {/* Instructions */}
        {!isRevealed && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Click the card to reveal the answer
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpacedRepetitionQueue;
