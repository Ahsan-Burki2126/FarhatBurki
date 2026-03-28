import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SectionTransition.css';

gsap.registerPlugin(ScrollTrigger);

const SectionTransition = ({ direction = 'left' }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(ref.current.querySelector('.transition-line'),
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger === ref.current) t.kill();
    });
  }, []);

  return (
    <div ref={ref} className="section-transition">
      <div
        className="transition-line"
        style={{ transformOrigin: direction === 'left' ? 'left' : 'right' }}
      />
    </div>
  );
};

export default SectionTransition;
