import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HorizontalScroll.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    category: 'MUSIC VIDEO',
    title: 'Neon Dreams',
    description: 'A cinematic music video blending retro aesthetics with modern motion.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    category: 'COMMERCIAL',
    title: 'Brand Elevation',
    description: 'High-end product showcase with seamless transitions and color grading.',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    youtubeId: 'LXb3EKWsInQ',
  },
  {
    category: 'SHORT FILM',
    title: 'Silent Echoes',
    description: 'An emotional short film crafted with deliberate pacing and mood.',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80',
    youtubeId: 'ScMzIvxBSi4',
  },
  {
    category: 'SOCIAL MEDIA',
    title: 'Viral Impact',
    description: 'Fast-paced, scroll-stopping content that drives engagement.',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    youtubeId: '2Gg6Seob5Mg',
  },
  {
    category: 'DOCUMENTARY',
    title: 'Raw Stories',
    description: 'Authentic storytelling through careful editing and sound design.',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    youtubeId: 'C0DPdy98e4c',
  },
];

const HorizontalScroll = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const totalScroll = track.scrollWidth - section.offsetWidth;

      const scrollTween = gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate cards as they enter
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(card,
          { scale: 0.85, opacity: 0.3 },
          {
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: 'left 80%',
              end: 'left 40%',
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hscroll" id="featured-work">
      <div className="hscroll-header">
        <span className="hscroll-label">Featured Work</span>
        <h2 className="hscroll-title">Selected Projects</h2>
      </div>
      <div ref={trackRef} className="hscroll-track">
        {PROJECTS.map((project, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="hscroll-card"
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="hscroll-card-thumb">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="hscroll-card-img"
                loading="lazy"
              />
              {hoveredCard === i && (
                <img
                  className="hscroll-card-video"
                  src={`https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`}
                  alt={project.title}
                />
              )}
              <span className="hscroll-card-number">0{i + 1}</span>
            </div>
            <div className="hscroll-card-body">
              <span className="hscroll-card-category">{project.category}</span>
              <h3 className="hscroll-card-title">{project.title}</h3>
              <p className="hscroll-card-desc">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScroll;
