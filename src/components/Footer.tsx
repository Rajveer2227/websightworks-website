import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

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

export default function Footer() {
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
          <div className="footer-col">
            <span className="footer-col-title">Navigation</span>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/expertise/website-development">Expertise</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Expertise Links */}
          <div className="footer-col">
            <span className="footer-col-title">Expertise</span>
            <ul className="footer-links">
              <li><Link to="/expertise/website-development">Website Development</Link></li>
              <li><Link to="/expertise/e-commerce">E-Commerce Stores</Link></li>
              <li><Link to="/expertise/custom-apps">Custom Web Applications</Link></li>
              <li><Link to="/expertise/digital-marketing">Social Media Marketing</Link></li>
              <li><Link to="/expertise/ai-solutions">AI-Powered Solutions</Link></li>
              <li><Link to="/expertise/data-analytics">Data Analytics</Link></li>
              <li><Link to="/expertise/ui-ux-design">UI/UX Design</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div className="footer-col">
            <span className="footer-col-title">Contact</span>
            <address className="footer-address">
              <div className="contact-item">
                <MapPin size={16} className="contact-icon" aria-hidden="true" />
                <div className="contact-text-group">
                  <span>Vimal Vihar, Rajarampuri 3rd Lane</span>
                  <span>Kolhapur, Maharashtra 416008</span>
                </div>
              </div>
              
              <div className="contact-item">
                <Phone size={16} className="contact-icon" aria-hidden="true" />
                <a href="tel:+919637372210" className="contact-link">+91 96373 72210</a>
              </div>

              <div className="contact-item">
                <Mail size={16} className="contact-icon" aria-hidden="true" />
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

        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        @media (max-width: 576px) {
          .footer-brand {
            align-items: center;
            text-align: center;
          }
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

        @media (max-width: 576px) {
          .footer-brand-text {
            white-space: normal;
          }
        }

        .footer-socials {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        @media (max-width: 576px) {
          .footer-socials {
            justify-content: center;
          }
        }

        .social-icon-link {
          color: var(--text-secondary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px; /* Square border with premium 8px rounding */
          border: 1px solid rgba(47, 128, 255, 0.5); /* Blue square border */
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

        @media (max-width: 576px) {
          .footer-col {
            align-items: center;
            text-align: center;
          }
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
          padding: 0.5rem 0; /* Tap target padding */
          transition: color 300ms cubic-bezier(0.25, 1, 0.5, 1),
                      transform 300ms cubic-bezier(0.25, 1, 0.5, 1);
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          will-change: transform, color;
        }

        /* Growing underline effect */
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

        @media (max-width: 576px) {
          .footer-address {
            align-items: center;
          }
        }

        .contact-item {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        @media (max-width: 576px) {
          .contact-item {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
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

        @media (max-width: 576px) {
          .contact-text-group {
            align-items: center;
          }
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

        @media (max-width: 768px) {
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

        .highlight-white {
          color: #ffffff;
          font-weight: 500;
        }
      `}</style>
    </footer>
  );
}
