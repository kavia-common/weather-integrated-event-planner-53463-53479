import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// PUBLIC_INTERFACE
export function LandingPage() {
  /** Marketing style landing page introducing the app */
  const sliderRef = useRef(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  };

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
              <Link to="/planner" className="btn" style={styles.mainCTA}>
                Plan your next event
              </Link>
            </div>
          </div>
          <div className="card" style={styles.heroCard}>
            <Slider ref={sliderRef} {...sliderSettings}>
              <div style={styles.slide}>
                <div style={styles.slideIcon}>📅</div>
                <h3 style={styles.slideTitle}>Interactive Calendar</h3>
                <p style={styles.slideDesc}>Pick dates with our intuitive calendar interface</p>
              </div>
              <div style={styles.slide}>
                <div style={styles.slideIcon}>🌤️</div>
                <h3 style={styles.slideTitle}>Weather Integration</h3>
                <p style={styles.slideDesc}>Real-time weather data and smart planning tips</p>
              </div>
              <div style={styles.slide}>
                <div style={styles.slideIcon}>📝</div>
                <h3 style={styles.slideTitle}>Easy Booking</h3>
                <p style={styles.slideDesc}>Streamlined form with weather-aware recommendations</p>
              </div>
              <div style={styles.slide}>
                <div style={styles.slideIcon}>📊</div>
                <h3 style={styles.slideTitle}>Smart Insights</h3>
                <p style={styles.slideDesc}>Get personalized event planning suggestions</p>
              </div>
            </Slider>
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
  mainCTA: {
    fontSize: '1.125rem',
    padding: '12px 24px',
    background: 'linear-gradient(90deg, var(--primary), #60a5fa)',
    transition: 'all 200ms ease',
    boxShadow: 'var(--shadow-md)',
    textTransform: 'none',
    fontWeight: 600
  },
  heroCard: {
    padding: 24,
    background: 'white',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    overflow: 'hidden'
  },
  slide: {
    textAlign: 'center',
    padding: '12px 20px'
  },
  slideIcon: {
    fontSize: 48,
    marginBottom: 12
  },
  slideTitle: {
    margin: '0 0 8px',
    fontSize: 22,
    fontWeight: 600,
    color: 'var(--primary)'
  },
  slideDesc: {
    margin: 0,
    fontSize: 15,
    color: 'var(--subtle)',
    lineHeight: 1.5
  }
};
