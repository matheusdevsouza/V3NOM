import { useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useGSAP } from '@/hooks/useGSAP';
import { Glow } from '../Glow/Glow';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const { theme } = useTheme();
  const logoRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        opacity: 0.9,
        scale: 1,
        duration: 2.5,
        ease: 'expo.out',
      });
    }

    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: '90%',
          scrub: 1.5,
        },
        scale: 1.1,
        opacity: 0,
        y: -30,
      });
    }
  }, []);

  useEffect(() => {
    if (logoRef.current) {
      const newSrc = theme === 'light' 
        ? '/images/brand/3d-b.png' 
        : '/images/brand/3d-w.png';
      
      const currentSrc = logoRef.current.src || '';
      const expectedSrc = newSrc.split('?')[0];
      
      if (!currentSrc.includes(expectedSrc)) {
        logoRef.current.src = `${newSrc}?t=${Date.now()}`;
      }
    }
  }, [theme]);

  const logoSrc = theme === 'light' ? '/images/brand/3d-b.png' : '/images/brand/3d-w.png';

  return (
    <section className="h-screen w-full flex items-center justify-center relative overflow-hidden" id="hero">
      <Glow width="600px" height="600px" top="20%" left="10%" delay="0s" />
      <Glow width="500px" height="500px" bottom="15%" right="15%" delay="1.5s" />

      <div
        ref={wrapperRef}
        id="heroLogoWrapper"
        className="relative z-10 init-hidden scale-95 origin-center flex justify-center items-center"
      >
        <img
          key={`${theme}-${logoSrc}`}
          ref={logoRef}
          src={logoSrc}
          alt="V3NOM"
          className="v3nom-logo-hero select-none"
          id="heroLogo"
          data-light-src="/images/brand/3d-b.png"
          data-dark-src="/images/brand/3d-w.png"
        />
      </div>
    </section>
  );
};
