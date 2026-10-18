import React, { useEffect, useRef } from 'react';

export const BackgroundEffects = () => {
  const canvasRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let W = window.innerWidth;
    let H = window.innerHeight;
    let small = W < 700;
    let pts = [];
    let pulses = [];
    let trail = [];
    let px = -999;
    let py = -999;
    let gx = W / 2;
    let gy = H / 3;
    let mx = gx;
    let my = gy;
    let animId;

    const size = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      size();
      const n = small ? 34 : Math.min(90, Math.floor((W * H) / 18000));
      pts = [];
      for (let i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          z: 0.3 + Math.random() * 0.7,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() < 0.12,
        });
      }
    };

    init();

    const handleResize = () => {
      small = window.innerWidth < 700;
      init();
      if (reduce) draw(0);
    };

    const handlePointerMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      px = mx;
      py = my;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const D = small ? 110 : 140;

    const draw = (move) => {
      ctx.clearRect(0, 0, W, H);
      const sy = window.scrollY * 0.05;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (move) {
          p.x += p.vx * p.z;
          p.y += p.vy * p.z;
          if (p.x < -10) p.x = W + 10;
          if (p.x > W + 10) p.x = -10;
          if (p.y < -10) p.y = H + 10;
          if (p.y > H + 10) p.y = -10;

          const dx = p.x - px;
          const dy = p.y - py;
          const d = dx * dx + dy * dy;
          if (d < 14000) {
            const f = (1 - d / 14000) * 0.6;
            p.x += dx * f * 0.02;
            p.y += dy * f * 0.02;
          }
        }

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const ax = p.x - q.x;
          const ay = p.y - q.y;
          const dd = ax * ax + ay * ay;
          if (dd < D * D) {
            const a = (1 - Math.sqrt(dd) / D) * 0.28 * Math.min(p.z, q.z);
            ctx.strokeStyle = `rgba(56,189,248,${a.toFixed(3)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y - sy * p.z);
            ctx.lineTo(q.x, q.y - sy * q.z);
            ctx.stroke();
          }
        }

        const near = Math.hypot(p.x - px, p.y - py) < 130;
        ctx.fillStyle = near
          ? 'rgba(248,250,252,0.95)'
          : p.r
          ? `rgba(139,92,246,${0.5 * p.z})`
          : `rgba(167,200,255,${0.55 * p.z})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y - sy * p.z, (near ? 2.2 : 1.1) * p.z + 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!move) return;

      if (pulses.length < 4 && Math.random() < 0.02) {
        const a = pts[Math.floor(Math.random() * pts.length)];
        let best = null;
        let bd = 1e9;
        pts.forEach((q) => {
          if (q !== a) {
            const d = Math.hypot(a.x - q.x, a.y - q.y);
            if (d < D && d < bd) {
              bd = d;
              best = q;
            }
          }
        });
        if (best) pulses.push({ a, b: best, t: 0 });
      }

      pulses = pulses.filter((u) => {
        u.t += 0.025;
        if (u.t >= 1) return false;
        const x = u.a.x + (u.b.x - u.a.x) * u.t;
        const y = u.a.y + (u.b.y - u.a.y) * u.t - sy * u.a.z;
        ctx.fillStyle = 'rgba(56,189,248,0.95)';
        ctx.shadowColor = '#38BDF8';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        return true;
      });

      if (fine && px > -900) {
        trail.push({ x: px, y: py, l: 1 });
        trail = trail.filter((t) => {
          t.l -= 0.06;
          if (t.l <= 0) return false;
          ctx.fillStyle = `rgba(139,92,246,${(t.l * 0.35).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(t.x, t.y, 3 * t.l, 0, Math.PI * 2);
          ctx.fill();
          return true;
        });
        if (trail.length > 14) trail.shift();
      }
    };

    if (reduce) {
      draw(0);
      return;
    }

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) loop();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const loop = () => {
      if (!isVisible) return;
      draw(1);

      if (glowRef.current) {
        gx += (mx - gx) * 0.06;
        gy += (my - gy) * 0.06;
        glowRef.current.style.transform = `translate(${gx}px,${gy}px)`;
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <>
      <div className="gridbg" aria-hidden="true" />
      <div className="glow" ref={glowRef} aria-hidden="true" />
      <canvas id="bg-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="syslabels" aria-hidden="true">
        <span>REGION: AP-SOUTH-1</span>
        <span>
          NETWORK: <b>ACTIVE</b>
        </span>
        <span>
          SYSTEM: <b>ONLINE</b>
        </span>
      </div>
    </>
  );
};
