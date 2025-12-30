import { Link } from 'react-router-dom';

/**
 * Settings Page
 * Application settings and preferences
 */
export default function Settings() {
  return (
    <div className="space-y-6">
      <header>
        <nav className="text-sm text-gray-600 mb-4">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Settings</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your preferences and application settings</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Display</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Light</option>
                <option>Dark</option>
                <option>Auto</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Learning</h2>
          <div className="space-y-4">
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600 mr-2" />
                <span className="text-sm text-gray-700">Show Latin terminology</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600 mr-2" />
                <span className="text-sm text-gray-700">Enable spaced repetition</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Data</h2>
          <div className="space-y-4">
            <button className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
              Export Study Data
            </button>
            <button className="w-full px-4 py-2 text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors">
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
