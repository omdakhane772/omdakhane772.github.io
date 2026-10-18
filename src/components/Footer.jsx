import React from 'react';

export const Footer = () => {
  return (
    <footer>
      <div className="fi">
        <div>
          <div className="mono" style={{ color: 'var(--fg)' }}>
            DESIGNED WITH CURIOSITY. BUILT WITH CODE.
          </div>
          <div className="mono" style={{ marginTop: '6px' }}>
            © 2026 OM DAKHANE
          </div>
        </div>

        <nav aria-label="Social links">
          <a
            className="soc"
            href="https://github.com/omdakhane772"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            GH
          </a>
          <a
            className="soc"
            href="https://www.linkedin.com/in/om-jayesh-dakhane-107507444/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            IN
          </a>
        </nav>
      </div>
    </footer>
  );
};
