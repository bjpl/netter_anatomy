/**
 * StructureModel - Individual anatomy structure mesh component
 * Handles GLTF model loading, materials, and interaction states
 */

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';
import type { Structure, UUID } from '@/types';
import { loadModel } from '@/lib/three/loaders';
import {
  createStructureMaterial,
  createHighlightMaterial,
  createHoverMaterial,
} from '@/lib/three/materials';

/**
 * Props for StructureModel component
 */
export interface StructureModelProps {
  /** Anatomical structure to render */
  structure: Structure;
  /** Whether this structure is selected */
  isSelected?: boolean;
  /** Callback when structure is clicked */
  onSelect?: (structureId: UUID) => void;
  /** Callback when structure is hovered */
  onHover?: (structureId: UUID | null) => void;
}

/**
 * Individual anatomical structure 3D model
 *
 * Loads GLTF model and applies materials based on structure type.
 * Handles hover and selection states with visual feedback.
 *
 * @example
 * ```tsx
 * <StructureModel
 *   structure={structure}
 *   isSelected={selectedId === structure.id}
 *   onSelect={handleSelect}
 *   onHover={handleHover}
 * />
 * ```
 */
export function StructureModel({
  structure,
  isSelected = false,
  onSelect,
  onHover,
}: StructureModelProps) {
  const meshRef = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [gltf, setGltf] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load GLTF model
  useEffect(() => {
    let cancelled = false;

    const loadStructureModel = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Construct model URL from model_reference
        // Assuming models are in /models/ directory
        const modelUrl = `/models/${structure.model_reference}.glb`;

        const loadedModel = await loadModel(modelUrl, {
          useCache: true,
          useDraco: true,
        });

        if (!cancelled) {
          setGltf(loadedModel.gltf);
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(`Failed to load model for ${structure.canonical_name}:`, err);
          setError(err instanceof Error ? err.message : 'Failed to load model');
          setIsLoading(false);
        }
      }
    };

    loadStructureModel();

    return () => {
      cancelled = true;
    };
  }, [structure.model_reference, structure.canonical_name]);

  // Update material based on state
  useEffect(() => {
    if (!meshRef.current) return;

    let material;

    if (isSelected) {
      material = createHighlightMaterial();
    } else if (isHovered) {
      material = createHoverMaterial();
    } else {
      material = createStructureMaterial(structure.structure_type);
    }

    // Apply material to mesh
    meshRef.current.traverse((child) => {
      if ((child as Mesh).isMesh) {
        (child as Mesh).material = material;
      }
    });

    // Cleanup previous material
    return () => {
      material.dispose();
    };
  }, [isSelected, isHovered, structure.structure_type]);

  // Animate selection (subtle pulse)
  useFrame((state) => {
    if (!meshRef.current || !isSelected) return;

    const time = state.clock.getElapsedTime();
    const scale = 1 + Math.sin(time * 2) * 0.02; // Subtle pulse
    meshRef.current.scale.setScalar(scale);
  });

  // Handle pointer events
  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setIsHovered(true);
    if (onHover) {
      onHover(structure.id);
    }
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    if (onHover) {
      onHover(null);
    }
    document.body.style.cursor = 'default';
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(structure.id);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#cccccc" wireframe />
      </mesh>
    );
  }

  // Error state
  if (error || !gltf) {
    console.warn(`Model not available for ${structure.canonical_name}`);
    return null;
  }

  // Clone the scene to avoid sharing geometry between instances
  const scene = gltf.scene.clone();

  return (
    <primitive
      ref={meshRef}
      object={scene}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
      userData={{ structureId: structure.id }}
    />
  );
}
