import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSiteContext } from '../../context/SiteContext';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const { projects } = useSiteContext();
  const sectionRef = useRef(null);
  const [playingId, setPlayingId] = useState(null);

  // Split into landscape (Long-Form) and portrait (Short-Form)
  const landscape = projects.filter((p) => p.category === 'Long-Form');
  const portrait = projects.filter((p) => p.category === 'Short-Form');

  // Build alternating rows: 3 landscape → 3 portrait → repeat
  const rows = [];
  let li = 0;
  let pi = 0;
  while (li < landscape.length || pi < portrait.length) {
    if (li < landscape.length) {
      rows.push({ type: 'landscape', items: landscape.slice(li, li + 3) });
      li += 3;
    }
    if (pi < portrait.length) {
      rows.push({ type: 'portrait', items: portrait.slice(pi, pi + 3) });
      pi += 3;
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.portfolio-header-explore',
        { y: 70, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      );
      gsap.fromTo('.portfolio-header-sub',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      );
      gsap.fromTo('.portfolio-row',
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.14, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.portfolio-grid-area', start: 'top 82%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="portfolio-section section" id="portfolio">
      <div className="portfolio-pattern" />
      <div className="light-leak light-leak--purple" style={{ top: '-10%', right: '-10%' }} />
      <div className="light-leak light-leak--indigo" style={{ bottom: '10%', left: '-5%' }} />

      <div className="container">
        {/* Header */}
        <div className="portfolio-header">
          <h2 className="portfolio-header-explore">Explore</h2>
          <p className="portfolio-header-sub">Our Recent Projects</p>
        </div>

        {/* Alternating grid */}
        <div className="portfolio-grid-area">
          {rows.map((row, ri) => (
            <div key={ri} className={`portfolio-row portfolio-row--${row.type}`}>
              {row.items.map((project) => (
                <div key={project.id} className="portfolio-card" data-cursor="view">
                  <div className="portfolio-card-media">
                    {playingId === project.id ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0`}
                        title={project.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        frameBorder="0"
                        className="portfolio-card-iframe"
                      />
                    ) : (
                      <>
                        <img
                          src={`https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`}
                          alt={project.title}
                          loading="lazy"
                        />
                        <div
                          className="portfolio-card-overlay"
                          onClick={() => setPlayingId(project.id)}
                        >
                          <div className="portfolio-card-play">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="portfolio-card-info">
                    <span className="portfolio-card-title">{project.title}</span>
                    <span className="portfolio-card-year">{project.year}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
