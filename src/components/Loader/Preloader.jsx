import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const counterRef = useRef(null);
  const lineRef = useRef(null);
  const wordsRef = useRef(null);
  const overlayRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      },
    });

    // Counter animation
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(counter.val)),
    });

    // Progress line
    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 2.5,
      ease: 'power2.inOut',
    }, 0);

    // Words reveal
    tl.fromTo(
      wordsRef.current?.children || [],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: 'power3.out' },
      0.3
    );

    // Exit animation
    tl.to(wordsRef.current?.children || [], {
      y: -40,
      opacity: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: 'power3.in',
    }, 2.8);

    tl.to(counterRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
    }, 2.8);

    tl.to(lineRef.current, {
      opacity: 0,
      duration: 0.3,
    }, 2.8);

    // Reveal overlay slides up
    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'power3.inOut',
    }, 3.0);

    tl.to(preloaderRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'power3.inOut',
    }, 3.1);

    tl.set(preloaderRef.current, { display: 'none' });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      <div ref={overlayRef} className="preloader-overlay" />
      <div className="preloader-content">
        <div ref={wordsRef} className="preloader-words">
          <span className="preloader-word">CINEMATIC</span>
          <span className="preloader-word">VIDEO</span>
          <span className="preloader-word">EDITOR</span>
        </div>
        <div className="preloader-bottom">
          <div className="preloader-line-wrap">
            <div ref={lineRef} className="preloader-line" />
          </div>
          <span ref={counterRef} className="preloader-counter">
            {String(count).padStart(3, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
