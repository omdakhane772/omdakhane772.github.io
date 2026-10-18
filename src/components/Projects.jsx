import React, { useState } from 'react';
import { projects } from '../data/projectsData';
import { ProjectModal } from './ProjectModal';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleTiltMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${(x * 4).toFixed(2)}deg) rotateX(${(-y * 4).toFixed(2)}deg)`;
  };

  const handleTiltLeave = (e) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <section id="projects">
      <div className="wrap">
        <div className="head rv">
          <div className="eyebrow mono">ENGINEERING SHOWCASE</div>
          <h2>Built to Solve Real Problems.</h2>
          <p className="sub">Explore my application development and distributed systems projects.</p>
        </div>

        <div className="projects" id="plist">
          {projects.map((p) => {
            const Diagram = p.DiagramComponent;
            return (
              <article
                key={p.id}
                className="panel pc rv"
                data-cursor="VIEW"
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
              >
                <div className="pv">
                  <Diagram />
                  <span className="cap mono">{p.caption}</span>
                </div>

                <div className="pb">
                  <div className="pn mono">
                    <b>{p.number}</b>
                    <span className="cat">{p.category}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>

                  <div className="chips">
                    {p.tech.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>

                  <ul>
                    {p.features.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="btn"
                    onClick={() => setSelectedProject(p)}
                  >
                    VIEW DETAILS <span className="ar">↗</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
