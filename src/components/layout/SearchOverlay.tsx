import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  name: string;
  type: 'structure' | 'region' | 'clinical';
  region: string;
  snippet?: string;
  icon: string;
}

/**
 * SearchOverlay - Global search modal
 *
 * Features:
 * - Keyboard shortcut: Cmd/Ctrl+K
 * - Autocomplete suggestions
 * - Recent searches
 * - Grouped results (Structures, Regions, Clinical Terms)
 * - Escape to close
 */
export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Mock search function (replace with actual search implementation)
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    // Mock results - replace with actual search logic
    const mockResults: SearchResult[] = ([
      {
        id: '1',
        name: 'Biceps Brachii',
        type: 'structure' as const,
        region: 'Upper Limb',
        snippet: 'Two-headed muscle of the anterior arm',
        icon: '💪',
      },
      {
        id: '2',
        name: 'Brachialis',
        type: 'structure' as const,
        region: 'Upper Limb',
        snippet: 'Deep muscle of the arm',
        icon: '💪',
      },
      {
        id: '3',
        name: 'Carpal Tunnel',
        type: 'clinical' as const,
        region: 'Upper Limb',
        snippet: 'Passageway for median nerve and flexor tendons',
        icon: '🏥',
      },
    ] as const).filter((result) =>
      result.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(mockResults);
  };

  // Handle search input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    performSearch(value);
  };

  // Handle result selection
  const handleResultClick = (result: SearchResult) => {
    // Save to recent searches
    const updated = [result.name, ...recentSearches.filter((s) => s !== result.name)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));

    // Navigate to result
    if (result.type === 'structure') {
      navigate(`/explorer/structure/${result.id}`);
    } else if (result.type === 'region') {
      navigate(`/explorer/region/${result.id}`);
    }

    // Close overlay
    onClose();
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          // Open handled by parent
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Load recent searches
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Group results by type
  const groupedResults = {
    structures: results.filter((r) => r.type === 'structure'),
    regions: results.filter((r) => r.type === 'region'),
    clinical: results.filter((r) => r.type === 'clinical'),
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-start justify-center p-4 pt-16 sm:pt-24">
        <div className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-hard">
          {/* Search input */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center">
              <svg
                className="h-6 w-6 text-gray-400"
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
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search structures, regions, or clinical terms..."
                className="ml-3 flex-1 bg-transparent text-lg outline-none placeholder:text-gray-400"
              />
              <kbd className="hidden rounded border border-gray-300 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600 sm:inline-block">
                ESC
              </kbd>
            </div>
          </div>

          {/* Results or recent searches */}
          <div className="max-h-96 overflow-y-auto p-2">
            {query.trim() === '' ? (
              // Recent searches
              recentSearches.length > 0 ? (
                <div>
                  <div className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                    Recent Searches
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(search)}
                      className="flex w-full items-center rounded-md px-3 py-2 text-left hover:bg-gray-100"
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">{search}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-sm text-gray-500">
                  Start typing to search...
                </div>
              )
            ) : results.length === 0 ? (
              <div className="py-12 text-center text-sm text-gray-500">
                No results found for "{query}"
              </div>
            ) : (
              <div className="space-y-4">
                {/* Structures */}
                {groupedResults.structures.length > 0 && (
                  <div>
                    <div className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                      Structures
                    </div>
                    {groupedResults.structures.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="flex w-full items-start rounded-md px-3 py-2 text-left hover:bg-gray-100"
                      >
                        <span className="mr-3 text-xl">{result.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{result.name}</div>
                          <div className="text-xs text-gray-500">{result.region}</div>
                          {result.snippet && (
                            <div className="mt-1 text-sm text-gray-600">{result.snippet}</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Regions */}
                {groupedResults.regions.length > 0 && (
                  <div>
                    <div className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                      Regions
                    </div>
                    {groupedResults.regions.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="flex w-full items-start rounded-md px-3 py-2 text-left hover:bg-gray-100"
                      >
                        <span className="mr-3 text-xl">{result.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{result.name}</div>
                          {result.snippet && (
                            <div className="mt-1 text-sm text-gray-600">{result.snippet}</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Clinical Terms */}
                {groupedResults.clinical.length > 0 && (
                  <div>
                    <div className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                      Clinical Terms
                    </div>
                    {groupedResults.clinical.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="flex w-full items-start rounded-md px-3 py-2 text-left hover:bg-gray-100"
                      >
                        <span className="mr-3 text-xl">{result.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{result.name}</div>
                          <div className="text-xs text-gray-500">{result.region}</div>
                          {result.snippet && (
                            <div className="mt-1 text-sm text-gray-600">{result.snippet}</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <kbd className="rounded border border-gray-300 bg-white px-2 py-0.5">↑</kbd>
                  <kbd className="rounded border border-gray-300 bg-white px-2 py-0.5">↓</kbd>
                  <span>to navigate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <kbd className="rounded border border-gray-300 bg-white px-2 py-0.5">↵</kbd>
                  <span>to select</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="rounded border border-gray-300 bg-white px-2 py-0.5">ESC</kbd>
                <span>to close</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
