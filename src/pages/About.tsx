import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Eye, Award } from 'lucide-react';
import SEO from '../components/SEO';
import { Particles } from '../components/Particles';
import ShinyText from '../components/ShinyText';
import FlipTextCycle from '../components/ui/flip-text-cycle';
import WaveGridBackground from '../components/ui/wave-grid-background';
import InteractiveBook, { type BookPage } from '../components/InteractiveBook';
import { initScrollReveal } from '../utils/scrollReveal';

export default function About() {
  useEffect(() => {
    initScrollReveal();
  }, []);

  const bookPages: BookPage[] = [
    {
      pageNumber: 1,
      title: "Performance First",
      content: "Every website and application is optimized for speed, security, and long-term scalability.",
      backTitle: "Fully Custom",
      backContent: "No templates or shortcuts. Every solution is designed around your business goals."
    },
    {
      pageNumber: 2,
      title: "Transparent Process",
      content: "Clear communication, milestone-based delivery, and complete project visibility from start to finish.",
      backTitle: "Long-Term Partnership",
      backContent: "We continue supporting, improving, and scaling your digital products beyond launch."
    },
    {
      pageNumber: 3,
      title: "Let's Build Together",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <span>
            Turning ambitious ideas into exceptional digital products.
          </span>
          <Link
            to="/contact"
            className="btn btn-primary"
            style={{
              alignSelf: 'flex-start',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--accent-blue)',
              color: '#ffffff',
              border: 'none',
              padding: '0.75rem 1.75rem',
              borderRadius: '30px',
              fontWeight: 500,
              fontSize: '0.875rem',
              textDecoration: 'none'
            }}
          >
            Start Project &rarr;
          </Link>
        </div>
      ),
      backContent: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', opacity: 0.15 }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1rem', color: '#1a1a1a', margin: 0 }}>Websight Works</p>
        </div>
      )
    }
  ];

  return (
    <>
      <SEO 
        title="Our Story & Philosophy" 
        description="Learn about the Websight Works core mission, luxury digital design tenets, technology stack guidelines, and organizational values."
      />

      <div className="about-page-wrapper">
        {/* 1. Hero Header */}
        <section className="section about-hero" data-reveal="section">
          <Particles
            className="about-hero-particles"
            quantity={45}
            ease={80}
            color="#2f80ff"
            refresh
          />
          <div className="container">
            <span className="section-title-tag" data-reveal="label">
              <ShinyText
                text="ABOUT US"
                speed={3}
                color="#050505"
                shineColor="var(--accent-blue)"
                spread={90}
              />
            </span>
            <h1 className="about-hero-title serif-heading" data-reveal="title">
              Building Digital Experiences
              <br />
              That Drive Business Growth.
            </h1>
            <p className="about-hero-desc" data-reveal="paragraph">
              We combine strategy, design, and technology to create websites,
              <br />
              applications, and digital solutions that help businesses grow with confidence.
            </p>
          </div>
        </section>

        {/* 2. Core Story / Mission / Vision */}
        <section className="section about-narrative" data-reveal="section">
          <div className="container">
            <div className="grid-2">
              <div className="narrative-col">
                <span className="section-title-tag" data-reveal="label">
                  <ShinyText
                    text="OUR STORY"
                    speed={3}
                    color="#ffffff"
                    shineColor="var(--accent-blue)"
                    spread={90}
                  />
                </span>
                <h2 className="serif-heading narrative-title" data-reveal="title">Innovation Meets Precision.</h2>
                <p className="narrative-p" data-reveal="paragraph">
                  Websight Works is a digital solutions company based in Kolhapur, Maharashtra, helping businesses across India and worldwide build modern digital experiences. We combine strategy, design, and technology to create websites, custom applications, AI-powered solutions, and scalable systems that help businesses grow with confidence.
                </p>
              </div>
              <div className="values-list">
                <div className="value-card glass-panel" data-reveal="card">
                  <div className="value-icon"><Eye size={20} /></div>
                  <div className="value-info">
                    <h4>Our Vision</h4>
                    <p>To empower businesses with innovative digital solutions that inspire growth, strengthen brands, and create lasting impact.</p>
                  </div>
                </div>
                <div className="value-card glass-panel" data-reveal="card">
                  <div className="value-icon"><Award size={20} /></div>
                  <div className="value-info">
                    <h4>Our Mission</h4>
                    <p>To deliver exceptional websites, software, AI solutions, and digital experiences through creativity, technology, and attention to detail.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Founders Overview Section */}
        <section className="section about-founders" data-reveal="section">
          <div className="container">
            <div className="text-center founders-header">
              <span className="section-title-tag" data-reveal="label">
                <ShinyText
                  text="LEADERSHIP"
                  speed={3}
                  color="#ffffff"
                  shineColor="var(--accent-blue)"
                  spread={90}
                />
              </span>
              <h2 className="section-title serif-heading" data-reveal="title">Founders Overview</h2>
            </div>

            <div className="founders-rows-wrap">
              {/* Row 1 - Founder */}
              <div className="founder-row" data-reveal="row">
                <div className="founder-img-col">
                  <div className="founder-portrait-container">
                    <img 
                      src="/images/founder_img.jpeg" 
                      alt="Viraj Chavan" 
                      className="founder-portrait-img"
                    />
                  </div>
                </div>
                <div className="founder-content-col">
                  <h3 className="serif-heading founder-name">Viraj Chavan</h3>
                  <span className="founder-subtitle">Founder & CEO</span>
                  
                  <div className="founder-bio">
                    <p>
                      Hi, I'm Viraj Chavan, Founder & CEO of Websight Works and a Computer Science graduate passionate about building modern digital solutions that help businesses grow. My expertise spans website development, custom web applications, AI-powered solutions, UI/UX design, and scalable digital platforms focused on performance, security, and user experience.
                    </p>
                    <p>
                      Based in Kolhapur, Maharashtra, I work with startups, growing businesses, and enterprises across India and internationally, delivering technology that strengthens digital presence, streamlines operations, and supports long-term business growth.
                    </p>
                    <p>
                      At Websight Works, my vision is to combine strategy, creativity, and technology to build innovative digital experiences that create measurable value and lasting relationships with our clients.
                    </p>
                  </div>
                  
                  <a 
                    href="https://www.linkedin.com/in/viraj-chavan-vc/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary founder-linkedin-btn"
                  >
                    View LinkedIn →
                  </a>
                </div>
              </div>

              {/* Row 2 - Co-Founder */}
              <div className="founder-row reverse-row" data-reveal="row">
                <div className="founder-content-col">
                  <h3 className="serif-heading founder-name">Rajveer Chavan</h3>
                  <span className="founder-subtitle">Co-Founder & COO</span>
                  
                  <div className="founder-bio">
                    <p>
                      Hi, I'm Rajveer Chavan, Co-Founder & Chief Operating Officer of Websight Works and a Computer Science graduate passionate about building modern digital solutions that help businesses grow. I specialize in business operations, website development, custom web applications, AI-powered solutions, and scalable digital platforms.
                    </p>
                    <p>
                      Based in Kolhapur, Maharashtra, I work with startups, growing businesses, and enterprises ensuring every project is delivered with quality, transparency, and measurable business value.
                    </p>
                    <p>
                      At Websight Works, my vision is to combine strategy, innovation, and operational excellence to create digital experiences that empower businesses to grow with confidence.
                    </p>
                  </div>
                  
                  <a 
                    href="https://www.linkedin.com/in/rajveer2227" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary founder-linkedin-btn"
                  >
                    View LinkedIn →
                  </a>
                </div>
                <div className="founder-img-col">
                  <div className="founder-portrait-container">
                    <img 
                      src="/images/co-founder_img.jpeg" 
                      alt="Rajveer Chavan" 
                      className="founder-portrait-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Why Choose Us (Interactive Book Showcase) */}
        <section className="section about-choose-us" data-reveal="section">
          <div className="container text-center">
            <div className="choose-us-header-grid" data-reveal="section">
              <div className="choose-us-title-col" style={{ textAlign: 'left' }}>
                <span className="section-title-tag" data-reveal="label">
                  <ShinyText
                    text="WHY CHOOSE US"
                    speed={3}
                    color="#ffffff"
                    shineColor="var(--accent-blue)"
                    spread={90}
                  />
                </span>
                <h2 className="serif-heading section-title" style={{ color: '#ffffff', margin: 0 }}>Why Choose Websight Works</h2>
              </div>
              <div className="choose-us-desc-col" style={{ textAlign: 'left' }}>
                <p className="choose-us-subtext" data-reveal="paragraph">
                  Every project is guided by craftsmanship, transparency, and a commitment to building digital products that last.
                </p>
              </div>
            </div>

            <div className="book-showcase-container" data-reveal="content">
              <InteractiveBook
                bookTitle="Why Businesses Choose Us ?"
                bookAuthor="Crafted for Performance"
                pages={bookPages}
                width={380}
                height={520}
              />
            </div>
          </div>
        </section>

        {/* 5. Conversion CTA Block */}
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
      </div>

      <style>{`
        .about-page-wrapper {
          padding-top: 0;
        }

        /* Hero */
        .about-hero {
          padding: calc(var(--navbar-height) + 4rem) 0 6rem 0;
          background: #FFFFFF;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        .about-hero .container {
          position: relative;
          z-index: 10;
        }

        .about-hero-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .about-hero-particles canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .about-hero-title {
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 2rem;
          max-width: 900px;
          color: #0A0A0A !important;
        }

        .about-hero-desc {
          font-size: 1.25rem;
          color: #4A4A4A !important;
          max-width: 700px;
          line-height: 1.7;
        }

        .about-hero .section-title-tag {
          background-color: rgba(47, 128, 255, 0.06) !important;
          border-color: rgba(47, 128, 255, 0.25) !important;
          color: var(--accent-blue) !important;
        }

        @media (max-width: 768px) {
          .about-hero-title {
            font-size: 2.25rem;
          }
          .about-hero-desc {
            font-size: 1rem;
          }
        }

        /* Narrative & Values */
        .narrative-title {
          font-size: 2.5rem;
          line-height: 1.2;
          margin-bottom: 2rem;
        }

        .narrative-p {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.9375rem;
          margin-bottom: 1.5rem;
        }

        .values-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          justify-content: center;
        }

        .value-card {
          padding: 1.5rem;
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .value-card:hover {
          border-color: rgba(47, 128, 255, 0.4);
          box-shadow: 0 0 15px rgba(47, 128, 255, 0.1);
        }

        .value-card:hover .value-info h4 {
          color: var(--accent-blue) !important;
        }

        .value-card:hover .value-icon {
          background: rgba(47, 128, 255, 0.1);
          border-color: var(--accent-blue);
          box-shadow: 0 0 10px var(--accent-blue-glow);
        }

        .value-icon {
          width: 36px;
          height: 36px;
          border-radius: 6px;
          background: rgba(47, 128, 255, 0.05);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-blue);
          flex-shrink: 0;
          transition: var(--transition-fast);
        }

        .value-info h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
          transition: color var(--transition-fast);
        }

        .value-info p {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* Founders Section */
        .about-founders {
          background-color: #050505;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          padding: 8rem 0;
          contain: layout;
        }

        .founders-header {
          margin-bottom: 5rem;
        }

        .founders-rows-wrap {
          display: flex;
          flex-direction: column;
        }

        .founder-row {
          display: flex;
          align-items: center;
          gap: 5rem;
          padding: 5rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }


        .founder-img-col {
          flex: 0 0 40%;
          display: flex;
          justify-content: center;
        }

        .founder-content-col {
          flex: 0 0 60%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .founder-row.reverse-row .founder-content-col {
          padding-right: 2rem;
        }

        .founder-row:not(.reverse-row) .founder-content-col {
          padding-left: 2rem;
        }

        .founder-portrait-container {
          width: 420px;
          height: 420px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          border: 1.5px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
          background: #111;
          will-change: transform;
          transition: border-color 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .founder-portrait-container:hover {
          border-color: var(--accent-blue);
          transform: scale(1.02);
          box-shadow: 0 15px 40px rgba(47, 128, 255, 0.2);
        }

        .founder-portrait-img {
          width: 100%;
          height: 120%;
          object-fit: cover;
          position: absolute;
          top: -10%;
          left: 0;
          transition: transform 0.1s ease-out;
        }

        .founder-badge {
          font-size: 0.75rem !important;
          letter-spacing: 0.15em;
          padding: 0.35rem 0.85rem !important;
          margin-bottom: 1.25rem !important;
          background: transparent !important;
          border: 1px solid rgba(47, 128, 255, 0.3) !important;
          border-radius: 20px;
          display: inline-block !important;
        }

        .founder-name {
          font-size: 2.75rem;
          font-weight: 400;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .founder-subtitle {
          font-size: 0.875rem;
          color: var(--accent-blue);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 500;
          margin-bottom: 2rem;
        }

        .founder-bio {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2.25rem;
        }

        .founder-bio p {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.9375rem;
        }

        .founder-linkedin-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 2rem;
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          transition: background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .founder-linkedin-btn:hover {
          background-color: var(--accent-blue) !important;
          border-color: var(--accent-blue) !important;
          color: #ffffff !important;
          transform: none !important;
          box-shadow: 0 4px 15px rgba(47, 128, 255, 0.35);
        }

        @media (max-width: 1024px) {
          .founder-portrait-container {
            width: 320px;
            height: 320px;
          }
          .founder-row {
            gap: 3rem;
          }
          .founder-name {
            font-size: 2.25rem;
          }
        }

        @media (max-width: 768px) {
          .founders-rows-wrap {
            gap: 5rem;
          }
          .founder-row {
            flex-direction: column !important;
            gap: 2.5rem;
          }
          .founder-row.reverse-row {
            flex-direction: column-reverse !important;
          }
          .founder-img-col, .founder-content-col {
            flex: 0 0 100%;
            width: 100%;
          }
          .founder-portrait-container {
            width: 280px;
            height: 280px;
          }
          .founder-row.reverse-row .founder-content-col,
          .founder-row:not(.reverse-row) .founder-content-col {
            padding-left: 0;
            padding-right: 0;
            align-items: center;
            text-align: center;
          }
          .founder-bio {
            text-align: center;
          }
        }

        /* Why Choose Us Section */
        .about-choose-us {
          background-color: #050505;
          padding: 8rem 0;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          contain: layout;
        }

        .choose-us-header-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 5rem;
          align-items: flex-end;
          margin-bottom: 5rem;
        }

        .choose-us-subtext {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin: 0;
        }

        .book-showcase-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 4rem;
          width: 100%;
        }

        @media (min-width: 993px) {
          .choose-us-title-col .section-title {
            white-space: nowrap;
          }
        }

        @media (max-width: 992px) {
          .choose-us-header-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
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
