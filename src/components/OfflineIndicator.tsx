import { usePWA } from '@/hooks/usePWA';
import { WifiOff, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Component to show offline/online status
 */
export function OfflineIndicator() {
  const { isOnline } = usePWA();
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    // Only show indicator when status changes
    if (!isOnline) {
      setShowIndicator(true);
      return undefined;
    } else {
      // Show "back online" message briefly
      setShowIndicator(true);
      const timer = setTimeout(() => {
        setShowIndicator(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  if (!showIndicator) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <div
        className={`flex items-center gap-2 rounded-full px-4 py-2 shadow-lg ${
          isOnline
            ? 'bg-green-600 text-white'
            : 'bg-amber-600 text-white'
        }`}
      >
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4" />
            <span className="text-sm font-medium">Back online</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            <span className="text-sm font-medium">You're offline</span>
          </>
        )}
      </div>
    </div>
  );
}
