import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StructureTree from '../../components/explorer/StructureTree';
import QuickInfoPanel from '../../components/explorer/QuickInfoPanel';
import { Structure } from '../../types/anatomy';

/**
 * RegionalView Component
 *
 * Main explorer page layout with three-panel design:
 * - Left panel (30%): StructureTree component
 * - Center panel (50%): AnatomyViewer 3D component (placeholder)
 * - Right panel (20%): QuickInfo panel
 *
 * Mobile: Full-screen 3D viewer with bottom sheet
 */

interface RegionalViewProps {
  /** Available structures in this region */
  structures?: Structure[];
}

const RegionalView: React.FC<RegionalViewProps> = ({
  structures = [],
}) => {
  const { regionSlug } = useParams<{ regionSlug: string }>();
  const navigate = useNavigate();

  const [selectedStructureId, setSelectedStructureId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectedStructure = structures.find(s => s.id === selectedStructureId);

  const handleStructureSelect = (structureId: string) => {
    setSelectedStructureId(structureId);
    // On mobile, close the bottom sheet when selecting
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleViewDetails = (structureId: string) => {
    navigate(`/explorer/structure/${structureId}`);
  };

  return (
    <div className="h-screen flex flex-col bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] flex-shrink-0">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/explorer')}
              className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors"
              aria-label="Back to regions"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold text-[#1F2937]">
                {regionSlug ? regionSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Region'}
              </h1>
              <p className="text-xs text-[#6B7280]">
                {structures.length} structures
              </p>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors"
            aria-label="Toggle structure list"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Structure Tree (Desktop) */}
        <aside className="hidden md:block w-[30%] border-r border-[#E5E7EB] bg-white overflow-hidden">
          <StructureTree
            structures={structures}
            selectedId={selectedStructureId}
            onSelect={handleStructureSelect}
            onDoubleClick={handleViewDetails}
          />
        </aside>

        {/* Center Panel - 3D Viewer */}
        <main className="flex-1 bg-[#F9FAFB] relative">
          {/* 3D Viewer Placeholder */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-[#E5E7EB] rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-[#6B7280] font-medium">3D Viewer</p>
              <p className="text-sm text-[#9CA3AF] mt-1">Coming soon</p>
            </div>

            {/* Viewer Controls Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <button className="p-3 bg-white border border-[#E5E7EB] rounded-lg shadow-sm hover:bg-[#F9FAFB] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
              <button className="p-3 bg-white border border-[#E5E7EB] rounded-lg shadow-sm hover:bg-[#F9FAFB] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </button>
            </div>
          </div>
        </main>

        {/* Right Panel - Quick Info (Desktop) */}
        <aside className="hidden lg:block w-[20%] border-l border-[#E5E7EB] bg-white overflow-hidden">
          <QuickInfoPanel
            structure={selectedStructure || null}
            onViewDetails={handleViewDetails}
          />
        </aside>
      </div>

      {/* Mobile Bottom Sheet */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#E5E7EB]">
              <div className="w-12 h-1 bg-[#E5E7EB] rounded-full mx-auto mb-4"></div>
              <h2 className="font-semibold text-[#1F2937]">Structures</h2>
            </div>
            <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
              <StructureTree
                structures={structures}
                selectedId={selectedStructureId}
                onSelect={handleStructureSelect}
                onDoubleClick={handleViewDetails}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionalView;
