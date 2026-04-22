import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Creatorspage.css';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.creators-root .r');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Creatorspage() {
  useReveal();
  const navigate = useNavigate();

  const gets = [
    { title: 'Access to serious brand partnerships', desc: 'We work exclusively with brands that have real campaign goals and dedicated budgets — not test-and-see experiments.' },
    { title: 'Fair and structured deals', desc: 'Every collaboration has clear deliverables, agreed timelines, and transparent compensation before anything is signed.' },
    { title: 'Long-term collaboration opportunities', desc: 'We prioritise ongoing partnerships over one-off posts. Brands here are looking for creators they can build with.' },
    { title: 'Campaign clarity and support', desc: "You'll always have a clear brief, point of contact, and revision process. No chasing. No ambiguity." },
  ];

  const looks = [
    { icon: '◈', title: 'Consistent Content', desc: 'Regular posting with a coherent voice and aesthetic.' },
    { icon: '◉', title: 'Clear Niche or Audience', desc: 'We match on specificity — a defined audience converts better.' },
    { icon: '⊡', title: 'Authentic Engagement', desc: 'Genuine interactions matter more than raw follower count.' },
    { icon: '⊞', title: 'Professional Approach', desc: 'Responsive, reliable, and collaborative to work with.' },
  ];

  const steps = [
    { title: 'Apply to join', desc: "Complete a short application. Tell us about your content, audience, and what kinds of partnerships you're looking for.", active: true },
    { title: 'We review your profile', desc: 'Our team reviews every application manually. We look for fit, consistency, and alignment with our brand network.', active: true },
    { title: 'Get matched with relevant brands', desc: "If there's a genuine match, we'll introduce you to brands that align with your niche and audience.", active: false },
    { title: 'Structured collaboration', desc: 'Everything is managed — brief, timeline, deliverables, and payment. You focus on the content.', active: false },
  ];

  return (
    <div className="creators-root">
      <Navbar />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="noise" />

      <div className="page">

        {/* Hero */}
        <div className="hero">
          <div className="hero-line"><div className="hero-line-bar" /></div>
          <div className="hero-badge r"><div className="badge-dot" />For Creators</div>
          <h1 className="hero-h1 r d1">
            Work with brands that<br /><em>align with your</em><br />content.
          </h1>
          <p className="hero-sub r d2">
            We connect creators with high-quality brand partnerships built for long-term collaboration — not one-off posts.
          </p>
          <button className="hero-btn r d3" onClick={() => navigate('/apply')}>
            Apply to Work With Us <span className="btn-arrow">→</span>
          </button>
          <div className="trust-strip r d4">
            {[['◎', 'Curated network'], ['◐', 'Manual matching'], ['⊞', 'Structured deals']].map(([ic, tx]) => (
              <div className="trust-item" key={tx}>
                <div className="trust-icon">{ic}</div>
                <div className="trust-text">{tx}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hdiv"><div className="hdiv-inner" /></div>

        {/* What You Get */}
        <section className="sec">
          <div className="lbl r">What You Get</div>
          <h2 className="sec-title r d1">Everything you need<br />to collaborate <em>well</em></h2>
          <div className="get-list">
            {gets.map((g, i) => (
              <div className={`get-item r d${Math.min(i + 1, 4)}`} key={g.title}>
                <div className="get-num">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <div className="get-title">{g.title}</div>
                  <div className="get-desc">{g.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="hdiv"><div className="hdiv-inner" /></div>

        {/* What We Look For */}
        <section className="sec">
          <div className="lbl r">What We Look For</div>
          <h2 className="sec-title r d1">We're <em>selective</em><br />by design</h2>
          <div className="look-grid">
            {looks.map((l, i) => (
              <div className={`look-card r d${Math.min(i + 1, 4)}`} key={l.title}>
                <span className="look-icon">{l.icon}</span>
                <div className="look-title">{l.title}</div>
                <div className="look-desc">{l.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="hdiv"><div className="hdiv-inner" /></div>

        {/* Callout */}
        <div className="callout">
          <div className="callout-inner r">
            <div className="callout-quote">
              "This isn't a platform where anyone can sign up.<br />
              <em>We curate the network manually</em> — which is exactly why the brands here take it seriously."
            </div>
            <div className="callout-sub">
              Every creator in our network has been reviewed. Every brand has been vetted. That's the difference.
            </div>
          </div>
        </div>

        <div className="hdiv"><div className="hdiv-inner" /></div>

        {/* How It Works */}
        <section className="sec">
          <div className="lbl r">How It Works</div>
          <h2 className="sec-title r d1">Four steps.<br />No <em>noise</em>.</h2>
          <div className="steps-wrap r d2">
            <div className="steps-spine" />
            {steps.map((s, i) => (
              <div className="step-row" key={s.title}>
                <div className={`step-bullet ${s.active ? 'active' : 'muted'}`}>{String(i + 1).padStart(2, '0')}</div>
                <div className="step-body">
                  <div className="step-num-label">Step {i + 1}</div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="hdiv"><div className="hdiv-inner" /></div>

        {/* Final CTA */}
        <div className="final" id="creators-apply">
          <div className="final-overline r">Limited Spots Available</div>
          <h2 className="final-title r d1">
            Join a network built<br />for <em>elite</em> creators.
          </h2>
          <p className="final-sub r d2">
            Applications are reviewed manually. We only accept creators where a genuine brand match exists in our network.
          </p>
          <button className="final-btn r d3" onClick={() => navigate('/apply')}>
            Apply to Work With Us →
          </button>
          <p className="final-note r d4">Reviewed within 24–48 hours · No spam · No mass signup</p>
        </div>

        <Footer />
      </div>

      {/* Sticky mobile CTA */}
      <div className="sticky">
        <div className="sticky-inner">
          <button className="sticky-btn" onClick={() => navigate('/apply')}>
            Apply to Work With Us →
          </button>
        </div>
      </div>
    </div>
  );
}
