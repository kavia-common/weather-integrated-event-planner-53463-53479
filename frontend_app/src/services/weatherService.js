const BASE_URL = process.env.REACT_APP_WEATHER_API_BASE_URL || '';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || '';
const DEFAULT_CITY = 'New York'; // Used when geolocation is unavailable or denied

/**
 * PUBLIC_INTERFACE
 * fetchWeatherByCoords fetches current weather by geographic coordinates using OpenWeatherMap.
 * Env required:
 * - REACT_APP_WEATHER_API_BASE_URL (string): weather API base URL (e.g., https://api.openweathermap.org/data/2.5/weather)
 * - REACT_APP_WEATHER_API_KEY (string): API key
 * Throws on missing env or failed response.
 */
export async function fetchWeatherByCoords(lat, lon) {
  if (!BASE_URL || !API_KEY) {
    throw new Error('Missing weather API configuration. Please set REACT_APP_WEATHER_API_BASE_URL and REACT_APP_WEATHER_API_KEY in .env');
  }

  const url = `${BASE_URL}?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=${encodeURIComponent(API_KEY)}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`Weather API error: ${res.status} ${txt}`.trim());
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
  if (!BASE_URL || !API_KEY) {
    throw new Error('Missing weather API configuration. Please set REACT_APP_WEATHER_API_BASE_URL and REACT_APP_WEATHER_API_KEY in .env');
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(cityName)}&appid=${encodeURIComponent(API_KEY)}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`Weather API error: ${res.status} ${txt}`.trim());
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
