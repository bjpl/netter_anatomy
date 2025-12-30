import React, { useState } from 'react';
import { Region } from '../../types/anatomy';
import ProgressBar from '../ui/ProgressBar';

/**
 * RegionCard Component
 *
 * Card component for region overview with:
 * - 3D thumbnail preview
 * - Progress indicator
 * - Hover animation
 */

interface RegionCardProps {
  /** The anatomical region */
  region: Region;
  /** Number of structures in this region */
  structureCount: number;
  /** User progress (0-1) */
  progress: number;
  /** Click handler */
  onClick: () => void;
}

const RegionCard: React.FC<RegionCardProps> = ({
  region,
  structureCount,
  progress,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div
        className={`
          bg-white border-2 rounded-lg overflow-hidden
          transition-all duration-300 ease-out
          ${isHovered ? 'border-[#2563EB] shadow-lg -translate-y-1' : 'border-[#E5E7EB] shadow-sm'}
        `}
      >
        {/* Thumbnail Preview */}
        <div className="aspect-video bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] relative overflow-hidden">
          {region.thumbnail_url ? (
            <img
              src={region.thumbnail_url}
              alt={`${region.name} preview`}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div
                className={`transition-transform duration-700 ${
                  isHovered ? 'rotate-12 scale-110' : 'rotate-0 scale-100'
                }`}
              >
                <svg className="w-16 h-16 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          )}

          {/* Progress Overlay */}
          {progress > 0 && (
            <div className="absolute top-2 right-2">
              <div className="bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-[#059669] flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {Math.round(progress * 100)}%
              </div>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-[#1F2937] mb-1 group-hover:text-[#2563EB] transition-colors">
            {region.name}
          </h3>

          <div className="flex items-center gap-3 text-sm text-[#6B7280] mb-3">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              {structureCount} structures
            </span>
            <span className="text-[#D1D5DB]">•</span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Plates {region.atlas_plate_range}
            </span>
          </div>

          {/* Progress Bar */}
          <ProgressBar
            value={progress * 100}
            showLabel={false}
            size="sm"
            className="mb-2"
          />

          <p className="text-xs text-[#9CA3AF]">
            {progress === 0 ? 'Not started' : progress === 1 ? 'Complete' : 'In progress'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegionCard;
