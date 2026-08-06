import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, ChevronRight,
  Globe, ShoppingBag, Cpu, Share2, Sparkles, BarChart2, Layout 
} from 'lucide-react';

// Custom SVG component for Lucide Linkedin icon
function LinkedinIcon({ size = 18, ...props }: { size?: number; [key: string]: any }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-linkedin"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// Custom SVG component for Lucide Instagram icon
function InstagramIcon({ size = 18, ...props }: { size?: number; [key: string]: any }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-instagram"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const expertiseItems = [
  { title: 'Website Development', path: '/expertise/website-development', Icon: Globe },
  { title: 'E-Commerce Stores', path: '/expertise/e-commerce', Icon: ShoppingBag },
  { title: 'Custom Web Applications', path: '/expertise/custom-apps', Icon: Cpu },
  { title: 'Social Media Marketing', path: '/expertise/digital-marketing', Icon: Share2 },
  { title: 'AI-Powered Solutions', path: '/expertise/ai-solutions', Icon: Sparkles },
  { title: 'Data Analytics', path: '/expertise/data-analytics', Icon: BarChart2 },
  { title: 'UI/UX Design', path: '/expertise/ui-ux-design', Icon: Layout },
];

export default function Footer() {
  const [isMobileExpertiseOpen, setIsMobileExpertiseOpen] = useState(false);

  return (
    <footer className="footer-wrapper" aria-label="Site Footer">
      <div className="container" data-reveal="footer">
        <div className="footer-grid">
          {/* Column 1: Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo" aria-label="Websight Works Home">
              <img src="/logo/wesightworkwhite.png" alt="Websight Works Logo" className="footer-logo-img" />
            </Link>
            <p className="footer-brand-text">
              Shaping Tomorrow's Digital Landscape
            </p>
            <div className="footer-socials" aria-label="Social Media Links">
              <a 
                href="https://www.linkedin.com/company/websight-works/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-link" 
                aria-label="Follow Websight Works on LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a 
                href="https://www.instagram.com/websight.works/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-link" 
                aria-label="Follow Websight Works on Instagram"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Studio Links */}
          <div className="footer-col footer-col-nav">
            <span className="footer-col-title">Navigation</span>
            <ul className="footer-links">
              <li>
                <Link to="/">
                  <span>Home</span>
                  <ChevronRight size={15} className="mobile-link-chevron" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <span>About</span>
                  <ChevronRight size={15} className="mobile-link-chevron" aria-hidden="true" />
                </Link>
              </li>

              {/* Desktop-only standard Expertise link */}
              <li className="desktop-only-expertise-item">
                <Link to="/expertise/website-development">
                  <span>Expertise</span>
                </Link>
              </li>

              {/* Mobile-only interactive Expertise Accordion */}
              <li className="mobile-only-expertise-item">
                <button
                  type="button"
                  className={`mobile-accordion-toggle ${isMobileExpertiseOpen ? 'active' : ''}`}
                  onClick={() => setIsMobileExpertiseOpen(!isMobileExpertiseOpen)}
                  aria-expanded={isMobileExpertiseOpen}
                  aria-label="Toggle Expertise Services Menu"
                >
                  <span>Expertise</span>
                  <ChevronRight
                    size={15}
                    className={`mobile-accordion-chevron ${isMobileExpertiseOpen ? 'rotated' : ''}`}
                  />
                </button>

                <div className={`mobile-accordion-menu ${isMobileExpertiseOpen ? 'open' : ''}`}>
                  <ul className="mobile-accordion-sublinks">
                    {expertiseItems.map(({ title, path, Icon }) => (
                      <li key={path}>
                        <Link to={path} className="mobile-sublink">
                          <Icon size={14} className="mobile-sublink-icon" aria-hidden="true" />
                          <span>{title}</span>
                          <ChevronRight size={14} className="mobile-sublink-chevron" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li>
                <Link to="/projects">
                  <span>Projects</span>
                  <ChevronRight size={15} className="mobile-link-chevron" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <span>Contact</span>
                  <ChevronRight size={15} className="mobile-link-chevron" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Standalone Expertise Links (Desktop/Tablet Only) */}
          <div className="footer-col footer-col-expertise">
            <span className="footer-col-title">Expertise</span>
            <ul className="footer-links">
              {expertiseItems.map(({ title, path, Icon }) => (
                <li key={path}>
                  <Link to={path} className="expertise-chip-link">
                    <Icon size={14} className="chip-icon" aria-hidden="true" />
                    <span>{title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div className="footer-col footer-col-contact">
            <span className="footer-col-title">Contact</span>
            <address className="footer-address">
              <div className="contact-item contact-item-address">
                <div className="contact-icon-box">
                  <MapPin size={17} className="contact-icon" aria-hidden="true" />
                </div>
                <div className="contact-text-group">
                  <span>Vimal Vihar, Rajarampuri 3rd Lane</span>
                  <span>Kolhapur, Maharashtra 416008</span>
                </div>
              </div>
              
              <div className="contact-item contact-item-single">
                <div className="contact-icon-box">
                  <Phone size={17} className="contact-icon" aria-hidden="true" />
                </div>
                <a href="tel:+919637372210" className="contact-link">+91 96373 72210</a>
              </div>

              <div className="contact-item contact-item-single">
                <div className="contact-icon-box">
                  <Mail size={17} className="contact-icon" aria-hidden="true" />
                </div>
                <a href="mailto:contact@websightworks.com" className="contact-link">contact@websightworks.com</a>
              </div>
            </address>
          </div>
        </div>

        {/* Elegant border divider */}
        <div className="footer-divider" />

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div className="bottom-left">
            <p className="copyright-text">
              &copy; {new Date().getFullYear()} Websight Works. All rights reserved.
            </p>
          </div>
          
          <div className="bottom-center">
            <a href="https://websightworks.com/" className="designer-link">
              Designed & Developed by Websight Works
            </a>
          </div>

          <div className="bottom-right">
            <p className="footer-architect">
              Built with Precision.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .footer-wrapper {
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border-color);
          padding: 8rem 0 3rem 0;
          position: relative;
          z-index: 10;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.2fr 1.3fr;
          gap: 4rem;
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 3.5rem;
          }
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .footer-logo {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 400;
          letter-spacing: 0.03em;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          text-transform: none;
        }

        .footer-logo-img {
          height: 24px;
          width: auto;
          display: block;
        }

        .footer-brand-text {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 360px;
          white-space: nowrap;
        }

        @media (max-width: 992px) {
          .footer-brand-text {
            white-space: normal;
          }
        }

        .footer-socials {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .social-icon-link {
          color: var(--text-secondary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: 1px solid rgba(47, 128, 255, 0.5);
          transition: transform 300ms cubic-bezier(0.25, 1, 0.5, 1),
                      color 300ms cubic-bezier(0.25, 1, 0.5, 1),
                      border-color 300ms cubic-bezier(0.25, 1, 0.5, 1),
                      box-shadow 300ms cubic-bezier(0.25, 1, 0.5, 1);
        }

        .social-icon-link:hover {
          color: var(--accent-blue);
          border-color: var(--accent-blue);
          transform: translateY(-3px);
          box-shadow: 0 0 8px rgba(47, 128, 255, 0.4);
        }

        .social-icon-link:focus-visible {
          outline: 2px solid var(--accent-blue);
          outline-offset: 2px;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .footer-col-title {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-primary);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 0;
          width: 100%;
        }

        .footer-links li {
          display: block;
          width: 100%;
        }

        .footer-links a {
          font-size: 0.875rem;
          color: var(--text-secondary);
          display: inline-block;
          position: relative;
          padding: 0.5rem 0;
          transition: color 300ms cubic-bezier(0.25, 1, 0.5, 1),
                      transform 300ms cubic-bezier(0.25, 1, 0.5, 1);
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          will-change: transform, color;
        }

        .mobile-link-chevron {
          display: none;
        }

        .chip-icon {
          display: none;
        }

        .desktop-only-expertise-item {
          display: none !important;
        }

        .mobile-only-expertise-item {
          display: none !important;
        }

        .mobile-accordion-toggle,
        .mobile-accordion-menu,
        .mobile-accordion-sublinks,
        .mobile-sublink {
          display: none !important;
        }

        @media (min-width: 769px) {
          .mobile-only-expertise-item,
          .mobile-accordion-toggle,
          .mobile-accordion-menu,
          .mobile-accordion-sublinks,
          .mobile-sublink,
          .mobile-link-chevron,
          .mobile-sublink-icon,
          .mobile-sublink-chevron,
          .mobile-accordion-chevron {
            display: none !important;
          }
        }

        /* Desktop growing underline effect */
        @media (min-width: 769px) {
          .footer-links a::after {
            content: '';
            position: absolute;
            bottom: 0.25rem;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: var(--accent-blue);
            transform: scaleX(0);
            transform-origin: bottom left;
            transition: transform 300ms cubic-bezier(0.25, 1, 0.5, 1);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }

          .footer-links a:hover {
            color: var(--accent-blue);
            transform: translate3d(4px, 0, 0);
          }

          .footer-links a:hover::after {
            transform: scaleX(1);
          }
        }

        .footer-links a:focus-visible {
          outline: 2px solid var(--accent-blue);
          outline-offset: 4px;
          border-radius: 4px;
        }

        .footer-address {
          font-style: normal;
          font-size: 0.875rem;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          width: 100%;
        }

        .contact-item {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        .contact-icon {
          color: var(--text-secondary);
          flex-shrink: 0;
          margin-top: 0.25rem;
          transition: color 300ms cubic-bezier(0.25, 1, 0.5, 1);
        }

        .contact-text-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          line-height: 1.5;
        }

        .contact-link {
          color: var(--text-secondary);
          display: inline-block;
          position: relative;
          padding: 0.25rem 0;
          transition: color 300ms cubic-bezier(0.25, 1, 0.5, 1),
                      transform 300ms cubic-bezier(0.25, 1, 0.5, 1);
          text-decoration: none;
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          will-change: transform, color;
        }

        @media (min-width: 769px) {
          .contact-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: var(--accent-blue);
            transform: scaleX(0);
            transform-origin: bottom left;
            transition: transform 300ms cubic-bezier(0.25, 1, 0.5, 1);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }

          .contact-link:hover {
            color: var(--accent-blue);
            transform: translate3d(4px, 0, 0);
          }

          .contact-link:hover::after {
            transform: scaleX(1);
          }
        }

        .contact-link:focus-visible {
          outline: 2px solid var(--accent-blue);
          outline-offset: 4px;
          border-radius: 4px;
        }

        .contact-item:hover .contact-icon {
          color: var(--accent-blue);
        }

        .footer-divider {
          height: 1px;
          background-color: rgba(255, 255, 255, 0.08);
          width: 100%;
          margin: 5rem 0 2rem 0;
        }

        .footer-bottom {
          display: grid;
          grid-template-columns: 1.5fr 2fr 1.5fr;
          align-items: center;
          width: 100%;
        }

        .bottom-left {
          text-align: left;
        }

        .bottom-center {
          text-align: center;
        }

        .bottom-right {
          text-align: right;
        }

        .copyright-text {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .designer-link {
          font-size: 0.75rem;
          color: #ffffff;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: color 300ms cubic-bezier(0.25, 1, 0.5, 1);
        }

        .designer-link:hover {
          color: var(--accent-blue);
        }

        .designer-link:focus-visible {
          outline: 2px solid var(--accent-blue);
          outline-offset: 4px;
          border-radius: 4px;
        }

        .footer-architect {
          font-size: 0.75rem;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        /* ─── MOBILE ENHANCEMENTS (≤768px ONLY) ───────────────────────── */
        @media (max-width: 768px) {
          .footer-wrapper {
            padding: 4rem 0 calc(6.5rem + env(safe-area-inset-bottom, 0px)) 0;
          }

          .footer-grid {
            display: flex;
            flex-direction: column;
            gap: 1.75rem;
          }

          /* Hide standalone Expertise column on mobile to remove duplication */
          .footer-col-expertise {
            display: none !important;
          }

          .desktop-only-expertise-item {
            display: none !important;
          }

          .mobile-only-expertise-item {
            display: block !important;
            width: 100%;
          }

          .mobile-accordion-toggle {
            display: flex !important;
          }

          .mobile-accordion-menu {
            display: block !important;
          }

          .mobile-accordion-sublinks {
            display: flex !important;
          }

          .mobile-sublink {
            display: flex !important;
          }

          .footer-brand,
          .footer-col {
            background: rgba(18, 18, 22, 0.65);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 18px;
            padding: 1.5rem 1.25rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
            align-items: flex-start;
            text-align: left;
            gap: 1.25rem;
          }

          .footer-brand-text {
            text-align: left;
            max-width: 100%;
          }

          .footer-socials {
            justify-content: flex-start;
            gap: 0.75rem;
            margin-top: 0.25rem;
          }

          .social-icon-link {
            width: 46px;
            height: 46px;
            min-width: 44px;
            min-height: 44px;
            border-radius: 12px;
            background: rgba(47, 128, 255, 0.08);
            border: 1px solid rgba(47, 128, 255, 0.4);
            color: var(--accent-blue);
          }

          .social-icon-link:active {
            transform: scale(0.94);
            background: rgba(47, 128, 255, 0.2);
          }

          .footer-col-title {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            width: 100%;
            font-size: 0.8rem;
            letter-spacing: 0.12em;
          }

          .footer-col-title::after {
            content: '';
            flex-grow: 1;
            height: 1px;
            background: linear-gradient(90deg, rgba(47, 128, 255, 0.4), transparent);
          }

          /* Navigation Cards on Mobile */
          .footer-col-nav .footer-links {
            gap: 0.6rem;
          }

          .footer-col-nav .footer-links a {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.85rem 1rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            color: var(--text-secondary);
            font-size: 0.9rem;
            font-weight: 500;
            width: 100%;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .footer-col-nav .footer-links a:active,
          .footer-col-nav .footer-links a:hover {
            background: rgba(47, 128, 255, 0.12);
            border-color: rgba(47, 128, 255, 0.3);
            color: #ffffff;
            transform: none;
          }

          .mobile-link-chevron {
            display: inline-block;
            color: var(--accent-blue);
          }

          /* Mobile Interactive Expertise Accordion */
          .mobile-accordion-toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.85rem 1rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            color: var(--text-secondary);
            font-size: 0.9rem;
            font-weight: 500;
            width: 100%;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            font-family: inherit;
          }

          .mobile-accordion-toggle.active,
          .mobile-accordion-toggle:hover {
            background: rgba(47, 128, 255, 0.12);
            border-color: rgba(47, 128, 255, 0.3);
            color: #ffffff;
          }

          .mobile-accordion-chevron {
            color: var(--accent-blue);
            transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
            transform: rotate(0deg);
          }

          .mobile-accordion-chevron.rotated {
            transform: rotate(90deg);
          }

          .mobile-accordion-menu {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: max-height 300ms cubic-bezier(0.16, 1, 0.3, 1),
                        opacity 250ms ease,
                        margin-top 250ms ease;
            margin-top: 0;
            padding-right: 2px;
          }

          .mobile-accordion-menu.open {
            max-height: 480px;
            opacity: 1;
            margin-top: 0.5rem;
          }

          .mobile-accordion-sublinks {
            list-style: none;
            padding: 0.4rem 0.2rem 0.2rem 0.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
            border-left: 2px solid rgba(47, 128, 255, 0.3);
            margin-left: 0.5rem;
          }

          .mobile-sublink {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.65rem;
            padding: 0.65rem 0.85rem;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.04);
            border-radius: 10px;
            font-size: 0.825rem;
            color: var(--text-secondary);
            transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
          }

          .mobile-sublink:active,
          .mobile-sublink:hover {
            background: rgba(47, 128, 255, 0.1);
            border-color: rgba(47, 128, 255, 0.25);
            color: #ffffff;
            transform: none;
          }

          .mobile-sublink-icon {
            color: var(--accent-blue);
            flex-shrink: 0;
          }

          .mobile-sublink-chevron {
            color: var(--text-secondary);
            opacity: 0.6;
            margin-left: auto;
          }

          /* Contact Cards on Mobile */
          .footer-address {
            gap: 0.75rem;
          }

          .contact-icon-box {
            width: 24px;
            height: 24px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .contact-item {
            display: flex;
            text-align: left;
            gap: 0.85rem;
            padding: 0.9rem 1rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 12px;
            width: 100%;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .contact-item-single {
            align-items: center;
          }

          .contact-item-address {
            align-items: flex-start;
          }

          .contact-item-address .contact-icon-box {
            margin-top: 0.15rem;
          }

          .contact-item:active,
          .contact-item:hover {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(47, 128, 255, 0.3);
          }

          .contact-text-group {
            align-items: flex-start;
          }

          .contact-icon {
            color: var(--accent-blue);
            margin-top: 0;
          }

          .footer-divider {
            margin: 2.5rem 0 1.5rem 0;
          }

          .footer-bottom {
            grid-template-columns: 1fr;
            gap: 1.25rem;
            text-align: center;
          }

          .bottom-left, .bottom-center, .bottom-right {
            text-align: center;
          }

          .bottom-center {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
}
