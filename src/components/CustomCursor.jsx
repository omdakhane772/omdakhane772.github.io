import React, { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const ringInnerRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

    if (!fine || reduce) return;

    document.documentElement.classList.add('has-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;
    const ringInner = ringInnerRef.current;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let animId;

    const handlePointerMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot?.classList.add('on');
      ring?.classList.add('on');
      if (dot) {
        dot.style.transform = `translate(${mx}px,${my}px)`;
      }
    };

    const handlePointerLeave = () => {
      dot?.classList.remove('on');
      ring?.classList.remove('on');
    };

    const handlePointerOver = (e) => {
      const target = e.target.closest?.(
        '[data-cursor], a, button, [role=tab], [role=button], .node-g, input, textarea'
      );
      if (!ringInner) return;
      ringInner.classList.remove('big', 'label');
      ringInner.textContent = '';

      if (!target) return;

      if (target.matches('input, textarea')) {
        ring?.classList.remove('on');
        return;
      }

      if (target.hasAttribute('data-cursor')) {
        ringInner.classList.add('label');
        ringInner.textContent = target.getAttribute('data-cursor');
      } else {
        ringInner.classList.add('big');
      }
    };

    const handlePointerOut = (e) => {
      const target = e.target.closest?.('input, textarea');
      if (target) {
        ring?.classList.add('on');
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring) {
        ring.style.transform = `translate(${rx}px,${ry}px)`;
      }
      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
    };
  }, []);

  return (
    <>
      <div className="cur" ref={dotRef} aria-hidden="true">
        <div className="cur-dot" />
      </div>
      <div className="cur" ref={ringRef} aria-hidden="true">
        <div className="cur-ring" ref={ringInnerRef} />
      </div>
    </>
  );
};
