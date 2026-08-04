import { useState, useRef, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';
import ShinyText from '../components/ShinyText';
import { Particles } from '../components/Particles';
import { initScrollReveal } from '../utils/scrollReveal';

interface FormFields {
  name: string;
  email: string;
  scope: string;
  message: string;
  honeypot: string; // Anti-spam trap
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  useEffect(() => {
    initScrollReveal();
  }, []);

  const [fields, setFields] = useState<FormFields>({
    name: '',
    email: '',
    scope: 'Website Development',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isCopied, setIsCopied] = useState<Record<string, boolean>>({});
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownOptions = [
    'Website Development',
    'E-Commerce Stores',
    'Custom Web Applications',
    'AI Powered Solutions',
    'Data Analytics',
    'Social Media Marketing',
    'UI/UX Design'
  ];

  // Click outside to close custom dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectOption = (option: string) => {
    setFields(prev => ({ ...prev, scope: option }));
    setIsDropdownOpen(false);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear errors as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied({ [key]: true });
    setTimeout(() => setIsCopied({}), 2000);
  };

  // Safe HTML character escaping for input sanitization
  const sanitizeText = (text: string): string => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };

  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!fields.name.trim()) {
      tempErrors.name = 'Your name is required to draft a proposal.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fields.email.trim()) {
      tempErrors.email = 'An email address is required.';
      isValid = false;
    } else if (!emailRegex.test(fields.email)) {
      tempErrors.email = 'Please specify a valid email address.';
      isValid = false;
    }

    if (!fields.message.trim()) {
      tempErrors.message = 'Please provide details about your project scope.';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 1. Honeypot Spam Check: If honeypot is filled out, reject immediately as bot
    if (fields.honeypot) {
      console.warn("Honeypot trigger detected. Aborting submission.");
      setFormState('success'); // Silently succeed to confuse bots
      return;
    }

    // 2. Validate Fields
    if (!validateForm()) return;

    setFormState('submitting');

    // 3. Sanitize inputs
    const sanitizedSubmission = {
      name: sanitizeText(fields.name),
      email: sanitizeText(fields.email),
      scope: sanitizeText(fields.scope),
      message: sanitizeText(fields.message),
    };

    // Simulate API Endpoint latency
    setTimeout(() => {
      console.log("Sanitized Form Submission Success:", sanitizedSubmission);
      setFormState('success');

      // Auto reset form to normal state after 3.5 seconds
      setTimeout(() => {
        setFields({ name: '', email: '', scope: 'Website Development', message: '', honeypot: '' });
        setFormState('idle');
      }, 3500);
    }, 1500);
  };

  return (
    <>
      <SEO 
        title="Start Your Project" 
        description="Connect with our principal engineering team. Draft your digital product scope and get a custom proposal."
      />

      <div className="contact-page-wrapper">
        <section className="section contact-hero" data-reveal="section">
          <Particles
            className="contact-hero-particles"
            quantity={45}
            ease={80}
            color="#2f80ff"
            refresh
          />
          <div className="container">
            <span className="section-title-tag" data-reveal="label">
              <ShinyText
                text="Connect With Us"
                speed={3}
                color="#050505"
                shineColor="var(--accent-blue)"
                spread={90}
              />
            </span>
            <h1 className="contact-hero-title serif-heading" data-reveal="title">Let's build a digital masterpiece.</h1>
            <p className="contact-hero-desc" data-reveal="paragraph">
              Discuss your project scope directly with our principal team.
              <br />
              Fill out the form or reach out via direct email.
            </p>
          </div>
        </section>

        <section className="section contact-body-section" data-reveal="section">
          <div className="container">
            <div className="grid-2">
              {/* Form Column */}
              <div className="form-column-wrap">
                <form onSubmit={handleFormSubmit} className="contact-form glass-panel" data-reveal="cta" noValidate>
                  {/* Success Overlay Animation */}
                  {formState === 'success' && (
                    <div className="form-success-overlay">
                      <div className="success-overlay-content">
                        <div className="animated-check-wrap">
                          <Check size={48} className="check-icon-animated" />
                        </div>
                        <h3 className="serif-heading success-title">Proposal Sent</h3>
                        <p className="success-desc">OUR TEAM WILL CONTACT YOU SHORTLY.</p>
                      </div>
                    </div>
                  )}
                    {/* Honeypot Spam Protection (Visually Hidden) */}
                    <div className="sr-only">
                      <label htmlFor="honeypot">Do not fill this out if you are human</label>
                      <input
                        id="honeypot"
                        type="text"
                        name="honeypot"
                        value={fields.honeypot}
                        onChange={handleInputChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={fields.name}
                        onChange={handleInputChange}
                        className={`form-input ${errors.name ? 'input-error' : ''}`}
                        placeholder="e.g. Aarav Sharma"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <span id="name-error" className="form-error" role="alert">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={fields.email}
                        onChange={handleInputChange}
                        className={`form-input ${errors.email ? 'input-error' : ''}`}
                        placeholder="e.g. aarav@company.com"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <span id="email-error" className="form-error" role="alert">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className="form-group" ref={dropdownRef}>
                      <span className="form-label">Project Category</span>
                      <div className="custom-dropdown-container">
                        <button
                          type="button"
                          className={`custom-dropdown-trigger form-input ${isDropdownOpen ? 'active' : ''}`}
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          aria-haspopup="listbox"
                          aria-expanded={isDropdownOpen}
                        >
                          <span>{fields.scope}</span>
                          <ChevronDown size={16} className={`dropdown-chevron ${isDropdownOpen ? 'open' : ''}`} />
                        </button>
                        
                        {isDropdownOpen && (
                          <ul className="custom-dropdown-options glass-panel" role="listbox">
                            {dropdownOptions.map((option) => (
                              <li
                                key={option}
                                className={`custom-dropdown-option ${fields.scope === option ? 'selected' : ''}`}
                                role="option"
                                aria-selected={fields.scope === option}
                                onClick={() => handleSelectOption(option)}
                              >
                                {option}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        Project Scope Details
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={fields.message}
                        onChange={handleInputChange}
                        className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                        placeholder="Describe your design, development, and system objectives..."
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      />
                      {errors.message && (
                        <span id="message-error" className="form-error" role="alert">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="btn btn-primary submit-btn"
                    >
                      {formState === 'submitting' ? 'Submitting...' : 'Submit Proposal'}
                      <Send size={14} />
                    </button>
                  </form>
              </div>

              {/* Info Column */}
              <div className="info-column-wrap">
                <h3 className="serif-heading info-col-title" data-reveal="title">We're Here to Help</h3>
                <p className="info-intro-text" data-reveal="paragraph">
                  Whether you have an idea or an ongoing project,
                  <br />
                  our team is ready to assist you.
                </p>

                <div className="coordinates-list">
                  <div className="coord-card glass-panel" data-reveal="card">
                    <div className="coord-icon"><Mail size={18} /></div>
                    <div className="coord-info">
                      <span className="coord-label">ENQUIRIES</span>
                      <span className="coord-val">contact@websightworks.com</span>
                    </div>
                    <button 
                      className="copy-btn" 
                      onClick={() => copyToClipboard('contact@websightworks.com', 'email')}
                      aria-label="Copy email address"
                    >
                      {isCopied.email ? <Check size={16} className="color-green" /> : <Copy size={16} />}
                    </button>
                  </div>

                  <div className="coord-card glass-panel" data-reveal="card">
                    <div className="coord-icon"><Phone size={18} /></div>
                    <div className="coord-info">
                      <span className="coord-label">PHONE</span>
                      <span className="coord-val">+91 96373 72210</span>
                    </div>
                    <button 
                      className="copy-btn" 
                      onClick={() => copyToClipboard('+919637372210', 'phone')}
                      aria-label="Copy phone number"
                    >
                      {isCopied.phone ? <Check size={16} className="color-green" /> : <Copy size={16} />}
                    </button>
                  </div>

                  <div className="coord-card glass-panel" data-reveal="card">
                    <div className="coord-icon"><MapPin size={18} /></div>
                    <div className="coord-info">
                      <span className="coord-label">OFFICE</span>
                      <span className="coord-val">Vimal Vihar, Rajarampuri 3rd Lane, Kolhapur 416008.</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Google Map in premium dark styling */}
                <div className="abstract-map-container glass-panel" data-reveal="card" style={{ overflow: 'hidden' }}>
                  <iframe
                    title="Websight Works Studio Location"
                    src="https://maps.google.com/maps?q=Websight%20Works,%20Rajarampuri,%20Kolhapur&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="eager"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="google-map-iframe"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .contact-page-wrapper {
          padding-top: 0;
        }

        /* Hero */
        .contact-hero {
          padding: calc(var(--navbar-height) + 4rem) 0 6rem 0;
          background: #FFFFFF;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        .contact-hero .container {
          position: relative;
          z-index: 10;
        }

        .contact-hero-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .contact-hero-particles canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .contact-hero-title {
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 2rem;
          color: #0A0A0A !important;
        }

        .contact-hero-desc {
          font-size: 1.25rem;
          color: #4A4A4A !important;
          max-width: 700px;
          line-height: 1.7;
        }

        .contact-hero .section-title-tag {
          background-color: rgba(47, 128, 255, 0.06) !important;
          border-color: rgba(47, 128, 255, 0.25) !important;
          color: var(--accent-blue) !important;
        }

        /* Contact Body layout */
        .contact-body-section {
          padding-top: 2rem;
        }

        .form-column-wrap,
        .info-column-wrap {
          margin-top: 4.5rem;
        }

        @media (max-width: 992px) {
          .form-column-wrap,
          .info-column-wrap {
            margin-top: 0;
          }
        }

        .contact-form {
          padding: 3.5rem;
          display: flex;
          flex-direction: column;
          position: relative; /* Keep absolute overlays positioned correctly */
        }

        @media (max-width: 768px) {
          .contact-form {
            padding: 2rem 1.5rem;
          }
        }

        .input-error {
          border-color: #FF4A4A !important;
          box-shadow: 0 0 10px rgba(255, 74, 74, 0.15) !important;
        }

        .custom-dropdown-container {
          position: relative;
          width: 100%;
        }

        .custom-dropdown-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          width: 100%;
        }

        .custom-dropdown-trigger.active {
          border-color: var(--accent-blue);
          box-shadow: 0 0 15px var(--accent-blue-glow);
        }

        .dropdown-chevron {
          transition: transform 0.3s ease;
          color: var(--text-secondary);
        }

        .dropdown-chevron.open {
          transform: rotate(180deg);
          color: var(--text-primary);
        }

        .custom-dropdown-options {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          width: 100%;
          z-index: 50;
          padding: 0.5rem;
          margin: 0;
          list-style: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          border: 1px solid var(--border-color);
          border-radius: 6px;
        }

        .custom-dropdown-option {
          padding: 0.75rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          color: var(--text-secondary);
          transition: var(--transition-fast);
          font-size: 0.9375rem;
        }

        .custom-dropdown-option:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .custom-dropdown-option.selected {
          background: var(--accent-blue);
          color: #FFFFFF;
        }

        .submit-btn {
          width: 100%;
          margin-top: 1.5rem;
        }

        /* Success screen */
        .success-panel {
          padding: 5rem 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .success-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--accent-blue-glow);
          border: 1px solid var(--accent-blue);
          color: var(--accent-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px var(--accent-blue-glow);
        }

        .success-panel h3 {
          font-size: 2rem;
        }

        .success-panel p {
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 480px;
          margin-bottom: 1rem;
        }

        /* Success Overlay Animations */
        .form-success-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(10, 10, 10, 0.92);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          border-radius: 12px;
          animation: overlayFadeIn 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        @keyframes overlayFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .success-overlay-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          text-align: center;
          padding: 2rem;
        }

        .animated-check-wrap {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(47, 128, 255, 0.1);
          border: 2px solid var(--accent-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-blue);
          box-shadow: 0 0 20px rgba(47, 128, 255, 0.2);
          transform: scale(0);
          animation: checkScaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards;
        }

        @keyframes checkScaleIn {
          to {
            transform: scale(1);
            box-shadow: 0 0 35px rgba(47, 128, 255, 0.45);
          }
        }

        .check-icon-animated {
          transform: scale(0.8);
          opacity: 0;
          animation: checkDraw 0.4s cubic-bezier(0.25, 1, 0.5, 1) 0.6s forwards;
        }

        @keyframes checkDraw {
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .success-title {
          font-size: 2.25rem;
          color: #ffffff;
          opacity: 0;
          transform: translateY(10px);
          animation: textReveal 0.4s ease-out 0.7s forwards;
        }

        .success-desc {
          color: var(--text-secondary);
          font-size: 0.875rem;
          letter-spacing: 0.08em;
          max-width: 100%;
          white-space: nowrap;
          line-height: 1.6;
          opacity: 0;
          transform: translateY(10px);
          animation: textReveal 0.4s ease-out 0.85s forwards;
        }

        @keyframes textReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Info columns coordinates */
        .info-col-title {
          font-size: 2.25rem;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .info-intro-text {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 3rem;
        }

        .coordinates-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 3rem;
        }

        .coord-card {
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          position: relative;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .coord-card:hover {
          border-color: rgba(47, 128, 255, 0.4);
          box-shadow: 0 0 15px rgba(47, 128, 255, 0.1);
        }

        .coord-card:hover .coord-val {
          color: var(--accent-blue) !important;
        }

        .coord-card:hover .coord-icon {
          color: var(--accent-blue) !important;
          border-color: var(--accent-blue) !important;
          box-shadow: 0 0 10px var(--accent-blue-glow);
        }

        .coord-icon {
          width: 36px;
          height: 36px;
          border-radius: 6px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .coord-info {
          display: flex;
          flex-direction: column;
        }

        .coord-label {
          font-size: 0.6875rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .coord-val {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
          transition: color var(--transition-fast);
        }

        .copy-btn {
          position: absolute;
          right: 1.25rem;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-fast);
          padding: 0.25rem;
        }

        .copy-btn:hover {
          color: var(--accent-blue);
        }

        .color-green {
          color: #2FFD93;
        }

        /* Real Map HQ Coordinates */
        .abstract-map-container {
          height: 240px;
          width: 100%;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          background: #090909;
        }

        .google-map-iframe {
          filter: invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%);
          border-radius: 12px;
          opacity: 0.85;
          transition: opacity var(--transition-smooth);
        }

        .google-map-iframe:hover {
          opacity: 1;
        }
      `}</style>
    </>
  );
}
