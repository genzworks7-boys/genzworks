import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }
    const el = cursorRef.current;
    if (!el) return;

    let rafId = null;
    let targetX = -100;
    let targetY = -100;
    let visible = false;

    const render = () => {
      el.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      rafId = null;
    };

    const handlePointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = '1';
      }
      if (!rafId) {
        rafId = requestAnimationFrame(render);
      }
    };

    const handleMouseLeave = () => {
      visible = false;
      el.style.opacity = '0';
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] w-4 h-4 rounded-full bg-[#FF4F18] shadow-[0_0_16px_rgba(255,79,24,0.95)] -left-2 -top-2 opacity-0 hidden lg:block will-change-transform"
    />
  );
}
