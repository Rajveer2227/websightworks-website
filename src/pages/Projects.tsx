import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { projects } from '../data/projectData';
import { Particles } from '../components/Particles';
import ShinyText from '../components/ShinyText';
import FlipTextCycle from '../components/ui/flip-text-cycle';
import WaveGridBackground from '../components/ui/wave-grid-background';
import { initScrollReveal } from '../utils/scrollReveal';

export default function Projects() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    initScrollReveal();
  }, [id]);

  // If a specific project ID is in the URL, redirect back to projects list
  if (id) {
    return <Navigate to="/projects" replace />;
  }

  // Otherwise, render the standard Projects Showcase grid

  return (
    <>
      <SEO 
        title="Our Flagship Projects" 
        description="Explore the case studies of Websight Works, showcasing high-performance custom web applications, asset management panels, and AI dashboards."
      />

      <div className="portfolio-page-wrapper">
        {/* 1. Hero */}
        <section className="section portfolio-hero" data-reveal="section" style={{ position: 'relative', overflow: 'hidden' }}>
          <Particles
            className="projects-hero-particles"
            quantity={45}
            ease={80}
            color="#2f80ff"
            refresh
          />
          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <span className="section-title-tag" data-reveal="label">
              <ShinyText
                text="PORTFOLIO"
                speed={3}
                color="#050505"
                shineColor="var(--accent-blue)"
                spread={90}
              />
            </span>
            <h1 className="portfolio-hero-title serif-heading" data-reveal="title">Featured Projects</h1>
            <p className="portfolio-hero-desc" data-reveal="paragraph">
              Explore a collection of high-performance digital<br />
              experiences crafted from strategy to launch.
            </p>
          </div>
        </section>

        {/* 2. Portfolio Grid */}
        <section className="section portfolio-showcase" data-reveal="section">
          <div className="container">
            {/* Grid */}
            <div className="grid-2 portfolio-grid">
              {projects.map((project) => (
                <a 
                  key={project.id} 
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-card glass-panel"
                  data-reveal="card"
                >
                  <div className="portfolio-img-wrap">
                    <img 
                      src={project.imageUrl} 
                      alt={`${project.title} Mockup Preview`} 
                      loading="lazy"
                      width="400"
                      height="250"
                    />
                    <div className="card-hover-overlay">
                      <span className="hover-explore">Visit Website <ArrowRight size={14} /></span>
                    </div>
                  </div>
                  <div className="portfolio-card-info">
                    <span className="portfolio-card-category">{project.category}</span>
                    <h3 className="portfolio-card-title serif-heading">{project.title}</h3>
                    <p className="portfolio-card-desc">{project.shortDesc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Final Conversion CTA */}
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
                <h2 className="cta-title serif-heading" data-reveal="title">
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
        .portfolio-page-wrapper {
          padding-top: 0;
        }

        /* Hero */
        .portfolio-hero {
          padding: calc(var(--navbar-height) + 4rem) 0 6rem 0;
          background: #FFFFFF;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        .portfolio-hero-title {
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 2rem;
          color: #0A0A0A !important;
        }

        .portfolio-hero-desc {
          font-size: 1.25rem;
          color: #4A4A4A !important;
          max-width: 700px;
          line-height: 1.7;
        }

        .portfolio-hero .section-title-tag {
          background-color: rgba(47, 128, 255, 0.06) !important;
          border-color: rgba(47, 128, 255, 0.25) !important;
          color: var(--accent-blue) !important;
        }

        .projects-hero-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .projects-hero-particles canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        /* Filters */
        .filters-wrapper {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 4rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: var(--transition-fast);
          padding: 0.5rem 0;
          position: relative;
        }

        .filter-btn:hover, .filter-btn.active {
          color: var(--text-primary);
        }

        .filter-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1.6rem;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--accent-blue);
        }

        /* Portfolio Grid */
        .portfolio-grid {
          margin-top: 2rem;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3.5rem;
        }

        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .portfolio-card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          border: 1px solid rgba(47, 128, 255, 0.4);
          animation: border-glow-blue 4s ease-in-out infinite;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
                      border-color 0.4s cubic-bezier(0.25, 1, 0.5, 1),
                      box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .portfolio-card:hover {
          transform: translateY(-6px);
          animation: none;
          border-color: rgba(47, 128, 255, 0.95);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 0 30px rgba(47, 128, 255, 0.45);
        }

        .portfolio-grid a:nth-child(2n) {
          animation-delay: 1s;
        }
        .portfolio-grid a:nth-child(3n) {
          animation-delay: 2s;
        }
        .portfolio-grid a:nth-child(4n) {
          animation-delay: 3s;
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

        .portfolio-img-wrap {
          width: 100%;
          overflow: hidden;
          aspect-ratio: 16/10;
          position: relative;
        }

        .portfolio-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-slow);
        }

        .card-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(5, 5, 5, 0.85);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition-smooth);
        }

        .portfolio-card:hover .card-hover-overlay {
          opacity: 1;
        }

        .portfolio-card:hover .portfolio-img-wrap img {
          transform: scale(1.05);
        }

        .hover-explore {
          color: var(--accent-blue);
          font-size: 0.875rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          letter-spacing: 0.05em;
        }

        .portfolio-card-info {
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex-grow: 1;
        }

        .portfolio-card-category {
          font-size: 0.6875rem;
          color: var(--accent-blue);
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .portfolio-card-title {
          font-size: 1.5rem;
        }

        .portfolio-card-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
          flex-grow: 1;
        }

        .portfolio-card-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
          margin-top: 1rem;
        }

        .mini-tech-badge {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.6875rem;
          color: var(--text-secondary);
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
            font-size: 2.25rem;
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
