// src/hooks/useIntersectionObserver.ts (단순한 유틸리티)
import { useEffect, useRef } from 'react';

interface UseIntersectionObserverOptions {
  onIntersect: () => void;
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionObserver({
  onIntersect,
  threshold = 0.1,
  rootMargin = '100px',
}: UseIntersectionObserverOptions) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold, rootMargin }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [onIntersect, threshold, rootMargin]);

  return { targetRef };
}
