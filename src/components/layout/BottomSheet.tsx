import { ReactNode, useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  snapPoints?: number[]; // Percentages of viewport height (e.g., [0.3, 0.6, 0.9])
  initialSnapPoint?: number; // Index of initial snap point
  title?: string;
}

/**
 * BottomSheet - Mobile bottom sheet component
 *
 * Features:
 * - Swipe up/down gesture support
 * - Multiple snap points
 * - For mobile structure info panels
 * - Touch-optimized interactions
 */
export function BottomSheet({
  isOpen,
  onClose,
  children,
  snapPoints = [0.3, 0.6, 0.9],
  initialSnapPoint = 0,
  title,
}: BottomSheetProps) {
  const [currentSnapPoint, setCurrentSnapPoint] = useState(initialSnapPoint);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Calculate sheet height based on snap point
  const sheetHeight = (snapPoints[currentSnapPoint] ?? 0.3) * 100;

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    setIsDragging(true);
    setStartY(touch.clientY);
    setCurrentY(touch.clientY);
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    if (!touch) return;
    setCurrentY(touch.clientY);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaY = currentY - startY;
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight * 0.1; // 10% of viewport

    // Determine new snap point based on drag direction and distance
    if (Math.abs(deltaY) > threshold) {
      if (deltaY > 0) {
        // Swiped down
        if (currentSnapPoint === 0) {
          onClose();
        } else {
          setCurrentSnapPoint(Math.max(0, currentSnapPoint - 1));
        }
      } else {
        // Swiped up
        setCurrentSnapPoint(Math.min(snapPoints.length - 1, currentSnapPoint + 1));
      }
    }

    setStartY(0);
    setCurrentY(0);
  };

  // Calculate dynamic transform during drag
  const getDragTransform = () => {
    if (!isDragging) return 0;
    const deltaY = currentY - startY;
    // Limit drag to prevent pulling sheet above viewport
    return Math.max(0, deltaY);
  };

  // Close on backdrop click
  const handleBackdropClick = () => {
    onClose();
  };

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={handleBackdropClick}
      />

      {/* Bottom sheet */}
      <div
        ref={sheetRef}
        className={clsx(
          'absolute bottom-0 left-0 right-0 flex flex-col rounded-t-2xl bg-white shadow-hard transition-transform',
          isDragging ? 'duration-0' : 'duration-300 ease-out'
        )}
        style={{
          height: `${sheetHeight}vh`,
          transform: `translateY(${isDragging ? getDragTransform() : 0}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Handle */}
        <div className="flex flex-shrink-0 items-center justify-center py-3">
          <div className="h-1.5 w-12 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex-shrink-0 border-b border-gray-200 px-4 pb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-md p-1 hover:bg-gray-100"
                aria-label="Close"
              >
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {children}
        </div>

        {/* Snap point indicators */}
        <div className="flex flex-shrink-0 items-center justify-center space-x-2 py-2">
          {snapPoints.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSnapPoint(index)}
              className={clsx(
                'h-2 w-2 rounded-full transition-colors',
                index === currentSnapPoint ? 'bg-primary' : 'bg-gray-300'
              )}
              aria-label={`Snap to position ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
