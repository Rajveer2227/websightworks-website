import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface PreloaderProps {
  onPreloadComplete: (images: HTMLImageElement[]) => void;
  onExitComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onPreloadComplete, onExitComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING DIGITAL EXPERIENCE');

  const onPreloadCompleteRef = useRef(onPreloadComplete);
  const onExitCompleteRef = useRef(onExitComplete);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onPreloadCompleteRef.current = onPreloadComplete;
    onExitCompleteRef.current = onExitComplete;
  }, [onPreloadComplete, onExitComplete]);

  // Helper to format frame numbers (e.g. 1 -> "001")
  const pad = (num: number) => String(num).padStart(3, '0');

  useEffect(() => {
    let isMounted = true;
    let exitTimeoutId: ReturnType<typeof setTimeout> | null = null;

    // Hide global layout navbar by tagging body
    document.body.classList.add('preloader-active');
    if ((window as any).lenis) {
      (window as any).lenis.stop();
    }

    // 1. Entrance Animations for Preloader Elements
    const introTl = gsap.timeline();
    
    // Scale horizontal divider line
    introTl.to('.preloader-divider', {
      scaleX: 1,
      duration: 1.4,
      ease: 'power3.out'
    }, 0.1);

    // Fade and scale in brand logo image
    introTl.fromTo('.preloader-logo-img',
      { opacity: 0, scale: 0.9, y: 12 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out'
      },
      0.3
    );

    // Circular ring loader fade-in
    introTl.fromTo('.preloader-loader-wrap',
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out'
      },
      1.1
    );

    // Dynamic Frame Probing & Loading
    const checkImageExists = (url: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    };

    const probeFrameCount = async (): Promise<number> => {
      const stride = 50;
      let rangeStart = 1;
      let limit = 1000;
      let currentProbe = stride;
      let foundLimit = false;

      while (currentProbe <= limit && !foundLimit) {
        const url = `/frames/ezgif-frame-${pad(currentProbe)}_result.webp`;
        try {
          const exists = await checkImageExists(url);
          if (exists) {
            rangeStart = currentProbe;
            currentProbe += stride;
          } else {
            foundLimit = true;
          }
        } catch {
          foundLimit = true;
        }
      }

      // Check remaining range in parallel
      const scanPromises: Promise<{ index: number; exists: boolean }>[] = [];
      const scanEnd = Math.min(currentProbe, limit);

      for (let i = rangeStart; i <= scanEnd; i++) {
        const url = `/frames/ezgif-frame-${pad(i)}_result.webp`;
        scanPromises.push(
          checkImageExists(url).then(exists => ({ index: i, exists }))
        );
      }

      const scanResults = await Promise.all(scanPromises);
      const validFrames = scanResults
        .filter(r => r.exists)
        .map(r => r.index);

      if (validFrames.length === 0) return 0;
      return Math.max(...validFrames);
    };

    const loadAndPreDecode = async () => {
      try {
        const count = await probeFrameCount();
        if (count === 0) {
          throw new Error("No frame assets detected in /frames/ path.");
        }

        if (!isMounted) return;
        setStatusText("INITIALIZING DIGITAL EXPERIENCE");

        let loadedCount = 0;

        // Parallel download and pre-decode setup
        const promises = Array.from({ length: count }, (_, i) => {
          const index = i + 1;
          const url = `/frames/ezgif-frame-${pad(index)}_result.webp`;
          return new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.onload = async () => {
              try {
                await img.decode();
                if (isMounted) {
                  loadedCount++;
                  setProgress(Math.floor((loadedCount / count) * 100));
                }
                resolve(img);
              } catch {
                if (isMounted) {
                  loadedCount++;
                  setProgress(Math.floor((loadedCount / count) * 100));
                }
                resolve(img);
              }
            };
            img.onerror = () => {
              const fallback = new Image();
              resolve(fallback);
            };
            img.src = url;
          });
        });

        const loadedImages = await Promise.all(promises);

        if (!isMounted) return;
        triggerExitTransition(loadedImages);
      } catch (err) {
        console.error(err);
        if (isMounted) setStatusText("FAILED TO PRELOAD ASSETS");
      }
    };

    const triggerExitTransition = (images: HTMLImageElement[]) => {
      // Notify parent layout that preloading is complete, allowing HeroSequence to mount and render Frame 0 underneath
      onPreloadCompleteRef.current(images);

      // Delay exit by 400ms to allow HeroSequence to perform resizing and render frame 0 smoothly
      exitTimeoutId = setTimeout(() => {
        if (!isMounted) return;

        const exitTl = gsap.timeline({
          onComplete: () => {
            if (isMounted) onExitCompleteRef.current();
          }
        });

        // 1. Fade out preloader content
        exitTl.to('.preloader-content', {
          opacity: 0,
          y: -30,
          duration: 0.5,
          ease: 'power3.inOut'
        }, 0);

        // 2. Shrink horizontal divider line
        exitTl.to('.preloader-divider', {
          scaleX: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.inOut'
        }, 0);

        // 3. Slide split panels apart vertically (Luxury double door reveal)
        exitTl.to('.preloader-panel-top', {
          yPercent: -100,
          duration: 1.4,
          ease: 'power4.inOut'
        }, 0.3);

        exitTl.to('.preloader-panel-bottom', {
          yPercent: 100,
          duration: 1.4,
          ease: 'power4.inOut'
        }, 0.3);
      }, 400);
    };

    loadAndPreDecode();

    return () => {
      isMounted = false;
      document.body.classList.remove('preloader-active');
      if (exitTimeoutId) clearTimeout(exitTimeoutId);
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
      // Refresh ScrollTrigger to recalculate page geometry after preloader exits!
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 120);
    };
  }, []);

  const getPhaseText = (prog: number) => {
    if (prog < 25) return "INITIALIZING DIGITAL EXPERIENCE";
    if (prog < 50) return "ENGINEERING PREMIUM SOLUTIONS";
    if (prog < 75) return "OPTIMIZING EVERY DETAIL";
    return "READY TO BUILD EXCELLENCE";
  };

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div 
      ref={loaderRef}
      className="preloader"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'transparent',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes preloaderGrain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          20% { transform: translate(-2%, 1%); }
          30% { transform: translate(1%, -2%); }
          40% { transform: translate(-1%, 3%); }
          50% { transform: translate(-2%, 1%); }
          60% { transform: translate(1%, 0); }
          70% { transform: translate(0, 2%); }
          80% { transform: translate(2%, 1%); }
          90% { transform: translate(-1%, 1%); }
        }

        .preloader-title-text {
          font-family: var(--font-sans);
          font-size: clamp(1.4rem, 4.5vw, 2.3rem);
          letter-spacing: 0.65em;
          padding-left: 0.65em;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.2;
          display: flex;
          justify-content: center;
          flex-wrap: nowrap;
        }

        @media (max-width: 480px) {
          .preloader-title-text {
            font-size: clamp(0.9rem, 4.2vw, 1.25rem) !important;
            letter-spacing: 0.38em !important;
            padding-left: 0.38em !important;
          }
        }
      `}</style>


      {/* Top split panel */}
      <div
        className="preloader-panel-top"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '50vh',
          background: '#050505',
          zIndex: 1,
          overflow: 'hidden'
        }}
      />

      {/* Bottom split panel */}
      <div
        className="preloader-panel-bottom"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50vh',
          background: '#050505',
          zIndex: 1,
          overflow: 'hidden'
        }}
      />

      {/* Divider glowing line */}
      <div
        className="preloader-divider"
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(47, 128, 255, 0.3) 15%, rgba(47, 128, 255, 0.7) 50%, rgba(47, 128, 255, 0.3) 85%, transparent)',
          boxShadow: '0 0 10px rgba(47, 128, 255, 0.25)',
          zIndex: 3,
          transform: 'scaleX(0)',
          transformOrigin: '50% 50%'
        }}
      />

      {/* Center Loader elements */}
      <div
        className="preloader-content"
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '0 2rem',
          pointerEvents: 'auto'
        }}
      >

        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Brand Logo Image */}
          <div style={{ overflow: 'hidden', minHeight: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img 
              src="/logo/wesightworkwhite.png" 
              alt="Websight Works Logo" 
              className="preloader-logo-img"
              style={{
                height: '48px',
                width: 'auto',
                objectFit: 'contain',
                opacity: 0,
                filter: 'drop-shadow(0 4px 15px rgba(0, 0, 0, 0.6))'
              }}
            />
          </div>

          {/* Percentage Circular Ring */}
          <div
            className="preloader-loader-wrap"
            style={{
              marginTop: '3.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
              opacity: 0
            }}
          >
            <div style={{ position: 'relative', width: '70px', height: '70px' }}>
              <svg width="70" height="70" viewBox="0 0 70 70" style={{ transform: 'rotate(-90deg)' }}>
                <circle
                  cx="35"
                  cy="35"
                  r={radius}
                  fill="transparent"
                  stroke="rgba(255, 255, 255, 0.02)"
                  strokeWidth="1"
                />
                <circle
                  cx="35"
                  cy="35"
                  r={radius}
                  fill="transparent"
                  stroke="var(--accent-blue)"
                  strokeWidth="1.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{
                    filter: 'drop-shadow(0px 0px 3px rgba(47, 128, 255, 0.4))',
                    transition: 'stroke-dashoffset 0.3s ease-out'
                  }}
                />
              </svg>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'baseline',
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                fontSize: '0.8rem',
                letterSpacing: '0.05em',
                color: '#FFFFFF'
              }}>
                <span>{progress}</span>
                <span style={{ fontSize: '0.55rem', color: 'var(--accent-blue)', marginLeft: '1px' }}>%</span>
              </div>
            </div>

            {/* Stage Text status */}
            <p
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.45)',
                margin: 0,
                fontWeight: 400,
                minHeight: '1.2rem'
              }}
            >
              {progress === 0 ? statusText : getPhaseText(progress)}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Preloader;
