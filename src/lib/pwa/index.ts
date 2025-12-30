import { Workbox } from 'workbox-window';

/**
 * PWA utilities for service worker management and PWA features
 */

export interface UpdateAvailableEvent {
  isUpdate: boolean;
  registration?: ServiceWorkerRegistration;
}

export interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

class PWAManager {
  private wb: Workbox | null = null;
  private updateCallback: ((event: UpdateAvailableEvent) => void) | null = null;
  private installPrompt: InstallPromptEvent | null = null;
  private onlineCallbacks: Set<() => void> = new Set();
  private offlineCallbacks: Set<() => void> = new Set();

  constructor() {
    this.setupNetworkListeners();
    this.setupInstallPrompt();
  }

  /**
   * Register the service worker
   */
  async register(): Promise<ServiceWorkerRegistration | undefined> {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service workers are not supported');
      return undefined;
    }

    try {
      this.wb = new Workbox('/sw.js', {
        scope: '/',
      });

      // Handle service worker updates
      this.wb.addEventListener('waiting', () => {
        this.handleUpdate();
      });

      this.wb.addEventListener('controlling', () => {
        window.location.reload();
      });

      this.wb.addEventListener('activated', (event) => {
        // If the service worker was updated, reload the page
        if (!event.isUpdate) {
          console.log('Service worker activated for the first time');
        }
      });

      const registration = await this.wb.register();
      console.log('Service worker registered successfully');
      return registration;
    } catch (error) {
      console.error('Service worker registration failed:', error);
      return undefined;
    }
  }

  /**
   * Handle service worker updates
   */
  private handleUpdate(): void {
    if (this.updateCallback && this.wb) {
      this.updateCallback({
        isUpdate: true,
        registration: this.wb.getSW() as any,
      });
    }
  }

  /**
   * Set callback for when an update is available
   */
  onUpdateAvailable(callback: (event: UpdateAvailableEvent) => void): void {
    this.updateCallback = callback;
  }

  /**
   * Skip waiting and activate new service worker
   */
  skipWaiting(): void {
    if (this.wb) {
      this.wb.messageSkipWaiting();
    }
  }

  /**
   * Setup install prompt handling
   */
  private setupInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.installPrompt = e as InstallPromptEvent;
    });
  }

  /**
   * Show install prompt
   */
  async showInstallPrompt(): Promise<boolean> {
    if (!this.installPrompt) {
      console.warn('Install prompt not available');
      return false;
    }

    try {
      await this.installPrompt.prompt();
      const { outcome } = await this.installPrompt.userChoice;
      this.installPrompt = null;
      return outcome === 'accepted';
    } catch (error) {
      console.error('Install prompt failed:', error);
      return false;
    }
  }

  /**
   * Check if install prompt is available
   */
  canInstall(): boolean {
    return this.installPrompt !== null;
  }

  /**
   * Setup network status listeners
   */
  private setupNetworkListeners(): void {
    window.addEventListener('online', () => {
      this.onlineCallbacks.forEach((cb) => cb());
    });

    window.addEventListener('offline', () => {
      this.offlineCallbacks.forEach((cb) => cb());
    });
  }

  /**
   * Add online status listener
   */
  onOnline(callback: () => void): () => void {
    this.onlineCallbacks.add(callback);
    return () => this.onlineCallbacks.delete(callback);
  }

  /**
   * Add offline status listener
   */
  onOffline(callback: () => void): () => void {
    this.offlineCallbacks.add(callback);
    return () => this.offlineCallbacks.delete(callback);
  }

  /**
   * Check if the app is currently online
   */
  isOnline(): boolean {
    return navigator.onLine;
  }

  /**
   * Clear all caches
   */
  async clearCaches(): Promise<void> {
    if (!('caches' in window)) {
      return;
    }

    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
      console.log('All caches cleared');
    } catch (error) {
      console.error('Failed to clear caches:', error);
      throw error;
    }
  }

  /**
   * Get cache storage estimate
   */
  async getStorageEstimate(): Promise<{
    usage: number;
    quota: number;
    percentage: number;
  } | null> {
    if (!('storage' in navigator && 'estimate' in navigator.storage)) {
      return null;
    }

    try {
      const estimate = await navigator.storage.estimate();
      const usage = estimate.usage || 0;
      const quota = estimate.quota || 0;
      const percentage = quota > 0 ? (usage / quota) * 100 : 0;

      return {
        usage,
        quota,
        percentage,
      };
    } catch (error) {
      console.error('Failed to get storage estimate:', error);
      return null;
    }
  }

  /**
   * Request persistent storage
   */
  async requestPersistentStorage(): Promise<boolean> {
    if (!('storage' in navigator && 'persist' in navigator.storage)) {
      return false;
    }

    try {
      const isPersisted = await navigator.storage.persist();
      console.log(`Persistent storage ${isPersisted ? 'granted' : 'denied'}`);
      return isPersisted;
    } catch (error) {
      console.error('Failed to request persistent storage:', error);
      return false;
    }
  }

  /**
   * Check if storage is persisted
   */
  async isStoragePersisted(): Promise<boolean> {
    if (!('storage' in navigator && 'persisted' in navigator.storage)) {
      return false;
    }

    try {
      return await navigator.storage.persisted();
    } catch (error) {
      console.error('Failed to check storage persistence:', error);
      return false;
    }
  }

  /**
   * Unregister service worker
   */
  async unregister(): Promise<boolean> {
    if (!('serviceWorker' in navigator)) {
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const success = await registration.unregister();
      console.log(`Service worker ${success ? 'unregistered' : 'failed to unregister'}`);
      return success;
    } catch (error) {
      console.error('Failed to unregister service worker:', error);
      return false;
    }
  }
}

// Export singleton instance
export const pwaManager = new PWAManager();

// Export utility functions
export const registerServiceWorker = () => pwaManager.register();
export const skipWaiting = () => pwaManager.skipWaiting();
export const showInstallPrompt = () => pwaManager.showInstallPrompt();
export const canInstall = () => pwaManager.canInstall();
export const isOnline = () => pwaManager.isOnline();
export const clearCaches = () => pwaManager.clearCaches();
export const getStorageEstimate = () => pwaManager.getStorageEstimate();
export const requestPersistentStorage = () => pwaManager.requestPersistentStorage();
export const isStoragePersisted = () => pwaManager.isStoragePersisted();
