import React from 'react';

export type StructureType =
  | 'bone'
  | 'muscle'
  | 'nerve'
  | 'artery'
  | 'vein'
  | 'organ'
  | 'ligament'
  | 'fascia'
  | 'other';

export interface BadgeProps {
  type: StructureType;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  type,
  label,
  size = 'md',
  className = '',
}) => {
  const typeConfig = {
    bone: {
      color: '#F5F0E6',
      textColor: '#78716C',
      label: 'Bone',
    },
    muscle: {
      color: '#C45C5C',
      textColor: '#FFFFFF',
      label: 'Muscle',
    },
    nerve: {
      color: '#E6C744',
      textColor: '#78350F',
      label: 'Nerve',
    },
    artery: {
      color: '#D64545',
      textColor: '#FFFFFF',
      label: 'Artery',
    },
    vein: {
      color: '#4571D6',
      textColor: '#FFFFFF',
      label: 'Vein',
    },
    organ: {
      color: '#7E57C2',
      textColor: '#FFFFFF',
      label: 'Organ',
    },
    ligament: {
      color: '#8D9E78',
      textColor: '#FFFFFF',
      label: 'Ligament',
    },
    fascia: {
      color: '#B8A99A',
      textColor: '#44403C',
      label: 'Fascia',
    },
    other: {
      color: '#9CA3AF',
      textColor: '#FFFFFF',
      label: 'Other',
    },
  };

  const config = typeConfig[type];
  const displayLabel = label || config.label;

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeStyles[size]} ${className}`}
      style={{
        backgroundColor: config.color,
        color: config.textColor,
      }}
    >
      {displayLabel}
    </span>
  );
};

export default Badge;
