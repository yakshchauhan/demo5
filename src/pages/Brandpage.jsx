import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Brandpage.css';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.brands-root .reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Brandpage() {
  useReveal();
  const navigate = useNavigate();

  const problems = [
    { num: '01', strong: 'Poor creator selection', rest: ' — mismatched niche, tone, and audience.' },
    { num: '02', strong: 'No audience alignment', rest: ' — reach without relevance converts nothing.' },
    { num: '03', strong: 'Unstructured execution', rest: ' — no brief, no timeline, no accountability.' },
    { num: '04', strong: 'No measurable outcomes', rest: ' — campaigns end with no data to act on.' },
  ];

  const handles = [
    { icon: '◎', title: 'Creator Discovery & Matching', desc: 'We identify creators whose audience, content style, and engagement profile genuinely align with your campaign — not just follower count.' },
    { icon: '⊟', title: 'Campaign Structuring', desc: 'Every collaboration is built around a clear brief, defined deliverables, and agreed timelines before any content goes live.' },
    { icon: '⊕', title: 'Execution & Coordination', desc: 'We manage the full collaboration loop — communication, revisions, approvals, and delivery — so your team stays focused on strategy.' },
  ];

  const outcomes = [
    { icon: '◈', title: 'Better Audience Targeting', desc: 'Creators matched to your actual buyer profile.' },
    { icon: '◉', title: 'Higher Engagement', desc: "Relevant audiences respond. Generic reach doesn't." },
    { icon: '⊞', title: 'Consistent Execution', desc: 'Structured campaigns deliver on schedule.' },
    { icon: '◐', title: 'Measurable Performance', desc: 'Every campaign tracked against defined KPIs.' },
  ];

  const process = ['Brief & Goals', 'Creator Match', 'Campaign Build', 'Review & Approve', 'Live & Track'];

  return (
    <div className="brands-root">
      <Navbar />
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />
      <div className="noise" />

      <div className="page">

        {/* Hero */}
        <section className="hero">
          <div className="hero-eyebrow reveal">For Brands</div>
          <h1 className="hero-title reveal reveal-delay-1">
            Built for brands<br />that expect <em>results.</em>
          </h1>
          <p className="hero-sub reveal reveal-delay-2">
            We connect brands with creators through structured,<br />performance-driven collaborations.
          </p>
          <button className="hero-cta reveal reveal-delay-3" onClick={() => navigate('/apply')}>
            Apply to Work With Us
            <span className="hero-cta-arrow">→</span>
          </button>
          <div className="hero-metrics reveal reveal-delay-4">
            <div className="metric-item"><div className="metric-num">100%</div><div className="metric-label">Manual Review</div></div>
            <div className="metric-item"><div className="metric-num">48h</div><div className="metric-label">Response Time</div></div>
            <div className="metric-item"><div className="metric-num">Curated</div><div className="metric-label">Creator Network</div></div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Problem */}
        <section>
          <div className="section-label reveal">The Problem</div>
          <h2 className="section-title reveal reveal-delay-1">Why most influencer<br />campaigns <em>fail</em></h2>
          <div className="problem-grid reveal reveal-delay-2">
            {problems.map(p => (
              <div className="problem-item" key={p.num}>
                <div className="problem-num">{p.num}</div>
                <div className="problem-text"><strong>{p.strong}</strong>{p.rest}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* Approach */}
        <section>
          <div className="section-label reveal">Our Approach</div>
          <h2 className="section-title reveal reveal-delay-1">A more structured<br />way to collaborate</h2>
          <div className="approach-wrap reveal reveal-delay-2">
            <p className="approach-quote">
              We focus on <strong>alignment over reach</strong> — matching brands with creators based on audience demographics, content style, and campaign objectives. Every partnership is deliberate, not opportunistic.
            </p>
            <div className="approach-accent">Structure over volume</div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Process */}
        <div className="process-strip">
          <div className="section-label reveal">How It Works</div>
          <div className="process-line reveal reveal-delay-1">
            {process.map((s, i) => (
              <div className="process-step" key={s}>
                <div className="p-dot">{String(i + 1).padStart(2, '0')}</div>
                <div className="p-label">{s}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-divider" />

        {/* What We Handle */}
        <section>
          <div className="section-label reveal">What We Handle</div>
          <h2 className="section-title reveal reveal-delay-1">End-to-end,<br />so you don't have to</h2>
          <div className="handle-blocks">
            {handles.map((h, i) => (
              <div className={`handle-block reveal reveal-delay-${i + 1}`} key={h.title}>
                <div className="handle-icon">{h.icon}</div>
                <div>
                  <div className="handle-title">{h.title}</div>
                  <div className="handle-desc">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* Outcomes */}
        <section>
          <div className="section-label reveal">Outcomes</div>
          <h2 className="section-title reveal reveal-delay-1">What this<br />leads to</h2>
          <div className="outcomes-grid">
            {outcomes.map((o, i) => (
              <div className={`outcome-card reveal reveal-delay-${(i % 3) + 1}`} key={o.title}>
                <span className="outcome-icon">{o.icon}</span>
                <div className="outcome-title">{o.title}</div>
                <div className="outcome-desc">{o.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* Final CTA */}
        <div className="final-cta-section" id="brands-apply">
          <div className="cta-overline reveal">Limited Partners Only</div>
          <h2 className="cta-headline reveal reveal-delay-1">
            Looking for<br /><em>meaningful</em> creator<br />partnerships?
          </h2>
          <p className="cta-sub reveal reveal-delay-2">
            Applications are reviewed manually. We only work with brands where a genuine fit exists.
          </p>
          <button className="cta-main-btn reveal reveal-delay-3" onClick={() => navigate('/apply')}>
            Apply to Work With Us →
          </button>
          <p className="cta-note reveal reveal-delay-4">Reviewed within 24–48 hours · No spam</p>
        </div>

        <Footer />
      </div>

      {/* Sticky mobile CTA */}
      <div className="sticky-bar">
        <div className="sticky-bar-inner">
          <button className="sticky-btn" onClick={() => navigate('/apply')}>
            Apply to Work With Us →
          </button>
        </div>
      </div>
    </div>
  );
}
