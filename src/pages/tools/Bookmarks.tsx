import { Link } from 'react-router-dom';

/**
 * Bookmarks Page
 * View and manage bookmarked anatomical structures
 */
export default function Bookmarks() {
  return (
    <div className="space-y-6">
      <header>
        <nav className="text-sm text-gray-600 mb-4">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Bookmarks</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900">Bookmarked Structures</h1>
        <p className="mt-2 text-gray-600">Quick access to your saved anatomical structures</p>
      </header>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">No bookmarks yet</h2>
          <p className="text-gray-600 mb-6">
            Bookmark structures while exploring to save them for quick access
          </p>
          <Link
            to="/explorer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Start Exploring
          </Link>
        </div>
      </div>
    </div>
  );
}
