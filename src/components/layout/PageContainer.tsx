import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface PageContainerProps {
  children: ReactNode;
  breadcrumbs?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

/**
 * PageContainer - Page wrapper component
 *
 * Features:
 * - Max-width container
 * - Responsive padding
 * - Breadcrumb slot
 * - Configurable max-width
 */
export function PageContainer({
  children,
  breadcrumbs,
  maxWidth = 'xl',
  className,
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1440px]',
    full: 'max-w-full',
  };

  return (
    <div className={clsx('mx-auto w-full px-4 py-6 sm:px-6 lg:px-8', maxWidthClasses[maxWidth], className)}>
      {/* Breadcrumbs */}
      {breadcrumbs && (
        <div className="mb-6">
          {breadcrumbs}
        </div>
      )}

      {/* Page content */}
      {children}
    </div>
  );
}

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}

/**
 * Breadcrumb - Navigation breadcrumb component
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg
                className="mx-2 h-4 w-4 flex-shrink-0 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {item.href ? (
              <a
                href={item.href}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-sm font-medium text-gray-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
