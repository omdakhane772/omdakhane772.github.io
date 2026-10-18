import React, { useState, useEffect, useRef } from 'react';

const cloudNodes = [
  { short: 'EC2', title: 'Amazon EC2', desc: 'Virtual servers for running applications.', color: '#FF9900' },
  { short: 'S3', title: 'Amazon S3', desc: 'Object storage for files and static assets.', color: '#FF9900' },
  { short: 'RDS', title: 'Amazon RDS', desc: 'Managed relational databases.', color: '#FF9900' },
  { short: 'IAM', title: 'AWS IAM', desc: 'Identity and access management.', color: '#8B5CF6' },
  { short: 'VPC', title: 'Amazon VPC', desc: 'Isolated virtual networking environment.', color: '#38BDF8' },
  { short: 'ASG', title: 'Auto Scaling', desc: 'Adds or removes servers to match demand.', color: '#FF9900' },
  { short: 'LNX', title: 'Linux', desc: 'The operating system behind most cloud servers.', color: '#34D399' },
  { short: 'DKR', title: 'Docker', desc: 'Packages applications into portable containers.', color: '#38BDF8' },
];

export const Hero = () => {
  const [typeText, setTypeText] = useState('AWS Cloud Enthusiast');
  const [activeTooltip, setActiveTooltip] = useState(null);
  const vizRef = useRef(null);
  const vizInnerRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    const words = [
      'AWS Cloud Enthusiast',
      'Linux & System Administration',
      'Java & Spring Boot Developer',
      'DevOps & Automation Learner',
      'Microservices Developer',
    ];

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setTypeText(words.join(' • '));
      return;
    }

    let wordIdx = 0;
    let charIdx = words[0].length;
    let isDeleting = false;
    let timer;

    const tick = () => {
      const currentWord = words[wordIdx];
      if (!isDeleting) {
        charIdx++;
        setTypeText(currentWord.slice(0, charIdx));
        if (charIdx >= currentWord.length) {
          isDeleting = true;
          timer = setTimeout(tick, 2200);
          return;
        }
        timer = setTimeout(tick, 70);
      } else {
        charIdx--;
        setTypeText(currentWord.slice(0, charIdx));
        if (charIdx <= 0) {
          isDeleting = false;
          wordIdx = (wordIdx + 1) % words.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 35);
      }
    };

    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, []);

  // 3D Tilt on hero section
  useEffect(() => {
    const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    const handlePointerMove = (e) => {
      const viz = vizRef.current;
      const inner = vizInnerRef.current;
      if (!viz || !inner) return;

      const r = viz.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      inner.style.transform = `rotateY(${(dx * 14).toFixed(2)}deg) rotateX(${(-dy * 14).toFixed(2)}deg)`;
    };

    const homeElem = document.getElementById('home');
    homeElem?.addEventListener('pointermove', handlePointerMove);

    return () => {
      homeElem?.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  const cx = 280;
  const cy = 280;
  const R = 200;
  const cols = ['#38BDF8', '#FF9900', '#8B5CF6', '#34D399'];

  const nodePositions = cloudNodes.map((_, i) => {
    const angle = ((i * 45 - 90) * Math.PI) / 180;
    return {
      x: cx + R * Math.cos(angle),
      y: cy + R * Math.sin(angle),
    };
  });

  const handleNodeInteraction = (node, index, event) => {
    const viz = vizRef.current;
    if (!viz) return;
    const target = event.currentTarget;
    const r = target.getBoundingClientRect();
    const vr = viz.getBoundingClientRect();
    const x = r.left - vr.left + r.width / 2;
    const y = r.top - vr.top - 64;

    setActiveTooltip({
      title: node.title,
      desc: node.desc,
      left: Math.max(110, Math.min(vr.width - 110, x)),
      top: Math.max(0, y),
      activeIdx: index,
    });
  };

  const handleNodeLeave = () => {
    setActiveTooltip(null);
  };

  return (
    <section id="home">
      <div className="wrap">
        <div className="hero">
          <div>
            <div className="eyebrow mono">CLOUD ENGINEERING • LINUX • DEVOPS</div>
            <h1>
              Building the <span className="grad">Infrastructure</span> Behind Tomorrow.
            </h1>
            <p className="lead">
              I'm Om Dakhane, a Computer Engineering graduate focused on AWS Cloud, Linux, application deployment, and DevOps fundamentals. I enjoy building backend systems and exploring how reliable, scalable cloud infrastructure works.
            </p>

            <div className="type" aria-label="Focus areas">
              <span>&gt;</span>
              <span>{typeText}</span>
              <span className="caret" aria-hidden="true" />
            </div>

            <div className="cta">
              <a className="btn primary" href="#projects">
                EXPLORE MY WORK <span className="ar">↗</span>
              </a>
              <a className="btn" href="#resume">
                VIEW RESUME
              </a>
              <a className="textlink" href="#contact">
                LET'S CONNECT ↗
              </a>
            </div>
          </div>

          <div className="viz" id="viz" ref={vizRef}>
            <div className="viz-inner" id="vizin" ref={vizInnerRef}>
              <svg
                viewBox="0 0 560 560"
                role="group"
                aria-label="Illustrative cloud infrastructure diagram. Hover or focus a node to read what it does."
                id="cloudsvg"
              >
                <defs>
                  <radialGradient id="cg" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.55" />
                    <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <circle cx={cx} cy={cy} r="250" fill="url(#cg)" />

                {/* Spinning Rings */}
                <g className="spin">
                  <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(56,189,248,.28)" strokeDasharray="3 7" />
                  <circle cx={cx} cy={cy} r="120" fill="none" stroke="rgba(139,92,246,.25)" strokeDasharray="2 9" />
                </g>

                {/* Radial Lines */}
                <g>
                  {nodePositions.map((pos, i) => {
                    const isHovered = activeTooltip?.activeIdx === i;
                    const nextPos = nodePositions[(i + 1) % 8];
                    return (
                      <g key={i}>
                        <line
                          x1={cx}
                          y1={cy}
                          x2={pos.x}
                          y2={pos.y}
                          stroke={isHovered ? '#38BDF8' : 'rgba(56,189,248,.35)'}
                          strokeWidth={isHovered ? 2.4 : 1.2}
                          className="hl-line"
                        />
                        <line
                          x1={pos.x}
                          y1={pos.y}
                          x2={nextPos.x}
                          y2={nextPos.y}
                          stroke="rgba(139,92,246,.2)"
                          strokeWidth="1"
                        />
                      </g>
                    );
                  })}
                </g>

                {/* Animated Packets */}
                {nodePositions.map((pos, i) => (
                  <circle key={`pkt-${i}`} r="3" fill={cols[i % 4]} color={cols[i % 4]} className="pkt">
                    <animateMotion
                      dur={`${3 + (i % 3)}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.4}s`}
                      path={`M${cx},${cy} L${pos.x},${pos.y}`}
                    />
                  </circle>
                ))}

                {/* Core Cloud Node */}
                <g className="corecloud">
                  <path
                    d="M215 300 a30 30 0 0 1 8-58 a42 42 0 0 1 80-8 a34 34 0 0 1 42 40 a26 26 0 0 1 -4 26 z"
                    fill="rgba(16,27,50,.92)"
                    stroke="#38BDF8"
                    strokeWidth="1.6"
                    style={{ filter: 'drop-shadow(0 0 14px rgba(56,189,248,.7))' }}
                  />
                  <text
                    x={cx}
                    y={cy - 2}
                    textAnchor="middle"
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="10.5"
                    fontWeight="700"
                    fill="#F8FAFC"
                    letterSpacing=".08em"
                  >
                    CLOUD
                  </text>
                  <text
                    x={cx}
                    y={cy + 13}
                    textAnchor="middle"
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="8.5"
                    fill="#A7B4CC"
                    letterSpacing=".06em"
                  >
                    INFRASTRUCTURE
                  </text>
                </g>

                {/* Outer Service Nodes */}
                {cloudNodes.map((n, i) => {
                  const p = nodePositions[i];
                  return (
                    <g
                      key={n.short}
                      transform={`translate(${p.x} ${p.y})`}
                      tabIndex={0}
                      role="img"
                      aria-label={`${n.title}: ${n.desc}`}
                      className="node-g"
                      onMouseEnter={(e) => handleNodeInteraction(n, i, e)}
                      onMouseLeave={handleNodeLeave}
                      onFocus={(e) => handleNodeInteraction(n, i, e)}
                      onBlur={handleNodeLeave}
                      onClick={(e) => handleNodeInteraction(n, i, e)}
                    >
                      <g className="float" style={{ animationDelay: `${-i * 0.9}s` }}>
                        <rect x="-30" y="-30" width="60" height="60" rx="15" className="nb" />
                        <rect x="-30" y="-30" width="60" height="3" rx="1.5" fill={n.color} opacity="0.9" />
                        <text y="5" style={{ fill: n.color }}>
                          {n.short}
                        </text>
                        <text y="48" className="lb">
                          {n.title.toUpperCase()}
                        </text>
                        <circle cx="22" cy="-22" r="3.2" fill="#34D399" />
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Floating Tooltip */}
            <div
              className={`tip ${activeTooltip ? 'on' : ''}`}
              id="tip"
              role="status"
              style={{
                left: activeTooltip ? `${activeTooltip.left}px` : undefined,
                top: activeTooltip ? `${activeTooltip.top}px` : undefined,
              }}
            >
              {activeTooltip && (
                <>
                  <b>{activeTooltip.title}</b>
                  <br />
                  {activeTooltip.desc}
                </>
              )}
            </div>

            <div className="vnote mono">ILLUSTRATIVE ARCHITECTURE CONCEPT</div>
          </div>
        </div>

        <div className="strip mono">
          <span>
            <i className="dot" />
            FOCUSED ON CLOUD ENGINEERING
          </span>
          <span>BUILDING • LEARNING • DEPLOYING</span>
          <span className="scroll">
            <i />
            SCROLL
          </span>
        </div>
      </div>
    </section>
  );
};
