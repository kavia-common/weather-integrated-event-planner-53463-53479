import React from 'react';

// PUBLIC_INTERFACE
export function Footer() {
  /** App footer with subtle gradient bar */
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.inner}>
        <span style={{ color: 'var(--subtle)' }}>
          © {new Date().getFullYear()} WeatherWise Event Planner. Built with React.
        </span>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="https://github.com" target="_blank" rel="noreferrer" style={styles.link}>GitHub</a>
          <a href="https://reactjs.org" target="_blank" rel="noreferrer" style={styles.link}>React</a>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: 32,
    borderTop: '1px solid var(--border)',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(6px)'
  },
  inner: {
    padding: '18px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  link: {
    color: 'var(--primary)'
  }
};
