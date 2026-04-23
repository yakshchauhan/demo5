import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './Apply.css';

// ─── Constants ────────────────────────────────────────────────────────────────

const BRAND_STEPS = ['Company', 'Campaign', 'Budget', 'Review'];
const CREATOR_STEPS = ['Profile', 'Audience', 'Partnership', 'Review'];

const CAMPAIGN_GOALS = ['Brand Awareness', 'Product Launch', 'Lead Generation', 'Event Promotion', 'Community Building', 'Sales Conversion', 'Others'];
const LANGUAGES = ['Hindi', 'English', 'Hinglish', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Punjabi', 'Other'];
const FOLLOWER_RANGES = ['1K – 10K (Nano)', '10K – 50K (Micro)', '50K – 200K (Mid-tier)', '200K – 1M (Macro)', '1M+ (Mega)'];
const CONTENT_GENRES = ['Lifestyle', 'Tech', 'Fashion', 'Food', 'Finance', 'Travel', 'Fitness', 'Gaming', 'Education', 'Comedy', 'Beauty', 'Business', 'Other'];
const BRAND_CATEGORIES = ['Fashion & Apparel', 'Tech & Gadgets', 'Food & Beverage', 'Health & Wellness', 'Beauty & Skincare', 'Finance & Fintech', 'Gaming', 'Education', 'Travel', 'Home & Living', 'Other'];

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const InstagramSVG = ({ muted }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5.5" stroke={muted ? 'rgba(255,255,255,0.25)' : 'url(#ig-grad)'} strokeWidth="1.8"/>
    <circle cx="12" cy="12" r="4.2" stroke={muted ? 'rgba(255,255,255,0.25)' : 'url(#ig-grad)'} strokeWidth="1.8"/>
    <circle cx="17.3" cy="6.7" r="1" fill={muted ? 'rgba(255,255,255,0.25)' : '#e1306c'}/>
    <defs>
      <linearGradient id="ig-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f09433"/>
        <stop offset="25%" stopColor="#e6683c"/>
        <stop offset="50%" stopColor="#dc2743"/>
        <stop offset="75%" stopColor="#cc2366"/>
        <stop offset="100%" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
  </svg>
);

const YouTubeSVG = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="20" height="14" rx="4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8"/>
    <path d="M10 9.5l5 2.5-5 2.5V9.5z" fill="rgba(255,255,255,0.2)"/>
  </svg>
);

// ─── Shared Sub-components ────────────────────────────────────────────────────

function FadeWrap({ children, animKey }) {
  return (
    <div key={animKey} className="fade-enter" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {children}
    </div>
  );
}

function Field({ label, optional, children }) {
  return (
    <div className="field">
      <label>{label}{optional && <span className="optional-tag">optional</span>}</label>
      {children}
    </div>
  );
}

function TagSelect({ options, selected, onToggle }) {
  return (
    <div className="tag-row">
      {options.map(opt => (
        <div
          key={opt}
          className={`tag${selected.includes(opt) ? ' selected' : ''}`}
          onClick={() => onToggle(opt)}
        >{opt}</div>
      ))}
    </div>
  );
}

