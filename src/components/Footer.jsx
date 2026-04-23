import { useNavigate } from 'react-router-dom';
import './Footer.css';

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Instagram">
    <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="url(#footer-ig)" strokeWidth="1.7"/>
    <circle cx="12" cy="12" r="4.2" stroke="url(#footer-ig)" strokeWidth="1.7"/>
    <circle cx="17.3" cy="6.7" r="1.1" fill="#e1306c"/>
    <defs>
      <linearGradient id="footer-ig" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f09433"/>
        <stop offset="40%" stopColor="#dc2743"/>
        <stop offset="100%" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="LinkedIn">
    <rect x="2" y="2" width="20" height="20" rx="4" stroke="#0A66C2" strokeWidth="1.7"/>
    <path d="M7 10v7M7 7v.5" stroke="#0A66C2" strokeWidth="1.7" strokeLinecap="round"/>
    <path d="M11 17v-3.5a2.5 2.5 0 0 1 5 0V17M11 10v7" stroke="#0A66C2" strokeWidth="1.7" strokeLinecap="round"/>
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
              <span className="phone-lang">(ENGLISH)</span>
              <span className="phone-num">+91 98765 43210</span>
            </a>
            <a href="tel:+442071234567" className="footer-phone-item">
              <span className="phone-lang">(HINDI)</span>
              <span className="phone-num">+91 98765 43210</span>
            </a>
            <a href="tel:+919876543210" className="footer-phone-item">
              <span className="phone-lang">(TELUGU)</span>
              <span className="phone-num">+91 98765 43210</span>
            </a>
          </div>

          {/* Icon-only social buttons — no box */}
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