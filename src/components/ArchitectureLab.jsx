import React, { useState, useEffect, useRef } from 'react';
import {
  architectureNodes,
  architectureEdges,
  architecturePackets,
  traceSteps,
  stepNarration,
} from '../data/architectureData';

export const ArchitectureLab = () => {
  const [mode, setMode] = useState('full'); // 'simple' or 'full'
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [isTracing, setIsTracing] = useState(false);
  const [traceStepIdx, setTraceStepIdx] = useState(-1);
  const [traceActiveNodeId, setTraceActiveNodeId] = useState(null);
  const [traceActiveEdge, setTraceActiveEdge] = useState(null);

  const traceTimerRef = useRef(null);

  const byId = {};
  architectureNodes.forEach((n) => {
    byId[n.id] = n;
  });

  const stopTrace = () => {
    setIsTracing(false);
    setTraceStepIdx(-1);
    setTraceActiveNodeId(null);
    setTraceActiveEdge(null);
    if (traceTimerRef.current) clearTimeout(traceTimerRef.current);
  };

  const handleModeChange = (newMode) => {
    stopTrace();
    setMode(newMode);
    if (selectedNodeId) {
      const node = byId[selectedNodeId];
      if (node?.mode === 'full' && newMode === 'simple') {
        setSelectedNodeId(null);
      }
    }
  };

  const handleNodeClick = (nodeId) => {
    stopTrace();
    setSelectedNodeId((prev) => (prev === nodeId ? null : nodeId));
  };

  const handleTraceToggle = () => {
    if (isTracing) {
      stopTrace();
      return;
    }

    setSelectedNodeId(null);
    setIsTracing(true);
    const steps = traceSteps[mode];
    let step = 0;

    const runStep = () => {
      if (step >= steps.length) {
        traceTimerRef.current = setTimeout(() => {
          step = 0;
          runStep();
        }, 1800);
        return;
      }

      const current = steps[step];
      setTraceStepIdx(step);
      setTraceActiveEdge(`${current.from}-${current.to}`);
      setTraceActiveNodeId(current.to);

      step++;
      traceTimerRef.current = setTimeout(runStep, 1300);
    };

    setTraceStepIdx(0);
    setTraceActiveNodeId('user');
    setTraceActiveEdge(null);
    traceTimerRef.current = setTimeout(runStep, 1000);
  };

  useEffect(() => {
    return () => {
      if (traceTimerRef.current) clearTimeout(traceTimerRef.current);
    };
  }, []);

  // Compute insight panel content
  let insightTitle = 'Overview';
  let insightText =
    "A visitor's request travels from the internet through a gateway into a public subnet, where an application server handles it and reads from a database kept in a private subnet. Select a service to learn more.";
  let insightWhy = 'Splitting public and private subnets keeps the database unreachable directly from the internet.';

  if (isTracing && traceActiveNodeId) {
    const node = byId[traceActiveNodeId];
    insightTitle = `Step ${traceStepIdx + 1} · ${node.label}`;
    insightText = stepNarration[traceActiveNodeId] || node.what;
    insightWhy = node.why;
  } else {
    const activeId = hoveredNodeId || selectedNodeId;
    if (activeId && byId[activeId]) {
      const node = byId[activeId];
      insightTitle = `${node.label} · ${node.tag}`;
      insightText = node.what;
      insightWhy = node.why;
    }
  }

  return (
    <section id="architecture">
      <div className="wrap">
        <div className="head rv">
          <div className="eyebrow mono">CLOUD ARCHITECTURE LAB</div>
          <h2>Inside the Cloud Architecture Lab.</h2>
          <p className="sub">
            A conceptual web application deployment. Select any service to see what it does and why it sits where it does.
          </p>
        </div>

        <div className="lab">
          <div className="panel canvas">
            <div className="ctrl">
              <div className="seg" role="group" aria-label="Architecture detail level">
                <button
                  type="button"
                  aria-pressed={mode === 'simple'}
                  onClick={() => handleModeChange('simple')}
                >
                  SIMPLE
                </button>
                <button
                  type="button"
                  aria-pressed={mode === 'full'}
                  onClick={() => handleModeChange('full')}
                >
                  EXPANDED
                </button>
              </div>

              <button
                type="button"
                className="btn sm"
                aria-pressed={isTracing}
                onClick={handleTraceToggle}
              >
                {isTracing ? '■ STOP TRACE' : '▶ TRACE REQUEST'}
              </button>
            </div>

            <div className="arch">
              <svg
                id="archsvg"
                viewBox="0 0 1000 600"
                data-mode={mode}
                role="group"
                aria-label="Conceptual AWS web application architecture"
              >
                <defs>
                  <marker
                    id="ah"
                    viewBox="0 0 10 Hub 10"
                    refX="9"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                  >
                    <path d="M0 0 L10 5 L0 10z" fill="#38BDF8" />
                  </marker>
                </defs>

                {/* VPC Security Boundary */}
                <g>
                  <rect
                    x="300"
                    y="60"
                    width="680"
                    height="430"
                    rx="22"
                    className="zone vpcglow"
                    stroke="#38BDF8"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(56,189,248,.5))' }}
                  />
                  <text x="322" y="84" className="zl">
                    VPC · SECURITY BOUNDARY
                  </text>
                </g>

                {/* Subnets (shown in Expanded mode) */}
                {mode === 'full' && (
                  <g>
                    {/* Public Subnet */}
                    <rect
                      x="350"
                      y="100"
                      width="300"
                      height="370"
                      rx="14"
                      className="zone"
                      stroke="#FF9900"
                      fill="rgba(255,153,0,.04)"
                    />
                    <text x="366" y="122" className="zl">
                      PUBLIC SUBNET
                    </text>

                    {/* Private Subnet */}
                    <rect
                      x="690"
                      y="100"
                      width="270"
                      height="370"
                      rx="14"
                      className="zone"
                      stroke="#34D399"
                      fill="rgba(52,211,153,.04)"
                    />
                    <text x="706" y="122" className="zl">
                      PRIVATE SUBNET
                    </text>
                  </g>
                )}

                {/* Architecture Edges */}
                <g>
                  {architectureEdges.map((e, idx) => {
                    if (e.mode === 'full' && mode !== 'full') return null;
                    if (e.mode === 'simple' && mode !== 'simple') return null;

                    const a = byId[e.from];
                    const b = byId[e.to];
                    const edgeKey = `${e.from}-${e.to}`;
                    const isHot = traceActiveEdge === edgeKey;

                    return (
                      <line
                        key={idx}
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        className={`edge ${e.dash ? 'dash' : ''} ${isHot ? 'hot' : ''}`}
                        markerEnd={e.dash ? '' : 'url(#ah)'}
                      />
                    );
                  })}
                </g>

                {/* Packet Animations */}
                {architecturePackets.map((pkt, idx) => {
                  if (pkt.mode === 'full' && mode !== 'full') return null;
                  if (pkt.mode === 'simple' && mode !== 'simple') return null;

                  const a = byId[pkt.from];
                  const b = byId[pkt.to];

                  return (
                    <circle key={idx} r="3.4" fill="#38BDF8" color="#38BDF8" className="pkt">
                      <animateMotion
                        dur={`${pkt.dur}s`}
                        repeatCount="indefinite"
                        begin={`${idx * 0.3}s`}
                        path={`M${a.x},${a.y} L${b.x},${b.y}`}
                      />
                    </circle>
                  );
                })}

                {/* Service Nodes */}
                {architectureNodes.map((n) => {
                  if (n.mode === 'full' && mode !== 'full') return null;

                  const isSelected = selectedNodeId === n.id;
                  const isTraceActive = traceActiveNodeId === n.id;

                  return (
                    <g
                      key={n.id}
                      transform={`translate(${n.x} ${n.y})`}
                      tabIndex={0}
                      role="button"
                      aria-label={`${n.tag}, ${n.label}. ${n.what}`}
                      className={`an ${isSelected ? 'sel' : ''} ${isTraceActive ? 'trace' : ''}`}
                      style={{ '--c': n.color }}
                      onClick={() => handleNodeClick(n.id)}
                      onMouseEnter={() => !isTracing && setHoveredNodeId(n.id)}
                      onMouseLeave={() => !isTracing && setHoveredNodeId(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleNodeClick(n.id);
                        }
                      }}
                    >
                      <rect
                        x={-n.w / 2}
                        y={-n.h / 2}
                        width={n.w}
                        height={n.h}
                        rx="12"
                        className="b"
                        stroke={n.color}
                      />
                      <text y="-2" className="t">
                        {n.tag}
                      </text>
                      <text y="15" className="l">
                        {n.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="notice mono">CONCEPTUAL ARCHITECTURE — NOT A LIVE AWS ENVIRONMENT</div>
          </div>

          {/* Sticky Architecture Insights Panel */}
          <aside className="panel insight" aria-live="polite">
            <h4>ARCHITECTURE INSIGHT</h4>
            <h3 id="in-t">{insightTitle}</h3>
            <p id="in-p">{insightText}</p>
            <div className="why">
              <b>WHY IT BELONGS HERE</b>
              <p id="in-w">{insightWhy}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
