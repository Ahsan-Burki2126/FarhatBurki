import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ---- Master GSAP Hook ---- */
export function useGsapContext(scope) {
  const ctx = useRef(null);

  useEffect(() => {
    ctx.current = gsap.context(() => {}, scope?.current);
    return () => ctx.current?.revert();
  }, [scope]);

  return ctx;
}

/* ---- ScrollTrigger Hook ---- */
export function useScrollTrigger(config) {
  const triggerRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...config?.scrollTrigger,
      },
    });

    tlRef.current = tl;
    config?.animation?.(tl);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return { triggerRef, tlRef };
}

/* ---- Text Reveal Hook ---- */
export function useTextReveal(options = {}) {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const el = textRef.current;
    const text = el.textContent;
    el.innerHTML = '';

    // Create wrapper
    const wrapper = document.createElement('span');
    wrapper.style.display = 'inline-block';
    wrapper.style.overflow = 'hidden';

    // Split into characters
    const chars = text.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.transform = 'translateY(120%)';
      span.style.opacity = '0';
      wrapper.appendChild(span);
      return span;
    });

    el.appendChild(wrapper);

    const tl = gsap.timeline({
      scrollTrigger: options.scrollTrigger
        ? {
            trigger: el,
            start: 'top 85%',
            ...options.scrollTrigger,
          }
        : undefined,
      delay: options.delay || 0,
    });

    tl.to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.02,
      ease: 'power3.out',
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return textRef;
}

/* ---- Parallax Hook ---- */
export function useParallax(speed = 0.5) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.to(ref.current, {
      y: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [speed]);

  return ref;
}

/* ---- Magnetic Effect Hook ---- */
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.innerWidth < 768) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  return ref;
}

/* ---- Stagger Reveal Hook ---- */
export function useStaggerReveal(selector, options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (!elements.length) return;

    gsap.set(elements, { y: 60, opacity: 0 });

    const tl = gsap.to(elements, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: options.stagger || 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        ...options.scrollTrigger,
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [selector]);

  return containerRef;
}

export default gsap;
