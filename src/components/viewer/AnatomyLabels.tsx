/**
 * AnatomyLabels - 3D label rendering for anatomical structures
 * Uses Html from @react-three/drei for HTML overlay labels
 */

import { useMemo } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Structure, UUID } from '@/types';
import { createLabelLineMaterial } from '@/lib/three/materials';

/**
 * Props for AnatomyLabels component
 */
export interface AnatomyLabelsProps {
  /** Structures to show labels for */
  structures: Structure[];
  /** Currently selected structure ID */
  selectedId?: UUID | null;
  /** Callback when label is clicked */
  onLabelClick?: (structureId: UUID) => void;
}

/**
 * Individual label component
 */
interface LabelProps {
  structure: Structure;
  position: THREE.Vector3;
  isSelected: boolean;
  onClick?: () => void;
}

function Label({ structure, position, isSelected, onClick }: LabelProps) {
  return (
    <Html
      position={position}
      distanceFactor={10}
      center
      style={{
        pointerEvents: 'auto',
        userSelect: 'none',
      }}
    >
      <div
        onClick={onClick}
        className={`
          px-3 py-1.5 rounded-md shadow-lg cursor-pointer transition-all
          ${
            isSelected
              ? 'bg-blue-500 text-white font-semibold scale-110'
              : 'bg-white text-gray-800 hover:bg-gray-100 hover:shadow-xl'
          }
        `}
        style={{
          fontSize: isSelected ? '14px' : '12px',
          minWidth: '80px',
          textAlign: 'center',
          border: isSelected ? '2px solid #1e40af' : '1px solid #e5e7eb',
        }}
      >
        <div className="font-medium">{structure.canonical_name}</div>
        {structure.common_names.length > 0 && !isSelected && (
          <div className="text-xs text-gray-500 mt-0.5">
            {structure.common_names[0]}
          </div>
        )}
      </div>
    </Html>
  );
}

/**
 * Leader line from structure to label
 */
interface LeaderLineProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  isSelected: boolean;
}

function LeaderLine({ start, end, isSelected }: LeaderLineProps) {
  const points = useMemo(() => [start, end], [start, end]);
  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  const material = useMemo(() => {
    return createLabelLineMaterial(isSelected ? 0x3b82f6 : 0x999999);
  }, [isSelected]);

  return <primitive object={new THREE.Line(geometry, material)} />;
}

/**
 * Calculate label position offset from structure
 */
function calculateLabelPosition(
  structurePosition: THREE.Vector3,
  index: number,
  total: number
): THREE.Vector3 {
  // Distribute labels around structures to minimize overlap
  const angle = (index / total) * Math.PI * 2;
  const radius = 2; // Distance from structure
  const offset = new THREE.Vector3(
    Math.cos(angle) * radius,
    1 + (index % 3) * 0.5, // Vertical stagger
    Math.sin(angle) * radius
  );

  return structurePosition.clone().add(offset);
}

/**
 * 3D labels for anatomical structures
 *
 * Renders HTML overlay labels positioned at structure locations.
 * Includes leader lines connecting labels to structures.
 * Optimized to minimize label overlap.
 *
 * @example
 * ```tsx
 * <AnatomyLabels
 *   structures={structures}
 *   selectedId={selectedId}
 *   onLabelClick={handleClick}
 * />
 * ```
 */
export function AnatomyLabels({
  structures,
  selectedId,
  onLabelClick,
}: AnatomyLabelsProps) {
  // Calculate positions for all labels
  const labelData = useMemo(() => {
    return structures.map((structure, index) => {
      // For now, position at origin - in real app, this would be from model bounds
      // You would calculate this from the loaded model's bounding box center
      const structurePosition = new THREE.Vector3(0, 0, 0);
      const labelPosition = calculateLabelPosition(
        structurePosition,
        index,
        structures.length
      );

      return {
        structure,
        structurePosition,
        labelPosition,
      };
    });
  }, [structures]);

  return (
    <group>
      {labelData.map(({ structure, structurePosition, labelPosition }) => {
        const isSelected = selectedId === structure.id;

        return (
          <group key={structure.id}>
            {/* Leader line */}
            <LeaderLine
              start={structurePosition}
              end={labelPosition}
              isSelected={isSelected}
            />

            {/* Label */}
            <Label
              structure={structure}
              position={labelPosition}
              isSelected={isSelected}
              onClick={() => onLabelClick?.(structure.id)}
            />
          </group>
        );
      })}
    </group>
  );
}
