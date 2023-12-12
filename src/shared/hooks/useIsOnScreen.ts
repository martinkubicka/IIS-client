/**
 * @file userIsOnScreen.ts
 * @author { Dominik Petrik (xpetri25) }
 * @date 17.12.2023
 * @brief Definition of userIsOnScreen hook
 */

import { RefObject, useEffect, useRef, useState } from "react";

export default function useOnScreen(ref: RefObject<HTMLElement>) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting)
    );
  }, []);

  useEffect(() => {
    observerRef.current?.observe(ref.current as HTMLElement);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [ref]);

  return isOnScreen;
}
