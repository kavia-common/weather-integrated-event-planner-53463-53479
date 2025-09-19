const BASE_URL = process.env.REACT_APP_WEATHER_API_BASE_URL || '';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || '';
const DEFAULT_CITY = 'New York'; // Used when geolocation is unavailable or denied

// Validate that BASE_URL resembles a full OpenWeather endpoint.
// Accept typical forms like: https://api.openweathermap.org/data/2.5/weather
function isLikelyValidBaseUrl(url) {
  if (!url) return false;
  try {
    const u = new URL(url);
    // Require path to include '/weather' (current weather endpoint) and https protocol
    return u.protocol.startsWith('http') && /\/weather$/.test(u.pathname);
  } catch {
    return false;
  }
}

// Mask API key for diagnostics (keep last 4 chars)
function maskKey(key) {
  if (!key) return '';
  const len = String(key).length;
  if (len <= 4) return '****';
  return `${'*'.repeat(Math.max(0, len - 4))}${key.slice(-4)}`;
}

// PUBLIC_INTERFACE
export function getWeatherConfigStatus() {
  /**
   * Provides a detailed status of the weather API configuration,
   * useful for surfacing actionable diagnostics in the UI.
   */
  const okBase = isLikelyValidBaseUrl(BASE_URL);
  const okKey = !!API_KEY;
  return {
    ok: okBase && okKey,
    baseUrl: BASE_URL || '',
    apiKeyMasked: maskKey(API_KEY),
    issues: [
      ...(okBase ? [] : ['REACT_APP_WEATHER_API_BASE_URL is missing or not a full endpoint (e.g., https://api.openweathermap.org/data/2.5/weather)']),
      ...(okKey ? [] : ['REACT_APP_WEATHER_API_KEY is missing']),
    ]
  };
}

/**
 * PUBLIC_INTERFACE
 * fetchWeatherByCoords fetches current weather by geographic coordinates using OpenWeatherMap.
 * Env required:
 * - REACT_APP_WEATHER_API_BASE_URL (string): weather API base URL (e.g., https://api.openweathermap.org/data/2.5/weather)
 * - REACT_APP_WEATHER_API_KEY (string): API key
 * Throws on missing env or failed response.
 */
export async function fetchWeatherByCoords(lat, lon) {
  const status = getWeatherConfigStatus();
  if (!status.ok) {
    throw new Error(`Missing/invalid weather API configuration. Issues: ${status.issues.join('; ')}`);
  }

  const url = `${BASE_URL}?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=${encodeURIComponent(API_KEY)}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    // Provide more context for debugging
    throw new Error(
      `Weather API error: HTTP ${res.status}. URL: ${BASE_URL} (query hidden). Key: ${status.apiKeyMasked}. Body: ${txt}`.trim()
    );
  }
  const data = await res.json();

  return normalizeOpenWeather(data);
}

/**
 * PUBLIC_INTERFACE
 * fetchWeatherByCity fetches current weather by city name using OpenWeatherMap.
 * Useful as a fallback when geolocation is unavailable.
 */
export async function fetchWeatherByCity(cityName = DEFAULT_CITY) {
  const status = getWeatherConfigStatus();
  if (!status.ok) {
    throw new Error(`Missing/invalid weather API configuration. Issues: ${status.issues.join('; ')}`);
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(cityName)}&appid=${encodeURIComponent(API_KEY)}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(
      `Weather API error: HTTP ${res.status}. URL: ${BASE_URL} (query hidden). Key: ${status.apiKeyMasked}. Body: ${txt}`.trim()
    );
  }
  const data = await res.json();

  return normalizeOpenWeather(data);
}

// Normalize OpenWeather response into a minimal shape for the widget
function normalizeOpenWeather(data) {
  const iconMain = data?.weather?.[0]?.main || 'Clear';
  return {
    source: 'live',
    location: {
      name: data?.name || '',
      country: data?.sys?.country || ''
    },
    current: {
      temp: Math.round(data?.main?.temp ?? 20),
      description: data?.weather?.[0]?.description ?? 'clear sky',
      icon: iconMain
    }
  };
}

/**
 * PUBLIC_INTERFACE
 * getRecommendations returns planning recommendations based on weather description.
 */
export function getRecommendations(weatherDescription) {
  const desc = (weatherDescription || '').toLowerCase();
  if (desc.includes('rain') || desc.includes('storm')) {
    return [
      'Consider indoor venues or covered spaces.',
      'Offer umbrellas or ponchos for guests.',
      'Plan warm beverages or comfort food.'
    ];
  }
  if (desc.includes('snow')) {
    return [
      'Arrange heating and warm shelters.',
      'Choose venues with robust accessibility.',
      'Hot drinks and seasonal decor enhance ambiance.'
    ];
  }
  if (desc.includes('cloud') || desc.includes('overcast')) {
    return [
      'Soft lighting can elevate mood.',
      'Great chance for even lighting in photos.',
      'Consider afternoon timeslots.'
    ];
  }
  if (desc.includes('clear') || desc.includes('sun')) {
    return [
      'Outdoor venues are ideal.',
      'Schedule golden hour activities.',
      'Provide sunscreen and hydration.'
    ];
  }
  return [
    'Plan flexible indoor/outdoor options.',
    'Confirm vendor availability for your date.',
    'Use the calendar to avoid conflicts.'
  ];
}
