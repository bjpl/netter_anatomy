/**
 * Explorer Components
 * 3D anatomy viewer and related components
 */

export { AnatomyViewer } from './AnatomyViewer';
export type { AnatomyViewerProps } from './AnatomyViewer';

export {
  StructureModel,
  preloadStructureModels,
  clearStructureModelsCache,
} from './StructureModel';
export type { StructureModelProps } from './StructureModel';

export { ViewerControls } from './ViewerControls';
export type { ViewerControlsProps } from './ViewerControls';

export {
  AnatomyLabels,
  SimpleLabel,
} from './AnatomyLabels';
export type { AnatomyLabelsProps } from './AnatomyLabels';

// Helper components for Explorer views
export { default as StructureTree } from './StructureTree';
export { default as QuickInfoPanel } from './QuickInfoPanel';
export { default as RegionCard } from './RegionCard';
export { default as SystemFilter } from './SystemFilter';
export { default as SearchResultItem } from './SearchResultItem';
