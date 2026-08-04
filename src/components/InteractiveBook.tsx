import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, X } from 'lucide-react';

export interface BookPage {
    title?: string;
    content: React.ReactNode;
    backTitle?: string;
    backContent?: React.ReactNode;
    pageNumber: number;
}

export interface InteractiveBookProps {
    coverImage?: string;
    bookTitle?: string;
    bookAuthor?: string;
    pages: BookPage[];
    className?: string;
    width?: number;
    height?: number;
}

export default function InteractiveBook({
    coverImage = "",
    bookTitle = "Book Title",
    bookAuthor = "Author Name",
    pages,
    className = "",
    width = 380,
    height = 520,
}: InteractiveBookProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(-1);
    const [isHovering, setIsHovering] = useState(false);

    // Calculate dynamic values
    const widthNum = width;
    const BOOK_OPEN_DURATION = 1.5;
    const EASING: [number, number, number, number] = [0.25, 0, 0, 1];

    const handleOpenBook = () => setIsOpen(true);

    const handleCloseBook = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setIsOpen(false);
        setCurrentPageIndex(-1);
    };

    const nextPage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (currentPageIndex < pages.length - 1) {
            setCurrentPageIndex((prev) => prev + 1);
        }
    };

    const prevPage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (currentPageIndex >= 0) {
            setCurrentPageIndex((prev) => prev - 1);
        }
    };

    const restartBook = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentPageIndex(-1);
    };

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextPage();
            if (e.key === 'ArrowLeft') prevPage();
            if (e.key === 'Escape') handleCloseBook();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentPageIndex]);

    return (
        <div
            className={`book-container ${className}`}
            style={{
                width: widthNum,
                height: height + 80
            }}
        >
            {/* Embedded styles for the Interactive Book */}
            <style>{`
                .book-container {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    perspective: 2000px;
                    margin: 0 auto;
                    overflow: visible;
                }

                .book-wrap {
                    position: relative;
                    will-change: transform;
                }

                /* Front Cover styles */
                .book-cover-element {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    transform-origin: left center;
                    transform-style: preserve-3d;
                    cursor: pointer;
                    z-index: 100;
                }

                .cover-front {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    border-radius: 0 8px 8px 0;
                    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
                    overflow: hidden;
                    transform: translateZ(0.5px);
                    background: #0d1622;
                }

                .cover-bg {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center;
                    transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .cover-bg-premium-gradient {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 30% 20%, #152d4e 0%, #060e18 100%);
                    border: 1px solid rgba(47, 128, 255, 0.15);
                    box-sizing: border-box;
                    transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .book-cover-element:hover .cover-bg,
                .book-cover-element:hover .cover-bg-premium-gradient {
                    transform: scale(1.03);
                }

                .cover-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.1) 100%);
                }

                .cover-border-gold {
                    position: absolute;
                    inset: 1.25rem;
                    border: 1px solid rgba(255, 215, 0, 0.12);
                    pointer-events: none;
                }

                .cover-content {
                    position: absolute;
                    bottom: 2.5rem;
                    left: 2rem;
                    right: 2rem;
                    text-align: left;
                    color: #ffffff;
                    z-index: 5;
                }

                .cover-logo {
                    position: absolute;
                    top: 42%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100px;
                    height: auto;
                    object-fit: contain;
                    opacity: 0.9;
                    z-index: 5;
                    pointer-events: none;
                    border-radius: 16px;
                    filter: drop-shadow(0 4px 16px rgba(0,0,0,0.5));
                }

                .cover-subtitle-top {
                    font-size: 0.65rem;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: var(--accent-blue);
                    margin-bottom: 0.75rem;
                    font-weight: 600;
                }

                .cover-title {
                    font-family: var(--font-serif);
                    font-size: 1.25rem;
                    font-weight: 400;
                    letter-spacing: 0.01em;
                    line-height: 1.25;
                    margin-bottom: 0.75rem;
                    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
                    white-space: nowrap;
                }

                .cover-author {
                    font-size: 0.75rem;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    opacity: 0.85;
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                    padding-top: 0.5rem;
                    display: inline-block;
                    color: #ffffff;
                }

                .spine-highlight-1 {
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 20px;
                    background: linear-gradient(to right, rgba(255, 255, 255, 0.1), transparent);
                    opacity: 0.35;
                }

                .spine-highlight-2 {
                    position: absolute;
                    left: 14px;
                    top: 0;
                    bottom: 0;
                    width: 1px;
                    background: rgba(0, 0, 0, 0.4);
                }

                /* Inner Cover (Back of front cover) */
                .inner-cover {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    border-radius: 8px 0 0 8px;
                    background: #fbf9f4;
                    transform: rotateY(180deg);
                    display: flex;
                    flex-direction: column;
                    padding: 3rem 1rem;
                    border-right: 1px solid #e2ddd5;
                    box-shadow: -15px 15px 35px rgba(0, 0, 0, 0.25);
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .inner-cover:hover {
                    background-color: #f8f6f0;
                }

                .inner-cover-wrap {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    opacity: 0.85;
                    transform: translateY(-1.5rem);
                }

                .inner-cover-title {
                    font-family: var(--font-serif);
                    font-size: 1.55rem;
                    color: #c5a880;
                    margin-bottom: 0;
                    font-weight: 600;
                    white-space: nowrap;
                }

                /* Page layout and body typography */
                .book-page-sheet {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    transform-origin: left center;
                    background: #fbf9f4;
                    border-radius: 0 8px 8px 0;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
                }

                .page-front-face {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    padding: 3rem 2.5rem;
                    display: flex;
                    flex-direction: column;
                    background: #fbf9f4;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    border-radius: 0 8px 8px 0;
                }

                .page-front-face:hover {
                    background-color: #f8f6f0;
                }

                .page-back-face {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    transform: rotateY(180deg);
                    background: #fbf9f4;
                    border-right: 1px solid #e2ddd5;
                    overflow: hidden;
                    padding: 3rem 2.5rem;
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    border-radius: 8px 0 0 8px;
                }

                .page-back-face:hover {
                    background-color: #f8f6f0;
                }

                .page-num-indicator-right {
                    text-align: right;
                    font-size: 0.75rem;
                    color: var(--accent-blue);
                    font-weight: 600;
                    margin-bottom: 2rem;
                    letter-spacing: 0.1em;
                    font-family: var(--font-sans);
                }

                .page-num-indicator-left {
                    text-align: left;
                    font-size: 0.75rem;
                    color: var(--accent-blue);
                    font-weight: 600;
                    margin-bottom: 2rem;
                    letter-spacing: 0.1em;
                    font-family: var(--font-sans);
                }

                .page-gutter-shadow-left {
                    position: absolute;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    width: 25px;
                    background: linear-gradient(to left, rgba(0, 0, 0, 0.04), transparent);
                    pointer-events: none;
                }

                .page-gutter-shadow-right {
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 25px;
                    background: linear-gradient(to right, rgba(0, 0, 0, 0.04), transparent);
                    pointer-events: none;
                }

                /* Content Styling */
                .book-content-wrapper {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    transform: translateY(-0.5rem);
                }

                /* Right (front) page content aligned with left */
                .page-front-face .book-content-wrapper {
                    transform: translateY(0.25rem);
                }

                .book-page-title {
                    font-family: var(--font-serif);
                    font-size: 1.5rem;
                    font-weight: 400;
                    color: #1a1a1a;
                    margin-bottom: 1.5rem;
                    line-height: 1.3;
                    letter-spacing: -0.01em;
                }

                .book-page-text {
                    font-size: 0.95rem;
                    line-height: 1.7;
                    color: #4a453c;
                    font-family: var(--font-serif);
                }

                /* Static Back Cover */
                .back-cover-element {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    background: #fbf9f4;
                    border-radius: 0 8px 8px 0;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
                    border: 1px solid #e2ddd5;
                    transform: translateZ(-1px);
                    z-index: -1;
                }

                .back-cover-content {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 2.5rem;
                    opacity: 0.45;
                }

                .back-cover-end-text {
                    font-family: var(--font-serif);
                    font-size: 1.1rem;
                    color: #1a1a1a;
                    font-style: italic;
                    margin-bottom: 1rem;
                }

                .back-cover-restart-btn {
                    margin-top: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1.25rem;
                    border-radius: 99px;
                    border: 1px solid #c7c2b6;
                    background: transparent;
                    color: #5a554b;
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .back-cover-restart-btn:hover {
                    background: #e2ddd5;
                    color: #1a1a1a;
                }

                /* Close Button overlay */
                .book-close-button {
                    position: absolute;
                    top: 2rem;
                    right: 2rem;
                    padding: 0.6rem;
                    border-radius: 50%;
                    background: rgba(10, 10, 10, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    color: #ffffff;
                    z-index: 1000;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .book-close-button:hover {
                    background: rgba(10, 10, 10, 0.7);
                    border-color: rgba(255, 255, 255, 0.25);
                    transform: scale(1.1);
                }

                .book-hint {
                    position: absolute;
                    bottom: -2.5rem;
                    left: 50%;
                    transform: translateX(-50%);
                    white-space: nowrap;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 0.8125rem;
                    font-weight: 500;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    cursor: pointer;
                    z-index: 50;
                    transition: color 0.3s ease, opacity 0.3s ease;
                }

                .book-hint:hover {
                    color: var(--accent-blue);
                }

                /* Mobile responsive tweaks */
                @media (max-width: 768px) {
                    .book-container {
                        width: 100% !important;
                        height: auto !important;
                        min-height: 480px;
                        padding: 1rem 0;
                    }
                    .book-wrap {
                        width: 290px !important;
                        height: 400px !important;
                    }
                    .cover-content {
                        bottom: 1.5rem;
                        left: 1.25rem;
                        right: 1.25rem;
                    }
                    .cover-title {
                        font-size: 1.2rem;
                    }
                    .book-page-title {
                        font-size: 1.15rem;
                        margin-bottom: 0.75rem;
                    }
                    .book-page-text {
                        font-size: 0.85rem;
                        line-height: 1.5;
                    }
                    .inner-cover, .page-front-face, .page-back-face {
                        padding: 1.5rem !important;
                    }
                    .book-close-button {
                        top: 1rem;
                        right: 1rem;
                        padding: 0.4rem;
                    }
                }
            `}</style>

            <motion.div
                className="book-wrap"
                style={{ width: widthNum, height }}
                initial={{ x: 0 }}
                animate={{ x: isOpen ? widthNum / 2 : 0 }}
                transition={{ duration: BOOK_OPEN_DURATION, ease: EASING }}
            >
                {/* Close button - inside book-wrap, always at top-right of open book */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={handleCloseBook}
                            className="book-close-button"
                            style={{ top: '-1rem', right: '-1rem', left: 'auto' }}
                        >
                            <X size={20} />
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Front Cover */}
                <motion.div
                    className="book-cover-element"
                    initial={{ rotateY: 0, zIndex: 100 }}
                    animate={{
                        rotateY: isOpen ? -180 : (isHovering ? -15 : 0),
                        zIndex: isOpen ? 0 : 100
                    }}
                    transition={{
                        rotateY: { duration: BOOK_OPEN_DURATION, ease: EASING },
                        zIndex: { delay: isOpen ? BOOK_OPEN_DURATION * 0.6 : BOOK_OPEN_DURATION * 0.4 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                    onClick={!isOpen ? handleOpenBook : undefined}
                    onHoverStart={() => !isOpen && setIsHovering(true)}
                    onHoverEnd={() => setIsHovering(false)}
                >
                    {/* Front Face */}
                    <div className="cover-front">
                        {coverImage ? (
                            <div
                                className="cover-bg"
                                style={{ backgroundImage: `url(${coverImage})` }}
                            />
                        ) : (
                            <div className="cover-bg-premium-gradient" />
                        )}
                        <div className="cover-overlay" />
                        <div className="cover-border-gold" />

                        <div className="cover-content">
                            <span className="cover-subtitle-top">Websight Works</span>
                            <h1 className="cover-title">{bookTitle}</h1>
                            <p className="cover-author">{bookAuthor}</p>
                        </div>

                        {/* Centered Logo */}
                        <img
                            src="/WW_3.png"
                            alt="Websight Works Logo"
                            className="cover-logo"
                        />

                        {/* Spine Highlights */}
                        <div className="spine-highlight-1" />
                        <div className="spine-highlight-2" />
                    </div>

                    {/* Back Face (Inner Cover) */}
                    <div
                        className="inner-cover"
                        style={{ transform: 'rotateY(180deg) translateZ(0.5px)' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            prevPage();
                        }}
                    >
                        <div className="inner-cover-wrap">
                            <h2 className="inner-cover-title">{bookTitle}</h2>
                        </div>
                    </div>
                </motion.div>

                {/* Pages Stack */}
                <div className="absolute inset-0 w-full h-full z-0" style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
                    {pages.map((page, index) => {
                        const isFlipped = index <= currentPageIndex;

                        return (
                            <motion.div
                                key={index}
                                className="book-page-sheet"
                                style={{ transformStyle: 'preserve-3d', position: 'absolute', inset: 0 }}
                                initial={{ rotateY: 0, zIndex: pages.length - index }}
                                animate={{
                                    rotateY: isFlipped ? -180 : 0,
                                    zIndex: isFlipped ? index + 1 : pages.length - index
                                }}
                                transition={{
                                    rotateY: { duration: 0.6, ease: [0.645, 0.045, 0.355, 1] },
                                    zIndex: { delay: isFlipped ? 0.5 : 0 }
                                }}
                            >
                                {/* Front Face (Right Side Page when open) */}
                                <div
                                    className="page-front-face"
                                    style={{ transform: 'translateZ(0.5px)' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextPage();
                                    }}
                                >
                                    <div className="page-num-indicator-right">
                                        {page.pageNumber * 2 - 1}
                                    </div>
                                    <div className="book-content-wrapper">
                                        {page.title && (
                                            <h3 className="book-page-title">
                                                {page.title}
                                            </h3>
                                        )}
                                        <div className="book-page-text">
                                            {page.content}
                                        </div>
                                    </div>
                                    <div className="page-gutter-shadow-right" />
                                </div>

                                {/* Back Face (Left Side Page when open) */}
                                <div
                                    className="page-back-face"
                                    style={{ transform: 'rotateY(180deg) translateZ(0.5px)' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        prevPage();
                                    }}
                                >
                                    <div className="page-num-indicator-left">
                                        {page.pageNumber * 2}
                                    </div>
                                    <div className="book-content-wrapper">
                                        {page.backTitle && (
                                            <h3 className="book-page-title">
                                                {page.backTitle}
                                            </h3>
                                        )}
                                        <div className="book-page-text">
                                            {page.backContent}
                                        </div>
                                    </div>
                                    <div className="page-gutter-shadow-left" />
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Back Cover (Static behind the pages) */}
                    <div className="back-cover-element">
                        <div className="back-cover-content">
                            <p className="back-cover-end-text">The End</p>
                            <button
                                onClick={restartBook}
                                className="back-cover-restart-btn"
                            >
                                <RefreshCcw size={13} /> Read Again
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Click to Open Hint - natural flex item, always centered */}
            {!isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    style={{
                        marginTop: '1.5rem',
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        zIndex: 50,
                        transition: 'color 0.3s ease'
                    }}
                    onClick={handleOpenBook}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-blue)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                >
                    Click to Open
                </motion.div>
            )}


            <AnimatePresence>
            </AnimatePresence>
        </div>
    );
}