function RadioGroup({ options, value, onChange }) {
  return (
    <div className="radio-group">
      {options.map(opt => (
        <div key={opt} className={`radio-item${value === opt ? ' selected' : ''}`} onClick={() => onChange(opt)}>
          <div className="radio-dot"><div className="radio-dot-inner" /></div>
          <span className="radio-label">{opt}</span>
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ steps, current }) {
  return (
    <div className="progress-wrap">
      <div className="progress-steps">
        {steps.map((s, i) => {
          const state = i < current ? 'done' : i === current ? 'active' : '';
          return (
            <div key={s} className={`progress-step${state ? ' ' + state : ''}`}>
              <div className={`step-dot${state ? ' ' + state : ''}`}>
                {i < current ? '✓' : i + 1}
              </div>
              <div className={`step-name${state ? ' ' + state : ''}`}>{s}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Brand Steps ──────────────────────────────────────────────────────────────

function BrandStep1({ data, setData }) {
  return (
    <div className="field-group">
      <Field label="Your Name">
        <input value={data.name || ''} onChange={e => setData({ ...data, name: e.target.value })} placeholder="Aarav Sharma" />
      </Field>
      <Field label="Company Name">
        <input value={data.company || ''} onChange={e => setData({ ...data, company: e.target.value })} placeholder="Luminary Studio" />
      </Field>
      <Field label="Email">
        <input type="email" value={data.email || ''} onChange={e => setData({ ...data, email: e.target.value })} placeholder="hello@company.com" />
      </Field>
      <Field label="Phone" optional>
        <input type="tel" value={data.phone || ''} onChange={e => setData({ ...data, phone: e.target.value })} placeholder="+91 98765 43210" />
      </Field>
    </div>
  );
}

function BrandStep2({ data, setData }) {
  const toggleLang = (l) => {
    const arr = data.languages || [];
    setData({ ...data, languages: arr.includes(l) ? arr.filter(x => x !== l) : [...arr, l] });
  };
  return (
    <div className="field-group">
      <Field label="Promotion Language">
        <div style={{ marginTop: 4 }}>
          <TagSelect options={LANGUAGES} selected={data.languages || []} onToggle={toggleLang} />
        </div>
      </Field>
      <Field label="Campaign Goal">
        <div className="glass-select-wrap">
          <select
            className="glass-select"
            value={data.goal || ''}
            onChange={e => setData({ ...data, goal: e.target.value, goalOther: '' })}
          >
            <option value="" disabled>Select goal</option>
            {CAMPAIGN_GOALS.map(g => <option key={g}>{g}</option>)}
          </select>
          <span className="glass-select-arrow">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </span>
        </div>
        {data.goal === 'Others' && (
          <input
            style={{ marginTop: 10 }}
            value={data.goalOther || ''}
            onChange={e => setData({ ...data, goalOther: e.target.value })}
            placeholder="Please describe your campaign goal"
          />
        )}
      </Field>
      <Field label="Target Platform">
        <div className="platform-row" style={{ marginTop: 4 }}>
          <div
            className={`platform-card${data.platform === 'Instagram' ? ' selected' : ''}`}
            onClick={() => setData({ ...data, platform: 'Instagram' })}
          >
            <div className="p-icon"><InstagramSVG /></div>
            <div className="p-name">Instagram</div>
          </div>
          <div className="platform-card disabled" style={{ position: 'relative' }}>
            <div className="coming-soon-tip">Coming soon</div>
            <div className="p-icon"><YouTubeSVG /></div>
            <div className="p-name">YouTube</div>
          </div>
        </div>
      </Field>
    </div>
  );
}

function BrandStep3({ data, setData }) {
  const budgetMode = data.budgetMode || 'range';

  const SLIDER_MIN = 0;
  const SLIDER_MAX = 1000000;
  const minVal = data.budgetMin ?? SLIDER_MIN;
  const maxVal = data.budgetMax ?? SLIDER_MAX;

  const handleMinSlider = (e) => {
    const val = Math.min(Number(e.target.value), maxVal - 5000);
    setData({ ...data, budgetMin: val });
  };
  const handleMaxSlider = (e) => {
    const val = Math.max(Number(e.target.value), minVal + 5000);
    setData({ ...data, budgetMax: val });
  };

  const fmt = (n) => n >= 100000 ? `₹${(n/100000).toFixed(n%100000===0?0:1)}L` : `₹${(n/1000).toFixed(0)}K`;

  const minPct = ((minVal - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100;
  const maxPct = ((maxVal - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100;

  return (
    <div className="field-group">
      <Field label="Campaign Budget (₹)">
        <div className="budget-mode-toggle">
          <button
            className={`bm-btn${budgetMode === 'range' ? ' active' : ''}`}
            onClick={() => setData({ ...data, budgetMode: 'range' })}
            type="button"
          >Range</button>
          <button
            className={`bm-btn${budgetMode === 'fixed' ? ' active' : ''}`}
            onClick={() => setData({ ...data, budgetMode: 'fixed' })}
            type="button"
          >Fixed Amount</button>
        </div>

        {budgetMode === 'range' ? (
          <div className="range-wrap">
            <div className="range-labels">
              <span className="range-val">{fmt(minVal)}</span>
              <span className="range-sep">—</span>
              <span className="range-val">{fmt(maxVal)}</span>
            </div>
            <div className="dual-slider">
              <div
                className="slider-track-fill"
                style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
              />
              <input
                type="range"
                className="slider-thumb slider-min"
                min={SLIDER_MIN} max={SLIDER_MAX} step={5000}
                value={minVal}
                onChange={handleMinSlider}
              />
              <input
                type="range"
                className="slider-thumb slider-max"
                min={SLIDER_MIN} max={SLIDER_MAX} step={5000}
                value={maxVal}
                onChange={handleMaxSlider}
              />
            </div>
            <div className="range-hint">Drag both handles to set your budget range</div>
          </div>
        ) : (
          <input
            value={data.budgetFixed || ''}
            onChange={e => setData({ ...data, budgetFixed: e.target.value })}
            placeholder="e.g. 75,000"
            style={{ marginTop: 10 }}
          />
        )}
      </Field>

      <Field label="Required Follower Range">
        <div style={{ marginTop: 4 }}>
          <RadioGroup
            options={FOLLOWER_RANGES}
            value={data.followerRange || ''}
            onChange={r => setData({ ...data, followerRange: r })}
          />
        </div>
      </Field>
    </div>
  );
}

function BrandReview({ data, onEdit }) {
  const sections = [
    { title: 'Company', step: 0, rows: [['Name', data.name], ['Company', data.company], ['Email', data.email], data.phone && ['Phone', data.phone]].filter(Boolean) },
    { title: 'Campaign', step: 1, rows: [['Languages', (data.languages || []).join(', ') || '—'], ['Goal', data.goal || '—'], ['Platform', data.platform || '—']] },
    { title: 'Budget & Reach', step: 2, rows: [
        ['Budget', data.budgetMode === 'fixed'
          ? (data.budgetFixed ? `₹${data.budgetFixed}` : '—')
          : (data.budgetMin != null && data.budgetMax != null
              ? `₹${(data.budgetMin/1000).toFixed(0)}K – ₹${data.budgetMax >= 100000 ? (data.budgetMax/100000).toFixed(1)+'L' : (data.budgetMax/1000).toFixed(0)+'K'}`
              : '—')
        ],
        ['Follower Range', data.followerRange || '—']
      ]},
  ];
  return (
    <div style={{ width: '100%' }}>
      {sections.map(sec => (
        <div key={sec.title} className="review-block">
          <div className="review-section-header">
            <div className="review-section-title">{sec.title}</div>
            <button className="edit-btn" onClick={() => onEdit(sec.step)}>Edit</button>
          </div>
          <div className="review-rows">
            {sec.rows.map(([k, v]) => (
              <div key={k} className="review-row">
                <div className="review-key">{k}</div>
                <div className="review-val">{v || '—'}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Creator Steps ────────────────────────────────────────────────────────────

function CreatorStep1({ data, setData }) {
  return (
    <div className="field-group">
      <Field label="Full Name">
        <input value={data.name || ''} onChange={e => setData({ ...data, name: e.target.value })} placeholder="Priya Mehta" />
      </Field>
      <Field label="Email">
        <input type="email" value={data.email || ''} onChange={e => setData({ ...data, email: e.target.value })} placeholder="you@email.com" />
      </Field>
      <Field label="Platform">
        <div className="platform-row" style={{ marginTop: 4 }}>
          <div
            className={`platform-card${data.platform === 'Instagram' ? ' selected' : ''}`}
            onClick={() => setData({ ...data, platform: 'Instagram' })}
          >
            <div className="p-icon"><InstagramSVG /></div>
            <div className="p-name">Instagram</div>
          </div>
          <div className="platform-card disabled" style={{ position: 'relative' }}>
            <div className="coming-soon-tip">Not available yet</div>
            <div className="p-icon"><YouTubeSVG /></div>
            <div className="p-name">YouTube</div>
          </div>
        </div>
      </Field>
      <Field label="Handle / Username">
        <input value={data.handle || ''} onChange={e => setData({ ...data, handle: e.target.value })} placeholder="@yourhandle" />
      </Field>
      <Field label="Handle Link">
        <input type="url" value={data.handleLink || ''} onChange={e => setData({ ...data, handleLink: e.target.value })} placeholder="https://instagram.com/yourhandle" />
      </Field>
      <Field label="Phone" optional>
        <input type="tel" value={data.phone || ''} onChange={e => setData({ ...data, phone: e.target.value })} placeholder="+91 98765 43210" />
      </Field>
    </div>
  );
}

function CreatorStep2({ data, setData }) {
  const toggleGenre = (g) => {
    const arr = data.genres || [];
    setData({ ...data, genres: arr.includes(g) ? arr.filter(x => x !== g) : [...arr, g] });
  };
  const toggleLang = (l) => {
    const arr = data.languages || [];
    setData({ ...data, languages: arr.includes(l) ? arr.filter(x => x !== l) : [...arr, l] });
  };
  return (
    <div className="field-group">
      <Field label="Followers Count">
        <input value={data.followers || ''} onChange={e => setData({ ...data, followers: e.target.value })} placeholder="e.g. 120,000" />
      </Field>
      <Field label="Average Views per Post">
        <input value={data.avgViews || ''} onChange={e => setData({ ...data, avgViews: e.target.value })} placeholder="e.g. 25,000" />
      </Field>
      <Field label="Content Genre">
        <div style={{ marginTop: 4 }}>
          <TagSelect options={CONTENT_GENRES} selected={data.genres || []} onToggle={toggleGenre} />
        </div>
        {(data.genres || []).includes('Other') && (
          <input className="write-input" placeholder="Describe your niche…" value={data.genreOther || ''} onChange={e => setData({ ...data, genreOther: e.target.value })} />
        )}
      </Field>
      <Field label="Content Language">
        <div style={{ marginTop: 4 }}>
          <TagSelect options={LANGUAGES} selected={data.languages || []} onToggle={toggleLang} />
        </div>
      </Field>
    </div>
  );
}

function CreatorStep3({ data, setData }) {
  const toggleCat = (c) => {
    const arr = data.brandCategories || [];
    setData({ ...data, brandCategories: arr.includes(c) ? arr.filter(x => x !== c) : [...arr, c] });
  };
  return (
    <div className="field-group">
      <Field label="Past Collaboration Experience">
        <div style={{ marginTop: 4 }}>
          <RadioGroup
            options={['No prior collaborations', 'Occasional (1–5 brands)', 'Regular (5+ brands)']}
            value={data.collabExp || ''}
            onChange={v => setData({ ...data, collabExp: v })}
          />
        </div>
      </Field>
      <Field label="Typical Collaboration Fee (₹)">
        <input value={data.fee || ''} onChange={e => setData({ ...data, fee: e.target.value })} placeholder="e.g. 15,000 per post" />
      </Field>
      <Field label="Preferred Brand Categories">
        <div style={{ marginTop: 4 }}>
          <TagSelect options={BRAND_CATEGORIES} selected={data.brandCategories || []} onToggle={toggleCat} />
        </div>
        {(data.brandCategories || []).includes('Other') && (
          <input className="write-input" placeholder="Describe your preferred categories…" value={data.catOther || ''} onChange={e => setData({ ...data, catOther: e.target.value })} />
        )}
      </Field>
      <Field label="Open to Long-Term Partnerships?">
        <div className="toggle-row" style={{ marginTop: 4 }}>
          {['Yes', 'No'].map(opt => (
            <div key={opt} className={`toggle-btn${data.longTerm === opt ? ' selected' : ''}`} onClick={() => setData({ ...data, longTerm: opt })}>{opt}</div>
          ))}
        </div>
      </Field>
    </div>
  );
}

function CreatorReview({ data, onEdit }) {
  const sections = [
    { title: 'Profile', step: 0, rows: [['Name', data.name], ['Email', data.email], ['Platform', data.platform || '—'], ['Handle', data.handle], ['Profile Link', data.handleLink], data.phone && ['Phone', data.phone]].filter(Boolean) },
    { title: 'Audience', step: 1, rows: [['Followers', data.followers], ['Avg. Views', data.avgViews], ['Genres', (data.genres || []).join(', ') || '—'], ['Languages', (data.languages || []).join(', ') || '—']] },
    { title: 'Partnership', step: 2, rows: [['Experience', data.collabExp || '—'], ['Fee', data.fee ? `₹${data.fee}` : '—'], ['Brand Categories', (data.brandCategories || []).join(', ') || '—'], ['Long-term', data.longTerm || '—']] },
  ];
  return (
    <div style={{ width: '100%' }}>
      {sections.map(sec => (
        <div key={sec.title} className="review-block">
          <div className="review-section-header">
            <div className="review-section-title">{sec.title}</div>
            <button className="edit-btn" onClick={() => onEdit(sec.step)}>Edit</button>
          </div>
          <div className="review-rows">
            {sec.rows.map(([k, v]) => (
              <div key={k} className="review-row">
                <div className="review-key">{k}</div>
                <div className="review-val">{v || '—'}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Validation ───────────────────────────────────────────────────────────────

function brandStepValid(step, d) {
  if (step === 0) return d.name && d.company && d.email;
  if (step === 1) return (d.languages || []).length > 0 && d.goal && d.platform;
  if (step === 2) {
    const budgetOk = d.budgetMode === 'fixed' ? !!d.budgetFixed : (d.budgetMin != null && d.budgetMax != null);
    return budgetOk && d.followerRange;
  }
  return true;
}

function creatorStepValid(step, d) {
  if (step === 0) return d.name && d.email && d.platform && d.handle && d.handleLink;
  if (step === 1) return d.followers && d.avgViews && (d.genres || []).length > 0 && (d.languages || []).length > 0;
  if (step === 2) return d.collabExp && d.fee && (d.brandCategories || []).length > 0 && d.longTerm;
  return true;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Apply() {
  const [screen, setScreen] = useState('gate'); // gate | brand | creator | done
  const [step, setStep] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [brandData, setBrandData] = useState({});
  const [creatorData, setCreatorData] = useState({});

  const isBrand = screen === 'brand';
  const isCreator = screen === 'creator';
  const steps = isBrand ? BRAND_STEPS : CREATOR_STEPS;
  const data = isBrand ? brandData : creatorData;
  const setData = isBrand ? setBrandData : setCreatorData;
  const isValid = isBrand ? brandStepValid(step, data) : creatorStepValid(step, data);
  const isReview = step === 3;

  const go = (s) => { setAnimKey(k => k + 1); setStep(s); };
  const next = () => step < 3 ? go(step + 1) : null;
  const back = () => step > 0 ? go(step - 1) : null;

  const select = (type) => {
    setAnimKey(k => k + 1);
    setStep(0);
    setScreen(type);
  };

  const submit = () => { setAnimKey(k => k + 1); setScreen('done'); };

  return (
    <div className="apply-root">
      <Navbar />

      <div className="bg-glow-1" />
      <div className="bg-glow-2" />
      <div className="bg-glow-3" />

      <div className="container">
        <div className="top-badge">Brand · Creator Partnership Agency</div>

        {/* ── GATE ── */}
        {screen === 'gate' && (
          <FadeWrap animKey="gate">
            <h1 className="gate-title">Apply to Work<br />With Us</h1>
            <p className="gate-sub">We work with a limited number of partners.<br />Applications are reviewed manually.</p>
            <div className="cards-row">
              <div className="select-card" onClick={() => select('brand')}>
                <div className="card-pill pill-brand">For Brands</div>
                <div className="card-header">
                  <div className="card-label">I'm a Brand</div>
                  <div className="card-arrow">→</div>
                </div>
                <div className="card-desc">Connect with verified creators to run impactful campaigns.</div>
              </div>
              <div className="select-card" onClick={() => select('creator')}>
                <div className="card-pill pill-creator">For Creators</div>
                <div className="card-header">
                  <div className="card-label">I'm a Creator</div>
                  <div className="card-arrow">→</div>
                </div>
                <div className="card-desc">Partner with premium brands that match your audience and niche.</div>
              </div>
            </div>
          </FadeWrap>
        )}

        {/* ── FORM FLOW ── */}
        {(isBrand || isCreator) && (
          <FadeWrap animKey={screen + step + animKey}>
            <div
              className="back-link"
              onClick={() => step === 0 ? (setScreen('gate'), setAnimKey(k => k + 1)) : back()}
            >
              ← {step === 0 ? 'Back to selection' : 'Previous step'}
            </div>

            <ProgressBar steps={steps} current={step} />

            {!isReview && (
              <>
                <div className="form-title">{steps[step]}</div>
                <p className="form-subtitle">
                  {isBrand
                    ? ['Tell us who you are.', "What's your campaign about?", 'Budget & audience reach.', ''][step]
                    : ['Your creator profile.', 'About your audience.', 'Collaboration preferences.', ''][step]
                  }
                </p>
              </>
            )}
            {isReview && (
              <>
                <div className="form-title">Review & Submit</div>
                <p className="form-subtitle">Everything look good? Submit when ready.</p>
              </>
            )}

            {isBrand && step === 0 && <BrandStep1 data={brandData} setData={setBrandData} />}
            {isBrand && step === 1 && <BrandStep2 data={brandData} setData={setBrandData} />}
            {isBrand && step === 2 && <BrandStep3 data={brandData} setData={setBrandData} />}
            {isBrand && step === 3 && <BrandReview data={brandData} onEdit={s => go(s)} />}

            {isCreator && step === 0 && <CreatorStep1 data={creatorData} setData={setCreatorData} />}
            {isCreator && step === 1 && <CreatorStep2 data={creatorData} setData={setCreatorData} />}
            {isCreator && step === 2 && <CreatorStep3 data={creatorData} setData={setCreatorData} />}
            {isCreator && step === 3 && <CreatorReview data={creatorData} onEdit={s => go(s)} />}

            <div style={{ height: 90 }} />
          </FadeWrap>
        )}

        {/* ── CONFIRMATION ── */}
        {screen === 'done' && (
          <FadeWrap animKey="done">
            <div className="confirm-wrap">
              {/* Image from your assets folder — place the PNG at src/assets/handshake.png */}
              <div className="confirm-icon">
                <img
                  src="/src/assets/handshake.png"
                  alt="partnership"
                  className="confirm-icon-img"
                />
              </div>
              <div className="confirm-title">Application<br />Received</div>
              <p className="confirm-msg">
                We'll review your application within 24–48 hours.<br />Selected partners will be contacted directly.
              </p>
              <button
                className="confirm-back-btn"
                onClick={() => {
                  setScreen('gate');
                  setStep(0);
                  setBrandData({});
                  setCreatorData({});
                  setAnimKey(k => k + 1);
                }}
              >
                ← Back
              </button>
              <div className="confirm-tag confirm-tag-plain">
                <div className="confirm-dot" />
                Under review
              </div>
            </div>
          </FadeWrap>
        )}
      </div>

      {/* Sticky bottom CTA — only during form flow */}
      {(isBrand || isCreator) && screen !== 'done' && (
        <div className="sticky-footer">
          <div className="sticky-inner">
            {step > 0 && <button className="btn-back" onClick={back}>←</button>}
            {!isReview
              ? <button className="btn-continue" disabled={!isValid} onClick={next}>Continue →</button>
              : <button className="btn-submit" onClick={submit}>Submit Application ✦</button>
            }
          </div>
        </div>
      )}
    </div>
  );
}