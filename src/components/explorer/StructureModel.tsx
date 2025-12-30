/**
 * StructureModel Component
 * Individual 3D mesh for anatomical structures
 * Based on Netter's Anatomy Tool Specification Section 6.3
 */

import { useRef, useState, useEffect } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import type { Structure } from '@/types';
import {
  getMaterialLibrary,
  animateMaterialHighlight,
} from '@/lib/three';

export interface StructureModelProps {
  /** Structure data */
  structure: Structure;
  /** Whether this structure is highlighted/selected */
  highlighted?: boolean;
  /** Whether this structure is visible */
  visible?: boolean;
  /** Custom material override */
  materialOverride?: THREE.Material;
  /** Click handler */
  onSelect?: (structureId: string) => void;
  /** Hover enter handler */
  onHoverEnter?: (structureId: string) => void;
  /** Hover exit handler */
  onHoverExit?: (structureId: string) => void;
  /** Model URL override (defaults to structure.model_reference) */
  modelUrl?: string;
}

/**
 * StructureModel - Renders individual anatomical structure as 3D mesh
 *
 * Features:
 * - Loads GLTF/GLB model based on structure reference
 * - Applies system-appropriate material
 * - Click handling for selection
 * - Hover effects for interactivity
 * - Smooth highlight transitions
 *
 * @example
 * ```tsx
 * <StructureModel
 *   structure={humerusStructure}
 *   highlighted={selectedId === humerusStructure.id}
 *   visible={layerVisibility.skeletal}
 *   onSelect={(id) => setSelectedId(id)}
 * />
 * ```
 */
export function StructureModel({
  structure,
  highlighted = false,
  visible = true,
  materialOverride,
  onSelect,
  onHoverEnter,
  onHoverExit,
  modelUrl,
}: StructureModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [materialLib] = useState(() => getMaterialLibrary());

  // Determine model URL - for future use when actual Z-Anatomy models are available
  // const modelPath = modelUrl || `/models/${structure.model_reference}.glb`;
  // const { scene } = useGLTF(modelPath);
  void modelUrl; // Mark as used for future implementation

  // Get appropriate material based on structure type
  const baseMaterial = materialOverride ||
    materialLib.getStructureMaterial(structure.structure_type);

  // Highlight animation effect
  useEffect(() => {
    if (highlighted && meshRef.current) {
      const mesh = meshRef.current;

      // Apply highlight material
      mesh.material = materialLib.getHighlightMaterial();

      // Animate highlight pulse
      const stopAnimation = animateMaterialHighlight(
        mesh.material as THREE.MeshStandardMaterial,
        1000
      );

      return () => {
        stopAnimation();
        // Restore original material
        mesh.material = baseMaterial;
      };
    }
    return undefined;
  }, [highlighted, baseMaterial, materialLib]);

  // Hover effect
  useEffect(() => {
    if (meshRef.current) {
      const mesh = meshRef.current;

      if (hovered && !highlighted) {
        mesh.material = materialLib.getHoverMaterial();
      } else if (!highlighted) {
        mesh.material = baseMaterial;
      }
    }
  }, [hovered, highlighted, baseMaterial, materialLib]);

  // Animation frame for smooth transitions
  useFrame(() => {
    if (groupRef.current) {
      // Smooth opacity transition
      const targetOpacity = visible ? 1.0 : 0.0;
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material as THREE.MeshStandardMaterial;
          if (material.opacity !== targetOpacity) {
            material.opacity = THREE.MathUtils.lerp(
              material.opacity,
              targetOpacity,
              0.1
            );
            material.transparent = material.opacity < 1.0;
          }
        }
      });
    }
  });

  // Click handler
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect?.(structure.id);
  };

  // Pointer enter handler
  const handlePointerEnter = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    onHoverEnter?.(structure.id);
    document.body.style.cursor = 'pointer';
  };

  // Pointer leave handler
  const handlePointerLeave = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(false);
    onHoverExit?.(structure.id);
    document.body.style.cursor = 'default';
  };

  // For now, render a placeholder mesh until actual models are integrated
  // TODO: Replace with actual GLTF model loading
  return (
    <group
      ref={groupRef}
      visible={visible}
      name={structure.canonical_name}
      userData={{ structureId: structure.id }}
    >
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        position={[0, 0, 0]}
      >
        {/* Placeholder geometry - will be replaced with loaded GLTF */}
        <sphereGeometry args={[0.5, 32, 32]} />
        <primitive object={baseMaterial} attach="material" />
      </mesh>
    </group>
  );
}

/**
 * Preload GLTF models for better performance
 * Call this before rendering StructureModel components
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   preloadStructureModels([
 *     '/models/humerus.glb',
 *     '/models/radius.glb',
 *     '/models/ulna.glb'
 *   ]);
 * }, []);
 * ```
 */
export function preloadStructureModels(urls: string[]): void {
  urls.forEach((url) => {
    try {
      useGLTF.preload(url);
    } catch (error) {
      console.warn(`Failed to preload model: ${url}`, error);
    }
  });
}

/**
 * Clear GLTF cache
 * Useful for memory management
 */
export function clearStructureModelsCache(): void {
  (useGLTF as unknown as { clear: () => void }).clear();
}
