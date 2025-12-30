import React from 'react';
import { Structure, StructureType } from '../../types/anatomy';
import Badge from '../ui/Badge';

/**
 * QuickInfoPanel Component
 *
 * Displays quick information about selected structure:
 * - Definition
 * - Key facts
 * - "View Full Details" link
 * - Cross-reference badges
 */

interface QuickInfoPanelProps {
  /** Selected structure (null if none selected) */
  structure: Structure | null;
  /** Called when "View Details" is clicked */
  onViewDetails: (structureId: string) => void;
}

const QuickInfoPanel: React.FC<QuickInfoPanelProps> = ({
  structure,
  onViewDetails,
}) => {
  if (!structure) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm text-[#6B7280]">
          Select a structure to view quick information
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-[#E5E7EB]">
        <h3 className="font-semibold text-[#1F2937] text-sm mb-2">Quick Info</h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Structure Name */}
        <div>
          <h4 className="font-bold text-[#1F2937] mb-2 leading-tight">
            {structure.canonical_name}
          </h4>
          <Badge type={structure.structure_type as StructureType} size="sm" />
        </div>

        {/* Definition */}
        <div>
          <h5 className="text-xs font-semibold text-[#6B7280] uppercase mb-2">
            Definition
          </h5>
          <p className="text-sm text-[#1F2937] leading-relaxed">
            {structure.definition_brief}
          </p>
        </div>

        {/* Key Facts */}
        {(structure.innervation || structure.blood_supply || structure.action) && (
          <div>
            <h5 className="text-xs font-semibold text-[#6B7280] uppercase mb-2">
              Key Facts
            </h5>
            <dl className="space-y-2">
              {structure.innervation && (
                <div>
                  <dt className="text-xs font-medium text-[#9CA3AF]">Innervation:</dt>
                  <dd className="text-sm text-[#1F2937] mt-0.5">{structure.innervation}</dd>
                </div>
              )}
              {structure.blood_supply && (
                <div>
                  <dt className="text-xs font-medium text-[#9CA3AF]">Blood Supply:</dt>
                  <dd className="text-sm text-[#1F2937] mt-0.5">{structure.blood_supply}</dd>
                </div>
              )}
              {structure.action && (
                <div>
                  <dt className="text-xs font-medium text-[#9CA3AF]">Action:</dt>
                  <dd className="text-sm text-[#1F2937] mt-0.5">{structure.action}</dd>
                </div>
              )}
            </dl>
          </div>
        )}

        {/* Cross-References Badge */}
        <div className="pt-2 border-t border-[#E5E7EB]">
          <h5 className="text-xs font-semibold text-[#6B7280] uppercase mb-2">
            References
          </h5>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#FEF3C7] text-[#92400E] text-xs font-medium rounded">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              Atlas
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#DBEAFE] text-[#1E40AF] text-xs font-medium rounded">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
              Coloring
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#FCE7F3] text-[#9F1239] text-xs font-medium rounded">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              Cards
            </span>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="flex-shrink-0 p-4 border-t border-[#E5E7EB]">
        <button
          onClick={() => onViewDetails(structure.id)}
          className="w-full px-4 py-2 bg-[#2563EB] text-white text-sm font-medium rounded-lg hover:bg-[#1D4ED8] transition-colors flex items-center justify-center gap-2"
        >
          View Full Details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default QuickInfoPanel;
