/**
 * Three.js Camera Controls Configuration
 * OrbitControls settings optimized for anatomy viewing
 * Based on Netter's Anatomy Tool Specification Section 6.3
 */

import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';

/**
 * Camera control configuration options
 */
export interface ControlsConfig {
  /** Enable rotation */
  enableRotate?: boolean;
  /** Enable zoom */
  enableZoom?: boolean;
  /** Enable panning */
  enablePan?: boolean;
  /** Enable damping (smooth motion) */
  enableDamping?: boolean;
  /** Damping factor */
  dampingFactor?: number;
  /** Rotation speed */
  rotateSpeed?: number;
  /** Zoom speed */
  zoomSpeed?: number;
  /** Pan speed */
  panSpeed?: number;
  /** Minimum distance */
  minDistance?: number;
  /** Maximum distance */
  maxDistance?: number;
  /** Minimum polar angle (radians) */
  minPolarAngle?: number;
  /** Maximum polar angle (radians) */
  maxPolarAngle?: number;
  /** Enable auto-rotate */
  autoRotate?: boolean;
  /** Auto-rotate speed */
  autoRotateSpeed?: number;
  /** Enable touch controls */
  enableTouch?: boolean;
}

/**
 * Preset configurations for different viewing scenarios
 */
export const ControlsPresets = {
  /**
   * Default anatomy viewing controls
   * Balanced settings for general exploration
   */
  default: {
    enableRotate: true,
    enableZoom: true,
    enablePan: true,
    enableDamping: true,
    dampingFactor: 0.05,
    rotateSpeed: 0.5,
    zoomSpeed: 0.8,
    panSpeed: 0.5,
    minDistance: 2,
    maxDistance: 50,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI,
    autoRotate: false,
    autoRotateSpeed: 1.0,
    enableTouch: true,
  } as const,

  /**
   * Mobile/touch-optimized controls
   * Adjusted for smaller screens and touch input
   */
  mobile: {
    enableRotate: true,
    enableZoom: true,
    enablePan: true,
    enableDamping: true,
    dampingFactor: 0.08,
    rotateSpeed: 0.4,
    zoomSpeed: 1.0,
    panSpeed: 0.6,
    minDistance: 1.5,
    maxDistance: 40,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI,
    autoRotate: false,
    autoRotateSpeed: 1.0,
    enableTouch: true,
  } as const,

  /**
   * Presentation mode with auto-rotation
   * For demonstrations or introductory views
   */
  presentation: {
    enableRotate: true,
    enableZoom: false,
    enablePan: false,
    enableDamping: true,
    dampingFactor: 0.05,
    rotateSpeed: 0.3,
    zoomSpeed: 0.5,
    panSpeed: 0,
    minDistance: 5,
    maxDistance: 20,
    minPolarAngle: Math.PI / 6,
    maxPolarAngle: (5 * Math.PI) / 6,
    autoRotate: true,
    autoRotateSpeed: 2.0,
    enableTouch: true,
  } as const,

  /**
   * Locked view for focused study
   * Minimal interaction, zoom only
   */
  locked: {
    enableRotate: false,
    enableZoom: true,
    enablePan: false,
    enableDamping: false,
    dampingFactor: 0,
    rotateSpeed: 0,
    zoomSpeed: 0.5,
    panSpeed: 0,
    minDistance: 2,
    maxDistance: 20,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI,
    autoRotate: false,
    autoRotateSpeed: 0,
    enableTouch: true,
  } as const,
} as const;

/**
 * Camera position preset for different anatomical views
 */
export const CameraPresets = {
  /** Anterior (front) view */
  anterior: {
    position: new THREE.Vector3(0, 0, 10),
    target: new THREE.Vector3(0, 0, 0),
  },

  /** Posterior (back) view */
  posterior: {
    position: new THREE.Vector3(0, 0, -10),
    target: new THREE.Vector3(0, 0, 0),
  },

  /** Right lateral view */
  lateralRight: {
    position: new THREE.Vector3(10, 0, 0),
    target: new THREE.Vector3(0, 0, 0),
  },

  /** Left lateral view */
  lateralLeft: {
    position: new THREE.Vector3(-10, 0, 0),
    target: new THREE.Vector3(0, 0, 0),
  },

  /** Superior (top) view */
  superior: {
    position: new THREE.Vector3(0, 10, 0),
    target: new THREE.Vector3(0, 0, 0),
  },

  /** Inferior (bottom) view */
  inferior: {
    position: new THREE.Vector3(0, -10, 0),
    target: new THREE.Vector3(0, 0, 0),
  },

  /** Default isometric view */
  isometric: {
    position: new THREE.Vector3(7, 7, 7),
    target: new THREE.Vector3(0, 0, 0),
  },
} as const;

/**
 * Apply configuration to OrbitControls instance
 *
 * @param controls - OrbitControls instance
 * @param config - Configuration options
 *
 * @example
 * ```typescript
 * const controls = new OrbitControls(camera, renderer.domElement);
 * configureControls(controls, ControlsPresets.mobile);
 * ```
 */
