import React, { useState, useEffect } from 'react';

export const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 700);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: reduce ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      className={`top ${show ? 'show' : ''}`}
      id="top"
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
};
