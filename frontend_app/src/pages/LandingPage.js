import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export function LandingPage() {
  /** Marketing style landing page introducing the app */
  return (
    <div>
      <section style={styles.hero}>
        <div className="container" style={styles.heroInner}>
          <div>
            <div style={styles.kicker}>Weather-integrated event planning</div>
            <h1 style={styles.title}>Plan smarter with live weather insights</h1>
            <p style={styles.subtitle}>
              Ocean Planner blends an interactive calendar with real-time weather,
              providing suggestions to ensure your event is a success—rain or shine.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/planner" className="btn">Open Planner</Link>
              <a href="#features" className="btn btn-ghost">Learn More</a>
            </div>
          </div>
          <div className="card" style={styles.heroCard} aria-hidden>
            <div style={styles.heroBadge}>Ocean Professional</div>
            <div style={{ fontSize: 14, color: 'var(--subtle)' }}>Modern • Minimal • Responsive</div>
            <div style={{ marginTop: 12, fontSize: 48 }}>🌤️</div>
            <div style={{ marginTop: 6, fontWeight: 700, fontSize: 22, color: 'var(--primary)' }}>Live Weather</div>
            <div className="small">Sticky widget with tips for your date</div>
          </div>
        </div>
      </section>

      <section id="features" className="container" style={{ padding: '24px 0' }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
          {features.map((f)=>(
            <div key={f.title} className="card" style={{ padding: 16 }}>
              <div style={{ fontSize: 28 }}>{f.icon}</div>
              <h3 style={{ margin: '8px 0' }}>{f.title}</h3>
              <p className="small">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const features = [
  { title: 'Interactive Calendar', desc: 'Pick dates effortlessly with a clean monthly view.', icon: '🗓️' },
  { title: 'Sticky Weather Widget', desc: 'See current conditions and planning suggestions.', icon: '🌦️' },
  { title: 'Fixed Booking Form', desc: 'Book events confidently with guided inputs.', icon: '📝' }
];

const styles = {
  hero: {
    background: 'linear-gradient(180deg, rgba(37,99,235,0.08), rgba(255,255,255,1))',
    borderBottom: '1px solid var(--border)'
  },
  heroInner: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    alignItems: 'center',
    gap: 24,
    padding: '34px 0'
  },
  kicker: {
    color: 'var(--secondary)',
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 10
  },
  title: {
    margin: '0 0 8px',
    fontSize: 'clamp(28px, 4vw, 42px)'
  },
  subtitle: {
    marginTop: 0,
    marginBottom: 16,
    color: 'var(--subtle)',
    maxWidth: 640
  },
  heroCard: {
    padding: 16,
    textAlign: 'center'
  },
  heroBadge: {
    display: 'inline-block',
    marginBottom: 6,
    padding: '4px 10px',
    borderRadius: 999,
    background: 'linear-gradient(90deg, var(--secondary), #fbbf24)',
    color: 'white',
    fontSize: 12,
    boxShadow: 'var(--shadow-sm)'
  }
};
