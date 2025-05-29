/**
 * Hydration-Safe Image Components
 * 
 * These components ensure consistent rendering between server and client
 * to prevent hydration mismatches with Next.js Image components.
 */
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface HydrationSafeImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  useFill?: boolean;
}

/**
 * HydrationSafeImage Component
 * 
 * Prevents hydration mismatches by ensuring consistent image rendering
 * between server and client. Uses a mounted state to control rendering.
 */
export const HydrationSafeImage = ({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  objectFit = 'cover',
  useFill = false,
}: HydrationSafeImageProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // During SSR and initial client render, use consistent props
  if (!isMounted) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} object-${objectFit}`}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  // After hydration, render based on useFill prop
  if (useFill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`${className} object-${objectFit}`}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} object-${objectFit}`}
      priority={priority}
      sizes={sizes}
    />
  );
};

/**
 * ProductGridImage Component
 * 
 * Specialized component for product grid images that prevents hydration issues.
 */
interface ProductGridImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const ProductGridImage = ({
  src,
  alt,
  className = '',
  priority = false,
}: ProductGridImageProps) => {
  return (
    <div className={`relative w-full h-48 overflow-hidden ${className}`}>
      <HydrationSafeImage
        src={src}
        alt={alt}
        width={20}
        height={30}
        className="w-full h-full"
        priority={priority}
        objectFit="cover"
        useFill={false} // Always use width/height for consistency
      />
    </div>
  );
};

/**
 * HeroBackgroundImage Component
 * 
 * For hero section background images with consistent rendering.
 */
interface HeroBackgroundImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const HeroBackgroundImage = ({
  src,
  alt,
  className = '',
  priority = true,
}: HeroBackgroundImageProps) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <HydrationSafeImage
        src={src}
        alt={alt}
        width={800}
        height={600}
        className="w-full h-full"
        priority={priority}
        objectFit="cover"
        useFill={false} // Consistent rendering
        sizes="100vw"
      />
    </div>
  );
};

/**
 * ClientOnly Component
 * 
 * Renders children only after the component has mounted on the client.
 */
interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

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