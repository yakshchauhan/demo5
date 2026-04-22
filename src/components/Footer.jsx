import { useNavigate } from 'react-router-dom';
import './Footer.css';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-label="Instagram">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.01" fill="currentColor" strokeWidth="2.5"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-label="LinkedIn">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="nexus-footer">
      <div className="footer-inner">

        {/* Left — Branding */}
        <div className="footer-brand">
          <button
            className="footer-logo"
            onClick={() => navigate('/')}
            aria-label="Go to homepage"
          >
            NEX<span>US</span>
          </button>
          <p className="footer-copy">© 2026 Nexus Agency.<br />All rights reserved.</p>
        </div>

        {/* Vertical divider */}
        <div className="footer-divider" />

        {/* Right — Contact */}
        <div className="footer-contact">
          <div className="footer-contact-heading">CONTACT</div>

          <div className="footer-phones">
            <a href="tel:+12345678901" className="footer-phone-item">
              <span className="phone-lang">(EN)</span>
              <span className="phone-num">+1 234 567 8901</span>
            </a>
            <a href="tel:+442071234567" className="footer-phone-item">
              <span className="phone-lang">(UK)</span>
              <span className="phone-num">+44 207 123 4567</span>
            </a>
            <a href="tel:+919876543210" className="footer-phone-item">
              <span className="phone-lang">(IN)</span>
              <span className="phone-num">+91 987 654 3210</span>
            </a>
          </div>

          {/* Icon-only social buttons */}
          <div className="footer-socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}