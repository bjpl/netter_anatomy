import { Link } from 'react-router-dom';

/**
 * Flashcard Deck Manager Page
 * Create and manage flashcard decks for studying
 */
export default function FlashcardDeckManager() {
  return (
    <div className="space-y-6">
      <header>
        <nav className="text-sm text-gray-600 mb-4">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Flashcards</span>
        </nav>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Flashcard Decks</h1>
            <p className="mt-2 text-gray-600">Create and study custom flashcard decks</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Create New Deck
          </button>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">No flashcard decks yet</h2>
          <p className="text-gray-600 mb-6">
            Create your first deck to start studying with flashcards
          </p>
        </div>
      </div>
    </div>
  );
}
