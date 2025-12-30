/**
 * Explorer Store Tests
 * Tests for Zustand store state management
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { useExplorerStore } from '../explorerStore';

describe('Explorer Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useExplorerStore.getState().reset();
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const state = useExplorerStore.getState();

      expect(state.selectedStructureId).toBeNull();
      expect(state.selectedRegion).toBeNull();
      expect(state.viewMode).toBe('region');
      expect(state.labelsVisible).toBe(true);
      expect(state.visibleSystems).toEqual([]);
      expect(state.cameraPosition).toEqual([0, 0, 5]);
      expect(state.cameraTarget).toEqual([0, 0, 0]);
    });
  });

  describe('selectStructure', () => {
    it('should set selected structure', () => {
      const { selectStructure } = useExplorerStore.getState();

      selectStructure('structure-123');

      const state = useExplorerStore.getState();
      expect(state.selectedStructureId).toBe('structure-123');
    });

    it('should allow clearing selection', () => {
      const { selectStructure } = useExplorerStore.getState();

      selectStructure('structure-123');
      selectStructure(null);

      const state = useExplorerStore.getState();
      expect(state.selectedStructureId).toBeNull();
    });

    it('should update when called multiple times', () => {
      const { selectStructure } = useExplorerStore.getState();

      selectStructure('structure-1');
      expect(useExplorerStore.getState().selectedStructureId).toBe('structure-1');

      selectStructure('structure-2');
      expect(useExplorerStore.getState().selectedStructureId).toBe('structure-2');
    });
  });

  describe('selectRegion', () => {
    it('should set selected region', () => {
      const { selectRegion } = useExplorerStore.getState();

      selectRegion('upper-limb');

      const state = useExplorerStore.getState();
      expect(state.selectedRegion).toBe('upper-limb');
    });

    it('should allow clearing region selection', () => {
      const { selectRegion } = useExplorerStore.getState();

      selectRegion('upper-limb');
      selectRegion(null);

      const state = useExplorerStore.getState();
      expect(state.selectedRegion).toBeNull();
    });
  });

  describe('setViewMode', () => {
    it('should switch to system view mode', () => {
      const { setViewMode } = useExplorerStore.getState();

      setViewMode('system');

      const state = useExplorerStore.getState();
      expect(state.viewMode).toBe('system');
    });

    it('should switch to region view mode', () => {
      const { setViewMode } = useExplorerStore.getState();

      setViewMode('system');
      setViewMode('region');

      const state = useExplorerStore.getState();
      expect(state.viewMode).toBe('region');
    });
  });

  describe('toggleLabels', () => {
    it('should toggle labels visibility', () => {
      const { toggleLabels } = useExplorerStore.getState();

      const initialState = useExplorerStore.getState().labelsVisible;

      toggleLabels();
      expect(useExplorerStore.getState().labelsVisible).toBe(!initialState);

      toggleLabels();
      expect(useExplorerStore.getState().labelsVisible).toBe(initialState);
    });
  });

  describe('toggleSystem', () => {
    it('should add system to visible systems', () => {
      const { toggleSystem } = useExplorerStore.getState();

      toggleSystem('skeletal');

      const state = useExplorerStore.getState();
      expect(state.visibleSystems).toContain('skeletal');
    });

    it('should remove system from visible systems', () => {
      const { toggleSystem } = useExplorerStore.getState();

      toggleSystem('skeletal');
      toggleSystem('skeletal');

      const state = useExplorerStore.getState();
      expect(state.visibleSystems).not.toContain('skeletal');
    });

    it('should handle multiple systems', () => {
      const { toggleSystem } = useExplorerStore.getState();

      toggleSystem('skeletal');
      toggleSystem('muscular');
      toggleSystem('nervous');

      const state = useExplorerStore.getState();
      expect(state.visibleSystems).toEqual(['skeletal', 'muscular', 'nervous']);
    });

    it('should maintain other systems when toggling one off', () => {
      const { toggleSystem } = useExplorerStore.getState();

      toggleSystem('skeletal');
      toggleSystem('muscular');
      toggleSystem('skeletal');

      const state = useExplorerStore.getState();
      expect(state.visibleSystems).toEqual(['muscular']);
    });
  });

  describe('setCameraPosition', () => {
    it('should update camera position', () => {
      const { setCameraPosition } = useExplorerStore.getState();

      setCameraPosition([10, 20, 30]);

      const state = useExplorerStore.getState();
      expect(state.cameraPosition).toEqual([10, 20, 30]);
    });

    it('should handle negative coordinates', () => {
      const { setCameraPosition } = useExplorerStore.getState();

      setCameraPosition([-5, -10, -15]);

      const state = useExplorerStore.getState();
      expect(state.cameraPosition).toEqual([-5, -10, -15]);
    });
  });

  describe('setCameraTarget', () => {
    it('should update camera target', () => {
      const { setCameraTarget } = useExplorerStore.getState();

      setCameraTarget([1, 2, 3]);

      const state = useExplorerStore.getState();
      expect(state.cameraTarget).toEqual([1, 2, 3]);
    });
  });

  describe('resetCamera', () => {
    it('should reset camera to default position and target', () => {
      const { setCameraPosition, setCameraTarget, resetCamera } =
        useExplorerStore.getState();

      // Change camera position and target
      setCameraPosition([100, 200, 300]);
      setCameraTarget([50, 50, 50]);

      // Reset
      resetCamera();

      const state = useExplorerStore.getState();
      expect(state.cameraPosition).toEqual([0, 0, 5]);
      expect(state.cameraTarget).toEqual([0, 0, 0]);
    });
  });

  describe('reset', () => {
    it('should reset all state to initial values', () => {
      const {
        selectStructure,
        selectRegion,
        setViewMode,
        toggleLabels,
        toggleSystem,
        setCameraPosition,
        reset,
      } = useExplorerStore.getState();

      // Modify all state
      selectStructure('structure-1');
      selectRegion('upper-limb');
      setViewMode('system');
      toggleLabels();
      toggleSystem('skeletal');
      setCameraPosition([10, 20, 30]);

      // Reset
      reset();

      const state = useExplorerStore.getState();
      expect(state.selectedStructureId).toBeNull();
      expect(state.selectedRegion).toBeNull();
      expect(state.viewMode).toBe('region');
      expect(state.labelsVisible).toBe(true);
      expect(state.visibleSystems).toEqual([]);
      expect(state.cameraPosition).toEqual([0, 0, 5]);
      expect(state.cameraTarget).toEqual([0, 0, 0]);
    });
  });

  describe('Store Reactivity', () => {
    it('should notify subscribers on state change', () => {
      let callCount = 0;

      const unsubscribe = useExplorerStore.subscribe(() => {
        callCount++;
      });

      const { selectStructure } = useExplorerStore.getState();
      selectStructure('structure-1');

      expect(callCount).toBeGreaterThan(0);

      unsubscribe();
    });

    it('should allow selective subscription', () => {
      let selectedStructureCallCount = 0;

      // Zustand's subscribe with selector works differently
      // The callback is called on ANY state change, not just the selected property
      const unsubscribe = useExplorerStore.subscribe(() => {
        const currentStructureId = useExplorerStore.getState().selectedStructureId;
        if (currentStructureId !== null) {
          selectedStructureCallCount++;
        }
      });

      const { selectStructure, toggleLabels } = useExplorerStore.getState();

      // This should trigger subscription and increment counter
      selectStructure('structure-1');

      // This triggers subscription but doesn't increment counter (structure still selected)
      toggleLabels();

      expect(selectedStructureCallCount).toBeGreaterThanOrEqual(1);

      unsubscribe();
    });
  });

  describe('State Immutability', () => {
    it('should not mutate arrays directly', () => {
      const { toggleSystem } = useExplorerStore.getState();

      const initialSystems = useExplorerStore.getState().visibleSystems;

      toggleSystem('skeletal');

      const updatedSystems = useExplorerStore.getState().visibleSystems;

      // Should be different array instances
      expect(updatedSystems).not.toBe(initialSystems);
    });

    it('should preserve array reference when no change occurs', () => {
      const initialSystems = useExplorerStore.getState().visibleSystems;

      // No change operation
      useExplorerStore.getState().selectStructure('test');

      const unchangedSystems = useExplorerStore.getState().visibleSystems;

      // Array reference should be the same since visibleSystems didn't change
      expect(unchangedSystems).toBe(initialSystems);
    });
  });
});
