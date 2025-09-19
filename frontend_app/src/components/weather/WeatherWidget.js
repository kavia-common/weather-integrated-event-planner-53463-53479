import React, { useEffect, useMemo, useState } from 'react';
import { fetchWeatherByCity, fetchForecastByCity, getRecommendations, getWeatherConfigStatus } from '../../services/weatherService';
import { validateWeatherEnv } from '../../services/envDiagnostics';

// A small curated list for quick selection, styled per Ocean Professional
const PRESET_CITIES = [
  { label: 'New York, US', value: 'New York' },
  { label: 'San Francisco, US', value: 'San Francisco' },
  { label: 'London, GB', value: 'London' },
  { label: 'Tokyo, JP', value: 'Tokyo' },
  { label: 'Sydney, AU', value: 'Sydney' }
];

// PUBLIC_INTERFACE
export function WeatherWidget({ showEnvDebug = false, defaultCity = 'New York', selectedDate = null }) {
  /**
   * PUBLIC_INTERFACE
   * Sticky weather widget showing current conditions and tips.
   * No longer requests geolocation. The user selects a city via dropdown or inputs manually.
   * Fetches current weather or forecast for the chosen city using OpenWeatherMap.
   * - showEnvDebug (boolean): when true, shows masked env and issues to help verify .env is loaded.
   * - defaultCity (string): default city to load when nothing is selected.
   * - selectedDate (Date | null): when provided, fetches forecast for this date instead of current weather
   */
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [diagnostic, setDiagnostic] = useState(null);

  // city selection state: dropdown + manual input
  const [city, setCity] = useState(defaultCity);
  const [customCity, setCustomCity] = useState('');

  // compute env validation once for logging/debugging
  const envValidation = useMemo(() => validateWeatherEnv(), []);

  useEffect(() => {
    // Log env status once to assist diagnosis without exposing secrets
    // eslint-disable-next-line no-console
    console.info('[WeatherWidget] Env validation:', {
      ok: envValidation.ok,
      issues: envValidation.issues,
      values: envValidation.values, // masked
    });
  }, [envValidation]);

  // capture config diagnostics early
  useEffect(() => {
    const status = getWeatherConfigStatus();
    if (!status.ok) {
      setDiagnostic(status);
    }
  }, []);

  // Helper to perform fetch by the current effective city
  const fetchForCity = async (targetCity, targetDate = null) => {
    setLoading(true);
    setError('');
    try {
      let w;
      if (targetDate) {
        w = await fetchForecastByCity(targetCity || defaultCity, targetDate);
      } else {
        w = await fetchWeatherByCity(targetCity || defaultCity);
      }
      setWeather(w);
    } catch (e) {
      setError(e?.message || 'Unable to fetch weather data.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when city or selected date changes
  useEffect(() => {
    fetchForCity(city || defaultCity, selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, defaultCity, selectedDate]);

  // Handlers
  const onPresetChange = (e) => {
    const nextCity = e.target.value;
    setCity(nextCity);
    setCustomCity('');
    fetchForCity(nextCity);
  };

  const onCustomInputChange = (e) => {
    setCustomCity(e.target.value);
  };

  const onApplyCustom = (e) => {
    e.preventDefault();
    const trimmed = customCity.trim();
    if (!trimmed) return;
    setCity(trimmed);
    fetchForCity(trimmed);
  };

  const recs = weather ? getRecommendations(weather.current?.description) : [];

  return (
    <div className="card" style={styles.card} aria-live="polite">
      <div style={styles.header}>
        <span style={styles.badge}>Live Weather</span>
      </div>

      {showEnvDebug && (
        <div className="small" style={{ color: envValidation.ok ? 'var(--subtle)' : 'var(--error)', marginBottom: 8 }}>
          Env: baseUrl={envValidation.values.baseUrl} | apiKey={envValidation.values.apiKey}
          {!envValidation.ok && envValidation.issues.length ? ` | Issues: ${envValidation.issues.join(' | ')}` : ''}
        </div>
      )}

      {diagnostic && (
        <div className="small" style={{ color: 'var(--error)', marginBottom: 8 }}>
          Configuration issue: {diagnostic.issues.join(' | ')}{diagnostic.apiKeyMasked ? ` (key: ${diagnostic.apiKeyMasked})` : ''}
        </div>
      )}

      {/* City selection UI */}
      <div style={{ marginBottom: 10 }}>
        <label htmlFor="presetCity">City</label>
        <select id="presetCity" value={city} onChange={onPresetChange} aria-label="Select city">
          {PRESET_CITIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
          {/* Ensure default city appears if not in presets */}
          {!PRESET_CITIES.some(c => c.value === defaultCity) && (
            <option value={defaultCity}>{defaultCity}</option>
          )}
        </select>
        <form onSubmit={onApplyCustom} style={{ marginTop: 8 }}>
          <label htmlFor="customCity">Or enter a city</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              id="customCity"
              type="text"
              placeholder="e.g., Paris"
              value={customCity}
              onChange={onCustomInputChange}
              aria-label="Enter a city name"
            />
            <button className="btn" type="submit" aria-label="Apply custom city">Apply</button>
          </div>
          <div className="small" style={{ marginTop: 4, color: 'var(--subtle)' }}>
            Default: {defaultCity}. Weather is fetched only for the selected/entered city.
          </div>
        </form>
      </div>

      {loading && <div className="small">Fetching weather...</div>}
      {!loading && error && <div style={{ color: 'var(--error)' }} className="small">{error}</div>}
      {!loading && weather && !error && (
        <>
          <div style={styles.row}>
            <div style={{ fontSize: 36 }}>{iconFor(weather.current?.icon)}</div>
            <div>
              {weather.current ? (
                <>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>{weather.current.temp}°C</div>
                  <div className="small" style={{ textTransform: 'capitalize' }}>{weather.current.description}</div>
                  {weather.source === 'forecast' && weather.current.at && (
                    <div className="small" style={{ color: 'var(--secondary)' }}>
                      Forecast for {new Date(weather.current.at).toLocaleString()}
                    </div>
                  )}
                  {(weather.location?.name || weather.location?.country) && (
                    <div className="small" style={{ marginTop: 4 }}>
                      {weather.location?.name}{weather.location?.country ? `, ${weather.location.country}` : ''}
                    </div>
                  )}
                </>
              ) : (
                <div className="small" style={{ color: 'var(--error)' }}>
                  {weather.meta?.message || 'No forecast available for the selected date'}
                </div>
              )}
            </div>
          </div>
          {weather.current && (
            <div style={{ marginTop: 10 }}>
              <h4 style={{ margin: '0 0 8px' }}>Suggestions</h4>
              <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--subtle)' }}>
                {recs.map((r, idx) => <li key={idx}>{r}</li>)}
              </ul>
            </div>
          )}
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
