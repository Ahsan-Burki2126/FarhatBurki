import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiFilm, HiDevicePhoneMobile, HiComputerDesktop, HiMicrophone } from 'react-icons/hi2';
import { useSiteContext } from '../../context/SiteContext';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  'long-form': HiFilm,
  'short-form': HiDevicePhoneMobile,
};

const DEFAULT_ICON = HiFilm;

/*
 * Default subcategory data per category.
 * New categories added via admin will start with empty subcategories.
 */
const DEFAULT_SUBCATEGORIES = {
  'long-form': {
    description: 'High-production videos designed to inform, convert, and build authority.',
    subcategories: [
      {
        id: 'saas-long',
        icon: HiComputerDesktop,
        title: 'SaaS Videos',
        description: 'Product demos, explainers, and onboarding videos that simplify complex software and drive user adoption.',
        features: ['Product Demos', 'Explainer Videos', 'Onboarding Flows', 'Feature Walkthroughs'],
        price: 'From $1,500',
      },
      {
        id: 'talking-head-long',
        icon: HiMicrophone,
        title: 'Talking Head Videos',
        description: 'Professional podcast-style and interview edits with dynamic cuts, B-roll integration, and polished post-production.',
        features: ['Multi-Cam Editing', 'B-Roll Integration', 'Audio Cleanup', 'Caption & Graphics'],
        price: 'From $800',
      },
    ],
  },
  'short-form': {
    description: 'Scroll-stopping clips optimized for social platforms and maximum engagement.',
    subcategories: [
      {
        id: 'saas-short',
        icon: HiComputerDesktop,
        title: 'SaaS Videos',
        description: 'Punchy product teasers, feature highlights, and ad creatives that capture attention in under 60 seconds.',
        features: ['Product Teasers', 'Ad Creatives', 'Feature Highlights', 'App Previews'],
        price: 'From $500',
      },
      {
        id: 'talking-head-short',
        icon: HiMicrophone,
        title: 'Talking Head Videos',
        description: 'Engaging short clips from long-form content — repurposed for Reels, Shorts, and TikTok with hooks that stop the scroll.',
        features: ['Content Repurposing', 'Hook Optimization', 'Trend Formats', 'Platform Sizing'],
        price: 'From $300',
      },
    ],
  },
};

const Services = () => {
  const { categories } = useSiteContext();
  const sectionRef = useRef(null);

  const SERVICE_CATEGORIES = categories.map((cat) => {
    const defaults = DEFAULT_SUBCATEGORIES[cat.id];
    return {
      id: cat.id,
      label: cat.label,
      icon: ICON_MAP[cat.id] || DEFAULT_ICON,
      description: defaults?.description || '',
      subcategories: defaults?.subcategories || [],
    };
  });

  const [activeCategory, setActiveCategory] = useState(SERVICE_CATEGORIES[0]?.id || '');

  const active = SERVICE_CATEGORIES.find((c) => c.id === activeCategory) || SERVICE_CATEGORIES[0];

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

      gsap.fromTo('.services-tabs', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate cards when category changes
  useEffect(() => {
    const cards = document.querySelectorAll('.service-card');
    if (!cards.length) return;

    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out' }
    );
  }, [activeCategory]);

  return (
    <section ref={sectionRef} className="section services" id="services">
      <div className="container">
        <div className="services-header">
          <span className="section-label services-label">What I Do</span>
          <h2 className="section-title services-title">
            Services & <span className="gradient-text">Expertise</span>
          </h2>
        </div>

        {/* Category tabs */}
        <div className="services-tabs">
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                className={`services-tab${activeCategory === cat.id ? ' services-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <Icon className="services-tab-icon" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Category description */}
        {active && (
          <p className="services-category-desc">{active.description}</p>
        )}

        {/* Subcategory cards */}
        <div className="services-grid">
          {active?.subcategories.map((sub) => {
            const SubIcon = sub.icon;
            return (
              <div key={sub.id} className="service-card" data-cursor="view">
                <div className="card-glow" />
                <div className="card-inner">
                  <div className="card-icon"><SubIcon /></div>
                  <h3 className="card-title">{sub.title}</h3>
                  <p className="card-description">{sub.description}</p>

                  <div className="card-features">
                    {sub.features.map((feature) => (
                      <span key={feature} className="card-feature">
                        <span className="feature-dot" />
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="card-footer">
                    <span className="card-price">{sub.price}</span>
                    <a href="#contact" className="card-cta" data-cursor="view">
                      <span>Get Started</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
