import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Laptop, ShoppingBag, Cpu, Sparkles, BarChart3, Share2, Palette } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HeroSequence from '../components/HeroSequence';
import Preloader from '../components/Preloader';
import SEO from '../components/SEO';
import TypingKeyboard from '../components/TypingKeyboard';
import ShinyText from '../components/ShinyText';
import TiltedCard from '../components/TiltedCard';
import { projects } from '../data/projectData';
import { services } from '../data/serviceData';
import GlowBorderCard from '../components/ui/glow-border-card';
import FlipTextCycle from '../components/ui/flip-text-cycle';
import WaveGridBackground from '../components/ui/wave-grid-background';
import { initScrollReveal } from '../utils/scrollReveal';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, any> = {
  Laptop,
  ShoppingBag,
  Cpu,
  Sparkles,
  BarChart3,
  Share2,
  Palette,
};

export default function Home() {
  const [preloadedImages, setPreloadedImages] = useState<HTMLImageElement[] | null>(null);
  const [exitComplete, setExitComplete] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  // Initialize scroll reveals when the preloader exits on the Home page
  useEffect(() => {
    if (exitComplete) {
      (window as any).preloaderComplete = true;
      window.dispatchEvent(new Event('preloader-complete'));

      const timer = setTimeout(() => {
        initScrollReveal();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [exitComplete]);

  useGSAP(() => {
    if (!exitComplete || !aboutRef.current) return;
    
    // Animate children elements in a subtle staggered fade-up on scroll
    gsap.fromTo(
      aboutRef.current.querySelectorAll('.section-title-tag, .serif-heading, .about-preview-details > *'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }, { scope: aboutRef, dependencies: [exitComplete] });

  useGSAP(() => {
    if (!exitComplete || !processRef.current) return;

    const isMobile = window.innerWidth <= 992;
    const targetProperty = isMobile ? 'height' : 'width';

    // 1. Draw the blue connecting line sequentially
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

    // 2. Stagger fade-in the process cards to match the drawing line
    gsap.fromTo(
      processRef.current.querySelectorAll('.timeline-step-card'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.25,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: processRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }, { scope: processRef, dependencies: [exitComplete] });

  return (
    <>
      <SEO 
        title="Websight Works | Web Development, Custom Apps & AI Solutions in Kolhapur" 
        description="Websight Works is a premier web development company in Kolhapur, Maharashtra. We build high-performance websites, custom web applications, e-commerce stores, and AI solutions."
        schemas={[
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            'name': 'Core Digital Services',
            'itemListElement': services.map((s, idx) => ({
              '@type': 'ListItem',
              'position': idx + 1,
              'item': {
                '@type': 'Service',
                'name': s.title,
                'url': `https://websightworks.com/expertise/${s.id}`,
                'description': s.homepageDesc,
                'provider': {
                  '@id': 'https://websightworks.com/#organization',
                },
                'areaServed': {
                  '@type': 'AdministrativeArea',
                  'name': 'Kolhapur, Maharashtra, India',
                },
              },
            })),
          },
        ]}
      />

      {/* 1. Canvas Scroll Sequence Hero */}
      {preloadedImages && <HeroSequence images={preloadedImages} />}

      {/* Preloader Overlay (Fades out and unmounts) */}
      {!exitComplete && (
        <Preloader 
          onPreloadComplete={(imgs) => setPreloadedImages(imgs)} 
          onExitComplete={() => setExitComplete(true)} 
        />
      )}

      {/* 2. Studio About Preview */}
      <section ref={aboutRef} className="section about-preview">
        <div className="container">
          <div className="grid-2">
            <div>
              <span className="section-title-tag">
                <ShinyText
                  text="WHO WE ARE ?"
                  speed={3}
                  color="#050505"
                  shineColor="var(--accent-blue)"
                  spread={90}
                />
              </span>
              <div className="about-keyboard-wrapper">
                <TypingKeyboard scale={0.95} />
              </div>
            </div>
            <div className="about-preview-details">
              <p className="lead-text">
                <strong className="brand-bold">Websight Works</strong> helps businesses establish, grow, and transform their digital presence through modern websites, custom web applications, AI-powered solutions, e-commerce solutions, data analytics, UI/UX design, and digital marketing.
              </p>
              <p>
                Every project combines strategy, design, and engineering to create fast, scalable, and business-focused digital experiences that help companies grow with confidence.
              </p>
              <Link to="/about" className="btn btn-primary">
                About Websight Works <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Expertise Capabilities Grid */}
      <section className="section expertise-preview">
        <div className="container" data-reveal="section">
          <div className="flex-between section-header-wrap">
            <div>
              <span className="section-title-tag" data-reveal="label">
                <ShinyText
                  text="WHAT WE DO"
                  speed={3}
                  color="#ffffff"
                  shineColor="var(--accent-blue)"
                  spread={90}
                />
              </span>
              <h2 className="section-title serif-heading" data-reveal="title">Digital Solution Expertise</h2>
            </div>
            <p className="section-desc-aside" data-reveal="paragraph">
              Specialized services tailored for enterprise clients who value craftsmanship, performance, and scalability.
            </p>
          </div>

          <div className="grid-3 services-showcase-grid">
            {services.map((service) => {
              const Icon = iconMap[service.iconName];
              return (
                <Link key={service.id} to={`/expertise/${service.id}`} className="service-card-tilt-link" data-reveal="card">
                  <TiltedCard
                    imageSrc={service.imageUrl}
                    altText={`${service.title} Background Visual`}
                    containerHeight="380px"
                    containerWidth="100%"
                    imageHeight="380px"
                    imageWidth="100%"
                    rotateAmplitude={8}
                    scaleOnHover={1.04}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent={true}
                    overlayContent={
                      <div className="service-card-overlay-content">
                        <div className="service-card-icon-wrapper">
                          {Icon && <Icon size={28} className="service-icon" />}
                        </div>
                        <h3 className="service-card-title">{service.title}</h3>
                        <p className="service-card-desc">{service.homepageDesc}</p>
                        <span className="service-card-link">
                          View Service <ArrowRight size={14} className="arrow-icon" />
                        </span>
                      </div>
                    }
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Featured Projects Showcase */}
      <section className="section featured-projects">
        <div className="container" data-reveal="section">
          <div className="flex-between section-header-wrap projects-header-wrap">
            <div>
              <span className="section-title-tag" data-reveal="label">
                <ShinyText
                  text="FEATURED WORK"
                  speed={3}
                  color="#050505"
                  shineColor="var(--accent-blue)"
                  spread={90}
                />
              </span>
              <h2 className="section-title serif-heading" data-reveal="title">Recent Projects</h2>
            </div>
            <Link to="/projects" className="btn btn-primary" data-reveal="button">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="projects-list-wrapper">
          {projects.slice(0, 3).map((project, idx) => (
            <div key={project.id} className="project-feature-row-outer">
              <div className="container" data-reveal="section">
                <div className="project-feature-row">
                  <div className="project-feature-image-col">
                    <a 
                      href={project.projectUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`Visit website for ${project.title}`}
                    >
                      <div className="project-image-container glass-panel" data-reveal="image">
                        <img 
                          src={project.imageUrl} 
                          alt={`${project.title} Interface Showcase`}
                          className="project-feature-img"
                          loading="lazy"
                          width="800"
                          height="500"
                        />
                        <div className="image-overlay-glow" />
                      </div>
                    </a>
                  </div>
                  <div className="project-feature-info-col">
                    <span className="project-index" data-reveal="label">0{idx + 1} / FEATURED WORK</span>
                    <h3 className="project-feature-title serif-heading" data-reveal="title">{project.title}</h3>
                    <div className="project-feature-badges" data-reveal="paragraph">
                      <span className="project-feature-category">{project.category}</span>
                      {project.technology && (
                        <span className="project-feature-tech">{project.technology}</span>
                      )}
                    </div>
                    <p className="project-feature-desc" data-reveal="paragraph">{project.shortDesc}</p>
                    <a 
                      href={project.projectUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-secondary" 
                      data-reveal="button"
                    >
                      Visit Website <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Production Workflow Process */}
      <section ref={processRef} className="section process-timeline-section">
        <div className="container">
          <div className="flex-between section-header-wrap">
            <div>
              <span className="section-title-tag">
                <ShinyText
                  text="OUR PROCESS"
                  speed={3}
                  color="#ffffff"
                  shineColor="var(--accent-blue)"
                  spread={90}
                />
              </span>
              <h2 className="section-title serif-heading">From Vision To Reality</h2>
            </div>
            <p className="section-desc-aside">
              A refined process that transforms ideas into exceptional digital experiences.
            </p>
          </div>

          <div className="timeline-wrapper">
            <div className="timeline-line">
              <div className="timeline-line-progress" />
            </div>
            <div className="timeline-steps">
              <GlowBorderCard className="timeline-step-card">
                <span className="step-num">01</span>
                <h4 className="step-title">Discovery & Scope</h4>
                <p>We analyze the client requirements, audit performance parameters, and script out the interactive narrative blueprint.</p>
              </GlowBorderCard>
              <GlowBorderCard className="timeline-step-card">
                <span className="step-num">02</span>
                <h4 className="step-title">Cinematic UI/UX</h4>
                <p>We craft custom typography assets, structural wireframe layout maps, and micro-interaction prototypes.</p>
              </GlowBorderCard>
              <GlowBorderCard className="timeline-step-card">
                <span className="step-num">03</span>
                <h4 className="step-title">High-Perf Engineering</h4>
                <p>Our engineers build with modular React architectures, register 60fps canvas contexts, and secure API networks.</p>
              </GlowBorderCard>
              <GlowBorderCard className="timeline-step-card">
                <span className="step-num">04</span>
                <h4 className="step-title">QA & Performance</h4>
                <p>We run cross-browser profiling, responsive breakpoint reviews, and audit screen-readers for compliance.</p>
              </GlowBorderCard>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Conversion CTA Block */}
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
              <Link to="/contact" className="btn btn-primary" data-reveal="button">
                Discuss Your Scope <ArrowRight size={16} />
              </Link>
            </div>
            <div className="cta-bg-glow" />
          </div>
        </div>
      </section>

      <style>{`
        /* About Preview Section (Premium White page break) */
        .about-preview {
          background-color: #FFFFFF;
          color: #050505;
        }

        .brand-bold {
          font-weight: 800;
        }


        @media (min-width: 992px) {
          .about-preview .section-title-tag {
            margin-left: 4rem; /* Shift right to align with keyboard on desktop */
          }
        }


        .about-keyboard-wrapper {
          width: 100%;
          height: 540px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          margin-top: 3rem; /* Increased to push component down from the title label */
        }

        @media (min-width: 992px) {
          .about-keyboard-wrapper {
            transform: translate(-80px, 30px); /* Visual correction for isometric offset (left and down) */
          }
        }

        @media (max-width: 992px) {
          .about-keyboard-wrapper {
            display: none !important;
          }
        } 

        @media (min-width: 992px) {
          .about-preview {
            min-height: 100vh;
            display: flex;
            align-items: center;
          }
        }

        .about-preview .section-title {
          font-size: 3.5rem;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 0;
          color: #050505;
        }

        .about-preview-details {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          justify-content: center;
        }

        .about-preview-details p {
          color: #444444; /* Dark charcoal for secondary text legibility on white */
          line-height: 1.75;
          font-size: 1.0625rem;
        }

        .about-preview-details .lead-text {
          color: #050505;
          font-size: 1.3125rem;
          line-height: 1.6;
          font-weight: 500;
        }

        .about-preview-details .btn {
          align-self: flex-start;
          margin-top: 1rem;
        }


        @media (max-width: 768px) {
          .about-preview .section-title {
            font-size: 2.25rem;
          }
          .about-preview-details .lead-text {
            font-size: 1.125rem;
          }
        }

        /* Section header layouts */
        .section-header-wrap {
          margin-bottom: 4rem;
        }

        .section-header-wrap {
          align-items: flex-end;
        }

        .section-desc-aside {
          color: var(--text-secondary);
          max-width: 400px;
          font-size: 0.9375rem;
          line-height: 1.6;
          margin-bottom: 1.4rem;
        }

        @media (max-width: 992px) {
          .section-header-wrap {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
          .section-desc-aside {
            max-width: 100%;
          }
        }

        /* Expertise preview cards with TiltedCard */
        .service-card-tilt-link {
          display: block;
          width: 100%;
          height: 100%;
          outline: none;
        }

        .services-showcase-grid .tilted-card-inner {
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(12, 12, 12, 0.6);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .services-showcase-grid .tilted-card-img {
          opacity: 0.22;
          mix-blend-mode: luminosity;
          filter: brightness(0.65) contrast(1.2);
          transition: opacity 0.4s ease, filter 0.4s ease;
        }

        .service-card-tilt-link:hover .tilted-card-inner {
          border-color: rgba(47, 128, 255, 0.35);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 15px rgba(47, 128, 255, 0.15);
        }

        .service-card-tilt-link:hover .tilted-card-img {
          opacity: 0.4;
          filter: brightness(0.9) contrast(1.25);
        }

        .service-card-overlay-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          box-sizing: border-box;
          z-index: 2;
          background: linear-gradient(to bottom, rgba(5, 5, 5, 0.35) 0%, rgba(5, 5, 5, 0.85) 100%);
        }

        .service-card-icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          margin-bottom: 2rem;
        }

        .service-card-tilt-link:hover .service-card-icon-wrapper {
          background: var(--accent-blue-glow);
          border-color: var(--accent-blue);
          color: var(--accent-blue);
          transform: translateY(-4px);
          box-shadow: 0 0 15px var(--accent-blue-glow);
        }

        .service-card-title {
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          transition: color 0.4s ease;
        }

        .service-card-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: auto;
        }

        .service-card-link {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #FFFFFF;
          background-color: var(--accent-blue);
          padding: 0.5rem 1.25rem;
          border-radius: 99px;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          transition: background-color 0.3s ease, gap 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          margin-top: 1.5rem;
        }

        .service-card-tilt-link:hover .service-card-link {
          background-color: #4390FF;
          color: #FFFFFF;
          gap: 0.6rem;
          box-shadow: 0 0 15px rgba(47, 128, 255, 0.4);
          transform: translateY(-1px);
        }

        .service-card-link .arrow-icon {
          transition: transform 0.3s ease;
        }

        .service-card-tilt-link:hover .service-card-link .arrow-icon {
          transform: translateX(2px);
        }

        /* Featured Projects Section (White Page Break) */
        .featured-projects {
          background-color: #FFFFFF;
          color: #050505;
        }

        .projects-header-wrap {
          align-items: flex-end;
        }

        .projects-header-wrap .btn-primary {
          transform: translateY(-22px);
        }

        @media (max-width: 992px) {
          .projects-header-wrap {
            align-items: flex-start !important;
            text-align: left !important;
          }
          .projects-header-wrap .btn-primary {
            transform: none !important;
            align-self: flex-start !important;
          }
        }

        .featured-projects .section-title {
          color: #050505;
        }

        .featured-projects .project-feature-title {
          color: #050505;
        }

        .featured-projects .project-feature-category {
          color: #555555;
        }

        .featured-projects .project-feature-desc {
          color: #333333;
        }

        .featured-projects .tech-badge {
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: #555555;
        }

        .featured-projects .project-image-container.glass-panel {
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .featured-projects .btn-secondary {
          background-color: transparent;
          color: #050505;
          border: 1px solid rgba(0, 0, 0, 0.12);
        }

        .featured-projects .btn-secondary:hover {
          background-color: var(--accent-blue);
          border-color: var(--accent-blue);
          color: #FFFFFF;
          box-shadow: 0 5px 15px rgba(47, 128, 255, 0.25);
          transform: translateY(-2px);
        }

        .projects-list-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-top: 2rem;
        }

        .project-feature-row-outer {
          width: 100%;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .project-feature-row-outer:last-child {
          border-bottom: none;
        }

        .project-feature-row {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 5rem;
          align-items: center;
          padding: 5rem 0;
        }

        .project-feature-row-outer:first-child .project-feature-row {
          padding-top: 2rem;
        }

        .project-feature-row-outer:last-child .project-feature-row {
          padding-bottom: 2rem;
        }

        @media (max-width: 992px) {
          .project-feature-row {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .project-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1.6;
          border-radius: 12px;
          overflow: hidden;
          padding: 0;
          cursor: pointer;
          border: 1px solid rgba(47, 128, 255, 0.4) !important;
          animation: border-glow-blue 4s ease-in-out infinite;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
                      border-color 0.4s cubic-bezier(0.25, 1, 0.5, 1),
                      box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .project-image-container:hover {
          animation: none;
          border-color: rgba(47, 128, 255, 0.95) !important;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 0 30px rgba(47, 128, 255, 0.45);
        }

        .project-feature-row-outer:nth-child(2n) .project-image-container {
          animation-delay: 1s;
        }

        .project-feature-row-outer:nth-child(3n) .project-image-container {
          animation-delay: 2s;
        }

        @keyframes border-glow-blue {
          0% {
            border-color: rgba(47, 128, 255, 0.35);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35), 0 0 12px rgba(47, 128, 255, 0.12);
          }
          50% {
            border-color: rgba(47, 128, 255, 0.8);
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.4), 0 0 22px rgba(47, 128, 255, 0.35);
          }
          100% {
            border-color: rgba(47, 128, 255, 0.35);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35), 0 0 12px rgba(47, 128, 255, 0.12);
          }
        }

        .project-feature-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-slow);
          will-change: transform;
        }

        .project-image-container:hover .project-feature-img {
          transform: scale(1.03);
        }

        .image-overlay-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(47, 128, 255, 0.05) 0%, transparent 100%);
          pointer-events: none;
        }

        .project-feature-info-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }

        .project-index {
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: var(--accent-blue);
        }

        .project-feature-title {
          font-size: 2.2rem;
          line-height: 1.1;
          white-space: nowrap;
        }

        @media (max-width: 1200px) {
          .project-feature-title {
            font-size: 1.85rem;
          }
        }

        @media (max-width: 992px) {
          .project-feature-title {
            font-size: 2.2rem;
            white-space: normal;
          }
        }

        .project-feature-badges {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
          margin-bottom: 0.5rem;
        }

        .project-feature-category {
          font-size: 0.8125rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
          line-height: 1;
        }

        .project-feature-tech {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 20px;
          padding: 0 0.55rem;
          box-sizing: border-box;
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          line-height: 1;
          color: rgba(255, 255, 255, 0.75);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 9999px;
          transform: translateY(-2px);
        }

        .project-feature-desc {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.9375rem;
          margin-bottom: 0.5rem;
        }

        .tech-badge {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          padding: 0.375rem 0.75rem;
          border-radius: 4px;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        /* Methodology Process Section */
        .process-header {
          margin-bottom: 5rem;
        }

        .process-desc {
          color: var(--text-secondary);
          max-width: 550px;
          margin: 1.5rem auto 0 auto;
        }

        .timeline-wrapper {
          position: relative;
          padding: 2rem 0;
        }

        .timeline-line {
          position: absolute;
          top: 50%;
          left: 12.5%;
          width: 75%;
          height: 2px;
          background: rgba(255, 255, 255, 0.05);
          z-index: 1;
        }

        .timeline-line-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0%;
          background-color: var(--accent-blue);
          box-shadow: 0 0 10px rgba(47, 128, 255, 0.6);
        }

        .timeline-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
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
          
          .timeline-steps {
            grid-template-columns: 1fr;
            padding-left: 3rem;
            gap: 2.5rem;
          }
        }

        .timeline-step-card {
          height: 100%;
          width: 100%;
        }

        .timeline-step-card .glow-card-inner {
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
          height: 100%;
          width: 100%;
        }

        .step-num {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          line-height: 1;
          font-weight: 300;
        }

        .step-title {
          font-size: 1.125rem;
          font-weight: 600;
        }

        .timeline-step-card p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Metrics / Why Choose Us */
        .metrics-intro-text {
          color: var(--text-secondary);
          line-height: 1.7;
          margin-top: 1.5rem;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 576px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }

        .metric-card {
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: flex-start;
        }

        .metric-value {
          font-family: var(--font-serif);
          font-size: 3rem;
          font-weight: 300;
          color: #ffffff;
          line-height: 1;
        }

        .metric-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
        }

        /* Testimonials Section */
        .testimonial-editorial-wrapper {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .editorial-blockquote {
          border: none;
          margin: 0;
          padding: 0;
        }

        .quote-text {
          font-size: 2.25rem;
          line-height: 1.4;
          color: #ffffff;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }

        .quote-cite {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-style: normal;
        }

        .cite-name {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
        }

        .cite-title {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        @media (max-width: 768px) {
          .quote-text {
            font-size: 1.5rem;
          }
        }

        /* Home Conversion CTA Section */
        .home-cta-section {
          background-color: #ffffff !important;
        }

        /* Home Conversion CTA Card */
        .home-cta-card {
          padding: 5rem;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          text-align: center;
          background: #111111 !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
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
