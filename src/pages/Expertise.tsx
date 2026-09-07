import { useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SEO from '../components/SEO';
import { services } from '../data/serviceData';
import ShinyText from '../components/ShinyText';
import FlipTextCycle from '../components/ui/flip-text-cycle';
import WaveGridBackground from '../components/ui/wave-grid-background';
import GlowBorderCard from '../components/ui/glow-border-card';
import { Particles } from '../components/Particles';
import { initScrollReveal } from '../utils/scrollReveal';
import { SITE_CONFIG } from '../constants/site';

gsap.registerPlugin(ScrollTrigger);

export default function Expertise() {
  const { id } = useParams<{ id: string }>();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initScrollReveal();
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [id]);

  useGSAP(() => {
    if (!processRef.current) return;

    const isMobile = window.innerWidth <= 992;
    const targetProperty = isMobile ? 'height' : 'width';

    gsap.fromTo(
      processRef.current.querySelector('.timeline-line-progress'),
      { [targetProperty]: '0%' },
      {
        [targetProperty]: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: processRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }, { scope: processRef, dependencies: [id] });

  const service = services.find((s) => s.id === id);

  if (!service) {
    return <Navigate to="/" replace />;
  }


  // Service-first production SEO metadata lookup
  const serviceSEO = {
    'website-development': {
      title: 'Custom Website Development Services | Websight Works',
      description: 'High-performance custom website development engineered for speed, scalability, and conversions. Tailored digital experiences for businesses in India and worldwide.',
    },
    'e-commerce': {
      title: 'Custom E-Commerce Website Development | Websight Works',
      description: 'Build high-converting, scalable e-commerce stores with seamless shopping experiences, secure payments, and modern architecture.',
    },
    'custom-apps': {
      title: 'Custom Web Application & Software Development | Websight Works',
      description: 'Scalable custom web applications and software solutions tailored to your business workflow, operations, and growth.',
    },
    'ai-solutions': {
      title: 'AI-Powered Solutions & Intelligent Automation | Websight Works',
      description: 'Custom AI solutions and intelligent integrations designed to automate operations, enhance decision-making, and modernize business workflows.',
    },
    'data-analytics': {
      title: 'Data Analytics & Business Intelligence Dashboards | Websight Works',
      description: 'Transform raw business data into actionable real-time insights with custom analytics pipelines and interactive visualization dashboards.',
    },
    'ui-ux-design': {
      title: 'UI/UX Design & Digital Product Design | Websight Works',
      description: 'User-centric UI/UX design, wireframing, and interactive design systems that transform complex workflows into intuitive digital products.',
    },
    'digital-marketing': {
      title: 'Social Media Marketing & Brand Growth | Websight Works',
      description: 'Data-driven social media marketing and brand campaigns designed to expand digital reach, drive qualified engagement, and accelerate growth.',
    },
  }[service.id] || {
    title: `${service.title} | Websight Works`,
    description: service.description,
  };

  // Structured schemas
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_CONFIG.siteUrl}/expertise/${service.id}#service`,
    'name': service.title,
    'serviceType': service.title,
    'category': service.categoryLabel,
    'description': service.description,
    'provider': {
      '@type': 'Organization',
      'name': SITE_CONFIG.name,
      'url': SITE_CONFIG.siteUrl,
      '@id': `${SITE_CONFIG.siteUrl}/#organization`,
    },
    'areaServed': [
      {
        '@type': 'City',
        'name': 'Kolhapur',
      },
      {
        '@type': 'State',
        'name': 'Maharashtra',
      },
      {
        '@type': 'Country',
        'name': 'India',
      },
      {
        '@type': 'AdministrativeArea',
        'name': 'Worldwide',
      },
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': `${service.title} Capabilities`,
      'itemListElement': service.solutions.map((sol) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': sol,
          'description': sol,
        },
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': service.faq.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  };

  return (
    <>
      <SEO 
        title={serviceSEO.title} 
        description={serviceSEO.description}
        schemas={[serviceSchema, faqSchema]}
      />

      <div className="expertise-page-wrapper">
        {/* 1. Hero Block */}
        <section className="section service-hero" data-reveal="section">
          <Particles
            className="service-hero-particles"
            quantity={45}
            ease={80}
            color="#2f80ff"
            refresh
          />
          <div className="container">
            <div className="service-hero-tag-row">
              <span className="section-title-tag" data-reveal="label">
                <ShinyText
                  text="OUR EXPERTISE"
                  speed={3}
                  color="#050505"
                  shineColor="var(--accent-blue)"
                  spread={90}
                />
              </span>
              {(service.id === 'data-analytics' || service.id === 'digital-marketing') && (
                <span className="service-hero-coming-soon-badge">Coming Soon</span>
              )}
            </div>
            <h1 className="service-hero-title serif-heading" data-reveal="title">{service.title}</h1>
            <p className="service-hero-subtitle" data-reveal="paragraph">{service.overview}</p>
          </div>
        </section>

        {/* 3. The Websight Works Advantage */}
        <section className="section service-challenges" data-reveal="section">
          <div className="container">
            {/* Header: Section Heading */}
            <div className="advantage-header">
              <h2 className="section-title serif-heading" data-reveal="title">
                How We Deliver Better Results
              </h2>
            </div>

            {/* 2-Column Comparison Layout */}
            <div className="grid-2">
              {/* Common Challenges Column */}
              <div className="challenges-column">
                <h3 className="serif-heading column-heading color-red">Common Challenges</h3>
                <div className="problems-list">
                  {service.challenges.map((challenge, idx) => (
                    <div key={idx} className="problem-item glass-panel" data-reveal="card">
                      <AlertCircle className="problem-icon" size={18} />
                      <p>{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Our Solution Column */}
              <div className="solutions-column">
                <h3 className="serif-heading column-heading color-blue">Our Solutions</h3>
                <div className="solutions-list">
                  {service.solutions.map((sol, idx) => (
                    <div key={idx} className="solution-item glass-panel" data-reveal="card">
                      <CheckCircle2 className="solution-icon" size={18} />
                      <p>{sol}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Custom Execution Process */}
        <section ref={processRef} className="section service-process" data-reveal="section">
          <div className="container">
            <div className="text-center process-header">
              <h2 className="section-title serif-heading" data-reveal="title">Our Proven Process</h2>
            </div>
            <div className="timeline-wrapper">
              <div className="timeline-line">
                <div className="timeline-line-progress" />
              </div>
              <div className="process-grid timeline-steps">
                {service.process.map((step) => (
                  <div key={step.phase} data-reveal="card" style={{ height: '100%' }}>
                    <GlowBorderCard height="100%" className="timeline-step-card">
                      <span className="step-num">{step.phase}</span>
                      <h4 className="step-title">{step.title}</h4>
                      <p>{step.desc}</p>
                    </GlowBorderCard>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* 8. FAQ Accordions */}
        <section className="section service-faq" data-reveal="section">
          <div className="container">
            <div className="faq-header" style={{ marginBottom: '6.5rem' }}>
              <h2 className="section-title serif-heading" data-reveal="title">Frequently Asked Questions</h2>
            </div>
            <div className="faq-wrapper">
              <div className="faq-list">
                {service.faq.map((faqItem, index) => {
                  const isOpen = activeFaq === index;
                  return (
                    <div 
                      key={index} 
                      className={`faq-accordion-item glass-panel ${isOpen ? 'active' : ''}`}
                      data-reveal="card"
                    >
                      <button 
                        className="faq-question-btn"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={isOpen}
                      >
                        <span>{faqItem.question}</span>
                        <ChevronDown size={18} className="faq-chevron" />
                      </button>
                      <div className="faq-answer-panel">
                        <div className="faq-answer-inner">
                          <div className="faq-answer-content">
                            <p>{faqItem.answer}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 9. Conversion CTA */}
        <section className="section home-cta-section" style={{ position: 'relative', overflow: 'hidden' }}>
          <WaveGridBackground
            colorBase="#ffffff"
            colorHigh="#2F80FF"
            className="absolute inset-0 w-full h-full"
            waveAmplitude={0.4}
            gridSize={40}
          />
          <div className="container" style={{ position: 'relative', zIndex: 10 }} data-reveal="section">
            <div className="glass-panel home-cta-card" data-reveal="cta">
              <div className="cta-content">
                <span className="section-title-tag" data-reveal="label">
                  <ShinyText
                    text="START YOUR PROJECT"
                    speed={3}
                    color="#ffffff"
                    shineColor="var(--accent-blue)"
                    spread={90}
                  />
                </span>
                <h2 className="cta-title serif-heading">
                  <FlipTextCycle
                    texts={[
                      "Let's Build Something Exceptional.",
                      "Bring Your Vision To Life.",
                      "Your Next Big Idea Starts Here."
                    ]}
                    interval={4500}
                    duration={0.8}
                  />
                </h2>
                <p className="cta-desc" data-reveal="paragraph">
                  Whether you're starting from scratch or scaling an existing business, we're ready to help you build your next digital success story.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }} data-reveal="button">
                  <Link to="/contact" className="btn btn-primary">
                    Discuss Your Scope <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              <div className="cta-bg-glow" />
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .expertise-page-wrapper {
          padding-top: 0;
        }

        /* Hero */
        .service-hero {
          padding: calc(var(--navbar-height) + 4rem) 0 6rem 0;
          background: #FFFFFF;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        .service-hero .container {
          position: relative;
          z-index: 10;
        }

        .service-hero-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .service-hero-particles canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .service-hero-title {
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 2rem;
          color: #0A0A0A !important;
        }

        .service-hero-subtitle {
          font-size: 1.2rem;
          color: #4A4A4A !important;
          max-width: 840px;
          line-height: 1.75;
        }

        .service-hero-tag-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .service-hero .section-title-tag {
          background-color: rgba(47, 128, 255, 0.06) !important;
          border-color: rgba(47, 128, 255, 0.25) !important;
          color: var(--accent-blue) !important;
          margin-bottom: 0 !important;
        }

        .service-hero-coming-soon-badge {
          display: inline-flex;
          align-items: center;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #ffffff;
          background: linear-gradient(135deg, #2F80ED 0%, #1551AF 100%);
          border: 1px solid rgba(255, 255, 255, 0.35);
          padding: 0.35rem 0.85rem;
          border-radius: 100px;
          line-height: 1;
          box-shadow: 0 2px 10px rgba(47, 128, 255, 0.35);
        }

        @media (max-width: 768px) {
          .service-hero-title {
            font-size: 2.25rem;
          }
          .service-hero-subtitle {
            font-size: 1rem;
          }
        }

        /* Advantage Comparison Section */
        .advantage-header {
          margin-bottom: 5.5rem;
        }

        @media (max-width: 768px) {
          .advantage-header {
            margin-bottom: 3.5rem;
          }
        }

        .color-red {
          color: #FF4A4A;
        }

        .color-blue {
          color: var(--accent-blue);
        }

        .column-heading {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .problems-list, .solutions-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .problem-item, .solution-item {
          padding: 1.25rem 1.5rem;
          display: flex;
          gap: 1rem;
          align-items: center;
          min-height: 80px;
        }

        .problem-item {
          border-color: rgba(255, 74, 74, 0.15) !important;
          background: rgba(255, 74, 74, 0.02) !important;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .problem-item:hover {
          border-color: rgba(255, 74, 74, 0.35) !important;
          background: rgba(255, 74, 74, 0.05) !important;
        }

        .solution-item {
          border-color: rgba(47, 128, 255, 0.15) !important;
          background: rgba(47, 128, 255, 0.02) !important;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .solution-item:hover {
          border-color: rgba(47, 128, 255, 0.4) !important;
          background: rgba(47, 128, 255, 0.08) !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), inset 0 0 12px rgba(47, 128, 255, 0.08);
        }

        .problem-icon {
          color: #FF4A4A;
          flex-shrink: 0;
        }

        .solution-icon {
          color: var(--accent-blue);
          flex-shrink: 0;
        }

        .problem-item p {
          font-size: 0.9375rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .solution-item p {
          font-size: 0.9375rem;
          line-height: 1.5;
          color: #FFFFFF;
        }

        /* Benefits */
        .benefits-header {
          margin-bottom: 4rem;
        }

        .benefits-grid {
          margin-top: 2rem;
        }

        /* Tech Showcase */
        .tech-showcase-wrapper {
          padding: 3.5rem;
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 4rem;
          align-items: center;
        }

        @media (max-width: 992px) {
          .tech-showcase-wrapper {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding: 2rem;
          }
        }

        .tech-showcase-info h3 {
          font-size: 1.75rem;
          margin-bottom: 0.75rem;
        }

        .tech-showcase-info p {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .tech-showcase-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .service-tech-badge {
          background: rgba(47, 128, 255, 0.05);
          border: 1px solid rgba(47, 128, 255, 0.15);
          color: var(--accent-blue);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.8125rem;
          font-weight: 500;
        }

        /* Process */
        .process-header {
          margin-bottom: 7rem;
        }

        .timeline-wrapper {
          position: relative;
          padding: 1rem 0;
        }

        .timeline-line {
          position: absolute;
          top: 50%;
          left: 10%;
          width: 80%;
          height: 2px;
          background: rgba(255, 255, 255, 0.08);
          z-index: 1;
        }

        .timeline-line-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0%;
          background-color: var(--accent-blue);
          box-shadow: 0 0 12px rgba(47, 128, 255, 0.8), 0 0 25px rgba(47, 128, 255, 0.4);
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
          align-items: stretch;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 992px) {
          .timeline-line {
            top: 4rem;
            left: 20px;
            width: 2px;
            height: calc(100% - 8rem);
          }
          
          .timeline-line-progress {
            width: 100%;
            height: 0%;
          }

          .process-grid {
            grid-template-columns: 1fr;
            padding-left: 3rem;
            gap: 2rem;
          }
        }

        @media (max-width: 480px) {
          .timeline-line {
            left: 14px;
          }
          .process-grid {
            padding-left: 2rem;
            gap: 1.5rem;
          }
          .timeline-step-card .glow-card-inner {
            padding: 1.75rem 1.25rem;
          }
        }

        .timeline-step-card {
          height: 100% !important;
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .timeline-step-card .glow-card-inner {
          padding: 2.5rem 1.75rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
          height: 100%;
          width: 100%;
          flex: 1;
        }

        .step-num {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          line-height: 1;
          font-weight: 300;
          color: var(--accent-blue);
        }

        .step-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #ffffff;
        }

        .timeline-step-card p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Related Projects */
        .related-projects-grid {
          margin-top: 2rem;
        }

        .related-project-card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .related-img-wrap {
          width: 100%;
          overflow: hidden;
          aspect-ratio: 16/10;
        }

        .related-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-slow);
        }

        .related-project-card:hover .related-img-wrap img {
          transform: scale(1.03);
        }

        .related-info {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .related-category {
          font-size: 0.6875rem;
          color: var(--accent-blue);
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .related-title {
          font-size: 1.25rem;
        }

        .related-info p {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* FAQ */
        .faq-wrapper {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-header {
          margin-bottom: 6.5rem;
          text-align: left;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-accordion-item {
          padding: 0;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .faq-accordion-item.active {
          border-color: rgba(47, 128, 255, 0.5) !important;
          background: linear-gradient(135deg, rgba(47, 128, 255, 0.08) 0%, rgba(17, 17, 17, 0.95) 100%) !important;
          box-shadow: 0 8px 30px rgba(47, 128, 255, 0.15);
        }

        .faq-question-btn {
          width: 100%;
          background: transparent;
          border: none;
          padding: 1.5rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          color: #ffffff;
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          outline: none;
        }

        .faq-question-btn span {
          transition: color 0.3s ease;
        }

        .faq-accordion-item.active .faq-question-btn span {
          color: var(--accent-blue);
        }

        .faq-chevron {
          color: var(--text-secondary);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
        }

        .faq-accordion-item.active .faq-chevron {
          transform: rotate(180deg);
          color: var(--accent-blue);
        }

        .faq-answer-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .faq-accordion-item.active .faq-answer-panel {
          grid-template-rows: 1fr;
        }

        .faq-answer-inner {
          overflow: hidden;
        }

        .faq-answer-content {
          padding: 0 2rem 1.5rem 2rem;
        }

        .faq-answer-content p {
          color: var(--text-secondary);
          font-size: 0.875rem;
          line-height: 1.6;
        }

        /* Final Conversion CTA */
        .home-cta-section {
          background-color: #ffffff !important;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          border-bottom: none;
        }

        .home-cta-card {
          padding: 5rem;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          text-align: center;
          background: #111111 !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          transform: translateZ(0);
          will-change: transform;
        }

        @media (max-width: 768px) {
          .home-cta-card {
            padding: 3rem 1.5rem;
          }
        }

        .cta-content {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          width: 100%;
        }

        .cta-title {
          font-size: 3.5rem;
          line-height: 1.15;
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .cta-title {
            font-size: 1.6rem !important;
            line-height: 1.25 !important;
            padding: 0 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .cta-title {
            font-size: 1.35rem !important;
            line-height: 1.3 !important;
            padding: 0;
          }
        }

        .cta-desc {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-top: 2rem;
          margin-bottom: 1.5rem;
          max-width: 680px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-bg-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(47, 128, 255, 0.1) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }
      `}</style>
    </>
  );
}
