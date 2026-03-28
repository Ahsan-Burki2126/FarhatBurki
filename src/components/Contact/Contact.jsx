import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMagnetic } from '../../hooks/useGsap';
import { FaInstagram, FaYoutube, FaVimeoV, FaXTwitter } from 'react-icons/fa6';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const magneticBtn = useMagnetic(0.2);
  const [formData, setFormData] = useState({ name: '', email: '', project: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-label', { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.fromTo('.contact-title', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      gsap.fromTo('.contact-subtitle', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-subtitle', start: 'top 90%' },
      });

      // Form fields stagger
      gsap.fromTo('.form-group', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
      });

      // Contact info
      gsap.fromTo('.contact-info-item', { x: -20, opacity: 0 }, {
        x: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-info', start: 'top 85%' },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Animate submit
    const btn = e.target.querySelector('.submit-btn');
    gsap.to(btn, {
      scale: 0.95, duration: 0.1,
      onComplete: () => gsap.to(btn, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' }),
    });
    // TODO: API call
    console.log('Form submitted:', formData);
  };

  return (
    <section ref={sectionRef} className="section contact" id="contact">
      <div className="light-leak light-leak--indigo" style={{ top: '0', left: '30%' }} />
      <div className="light-leak light-leak--purple" style={{ bottom: '-10%', right: '10%' }} />

      <div className="container">
        <div className="contact-layout">
          {/* Left */}
          <div className="contact-left">
            <span className="section-label contact-label">Get In Touch</span>
            <h2 className="section-title contact-title">
              Let's Create <br />
              <span className="gradient-text">Something Epic</span>
            </h2>
            <p className="contact-subtitle">
              Have a project in mind? Let's talk about how we can bring your vision to life
              through the power of cinematic editing.
            </p>

            <div className="contact-info">
              <div className="contact-info-item">
                <span className="info-label">Email</span>
                <a href="mailto:hello@farhat.com" className="info-value" data-cursor="view">
                  hello@farhat.com
                </a>
              </div>
              <div className="contact-info-item">
                <span className="info-label">Based In</span>
                <span className="info-value">Available Worldwide</span>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            <div className={`form-group ${focusedField === 'name' ? 'focused' : ''} ${formData.name ? 'filled' : ''}`}>
              <label className="form-label">Your Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
              />
              <div className="form-line" />
            </div>

            <div className={`form-group ${focusedField === 'email' ? 'focused' : ''} ${formData.email ? 'filled' : ''}`}>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
              />
              <div className="form-line" />
            </div>

            <div className={`form-group ${focusedField === 'project' ? 'focused' : ''} ${formData.project ? 'filled' : ''}`}>
              <label className="form-label">Project Type</label>
              <select
                name="project"
                className="form-input form-select"
                value={formData.project}
                onChange={handleChange}
                onFocus={() => setFocusedField('project')}
                onBlur={() => setFocusedField(null)}
                required
              >
                <option value="">Select a service</option>
                <option value="cinematic">Cinematic Editing</option>
                <option value="social">Social Content</option>
                <option value="commercial">Commercial Ads</option>
                <option value="youtube">YouTube Production</option>
              </select>
              <div className="form-line" />
            </div>

            <div className={`form-group ${focusedField === 'message' ? 'focused' : ''} ${formData.message ? 'filled' : ''}`}>
              <label className="form-label">Tell Me About Your Project</label>
              <textarea
                name="message"
                className="form-input form-textarea"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
              />
              <div className="form-line" />
            </div>

            <button ref={magneticBtn} type="submit" className="magnetic-btn submit-btn" data-cursor="view">
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <span className="footer-logo">FARHAT<span className="logo-dot" /></span>
            <div className="footer-socials">
              <a href="#" className="footer-social-link" data-cursor="view" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" className="footer-social-link" data-cursor="view" aria-label="YouTube"><FaYoutube /></a>
              <a href="#" className="footer-social-link" data-cursor="view" aria-label="Vimeo"><FaVimeoV /></a>
              <a href="#" className="footer-social-link" data-cursor="view" aria-label="Twitter"><FaXTwitter /></a>
            </div>
            <span className="footer-copy">&copy; {new Date().getFullYear()} All rights reserved</span>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
