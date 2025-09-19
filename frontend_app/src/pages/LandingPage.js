import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// PUBLIC_INTERFACE
export function LandingPage() {
  /** Marketing style landing page introducing the app with a modern, cohesive design */
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
          <div style={styles.heroContent}>
            <div style={styles.kicker}>Weather-aware event planning</div>
            <h1 style={styles.title}>Plan smarter events with WeatherWise</h1>
            <p style={styles.subtitle}>
              WeatherWise Event Planner blends an interactive calendar with real-time weather data,
              providing smart suggestions to ensure your event is a success—rain or shine.
            </p>
            <div style={styles.ctaWrapper}>
              <Link to="/planner" className="btn" style={styles.mainCTA}>
                Plan your next event
              </Link>
              <div style={styles.ctaHighlight}>
                Get weather-aware recommendations for your perfect event
              </div>
            </div>
          </div>

          <div className="card" style={styles.heroCard}>
            <Slider ref={sliderRef} {...sliderSettings}>
              <div style={styles.slide}>
                <div style={styles.slideIcon}>📅</div>
                <h3 style={styles.slideTitle}>Interactive Calendar</h3>
                <p style={styles.slideDesc}>
                  Pick dates with our intuitive calendar interface, designed for effortless event planning
                </p>
              </div>
              <div style={styles.slide}>
                <div style={styles.slideIcon}>🌤️</div>
                <h3 style={styles.slideTitle}>Weather Integration</h3>
                <p style={styles.slideDesc}>
                  Real-time weather data and smart planning tips for weather-proof events
                </p>
              </div>
              <div style={styles.slide}>
                <div style={styles.slideIcon}>📝</div>
                <h3 style={styles.slideTitle}>Easy Booking</h3>
                <p style={styles.slideDesc}>
                  Streamlined form with intelligent weather-aware recommendations
                </p>
              </div>
              <div style={styles.slide}>
                <div style={styles.slideIcon}>📊</div>
                <h3 style={styles.slideTitle}>Smart Insights</h3>
                <p style={styles.slideDesc}>
                  Get personalized suggestions based on weather patterns and event type
                </p>
              </div>
            </Slider>
          </div>
        </div>
      </section>

      <div style={styles.wave}>
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120h1440V45.8C1360.5 15.3 1280.7 0 1200.5 0c-160.4 0-320.8 30.3-481.2 30.3C559 30.3 398.7 0 238.3 0 158.2 0 78.6 15.3 0 45.8V120z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

const styles = {
  hero: {
    background: 'linear-gradient(165deg, rgba(37,99,235,0.25), rgba(245,158,11,0.08))',
    position: 'relative',
    paddingBottom: 40,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  heroInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: 40,
    padding: '60px 0 20px',
    '@media (max-width: 768px)': {
      gap: 32,
      padding: '40px 0 20px'
    }
  },
  heroContent: {
    maxWidth: 800,
    width: '100%'
  },
  kicker: {
    color: 'var(--secondary)',
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 12,
    display: 'inline-block',
    background: 'linear-gradient(90deg, var(--secondary), #FB923C)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  title: {
    margin: '0 0 16px',
    fontSize: 'clamp(32px, 5vw, 48px)',
    lineHeight: 1.2,
    background: 'linear-gradient(90deg, var(--primary), #60A5FA)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  subtitle: {
    marginTop: 0,
    marginBottom: 24,
    color: 'var(--subtle)',
    fontSize: '1.125rem',
    lineHeight: 1.6
  },
  ctaWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    alignItems: 'center'
  },
  mainCTA: {
    fontSize: '1.25rem',
    padding: '16px 32px',
    background: 'linear-gradient(90deg, var(--primary), #60a5fa)',
    transition: 'all 200ms ease',
    boxShadow: 'var(--shadow-md)',
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 'var(--radius-lg)'
  },
  ctaHighlight: {
    color: 'var(--subtle)',
    fontSize: '0.95rem'
  },
  heroCard: {
    padding: 32,
    background: 'linear-gradient(135deg, rgba(37,99,235,0.03), rgba(255,255,255,0.9))',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    overflow: 'hidden',
    border: '1px solid rgba(37,99,235,0.15)',
    backdropFilter: 'blur(8px)',
    width: '100%',
    maxWidth: 600,
    margin: '0 auto'
  },
  slide: {
    textAlign: 'center',
    padding: '16px 24px'
  },
  slideIcon: {
    fontSize: 56,
    marginBottom: 16,
    display: 'inline-block',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
  },
  slideTitle: {
    margin: '0 0 12px',
    fontSize: 24,
    fontWeight: 600,
    background: 'linear-gradient(90deg, var(--primary), #60A5FA)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  slideDesc: {
    margin: 0,
    fontSize: 16,
    color: 'var(--subtle)',
    lineHeight: 1.6
  },
  wave: {
    color: 'rgba(255,255,255,0.8)',
    position: 'absolute',
    bottom: -1,
    left: 0,
    width: '100%',
    overflow: 'hidden',
    lineHeight: 0,
    transform: 'rotate(180deg)',
    opacity: 0.9,
    background: 'linear-gradient(to bottom, transparent, rgba(37,99,235,0.05))'
  }
};
