import { create } from 'zustand';

export interface ExplorerState {
  selectedStructureId: string | null;
  selectedRegion: string | null;
  viewMode: 'region' | 'system';
  labelsVisible: boolean;
  visibleSystems: string[];

  // 3D viewer state
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];

  // Actions
  selectStructure: (id: string | null) => void;
  selectRegion: (slug: string | null) => void;
  setViewMode: (mode: 'region' | 'system') => void;
  toggleLabels: () => void;
  toggleSystem: (systemId: string) => void;
  setCameraPosition: (position: [number, number, number]) => void;
  setCameraTarget: (target: [number, number, number]) => void;
  resetCamera: () => void;
  reset: () => void;
}

const DEFAULT_CAMERA_POSITION: [number, number, number] = [0, 0, 5];
const DEFAULT_CAMERA_TARGET: [number, number, number] = [0, 0, 0];

export const useExplorerStore = create<ExplorerState>((set) => ({
  // Initial state
  selectedStructureId: null,
  selectedRegion: null,
  viewMode: 'region',
  labelsVisible: true,
  visibleSystems: [],
  cameraPosition: DEFAULT_CAMERA_POSITION,
  cameraTarget: DEFAULT_CAMERA_TARGET,

  // Actions
  selectStructure: (id) =>
    set({ selectedStructureId: id }),

  selectRegion: (slug) =>
    set({ selectedRegion: slug }),

  setViewMode: (mode) =>
    set({ viewMode: mode }),

  toggleLabels: () =>
    set((state) => ({ labelsVisible: !state.labelsVisible })),

  toggleSystem: (systemId) =>
    set((state) => ({
      visibleSystems: state.visibleSystems.includes(systemId)
        ? state.visibleSystems.filter((id) => id !== systemId)
        : [...state.visibleSystems, systemId],
    })),

  setCameraPosition: (position) =>
    set({ cameraPosition: position }),

  setCameraTarget: (target) =>
    set({ cameraTarget: target }),

  resetCamera: () =>
    set({
      cameraPosition: DEFAULT_CAMERA_POSITION,
      cameraTarget: DEFAULT_CAMERA_TARGET,
    }),

  reset: () =>
    set({
      selectedStructureId: null,
      selectedRegion: null,
      viewMode: 'region',
      labelsVisible: true,
      visibleSystems: [],
      cameraPosition: DEFAULT_CAMERA_POSITION,
      cameraTarget: DEFAULT_CAMERA_TARGET,
    }),
}));
