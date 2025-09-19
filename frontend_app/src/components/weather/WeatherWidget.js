import React, { useEffect, useState } from 'react';
import { fetchWeatherByCoords, getRecommendations } from '../../services/weatherService';

// PUBLIC_INTERFACE
export function WeatherWidget() {
  /**
   * PUBLIC_INTERFACE
   * Sticky weather widget showing current conditions and tips.
   * Attempts geolocation; falls back to default coords if denied/unavailable.
   */
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fallback = async () => {
      try {
        const w = await fetchWeatherByCoords(40.7128, -74.0060); // NYC as fallback
        setWeather(w);
      } catch (e) {
        setError('Unable to fetch weather data.');
      } finally {
        setLoading(false);
      }
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const w = await fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
          setWeather(w);
        } catch (e) {
          setError('Unable to fetch weather data.');
        } finally {
          setLoading(false);
        }
      }, fallback, { timeout: 5000 });
    } else {
      fallback();
    }
  }, []);

  const recs = weather ? getRecommendations(weather.current?.description) : [];

  return (
    <div className="card" style={styles.card} aria-live="polite">
      <div style={styles.header}>
        <span style={styles.badge}>Live Weather</span>
      </div>
      {loading && <div className="small">Fetching weather...</div>}
      {!loading && error && <div style={{ color: 'var(--error)' }} className="small">{error}</div>}
      {!loading && weather && (
        <>
          <div style={styles.row}>
            <div style={{ fontSize: 36 }}>{iconFor(weather.current?.icon)}</div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{weather.current?.temp}°C</div>
              <div className="small" style={{ textTransform: 'capitalize' }}>{weather.current?.description}</div>
              {weather.source === 'mock' && (
                <div className="small" style={{ marginTop: 6, color: '#8b5cf6' }}>
                  Mock data active. Configure .env for live weather.
                </div>
              )}
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <h4 style={{ margin: '0 0 8px' }}>Suggestions</h4>
            <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--subtle)' }}>
              {recs.map((r, idx) => <li key={idx}>{r}</li>)}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

function iconFor(main) {
  const val = (main || '').toLowerCase();
  if (val.includes('rain')) return '🌧️';
  if (val.includes('storm')) return '⛈️';
  if (val.includes('snow')) return '❄️';
  if (val.includes('cloud')) return '☁️';
  return '☀️';
}

const styles = {
  card: {
    padding: 16,
    position: 'relative'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  badge: {
    display: 'inline-block',
    fontSize: 12,
    color: 'white',
    background: 'linear-gradient(90deg, var(--primary), #60a5fa)',
    padding: '4px 8px',
    borderRadius: 999,
    boxShadow: 'var(--shadow-sm)'
  },
  row: {
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  }
};
