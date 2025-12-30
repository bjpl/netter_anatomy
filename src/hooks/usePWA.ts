import { useState, useEffect, useCallback } from 'react';
import { pwaManager } from '@/lib/pwa';
import type { UpdateAvailableEvent } from '@/lib/pwa';

/**
 * Hook for PWA functionality
 */
export function usePWA() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [storageEstimate, setStorageEstimate] = useState<{
    usage: number;
    quota: number;
    percentage: number;
  } | null>(null);

  useEffect(() => {
    // Register service worker
    pwaManager.register();

    // Check if install is available
    setCanInstall(pwaManager.canInstall());

    // Listen for updates
    pwaManager.onUpdateAvailable((event: UpdateAvailableEvent) => {
      setUpdateAvailable(event.isUpdate);
    });

    // Listen for online/offline events
    const removeOnlineListener = pwaManager.onOnline(() => {
      setIsOnline(true);
    });

    const removeOfflineListener = pwaManager.onOffline(() => {
      setIsOnline(false);
    });

    // Get storage estimate
    pwaManager.getStorageEstimate().then((estimate) => {
      setStorageEstimate(estimate);
    });

    return () => {
      removeOnlineListener();
      removeOfflineListener();
    };
  }, []);

  const installApp = useCallback(async () => {
    const accepted = await pwaManager.showInstallPrompt();
    if (accepted) {
      setCanInstall(false);
    }
    return accepted;
  }, []);

  const updateApp = useCallback(() => {
    pwaManager.skipWaiting();
  }, []);

  const refreshStorageEstimate = useCallback(async () => {
    const estimate = await pwaManager.getStorageEstimate();
    setStorageEstimate(estimate);
    return estimate;
  }, []);

  const clearAllCaches = useCallback(async () => {
    await pwaManager.clearCaches();
    await refreshStorageEstimate();
  }, [refreshStorageEstimate]);

  return {
    updateAvailable,
    canInstall,
    isOnline,
    storageEstimate,
    installApp,
    updateApp,
    refreshStorageEstimate,
    clearAllCaches,
  };
}
