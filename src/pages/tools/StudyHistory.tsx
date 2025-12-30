import { Link } from 'react-router-dom';

/**
 * Study History Page
 * View learning history and analytics
 */
export default function StudyHistory() {
  return (
    <div className="space-y-6">
      <header>
        <nav className="text-sm text-gray-600 mb-4">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Study History</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900">Study History</h1>
        <p className="mt-2 text-gray-600">Track your learning progress and activity</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-800 font-medium">Study Sessions</p>
          <p className="text-3xl font-bold text-blue-900 mt-2">0</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-green-800 font-medium">Structures Learned</p>
          <p className="text-3xl font-bold text-green-900 mt-2">0</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-sm text-purple-800 font-medium">Study Streak</p>
          <p className="text-3xl font-bold text-purple-900 mt-2">0 days</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <p className="text-sm text-orange-800 font-medium">Total Time</p>
          <p className="text-3xl font-bold text-orange-900 mt-2">0h</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="text-center py-12">
          <p className="text-gray-600">No study activity yet. Start learning to see your history!</p>
        </div>
      </div>
    </div>
  );
}
