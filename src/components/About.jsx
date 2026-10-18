import React from 'react';

export const About = () => {
  return (
    <section id="about">
      <div className="wrap">
        <div className="head rv">
          <div className="eyebrow mono">ABOUT</div>
          <h2>More Than Code. An Infrastructure Mindset.</h2>
        </div>

        <div className="about">
          <aside className="panel profile rv" data-tilt>
            <div className="avatar" role="img" aria-label="Initials OD">
              <b>OD</b>
            </div>
            <div className="tags mono">
              <div>COMPUTER ENGINEERING</div>
              <div>CLOUD &amp; BACKEND DEVELOPMENT</div>
              <div>PUNE, INDIA</div>
            </div>
          </aside>

          <div className="copy rv">
            <p>
              I'm Om Dakhane, a Computer Engineering graduate with practical experience in backend application development and a growing focus on AWS Cloud and DevOps. My technical interests include Linux system administration, cloud networking, application deployment, containerization, and scalable backend systems.
            </p>
            <p>
              I enjoy understanding how software works behind the scenes — from APIs and databases to virtual networks, compute resources, authentication, and distributed communication. My goal is to grow into a cloud engineering role where I can contribute to reliable infrastructure, troubleshoot real-world issues, and continuously improve my engineering skills.
            </p>

            <div className="hl">
              <article>
                <h3>CLOUD FOUNDATIONS</h3>
                <p>AWS compute, storage, networking, identity, and infrastructure concepts.</p>
              </article>
              <article>
                <h3>BACKEND ENGINEERING</h3>
                <p>Java, Spring Boot, REST APIs, databases, and microservices.</p>
              </article>
              <article>
                <h3>SYSTEMS &amp; AUTOMATION</h3>
                <p>Linux, Docker, Git, shell scripting basics, and CI/CD fundamentals.</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
