/**
 * Client-Only Wrapper Component
 * 
 * This component renders children only on the client side,
 * preventing hydration mismatches for problematic components.
 */
'use client';

import React, { useEffect, useState } from 'react';
import { HydrationSafeImage } from './HydrationSafeImage';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * ClientOnly Component
 * 
 * Renders children only after the component has mounted on the client.
 * This prevents hydration mismatches for components that behave differently
 * on server vs client.
 */
export const ClientOnly = ({ children, fallback = null }: ClientOnlyProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

/**
 * NoSSR Component (Alternative name)
 * 
 * Same functionality as ClientOnly, just a different name.
 */
export const NoSSR = ClientOnly;

/**
 * ImageWithNoSSR Component
 * 
 * Specialized wrapper for images that cause hydration issues.
 */
interface ImageWithNoSSRProps {
  children: React.ReactNode;
  fallbackSrc?: string;
  fallbackAlt?: string;
  fallbackWidth?: number;
  fallbackHeight?: number;
}

export const ImageWithNoSSR = ({ 
  children, 
  fallbackSrc = '/images/placeholder.jpg',
  fallbackAlt = 'Loading...',
  fallbackWidth = 400,
  fallbackHeight = 300,
}: ImageWithNoSSRProps) => {
  return (
    <ClientOnly
      fallback={
        <div className="w-full h-full bg-[#4d4d4d] flex items-center justify-center">
          <HydrationSafeImage
            src={fallbackSrc}
            alt={fallbackAlt}
            width={fallbackWidth}
            height={fallbackHeight}
            className="w-full h-full object-cover opacity-50"
          />
        </div>
      }
    >
      {children}
    </ClientOnly>
  );
};