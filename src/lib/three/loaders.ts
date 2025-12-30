/**
 * Three.js Model Loaders
 * GLTF/GLB loader with progressive loading and LOD support
 * Based on Netter's Anatomy Tool Specification Section 13.3
 */

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

/**
 * Model loading options
 */
export interface ModelLoadOptions {
  /** Enable DRACO compression support */
  useDraco?: boolean;
  /** DRACO decoder path */
  dracoDecoderPath?: string;
  /** Progressive loading callback */
  onProgress?: (loaded: number, total: number) => void;
  /** Use LOD (Level of Detail) */
  useLOD?: boolean;
  /** Cache the loaded model */
  useCache?: boolean;
}

/**
 * Loaded model metadata
 */
export interface LoadedModel {
  /** The loaded GLTF object */
  gltf: GLTF;
  /** Model bounding box */
  boundingBox: THREE.Box3;
  /** Model center point */
  center: THREE.Vector3;
  /** Model size */
  size: THREE.Vector3;
  /** Load time in milliseconds */
  loadTime: number;
}

/**
 * Model cache for optimized loading
 */
class ModelCache {
  private cache = new Map<string, LoadedModel>();
  private maxSize = 50; // Maximum cached models

  get(url: string): LoadedModel | undefined {
    return this.cache.get(url);
  }

  set(url: string, model: LoadedModel): void {
    // Simple LRU: remove oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(url, model);
  }

  has(url: string): boolean {
    return this.cache.has(url);
  }

  clear(): void {
    this.cache.clear();
  }

  getSize(): number {
    return this.cache.size;
  }
}

// Global model cache instance
const modelCache = new ModelCache();

/**
 * Configure and create a GLTF loader instance
 */
function createGLTFLoader(options: ModelLoadOptions = {}): GLTFLoader {
  const loader = new GLTFLoader();

  // Setup DRACO compression support if enabled
  if (options.useDraco) {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      options.dracoDecoderPath || '/draco/'
    );
    loader.setDRACOLoader(dracoLoader);
  }

  return loader;
}

/**
 * Calculate bounding box and model metrics
 */
function calculateModelMetrics(gltf: GLTF): {
  boundingBox: THREE.Box3;
  center: THREE.Vector3;
  size: THREE.Vector3;
} {
  const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();

  boundingBox.getCenter(center);
  boundingBox.getSize(size);

  return { boundingBox, center, size };
}

/**
 * Load a GLTF/GLB model from URL
 *
 * @param url - Model URL or path
 * @param options - Loading options
 * @returns Promise resolving to loaded model with metadata
 *
 * @example
 * ```typescript
 * const model = await loadModel('/models/humerus.glb', {
 *   useDraco: true,
 *   useCache: true,
 *   onProgress: (loaded, total) => {
 *     console.log(`Loading: ${(loaded / total * 100).toFixed(0)}%`);
 *   }
 * });
 * ```
 */
export async function loadModel(
  url: string,
  options: ModelLoadOptions = {}
): Promise<LoadedModel> {
  const {
    useCache = true,
    onProgress,
    ...loaderOptions
  } = options;

  // Check cache first
  if (useCache && modelCache.has(url)) {
    const cached = modelCache.get(url)!;
    return cached;
  }

  const startTime = performance.now();
  const loader = createGLTFLoader(loaderOptions);

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        const loadTime = performance.now() - startTime;
        const metrics = calculateModelMetrics(gltf);

        const loadedModel: LoadedModel = {
          gltf,
          ...metrics,
          loadTime,
        };

        // Cache the model if enabled
        if (useCache) {
          modelCache.set(url, loadedModel);
        }

        resolve(loadedModel);
      },
      (progressEvent) => {
        if (onProgress && progressEvent.lengthComputable) {
          onProgress(progressEvent.loaded, progressEvent.total);
        }
      },
      (error: unknown) => {
        const message = error instanceof Error ? error.message : String(error);
        reject(new Error(`Failed to load model from ${url}: ${message}`));
      }
    );
  });
}

/**
 * Preload multiple models in parallel
 *
 * @param urls - Array of model URLs
 * @param options - Loading options
 * @returns Promise resolving to array of loaded models
 *
 * @example
 * ```typescript
 * const models = await preloadModels([
 *   '/models/humerus.glb',
 *   '/models/radius.glb',
 *   '/models/ulna.glb'
 * ], { useCache: true });
 * ```
 */
export async function preloadModels(
  urls: string[],
  options: ModelLoadOptions = {}
): Promise<LoadedModel[]> {
  return Promise.all(urls.map((url) => loadModel(url, options)));
}

/**
 * Create LOD (Level of Detail) group for a model
 * Useful for performance optimization with complex models
 *
 * @param modelUrls - Object with LOD levels (low, medium, high)
 * @param options - Loading options
 * @returns Promise resolving to THREE.LOD object
 *
 * @example
 * ```typescript
 * const lod = await createLOD({
 *   high: '/models/skull-high.glb',
 *   medium: '/models/skull-medium.glb',
 *   low: '/models/skull-low.glb'
 * });
 * scene.add(lod);
 * ```
 */
export async function createLOD(
  modelUrls: {
    high: string;
    medium?: string;
    low?: string;
  },
  options: ModelLoadOptions = {}
): Promise<THREE.LOD> {
  const lod = new THREE.LOD();

  // Load high detail model (always present)
  const highModel = await loadModel(modelUrls.high, options);
  lod.addLevel(highModel.gltf.scene.clone(), 0);

  // Load medium detail model if provided
  if (modelUrls.medium) {
    const mediumModel = await loadModel(modelUrls.medium, options);
    lod.addLevel(mediumModel.gltf.scene.clone(), 10);
  }

  // Load low detail model if provided
  if (modelUrls.low) {
    const lowModel = await loadModel(modelUrls.low, options);
    lod.addLevel(lowModel.gltf.scene.clone(), 20);
  }

  return lod;
}

/**
 * Clear the model cache
 * Useful for memory management
 */
export function clearModelCache(): void {
  modelCache.clear();
}

/**
 * Get model cache statistics
 */
export function getModelCacheStats(): {
  size: number;
  maxSize: number;
} {
  return {
    size: modelCache.getSize(),
    maxSize: 50,
  };
}

/**
 * Dispose of a loaded model to free memory
 *
 * @param model - The loaded model to dispose
 */
export function disposeModel(model: LoadedModel): void {
  model.gltf.scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose();

      if (Array.isArray(object.material)) {
        object.material.forEach((material) => material.dispose());
      } else {
        object.material.dispose();
      }
    }
  });
}
