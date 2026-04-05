import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiFilm, HiDevicePhoneMobile, HiComputerDesktop, HiMicrophone } from 'react-icons/hi2';
import { useSiteContext } from '../../context/SiteContext';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

// Long-form subcategories
const LONGFORM_SUBCATS = [
  { id: 'saas', label: 'SaaS Videos' },
  { id: 'vsl', label: 'VSL' },
  { id: 'talking-head', label: 'Talking Head' },
];

/*
 * REPLACE the youtubeId values below with your actual unlisted YouTube video IDs.
 * e.g. if your video URL is https://youtu.be/abc123XYZ then youtubeId: 'abc123XYZ'
 */
const LONGFORM_CONTENT = {
  saas: {
    icon: HiComputerDesktop,
    title: 'SaaS Videos',
    description: 'Product demos, explainers, and onboarding videos that simplify complex software and drive user adoption.',
    features: ['Product Demos', 'Explainer Videos', 'Onboarding Flows', 'Feature Walkthroughs'],
    price: 'From $1,500',
    videos: [
      { id: 's1', youtubeId: 'dQw4w9WgXcQ', title: 'SaaS Product Demo' },
      { id: 's2', youtubeId: '2Gg6Seob5Mg', title: 'Onboarding Explainer' },
      { id: 's3', youtubeId: 'C0DPdy98e4c', title: 'Feature Walkthrough' },
    ],
  },
  vsl: {
    icon: HiFilm,
    title: 'Video Sales Letters',
    description: 'High-converting VSLs crafted to engage your audience, build trust, and drive them to take action.',
    features: ['Script Editing', 'Hook Optimization', 'CTA Integration', 'Motion Graphics'],
    price: 'From $1,200',
    videos: [
      { id: 'v1', youtubeId: 'LXb3EKWsInQ', title: 'VSL — Brand Story' },
      { id: 'v2', youtubeId: 'ScMzIvxBSi4', title: 'VSL — Product Launch' },
      { id: 'v3', youtubeId: 'YE7VzlLtp-4', title: 'VSL — Lead Gen' },
    ],
  },
  'talking-head': {
    icon: HiMicrophone,
    title: 'Talking Head Videos',
    description: 'Professional interview edits with dynamic cuts, B-roll integration, and polished post-production.',
    features: ['Multi-Cam Editing', 'B-Roll Integration', 'Audio Cleanup', 'Caption & Graphics'],
    price: 'From $800',
    videos: [
      { id: 't1', youtubeId: 'C0DPdy98e4c', title: 'Founder Interview' },
      { id: 't2', youtubeId: 'dQw4w9WgXcQ', title: 'Podcast Edit' },
      { id: 't3', youtubeId: '2Gg6Seob5Mg', title: 'Talking Head Ad' },
    ],
  },
};

