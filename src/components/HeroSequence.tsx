import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Data-Driven Scene Configuration for Hero Story
interface SceneConfig {
  label?: string; // Small Blue Text
  text: string;   // Main Heading
  subtext: string; // Subtitle
  start: number; // Start progress (0.0 to 1.0)
  end: number;   // End progress (0.0 to 1.0)
  isLogo?: boolean;
}

const scenes: SceneConfig[] = [
  { label: 'SERVICE 01', text: 'WEBSITE\nDEVELOPMENT', subtext: 'Building fast, responsive, and conversion-focused websites.', start: 0.0, end: 0.16 },
  { label: 'SERVICE 02', text: 'E-COMMERCE\nSTORES', subtext: 'Creating seamless online shopping experiences that drive sales.', start: 0.19, end: 0.30 },
  { label: 'SERVICE 03', text: 'DIGITAL\nMARKETING', subtext: 'Growing your brand through strategic digital marketing campaigns.', start: 0.33, end: 0.44 },
  { label: 'SERVICE 04', text: 'CUSTOM\nWEB APPS', subtext: 'Developing scalable web applications tailored to your business.', start: 0.47, end: 0.58 },
  { label: 'SERVICE 05', text: 'AI-POWERED\nSOLUTIONS', subtext: 'Automating workflows with intelligent AI-driven solutions.', start: 0.61, end: 0.72 },
  { label: 'SERVICE 06', text: 'DATA\nANALYTICS', subtext: 'Transforming data into actionable business intelligence.', start: 0.75, end: 0.86 },
  { label: 'SERVICE 07', text: 'UI / UX\nDESIGN', subtext: 'Designing intuitive interfaces with exceptional user experiences.', start: 0.89, end: 0.94 },
  { text: 'WEBSIGHT WORKS', subtext: 'The Destination. Premium Digital Product Studio.', start: 0.95, end: 1.0, isLogo: true }
];

interface HeroSequenceProps {
  images: HTMLImageElement[];
}

