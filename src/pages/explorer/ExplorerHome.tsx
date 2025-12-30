import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegionCard from '../../components/explorer/RegionCard';
import { Region } from '../../types/anatomy';

/**
 * ExplorerHome Component
 *
 * Regional overview screen with body region cards.
 * Features:
 * - Responsive grid (2-4 columns based on viewport)
 * - Each card shows: region name, structure count, plate range, progress indicator
 * - Navigate to regional view on click
 */

interface ExplorerHomeProps {
  /** Available anatomical regions */
  regions?: Region[];
  /** Structure count per region */
  structureCounts?: Record<string, number>;
  /** User progress per region (0-1) */
  progress?: Record<string, number>;
}

const ExplorerHome: React.FC<ExplorerHomeProps> = ({
  regions = [],
  structureCounts = {},
  progress = {},
}) => {
  const navigate = useNavigate();

  const handleRegionClick = (regionSlug: string) => {
    navigate(`/explorer/region/${regionSlug}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#1F2937]">
                Interactive Explorer
              </h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Explore anatomy by region with interactive 3D models
              </p>
            </div>

            {/* Search will be added in future */}
            <div className="flex items-center gap-4">
              <button
                className="px-4 py-2 text-sm font-medium text-[#6B7280] hover:text-[#1F2937] transition-colors"
                aria-label="Search structures"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Region Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {regions.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-[#6B7280]">Loading regions...</p>
            </div>
          ) : (
            regions.map((region) => (
              <RegionCard
                key={region.id}
                region={region}
                structureCount={structureCounts[region.id] || 0}
                progress={progress[region.id] || 0}
                onClick={() => handleRegionClick(region.slug)}
              />
            ))
          )}
        </div>

        {/* Help Text */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#6B7280]">
            Select a region to explore anatomical structures in 3D
          </p>
        </div>
      </main>
    </div>
  );
};

export default ExplorerHome;
