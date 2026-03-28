import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorTextRef = useRef(null);
  const [cursorState, setCursorState] = useState('default');
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
    };

    const ticker = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;
      gsap.set(cursor, { x: pos.current.x, y: pos.current.y });
    };

    // Hover listeners
    const addHoverListeners = () => {
      document.querySelectorAll('[data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setCursorState(el.dataset.cursor);
        });
        el.addEventListener('mouseleave', () => {
          setCursorState('default');
        });
      });

      document.querySelectorAll('a, button').forEach((el) => {
        if (!el.dataset.cursor) {
          el.addEventListener('mouseenter', () => setCursorState('hover'));
          el.addEventListener('mouseleave', () => setCursorState('default'));
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    gsap.ticker.add(ticker);

    // Delay to let DOM render
    const timeout = setTimeout(addHoverListeners, 1000);

    // MutationObserver for dynamic content
    const observer = new MutationObserver(() => {
      setTimeout(addHoverListeners, 200);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(ticker);
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    switch (cursorState) {
      case 'play':
        gsap.to(cursor, { width: 80, height: 80, duration: 0.3, ease: 'power2.out' });
        break;
      case 'view':
        gsap.to(cursor, { width: 80, height: 80, duration: 0.3, ease: 'power2.out' });
        break;
      case 'drag':
        gsap.to(cursor, { width: 80, height: 80, duration: 0.3, ease: 'power2.out' });
        break;
      case 'hover':
        gsap.to(cursor, { width: 50, height: 50, duration: 0.3, ease: 'power2.out' });
        break;
      default:
        gsap.to(cursor, { width: 32, height: 32, duration: 0.3, ease: 'power2.out' });
    }
  }, [cursorState]);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  const getText = () => {
    switch (cursorState) {
      case 'play': return 'PLAY';
      case 'view': return 'VIEW';
      case 'drag': return 'DRAG';
      default: return '';
    }
  };

  return (
    <>
      <div ref={cursorRef} className={`custom-cursor ${cursorState}`}>
        <span ref={cursorTextRef} className="cursor-text">{getText()}</span>
      </div>
      <div ref={cursorDotRef} className="cursor-dot" />
    </>
  );
};

export default CustomCursor;
