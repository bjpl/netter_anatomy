/**
 * Three.js Material Definitions
 * System-based materials with anatomical color coding
 * Based on Netter's Anatomy Tool Specification Section 12.2.3
 */

import * as THREE from 'three';
import { StructureType } from '@/types';

/**
 * Material configuration options
 */
export interface MaterialConfig {
  /** Base color */
  color: string | number;
  /** Material opacity */
  opacity?: number;
  /** Enable transparency */
  transparent?: boolean;
  /** Metalness (0-1) */
  metalness?: number;
  /** Roughness (0-1) */
  roughness?: number;
  /** Enable wireframe */
  wireframe?: boolean;
  /** Emissive color for glow */
  emissive?: string | number;
  /** Emissive intensity */
  emissiveIntensity?: number;
}

/**
 * System-based color palette from specification
 * Section 12.2.3: Anatomical system colors for visualization
 */
export const SystemColors = {
  /** Bone structures */
  bone: 0xF5F0E6,
  /** Muscle structures */
  muscle: 0xC45C5C,
  /** Nerve structures */
  nerve: 0xE6C744,
  /** Arterial structures */
  artery: 0xD64545,
  /** Venous structures */
  vein: 0x4571D6,
  /** Organ structures */
  organ: 0x7E57C2,
  /** Ligament structures */
  ligament: 0x8D9E78,
  /** Fascia structures */
  fascia: 0xB8A99A,
  /** Default/other structures */
  other: 0xCCCCCC,
} as const;

/**
 * Highlight color for selected structures
 */
export const HighlightColor = 0x00BFFF; // Deep Sky Blue

/**
 * Hover color for interactive feedback
 */
export const HoverColor = 0xFFFFAA; // Light yellow

/**
 * Create a standard material for anatomical structures
 *
 * @param structureType - Type of anatomical structure
 * @param config - Optional material configuration
 * @returns THREE.MeshStandardMaterial
 *
 * @example
 * ```typescript
 * const muscleMaterial = createStructureMaterial(StructureType.MUSCLE);
 * const boneMesh = new THREE.Mesh(geometry, createStructureMaterial(StructureType.BONE));
 * ```
 */
export function createStructureMaterial(
  structureType: StructureType,
  config: Partial<MaterialConfig> = {}
): THREE.MeshStandardMaterial {
  // Get base color from structure type
  const baseColor = SystemColors[structureType] || SystemColors.other;

  return new THREE.MeshStandardMaterial({
    color: config.color ?? baseColor,
    opacity: config.opacity ?? 1.0,
    transparent: config.transparent ?? false,
    metalness: config.metalness ?? 0.1,
    roughness: config.roughness ?? 0.8,
    wireframe: config.wireframe ?? false,
    emissive: config.emissive ?? 0x000000,
    emissiveIntensity: config.emissiveIntensity ?? 0,
    side: THREE.DoubleSide, // Render both sides for anatomical accuracy
    flatShading: false,
  });
}

/**
 * Create a highlight material for selected structures
 *
 * @param baseColor - Optional base color (defaults to highlight color)
 * @returns THREE.MeshStandardMaterial
 *
 * @example
 * ```typescript
 * selectedMesh.material = createHighlightMaterial();
 * ```
 */
export function createHighlightMaterial(
  baseColor: string | number = HighlightColor
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: baseColor,
    opacity: 0.9,
    transparent: true,
    metalness: 0.3,
    roughness: 0.5,
    emissive: baseColor,
    emissiveIntensity: 0.2,
    side: THREE.DoubleSide,
  });
}

/**
 * Create a hover material for interactive feedback
 *
 * @returns THREE.MeshStandardMaterial
 *
 * @example
 * ```typescript
 * mesh.addEventListener('pointermove', () => {
 *   mesh.material = createHoverMaterial();
 * });
 * ```
 */
export function createHoverMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: HoverColor,
    opacity: 0.95,
    transparent: true,
    metalness: 0.2,
    roughness: 0.6,
    emissive: HoverColor,
    emissiveIntensity: 0.15,
    side: THREE.DoubleSide,
  });
}

/**
 * Create a transparent material for layering
 * Used when showing multiple anatomical layers simultaneously
 *
 * @param structureType - Type of anatomical structure
 * @param opacity - Transparency level (0-1)
 * @returns THREE.MeshStandardMaterial
 *
 * @example
 * ```typescript
 * const transparentMuscle = createTransparentMaterial(StructureType.MUSCLE, 0.3);
 * ```
 */
export function createTransparentMaterial(
  structureType: StructureType,
  opacity = 0.5
): THREE.MeshStandardMaterial {
  return createStructureMaterial(structureType, {
    opacity,
    transparent: true,
    roughness: 0.7,
  });
}

