# AnatomyViewer Component Usage Examples

## Basic Usage

```tsx
import { useState } from 'react';
import { AnatomyViewer, ViewerControls } from '@/components/viewer';
import type { Structure, System } from '@/types';

function RegionalView() {
  const [structures, setStructures] = useState<Structure[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [labelsVisible, setLabelsVisible] = useState(true);
  const [gridVisible, setGridVisible] = useState(false);
  const [visibleSystems, setVisibleSystems] = useState<string[]>([]);
  const [systems, setSystems] = useState<System[]>([]);

  // Load structures and systems from database
  // useEffect(() => { ... }, []);

  return (
    <div className="relative w-full h-screen">
      {/* 3D Viewer */}
      <AnatomyViewer
        structures={structures}
        selectedId={selectedId}
        onStructureClick={setSelectedId}
        labelsVisible={labelsVisible}
        visibleSystems={visibleSystems}
        showGrid={gridVisible}
        showAxis={false}
        controlsPreset="default"
        className="w-full h-full"
      />

      {/* Overlay Controls */}
      <ViewerControls
        labelsVisible={labelsVisible}
        onToggleLabels={() => setLabelsVisible(!labelsVisible)}
        onResetCamera={() => {
          // Reset camera logic
        }}
        onSetView={(view) => {
          // Set camera view preset
        }}
        onZoomIn={() => {
          // Zoom in logic
        }}
        onZoomOut={() => {
          // Zoom out logic
        }}
        onFitView={() => {
          // Fit view logic
        }}
        systems={systems}
        visibleSystems={visibleSystems}
        onToggleSystem={(systemId) => {
          setVisibleSystems((prev) =>
            prev.includes(systemId)
              ? prev.filter((id) => id !== systemId)
              : [...prev, systemId]
          );
        }}
        gridVisible={gridVisible}
        onToggleGrid={() => setGridVisible(!gridVisible)}
      />
    </div>
  );
}
```

## With Camera Control Integration

```tsx
import { useRef, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  resetCameraView,
  focusOnTarget,
  frameObject,
  type CameraPresets,
  type ViewPreset
} from '@/lib/three/controls';

function ViewerWithCameraControls() {
  const controlsRef = useRef<OrbitControls>(null);
  const { camera } = useThree();

  const handleResetCamera = useCallback(() => {
    if (!controlsRef.current) return;
    resetCameraView(controlsRef.current, camera, 'isometric', true);
  }, [camera]);

  const handleSetView = useCallback((view: ViewPreset) => {
    if (!controlsRef.current) return;
    resetCameraView(controlsRef.current, camera, view, true);
  }, [camera]);

  const handleZoomIn = useCallback(() => {
    if (!controlsRef.current) return;
    const currentDistance = camera.position.distanceTo(controlsRef.current.target);
    const newDistance = Math.max(currentDistance * 0.8, 2);
    // Update camera position...
  }, [camera]);

  // ... rest of the component
}
```

## Mobile-Optimized Configuration

```tsx
import { useMediaQuery } from '@/hooks/useMediaQuery';

function ResponsiveViewer() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <AnatomyViewer
      structures={structures}
      selectedId={selectedId}
      onStructureClick={setSelectedId}
      controlsPreset={isMobile ? 'mobile' : 'default'}
      labelsVisible={!isMobile} // Hide labels on mobile for better performance
      showGrid={false}
    />
  );
}
```

## Custom Material Configuration

```tsx
import { StructureModel } from '@/components/viewer';
import { createStructureMaterial } from '@/lib/three/materials';

// Custom material with specific opacity
const customMaterial = createStructureMaterial(StructureType.MUSCLE, {
  opacity: 0.7,
  transparent: true,
  roughness: 0.5,
});
```

## Integration with State Management

```tsx
import { useAnatomyStore } from '@/stores/anatomy';

function ViewerContainer() {
  const {
    structures,
    selectedStructure,
    selectStructure,
    visibleSystems,
    toggleSystem,
  } = useAnatomyStore();

  return (
    <AnatomyViewer
      structures={structures}
      selectedId={selectedStructure?.id}
      onStructureClick={selectStructure}
      visibleSystems={visibleSystems}
    />
  );
}
```

## Performance Optimization

```tsx
import { Suspense, lazy } from 'react';

// Lazy load the viewer
const AnatomyViewer = lazy(() => import('@/components/viewer'));

function OptimizedViewer() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AnatomyViewer
        structures={structures}
        // Use model caching
        // Models are automatically cached by the loader
      />
    </Suspense>
  );
}
```

## Model Loading

Models should be placed in the `/public/models/` directory and referenced by the `model_reference` field in the Structure type:

```
/public/models/
  ├── humerus.glb
  ├── radius.glb
  ├── ulna.glb
  └── ...
```

The StructureModel component will automatically load models from `/models/{model_reference}.glb`.

## DRACO Compression

For optimized model loading with DRACO compression, place the DRACO decoder files in `/public/draco/`:

```
/public/draco/
  ├── draco_decoder.js
  ├── draco_decoder.wasm
  └── draco_wasm_wrapper.js
```

These files can be obtained from: https://github.com/google/draco

## Features

### AnatomyViewer
- ✅ Three.js Canvas with optimized settings
- ✅ OrbitControls integration
- ✅ Proper lighting for anatomy visualization
- ✅ Grid and axis helpers (toggleable)
- ✅ Structure filtering by systems
- ✅ Suspense with loading fallback
- ✅ High-performance rendering

### StructureModel
- ✅ GLTF/GLB model loading with caching
- ✅ DRACO compression support
- ✅ Materials based on structure type
- ✅ Hover/selection states with highlighting
- ✅ Click handling for selection
- ✅ Animated selection (pulse effect)
- ✅ Automatic cleanup

### ViewerControls
- ✅ Reset camera button
- ✅ Toggle labels button
- ✅ Zoom controls (in/out/fit)
- ✅ View presets (anterior, posterior, lateral, etc.)
- ✅ System filter toggles
- ✅ Grid toggle
- ✅ Fullscreen toggle
- ✅ Keyboard shortcuts hint

### AnatomyLabels
- ✅ 3D HTML overlay labels
- ✅ Leader lines from structure to label
- ✅ Show/hide based on visibility prop
- ✅ Click handling to select structure
- ✅ Visual feedback for selection
- ✅ Distributed positioning to minimize overlap

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (WebGL 2.0 required)
- Mobile: Optimized touch controls

## Performance Tips

1. Use model caching (enabled by default)
2. Enable DRACO compression for smaller model files
3. Limit visible structures on mobile devices
4. Use LOD (Level of Detail) for complex models
5. Hide labels on mobile for better performance
6. Reduce shadow quality on lower-end devices
