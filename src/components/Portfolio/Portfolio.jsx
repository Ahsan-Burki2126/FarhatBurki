import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSiteContext } from '../../context/SiteContext';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const { categories, projects } = useSiteContext();
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo('.portfolio-label', { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.fromTo('.portfolio-title-text', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      // Filter buttons
      gsap.fromTo('.filter-btn', { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.portfolio-filters', start: 'top 85%' },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate grid items on filter change
  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll('.portfolio-item');
    gsap.fromTo(items,
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out' }
    );
  }, [activeCategory]);

  return (
    <section ref={sectionRef} className="section portfolio" id="portfolio">
      <div className="light-leak light-leak--purple" style={{ top: '-10%', right: '-10%' }} />
      <div className="light-leak light-leak--indigo" style={{ bottom: '10%', left: '-5%' }} />

      <div className="container">
        <div className="portfolio-header">
          <span className="section-label portfolio-label">Selected Work</span>
          <h2 className="section-title portfolio-title-text">
            Projects That <span className="gradient-text">Speak</span>
          </h2>
        </div>

        {/* Category Filters */}
        <div className="portfolio-filters">
          {['All', ...categories.map((c) => c.label)].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              data-cursor="view"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div ref={gridRef} className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`portfolio-item${project.category === 'Short-Form' ? ' short-form' : ''}`}
            >
              <div className="portfolio-item-media">
                <iframe
                  className="portfolio-item-player"
                  src={`https://www.youtube.com/embed/${project.youtubeId}?rel=0`}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                />
              </div>
              <div className="portfolio-item-info">
                <div className="portfolio-item-meta">
                  <span className="portfolio-item-category">{project.category}</span>
                  <span className="portfolio-item-year">{project.year}</span>
                </div>
                <h3 className="portfolio-item-title">{project.title}</h3>
                <p className="portfolio-item-desc">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