export default function HeroSequence({ images }: HeroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRefs = useRef<HTMLDivElement[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const fixedLogoRef = useRef<HTMLDivElement>(null);
  
  const framesRef = useRef<HTMLImageElement[]>(images);
  
  // Decoupled rendering control variables (updated by ScrollTrigger, read by RAF)
  const targetFrameIndex = useRef<number>(0);
  const currentFrameIndex = useRef<number>(0);
  const scrollProgress = useRef<number>(0);
  const isVisible = useRef<boolean>(true);
  const forceRedraw = useRef<boolean>(false);

  // Resize throttle trackers to prevent mobile browser chrome hides from causing layout jumps
  const lastWidth = useRef<number>(window.innerWidth);
  const lastHeight = useRef<number>(window.innerHeight);

  // Sync framesRef when images prop changes
  useEffect(() => {
    framesRef.current = images;
    // Force redraw first frame immediately
    forceRedraw.current = true;
  }, [images]);

  // Aspect-Ratio Cover drawing method
  const renderFrame = (idx: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || framesRef.current.length === 0) return;

    const total = framesRef.current.length;
    const intFrame = Math.floor(idx);
    const fraction = idx - intFrame;

    // Boundary capping
    const frame1 = Math.max(0, Math.min(intFrame, total - 1));
    const frame2 = Math.max(0, Math.min(intFrame + 1, total - 1));

    const img1 = framesRef.current[frame1];
    const img2 = framesRef.current[frame2];

    if (img1 && img1.naturalWidth) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img1.naturalWidth;
      const ih = img1.naturalHeight;

      // Fit calculations
      const scale = Math.max(cw / iw, ch / ih);
      const x = (cw - iw * scale) / 2;
      const y = (ch - ih * scale) / 2;
      const dw = iw * scale;
      const dh = ih * scale;

      // Base layer
      ctx.globalAlpha = 1.0;
      ctx.drawImage(img1, x, y, dw, dh);

      // Superimposed blended layer
      if (img2 && img2.naturalWidth && fraction > 0.01 && frame1 !== frame2) {
        ctx.globalAlpha = fraction;
        ctx.drawImage(img2, x, y, dw, dh);
      }
      ctx.globalAlpha = 1.0;
    }
  };

  // GSAP ScrollTrigger & requestAnimationFrame Render Loop
  useGSAP(() => {
    if (images.length === 0 || !containerRef.current || !canvasRef.current) return;

    const totalFrames = images.length;
    const scrollTravelPerFrame = 10; // 10px scroll distance per frame
    const totalScrollDistance = totalFrames * scrollTravelPerFrame;

    // Bind Lenis updates to ScrollTrigger
    const lenis = (window as any).lenis;
    const syncScroll = () => {
      ScrollTrigger.update();
    };
    if (lenis) {
      lenis.on('scroll', syncScroll);
    }

    // Dynamic scale-down and fade-in reveal on launch
    gsap.fromTo([canvasRef.current, '.canvas-vignette'],
      { opacity: 0, scale: 1.05 },
      { 
        opacity: 1, 
        scale: 1.0, 
        duration: 2.2, 
        ease: 'power3.out',
        delay: 0.3 // Syncs with the split panels sliding apart
      }
    );

    // Fade in scroll indicator and fixed bottom-right logo on entrance
    gsap.fromTo([scrollIndicatorRef.current, fixedLogoRef.current],
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 1.0
      }
    );

    // Frame track helper object
    const frameTrack = { frame: 0 };
    let lastDrawnFrame = -1;

    // Master timeline with luxurious slow scrub
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalScrollDistance}`,
        pin: true,
        scrub: 1.5, // Butter-smooth heavy scroll inertia
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
        onToggle: (self) => {
          // Pause RAF rendering operations when the hero section is scrolled off-screen
          isVisible.current = self.isActive;
        }
      }
    });

    // Scrub frame indices over the timeline duration
    tl.to(frameTrack, {
      frame: totalFrames - 1,
      ease: 'none',
      duration: 10, // Arbitrary timeline length mapped to scroll progress
      onUpdate: () => {
        // Map frame progress to reach 100% of frames at 90% scroll progress to build a settle zone
        const progress = scrollProgress.current;
        const activeProgress = Math.min(progress / 0.9, 1.0);
        targetFrameIndex.current = activeProgress * (totalFrames - 1);
      }
    }, 0);

    // Fade out scroll indicator at the very end during the CTA reveal
    tl.to(scrollIndicatorRef.current, {
      opacity: 0,
      y: 20,
      duration: 1.5,
      ease: 'power1.out'
    }, 9.0);

    // Canvas Resizer for Mobile Viewports & Device Rotations
    const resizeCanvas = (force = false) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (force || width !== lastWidth.current || Math.abs(height - lastHeight.current) > 10) {
        lastWidth.current = width;
        lastHeight.current = height;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          canvas.style.width = '100%';
          canvas.style.height = '100%';
          forceRedraw.current = true;
        }

        // Adjust watermark logo anchor offset on ultra-wide & 4K displays (>1920px)
        // to maintain visual lock with 3D canvas aspect cover scaling
        if (fixedLogoRef.current) {
          if (width > 1920) {
            const scale = Math.max(width / 1920, height / 1080);
            const rightRem = 8.5 * scale;
            const aspect = width / height;
            let bottomRem = 3.5 * scale;
            if (aspect > (1920 / 1080)) {
              const dh = 1080 * scale;
              const cropY = (dh - height) / 2;
              bottomRem = Math.max(3.5, (56.0 * scale - cropY) / 16);
            }
            fixedLogoRef.current.style.right = `${rightRem}rem`;
            fixedLogoRef.current.style.bottom = `${bottomRem}rem`;
          } else {
            fixedLogoRef.current.style.right = '';
            fixedLogoRef.current.style.bottom = '';
          }
        }
      }
    };

    const handleResize = () => resizeCanvas(false);
    window.addEventListener('resize', handleResize);
    resizeCanvas(true);

    // Trigger frame 0 draw synchronously
    renderFrame(0);

    // Dedicated requestAnimationFrame Render Loop
    let rafId: number;

    const renderLoop = () => {
      if (isVisible.current) {
        const target = targetFrameIndex.current;
        const current = currentFrameIndex.current;

        // Smooth Lerping of the Frame Index
        const next = current + (target - current) * 0.15;
        currentFrameIndex.current = next;

        // Draw ONLY if the frame has shifted significantly or if a redraw is forced
        if (Math.abs(next - lastDrawnFrame) > 0.001 || forceRedraw.current) {
          forceRedraw.current = false;
          lastDrawnFrame = next;
          renderFrame(next);
        }

        // Direct style adjustments for text overlays to prevent React re-renders
        const progress = Math.min(scrollProgress.current / 0.9, 1.0);
        scenes.forEach((scene, idx) => {
          const textElement = textRefs.current[idx];
          if (!textElement) return;

          const duration = scene.end - scene.start;
          if (progress >= scene.start && progress <= scene.end) {
            const localProgress = (progress - scene.start) / duration;
            let opacity = 0;
            let yOffset = 20;

            if (localProgress < 0.2) {
              // Fade In (Skipped for the initial scene so it is 100% visible on page load)
              opacity = idx === 0 ? 1 : localProgress / 0.2;
              yOffset = idx === 0 ? 0 : 20 * (1 - opacity);
            } else if (localProgress > 0.8 && !scene.isLogo) {
              // Fade Out (Skipped for the final logo scene so it remains visible at the end)
              opacity = (1 - localProgress) / 0.2;
              yOffset = -20 * (1 - opacity);
            } else {
              // Active State
              opacity = 1;
              yOffset = 0;
            }

            textElement.style.opacity = `${opacity}`;
            textElement.style.transform = `translate(-50%, -50%) translateY(${yOffset}px)`;
            textElement.style.visibility = 'visible';
          } else {
            textElement.style.opacity = '0';
            textElement.style.visibility = 'hidden';
          }
        });
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.off('scroll', syncScroll);
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill(true);
        }
      });
      tl.kill();
    };
  }, [images]);

  return (
    <div ref={containerRef} className="hero-sequence-container">
      {/* Canvas */}
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} />
        <div className="canvas-vignette" />
      </div>

      {/* Narrative Text Overlays */}
      <div className="hero-text-overlay">
        {scenes.map((scene, idx) => (
          <div
            key={idx}
            ref={(el) => {
              if (el) textRefs.current[idx] = el;
            }}
            className="hero-scene-element"
            style={{ 
              opacity: idx === 0 ? 1 : 0, 
              visibility: idx === 0 ? 'visible' : 'hidden' 
            }}
          >
            {scene.isLogo ? (
              <div className="logo-scene-wrapper">
                <div className="logo-cta-container">
                  <Link to="/contact" className="btn btn-primary hero-cta-button">
                    Start Your Project
                  </Link>
                </div>
              </div>
            ) : (
              <div className="editorial-scene-wrapper">
                <span className="scene-label">{scene.label}</span>
                <h2 className="scene-title serif-heading">
                  {scene.text.split('\n').map((line, lIdx) => (
                    <span key={lIdx} style={{ display: 'block' }}>
                      {line}
                    </span>
                  ))}
                </h2>
                <p className="scene-subtitle">{scene.subtext}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Constant Scroll Indicator at Viewport Center-Bottom */}
      <div ref={scrollIndicatorRef} className="hero-scroll-indicator" style={{ opacity: 0 }}>
        <span className="scroll-indicator-text">SCROLL</span>
        <div className="scroll-arrows-container">
          <span className="scroll-arrow-chevron chevron-1">↓</span>
          <span className="scroll-arrow-chevron chevron-2">↓</span>
          <span className="scroll-arrow-chevron chevron-3">↓</span>
        </div>
      </div>

      {/* Fixed Bottom-Right Logo covering the grid star icon with dark film overlay */}
      <div ref={fixedLogoRef} className="hero-fixed-logo-wrapper" style={{ opacity: 0 }}>
        <div className="hero-fixed-logo-film">
          <img 
            src="/WW_3.png" 
            alt="Websight Works Symbol" 
            className="hero-fixed-logo-img"
          />
        </div>
      </div>

      <style>{`
        .hero-fixed-logo-wrapper {
          position: absolute;
          bottom: 2.8rem;
          right: 8.5rem;
          transform: translate(50%, 50%);
          z-index: 10;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-fixed-logo-film {
          position: relative;
          width: 72px;
          height: 72px;
          border-radius: 14px;
          background: #080808;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.95);
        }

        /* Dark film overlay layer for subtle watermark aesthetic */
        .hero-fixed-logo-film::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(5, 5, 5, 0.45);
          pointer-events: none;
          border-radius: 14px;
        }

        .hero-fixed-logo-img {
          width: 58px;
          height: 58px;
          object-fit: contain;
          border-radius: 12px;
          opacity: 0.5;
          filter: brightness(0.65) contrast(1.1);
        }

        @media (min-width: 1600px) {
          .hero-fixed-logo-wrapper {
            bottom: 3.5rem;
            right: 8.5rem;
          }
        }

        @media (max-width: 1400px) {
          .hero-fixed-logo-wrapper {
            bottom: 2.8rem;
            right: 8.5rem;
          }
        }

        @media (max-width: 1024px) {
          .hero-fixed-logo-wrapper {
            bottom: 3.2rem;
            right: 5.8rem;
          }
          .hero-fixed-logo-film {
            width: 58px;
            height: 58px;
          }
          .hero-fixed-logo-img {
            width: 46px;
            height: 46px;
          }
        }

        @media (max-width: 768px) {
          .hero-fixed-logo-wrapper {
            bottom: 2.8rem;
            right: 4.4rem;
          }
          .hero-fixed-logo-film {
            width: 48px;
            height: 48px;
          }
          .hero-fixed-logo-img {
            width: 38px;
            height: 38px;
          }
        }

        .hero-sequence-container {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100svh;
          overflow: hidden;
          background: #050505;
        }

        .canvas-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        canvas {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .canvas-vignette {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, transparent 35%, rgba(5,5,5,0.75) 100%);
          pointer-events: none;
        }

        .hero-text-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .hero-scene-element {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          max-width: 800px;
          text-align: center;
          padding: 0 var(--container-padding);
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: transform, opacity;
          pointer-events: auto; /* Enable clicking elements inside overlay */
        }

        .editorial-scene-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;

          /* Frosted Rectangular Glass Pill/Panel - More Opaque */
          background: rgba(12, 12, 12, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 3rem 4rem;
          border-radius: 16px;
          width: 100%;
          max-width: 820px; /* Expanded to prevent subtext wrapping */
          margin: 0 auto;
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .scene-label {
          color: var(--accent-blue);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          margin-bottom: 2rem;
          text-transform: uppercase;

          /* Sleek White Glass Pill Capsule */
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.35rem 0.9rem;
          border-radius: 100px; /* Capsule shape */
          display: inline-block;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
        }

        .scene-title {
          font-size: 4rem;
          line-height: 1.1;
          font-weight: 500; /* Increased weight for slight boldness */
          color: #ffffff;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
        }

        .scene-subtitle {
          font-size: 1.125rem;
          font-weight: 500; /* Increased weight for slight boldness */
          color: #A8A8A8; /* Neutral grey for clean visual hierarchy */
          max-width: 100%; /* Let subtext fit on a single line */
          line-height: 1.6;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        }

        /* Logo Scene Styles */
        .logo-cta-container {
          margin-top: 36rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-cta-button {
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .hero-cta-button:hover {
          transform: translateY(0) !important;
        }

        .scroll-text {
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          color: var(--text-secondary);
        }

        @keyframes bounceIndicator {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }

        @media (max-width: 768px) {
          .editorial-scene-wrapper {
            padding: 2.25rem 1.5rem;
            border-radius: 12px;
            max-width: 90vw;
          }
          .scene-title {
            font-size: 2.5rem;
          }
          .scene-subtitle {
            font-size: 0.9375rem;
          }
          .logo-title {
            font-size: 1.75rem;
            letter-spacing: 0.15em;
          }
          .logo-subtitle {
            font-size: 0.9375rem;
          }
        }

        /* Scroll Indicator Styling */
        .hero-scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.75rem;
          pointer-events: none;
          will-change: opacity, transform;

          /* High-Contrast Glass Capsule */
          background: rgba(10, 10, 10, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.625rem 1.25rem;
          border-radius: 100px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .scroll-indicator-text {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: #FFFFFF; /* Bright white for solid contrast */
          text-transform: uppercase;
          line-height: 1;
        }

        .scroll-arrows-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 20px;
          position: relative;
        }

        .scroll-arrow-chevron {
          display: block;
          font-size: 0.875rem;
          font-weight: 900;
          color: var(--accent-blue);
          line-height: 0.3;
          animation: chevronBounce 1.8s infinite ease-in-out;
          text-shadow: 0 0 8px rgba(47, 128, 255, 0.5);
        }

        .scroll-arrow-chevron.chevron-1 {
          animation-delay: 0s;
        }

        .scroll-arrow-chevron.chevron-2 {
          animation-delay: 0.2s;
        }

        .scroll-arrow-chevron.chevron-3 {
          animation-delay: 0.4s;
        }

        @keyframes chevronBounce {
          0%, 100% {
            opacity: 0.15;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(3px); /* Subtle bounce stays within capsule */
          }
        }
      `}</style>
    </div>
  );
}
