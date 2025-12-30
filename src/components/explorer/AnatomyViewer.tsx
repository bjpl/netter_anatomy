/**
 * AnatomyViewer Component
 * Main 3D viewer for anatomical structures using React Three Fiber
 * Based on Netter's Anatomy Tool Specification Section 6.3
 */

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import { ControlsPresets } from '@/lib/three';
import type { Structure } from '@/types';

export interface AnatomyViewerProps {
  /** Currently selected structure */
  selectedStructureId?: string | null;
  /** Structures to display */
  structures: Structure[];
  /** Layer visibility by system ID */
  layerVisibility?: Record<string, boolean>;
  /** Show labels on structures */
  showLabels?: boolean;
  /** Camera preset to use */
  cameraPreset?: 'isometric' | 'anterior' | 'posterior' | 'lateralLeft' | 'lateralRight';
  /** Callback when structure is selected */
  onStructureSelect?: (structureId: string) => void;
  /** Callback when camera changes */
  onCameraChange?: (position: [number, number, number], target: [number, number, number]) => void;
  /** Enable auto-rotation */
  autoRotate?: boolean;
  /** Presentation mode */
  presentationMode?: boolean;
  /** Mobile/responsive mode */
  isMobile?: boolean;
}

/**
 * Loading fallback component
 */
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#cccccc" wireframe />
    </mesh>
  );
}

/**
 * Scene lighting setup
 */
function SceneLighting() {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.6} />

      {/* Main directional light (key light) */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Fill light from opposite side */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.3}
      />

      {/* Rim light from behind */}
      <directionalLight
        position={[0, 5, -10]}
        intensity={0.2}
      />

      {/* Hemisphere light for natural ambient */}
      <hemisphereLight
        args={['#ffffff', '#444444', 0.4]}
      />
    </>
  );
}

/**
 * Grid helper for spatial reference (optional)
 */
function GridHelper({ visible = false }: { visible?: boolean }) {
  if (!visible) return null;

  return (
    <gridHelper
      args={[20, 20, '#888888', '#cccccc']}
      position={[0, -5, 0]}
    />
  );
}

/**
 * AnatomyViewer - Main 3D viewer component
 *
 * Features:
 * - React Three Fiber canvas with OrbitControls
 * - Responsive aspect ratio (16:9 desktop, 4:3 mobile)
 * - Structure highlighting on selection
 * - Layer visibility toggles
 * - Label rendering with leader lines
 *
 * @example
 * ```tsx
 * <AnatomyViewer
 *   structures={structures}
 *   selectedStructureId={selectedId}
 *   layerVisibility={{ muscular: true, skeletal: true }}
 *   showLabels={true}
 *   onStructureSelect={(id) => console.log('Selected:', id)}
 *   isMobile={window.innerWidth < 768}
 * />
 * ```
 */
export function AnatomyViewer({
  selectedStructureId: _selectedStructureId,
  structures: _structures,
  layerVisibility: _layerVisibility = {},
  showLabels: _showLabels = true,
  cameraPreset: _cameraPreset = 'isometric',
  onStructureSelect: _onStructureSelect,
  onCameraChange: _onCameraChange,
  autoRotate = false,
  presentationMode = false,
  isMobile = false,
}: AnatomyViewerProps) {
  const [isReady, setIsReady] = useState(false);

  // Determine control preset based on mode
  const controlsConfig = presentationMode
    ? ControlsPresets.presentation
    : isMobile
      ? ControlsPresets.mobile
      : ControlsPresets.default;

  // Apply auto-rotation override
  const finalConfig = {
    ...controlsConfig,
    autoRotate: autoRotate ?? controlsConfig.autoRotate,
  };

  // Determine aspect ratio based on device
  const aspectRatio = isMobile ? 4 / 3 : 16 / 9;

  useEffect(() => {
    // Component ready
    setIsReady(true);
  }, []);

  return (
    <div
      className="anatomy-viewer"
      role="application"
      aria-label="3D Anatomy Viewer - Use mouse to rotate, scroll to zoom, shift+drag to pan"
      tabIndex={0}
      style={{
        width: '100%',
        paddingBottom: `${(1 / aspectRatio) * 100}%`,
        position: 'relative',
        backgroundColor: '#fafafa',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
      onKeyDown={(e) => {
        // Keyboard navigation support
        if (e.key === 'Escape') {
          // Reset view on escape
          e.currentTarget.blur();
        }
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Canvas
          shadows
          dpr={[1, 2]} // Adaptive pixel ratio
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          {/* Camera setup */}
          <PerspectiveCamera
            makeDefault
            position={[7, 7, 7]}
            fov={50}
            near={0.1}
            far={1000}
          />

          {/* Scene lighting */}
          <SceneLighting />

          {/* Grid helper (hidden by default) */}
          <GridHelper visible={false} />

          {/* Orbit controls */}
          <OrbitControls
            makeDefault
            enableRotate={finalConfig.enableRotate}
            enableZoom={finalConfig.enableZoom}
            enablePan={finalConfig.enablePan}
            enableDamping={finalConfig.enableDamping}
            dampingFactor={finalConfig.dampingFactor}
            rotateSpeed={finalConfig.rotateSpeed}
            zoomSpeed={finalConfig.zoomSpeed}
            panSpeed={finalConfig.panSpeed}
            minDistance={finalConfig.minDistance}
            maxDistance={finalConfig.maxDistance}
            minPolarAngle={finalConfig.minPolarAngle}
            maxPolarAngle={finalConfig.maxPolarAngle}
            autoRotate={finalConfig.autoRotate}
            autoRotateSpeed={finalConfig.autoRotateSpeed}
          />

          {/* 3D content */}
          <Suspense fallback={<LoadingFallback />}>
            {/*
              TODO: Render StructureModel components here
              Will be imported from ./StructureModel.tsx

              {structures
                .filter(s => layerVisibility[s.system_ids[0]] !== false)
                .map(structure => (
                  <StructureModel
                    key={structure.id}
                    structure={structure}
                    highlighted={selectedStructureId === structure.id}
                    visible={true}
                    onSelect={() => onStructureSelect?.(structure.id)}
                  />
                ))
              }
            */}

            {/* Placeholder mesh until StructureModel is implemented */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2, 2, 2]} />
              <meshStandardMaterial
                color="#C45C5C"
                metalness={0.1}
                roughness={0.8}
              />
            </mesh>
          </Suspense>

          {/*
            TODO: Render AnatomyLabels here when implemented

            {showLabels && (
              <AnatomyLabels
                structures={structures.filter(s =>
                  layerVisibility[s.system_ids[0]] !== false
                )}
                selectedStructureId={selectedStructureId}
              />
            )}
          */}
        </Canvas>
      </div>

      {/* Loading overlay */}
      {!isReady && (
        <div
          role="alert"
          aria-busy="true"
          aria-live="polite"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(250, 250, 250, 0.9)',
            zIndex: 10,
          }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" aria-hidden="true" />
            <p className="text-gray-600">Loading 3D viewer...</p>
          </div>
        </div>
      )}

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isReady && 'Interactive 3D anatomy viewer loaded. Use mouse or keyboard to navigate.'}
      </div>
    </div>
  );
}
