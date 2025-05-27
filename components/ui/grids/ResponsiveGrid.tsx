import React from 'react';

interface ResponsiveGridProps {
  /**
   * Column configuration for different breakpoints
   */
  cols: {
    xs?: number; // mobile (default: 1)
    sm?: number; // small tablets (default: inherited from xs)
    md?: number; // tablets (default: inherited from sm)
    lg?: number; // desktops (default: inherited from md)
    xl?: number; // large desktops (default: inherited from lg)
  };
  
  /**
   * Gap between grid items
   * Accepts Tailwind gap classes e.g. 'gap-4'
   */
  gap?: string;
  
  /**
   * Children to render in the grid
   */
  children: React.ReactNode;
  
  /**
   * Optional className for additional styling
   */
  className?: string;
}

/**
 * ResponsiveGrid Component
 * A responsive grid layout that adapts to different screen sizes
 */
const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  cols = { xs: 1 },
  gap = 'gap-6',
  children,
  className = ''
}) => {
  // Build grid column classes based on the cols prop
  const gridCols = [
    cols.xs ? `grid-cols-${cols.xs}` : 'grid-cols-1',
    cols.sm ? `sm:grid-cols-${cols.sm}` : '',
    cols.md ? `md:grid-cols-${cols.md}` : '',
    cols.lg ? `lg:grid-cols-${cols.lg}` : '',
    cols.xl ? `xl:grid-cols-${cols.xl}` : ''
  ].filter(Boolean).join(' ');
  
  return (
    <div className={`grid ${gridCols} ${gap} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;