const Services = () => {
  const { projects } = useSiteContext();
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('long-form');
  const [activeSubcat, setActiveSubcat] = useState('saas');
  const [playingId, setPlayingId] = useState(null);

  // All short-form projects sorted by id
  const shortFormProjects = projects.filter((p) => p.category === 'Short-Form');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.services-label', { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.fromTo('.services-title', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.fromTo('.services-tab-card', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-tabs-row', start: 'top 82%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate content on tab/subcat change
  useEffect(() => {
    setPlayingId(null);
    gsap.fromTo('.services-content-area',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
    );
  }, [activeTab, activeSubcat]);

  const subcontent = LONGFORM_CONTENT[activeSubcat];

  return (
    <section ref={sectionRef} className="section services-section" id="services">
      <div className="light-leak light-leak--indigo" style={{ top: '10%', right: '-8%' }} />
      <div className="light-leak light-leak--purple" style={{ bottom: '20%', left: '-5%' }} />

      <div className="container">
        {/* Header */}
        <div className="services-header">
          <span className="section-label services-label">What I Do</span>
          <h2 className="section-title services-title">
            Services & <span className="gradient-text">Expertise</span>
          </h2>
        </div>

        {/* Tab Cards */}
        <div className="services-tabs-row">
          <button
            className={`services-tab-card${activeTab === 'long-form' ? ' stc--active' : ''}`}
            onClick={() => setActiveTab('long-form')}
          >
            <div className="stc-icon-wrap stc-icon--film">
              <HiFilm />
            </div>
            <div className="stc-body">
              <div className="stc-title-row">
                <span className="stc-big">Long</span>
                <span className="stc-small">Form Edits</span>
              </div>
              <p className="stc-desc">YouTube videos with clean cuts and viral flow</p>
            </div>
            {activeTab === 'long-form' && <span className="stc-active-dot" />}
          </button>

          <button
            className={`services-tab-card${activeTab === 'short-form' ? ' stc--active' : ''}`}
            onClick={() => setActiveTab('short-form')}
          >
            <div className="stc-icon-wrap stc-icon--mobile">
              <HiDevicePhoneMobile />
            </div>
            <div className="stc-body">
              <div className="stc-title-row">
                <span className="stc-big">Short</span>
                <span className="stc-small">Form Edits</span>
              </div>
              <p className="stc-desc">Snappy Reels and Shorts built to trend</p>
            </div>
            {activeTab === 'short-form' && <span className="stc-active-dot" />}
          </button>
        </div>

        {/* ---- Long-Form content ---- */}
        {activeTab === 'long-form' && (
          <div className="services-content-area">
            {/* Subcategory filters */}
            <div className="services-subcat-row">
              {LONGFORM_SUBCATS.map((sc) => (
                <button
                  key={sc.id}
                  className={`services-subcat-btn${activeSubcat === sc.id ? ' active' : ''}`}
                  onClick={() => setActiveSubcat(sc.id)}
                >
                  {sc.label}
                </button>
              ))}
            </div>

            {/* Service info card */}
            {subcontent && (
              <div className="services-longform-card">
                <div className="slc-icon">
                  <subcontent.icon />
                </div>
                <div className="slc-body">
                  <h3 className="slc-title">{subcontent.title}</h3>
                  <p className="slc-desc">{subcontent.description}</p>
                  <div className="slc-features">
                    {subcontent.features.map((f) => (
                      <span key={f} className="slc-feature">
                        <span className="slc-dot" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="slc-footer">
                  <span className="slc-price">{subcontent.price}</span>
                  <a href="#contact" className="slc-cta">
                    Get Started
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            )}

            {/* Video samples grid */}
            {subcontent?.videos?.length > 0 && (
              <div className="services-video-grid">
                {subcontent.videos.map((video) => (
                  <div key={video.id} className="svc-card" data-cursor="view">
                    {playingId === video.id ? (
                      <div className="svc-player">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          frameBorder="0"
                        />
                      </div>
                    ) : (
                      <div className="svc-thumb" onClick={() => setPlayingId(video.id)}>
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                          alt={video.title}
                          loading="lazy"
                        />
                        <div className="svc-overlay">
                          <div className="svc-play">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                    <p className="svc-title">{video.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---- Short-Form content: portrait grid ---- */}
        {activeTab === 'short-form' && (
          <div className="services-content-area">
            <div className="services-shortform-grid">
              {shortFormProjects.map((project) => (
                <div key={project.id} className="services-portrait-card" data-cursor="view">
                  <div className="spc-media">
                    {playingId === project.id ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0`}
                        title={project.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        frameBorder="0"
                        style={{ width: '100%', height: '100%', border: 'none' }}
                      />
                    ) : (
                      <>
                        <img
                          src={`https://img.youtube.com/vi/${project.youtubeId}/mqdefault.jpg`}
                          alt={project.title}
                          loading="lazy"
                        />
                        <div className="spc-overlay" onClick={() => setPlayingId(project.id)}>
                          <div className="spc-play">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <p className="spc-title">{project.title}</p>
                  <span className="spc-year">{project.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
