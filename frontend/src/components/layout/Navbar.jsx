/*
 * components/layout/Navbar.jsx
 *
 * What this is:
 *   The sticky top navigation bar rendered on every single page of the app.
 *
 * Where it is used:
 *   App.jsx, rendered outside the Routes block so it persists across navigation.
 *
 * What it should contain:
 *   - Logo mark (five stacked bars SVG) and site title on the left
 *   - Navigation links on the right using React Router <Link> components:
 *       Overview  -> /
 *       Models    -> /models
 *       Forecast  -> /models/lstm  (links to default model)
 *       About     -> /about
 *       FAQ       -> /faq  (styled as a CTA button)
 *   - Active link highlighting based on current route (useLocation hook)
 *   - Sticky positioning so it stays at the top on scroll
 *   - Hamburger menu on mobile screens
 *
 * Development order:
 *   Build this first. Every page test during development depends on
 *   being able to navigate between pages.
 */

/*
 * React router will switch pages without reloading the whole browser
 * link is the react routers version of the <a> so it means no page reload :)
 * useLocation will tell us what url we are on
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/* these are just the nav links and the FAQ is seperate because its a black button
 * Initially I looked at the pages section in the folder there were 6 pages so just followed that but now I read your comments I followed your comments :)
 * So each link there is the name so what the user sees and basically a path where a user can go to
 * the path is what url it goes to when you click it
 */

const navLinks = [
  { name: 'Overview', path: '/' },
  { name: 'Models', path: '/models' },
  { name: 'Evaluations', path: '/evaluations' },
  { name: 'About', path: '/about' },

  // sorry i was not sure if the evaluations needed to be here as the html does not have it so i removed it
  // { name: "Evaluations", path: "/evaluations" }
];

/* The 5 bar chart bars that are next to the stock prediction website name
 * was hard sorry if the colours are kinda dull for the green and red
 * In my mind is it that green bars = stock up and red bars mean stock down
 */

function TheLogoBars() {
  return (
    <div className="flex items-end gap-[2.5px] h-[18px]">
      <span className="w-1 bg-[var(--color-accent-green)]" style={{ height: '8px' }}></span>
      <span className="w-1 bg-[var(--color-accent-green)]" style={{ height: '14px' }}></span>
      <span className="w-1 bg-[var(--color-accent-red)]" style={{ height: '10px' }}></span>
      <span className="w-1 bg-[var(--color-accent-green)]" style={{ height: '18px' }}></span>
      <span className="w-1 bg-[var(--color-accent-red)]" style={{ height: '12px' }}></span>
    </div>
  );
}

/* Hamburger icon for mobile menu */
function HamburgerIcon({ isOpen }) {
  return (
    <div className="flex flex-col justify-center items-center w-6 h-6 gap-1.5">
      <span
        className={`block w-5 h-0.5 bg-[var(--color-ink)] transition-transform duration-300 ${
          isOpen ? 'rotate-45 translate-y-2' : ''
        }`}
      />
      <span
        className={`block w-5 h-0.5 bg-[var(--color-ink)] transition-opacity duration-300 ${
          isOpen ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`block w-5 h-0.5 bg-[var(--color-ink)] transition-transform duration-300 ${
          isOpen ? '-rotate-45 -translate-y-2' : ''
        }`}
      />
    </div>
  );
}

export default function Navbar() {
  //location pathname will give us the current url for example "/about"
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  //going to return true if the link matches to the current page user is on

  function isActive(path) {
    if (path === '/') {
      return location.pathname === '/';
    }

    /* I also encountered another issue which I have fixed now.
     * because the models lstm started with models it was making both models and forecast bold at the same time
     * but now i fixed it by doing two different if statements
     */

    if (path === '/models') {
      return location.pathname === '/models';
    }

    return location.pathname.startsWith(path);
  }

  return (
    <>
      <nav className="flex items-center justify-between px-4 md:px-12 h-14 md:h-16 bg-[var(--color-off-white)] border-b border-[var(--color-border)] sticky top-0 z-[100]">
        {/* this is the logo and the app name */}
        <Link
          to="/"
          className="flex items-center gap-[10px] font-medium text-[0.85rem] md:text-[0.95rem] tracking-[0.01em] text-[var(--color-ink)] no-underline"
        >
          <TheLogoBars />
          <span className="hidden sm:inline">Stock Market Prediction</span>
          <span className="sm:hidden">SMP</span>
        </Link>

        {/* Desktop nav links - hidden on mobile */}
        <ul className="hidden md:flex gap-9 list-none m-0 p-0">
          {/* Looping through the navLinks and creating an <a> tag for each one */}
          {navLinks.map((link) => (
            <li key={link.name}>
              {/*
               * initally I did face an issue with the boldness but realised that the bold might not have been showing due to tailwind conflicting
               * as a result i did change to semibold instead of medium and also removed font normal
               */}

              <Link
                to={link.path}
                className={`no-underline text-sm tracking-[0.02em] transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-[var(--color-ink)] font-semibold'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* FAQ button cuz it's different from the others. its seperate from the regular links */}
          <li>
            <Link
              to="/faq"
              className={`no-underline px-[18px] py-2 rounded-md text-sm font-medium transition-opacity duration-200 ${
                isActive('/faq')
                  ? 'bg-[var(--color-ink)] text-[var(--color-off-white)]'
                  : 'bg-[var(--color-ink)] text-[var(--color-off-white)] hover:opacity-75'
              }`}
            >
              FAQ
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-transparent border-none cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <HamburgerIcon isOpen={mobileMenuOpen} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-14 bg-black/20 z-[90]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu dropdown */}
      <div
        className={`md:hidden fixed top-14 left-0 right-0 bg-[var(--color-off-white)] border-b border-[var(--color-border)] z-[95] transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col list-none m-0 p-4 gap-1">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`no-underline block py-3 px-4 rounded-lg text-[0.95rem] tracking-[0.02em] transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-[var(--color-ink)] font-semibold bg-[var(--color-border)]'
                    : 'text-[var(--color-muted)]'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* FAQ button in mobile menu */}
          <li className="mt-2 pt-2 border-t border-[var(--color-border)]">
            <Link
              to="/faq"
              className="no-underline block py-3 px-4 rounded-lg text-[0.95rem] font-medium text-center bg-[var(--color-ink)] text-[var(--color-off-white)]"
            >
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
