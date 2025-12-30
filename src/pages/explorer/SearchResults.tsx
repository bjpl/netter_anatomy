import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { Structure, StructureType } from '../../types/anatomy';

/**
 * SearchResults Component
 *
 * Features:
 * - Search results grouped by type (Structures, Regions, Clinical)
 * - Each result: Name, type icon, region, brief snippet
 * - Highlight matching terms
 */

interface SearchResultsProps {
  /** Search results */
  results?: Structure[];
  /** Loading state */
  isLoading?: boolean;
}

interface GroupedResults {
  structures: Structure[];
  regions: string[];
  clinical: Structure[];
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results = [],
  isLoading = false,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  // Group results by type
  const groupedResults: GroupedResults = results.reduce(
    (acc, result) => {
      // Clinical results are structures with clinical significance matching the query
      if (result.clinical_significance?.toLowerCase().includes(query.toLowerCase())) {
        acc.clinical.push(result);
      } else {
        acc.structures.push(result);
      }
      return acc;
    },
    { structures: [], regions: [], clinical: [] } as GroupedResults
  );

  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-[#FEF3C7] text-[#92400E] px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const handleResultClick = (structureId: string) => {
    navigate(`/explorer/structure/${structureId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#E5E7EB] border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B7280]">Searching...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#1F2937] transition-colors mb-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-bold text-[#1F2937]">Search Results</h1>
            <p className="text-sm text-[#6B7280]">
              {results.length} results for "{query}"
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {results.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-[#E5E7EB] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-2">No results found</h2>
            <p className="text-[#6B7280]">
              Try adjusting your search terms or browse by region
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Structures Section */}
            {groupedResults.structures.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Structures ({groupedResults.structures.length})
                </h2>
                <div className="space-y-3">
                  {groupedResults.structures.map((structure) => (
                    <Card
                      key={structure.id}
                      title={highlightText(structure.canonical_name, query) as any}
                      subtitle={structure.definition_brief}
                      icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      }
                      badge={<Badge type={structure.structure_type as StructureType} size="sm" />}
                      onClick={() => handleResultClick(structure.id)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Clinical Section */}
            {groupedResults.clinical.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#DC2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Clinical Relevance ({groupedResults.clinical.length})
                </h2>
                <div className="space-y-3">
                  {groupedResults.clinical.map((structure) => {
                    // Extract snippet with highlighted term
                    const clinicalText = structure.clinical_significance || '';
                    const lowerQuery = query.toLowerCase();
                    const index = clinicalText.toLowerCase().indexOf(lowerQuery);
                    const snippetStart = Math.max(0, index - 50);
                    const snippetEnd = Math.min(clinicalText.length, index + query.length + 50);
                    const snippet =
                      (snippetStart > 0 ? '...' : '') +
                      clinicalText.slice(snippetStart, snippetEnd) +
                      (snippetEnd < clinicalText.length ? '...' : '');

                    return (
                      <Card
                        key={structure.id}
                        title={structure.canonical_name}
                        subtitle={highlightText(snippet, query) as any}
                        icon={
                          <svg className="w-5 h-5 text-[#DC2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        }
                        badge={<Badge type={structure.structure_type as StructureType} size="sm" />}
                        onClick={() => handleResultClick(structure.id)}
                      />
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;
