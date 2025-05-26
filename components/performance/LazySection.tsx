import { lazy, Suspense } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const LazyProductSection = lazy(() => import('@/components/sections/ProductSection'));

export default function LazySection({ children, fallback, threshold = 0.1 }) {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold });
  
  return (
    <div ref={ref}>
      {isIntersecting ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : null}
    </div>
  );
}