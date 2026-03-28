import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './GlobalBackground.css';

const GlobalBackground = () => {
  const gradientRef = useRef(null);

  useEffect(() => {
    if (!gradientRef.current) return;

    const tween = gsap.to(gradientRef.current, {
      x: 80,
      y: -60,
      scale: 1.1,
      rotation: 5,
      duration: 30,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div className="global-bg">
      <div ref={gradientRef} className="global-bg-gradient" />
      <div className="global-bg-noise" />
    </div>
  );
};

export default GlobalBackground;
