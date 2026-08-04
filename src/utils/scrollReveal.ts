import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let activeTriggers: ScrollTrigger[] = [];

/**
 * Responsive translation value based on viewport width and prefers-reduced-motion.
 */
const getTranslationY = (baseVal: number, prefersReducedMotion: boolean) => {
  if (prefersReducedMotion) return 0;
  const w = window.innerWidth;
  if (w <= 576) return baseVal * 0.5; // Mobile (e.g. 12px for sections)
  if (w <= 992) return baseVal * 0.75; // Tablet (e.g. 18px for sections)
  return baseVal; // Desktop (e.g. 24px for sections)
};

/**
 * Initializes all scroll reveal ScrollTriggers on the active page.
 */
export function initScrollReveal() {
  cleanupScrollReveal();

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  console.log('[ScrollReveal] Initializing reveal system. Prefers reduced motion:', prefersReducedMotion);

  // 1. Accessibility Override
  if (prefersReducedMotion) {
    gsap.set(
      '[data-reveal="section"], [data-reveal="label"], [data-reveal="title"], [data-reveal="paragraph"], [data-reveal="card"], [data-reveal="image"], [data-reveal="button"], [data-reveal="cta"], [data-reveal="footer"]',
      { opacity: 1, y: 0, scale: 1 }
    );
    return;
  }

  // Define selector targets (filtering out already-revealed elements)
  const sectionSelector = '[data-reveal="section"]:not([data-revealed="true"])';
  const labelSelector = '[data-reveal="label"]:not([data-revealed="true"])';
  const titleSelector = '[data-reveal="title"]:not([data-revealed="true"])';
  const paragraphSelector = '[data-reveal="paragraph"]:not([data-revealed="true"])';
  const cardSelector = '[data-reveal="card"]:not([data-revealed="true"])';
  const imageSelector = '[data-reveal="image"]:not([data-revealed="true"])';
  const buttonSelector = '[data-reveal="button"]:not([data-revealed="true"])';
  const ctaSelector = '[data-reveal="cta"]:not([data-revealed="true"])';
  const footerSelector = '[data-reveal="footer"]:not([data-revealed="true"])';

  // Set initial hidden states
  gsap.set(sectionSelector, { opacity: 0, y: getTranslationY(24, prefersReducedMotion) });
  gsap.set(labelSelector, { opacity: 0, y: getTranslationY(12, prefersReducedMotion) });
  gsap.set(titleSelector, { opacity: 0, y: getTranslationY(20, prefersReducedMotion) });
  gsap.set(paragraphSelector, { opacity: 0, y: getTranslationY(20, prefersReducedMotion) });
  gsap.set(cardSelector, { opacity: 0, y: getTranslationY(20, prefersReducedMotion) });
  gsap.set(imageSelector, { opacity: 0, scale: 0.98, y: getTranslationY(18, prefersReducedMotion) });
  gsap.set(buttonSelector, { opacity: 0, y: getTranslationY(12, prefersReducedMotion) });
  gsap.set(ctaSelector, { opacity: 0, scale: 0.99 });
  gsap.set(footerSelector, { opacity: 0, y: getTranslationY(20, prefersReducedMotion) });

  // 2. Section Reveal + Subheading Staggered Cascade
  const sections = document.querySelectorAll(sectionSelector);
  console.log('[ScrollReveal] Found sections to animate:', sections.length);
  sections.forEach((sec) => {
    // Reveal section container
    const sectionTween = gsap.to(sec, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      onComplete: () => {
        sec.setAttribute('data-revealed', 'true');
      },
      scrollTrigger: {
        trigger: sec,
        start: 'top 82%',
        toggleActions: 'play none none none',
        once: true
      }
    });
    if (sectionTween.scrollTrigger) {
      activeTriggers.push(sectionTween.scrollTrigger);
    }

    // Cascade headings inside this section if present
    const labels = sec.querySelectorAll(labelSelector);
    const titles = sec.querySelectorAll(titleSelector);
    const paragraphs = sec.querySelectorAll(paragraphSelector);

    if (labels.length > 0 || titles.length > 0 || paragraphs.length > 0) {
      const headingTimeline = gsap.timeline({
        onComplete: () => {
          labels.forEach(el => el.setAttribute('data-revealed', 'true'));
          titles.forEach(el => el.setAttribute('data-revealed', 'true'));
          paragraphs.forEach(el => el.setAttribute('data-revealed', 'true'));
        },
        scrollTrigger: {
          trigger: sec,
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true
        }
      });

      if (headingTimeline.scrollTrigger) {
        activeTriggers.push(headingTimeline.scrollTrigger);
      }

      if (labels.length > 0) {
        headingTimeline.to(labels, {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out'
        }, 0);
      }

      if (titles.length > 0) {
        headingTimeline.to(titles, {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out'
        }, 0.08);
      }

      if (paragraphs.length > 0) {
        headingTimeline.to(paragraphs, {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out'
        }, 0.16);
      }
    }
  });

  // 3. Staggered Card Reveal (Grouped by closest parent grid)
  const cardToGroupMap = new Map<Element, Element>();
  const cardGroups = new Set<Element>();
  const allCardsList = Array.from(document.querySelectorAll(cardSelector));
  console.log('[ScrollReveal] Found cards to animate:', allCardsList.length);

  allCardsList.forEach(card => {
    if (card.parentElement) {
      cardGroups.add(card.parentElement);
      cardToGroupMap.set(card, card.parentElement);
    }
  });

  cardGroups.forEach(group => {
    // Only select cards whose direct parent group matches this group
    const groupCards = allCardsList.filter(card => cardToGroupMap.get(card) === group);
    if (groupCards.length > 0) {
      const cardTween = gsap.to(groupCards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        onComplete: () => {
          groupCards.forEach(card => card.setAttribute('data-revealed', 'true'));
        },
        scrollTrigger: {
          trigger: group,
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true
        }
      });
      if (cardTween.scrollTrigger) {
        activeTriggers.push(cardTween.scrollTrigger);
      }
    }
  });

  // 4. Standalone Image Reveal (Settle)
  const images = document.querySelectorAll(imageSelector);
  console.log('[ScrollReveal] Found images to animate:', images.length);
  images.forEach((img) => {
    const imgTween = gsap.to(img, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      onComplete: () => {
        img.setAttribute('data-revealed', 'true');
      },
      scrollTrigger: {
        trigger: img,
        start: 'top 82%',
        toggleActions: 'play none none none',
        once: true
      }
    });
    if (imgTween.scrollTrigger) {
      activeTriggers.push(imgTween.scrollTrigger);
    }
  });

  // 5. Standalone Button Reveal (Fade)
  const buttons = document.querySelectorAll(buttonSelector);
  console.log('[ScrollReveal] Found buttons to animate:', buttons.length);
  buttons.forEach((btn) => {
    const btnTween = gsap.to(btn, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.2,
      ease: 'power3.out',
      onComplete: () => {
        btn.setAttribute('data-revealed', 'true');
      },
      scrollTrigger: {
        trigger: btn,
        start: 'top 82%',
        toggleActions: 'play none none none',
        once: true
      }
    });
    if (btnTween.scrollTrigger) {
      activeTriggers.push(btnTween.scrollTrigger);
    }
  });

  // 6. Large CTA Card Reveal (Scale & Fade Container)
  const ctas = document.querySelectorAll(ctaSelector);
  console.log('[ScrollReveal] Found CTA cards to animate:', ctas.length);
  ctas.forEach((cta) => {
    const ctaTween = gsap.to(cta, {
      opacity: 1,
      scale: 1,
      duration: 1.0,
      ease: 'power3.out',
      onComplete: () => {
        cta.setAttribute('data-revealed', 'true');
      },
      scrollTrigger: {
        trigger: cta,
        start: 'top 82%',
        toggleActions: 'play none none none',
        once: true
      }
    });
    if (ctaTween.scrollTrigger) {
      activeTriggers.push(ctaTween.scrollTrigger);
    }
  });

  // 7. Footer Reveal (Fade & Slide Up)
  const footers = document.querySelectorAll(footerSelector);
  console.log('[ScrollReveal] Found footers to animate:', footers.length);
  footers.forEach((footer) => {
    const footerTween = gsap.to(footer, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      onComplete: () => {
        footer.setAttribute('data-revealed', 'true');
      },
      scrollTrigger: {
        trigger: footer,
        start: 'top 92%',
        toggleActions: 'play none none none',
        once: true
      }
    });
    if (footerTween.scrollTrigger) {
      activeTriggers.push(footerTween.scrollTrigger);
    }
  });
}

/**
 * Kills and cleans up all scroll reveal ScrollTriggers to prevent leaks on transitions.
 */
export function cleanupScrollReveal() {
  activeTriggers.forEach((trigger) => {
    if (trigger && typeof trigger.kill === 'function') {
      trigger.kill();
    }
  });
  activeTriggers = [];
}
