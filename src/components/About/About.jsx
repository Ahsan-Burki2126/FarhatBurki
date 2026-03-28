import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '2018', title: 'The Spark', description: 'Picked up my first camera and discovered the magic of storytelling through motion. What started as a hobby became an obsession.' },
  { year: '2019', title: 'First Client', description: 'Landed my first commercial project — a local brand film that went viral. Realized this was my calling.' },
  { year: '2020', title: 'Going Pro', description: 'Went full-time as a video editor. Invested in professional tools and started building a client base across industries.' },
  { year: '2021', title: 'The Breakthrough', description: 'Edited a documentary that screened at international film festivals. Recognition opened doors to premium clients.' },
  { year: '2022', title: 'Studio Launch', description: 'Launched my own editing studio. Built a team. Started taking on larger commercial and cinematic projects.' },
  { year: '2023', title: 'Global Reach', description: 'Working with clients across 4 continents. From Silicon Valley startups to European fashion brands.' },
  { year: '2024', title: 'The Vision', description: 'Pushing the boundaries of what video editing can be. Every frame is intentional. Every cut tells a story.' },
];

const stats = [
  { number: '200+', label: 'Projects Delivered' },
  { number: '50+', label: 'Happy Clients' },
  { number: '6+', label: 'Years Experience' },
  { number: '15M+', label: 'Views Generated' },
];

const About = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Image reveal
      gsap.fromTo('.about-visual', { opacity: 0, scale: 0.95 }, {
        opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-visual', start: 'top 85%' },
      });
      // Section header
      gsap.fromTo('.about-label', { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.fromTo('.about-title', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      gsap.fromTo('.about-description', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-description', start: 'top 85%' },
      });

      // Stats
      gsap.fromTo('.stat-item', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
      });

      // Animate stat numbers
      document.querySelectorAll('.stat-number').forEach((el) => {
        const target = el.textContent;
        const num = parseInt(target);
        if (isNaN(num)) return;

        const suffix = target.replace(/[\d]/g, '');

        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            const counter = { val: 0 };
            gsap.to(counter, {
              val: num,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = Math.round(counter.val) + suffix;
              },
            });
          },
        });
      });

      // Timeline milestones
      gsap.fromTo('.milestone', { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 75%',
          end: 'bottom 20%',
        },
      });

      // Timeline line grow
      gsap.fromTo('.timeline-line-fill', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: true,
        },
      });

      // Floating elements parallax
      gsap.utils.toArray('.floating-element').forEach((el, i) => {
        gsap.to(el, {
          y: (i % 2 === 0 ? -40 : 40),
          x: (i % 3 === 0 ? 20 : -20),
          rotation: (i % 2 === 0 ? 5 : -5),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section about" id="about">
      <div className="light-leak light-leak--lavender" style={{ top: '20%', left: '-15%' }} />
      <div className="light-leak light-leak--indigo" style={{ bottom: '-10%', right: '-10%' }} />

      {/* Floating Elements */}
      <div className="floating-element floating-element--1" />
      <div className="floating-element floating-element--2" />
      <div className="floating-element floating-element--3" />

      <div className="container">
        {/* Header — Two Column */}
        <div className="about-hero-row">
          <div className="about-header">
            <span className="section-label about-label">My Story</span>
            <h2 className="section-title about-title">
              The Editor Behind <br />
              <span className="gradient-text">The Experience</span>
            </h2>
            <p className="about-description">
              I believe every frame tells a story. Every cut carries emotion.
              Every transition creates meaning. I'm not just editing footage —
              I'm sculpting time, crafting narratives that linger in the mind
              long after the screen goes dark.
            </p>
          </div>

          {/* Right Side — Image */}
          <div className="about-visual">
            <div className="about-image-wrap">
              <img
                src="/profile image 2.png"
                alt="Farhat — Video Editor"
                className="about-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="about-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="about-timeline-header">
          <h3 className="timeline-heading">My Journey</h3>
        </div>

        <div ref={timelineRef} className="about-timeline">
          <div className="timeline-line">
            <div className="timeline-line-fill" />
          </div>

          {milestones.map((milestone, index) => (
            <div key={milestone.year} className={`milestone ${index % 2 === 0 ? 'milestone--left' : 'milestone--right'}`}>
              <div className="milestone-dot" />
              <div className="milestone-content">
                <span className="milestone-year">{milestone.year}</span>
                <h4 className="milestone-title">{milestone.title}</h4>
                <p className="milestone-desc">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
