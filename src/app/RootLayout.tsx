import { Outlet } from 'react-router-dom';
import { Navigation } from '@/components/layout/Navigation';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

/**
 * Root layout component for the application
 * Provides consistent layout structure across all pages
 */
export function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
}
