import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = (callback: () => void, dependencies: unknown[] = []) => {
  const context = useRef<gsap.Context>();

  useEffect(() => {
    context.current = gsap.context(() => {
      callback();
    });

    return () => {
      context.current?.revert();
    };
  }, dependencies);
};


