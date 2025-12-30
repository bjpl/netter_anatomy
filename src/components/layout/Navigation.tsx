import { Link, useLocation } from 'react-router-dom';

/**
 * Navigation Component
 * Main application navigation bar
 */
export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const navLinkClass = (path: string) => {
    const baseClass = 'px-3 py-2 rounded-md text-sm font-medium transition-colors';
    return isActive(path)
      ? `${baseClass} bg-blue-700 text-white`
      : `${baseClass} text-blue-100 hover:bg-blue-600 hover:text-white`;
  };

  return (
    <nav className="bg-blue-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-white text-xl font-bold">
              Netter's Anatomy
            </Link>
            <div className="flex space-x-4">
              <Link to="/explorer" className={navLinkClass('/explorer')}>
                Explorer
              </Link>
              <Link to="/learn" className={navLinkClass('/learn')}>
                Guided Learning
              </Link>
              <Link to="/tools/flashcards" className={navLinkClass('/tools')}>
                Study Tools
              </Link>
            </div>
          </div>
          <div>
            <Link to="/settings" className={navLinkClass('/settings')}>
              Settings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
