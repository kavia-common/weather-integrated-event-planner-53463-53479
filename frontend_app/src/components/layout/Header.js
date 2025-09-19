import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// PUBLIC_INTERFACE
export function Header() {
  /** Top navigation bar with brand and links */
  const { pathname } = useLocation();
  const isActive = (to) => pathname === to;

  return (
    <header style={styles.header}>
      <div className="container" style={styles.headerInner}>
        <Link to="/" style={styles.brand}>
          <span style={styles.brandDot} />
          <span>WeatherWise</span>
        </Link>
        <nav style={styles.nav}>
          <Link to="/" style={{ ...styles.navLink, ...(isActive('/') ? styles.navLinkActive : {}) }}>
            Home
          </Link>
          <Link to="/planner" style={{ ...styles.navLink, ...(isActive('/planner') ? styles.navLinkActive : {}) }}>
            Planner
          </Link>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 40,
    background: 'rgba(255, 255, 255, 0.1)',
    borderBottom: '1px solid var(--border)',
    backdropFilter: 'blur(6px)'
  },
  headerInner: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '14px 0',
    justifyContent: 'space-between'
  },
  brand: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    fontWeight: 700,
    fontSize: '1.1rem',
    color: 'var(--text)'
  },
  brandDot: {
    width: 10,
    height: 10,
    background: 'var(--secondary)',
    borderRadius: 999
  },
  nav: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 12
  },
  navLink: {
    padding: '8px 12px',
    borderRadius: 10,
    color: 'var(--text)',
    border: '1px solid transparent',
    transition: 'all 200ms ease'
  },
  navLinkActive: {
    borderColor: 'var(--primary)',
    color: 'var(--primary)',
    background: 'white',
    boxShadow: 'var(--shadow-sm)'
  }
};
