import React, { useEffect, useState } from 'react';
import { fetchWeatherByCoords, fetchWeatherByCity, getRecommendations, getWeatherConfigStatus } from '../../services/weatherService';

// PUBLIC_INTERFACE
export function WeatherWidget() {
  /**
   * PUBLIC_INTERFACE
   * Sticky weather widget showing current conditions and tips.
   * Attempts geolocation; if unavailable or denied, falls back to a default city and informs the user.
   */
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [info, setInfo] = useState(''); // non-error user information (e.g., geolocation denied)
  const [diagnostic, setDiagnostic] = useState(null);

  useEffect(() => {
    let cancelled = false;

    // Capture config diagnostics early to surface helpful guidance
    const status = getWeatherConfigStatus();
    if (!status.ok) {
      setDiagnostic(status);
    }

    // Helper function: fall back to a default city and show info to user
    const fallbackToCity = async (reasonText) => {
      try {
        setInfo(reasonText || 'Using default city due to unavailable location.');
        const w = await fetchWeatherByCity(); // uses default city internally
        if (!cancelled) setWeather(w);
      } catch (e) {
        if (!cancelled) setError(`${e?.message || 'Unable to fetch weather data.'}`);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    // Fetch weather using coordinates, and if it fails, fall back to city
    const fetchByCoords = async (lat, lon) => {
      try {
        const w = await fetchWeatherByCoords(lat, lon);
        if (!cancelled) setWeather(w);
      } catch (e) {
        if (!cancelled) {
          setError(`${e?.message || 'Unable to fetch weather for your location.'} Falling back to a default city.`);
          try {
            const w = await fetchWeatherByCity();
            if (!cancelled) setWeather(w);
          } catch (e2) {
            if (!cancelled) setError(e2?.message || 'Unable to fetch weather data after fallback.');
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
        () => fallbackToCity('Location access denied or unavailable. Showing weather for a default city.'),
        { timeout: 5000, enableHighAccuracy: false, maximumAge: 60000 }
      );
    } else {
      fallbackToCity('Your browser does not support geolocation. Showing weather for a default city.');
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const recs = weather ? getRecommendations(weather.current?.description) : [];

  return (
    <div className="card" style={styles.card} aria-live="polite">
      <div style={styles.header}>
        <span style={styles.badge}>Live Weather</span>
      </div>
      {loading && <div className="small">Fetching weather...</div>}
      {!loading && info && !error && (
        <div className="small" style={{ color: 'var(--subtle)', marginBottom: 8 }}>{info}</div>
      )}
      {!loading && diagnostic && (
        <div className="small" style={{ color: 'var(--error)', marginBottom: 8 }}>
          Configuration issue: {diagnostic.issues.join(' | ')}{diagnostic.apiKeyMasked ? ` (key: ${diagnostic.apiKeyMasked})` : ''}
        </div>
      )}
      {!loading && error && <div style={{ color: 'var(--error)' }} className="small">{error}</div>}
      {!loading && weather && !error && (
        <>
          <div style={styles.row}>
            <div style={{ fontSize: 36 }}>{iconFor(weather.current?.icon)}</div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{weather.current?.temp}°C</div>
              <div className="small" style={{ textTransform: 'capitalize' }}>{weather.current?.description}</div>
              {(weather.location?.name || weather.location?.country) && (
                <div className="small" style={{ marginTop: 4 }}>
                  {weather.location?.name}{weather.location?.country ? `, ${weather.location.country}` : ''}
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
  if (val.includes('storm') || val.includes('thunder')) return '⛈️';
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
