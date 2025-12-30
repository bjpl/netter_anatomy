import React from 'react';
import { Structure } from '../../types/anatomy';
import Badge from '../ui/Badge';

export interface SearchResultItemProps {
  structure: Structure;
  searchTerm: string;
  onClick: (structureId: string) => void;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  structure,
  searchTerm,
  onClick,
}) => {
  // Highlight matching text in the name
  const highlightMatch = (text: string, term: string): React.ReactNode => {
    if (!term.trim()) return text;

    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (regex.test(part)) {
        return (
          <mark key={index} className="bg-[#FEF3C7] text-[#92400E] font-semibold">
            {part}
          </mark>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Check if search term matches common names
  const matchingCommonName = structure.common_names.find(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      onClick={() => onClick(structure.id)}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F3F4F6] cursor-pointer transition-colors border border-transparent hover:border-[#E5E7EB]"
    >
      {/* Structure type icon/color */}
      <div className="flex-shrink-0 mt-1">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: `${getTypeColor(structure.structure_type)}20`,
          }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{ color: getTypeColor(structure.structure_type) }}>
            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Name with highlighting */}
        <h3 className="text-base font-semibold text-[#1F2937] mb-1">
          {highlightMatch(structure.canonical_name, searchTerm)}
        </h3>

        {/* Common name match if different from canonical */}
        {matchingCommonName && matchingCommonName.toLowerCase() !== structure.canonical_name.toLowerCase() && (
          <p className="text-sm text-[#6B7280] mb-1">
            Also known as: {highlightMatch(matchingCommonName, searchTerm)}
          </p>
        )}

        {/* Badges */}
        <div className="flex items-center gap-2 mb-2">
          <Badge type={structure.structure_type as any} size="sm" />

          {/* Region badge placeholder - would need region name from context */}
          <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#6B7280] text-xs rounded-full border border-[#E5E7EB]">
            {structure.region_id.substring(0, 8)}
          </span>
        </div>

        {/* Truncated description */}
        <p className="text-sm text-[#6B7280] line-clamp-2 leading-relaxed">
          {structure.definition_brief}
        </p>

        {/* Latin name if exists */}
        {structure.latin_name && (
          <p className="text-xs text-[#9CA3AF] italic mt-1">
            {structure.latin_name}
          </p>
        )}
      </div>

      {/* Arrow icon */}
      <div className="flex-shrink-0 mt-1">
        <svg className="w-5 h-5 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

// Helper function to get color for structure type
const getTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    bone: '#78716C',
    muscle: '#C45C5C',
    nerve: '#E6C744',
    artery: '#D64545',
    vein: '#4571D6',
    organ: '#7E57C2',
    ligament: '#8D9E78',
    fascia: '#B8A99A',
    other: '#9CA3AF',
  };
  return colors[type] ?? colors.other ?? '#9CA3AF';
};

export default SearchResultItem;