/**
 * Create a wireframe material for anatomical outlines
 *
 * @param structureType - Type of anatomical structure
 * @returns THREE.MeshBasicMaterial
 *
 * @example
 * ```typescript
 * const wireframeMaterial = createWireframeMaterial(StructureType.BONE);
 * ```
 */
export function createWireframeMaterial(
  structureType: StructureType
): THREE.MeshBasicMaterial {
  const baseColor = SystemColors[structureType] || SystemColors.other;

  return new THREE.MeshBasicMaterial({
    color: baseColor,
    wireframe: true,
    opacity: 0.8,
    transparent: true,
  });
}

/**
 * Create a label line material for 3D labels
 *
 * @param color - Line color
 * @returns THREE.LineBasicMaterial
 *
 * @example
 * ```typescript
 * const lineMaterial = createLabelLineMaterial(0x333333);
 * const line = new THREE.Line(geometry, lineMaterial);
 * ```
 */
export function createLabelLineMaterial(
  color: string | number = 0x333333
): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color,
    opacity: 0.6,
    transparent: true,
    linewidth: 1,
  });
}

/**
 * Material library for efficient material reuse
 */
class MaterialLibrary {
  private materials = new Map<string, THREE.Material>();

  /**
   * Get or create a material by structure type
   */
  getStructureMaterial(structureType: StructureType): THREE.MeshStandardMaterial {
    const key = `structure_${structureType}`;

    if (!this.materials.has(key)) {
      this.materials.set(key, createStructureMaterial(structureType));
    }

    return this.materials.get(key) as THREE.MeshStandardMaterial;
  }

  /**
   * Get or create a transparent material
   */
  getTransparentMaterial(
    structureType: StructureType,
    opacity = 0.5
  ): THREE.MeshStandardMaterial {
    const key = `transparent_${structureType}_${opacity}`;

    if (!this.materials.has(key)) {
      this.materials.set(key, createTransparentMaterial(structureType, opacity));
    }

    return this.materials.get(key) as THREE.MeshStandardMaterial;
  }

  /**
   * Get highlight material
   */
  getHighlightMaterial(): THREE.MeshStandardMaterial {
    const key = 'highlight';

    if (!this.materials.has(key)) {
      this.materials.set(key, createHighlightMaterial());
    }

    return this.materials.get(key) as THREE.MeshStandardMaterial;
  }

  /**
   * Get hover material
   */
  getHoverMaterial(): THREE.MeshStandardMaterial {
    const key = 'hover';

    if (!this.materials.has(key)) {
      this.materials.set(key, createHoverMaterial());
    }

    return this.materials.get(key) as THREE.MeshStandardMaterial;
  }

  /**
   * Dispose all cached materials
   */
  dispose(): void {
    this.materials.forEach((material) => material.dispose());
    this.materials.clear();
  }

  /**
   * Get cache size
   */
  getSize(): number {
    return this.materials.size;
  }
}

// Global material library instance
const materialLibrary = new MaterialLibrary();

/**
 * Get the global material library instance
 * Reuses materials for better performance
 *
 * @example
 * ```typescript
 * const library = getMaterialLibrary();
 * const material = library.getStructureMaterial(StructureType.MUSCLE);
 * ```
 */
export function getMaterialLibrary(): MaterialLibrary {
  return materialLibrary;
}

/**
 * Update material color based on structure type
 *
 * @param material - Material to update
 * @param structureType - New structure type
 */
export function updateMaterialColor(
  material: THREE.MeshStandardMaterial,
  structureType: StructureType
): void {
  const color = SystemColors[structureType] || SystemColors.other;
  material.color.setHex(color);
}

/**
 * Animate material highlight (pulse effect)
 *
 * @param material - Material to animate
 * @param duration - Animation duration in milliseconds
 * @returns Cleanup function to stop animation
 *
 * @example
 * ```typescript
 * const stopAnimation = animateMaterialHighlight(mesh.material, 1000);
 * // Later: stopAnimation();
 * ```
 */
export function animateMaterialHighlight(
  material: THREE.MeshStandardMaterial,
  duration = 1000
): () => void {
  const startTime = Date.now();
  const initialEmissive = material.emissiveIntensity;
  let animationId: number;

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = (elapsed % duration) / duration;

    // Sine wave pulse
    material.emissiveIntensity = initialEmissive +
      Math.sin(progress * Math.PI * 2) * 0.3;

    if (elapsed < duration * 3) { // Pulse 3 times
      animationId = requestAnimationFrame(animate);
    } else {
      material.emissiveIntensity = initialEmissive;
    }
  };

  animate();

  return () => {
    cancelAnimationFrame(animationId);
    material.emissiveIntensity = initialEmissive;
  };
}
