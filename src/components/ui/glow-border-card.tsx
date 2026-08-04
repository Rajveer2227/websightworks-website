'use client';

import React from 'react';
import './glow-border-card.css';

/**
 * Props for the GlowBorderCard component
 */
export interface GlowBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Content to display inside the card
     */
    children?: React.ReactNode;

    /**
     * Width of the card (CSS value)
     * @default "100%"
     */
    width?: string;

    /**
     * Height of the card (CSS value). If not provided, uses aspect-ratio.
     */
    height?: string;

    /**
     * Aspect ratio of the card (e.g., "1", "16/9", "4/3")
     */
    aspectRatio?: string;

    /**
     * Corner radius of the card
     * @default "12px"
     */
    borderRadius?: string;

    /**
     * Animation duration in seconds
     * @default 6
     */
    animationDuration?: number;

    /**
     * Gradient colors array (up to 10 colors)
     */
    gradientColors?: string[];

    /**
     * Border width for the glow effect
     * @default "1px"
     */
    borderWidth?: string;

    /**
     * Blur amount for the glow effect
     * @default "20px"
     */
    blurAmount?: string;

    /**
     * Inset distance (negative values push the border outside)
     * @default "-15px"
     */
    inset?: string;

    /**
     * Preset color themes
     */
    colorPreset?: 'nature' | 'ocean' | 'sunset' | 'aurora' | 'custom';

    /**
     * Whether animation is paused
     * @default false
     */
    paused?: boolean;
}

// Preset gradient colors (10 colors each for smooth transitions)
const colorPresets: Record<string, string[]> = {
    nature: ['#669900', '#88bb22', '#99cc33', '#aaddaa', '#ccee66', '#006699', '#228888', '#3399cc', '#55aacc', '#669900'],
    ocean: ['#006699', '#1177aa', '#2288bb', '#3399cc', '#44aadd', '#55bbee', '#66ccff', '#44bbee', '#2299cc', '#006699'],
    sunset: ['#ff6600', '#ff7711', '#ff8822', '#ff9900', '#ffaa22', '#ffbb44', '#ffcc00', '#ff9933', '#ff7722', '#ff6600'],
    aurora: ['#00ff87', '#22ffaa', '#44ffcc', '#60efff', '#88ddff', '#bb99ff', '#dd77ee', '#ff68f0', '#ff55cc', '#00ff87'],
    custom: ['#669900', '#99cc33', '#ccee66', '#006699', '#3399cc', '#990066', '#cc3399', '#ff6600', '#ff9900', '#ffcc00'],
};

// Local class merger utility to keep the file self-contained
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

/**
 * GlowBorderCard - A CSS-only animated glowing border card component
 * 
 * Features a rotating conic gradient that creates a beautiful
 * aurora-like glow effect around the card edges.
 * Uses @property for smooth angle animation.
 */
export const GlowBorderCard = React.forwardRef<HTMLDivElement, GlowBorderCardProps>(
    (
        {
            children,
            className,
            width = '100%',
            height,
            aspectRatio,
            borderRadius = '12px',
            animationDuration = 6,
            gradientColors,
            borderWidth = '1px',
            blurAmount = '20px',
            inset = '-15px',
            colorPreset = 'custom',
            paused = false,
            style,
            ...props
        },
        ref
    ) => {
        // Soft blue accent colors matching Websight Works design:
        // Accent: #2F80FF, background: #111111
        const defaultColors = [
            '#2F80FF',
            'rgba(47, 128, 255, 0.4)',
            '#111111',
            '#2F80FF',
            'rgba(47, 128, 255, 0.1)',
            '#111111',
            '#2F80FF',
            'rgba(47, 128, 255, 0.4)',
            '#111111',
            '#2F80FF'
        ];

        // Determine the gradient colors to use (up to 10)
        const colors = gradientColors || (colorPreset === 'custom' ? defaultColors : colorPresets[colorPreset] || defaultColors);

        // Build color CSS variables (--glow-color-1 through --glow-color-10)
        const colorVars: Record<string, string> = {};
        for (let i = 0; i < 10; i++) {
            colorVars[`--glow-color-${i + 1}`] = colors[i % colors.length];
        }

        return (
            <div
                ref={ref}
                className={cn("glow-border-card", className)}
                style={{
                    width: width,
                    height: height || 'auto',
                    aspectRatio: height ? 'unset' : (aspectRatio || 'unset'),
                    borderRadius: borderRadius,
                    '--glow-animation-duration': `${animationDuration}s`,
                    ...colorVars,
                    ...style,
                } as React.CSSProperties}
                {...props}
            >
                {/* Rotating Conic Gradient Backdrop */}
                <div
                    className={cn("glow-conic", paused && "paused")}
                    style={{
                        inset: inset,
                        borderWidth: borderWidth,
                        filter: `blur(${blurAmount})`
                    }}
                />

                {/* Inner Content Wrapper */}
                <div className="glow-card-inner">
                    {children}
                </div>
            </div>
        );
    }
);

GlowBorderCard.displayName = 'GlowBorderCard';

export default GlowBorderCard;
