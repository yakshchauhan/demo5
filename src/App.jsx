import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Brandpage from './pages/Brandpage';
import Creatorspage from './pages/Creatorspage';
import Apply from './pages/Apply';

/**
 * ScrollHandler
 *
 * Handles two scroll scenarios:
 *  1. Cross-page navigation — user arrives at '/' with a `scrollTo` state
 *     (set by Navbar when navigating from another page). After the page
 *     renders, scroll to the target section id.
 *  2. Same-page anchor clicks — standard behavior via html { scroll-behavior: smooth }.
 *
 * Also scrolls to the top of the page on every route change, unless a
 * specific section target is provided.
 */
function ScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    const target = location.state?.scrollTo;

    if (target) {
      // Small delay to let the incoming page fully mount before scrolling
      const timer = setTimeout(() => {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Default: scroll to top on every page transition
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.state]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollHandler />
      <Routes>
        <Route path="/"         element={<Homepage />} />
        <Route path="/brands"   element={<Brandpage />} />
        <Route path="/creators" element={<Creatorspage />} />
        <Route path="/apply"    element={<Apply />} />
        {/* Catch-all: redirect unknown paths back to home */}
        <Route path="*"         element={<Homepage />} />
      </Routes>
    </>
  );
}
