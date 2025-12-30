import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  mode: 'explorer' | 'guided';
  onClose: () => void;
  onToggleCollapse: () => void;
}

/**
 * Sidebar - Navigation sidebar component
 *
 * Features:
 * - Width: 280px desktop, full-width overlay mobile
 * - Collapsible to 64px icon-only mode
 * - Mode selector (Explorer / Guided Learning)
 * - Regional/Chapter navigation
 * - Study Tools section
 * - Settings link
 * - Active item highlight with left border accent
 */
export function Sidebar({
  isOpen,
  isCollapsed,
  mode,
  onClose,
  onToggleCollapse,
}: SidebarProps) {
  const location = useLocation();

  const regions = [
    { name: 'Head & Neck', slug: 'head-neck', icon: '🧠' },
    { name: 'Back & Spinal Cord', slug: 'back-spinal', icon: '🦴' },
    { name: 'Thorax', slug: 'thorax', icon: '🫀' },
    { name: 'Abdomen', slug: 'abdomen', icon: '🫁' },
    { name: 'Pelvis & Perineum', slug: 'pelvis', icon: '🦴' },
    { name: 'Upper Limb', slug: 'upper-limb', icon: '💪' },
    { name: 'Lower Limb', slug: 'lower-limb', icon: '🦵' },
  ];

  const chapters = [
    { id: 1, title: 'Head & Neck', progress: 0 },
    { id: 2, title: 'Back & Spinal Cord', progress: 0 },
    { id: 3, title: 'Thorax', progress: 0 },
    { id: 4, title: 'Abdomen', progress: 0 },
    { id: 5, title: 'Pelvis & Perineum', progress: 0 },
    { id: 6, title: 'Upper Limb', progress: 0 },
    { id: 7, title: 'Lower Limb', progress: 0 },
    { id: 8, title: 'Integration & Review', progress: 0 },
  ];

  const studyTools = [
    { name: 'Flashcards', path: '/tools/flashcards', icon: '🎴' },
    { name: 'Bookmarks', path: '/tools/bookmarks', icon: '🔖' },
    { name: 'Study History', path: '/tools/history', icon: '📊' },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <>
      {/* Sidebar container */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-30 flex flex-col bg-white shadow-medium transition-all duration-300',
          // Desktop behavior
          'lg:relative lg:translate-x-0',
          // Mobile behavior
          isOpen ? 'translate-x-0' : '-translate-x-full',
          // Width states
          isCollapsed ? 'w-16 lg:w-16' : 'w-80 lg:w-[280px]'
        )}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">Netter</span>
            </div>
          )}

          {/* Collapse toggle (desktop only) */}
          <button
            onClick={onToggleCollapse}
            className="hidden rounded-md p-2 hover:bg-gray-100 lg:block"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isCollapsed ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Sidebar content */}
        <div className="flex-1 overflow-y-auto">
          {/* Mode selector */}
          <div className="border-b border-gray-200 p-4">
            {!isCollapsed && (
              <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Mode
              </div>
            )}
            <div className="mt-2 space-y-1">
              <Link
                to="/explorer"
                className={clsx(
                  'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  mode === 'explorer'
                    ? 'border-l-4 border-primary bg-primary/5 text-primary'
                    : 'hover:bg-gray-100 text-gray-700'
                )}
                onClick={onClose}
              >
                <span className="text-xl">🔍</span>
                {!isCollapsed && <span className="ml-3">Interactive Explorer</span>}
              </Link>
              <Link
                to="/learn"
                className={clsx(
                  'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  mode === 'guided'
                    ? 'border-l-4 border-primary bg-primary/5 text-primary'
                    : 'hover:bg-gray-100 text-gray-700'
                )}
                onClick={onClose}
              >
                <span className="text-xl">📚</span>
                {!isCollapsed && <span className="ml-3">Guided Learning</span>}
              </Link>
            </div>
          </div>

          {/* Regional/Chapter navigation */}
          <div className="border-b border-gray-200 p-4">
            {!isCollapsed && (
              <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
                {mode === 'explorer' ? 'Regions' : 'Chapters'}
              </div>
            )}
            <div className="mt-2 space-y-1">
              {mode === 'explorer'
                ? regions.map((region) => (
                    <Link
                      key={region.slug}
                      to={`/explorer/region/${region.slug}`}
                      className={clsx(
                        'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        isActive(`/explorer/region/${region.slug}`)
                          ? 'border-l-4 border-primary bg-primary/5 text-primary'
                          : 'hover:bg-gray-100 text-gray-700'
                      )}
                      onClick={onClose}
                    >
                      <span className="text-xl">{region.icon}</span>
                      {!isCollapsed && <span className="ml-3">{region.name}</span>}
                    </Link>
                  ))
                : chapters.map((chapter) => (
                    <Link
                      key={chapter.id}
                      to={`/learn/chapter/${chapter.id}`}
                      className={clsx(
                        'flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        isActive(`/learn/chapter/${chapter.id}`)
                          ? 'border-l-4 border-primary bg-primary/5 text-primary'
                          : 'hover:bg-gray-100 text-gray-700'
                      )}
                      onClick={onClose}
                    >
                      <div className="flex items-center">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
                          {chapter.id}
                        </span>
                        {!isCollapsed && <span className="ml-3">{chapter.title}</span>}
                      </div>
                      {!isCollapsed && chapter.progress > 0 && (
                        <span className="text-xs text-gray-500">{chapter.progress}%</span>
                      )}
                    </Link>
                  ))}
            </div>
          </div>

          {/* Study Tools section */}
          <div className="border-b border-gray-200 p-4">
            {!isCollapsed && (
              <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Study Tools
              </div>
            )}
            <div className="mt-2 space-y-1">
              {studyTools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className={clsx(
                    'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive(tool.path)
                      ? 'border-l-4 border-primary bg-primary/5 text-primary'
                      : 'hover:bg-gray-100 text-gray-700'
                  )}
                  onClick={onClose}
                >
                  <span className="text-xl">{tool.icon}</span>
                  {!isCollapsed && <span className="ml-3">{tool.name}</span>}
                </Link>
              ))}
            </div>
          </div>

          {/* Settings link */}
          <div className="p-4">
            <Link
              to="/settings"
              className={clsx(
                'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive('/settings')
                  ? 'border-l-4 border-primary bg-primary/5 text-primary'
                  : 'hover:bg-gray-100 text-gray-700'
              )}
              onClick={onClose}
            >
              <span className="text-xl">⚙️</span>
              {!isCollapsed && <span className="ml-3">Settings</span>}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
