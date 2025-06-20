// components/machines/LazyMachineGrid.tsx - Heavy Component Example

'use client';

import React from 'react';
import { ViewportLazy } from '../LazyLoading';
import { SectionLoadingFallback } from '@/components/ui/loading/LoadingFallbacks';


// Lazy load the heavy machine grid component
const MachineGrid = React.lazy(() => 
  import('./MachineCard').then(module => ({
    default: module.MachineGrid
  }))
);

interface LazyMachineGridProps {
  machines: any[]; // Replace with proper type
  variant?: 'grid' | 'showcase';
  className?: string;
}

/**
 * Lazy-loaded machine grid with viewport detection
 */
export default function LazyMachineGrid({ 
  machines, 
  variant = 'grid', 
  className = '' 
}: LazyMachineGridProps) {
  return (
    <ViewportLazy
      threshold={0.1}
      rootMargin="200px"
      fallback={<MachineGridSkeleton />}
      className={className}
    >
      <React.Suspense fallback={<MachineGridSkeleton />}>
        <MachineGrid 
          machines={machines} 
          variant={variant} 
          className={className}
        />
      </React.Suspense>
    </ViewportLazy>
  );
}

// Skeleton for machine grid
const MachineGridSkeleton = React.memo(() => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-[#333333] h-96 rounded-lg animate-pulse" />
    ))}
  </div>
));

MachineGridSkeleton.displayName = 'MachineGridSkeleton';