import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Laptop, ShoppingBag, Cpu, Sparkles, BarChart3, Share2, Palette, Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { services } from '../data/serviceData';

const iconMap: Record<string, any> = {
  Laptop,
  ShoppingBag,
  Cpu,
  Sparkles,
  BarChart3,
  Share2,
  Palette,
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [preloaderComplete, setPreloaderComplete] = useState(() => !!(window as any).preloaderComplete);
  const location = useLocation();

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (window.scrollY > 80) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsMegaOpen(false);
  }, [location.pathname]);

  // Listen to preloader complete event to show navbar
  useEffect(() => {
    if (preloaderComplete) return;

    const handlePreloaderComplete = () => {
      setPreloaderComplete(true);
    };

    window.addEventListener('preloader-complete', handlePreloaderComplete);
    return () => {
      window.removeEventListener('preloader-complete', handlePreloaderComplete);
    };
  }, [preloaderComplete]);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const isHomePage = location.pathname === '/';
  const isPreloaderActive = isHomePage && !preloaderComplete;

  return (
    <>
      <nav 
        className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''} ${isPreloaderActive ? 'preloader-hidden' : ''} ${(['/contact', '/about'].includes(location.pathname) || location.pathname.startsWith('/projects') || location.pathname.startsWith('/expertise')) && !isScrolled ? 'theme-light' : ''}`}
        style={isPreloaderActive ? { opacity: 0, pointerEvents: 'none', visibility: 'hidden' } : undefined}
      >
        <div className="container navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo" aria-label="Websight Works Home">
            <img src="/logo/wesightworkwhite.png" alt="Websight Works Logo" className="navbar-logo-img" />
          </Link>

          {/* Navigation Links (Desktop) */}
          <ul className="navbar-links">
            <li>
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
                About
              </Link>
            </li>
            <li 
              className="nav-link-dropdown"
              onMouseEnter={() => setIsMegaOpen(true)}
              onMouseLeave={() => setIsMegaOpen(false)}
            >
              <button 
                className={`nav-link dropdown-toggle ${isActive('/expertise') ? 'active' : ''}`}
                aria-expanded={isMegaOpen}
                aria-haspopup="true"
              >
                Expertise <ChevronDown size={14} className={`dropdown-arrow ${isMegaOpen ? 'open' : ''}`} />
              </button>

              {/* Glass Mega Menu */}
              <div className={`mega-menu-dropdown glass-panel ${isMegaOpen ? 'open' : ''}`}>
                <div className="mega-menu-grid">
                  <div className="mega-menu-sidebar">
                    <span className="sidebar-tag">Our Expertise</span>
                    <h4 className="serif-heading">Digital Solutions.<br /><span style={{ display: 'block', whiteSpace: 'nowrap' }}>Engineered Right.</span></h4>
                    <p>Everything your business needs to build, launch, and grow digitally.</p>
                    <Link to="/contact" className="sidebar-btn" onClick={() => setIsMegaOpen(false)}>
                      Start Your Project <ArrowRight size={14} className="btn-arrow" />
                    </Link>
                  </div>
                  <div className="mega-menu-services">
                    {services.map((service) => {
                      const Icon = iconMap[service.iconName];
                      return (
                        <Link 
                          key={service.id}
                          to={`/expertise/${service.id}`}
                          className="mega-service-card"
                          onClick={() => setIsMegaOpen(false)}
                        >
                          <div className="service-icon-wrapper">
                            {Icon && <Icon size={20} className="service-icon" />}
                          </div>
                          <div className="service-info">
                            <span className="service-category-tag">{service.categoryLabel}</span>
                            <span className="service-title">{service.title}</span>
                            <span className="service-desc">{service.shortDesc}</span>
                            <span className="service-learn-more">Learn More <ArrowRight size={12} className="arrow-icon" /></span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </li>
            <li>
              <Link to="/projects" className={`nav-link ${isActive('/projects') ? 'active' : ''}`}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
                Contact
              </Link>
            </li>
          </ul>

          {/* Primary CTA Button */}
          <div className="navbar-actions">
            <Link to="/contact" className="btn btn-primary btn-nav">
              Get In Touch
            </Link>
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-drawer glass-panel ${isMobileOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <Link to="/" className="navbar-logo" onClick={() => setIsMobileOpen(false)}>
            Websight Works
          </Link>
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <div className="mobile-drawer-body">
          <ul className="mobile-nav-links">
            <li>
              <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setIsMobileOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`} onClick={() => setIsMobileOpen(false)}>
                About
              </Link>
            </li>
            <li className="mobile-dropdown-section">
              <span className="mobile-nav-heading">Expertise</span>
              <ul className="mobile-sub-links">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link 
                      to={`/expertise/${service.id}`}
                      className="mobile-sub-link"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link to="/projects" className={`mobile-nav-link ${isActive('/projects') ? 'active' : ''}`} onClick={() => setIsMobileOpen(false)}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`mobile-nav-link ${isActive('/contact') ? 'active' : ''}`} onClick={() => setIsMobileOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
          <div className="mobile-drawer-cta">
            <Link to="/contact" className="btn btn-primary" onClick={() => setIsMobileOpen(false)} style={{ width: '100%' }}>
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Styles local to Navbar */}
      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 0;
          transition: var(--transition-smooth);
          border-bottom: 1px solid transparent;
        }
        
        .navbar-wrapper.scrolled {
          padding: 0.75rem 0;
          background: rgba(5, 5, 5, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
        }

        /* Light Theme Header (e.g. Contact Page Hero Top) */
        .navbar-wrapper.theme-light {
          background: transparent;
          border-bottom-color: transparent;
        }

        .navbar-wrapper.theme-light .navbar-logo-img {
          filter: brightness(0) invert(0);
        }

        .navbar-wrapper.theme-light .nav-link,
        .navbar-wrapper.theme-light .dropdown-toggle {
          color: #0A0A0A;
        }

        .navbar-wrapper.theme-light .nav-link:hover,
        .navbar-wrapper.theme-light .dropdown-toggle:hover,
        .navbar-wrapper.theme-light .nav-link.active,
        .navbar-wrapper.theme-light .dropdown-toggle.active {
          color: var(--accent-blue);
        }

        .navbar-wrapper.theme-light .mobile-menu-toggle {
          color: #0A0A0A;
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-logo {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 400;
          letter-spacing: 0.03em;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          text-transform: none;
        }

        .navbar-logo-img {
          height: 24px;
          width: auto;
          display: block;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          list-style: none;
        }

        @media (max-width: 992px) {
          .navbar-links {
            display: none;
          }
        }

        .nav-link {
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-secondary);
          position: relative;
          padding: 0.5rem 0;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--text-primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--accent-blue);
          transition: var(--transition-fast);
        }

        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }

        .dropdown-toggle {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          padding: 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .dropdown-toggle:hover, .dropdown-toggle.active {
          color: var(--text-primary);
        }

        .dropdown-arrow {
          transition: transform 0.3s ease;
          display: inline-block;
        }

        .dropdown-arrow.open {
          transform: rotate(180deg);
        }

        .nav-link-dropdown {
          position: relative;
        }

        /* Glass Mega Menu */
        .mega-menu-dropdown {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          width: 960px;
          padding: 2rem;
          border-radius: 12px;
          opacity: 0;
          visibility: hidden;
          transition: var(--transition-smooth);
          box-shadow: 0 30px 100px rgba(0,0,0,0.8);
          pointer-events: none;
          background: rgba(12, 12, 12, 0.96) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
        }

        /* Invisible bridge to prevent mouseleave when hovering the gap */
        .mega-menu-dropdown::before {
          content: '';
          position: absolute;
          top: -30px;
          left: 0;
          width: 100%;
          height: 30px;
          background: transparent;
        }

        .mega-menu-dropdown.open {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(10px);
          pointer-events: auto;
        }

        .mega-menu-grid {
          display: grid;
          grid-template-columns: 240px minmax(0, 1fr);
          gap: 2.5rem;
        }

        .mega-menu-sidebar {
          border-right: 1px solid var(--border-color);
          padding-right: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .sidebar-tag {
          color: var(--accent-blue);
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
          display: block;
        }

        .mega-menu-sidebar h4 {
          font-size: 1.5rem;
          line-height: 1.25;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .mega-menu-sidebar p {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .sidebar-btn {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #FFFFFF;
          background: var(--accent-blue);
          padding: 0.75rem 1.25rem;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          text-decoration: none;
          align-self: flex-start;
          box-shadow: 0 4px 12px rgba(47, 128, 255, 0.25);
        }

        .sidebar-btn:hover {
          background: #1B6FD1;
          box-shadow: 0 6px 18px rgba(47, 128, 255, 0.4);
        }

        .sidebar-btn .btn-arrow {
          transition: transform 0.3s ease;
        }

        .sidebar-btn:hover .btn-arrow {
          transform: translateX(4px);
        }

        .mega-menu-services {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          row-gap: 1rem;
          column-gap: 1.25rem;
        }

        .mega-service-card {
          display: flex;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.02);
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          text-decoration: none;
        }

        .mega-service-card:hover {
          background: rgba(47, 128, 255, 0.12) !important;
          border-color: rgba(47, 128, 255, 0.4) !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), inset 0 0 12px rgba(47, 128, 255, 0.1);
        }

        .service-icon-wrapper {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          flex-shrink: 0;
        }

        .mega-service-card:hover .service-icon-wrapper {
          background: var(--accent-blue-glow);
          border-color: var(--accent-blue);
          color: var(--accent-blue);
        }

        .service-info {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .service-category-tag {
          font-size: 0.625rem;
          font-weight: 700;
          color: var(--accent-blue);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.35rem;
          opacity: 0.8;
          display: block;
        }

        .service-title {
          font-size: 0.9375rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 0.35rem;
          transition: color 0.3s ease;
        }

        .mega-service-card:hover .service-title {
          color: #FFFFFF;
        }

        .service-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 0.875rem;
          transition: color 0.3s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mega-service-card:hover .service-desc {
          color: #D1D1D1;
        }

        .service-learn-more {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent-blue);
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          transition: all 0.3s ease;
          opacity: 0.9;
        }

        .service-learn-more .arrow-icon {
          transition: transform 0.3s ease;
        }

        .mega-service-card:hover .service-learn-more .arrow-icon {
          transform: translateX(5px);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn-nav {
          padding: 0.625rem 1.25rem;
          font-size: 0.75rem;
          border-radius: 4px;
        }

        @media (max-width: 992px) {
          .btn-nav {
            display: none;
          }
        }

        .mobile-menu-toggle {
          background: transparent;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          display: none;
        }

        @media (max-width: 992px) {
          .mobile-menu-toggle {
            display: block;
          }
        }

        /* Mobile Drawer */
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: -100%;
          width: 320px;
          height: 100vh;
          z-index: 2000;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2rem;
          transition: cubic-bezier(0.25, 1, 0.5, 1) 0.5s;
          border-radius: 0;
          border-top: none;
          border-bottom: none;
          border-right: none;
        }

        .mobile-drawer.open {
          right: 0;
        }

        .mobile-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 3rem;
        }

        .mobile-drawer-body {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .mobile-nav-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mobile-nav-link {
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .mobile-nav-link.active, .mobile-nav-link:hover {
          color: var(--text-primary);
        }

        .mobile-dropdown-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .mobile-nav-heading {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
        }

        .mobile-sub-links {
          list-style: none;
          padding-left: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border-left: 1px solid var(--border-color);
        }

        .mobile-sub-link {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .mobile-sub-link:hover {
          color: var(--text-primary);
        }
      `}</style>
    </>
  );
}
