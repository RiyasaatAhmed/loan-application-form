import { useCallback, useEffect, useRef, useState } from "react";

type UseIsElementIntersectingReturn = [
  boolean,
  (target: Element | null) => void
];

export function useIsElementIntersecting(
  options?: IntersectionObserverInit
): UseIsElementIntersectingReturn {
  const [isIntersecting, setIntersecting] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const createIntersectionObserver = useCallback(
    (target: Element, options?: IntersectionObserverInit): void => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(([entry]) => {
        setIntersecting(entry.isIntersecting);
      }, options);
      observer.current.observe(target);
    },
    []
  );

  useEffect((): (() => void) => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }
    };
  }, []);

  const optionsRef = useRef(options);
  optionsRef.current = options;

  return [
    isIntersecting,
    (target: Element | null): void => {
      if (target) {
        createIntersectionObserver(target, optionsRef.current);
      } else if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }
    },
  ];
}
