/**
 * AnatomyViewer - Main 3D viewer component
 * Three.js viewer using React Three Fiber for anatomical structure visualization
 */

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls, Grid } from '@react-three/drei';
import type { Structure, UUID } from '@/types';
import { StructureModel } from './StructureModel';
import { AnatomyLabels } from './AnatomyLabels';
import { ControlsPresets } from '@/lib/three/controls';
import * as THREE from 'three';

/**
 * Props for AnatomyViewer component
 */
export interface AnatomyViewerProps {
  /** Anatomical structures to display */
  structures: Structure[];
  /** Currently selected structure ID */
  selectedId?: UUID | null;
  /** Callback when structure is clicked */
  onStructureClick?: (structureId: UUID) => void;
  /** Whether to show labels */
  labelsVisible?: boolean;
  /** Visible system IDs filter */
  visibleSystems?: UUID[];
  /** Show grid helper */
  showGrid?: boolean;
  /** Show axis helper */
  showAxis?: boolean;
  /** Camera controls preset */
  controlsPreset?: keyof typeof ControlsPresets;
  /** Custom class name */
  className?: string;
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
 * Scene content with lighting and models
 */
function SceneContent({
  structures,
  selectedId,
  onStructureClick,
  labelsVisible,
  visibleSystems,
  showGrid,
  showAxis,
}: Omit<AnatomyViewerProps, 'className' | 'controlsPreset'>) {
  // Filter structures by visible systems
  const visibleStructures = visibleSystems
    ? structures.filter((s) =>
        s.system_ids.some((systemId) => visibleSystems.includes(systemId))
      )
    : structures;

  return (
    <>
      {/* Lighting setup for anatomy visualization */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} />
      <hemisphereLight
        color="#ffffff"
        groundColor="#444444"
        intensity={0.4}
      />

      {/* Grid helper (toggleable) */}
      {showGrid && (
        <Grid
          args={[20, 20]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#6e6e6e"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#4e4e4e"
          fadeDistance={50}
          fadeStrength={1}
          infiniteGrid
        />
      )}

      {/* Axis helper (toggleable) */}
      {showAxis && <axesHelper args={[5]} />}

      {/* Anatomy structure models */}
      <Suspense fallback={<LoadingFallback />}>
        {visibleStructures.map((structure) => (
          <StructureModel
            key={structure.id}
            structure={structure}
            isSelected={selectedId === structure.id}
            onSelect={onStructureClick}
          />
        ))}
      </Suspense>

      {/* 3D labels */}
      {labelsVisible && (
        <AnatomyLabels
          structures={visibleStructures}
          selectedId={selectedId}
          onLabelClick={onStructureClick}
        />
      )}
    </>
  );
}

/**
 * Main 3D anatomy viewer component
 *
 * Provides interactive 3D visualization of anatomical structures with:
 * - OrbitControls for camera manipulation
 * - Optimized lighting for anatomy viewing
 * - Grid and axis helpers
 * - Structure selection and highlighting
 * - 3D labels
 *
 * @example
 * ```tsx
 * <AnatomyViewer
 *   structures={structures}
 *   selectedId={selectedId}
 *   onStructureClick={handleClick}
 *   labelsVisible={true}
 *   visibleSystems={['system-1', 'system-2']}
 *   showGrid={true}
 * />
 * ```
 */
export function AnatomyViewer({
  structures,
  selectedId,
  onStructureClick,
  labelsVisible = true,
  visibleSystems,
  showGrid = false,
  showAxis = false,
  controlsPreset = 'default',
  className = '',
}: AnatomyViewerProps) {
  const controlsRef = useRef<any>(null);

  // Get controls configuration
  const controlsConfig = ControlsPresets[controlsPreset];

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{
          position: [7, 7, 7],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        shadows
        dpr={[1, 2]} // Pixel ratio for retina displays
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          // Enable tone mapping for better color rendering
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;
        }}
      >
        {/* OrbitControls */}
        <DreiOrbitControls
          ref={controlsRef}
          enableRotate={controlsConfig.enableRotate}
          enableZoom={controlsConfig.enableZoom}
          enablePan={controlsConfig.enablePan}
          enableDamping={controlsConfig.enableDamping}
          dampingFactor={controlsConfig.dampingFactor}
          rotateSpeed={controlsConfig.rotateSpeed}
          zoomSpeed={controlsConfig.zoomSpeed}
          panSpeed={controlsConfig.panSpeed}
          minDistance={controlsConfig.minDistance}
          maxDistance={controlsConfig.maxDistance}
          minPolarAngle={controlsConfig.minPolarAngle}
          maxPolarAngle={controlsConfig.maxPolarAngle}
          autoRotate={controlsConfig.autoRotate}
          autoRotateSpeed={controlsConfig.autoRotateSpeed}
          makeDefault
        />

        {/* Scene content */}
        <SceneContent
          structures={structures}
          selectedId={selectedId}
          onStructureClick={onStructureClick}
          labelsVisible={labelsVisible}
          visibleSystems={visibleSystems}
          showGrid={showGrid}
          showAxis={showAxis}
        />
      </Canvas>
    </div>
  );
}
