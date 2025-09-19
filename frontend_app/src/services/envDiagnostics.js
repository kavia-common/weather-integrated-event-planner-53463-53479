const mask = (value) => {
  if (!value) return '';
  const s = String(value);
  if (s.length <= 4) return '****';
  return `${'*'.repeat(Math.max(0, s.length - 4))}${s.slice(-4)}`;
};

// PUBLIC_INTERFACE
export function getInjectedEnv() {
  /**
   * Returns the CRA-injected environment variables relevant to weather config.
   * Values are returned raw and masked; use masked in UI/logs.
   */
  const baseUrl = process.env.REACT_APP_WEATHER_API_BASE_URL || '';
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY || '';
  return {
    baseUrl,
    apiKey,
    masked: {
      baseUrl: baseUrl || '(empty)',
      apiKey: mask(apiKey),
    }
  };
}

// PUBLIC_INTERFACE
export function validateWeatherEnv() {
  /**
   * Validates envs expected by the weather service.
   * Provides actionable issues and masked values for safe display.
   */
  const { baseUrl, apiKey, masked } = getInjectedEnv();
  let issues = [];
  let okBase = false;

  if (!baseUrl) {
    issues.push('REACT_APP_WEATHER_API_BASE_URL is missing');
  } else {
    try {
      const u = new URL(baseUrl);
      okBase = u.protocol.startsWith('http') && /\/weather$/.test(u.pathname);
      if (!okBase) {
        issues.push('REACT_APP_WEATHER_API_BASE_URL is not a full endpoint (e.g., https://api.openweathermap.org/data/2.5/weather)');
      }
    } catch {
      issues.push('REACT_APP_WEATHER_API_BASE_URL is not a valid URL');
    }
  }

  const okKey = !!apiKey;
  if (!okKey) {
    issues.push('REACT_APP_WEATHER_API_KEY is missing');
  }

  return {
    ok: okBase && okKey,
    issues,
    values: {
      baseUrl: masked.baseUrl,
      apiKey: masked.apiKey
    }
  };
}
