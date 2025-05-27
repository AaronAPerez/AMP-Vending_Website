import { Suspense } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';


import { ReactNode } from 'react';

type LazySectionProps = {
  children: ReactNode;
  fallback: ReactNode;
  threshold?: number;
};

export default function LazySection({ children, fallback, threshold = 0.1 }: LazySectionProps) {
  const { ref, isVisible: isIntersecting } = useIntersectionObserver({ threshold });
  
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