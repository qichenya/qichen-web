import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGsapReveal = <T extends HTMLElement = HTMLDivElement>() => {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const scope = containerRef.current;
    if (!scope) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const elements = scope.querySelectorAll<HTMLElement>('[data-gsap-reveal]');
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        const delay = parseFloat(el.dataset.gsapDelay || '0');
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return containerRef;
};

export const useMagnetic = <T extends HTMLElement = HTMLButtonElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const strength = 0.35;
    let rafId: number;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        gsap.to(el, {
          x: x * strength,
          y: y * strength,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    };

    const handleLeave = () => {
      cancelAnimationFrame(rafId);
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return ref;
};

export const useGsapParallax = <T extends HTMLElement = HTMLDivElement>(distance = 80) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [distance]);

  return ref;
};