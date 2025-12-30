import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchOverlay } from './SearchOverlay';

interface HeaderProps {
  mode: 'explorer' | 'guided';
  onMenuClick: () => void;
}

/**
 * Header - Top header component
 *
 * Features:
 * - Logo
 * - Mode title
 * - Global search bar (Cmd/Ctrl+K shortcut)
 * - Settings icon
 * - Mobile hamburger menu
 */
export function Header({ mode, onMenuClick }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const modeTitle = mode === 'explorer' ? 'Interactive Explorer' : 'Guided Learning';

  // Handle keyboard shortcut for search (Cmd/Ctrl+K)
  const handleSearchKeydown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsSearchOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 items-center border-b border-gray-200 bg-white px-4 shadow-sm">
        {/* Mobile hamburger menu */}
        <button
          onClick={onMenuClick}
          className="mr-4 rounded-md p-2 hover:bg-gray-100 lg:hidden"
          aria-label="Open menu"
        >
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
            <span className="text-xl font-bold">N</span>
          </div>
          <span className="hidden text-lg font-semibold text-gray-900 sm:block">
            Netter's Anatomy
          </span>
        </Link>

        {/* Mode title */}
        <div className="ml-6 hidden border-l border-gray-300 pl-6 md:block">
          <span className="text-sm font-medium text-gray-600">{modeTitle}</span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Global search bar */}
        <div className="relative mx-4 hidden w-full max-w-md md:block">
          <button
            onClick={() => setIsSearchOpen(true)}
            onKeyDown={handleSearchKeydown}
            className="flex w-full items-center rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-left text-sm text-gray-500 transition-colors hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <svg
              className="mr-3 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span>Search structures...</span>
            <kbd className="ml-auto hidden rounded border border-gray-300 bg-white px-2 py-0.5 text-xs font-semibold text-gray-600 lg:inline-block">
              {navigator.platform.includes('Mac') ? '⌘K' : 'Ctrl+K'}
            </kbd>
          </button>
        </div>

        {/* Mobile search button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="rounded-md p-2 hover:bg-gray-100 md:hidden"
          aria-label="Search"
        >
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {/* Settings icon */}
        <Link
          to="/settings"
          className="ml-2 rounded-md p-2 hover:bg-gray-100"
          aria-label="Settings"
        >
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </Link>
      </header>

      {/* Search overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
