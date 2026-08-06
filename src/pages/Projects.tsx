import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { projects, type ProjectCategoryType } from '../data/projectData';
import { Particles } from '../components/Particles';
import ShinyText from '../components/ShinyText';
import FlipTextCycle from '../components/ui/flip-text-cycle';
import WaveGridBackground from '../components/ui/wave-grid-background';
import { initScrollReveal } from '../utils/scrollReveal';

const categoryFilters: { id: ProjectCategoryType; label: string }[] = [
  { id: 'website', label: 'Websites' },
  { id: 'ecommerce', label: 'E-Commerce Stores' },
  { id: 'webapp', label: 'Custom Web Applications' },
];

export default function Projects() {
  const { id } = useParams<{ id: string }>();
  const [activeCategory, setActiveCategory] = useState<ProjectCategoryType>('website');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    initScrollReveal();
  }, [id, activeCategory]);

  const handleCategoryChange = (catId: ProjectCategoryType) => {
    if (catId === activeCategory || isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveCategory(catId);
      setIsFading(false);
    }, 180);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => p.filterCategory === activeCategory);
  }, [activeCategory]);

  // If a specific project ID is in the URL, redirect back to projects list
  if (id) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <>
      <SEO 
        title="Featured Projects & Case Studies | Websight Works" 
        description="Explore custom web applications, e-commerce stores, and corporate websites built by Websight Works. View case studies crafted from strategy to launch."
        schemas={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            'name': 'Websight Works Portfolio',
            'url': 'https://websightworks.com/projects',
            'description': 'Explore high-performance websites and web applications developed by Websight Works.',
            'mainEntity': {
              '@type': 'ItemList',
              'itemListElement': projects.map((p, idx) => ({
                '@type': 'ListItem',
                'position': idx + 1,
                'item': {
                  '@type': 'CreativeWork',
                  'name': p.title,
                  'genre': p.category,
                  'url': p.projectUrl,
                  'description': p.shortDesc,
                },
              })),
            },
          },
        ]}
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
            {/* Category Filter Navigation */}
            <div className="category-filters-wrapper" data-reveal="paragraph">
              {categoryFilters.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`category-filter-btn ${isActive ? 'active' : ''}`}
                    aria-label={`Filter by ${cat.label}`}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Grid */}
            <div className={`grid-2 portfolio-grid portfolio-grid-animated ${isFading ? 'is-fading' : 'is-visible'}`}>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <a 
                    key={project.id} 
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-card glass-panel"
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
                      <div className="portfolio-card-badges">
                        <span className="portfolio-card-category">{project.category}</span>
                        {project.technology && (
                          <span className="portfolio-card-tech">{project.technology}</span>
                        )}
                      </div>
                      <h3 className="portfolio-card-title serif-heading">{project.title}</h3>
                      <p className="portfolio-card-desc">{project.shortDesc}</p>
                    </div>
                  </a>
                ))
              ) : (
                <div className="empty-category-card glass-panel">
                  <h3 className="serif-heading">Case Studies Arriving Soon</h3>
                  <p>We are currently finalizing detailed case studies for this category. Check back shortly!</p>
                </div>
              )}
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

        .portfolio-showcase {
          padding-top: 2.2rem;
        }

        /* Category Filter Navigation (In Dark Showcase Section) */
        .category-filters-wrapper {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-top: 0;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .category-filter-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.65rem 1.4rem;
          border-radius: 9999px;
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 550;
          letter-spacing: 0.01em;
          color: rgba(255, 255, 255, 0.7);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          user-select: none;
          outline: none;
        }

        .category-filter-btn:hover {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
        }

        .category-filter-btn.active {
          color: #FFFFFF;
          background: #2F80FF;
          border-color: #2F80FF;
          box-shadow: 0 4px 16px rgba(47, 128, 255, 0.4), 0 0 12px rgba(47, 128, 255, 0.25);
          transform: translateY(-1px);
        }

        /* Portfolio Grid Animation */
        .portfolio-grid-animated {
          transition: opacity 0.22s ease-out, transform 0.22s ease-out;
        }
        .portfolio-grid-animated.is-fading {
          opacity: 0;
          transform: translateY(8px);
        }
        .portfolio-grid-animated.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .empty-category-card {
          padding: 4rem 2rem;
          text-align: center;
          grid-column: 1 / -1;
          background: rgba(18, 18, 18, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
        }

        .empty-category-card h3 {
          font-size: 1.6rem;
          color: #FFFFFF;
          margin-bottom: 0.75rem;
        }

        .empty-category-card p {
          color: rgba(255, 255, 255, 0.65);
          font-size: 1rem;
          max-width: 500px;
          margin: 0 auto;
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
          z-index: 1;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }

        .portfolio-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-slow);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
        }

        .card-hover-overlay {
          position: absolute;
          inset: 0;
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
          transform: scale(1.05) translateZ(0);
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
          position: relative;
          z-index: 10;
          margin-top: -1px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background: #0B0B0D;
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex-grow: 1;
        }

        .portfolio-card-badges {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .portfolio-card-category {
          font-size: 0.6875rem;
          color: var(--accent-blue);
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          line-height: 1;
        }

        .portfolio-card-tech {
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
          backdrop-filter: blur(6px);
          transform: translateY(-2px);
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
