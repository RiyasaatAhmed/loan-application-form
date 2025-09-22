import { useEffect, useRef } from "react";
import { useIsElementIntersecting } from "./use-is-element-intersecting";

type UseInfiniteScrollReturn = [
  React.RefObject<HTMLDivElement | null>,
  boolean
];

export function useInfiniteScroll(
  options?: IntersectionObserverInit
): UseInfiniteScrollReturn {
  const [isIntersecting, setTarget] = useIsElementIntersecting(options);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTarget(ref.current);
  }, [setTarget]);

  return [ref, isIntersecting];
}
