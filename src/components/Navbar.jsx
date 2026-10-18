import React, { useState, useEffect } from 'react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSolid, setIsSolid] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalH > 0 ? Math.min(1, y / totalH) : 0);
      setIsSolid(y > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver for active section highlight
    const sections = document.querySelectorAll('main section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((s) => observer.observe(s));

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`bar ${isSolid ? 'solid' : ''}`} id="bar" aria-label="Primary">
      <a className="logo" href="#home" aria-label="Om Dakhane, back to top" onClick={closeMenu}>
        <span className="mono-logo">OD</span>
        <span>OM DAKHANE</span>
        <span className="dot" title="Status: online" />
      </a>

      <ul className={`menu ${isOpen ? 'open' : ''}`} id="menu">
        {navItems.map((item) => {
          const id = item.href.substring(1);
          const isActive = activeSection === id;
          return (
            <li key={item.href}>
              <a
                href={item.href}
                className={isActive ? 'active' : ''}
                aria-current={isActive ? 'true' : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>

      <a className="btn primary sm" href="#contact" onClick={closeMenu}>
        LET'S CONNECT <span className="ar">↗</span>
      </a>

      <button
        className="burger"
        id="burger"
        type="button"
        aria-expanded={isOpen}
        aria-controls="menu"
        aria-label="Toggle menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className="progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>
    </nav>
  );
};
