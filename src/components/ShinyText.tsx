import './ShinyText.css';

export interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  pauseOnHover?: boolean;
}

/**
 * ShinyText — pure CSS animation, zero JS per-frame cost.
 * Uses a CSS @keyframes on background-position, which runs on the
 * compositor thread and does not compete with scroll rendering.
 */
const ShinyText = ({
  text,
  disabled = false,
  speed = 2,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  pauseOnHover = false,
}: ShinyTextProps) => {
  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    '--shine-duration': `${speed}s`,
    animationPlayState: disabled ? 'paused' : 'running',
  } as React.CSSProperties;

  return (
    <span
      className={`shiny-text ${className}`}
      style={gradientStyle}
      data-pause-on-hover={pauseOnHover ? 'true' : undefined}
    >
      {text}
    </span>
  );
};

export default ShinyText;
