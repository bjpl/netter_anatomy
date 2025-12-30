import React from 'react';
import { System } from '../../types/anatomy';

export interface SystemFilterProps {
  systems: System[];
  activeIds: string[];
  onToggle: (systemId: string) => void;
}

const SystemFilter: React.FC<SystemFilterProps> = ({
  systems,
  activeIds,
  onToggle,
}) => {
  const sortedSystems = [...systems].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="relative">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#D1D5DB] scrollbar-track-transparent">
        {/* Select All / Deselect All */}
        <button
          onClick={() => {
            // If all are selected, deselect all; otherwise select all
            const allSelected = sortedSystems.every(sys => activeIds.includes(sys.id));
            if (allSelected) {
              sortedSystems.forEach(sys => {
                if (activeIds.includes(sys.id)) {
                  onToggle(sys.id);
                }
              });
            } else {
              sortedSystems.forEach(sys => {
                if (!activeIds.includes(sys.id)) {
                  onToggle(sys.id);
                }
              });
            }
          }}
          className="flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border-2 hover:shadow-md whitespace-nowrap bg-white text-[#6B7280] border-[#D1D5DB] hover:border-[#9CA3AF]"
        >
          {sortedSystems.every(sys => activeIds.includes(sys.id)) ? (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear All
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Select All
            </span>
          )}
        </button>

        {/* System chips */}
        {sortedSystems.map((system) => {
          const isActive = activeIds.includes(system.id);

          return (
            <button
              key={system.id}
              onClick={() => onToggle(system.id)}
              className={`
                flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border-2 hover:shadow-md whitespace-nowrap
                ${isActive
                  ? 'text-white shadow-sm'
                  : 'bg-white text-[#6B7280] border-[#D1D5DB] hover:border-[#9CA3AF]'
                }
              `}
              style={isActive ? {
                backgroundColor: system.color_code,
                borderColor: system.color_code,
              } : {}}
            >
              <span className="flex items-center gap-2">
                {/* Color indicator dot (visible when inactive) */}
                {!isActive && (
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: system.color_code }}
                  />
                )}

                {/* System name */}
                <span>{system.name}</span>

                {/* Check icon (visible when active) */}
                {isActive && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Fade effect for scrolling */}
      <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  );
};

export default SystemFilter;