export function configureControls(
  controls: OrbitControls,
  config: ControlsConfig = ControlsPresets.default
): void {
  // Rotation
  controls.enableRotate = config.enableRotate ?? true;
  controls.rotateSpeed = config.rotateSpeed ?? 0.5;

  // Zoom
  controls.enableZoom = config.enableZoom ?? true;
  controls.zoomSpeed = config.zoomSpeed ?? 0.8;
  controls.minDistance = config.minDistance ?? 2;
  controls.maxDistance = config.maxDistance ?? 50;

  // Pan
  controls.enablePan = config.enablePan ?? true;
  controls.panSpeed = config.panSpeed ?? 0.5;

  // Damping
  controls.enableDamping = config.enableDamping ?? true;
  controls.dampingFactor = config.dampingFactor ?? 0.05;

  // Polar angle constraints
  controls.minPolarAngle = config.minPolarAngle ?? 0;
  controls.maxPolarAngle = config.maxPolarAngle ?? Math.PI;

  // Auto-rotate
  controls.autoRotate = config.autoRotate ?? false;
  controls.autoRotateSpeed = config.autoRotateSpeed ?? 1.0;

  // Touch controls
  controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN,
  };
}

/**
 * Reset camera to a specific preset view
 *
 * @param controls - OrbitControls instance
 * @param camera - Camera to reset
 * @param preset - Camera preset name
 * @param animate - Whether to animate the transition
 *
 * @example
 * ```typescript
 * resetCameraView(controls, camera, 'anterior', true);
 * ```
 */
export function resetCameraView(
  controls: OrbitControls,
  camera: THREE.Camera,
  preset: keyof typeof CameraPresets = 'isometric',
  animate = false
): void {
  const view = CameraPresets[preset];

  if (animate) {
    // Smooth transition (requires animation loop to call controls.update())
    controls.target.copy(view.target);
    camera.position.copy(view.position);
    controls.update();
  } else {
    // Instant reset
    controls.target.copy(view.target);
    camera.position.copy(view.position);
    controls.update();
  }
}

/**
 * Focus camera on a specific object or point
 *
 * @param controls - OrbitControls instance
 * @param camera - Camera to adjust
 * @param target - Target position or object
 * @param distance - Distance from target (optional)
 *
 * @example
 * ```typescript
 * focusOnTarget(controls, camera, selectedMesh.position, 5);
 * ```
 */
export function focusOnTarget(
  controls: OrbitControls,
  camera: THREE.Camera,
  target: THREE.Vector3 | THREE.Object3D,
  distance?: number
): void {
  const targetPosition = target instanceof THREE.Vector3
    ? target
    : target.position;

  controls.target.copy(targetPosition);

  if (distance !== undefined) {
    // Calculate camera position at specified distance
    const direction = new THREE.Vector3()
      .subVectors(camera.position, targetPosition)
      .normalize();

    camera.position.copy(
      targetPosition.clone().add(direction.multiplyScalar(distance))
    );
  }

  controls.update();
}

/**
 * Frame an object in the camera view
 * Automatically calculates appropriate distance based on object size
 *
 * @param controls - OrbitControls instance
 * @param camera - Camera to adjust
 * @param object - Object to frame
 * @param fitOffset - Additional spacing factor (default: 1.25)
 *
 * @example
 * ```typescript
 * frameObject(controls, camera, selectedStructure, 1.5);
 * ```
 */
export function frameObject(
  controls: OrbitControls,
  camera: THREE.PerspectiveCamera,
  object: THREE.Object3D,
  fitOffset = 1.25
): void {
  // Calculate bounding box
  const boundingBox = new THREE.Box3().setFromObject(object);
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();

  boundingBox.getCenter(center);
  boundingBox.getSize(size);

  // Calculate required distance
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  const distance = Math.abs(maxDim / Math.sin(fov / 2)) * fitOffset;

  // Update controls and camera
  controls.target.copy(center);

  const direction = new THREE.Vector3()
    .subVectors(camera.position, center)
    .normalize();

  camera.position.copy(center.clone().add(direction.multiplyScalar(distance)));

  controls.update();
}

/**
 * Save current camera state
 *
 * @param controls - OrbitControls instance
 * @param camera - Camera to save
 * @returns Serializable camera state
 */
export function saveCameraState(
  controls: OrbitControls,
  camera: THREE.Camera
): {
  position: [number, number, number];
  target: [number, number, number];
} {
  return {
    position: camera.position.toArray() as [number, number, number],
    target: controls.target.toArray() as [number, number, number],
  };
}

/**
 * Restore saved camera state
 *
 * @param controls - OrbitControls instance
 * @param camera - Camera to restore
 * @param state - Saved camera state
 */
export function restoreCameraState(
  controls: OrbitControls,
  camera: THREE.Camera,
  state: {
    position: [number, number, number];
    target: [number, number, number];
  }
): void {
  camera.position.fromArray(state.position);
  controls.target.fromArray(state.target);
  controls.update();
}
