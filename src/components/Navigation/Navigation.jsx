import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSiteContext } from '../../context/SiteContext';
import './Navigation.css';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Work', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const { theme, toggleTheme } = useSiteContext();
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);

    // Entrance animation
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 3.5, ease: 'power3.out' }
    );

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const tl = gsap.timeline();
      tl.to(menuRef.current, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 0.8,
        ease: 'power3.inOut',
      });
      tl.fromTo(
        '.fullscreen-menu .menu-link',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );
      tl.fromTo(
        '.menu-info',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        duration: 0.6,
        ease: 'power3.inOut',
      });
    }
  }, [isOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav ref={navRef} className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#" className="nav-logo" data-cursor="view">
            <span className="logo-text">FARHAT</span>
            <span className="logo-dot" />
          </a>

          <div className="nav-links-desktop">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
                data-cursor="hover"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="nav-right">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              data-cursor="view"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>
            <button
              className={`nav-menu-btn ${isOpen ? 'active' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              data-cursor="view"
            >
              <span className="menu-line" />
              <span className="menu-line" />
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      <div ref={menuRef} className="fullscreen-menu">
        <div className="menu-content">
          <div className="menu-links">
            {navLinks.map((link, i) => (
              <div key={link.label} className="menu-link-wrap">
                <a
                  href={link.href}
                  className="menu-link"
                  data-cursor="view"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span className="menu-link-index">0{i + 1}</span>
                  <span className="menu-link-text">{link.label}</span>
                </a>
              </div>
            ))}
          </div>
          <div className="menu-info">
            <div className="menu-info-col">
              <span className="menu-info-label">Email</span>
              <a href="mailto:hello@farhat.com">hello@farhat.com</a>
            </div>
            <div className="menu-info-col">
              <span className="menu-info-label">Social</span>
              <div className="menu-socials">
                <a href="#" data-cursor="view">Instagram</a>
                <a href="#" data-cursor="view">YouTube</a>
                <a href="#" data-cursor="view">Vimeo</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
