import React from 'react';

export interface CardProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
  bookmarked?: boolean;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      subtitle,
      badge,
      icon,
      bookmarked = false,
      selected = false,
      onClick,
      className = '',
      children,
    },
    ref
  ) => {
    const baseStyles = 'bg-white border rounded-lg p-4 transition-all duration-150';

    const interactiveStyles = onClick
      ? 'cursor-pointer hover:shadow-md hover:border-[#2563EB]/30 active:scale-[0.98]'
      : '';

    const selectedStyles = selected
      ? 'border-[#2563EB] border-2 shadow-md ring-2 ring-[#2563EB]/20'
      : 'border-[#E5E7EB]';

    const combinedClassName = `${baseStyles} ${interactiveStyles} ${selectedStyles} ${className}`;

    return (
      <div
        ref={ref}
        className={combinedClassName}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {icon && (
              <div className="flex-shrink-0 text-[#6B7280] mt-1">
                {icon}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-[#1F2937] truncate">
                  {title}
                </h3>
                {badge && <div className="flex-shrink-0">{badge}</div>}
              </div>

              {subtitle && (
                <p className="text-sm text-[#6B7280] line-clamp-2">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {bookmarked && (
            <div className="flex-shrink-0 text-[#D97706]" aria-label="Bookmarked">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </div>
          )}
        </div>

        {children && (
          <div className="mt-3">
            {children}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
