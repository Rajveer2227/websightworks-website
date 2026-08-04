'use client';

import { useState, useEffect } from 'react';
import FlipText from './flip-text';

interface FlipTextCycleProps {
    /**
     * Array of text strings to cycle through
     */
    texts: string[];

    /**
     * Interval time in milliseconds between transitions
     * @default 4500
     */
    interval?: number;

    /**
     * Duration of the letter flip animation in seconds
     * @default 1.5
     */
    duration?: number;

    /**
     * Additional CSS classes for the wrapper
     */
    className?: string;
}

/**
 * FlipTextCycle - Cycles through an array of phrases, animating
 * each letter using the FlipText component on transition.
 */
export function FlipTextCycle({
    texts,
    interval = 4500,
    duration = 1.5,
    className,
}: FlipTextCycleProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!texts || texts.length <= 1) return;

        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, interval);

        return () => clearInterval(timer);
    }, [texts, interval]);

    return (
        <div className={className} style={{ display: 'inline-block' }}>
            {/* The active text acts as the React key. Changing the key forces
                React to unmount the old text and mount the new text, triggering
                the flip entrance animation from opacity 0 to 1 automatically. */}
            <FlipText key={texts[index]} duration={duration} loop={false}>
                {texts[index]}
            </FlipText>
        </div>
    );
}

export default FlipTextCycle;
