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
      <section style={styles.section}>
        <div className="container" style={styles.content}>
          <div style={styles.heroContent}>
            <h2 style={styles.kicker}>Weather-aware event planning</h2>
            <h1 style={styles.title}>Plan smarter events with WeatherWise</h1>
            <p style={styles.subtitle}>
              WeatherWise Event Planner blends an interactive calendar with real-time weather data,
              providing smart suggestions to ensure your event is a success—rain or shine.
            </p>
            <div style={styles.ctaWrapper}>
              <Link to="/planner" className="btn">
                Plan your next event
              </Link>
              <div style={styles.ctaHighlight}>
                Get weather-aware recommendations for your perfect event
              </div>
            </div>
          </div>

          <div className="card" style={styles.card}>
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

    </div>
  );
}

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '40px 0',
    background: 'transparent'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 40,
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 20px'
  },
  heroContent: {
    maxWidth: 800,
    width: '100%',
    textAlign: 'center'
  },
  kicker: {
    color: 'var(--secondary)',
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 12
  },
  title: {
    margin: '0 0 16px',
    fontSize: 'clamp(32px, 5vw, 48px)',
    lineHeight: 1.2,
    color: 'var(--text)'
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
  ctaHighlight: {
    color: 'var(--subtle)',
    fontSize: '0.95rem'
  },
  card: {
    padding: 32,
    width: '100%',
    maxWidth: 600,
    margin: '0 auto',
    background: 'var(--surface)'
  },
  slide: {
    textAlign: 'center',
    padding: '16px 24px'
  },
  slideIcon: {
    fontSize: 56,
    marginBottom: 16,
    display: 'inline-block'
  },
  slideTitle: {
    margin: '0 0 12px',
    fontSize: 24,
    fontWeight: 600,
    color: 'var(--primary)'
  },
  slideDesc: {
    margin: 0,
    fontSize: 16,
    color: 'var(--subtle)',
    lineHeight: 1.6
  }
};
