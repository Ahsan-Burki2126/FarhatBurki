import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const WORDS = ['STORIES', 'EMOTION', 'IMPACT', 'WORLDS'];

const Hero = () => {
  const heroRef = useRef(null);
  const gradientRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const mediaRef = useRef(null);
  const heroYoutubeId = 'dQw4w9WgXcQ';
  const dividerLineRef = useRef(null);
  const wordRef = useRef(null);
  const wordIndex = useRef(0);
  const cycleTimer = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.2 });

      // Gradient fade
      tl.to(gradientRef.current, { opacity: 1, duration: 2, ease: 'power2.out' }, 0);

      // Reel badge
      tl.to('.hero-reel', { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.8);

      // Name — slide up from below
      tl.fromTo(nameRef.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
        1.0
      );

      // Role — slide up
      tl.fromTo(roleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        1.4
      );

      // Tagline
      tl.to('.hero-tagline', { opacity: 1, duration: 0.8, ease: 'power2.out' }, 1.8);

      // CTA row
      tl.to('.hero-cta-row', { opacity: 1, duration: 0.8, ease: 'power2.out' }, 2.1);

      // Media frame — scale up + fade
      tl.to(mediaRef.current, {
        opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out',
      }, 1.2);

      // Corner accents
      tl.to('.hero-frame-corner', {
        opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out',
      }, 2.0);

      // Frame number
      tl.to('.hero-frame-number', { opacity: 1, duration: 0.5 }, 2.3);

      // Divider line draws in
      tl.to(dividerLineRef.current, {
        scaleX: 1, duration: 1.2, ease: 'power2.inOut',
      }, 2.0);

      // Divider text
      tl.to('.hero-divider-year', { opacity: 1, duration: 0.5 }, 2.6);
      tl.to('.hero-divider-location', { opacity: 1, duration: 0.5 }, 2.6);

      // Status badge
      tl.to('.hero-status', { opacity: 1, duration: 0.5 }, 2.4);

      // Scroll indicator
      tl.to('.hero-scroll', { opacity: 1, duration: 0.5 }, 3.0);

      // ---- Idle animations ----

      // Gradient drift
      gsap.to(gradientRef.current, {
        x: 50, y: -30, scale: 1.05, rotation: 2,
        duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });

      // ---- Scroll parallax ----

      gsap.to('.hero-left', {
        y: -80, opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: '20% top',
          end: '60% top',
          scrub: true,
        },
      });

      gsap.to(mediaRef.current, {
        y: -40, scale: 1.05,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '80% top',
          scrub: true,
        },
      });

      // ---- Word cycling ----
      const cycleWords = () => {
        if (!isMounted.current || !wordRef.current) return;

        wordIndex.current = (wordIndex.current + 1) % WORDS.length;
        const next = WORDS[wordIndex.current];

        const cycleTl = gsap.timeline({
          onComplete: () => {
            if (isMounted.current) {
              cycleTimer.current = setTimeout(cycleWords, 3000);
            }
          },
        });

        cycleTl.to(wordRef.current, {
          y: -30, opacity: 0, duration: 0.4, ease: 'power2.in',
        });

        cycleTl.add(() => {
          if (wordRef.current) wordRef.current.textContent = next;
        });

        cycleTl.fromTo(wordRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
      };

      cycleTimer.current = setTimeout(cycleWords, 6000 + 3200);

    }, heroRef);

    // ---- Mouse parallax ----
    const handleMouse = (e) => {
      if (window.innerWidth < 768) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to('.hero-left', { x: x * 8, y: y * 5, duration: 1, ease: 'power2.out' });
      gsap.to(mediaRef.current, { x: x * -12, y: y * -8, duration: 1.2, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouse);

    return () => {
      isMounted.current = false;
      if (cycleTimer.current) clearTimeout(cycleTimer.current);
      ctx.revert();
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero" id="hero">
      {/* Background */}
      <div className="hero-noise" />
      <div ref={gradientRef} className="hero-gradient" />
      <div className="hero-vignette" />

      {/* Status badge */}
      <div className="hero-status">
        <span className="hero-status-dot" />
        <span className="hero-status-text">Available for work</span>
      </div>

      {/* Main grid */}
      <div className="hero-inner">
        {/* Left — Editorial text */}
        <div className="hero-left">
          <div className="hero-reel">
            <span className="hero-reel-dot" />
            <span className="hero-reel-text">Cinematic Video Editor</span>
          </div>

          <div className="hero-name-wrap">
            <h1 ref={nameRef} className="hero-name">FRAME <span className="hero-name--accent">BY FRAME</span></h1>
          </div>

          <div className="hero-role-wrap">
            <p ref={roleRef} className="hero-role">
              I craft <span ref={wordRef} className="hero-tagline-accent">{WORDS[0]}</span>
            </p>
          </div>

          <div className="hero-tagline">
            <p>
              Every frame carries intent. Every cut builds tension.
              I transform raw footage into <span className="hero-tagline-accent">cinematic experiences</span> that
              stay with your audience long after the screen fades.
            </p>
          </div>

          <div className="hero-cta-row">
            <a href="#portfolio" className="hero-cta">
              <span>View my work</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="#contact" className="hero-cta-secondary">Get in touch</a>
          </div>
        </div>

        {/* Right — Video frame */}
        <div className="hero-right">
          <div ref={mediaRef} className="hero-media-frame">
            <iframe
              className="hero-media-video"
              src={`https://www.youtube.com/embed/${heroYoutubeId}?rel=0`}
              title="Hero Reel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            />

            {/* Corner accents */}
            <div className="hero-frame-corner hero-frame-corner--tl" />
            <div className="hero-frame-corner hero-frame-corner--tr" />
            <div className="hero-frame-corner hero-frame-corner--bl" />
            <div className="hero-frame-corner hero-frame-corner--br" />

            <span className="hero-frame-number">REEL 001</span>
          </div>
        </div>
      </div>

      {/* Horizontal divider */}
      <div className="hero-divider">
        <span className="hero-divider-year">&copy; 2024</span>
        <div ref={dividerLineRef} className="hero-divider-line" />
        <span className="hero-divider-location">Available Worldwide</span>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <div className="hero-scroll-line">
          <div className="hero-scroll-fill" />
        </div>
        <span className="hero-scroll-text">Scroll</span>
      </div>

      {/* Edge gradients */}
      <div className="hero-edge-top" />
      <div className="hero-edge-bottom" />
    </section>
  );
};

export default Hero;
