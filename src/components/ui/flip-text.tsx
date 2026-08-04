'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import './flip-text.css';

interface FlipTextProps {
    /**
     * Additional CSS classes for the wrapper
     */
    className?: string;

    /**
     * The text content to animate (will be split by spaces)
     */
    children: string;

    /**
     * Duration of the flip animation in seconds
     * @default 1.8
     */
    duration?: number;

    /**
     * Initial delay before animation starts in seconds
     * @default 0
     */
    delay?: number;

    /**
     * Whether the animation should loop infinitely
     * @default false
     */
    loop?: boolean;

    /**
     * Custom separator for splitting text (default is space)
     * @default " "
     */
    separator?: string;

    /**
     * Whether all characters should animate together (no stagger)
     * @default false
     */
    together?: boolean;
}

// Local class helper to make the component fully self-contained
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export function FlipText({
    className,
    children,
    duration = 0.8,
    delay = 0.1,
    loop = false,
    separator = ' ',
    together = false,
}: FlipTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const words = useMemo(() => children.split(separator), [children, separator]);
    // Trigger animation when the element enters the viewport (once)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Double requestAnimationFrame ensures browser paints the initial hidden/rotated state
                    // before class animation is appended, preventing the first word from popping instantly.
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            containerRef.current?.classList.add('animate');
                        });
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.05 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Calculate character index for each position
    const getCharIndex = (wordIndex: number, charIndex: number) => {
        let index = 0;
        for (let i = 0; i < wordIndex; i++) {
            index += words[i].length + (separator === ' ' ? 1 : separator.length);
        }
        return index + charIndex;
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                'flip-text-wrapper inline-block leading-none',
                className
            )}
            style={{ perspective: '1000px' }}
        >
            {words.map((word, wordIndex) => {
                const chars = word.split('');

                return (
                    <span
                        key={wordIndex}
                        className="word inline-block whitespace-nowrap"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {chars.map((char, charIndex) => {
                            const currentGlobalIndex = getCharIndex(wordIndex, charIndex);

                            // Calculate delay - if together, use same delay for all
                            let calculatedDelay = delay;
                            if (!together) {
                                calculatedDelay = currentGlobalIndex * 0.035 + delay;
                            }

                            return (
                                <span
                                    key={charIndex}
                                    className="flip-char inline-block relative"
                                    data-char={char}
                                    style={
                                        {
                                            '--flip-duration': `${duration}s`,
                                            '--flip-delay': `${calculatedDelay}s`,
                                            '--flip-iteration': loop ? 'infinite' : '1',
                                            transformStyle: 'preserve-3d',
                                        } as React.CSSProperties
                                    }
                                >
                                    {char}
                                </span>
                            );
                        })}
                        {separator === ' ' && wordIndex < words.length - 1 && (
                            <span className="whitespace inline-block">&nbsp;</span>
                        )}
                        {separator !== ' ' && wordIndex < words.length - 1 && (
                            <span className="separator inline-block">{separator}</span>
                        )}
                    </span>
                );
            })}
        </div>
    );
}

export default FlipText;
