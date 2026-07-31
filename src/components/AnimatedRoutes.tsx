import React, { useEffect, useRef } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { LinksPage } from '../pages/LinksPage';
import { SearchPage } from '../pages/SearchPage';
import { WikiRedirect } from '../pages/WikiRedirect';

export const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;

    gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }
    );

    return () => {
      gsap.killTweensOf(element);
    };
  }, [location.pathname]);

  return (
    <div ref={containerRef}>
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/wiki-redirect" element={<WikiRedirect />} />
      </Routes>
    </div>
  );
};