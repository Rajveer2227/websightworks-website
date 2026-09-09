import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { heroFrameCache } from '../utils/heroFrameCache';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

// Data-Driven Scene Configuration for Hero Story
interface SceneConfig {
  label?: string; // Small Blue Text
  text: string;   // Main Heading
  subtext: string; // Subtitle
  start: number; // Start progress (0.0 to 1.0)
  end: number;   // End progress (0.0 to 1.0)
  isLogo?: boolean;
  isComingSoon?: boolean;
}

const scenes: SceneConfig[] = [
  { label: 'SERVICE 01', text: 'E-COMMERCE\nSTORES', subtext: 'Creating seamless online shopping experiences that drive sales.', start: 0.0, end: 0.16 },
  { label: 'SERVICE 02', text: 'CUSTOM\nWEB APPS', subtext: 'Developing scalable web applications tailored to your business.', start: 0.19, end: 0.30 },
  { label: 'SERVICE 03', text: 'AI-POWERED\nSOLUTIONS', subtext: 'Automating workflows with intelligent AI-driven solutions.', start: 0.33, end: 0.44 },
  { label: 'SERVICE 04', text: 'WEBSITE\nDEVELOPMENT', subtext: 'Building fast, responsive, and conversion-focused websites.', start: 0.47, end: 0.58 },
  { label: 'SERVICE 05', text: 'UI / UX\nDESIGN', subtext: 'Designing intuitive interfaces with exceptional user experiences.', start: 0.61, end: 0.72 },
  { label: 'SERVICE 06', text: 'DATA\nANALYTICS', subtext: 'Transforming data into actionable business intelligence.', start: 0.75, end: 0.86, isComingSoon: true },
  { label: 'SERVICE 07', text: 'SOCIAL MEDIA\nMARKETING', subtext: 'Growing your brand through strategic digital marketing campaigns.', start: 0.89, end: 0.94, isComingSoon: true },
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

  // Sync framesRef when images prop changes and subscribe to background frame streaming
  useEffect(() => {
    framesRef.current = images;
    forceRedraw.current = true;

    const unsubscribe = heroFrameCache.subscribeFrameLoaded(() => {
      forceRedraw.current = true;
    });
    return unsubscribe;
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

    let img1 = framesRef.current[frame1];
    let img2 = framesRef.current[frame2];

    // Fallback gracefully to nearest loaded frame if current target is still loading in background stream
    if (!img1 || !img1.naturalWidth) {
      img1 = heroFrameCache.getClosestLoadedFrame(frame1) || img1;
    }
    if (!img2 || !img2.naturalWidth) {
      img2 = heroFrameCache.getClosestLoadedFrame(frame2) || img2;
    }

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

    // Fade in scroll indicator on entrance
    gsap.fromTo(scrollIndicatorRef.current,
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

      // On mobile / touch screens, toolbar collapse during scroll changes height but NOT width.
      // We must avoid reallocating the canvas bitmap buffer on mobile scroll to prevent frame drops and flickering.
      const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
      const isWidthChanged = width !== lastWidth.current;
      const isSignificantHeightChange = Math.abs(height - lastHeight.current) > 10;

      if (force || isWidthChanged || (!isMobile && isSignificantHeightChange)) {
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
      }
    };

    const handleResize = () => resizeCanvas(false);
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
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
      window.removeEventListener('orientationchange', handleResize);
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill(true);
        }
      });
      tl.kill();
      // Free canvas bitmap buffer from WebKit GPU / IOSurface memory
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = 0;
        canvas.height = 0;
      }
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
                {scene.isComingSoon && (
                  <div className="scene-ribbon-container">
                    <span className="scene-ribbon">COMING SOON</span>
                  </div>
                )}
                <span className="scene-label">{scene.label}</span>
                {idx === 0 ? (
                  <h1 className="scene-title serif-heading">
                    {scene.text.split('\n').map((line, lIdx) => (
                      <span key={lIdx} style={{ display: 'block' }}>
                        {line}
                      </span>
                    ))}
                  </h1>
                ) : (
                  <h2 className="scene-title serif-heading">
                    {scene.text.split('\n').map((line, lIdx) => (
                      <span key={lIdx} style={{ display: 'block' }}>
                        {line}
                      </span>
                    ))}
                  </h2>
                )}
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

      <style>{`

        .hero-sequence-container {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 100vh;
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
          transition: opacity 0.3s ease;
          will-change: transform, opacity;
          pointer-events: auto; /* Enable clicking elements inside overlay */
        }

        .editorial-scene-wrapper {
          position: relative;
          overflow: hidden;
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

        .scene-ribbon-container {
          position: absolute;
          top: 0;
          right: 0;
          width: 155px;
          height: 155px;
          overflow: hidden;
          pointer-events: none;
          z-index: 10;
        }

        .scene-ribbon {
          position: absolute;
          top: 36px;
          right: -42px;
          width: 185px;
          transform: rotate(45deg);
          background: linear-gradient(135deg, #2F80ED 0%, #1551AF 100%);
          color: #ffffff;
          font-family: inherit;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-align: center;
          padding: 7.5px 0;
          text-transform: uppercase;
          line-height: 1;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.65), 0 0 20px rgba(47, 128, 255, 0.5);
          border-top: 1px solid rgba(255, 255, 255, 0.45);
          border-bottom: 1px solid rgba(0, 0, 0, 0.45);
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
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
          overflow-wrap: break-word;
          word-break: break-word;
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
          .scene-ribbon-container {
            width: 125px;
            height: 125px;
          }
          .scene-ribbon {
            top: 28px;
            right: -36px;
            width: 155px;
            font-size: 0.6rem;
            padding: 6px 0;
            letter-spacing: 0.12em;
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
          .logo-cta-container {
            margin-top: 38rem;
          }
        }

        @media (max-width: 480px) {
          .editorial-scene-wrapper {
            padding: 1.85rem 1.25rem;
            max-width: 92vw;
          }
          .scene-title {
            font-size: 2rem;
            line-height: 1.15;
            margin-bottom: 1rem;
          }
          .scene-subtitle {
            font-size: 0.875rem;
            line-height: 1.5;
          }
          .logo-cta-container {
            margin-top: 36rem;
          }
        }

        @media (max-width: 360px) {
          .editorial-scene-wrapper {
            padding: 1.6rem 1rem;
            max-width: 94vw;
          }
          .scene-title {
            font-size: 1.7rem;
            line-height: 1.15;
          }
          .scene-subtitle {
            font-size: 0.8125rem;
          }
          .logo-cta-container {
            margin-top: 31rem;
          }
        }

        /* Scroll Indicator Styling */
        .hero-scroll-indicator {
          position: absolute;
          bottom: calc(2rem + env(safe-area-inset-bottom, 0px));
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

        @media (max-width: 480px) {
          .hero-scroll-indicator {
            bottom: calc(1.25rem + env(safe-area-inset-bottom, 0px));
            padding: 0.5rem 1rem;
          }
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
