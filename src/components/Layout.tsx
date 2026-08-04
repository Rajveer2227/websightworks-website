import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppWidget from './WhatsAppWidget';
import BackToTop from './BackToTop';
import { initScrollReveal, cleanupScrollReveal } from '../utils/scrollReveal';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Deceleration ease curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis; // Expose instance for ScrollTrigger synchronization

    // Reset scroll position to top instantly and prevent browser scroll restoration on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true });

    // Synchronize Lenis scroll updates with GSAP ScrollTrigger globally
    const updateScrollTrigger = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', updateScrollTrigger);

    let rafId: number;
    const updateRaf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(updateRaf);
    };
    rafId = requestAnimationFrame(updateRaf);

    return () => {
      lenis.off('scroll', updateScrollTrigger);
      lenis.destroy();
      cancelAnimationFrame(rafId);
      (window as any).lenis = null;
    };
  }, []);

  // Reset scroll to top immediately and initialize scroll reveals on page route change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    // Initialize Scroll Reveal synchronously so elements are hidden before browser paint
    initScrollReveal();
    ScrollTrigger.refresh();

    // Defer a refresh slightly to let React finish rendering any dynamic layouts or image heights
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      cleanupScrollReveal();
    };
  }, [location.pathname]);

  return (
    <div className="layout-root">
      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Persistent Floating Header */}
      <Navbar />

      {/* Main Page Content Body */}
      <main id="main-content" className="page-fade-in" key={location.pathname}>
        {children}
      </main>

      {/* Persistent Footer */}
      <Footer />

      {/* Global Floating WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Global Bottom-Left Back To Top Button */}
      <BackToTop />

      <style>{`
        .layout-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        #main-content {
          flex-grow: 1;
          margin-top: 0;
          position: relative;
        }
      `}</style>
    </div>
  );
}
