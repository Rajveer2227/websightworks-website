import React, { useEffect, useRef } from "react";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  color?: string;
  refresh?: boolean;
}

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  color = "#ffffff",
  refresh = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<any[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const animationFrameId = useRef<number | null>(null);

  // Handle color change and initial setup
  useEffect(() => {
    initCanvas();
  }, [color]);

  // Track mouse movement smoothly
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const { clientX, clientY } = event;
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        mouse.current.x = x;
        mouse.current.y = y;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Use ResizeObserver to dynamically resize the canvas
  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    resizeObserver.observe(canvasContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Re-initialize on refresh trigger
  useEffect(() => {
    initCanvas();
  }, [refresh]);

  // Clean up animation loops on unmount
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Pause animation when scrolled out of viewport, resume when back in view
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Resume — only if not already running
          if (!animationFrameId.current) {
            drawParticles();
          }
        } else {
          // Pause to free CPU/GPU while off-screen
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
          }
        }
      },
      { threshold: 0, rootMargin: '50px' }
    );
    observer.observe(container);
    return () => observer.disconnect();
  // drawParticles is stable (no deps change); safe to omit
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initCanvas = () => {
    resizeCanvas();
    
    // Stop any existing animation loop before starting a new one
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    
    drawParticles();
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.scale(dpr, dpr);
      }
      
      // If we don't have particles yet, pre-populate them
      if (particles.current.length === 0) {
        for (let i = 0; i < quantity; i++) {
          particles.current.push(createParticle());
        }
      }
    }
  };

  const createParticle = (): any => {
    const x = Math.random() * canvasSize.current.w;
    const y = Math.random() * canvasSize.current.h;
    const translateX = 0;
    const translateY = 0;
    const size = Math.random() * 1.5 + 1.0; // Slightly smaller size for premium aesthetic
    const alpha = 0;
    const targetAlpha = Math.random() * 0.40 + 0.10; // Softer opacity limits
    const dx = (Math.random() - 0.5) * 0.22; // Slightly faster drift for lively movement
    const dy = (Math.random() - 0.5) * 0.22;
    const magnetism = 0.1 + Math.random() * 2.0; // Less aggressive snapping to mouse
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const rgb = hexToRgb(color);

  const drawParticles = () => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
        const quantityToRender = quantity;
        
        // Match particle list length to quantity if it changed dynamically
        if (particles.current.length > quantityToRender) {
          particles.current = particles.current.slice(0, quantityToRender);
        }

        for (let i = 0; i < quantityToRender; i++) {
          if (!particles.current[i]) {
            particles.current.push(createParticle());
          }
          const p = particles.current[i];
          
          // Smooth fade in
          if (p.alpha < p.targetAlpha) {
            p.alpha += 0.003;
          }

          // Move particle
          p.x += p.dx;
          p.y += p.dy;

          // Mouse attraction/repulsion
          const forceX = (mouse.current.x - p.x) / staticity;
          const forceY = (mouse.current.y - p.y) / staticity;
          const distance = Math.sqrt(
            (mouse.current.x - p.x) ** 2 + (mouse.current.y - p.y) ** 2
          );

          // Ease interaction
          if (distance < 160) {
            p.translateX += (forceX * p.magnetism - p.translateX) / ease;
            p.translateY += (forceY * p.magnetism - p.translateY) / ease;
          } else {
            p.translateX -= p.translateX / ease;
            p.translateY -= p.translateY / ease;
          }

          // Render particle
          context.beginPath();
          context.arc(
            p.x + p.translateX,
            p.y + p.translateY,
            p.size,
            0,
            2 * Math.PI
          );
          context.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${p.alpha})`;
          context.fill();

          // Reset if out of bounds
          if (
            p.x < -10 ||
            p.x > canvasSize.current.w + 10 ||
            p.y < -10 ||
            p.y > canvasSize.current.h + 10
          ) {
            particles.current[i] = createParticle();
          }
        }
      }
    }
    animationFrameId.current = requestAnimationFrame(drawParticles);
  };

  function hexToRgb(hex: string): number[] {
    let cleanHex = hex.replace("#", "");
    if (cleanHex.length === 3) {
      cleanHex = cleanHex
        .split("")
        .map((char) => char + char)
        .join("");
    }
    const num = parseInt(cleanHex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }

  return (
    <div
      className={className}
      ref={canvasContainerRef}
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      <canvas ref={canvasRef} style={{ pointerEvents: "none" }} />
    </div>
  );
};
