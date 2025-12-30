/**
 * TypeScript type definitions for PWA features
 */

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export interface StorageManagerExtended extends StorageManager {
  estimate(): Promise<StorageEstimate>;
  persist(): Promise<boolean>;
  persisted(): Promise<boolean>;
}

export interface NavigatorWithStorage extends Navigator {
  storage: StorageManagerExtended;
}

export interface StorageEstimate {
  quota?: number;
  usage?: number;
  usageDetails?: {
    indexedDB?: number;
    caches?: number;
    serviceWorkerRegistrations?: number;
  };
}

export interface CacheStorageInfo {
  name: string;
  size: number;
  keys: string[];
}

export interface PWAInstallationState {
  canInstall: boolean;
  isInstalled: boolean;
  isPWA: boolean;
}

export interface ServiceWorkerUpdateState {
  hasUpdate: boolean;
  isUpdating: boolean;
  updateAvailable: boolean;
}

export interface NetworkState {
  online: boolean;
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
