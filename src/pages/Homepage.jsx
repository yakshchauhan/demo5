import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Homepage.css';

// ── Canvas hero animation ──────────────────────────────────────────────────
function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, t = 0, rafId;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function drawBase() {
      const g = ctx.createRadialGradient(W * 0.75, H * 0.3, 0, W * 0.6, H * 0.5, W * 0.9);
      g.addColorStop(0, '#2a0a50');
      g.addColorStop(0.3, '#1a0a2e');
      g.addColorStop(0.7, '#0d0718');
      g.addColorStop(1, '#050508');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    function ribbon({ ox, oy, cx1, cy1, cx2, cy2, ex, ey, color, width, alpha }) {
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.bezierCurveTo(cx1, cy1, cx2, cy2, ex, ey);
      ctx.lineWidth = width;
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      drawBase();
      t += 0.004;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      const configs = [
        { ox: W * (0.72 + 0.04 * Math.sin(t * 0.8)), oy: -H * 0.05, cx1: W * 0.88 + 40 * Math.cos(t), cy1: H * 0.25, cx2: W * 0.65 + 30 * Math.sin(t * 1.2), cy2: H * 0.65, ex: W * 1.05, ey: H * 1.05, color: 'rgba(120,40,220,0.7)', width: 220 + 40 * Math.sin(t), alpha: 0.32 },
        { ox: W * (0.78 + 0.03 * Math.cos(t)), oy: -H * 0.08, cx1: W * 0.9 + 20 * Math.sin(t * 1.3), cy1: H * 0.2, cx2: W * 0.7 + 25 * Math.cos(t), cy2: H * 0.6, ex: W * 1.08, ey: H * 1.1, color: 'rgba(168,85,247,0.6)', width: 120 + 30 * Math.cos(t * 0.9), alpha: 0.38 },
        { ox: W * (0.8 + 0.05 * Math.sin(t * 1.1)), oy: -H * 0.02, cx1: W * 0.85 + 15 * Math.cos(t * 0.7), cy1: H * 0.3, cx2: W * 0.62 + 20 * Math.sin(t), cy2: H * 0.72, ex: W * 1.02, ey: H * 1.08, color: 'rgba(236,72,153,0.5)', width: 60 + 20 * Math.sin(t * 1.1), alpha: 0.28 },
        { ox: W * (0.74 + 0.03 * Math.cos(t * 0.6)), oy: -H * 0.03, cx1: W * 0.91 + 10 * Math.sin(t * 1.5), cy1: H * 0.22, cx2: W * 0.68 + 12 * Math.cos(t * 1.1), cy2: H * 0.68, ex: W * 1.03, ey: H * 1.05, color: 'rgba(200,140,255,0.9)', width: 8 + 4 * Math.sin(t * 2), alpha: 0.5 },
      ];
      configs.forEach(c => ribbon(c));

      const spots = [
        { x: W * 0.8 + 30 * Math.sin(t), y: H * 0.28 + 20 * Math.cos(t * 0.7), r: 200, c1: 'rgba(124,58,237,0.2)', c2: 'transparent' },
        { x: W * 0.9 + 20 * Math.cos(t * 0.8), y: H * 0.55 + 15 * Math.sin(t), r: 250, c1: 'rgba(168,85,247,0.12)', c2: 'transparent' },
      ];
      spots.forEach(s => {
        const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r);
        grd.addColorStop(0, s.c1);
        grd.addColorStop(1, s.c2);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      const rightFade = ctx.createLinearGradient(W * 0.4, 0, W, 0);
      rightFade.addColorStop(0, 'rgba(5,5,8,0.6)');
      rightFade.addColorStop(0.5, 'rgba(5,5,8,0.2)');
      rightFade.addColorStop(1, 'transparent');
      ctx.fillStyle = rightFade;
      ctx.fillRect(0, 0, W, H);

      const leftFade = ctx.createLinearGradient(0, 0, W * 0.55, 0);
      leftFade.addColorStop(0, 'rgba(5,5,8,0.95)');
      leftFade.addColorStop(0.7, 'rgba(5,5,8,0.5)');
      leftFade.addColorStop(1, 'transparent');
      ctx.fillStyle = leftFade;
      ctx.fillRect(0, 0, W, H);

      const vig = ctx.createRadialGradient(W * 0.5, H * 0.5, H * 0.2, W * 0.5, H * 0.5, H * 0.85);
      vig.addColorStop(0, 'transparent');
      vig.addColorStop(1, 'rgba(5,5,8,0.6)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="hero-canvas" />;
}

// ── Scroll reveal hook ─────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.homepage-root .reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Component ──────────────────────────────────────────────────────────────
export default function Homepage() {
  useReveal();
  const navigate = useNavigate();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="homepage-root">
      <Navbar />

      {/* ── HERO ── */}
      <section id="herosection">
        <HeroCanvas />
        <div className="hero-content">
          <div className="hero-tag">Brand · Creator Partnership Agency</div>
          <h1 className="hero-title">
            Where brands and<br />creators craft <em>meaningful</em> collaborations.
          </h1>
          <p className="hero-sub">
           <b> A legacy of connection </b><br />We unite the finest brands with visionary creators.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/apply')}>
              Apply to Work With Us
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </button>
            <button className="btn-ghost" onClick={() => scrollTo('the-problems')}>
              See how it works
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 2v10M2 7l5 5 5-5" /></svg>
            </button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-num">Full</div>
            <div className="stat-label">Execution managed</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">Zero</div>
            <div className="stat-label">Random placements</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">ROI</div>
            <div className="stat-label">Cost effective</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">Clear</div>
            <div className="stat-label">Reporting every time</div>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section id="the-problems">
        <div className="section-inner">
          <div className="problem-grid">
            <div className="problem-left reveal">
              <div className="section-eyebrow">The Problem</div>
              <h2 className="problem-title">Why most influencer campaigns fail.</h2>
              <p className="problem-intro">The influencer space is full of noise — random partnerships, inflated metrics, and campaigns that look active but don't drive results. Most brands have been here before.</p>
            </div>
            <div className="problem-right">
              {[
                { icon: <><circle cx="8" cy="6" r="3" /><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" /></>, strong: 'Poor creator selection', desc: 'Choosing creators by follower count alone — ignoring audience quality, niche fit, and content style.' },
                { icon: <path d="M2 8h3l2-5 4 10 2-5h3" />, strong: 'Misaligned audiences', desc: 'Content reaches the wrong people. High impressions, low impact. The audience doesn\'t convert.' },
                { icon: <><rect x="2" y="4" width="12" height="9" rx="1" /><path d="M5 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" /></>, strong: 'Lack of structured execution', desc: 'No clear brief, no defined deliverables, no timeline. The campaign drifts and underdelivers.' },
                { icon: <path d="M2 12l4-4 3 3 5-6" />, strong: 'No measurable outcomes', desc: 'Campaigns close with vanity metrics and no actionable data. Nothing to optimize from.' },
              ].map((item, i) => (
                <div key={i} className={`problem-item reveal reveal-delay-${i + 1}`}>
                  <div className="problem-icon">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">{item.icon}</svg>
                  </div>
                  <div className="problem-text">
                    <strong>{item.strong}</strong>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section id="approach">
        <div className="section-inner">
          <div className="approach-inner" style={{ position: 'relative' }}>
            <div className="approach-bg" />
            <div className="approach-eyebrow reveal">Our Approach</div>
            <div className="approach-content reveal">
              <h2 className="approach-title">A more structured way to <em>collaborate.</em></h2>
              <p className="approach-body">
                We focus on <strong>alignment over reach</strong> — matching brands with creators based on audience, content style, and campaign objectives.<br /><br />
                Every collaboration is intentional. Every partnership is built to perform. The best results, with a polished touch.
              </p>
            </div>
            <div className="approach-pillars">
              {[
                'Alignment-first matching',
                'Clear frameworks & timelines',
                'Transparent reporting',
              ].map((text, i) => (
                <div key={i} className={`pillar reveal reveal-delay-${i + 1}`} style={{ background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(168,85,247,0.2)' }}>
                  <div className="pillar-label">Our way</div>
                  <div className="pillar-text">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE HANDLE ── */}
      <section id="handles">
        <div className="section-inner">
          <div className="handles-header reveal">
            <div className="section-eyebrow">What We Handle</div>
            <h2 className="handles-title">Everything from discovery<br />to delivery.</h2>
          </div>
          <div className="handles-grid">
            {[
              { num: '01 / 03', icon: <><circle cx="8" cy="8" r="5" /><path d="M12 12l4 4M8 5v6M5 8h6" /></>, title: 'Creator Discovery & Matching', desc: 'We identify and vet creators based on audience alignment, content quality, and campaign fit — not just follower count. You get partners that actually make sense for your brand.' },
              { num: '02 / 03', icon: <><rect x="3" y="3" width="14" height="14" rx="2" /><path d="M7 7h6M7 10h6M7 13h4" /></>, title: 'Campaign Structuring', desc: 'Every collaboration is built on a clear framework — defined objectives, deliverables, timelines, and success metrics. Both sides know exactly what\'s expected before anything begins.' },
              { num: '03 / 03', icon: <path d="M4 10h12M10 4l6 6-6 6" />, title: 'Execution & Coordination', desc: 'We manage the full collaboration cycle from briefing through final delivery. Seamless coordination so your team can stay focused on what matters most.' },
            ].map((card, i) => (
              <div key={i} className={`handle-card reveal reveal-delay-${i + 1}`}>
                <div className="handle-num">{card.num}</div>
                <div className="handle-icon">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">{card.icon}</svg>
                </div>
                <h3 className="handle-title">{card.title}</h3>
                <p className="handle-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUTCOMES ── */}
      <section id="outcomes">
        <div className="section-inner">
          <div className="outcomes-grid">
            <div className="outcomes-left reveal">
              <div className="section-eyebrow">Outcomes</div>
              <h2 className="outcomes-title">What this<br />leads <em>to.</em></h2>
              <p className="outcomes-sub">When the process is structured, the results follow. Here's what brands working with Nexus consistently see.</p>
            </div>
            <div className="outcomes-right reveal reveal-delay-2">
              {[
                { strong: 'Better audience targeting', desc: 'Content reaching people who are genuinely likely to care about your product.', idx: '01' },
                { strong: 'Higher engagement', desc: 'Authentic creator partnerships drive stronger interaction than conventional ads.', idx: '02' },
                { strong: 'Consistent campaign execution', desc: 'Structured delivery means every campaign runs on time, on brief, every time.', idx: '03' },
                { strong: 'Measurable performance', desc: "Clear reporting on what worked, what didn't, and what to do better next time.", idx: '04' },
              ].map((row, i) => (
                <div key={i} className="outcome-row">
                  <div className="outcome-check">
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 6l3 3 5-5" /></svg>
                  </div>
                  <div className="outcome-text">
                    <strong>{row.strong}</strong>
                    <p>{row.desc}</p>
                  </div>
                  <div className="outcome-idx">{row.idx}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section id="final-cta">
        <div className="cta-glow" />
        <p className="cta-eyebrow reveal">↗ Work With Nexus</p>
        <p className="cta-line reveal">
          Looking for meaningful<br /><em>creator partnerships?</em>
        </p>
        <div className="cta-actions reveal">
          <button className="btn-primary" onClick={() => navigate('/apply')}>
            Apply to Work With Us
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
          </button>
          <span className="cta-note">For brands and creators — no commitment required</span>
        </div>
      </section>

      <Footer />
    </div>
  );
}
