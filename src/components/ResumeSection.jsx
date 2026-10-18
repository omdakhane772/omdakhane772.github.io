import React from 'react';

export const ResumeSection = () => {
  return (
    <section id="resume">
      <div className="wrap">
        <div className="panel resume rv">
          <div>
            <div className="eyebrow mono">RESUME</div>
            <h2>Let's Build Something Reliable.</h2>
            <p>
              Computer Engineering graduate with practical backend development experience and knowledge of AWS Cloud, Linux, networking, and containerization. Seeking entry-level AWS Cloud, Cloud Support, or Junior DevOps opportunities.
            </p>
          </div>

          <div className="actions">
            <div className="fallback" id="resume-fb">
              RESUME AVAILABLE ON REQUEST
              <small>The PDF has not been added to this site yet. Email omdakhane23@gmail.com and I will send it.</small>
            </div>
            <a
              className="btn"
              href="https://github.com/omdakhane772"
              target="_blank"
              rel="noopener noreferrer"
            >
              VIEW GITHUB <span className="ar">↗</span>
            </a>
            <a
              className="btn"
              href="https://www.linkedin.com/in/om-jayesh-dakhane-107507444/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CONNECT ON LINKEDIN <span className="ar">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
