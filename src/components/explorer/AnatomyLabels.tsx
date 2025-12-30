/**
 * AnatomyLabels Component
 * 3D label rendering with leader lines for anatomical structures
 * Based on Netter's Anatomy Tool Specification Section 6.3
 */

import { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Structure } from '@/types';
import { createLabelLineMaterial } from '@/lib/three';

export interface AnatomyLabelsProps {
  /** Structures to label */
  structures: Structure[];
  /** Currently selected structure ID */
  selectedStructureId?: string | null;
  /** Show labels on hover only (self-test mode) */
  hoverOnly?: boolean;
  /** Maximum number of labels to show */
  maxLabels?: number;
  /** Label font size */
  fontSize?: 'small' | 'medium' | 'large';
  /** Enable collision avoidance */
  avoidCollisions?: boolean;
}

interface LabelPosition {
  structureId: string;
  position: THREE.Vector3;
  screenPosition: THREE.Vector2;
}

/**
 * Individual label component with leader line
 */
function StructureLabel({
  structure,
  position,
  isSelected,
  fontSize = 'medium',
  showLine = true,
}: {
  structure: Structure;
  position: THREE.Vector3;
  isSelected: boolean;
  fontSize?: 'small' | 'medium' | 'large';
  showLine?: boolean;
}) {
  const lineRef = useRef<THREE.Line<THREE.BufferGeometry, THREE.Material>>(null);

  // Font size mapping
  const fontSizes = {
    small: '0.75rem',
    medium: '0.875rem',
    large: '1rem',
  };

  // Create leader line geometry
  useEffect(() => {
    if (showLine && lineRef.current) {
      const points = [
        new THREE.Vector3(0, 0, 0), // Structure position
        position.clone().add(new THREE.Vector3(1, 1, 0)), // Label offset
      ];

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lineRef.current.geometry = geometry;

      return () => {
        geometry.dispose();
      };
    }
    return undefined;
  }, [position, showLine]);

  return (
    <group position={position}>
      {/* Leader line */}
      {showLine && (
        <primitive object={new THREE.Line(new THREE.BufferGeometry(), createLabelLineMaterial())} ref={lineRef} />
      )}

      {/* HTML label */}
      <Html
        position={[1, 1, 0]}
        center
        distanceFactor={10}
        zIndexRange={[100, 0]}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          className={`
            px-3 py-1.5 rounded-md shadow-md whitespace-nowrap transition-all
            ${isSelected
              ? 'bg-blue-600 text-white font-semibold'
              : 'bg-white text-gray-800 border border-gray-300'
            }
          `}
          style={{
            fontSize: fontSizes[fontSize],
            backdropFilter: 'blur(8px)',
            backgroundColor: isSelected ? undefined : 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <div className="flex items-center gap-2">
            {/* Structure type indicator */}
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                backgroundColor: isSelected ? '#fff' : `#${structure.structure_type}`,
              }}
            />

            {/* Structure name */}
            <span>{structure.canonical_name}</span>
          </div>

          {/* Common name (if different) */}
          {structure.common_names.length > 0 &&
           structure.common_names[0] !== structure.canonical_name && (
            <div className="text-xs opacity-75 mt-0.5">
              {structure.common_names[0]}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

/**
 * Calculate optimal label positions to avoid overlaps
 */
function calculateLabelPositions(
  structures: Structure[],
  camera: THREE.Camera,
  maxLabels: number,
  avoidCollisions: boolean
): LabelPosition[] {
  const positions: LabelPosition[] = [];
  const screenPositions = new Set<string>();

  // Sort by importance (difficulty rating as proxy)
  const sortedStructures = [...structures].sort((a, b) =>
    b.difficulty_rating - a.difficulty_rating
  );

  for (const structure of sortedStructures.slice(0, maxLabels)) {
    // Calculate 3D position (center of structure bounds)
    // TODO: Get actual position from loaded model
    const position = new THREE.Vector3(0, 0, 0);

    // Project to screen space
    const screenPosition = position.clone().project(camera);

    if (avoidCollisions) {
      // Check for collisions with existing labels
      const key = `${Math.round(screenPosition.x * 10)},${Math.round(screenPosition.y * 10)}`;

      if (screenPositions.has(key)) {
        // Skip this label if it would overlap
        continue;
      }

      screenPositions.add(key);
    }

    positions.push({
      structureId: structure.id,
      position,
      screenPosition: new THREE.Vector2(screenPosition.x, screenPosition.y),
    });
  }

  return positions;
}

/**
 * AnatomyLabels - Renders labels for anatomical structures
 *
 * Features:
 * - HTML labels with leader lines
 * - Collision avoidance positioning
 * - Show/hide on hover for self-test mode
 * - Responsive font sizes
 * - Selected structure highlighting
 *
 * @example
 * ```tsx
 * <AnatomyLabels
 *   structures={visibleStructures}
 *   selectedStructureId={selectedId}
 *   hoverOnly={selfTestMode}
 *   maxLabels={10}
 *   avoidCollisions={true}
 * />
 * ```
 */
export function AnatomyLabels({
  structures,
  selectedStructureId,
  hoverOnly = false,
  maxLabels = 15,
  fontSize = 'medium',
  avoidCollisions = true,
}: AnatomyLabelsProps) {
  const { camera } = useThree();
  const [labelPositions, setLabelPositions] = useState<LabelPosition[]>([]);
  const [_hoveredStructureId, _setHoveredStructureId] = useState<string | null>(null);

  // Update label positions when camera or structures change
  useFrame(() => {
    const positions = calculateLabelPositions(
      structures,
      camera,
      maxLabels,
      avoidCollisions
    );
    setLabelPositions(positions);
  });

  // Filter structures to display
  const visibleStructures = hoverOnly
    ? structures.filter(s =>
        s.id === selectedStructureId || s.id === _hoveredStructureId
      )
    : structures.slice(0, maxLabels);

  return (
    <group name="anatomy-labels">
      {visibleStructures.map((structure) => {
        const labelPos = labelPositions.find(p => p.structureId === structure.id);

        if (!labelPos) return null;

        return (
          <StructureLabel
            key={structure.id}
            structure={structure}
            position={labelPos.position}
            isSelected={structure.id === selectedStructureId}
            fontSize={fontSize}
            showLine={!hoverOnly || structure.id === selectedStructureId}
          />
        );
      })}
    </group>
  );
}

/**
 * Simple label component without leader lines
 * For compact labeling scenarios
 */
export function SimpleLabel({
  text,
  position,
  color = '#000000',
  fontSize = 'medium',
}: {
  text: string;
  position: THREE.Vector3;
  color?: string;
  fontSize?: 'small' | 'medium' | 'large';
}) {
  const fontSizes = {
    small: '0.75rem',
    medium: '0.875rem',
    large: '1rem',
  };

  return (
    <Html
      position={position}
      center
      distanceFactor={10}
      zIndexRange={[100, 0]}
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div
        className="px-2 py-1 bg-white bg-opacity-90 rounded shadow-sm"
        style={{
          fontSize: fontSizes[fontSize],
          color,
        }}
      >
        {text}
      </div>
    </Html>
  );
}
