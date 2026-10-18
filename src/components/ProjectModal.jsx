import React, { useEffect } from 'react';

export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const {
    category,
    title,
    description,
    problemStatement,
    architecture,
    caption,
    tech,
    features,
    learningOutcomes,
    DiagramComponent,
  } = project;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mtitle"
    >
      <div className="modal-content">
        <div className="mh">
          <div>
            <div className="mono cat">{category}</div>
            <h3 id="mtitle">{title}</h3>
          </div>
          <button type="button" className="x" aria-label="Close project details" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="mb">
          <div>
            <h4>Overview</h4>
            <p>{description}</p>
          </div>

          <div>
            <h4>Problem statement</h4>
            <p>{problemStatement}</p>
          </div>

          <div>
            <h4>Architecture</h4>
            <div className="diag">
              <DiagramComponent />
            </div>
            <ul style={{ marginTop: '14px' }}>
              {architecture.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="mono" style={{ marginTop: '12px', color: 'rgba(167,180,204,.7)' }}>
              {caption}
            </p>
          </div>

          <div>
            <h4>Technologies used</h4>
            <div className="chips">
              {tech.map((t, idx) => (
                <span key={idx} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4>Key implementation details</h4>
            <ul>
              {features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Learning outcomes</h4>
            <ul>
              {learningOutcomes.map((learn, idx) => (
                <li key={idx}>{learn}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Source code</h4>
            <p>
              A public repository link for this project has not been added yet. My other work is on{' '}
              <a
                href="https://github.com/omdakhane772"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--blue)' }}
              >
                GitHub
              </a>
              . This project is not deployed publicly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
