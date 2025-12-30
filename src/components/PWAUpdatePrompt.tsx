import { useEffect, useState } from 'react';
import { usePWA } from '@/hooks/usePWA';
import { RefreshCw, Download, X } from 'lucide-react';

/**
 * Component to prompt user for PWA updates and installation
 */
export function PWAUpdatePrompt() {
  const { updateAvailable, canInstall, installApp, updateApp } = usePWA();
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    if (updateAvailable) {
      setShowUpdatePrompt(true);
    }
  }, [updateAvailable]);

  useEffect(() => {
    if (canInstall) {
      // Show install prompt after a short delay
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [canInstall]);

  const handleUpdate = () => {
    updateApp();
    setShowUpdatePrompt(false);
  };

  const handleInstall = async () => {
    const accepted = await installApp();
    if (accepted) {
      setShowInstallPrompt(false);
    }
  };

  if (showUpdatePrompt) {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-sm">
        <div className="rounded-lg bg-blue-600 p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <RefreshCw className="h-6 w-6 flex-shrink-0 text-white" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">
                Update Available
              </h3>
              <p className="mt-1 text-sm text-blue-100">
                A new version is ready to install.
              </p>
            </div>
            <button
              onClick={() => setShowUpdatePrompt(false)}
              className="flex-shrink-0 text-blue-100 hover:text-white"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleUpdate}
              className="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
            >
              Update Now
            </button>
            <button
              onClick={() => setShowUpdatePrompt(false)}
              className="flex-1 rounded-md border border-blue-400 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showInstallPrompt) {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-sm">
        <div className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <Download className="h-6 w-6 flex-shrink-0 text-white" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">
                Install Netter's Anatomy
              </h3>
              <p className="mt-1 text-sm text-blue-100">
                Install this app for quick access and offline use.
              </p>
            </div>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="flex-shrink-0 text-blue-100 hover:text-white"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleInstall}
              className="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
            >
              Install
            </button>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="flex-1 rounded-md border border-blue-400 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Not Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
