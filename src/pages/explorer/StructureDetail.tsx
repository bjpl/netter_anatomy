import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Tabs from '../../components/ui/Tabs';
import Badge from '../../components/ui/Badge';
import { Structure, Relationship, PhysicalReference, ExternalLink, StructureType } from '../../types/anatomy';

/**
 * StructureDetail Component
 *
 * Modal or full-page view (based on settings) with tabbed interface:
 * 1. Overview: Name, pronunciation, definition, mini 3D viewer
 * 2. Full Description: Expanded content with TTS button
 * 3. Relationships: Visual relationship diagram
 * 4. Clinical: Significance, pathologies
 * 5. References: Netter's Atlas, Coloring Book, Flashcards, External links
 */

interface StructureDetailProps {
  /** The structure to display */
  structure?: Structure;
  /** Related structures */
  relationships?: Relationship[];
  /** Physical references */
  physicalReferences?: PhysicalReference[];
  /** External links */
  externalLinks?: ExternalLink[];
}

const StructureDetail: React.FC<StructureDetailProps> = ({
  structure,
  relationships = [],
  physicalReferences = [],
  externalLinks = [],
}) => {
  const { structureId: _structureId } = useParams<{ structureId: string }>();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  if (!structure) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <p className="text-[#6B7280]">Loading structure details...</p>
      </div>
    );
  }

  const handlePlayPronunciation = () => {
    setIsPlaying(true);
    // TODO: Implement TTS
    setTimeout(() => setIsPlaying(false), 1000);
  };

  const handlePlayDescription = () => {
    // TODO: Implement TTS for full description
  };

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: (
        <div className="space-y-6">
          {/* Name and Pronunciation */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-[#1F2937]">
                {structure.canonical_name}
              </h2>
              <button
                onClick={handlePlayPronunciation}
                className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors"
                aria-label="Play pronunciation"
                disabled={isPlaying}
              >
                <svg className="w-5 h-5 text-[#2563EB]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-[#6B7280] mb-3">/{structure.pronunciation_ipa}/</p>
            <div className="flex flex-wrap gap-2">
              <Badge type={structure.structure_type as StructureType} />
              {structure.latin_name && (
                <span className="px-3 py-1 bg-[#F3F4F6] text-[#6B7280] text-sm rounded-full italic">
                  {structure.latin_name}
                </span>
              )}
            </div>
          </div>

          {/* Definition */}
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
            <p className="text-[#1F2937] leading-relaxed">{structure.definition_brief}</p>
          </div>

          {/* Mini 3D Viewer */}
          <div className="bg-[#F3F4F6] rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-sm text-[#6B7280]">3D Model Preview</p>
            </div>
          </div>

          {/* Key Facts */}
          {(structure.origin || structure.insertion || structure.innervation || structure.blood_supply) && (
            <div className="space-y-3">
              <h3 className="font-semibold text-[#1F2937]">Key Facts</h3>
              <dl className="space-y-2">
                {structure.origin && (
                  <div className="flex gap-3">
                    <dt className="font-medium text-[#6B7280] w-24 flex-shrink-0">Origin:</dt>
                    <dd className="text-[#1F2937]">{structure.origin}</dd>
                  </div>
                )}
                {structure.insertion && (
                  <div className="flex gap-3">
                    <dt className="font-medium text-[#6B7280] w-24 flex-shrink-0">Insertion:</dt>
                    <dd className="text-[#1F2937]">{structure.insertion}</dd>
                  </div>
                )}
                {structure.action && (
                  <div className="flex gap-3">
                    <dt className="font-medium text-[#6B7280] w-24 flex-shrink-0">Action:</dt>
                    <dd className="text-[#1F2937]">{structure.action}</dd>
                  </div>
                )}
                {structure.innervation && (
                  <div className="flex gap-3">
                    <dt className="font-medium text-[#6B7280] w-24 flex-shrink-0">Innervation:</dt>
                    <dd className="text-[#1F2937]">{structure.innervation}</dd>
                  </div>
                )}
                {structure.blood_supply && (
                  <div className="flex gap-3">
                    <dt className="font-medium text-[#6B7280] w-24 flex-shrink-0">Blood Supply:</dt>
                    <dd className="text-[#1F2937]">{structure.blood_supply}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'description',
      label: 'Full Description',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-[#1F2937]">Detailed Description</h3>
            <button
              onClick={handlePlayDescription}
              className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
              Listen
            </button>
          </div>
          <div className="prose prose-sm max-w-none text-[#1F2937] leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: structure.description_full }} />
          </div>
        </div>
      ),
    },
    {
      id: 'relationships',
      label: 'Relationships',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      badge: relationships.length,
      content: (
        <div className="space-y-4">
          {relationships.length === 0 ? (
            <p className="text-[#6B7280] text-center py-8">No relationships defined yet.</p>
          ) : (
            <div className="space-y-3">
              {relationships.map((rel) => (
                <div key={rel.id} className="border border-[#E5E7EB] rounded-lg p-4 hover:border-[#2563EB] transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-medium text-[#1F2937] mb-1">
                        {rel.relationship_type.replace(/_/g, ' ')}
                      </p>
                      <p className="text-sm text-[#6B7280]">{rel.description}</p>
                    </div>
                    <button
                      className="text-[#2563EB] hover:text-[#1D4ED8] text-sm font-medium whitespace-nowrap"
                      onClick={() => navigate(`/explorer/structure/${rel.target_structure_id}`)}
                    >
                      View →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'clinical',
      label: 'Clinical',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <h3 className="font-semibold text-[#1F2937]">Clinical Significance</h3>
          <div className="prose prose-sm max-w-none text-[#1F2937] leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: structure.clinical_significance }} />
          </div>
        </div>
      ),
    },
    {
      id: 'references',
      label: 'References',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      content: (
        <div className="space-y-6">
          {/* Physical Resources */}
          <div>
            <h3 className="font-semibold text-[#1F2937] mb-3">Physical Resources</h3>
            <div className="space-y-2">
              {physicalReferences.length === 0 ? (
                <p className="text-[#6B7280] text-sm">No physical references available.</p>
              ) : (
                physicalReferences.map((ref) => (
                  <div key={ref.id} className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-[#1F2937] text-sm">
                        {ref.resource_type === 'atlas' && '📖 Atlas'}
                        {ref.resource_type === 'coloring_book' && '🎨 Coloring Book'}
                        {ref.resource_type === 'flashcard' && '🎴 Flashcard'}
                        {' - '}{ref.title}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        {ref.primary_number}
                        {ref.page_number && ` (p. ${ref.page_number})`}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* External Links */}
          <div>
            <h3 className="font-semibold text-[#1F2937] mb-3">Digital Resources</h3>
            <div className="space-y-2">
              {externalLinks.length === 0 ? (
                <p className="text-[#6B7280] text-sm">No external links available.</p>
              ) : (
                externalLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg hover:bg-[#F3F4F6] transition-colors group"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-[#2563EB] text-sm group-hover:text-[#1D4ED8]">
                        {link.title}
                      </p>
                      {link.description && (
                        <p className="text-xs text-[#6B7280] mt-1">{link.description}</p>
                      )}
                    </div>
                    <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#1F2937] transition-colors mb-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <Tabs tabs={tabs} defaultTab="overview" />
        </div>
      </main>
    </div>
  );
};

export default StructureDetail;
