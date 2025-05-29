import React from 'react';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
}

/**
 * ResponsiveGrid Component
 * 
 * Creates a responsive grid layout that adjusts column counts
 * based on viewport size
 */
const ResponsiveGrid = ({
  children,
  className = '',
  cols = { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 },
  gap = 'gap-6'
}: ResponsiveGridProps) => {
  // Construct grid template columns classes
  const gridCols = [
    cols.xs && `grid-cols-${cols.xs}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`
  ].filter(Boolean).join(' ');
  
  return (
    <div className={`grid ${gridCols} ${gap} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;