/**
 * ViewerControls Component
 * Overlay controls for 3D anatomy viewer
 * Based on Netter's Anatomy Tool Specification Section 6.3
 */

import { useState } from 'react';
import type { System } from '@/types';

export interface ViewerControlsProps {
  /** Available anatomical systems */
  systems: System[];
  /** Current layer visibility state */
  layerVisibility: Record<string, boolean>;
  /** Callback when layer visibility changes */
  onLayerVisibilityChange: (systemId: string, visible: boolean) => void;
  /** Whether labels are visible */
  labelsVisible: boolean;
  /** Callback when label visibility changes */
  onLabelsToggle: (visible: boolean) => void;
  /** Whether in fullscreen mode */
  isFullscreen?: boolean;
  /** Callback to toggle fullscreen */
  onFullscreenToggle?: () => void;
  /** Callback to reset camera view */
  onResetView?: () => void;
  /** Current zoom level (0-100) */
  zoomLevel?: number;
  /** Callback when zoom changes */
  onZoomChange?: (level: number) => void;
  /** Mobile mode */
  isMobile?: boolean;
  /** Callback to take screenshot */
  onScreenshot?: () => void;
}

/**
 * LayerToggle - Individual layer visibility toggle
 */
function LayerToggle({
  system,
  visible,
  onToggle,
}: {
  system: System;
  visible: boolean;
  onToggle: (visible: boolean) => void;
}) {
  return (
    <button
      onClick={() => onToggle(!visible)}
      className={`
        flex items-center gap-2 w-full px-3 py-2 rounded-md transition-colors
        ${visible
          ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
          : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
        }
      `}
      title={`Toggle ${system.name} visibility`}
    >
      <div
        className="w-4 h-4 rounded flex-shrink-0"
        style={{ backgroundColor: system.color_code }}
      />
      <span className="text-sm font-medium truncate">{system.name}</span>
      <div className="ml-auto">
        {visible ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        )}
      </div>
    </button>
  );
}

/**
 * ViewerControls - Overlay controls for 3D viewer
 *
 * Features:
 * - Layer toggles by anatomical system
 * - Label visibility toggle
 * - Fullscreen button
 * - Reset view button
 * - Zoom slider (desktop)
 * - Screenshot capture
 *
 * @example
 * ```tsx
 * <ViewerControls
 *   systems={anatomicalSystems}
 *   layerVisibility={visibility}
 *   onLayerVisibilityChange={(id, visible) => setVisibility({...visibility, [id]: visible})}
 *   labelsVisible={showLabels}
 *   onLabelsToggle={setShowLabels}
 *   onResetView={() => resetCamera()}
 *   isMobile={false}
 * />
 * ```
 */
export function ViewerControls({
  systems,
  layerVisibility,
  onLayerVisibilityChange,
  labelsVisible,
  onLabelsToggle,
  isFullscreen = false,
  onFullscreenToggle,
  onResetView,
  zoomLevel = 50,
  onZoomChange,
  isMobile = false,
  onScreenshot,
}: ViewerControlsProps) {
  const [layersExpanded, setLayersExpanded] = useState(false);

  return (
    <>
      {/* Top-left: Layer toggles */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Layers header */}
          <button
            onClick={() => setLayersExpanded(!layersExpanded)}
            className="flex items-center gap-2 w-full px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
            aria-label="Toggle layers menu"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">Layers</span>
            <svg
              className={`w-4 h-4 text-gray-400 ml-auto transition-transform ${
                layersExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Layers panel */}
          {layersExpanded && (
            <div className="border-t border-gray-200 p-2 bg-white max-h-80 overflow-y-auto">
              <div className="space-y-1">
                {systems.map((system) => (
                  <LayerToggle
                    key={system.id}
                    system={system}
                    visible={layerVisibility[system.id] !== false}
                    onToggle={(visible) => onLayerVisibilityChange(system.id, visible)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top-right: Action buttons */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {/* Labels toggle */}
        <button
          onClick={() => onLabelsToggle(!labelsVisible)}
          className={`
            p-3 rounded-lg shadow-lg transition-colors
            ${labelsVisible
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-white text-gray-600 hover:bg-gray-50'
            }
          `}
          title="Toggle labels"
          aria-label="Toggle labels"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </button>

        {/* Screenshot */}
        {onScreenshot && (
          <button
            onClick={onScreenshot}
            className="p-3 bg-white text-gray-600 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
            title="Take screenshot"
            aria-label="Take screenshot"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        )}

        {/* Reset view */}
        {onResetView && (
          <button
            onClick={onResetView}
            className="p-3 bg-white text-gray-600 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
            title="Reset view"
            aria-label="Reset view"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        )}

        {/* Fullscreen toggle */}
        {onFullscreenToggle && (
          <button
            onClick={onFullscreenToggle}
            className="p-3 bg-white text-gray-600 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Bottom-left: Zoom slider (desktop only) */}
      {!isMobile && onZoomChange && (
        <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
            <input
              type="range"
              min="0"
              max="100"
              value={zoomLevel}
              onChange={(e) => onZoomChange(Number(e.target.value))}
              className="w-32 accent-blue-600"
              aria-label="Zoom level"
            />
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
          </div>
        </div>
      )}

      {/* Mobile: Touch instructions overlay */}
      {isMobile && (
        <div className="absolute bottom-4 right-4 z-10 bg-white bg-opacity-90 rounded-lg shadow-lg p-3 text-xs text-gray-600">
          <p className="font-semibold mb-1">Touch Controls:</p>
          <p>• One finger: Rotate</p>
          <p>• Pinch: Zoom</p>
        </div>
      )}
    </>
  );
}
