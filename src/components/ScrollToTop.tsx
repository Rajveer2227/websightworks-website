import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Instantly resets scroll position to top on every route change.
 * Prevents jitter caused by inheriting the previous page's scroll offset.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use scrollTo with behavior: 'instant' to avoid any smooth-scroll animation
    // fighting with the new page render (which causes the jitter)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
