import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './MarqueeStrip.css';

const MarqueeStrip = ({
  items = [],
  variant = 'top',
  speed = 25,
  direction = 1,
  useStar = false,
}) => {
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const xPercent = direction === 1 ? -50 : 0;
    const fromPercent = direction === 1 ? 0 : -50;

    const tween = gsap.fromTo(trackRef.current,
      { xPercent: fromPercent },
      {
        xPercent,
        duration: speed,
        ease: 'none',
        repeat: -1,
      }
    );

    return () => {
      tween.kill();
    };
  }, [speed, direction]);

  const separator = useStar ? ' \u2022 ' : ' \u2022 ';
  // Duplicate items 4x for seamless loop
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`marquee-strip marquee-strip--${variant}`}>
      <div ref={trackRef} className="marquee-track">
        {repeatedItems.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-sep">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
