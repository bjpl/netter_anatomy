import React from 'react';

export interface ProgressBarProps {
  value: number; // 0-100
  variant?: 'linear' | 'circular';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  color?: 'primary' | 'success' | 'warning';
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  variant = 'linear',
  size = 'md',
  showLabel = false,
  label,
  color = 'primary',
  className = '',
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const colorStyles = {
    primary: 'bg-[#2563EB]',
    success: 'bg-[#059669]',
    warning: 'bg-[#D97706]',
  };

  if (variant === 'circular') {
    const sizeMap = {
      sm: { size: 48, strokeWidth: 4, fontSize: 'text-xs' },
      md: { size: 64, strokeWidth: 6, fontSize: 'text-sm' },
      lg: { size: 96, strokeWidth: 8, fontSize: 'text-lg' },
    };

    const { size: circleSize, strokeWidth, fontSize } = sizeMap[size];
    const radius = (circleSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (clampedValue / 100) * circumference;

    return (
      <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
        <div className="relative" style={{ width: circleSize, height: circleSize }}>
          <svg
            width={circleSize}
            height={circleSize}
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={radius}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth={strokeWidth}
            />
            {/* Progress circle */}
            <circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className={`transition-all duration-300 ${
                color === 'primary'
                  ? 'text-[#2563EB]'
                  : color === 'success'
                  ? 'text-[#059669]'
                  : 'text-[#D97706]'
              }`}
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-semibold text-[#1F2937] ${fontSize}`}>
              {Math.round(clampedValue)}%
            </span>
          </div>
        </div>
        {label && (
          <span className="text-sm text-[#6B7280] text-center">{label}</span>
        )}
      </div>
    );
  }

  // Linear variant
  const heightMap = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showLabel) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className="text-sm text-[#6B7280]">{label}</span>}
          {showLabel && (
            <span className="text-sm font-medium text-[#1F2937]">
              {Math.round(clampedValue)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-[#E5E7EB] rounded-full overflow-hidden ${heightMap[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-300 ${colorStyles[color]}`}
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
