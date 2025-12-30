/**
 * Three.js Integration Library
 * Exports for 3D anatomy viewer functionality
 * Based on Netter's Anatomy Tool Specification Section 13.3
 */

// Model loading utilities
export {
  loadModel,
  preloadModels,
  createLOD,
  clearModelCache,
  getModelCacheStats,
  disposeModel,
  type ModelLoadOptions,
  type LoadedModel,
} from './loaders';

// Camera controls
export {
  configureControls,
  resetCameraView,
  focusOnTarget,
  frameObject,
  saveCameraState,
  restoreCameraState,
  ControlsPresets,
  CameraPresets,
  type ControlsConfig,
} from './controls';

// Materials and colors
export {
  createStructureMaterial,
  createHighlightMaterial,
  createHoverMaterial,
  createTransparentMaterial,
  createWireframeMaterial,
  createLabelLineMaterial,
  getMaterialLibrary,
  updateMaterialColor,
  animateMaterialHighlight,
  SystemColors,
  HighlightColor,
  HoverColor,
  type MaterialConfig,
} from './materials';
