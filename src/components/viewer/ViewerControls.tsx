/**
 * ViewerControls - Overlay controls for 3D viewer
 * Provides camera controls, view presets, filters, and fullscreen toggle
 */

import { useState } from 'react';
import type { UUID } from '@/types';
import { CameraPresets } from '@/lib/three/controls';

/**
 * View preset option
 */
export type ViewPreset = keyof typeof CameraPresets;

/**
 * Props for ViewerControls component
 */
export interface ViewerControlsProps {
  /** Whether labels are visible */
  labelsVisible: boolean;
  /** Toggle labels visibility */
  onToggleLabels: () => void;
  /** Reset camera to default view */
  onResetCamera: () => void;
  /** Set camera to a preset view */
  onSetView: (view: ViewPreset) => void;
  /** Zoom in */
  onZoomIn: () => void;
  /** Zoom out */
  onZoomOut: () => void;
  /** Fit view to all structures */
  onFitView: () => void;
  /** Available systems for filtering */
  systems?: Array<{ id: UUID; name: string; color_code: string }>;
  /** Currently visible system IDs */
  visibleSystems?: UUID[];
  /** Toggle system visibility */
  onToggleSystem?: (systemId: UUID) => void;
  /** Whether grid is visible */
  gridVisible: boolean;
  /** Toggle grid visibility */
  onToggleGrid: () => void;
  /** Whether in fullscreen mode */
  isFullscreen?: boolean;
  /** Toggle fullscreen */
  onToggleFullscreen?: () => void;
}

/**
 * Overlay controls for the 3D viewer
 *
 * Provides UI controls for camera manipulation, view presets,
 * system filtering, and display options.
 *
 * @example
 * ```tsx
 * <ViewerControls
 *   labelsVisible={labelsVisible}
 *   onToggleLabels={toggleLabels}
 *   onResetCamera={resetCamera}
 *   onSetView={setView}
 *   systems={systems}
 *   visibleSystems={visibleSystems}
 *   onToggleSystem={toggleSystem}
 * />
 * ```
 */
export function ViewerControls({
  labelsVisible,
  onToggleLabels,
  onResetCamera,
  onSetView,
  onZoomIn,
  onZoomOut,
  onFitView,
  systems = [],
  visibleSystems = [],
  onToggleSystem,
  gridVisible,
  onToggleGrid,
  isFullscreen = false,
  onToggleFullscreen,
}: ViewerControlsProps) {
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [showSystemsMenu, setShowSystemsMenu] = useState(false);

  const viewPresets: Array<{ value: ViewPreset; label: string }> = [
    { value: 'anterior', label: 'Anterior (Front)' },
    { value: 'posterior', label: 'Posterior (Back)' },
    { value: 'lateralRight', label: 'Right Lateral' },
    { value: 'lateralLeft', label: 'Left Lateral' },
    { value: 'superior', label: 'Superior (Top)' },
    { value: 'inferior', label: 'Inferior (Bottom)' },
    { value: 'isometric', label: 'Isometric' },
  ];

  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
      {/* Top control panel */}
      <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col gap-2">
        {/* Camera controls */}
        <div className="flex gap-1">
          <button
            onClick={onResetCamera}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors"
            title="Reset camera"
          >
            Reset
          </button>
          <button
            onClick={onFitView}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors"
            title="Fit view"
          >
            Fit
          </button>
        </div>

        {/* Zoom controls */}
        <div className="flex gap-1">
          <button
            onClick={onZoomIn}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors"
            title="Zoom in"
          >
            +
          </button>
          <button
            onClick={onZoomOut}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors"
            title="Zoom out"
          >
            −
          </button>
        </div>

        {/* View preset dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowViewMenu(!showViewMenu)}
            className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors text-left"
          >
            Views ▾
          </button>
          {showViewMenu && (
            <div className="absolute top-full mt-1 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[160px]">
              {viewPresets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => {
                    onSetView(preset.value);
                    setShowViewMenu(false);
                  }}
                  className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <hr className="border-gray-200" />

        {/* Display toggles */}
        <button
          onClick={onToggleLabels}
          className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
            labelsVisible
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
          title="Toggle labels"
        >
          Labels {labelsVisible ? 'On' : 'Off'}
        </button>

        <button
          onClick={onToggleGrid}
          className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
            gridVisible
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
          title="Toggle grid"
        >
          Grid {gridVisible ? 'On' : 'Off'}
        </button>

        {/* System filters */}
        {systems.length > 0 && onToggleSystem && (
          <>
            <hr className="border-gray-200" />
            <div className="relative">
              <button
                onClick={() => setShowSystemsMenu(!showSystemsMenu)}
                className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors text-left"
              >
                Systems ({visibleSystems.length}/{systems.length}) ▾
              </button>
              {showSystemsMenu && (
                <div className="absolute top-full mt-1 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[200px] max-h-[300px] overflow-y-auto">
                  {systems.map((system) => {
                    const isVisible = visibleSystems.includes(system.id);
                    return (
                      <button
                        key={system.id}
                        onClick={() => onToggleSystem(system.id)}
                        className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors flex items-center gap-2"
                      >
                        <div
                          className="w-4 h-4 rounded border border-gray-300"
                          style={{
                            backgroundColor: isVisible ? system.color_code : 'transparent',
                          }}
                        />
                        <span className={isVisible ? 'font-medium' : ''}>
                          {system.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {/* Fullscreen toggle */}
        {onToggleFullscreen && (
          <>
            <hr className="border-gray-200" />
            <button
              onClick={onToggleFullscreen}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors"
              title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
          </>
        )}
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="bg-white rounded-lg shadow-lg p-2 text-xs text-gray-600">
        <div className="font-medium mb-1">Controls:</div>
        <div>Left drag: Rotate</div>
        <div>Right drag: Pan</div>
        <div>Scroll: Zoom</div>
      </div>
    </div>
  );
}
