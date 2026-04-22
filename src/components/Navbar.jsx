import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);

  // Scroll-shadow effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // After navigating to '/', scroll to a hash target
  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const id = location.state.scrollTo;
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const goHome = (sectionId) => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  const scrollToContact = () => {
    setMenuOpen(false);
    const footer = document.querySelector('footer');
    if (footer) footer.scrollIntoView({ behavior: 'smooth' });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      ref={navRef}
      className={`nexus-nav${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}
    >
      {/* ── Mobile: Hamburger far left ── */}
      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span className={`ham-line${menuOpen ? ' open' : ''}`} />
        <span className={`ham-line${menuOpen ? ' open' : ''}`} />
        <span className={`ham-line${menuOpen ? ' open' : ''}`} />
      </button>

      {/* ── Logo ── */}
      <button
        className="nav-logo"
        onClick={() => goHome('herosection')}
        aria-label="Go to homepage"
      >
        NEX<span>US</span>
      </button>

      {/* ── Desktop links (center) ── */}
      <ul className="nav-links">
        <li>
          <button
            onClick={() => goHome('herosection')}
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </button>
        </li>
        <li>
          <button onClick={() => goHome('the-problems')}>
            How It Works
          </button>
        </li>
        <li>
          <Link to="/brands" className={isActive('/brands') ? 'active' : ''}>
            For Brands
          </Link>
        </li>
        <li>
          <Link to="/creators" className={isActive('/creators') ? 'active' : ''}>
            For Creators
          </Link>
        </li>
        <li>
          <button onClick={scrollToContact}>Contact</button>
        </li>
      </ul>

      {/* ── Desktop CTA (right) ── */}
      <Link to="/apply" className="nav-cta">
        Apply to Work With Us ↗
      </Link>

      {/* ── Floating Glass Dropdown (mobile only) ── */}
      <div
        className={`nav-dropdown${menuOpen ? ' dropdown-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className="dropdown-links">
          {[
            { label: 'Home', action: () => goHome('herosection') },
            { label: 'How It Works', action: () => goHome('the-problems') },
            { label: 'For Brands', action: () => { setMenuOpen(false); navigate('/brands'); } },
            { label: 'For Creators', action: () => { setMenuOpen(false); navigate('/creators'); } },
            { label: 'Contact', action: scrollToContact },
          ].map((item, i) => (
            <li key={item.label} style={{ '--i': i }}>
              <button onClick={item.action}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="dropdown-divider" />

        <div className="dropdown-cta-wrap" style={{ '--i': 5 }}>
          <Link
            to="/apply"
            className="dropdown-cta"
            onClick={() => setMenuOpen(false)}
          >
            Apply to Work With Us ↗
          </Link>
        </div>
      </div>

    </nav>
  );
}