const BASE_URL = process.env.REACT_APP_WEATHER_API_BASE_URL || '';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || '';

/**
 * PUBLIC_INTERFACE
 * fetchWeatherByCoords fetches current weather by geographic coordinates.
 * Env required:
 * - REACT_APP_WEATHER_API_BASE_URL (string): weather API base URL
 * - REACT_APP_WEATHER_API_KEY (string): API key
 * This function gracefully handles missing env by returning a mocked shape.
 */
export async function fetchWeatherByCoords(lat, lon) {
  if (!BASE_URL || !API_KEY) {
    // Safe fallback to allow UI rendering without real API
    return {
      source: 'mock',
      current: {
        temp: 22,
        description: 'Clear',
        icon: '☀️'
      },
      meta: {
        note: 'Set REACT_APP_WEATHER_API_BASE_URL and REACT_APP_WEATHER_API_KEY in .env to enable live data.'
      }
    };
  }

  // Example assumes an OpenWeather-like API; adapt endpoint/path via env.
  const url = `${BASE_URL}?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=${encodeURIComponent(API_KEY)}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
  const data = await res.json();

  // Normalize response into a minimal shape
  const icon = (data.weather && data.weather[0]?.main) || 'Clear';
  return {
    source: 'live',
    current: {
      temp: Math.round(data.main?.temp ?? 20),
      description: data.weather?.[0]?.description ?? 'clear sky',
      icon
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
