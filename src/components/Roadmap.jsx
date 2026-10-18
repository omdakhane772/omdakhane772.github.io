import React from 'react';

export const Roadmap = () => {
  return (
    <section id="roadmap">
      <div className="wrap">
        <div className="head rv">
          <div className="eyebrow mono">ROADMAP</div>
          <h2>Always Learning. Always Building.</h2>
        </div>

        <div className="tl">
          <article className="panel ms rv">
            <span className="mono k">CLOUD FOUNDATIONS</span>
            <h3>Compute, storage, identity, networking</h3>
            <p>AWS compute, storage, identity, VPC networking, Security Groups, and basic monitoring.</p>
          </article>

          <article className="panel ms rv">
            <span className="mono k">SYSTEMS AND AUTOMATION</span>
            <h3>Operate and ship software</h3>
            <p>Linux administration, shell scripting basics, Docker, Git, and CI/CD fundamentals.</p>
          </article>

          <article className="panel ms rv">
            <span className="mono k">BACKEND AND DISTRIBUTED SYSTEMS</span>
            <h3>Services that talk to each other</h3>
            <p>Java, Spring Boot, REST APIs, microservices, databases, Kafka, and gRPC.</p>
          </article>

          <article className="panel ms next rv">
            <span className="mono k">NEXT MILESTONE</span>
            <h3>Build, deploy, monitor, and document a cloud-hosted application.</h3>
            <p>Taking one of my backend projects from local development to a documented deployment on AWS.</p>
          </article>
        </div>
      </div>
    </section>
  );
};
