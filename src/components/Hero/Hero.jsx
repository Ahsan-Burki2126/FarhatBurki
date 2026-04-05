import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSiteContext } from '../../context/SiteContext';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const { projects } = useSiteContext();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.2 });

      tl.fromTo('.hero-badge',
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0
      );
      tl.fromTo('.hero-headline',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }, 0.2
      );
      tl.fromTo('.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.6
      );
      tl.fromTo('.hero-cta-group',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.9
      );
      tl.fromTo('.hero-strip-wrap',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }, 1.2
      );
      tl.fromTo('.hero-proof',
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }, 1.6
      );

      // Scroll parallax on content
      gsap.to('.hero-content', {
        y: -60,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '80% top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero" id="hero">
      <div className="hero-noise" />
      <div className="hero-gradient" />
      <div className="hero-vignette" />

      <div className="hero-content">
        {/* Badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Now booking for April
        </div>

        {/* Headline */}
        <h1 className="hero-headline">
          High-Converting Explainer Videos
          <br className="hero-br" />
          for <span className="hero-headline-accent">SaaS & AI Startups</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Helping funded startups turn trial users into paying customers –
          with videos that explain, & convert.
        </p>

        {/* CTAs */}
        <div className="hero-cta-group">
          <a href="#contact" className="hero-btn-primary">
            Get an estimate in 1-min
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#portfolio" className="hero-btn-outline">View our Work</a>
        </div>

        {/* Thumbnail strip */}
        <div className="hero-strip-wrap">
          <div className="hero-strip-track">
            {[...projects, ...projects].map((project, i) => (
              <div key={`${project.id}-${i}`} className="hero-strip-card">
                <img
                  src={`https://img.youtube.com/vi/${project.youtubeId}/mqdefault.jpg`}
                  alt={project.title}
                  loading="lazy"
                />
                <div className="hero-strip-overlay">
                  <div className="hero-strip-play">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <p className="hero-proof">
          Trusted by YC-backed founders and seed-stage startups worldwide. 21-days delivery.
        </p>
      </div>

      {/* Divider */}
      <div className="hero-divider">
        <span className="hero-divider-year">&copy; 2024</span>
        <div className="hero-divider-line" />
        <span className="hero-divider-location">Available Worldwide</span>
      </div>

      <div className="hero-edge-top" />
      <div className="hero-edge-bottom" />
    </section>
  );
};

export default Hero;
