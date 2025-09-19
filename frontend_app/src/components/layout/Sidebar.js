import React from 'react';
import { WeatherWidget } from '../weather/WeatherWidget';

// PUBLIC_INTERFACE
export function Sidebar({ selectedDate }) {
  /** 
   * Sidebar with weather and suggestions (normal flow, not sticky)
   * - selectedDate: Date | null - The currently selected date from calendar
   */
  return (
    <aside style={styles.aside}>
      {/* Weather widget and tips now scroll with the page to avoid overlap */}
      <WeatherWidget selectedDate={selectedDate} />
      <div className="card" style={{ padding: 16, marginTop: 16 }}>
        <h4 style={{ margin: '0 0 8px' }}>Planning Tips</h4>
        <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--subtle)' }}>
          <li>Consider indoor venues on rainy days.</li>
          <li>Golden hour: 1 hour before sunset for photos.</li>
          <li>Weekdays often have better availability.</li>
        </ul>
      </div>
    </aside>
  );
}

const styles = {
  aside: {
    width: '100%',
    maxWidth: 340
  }
};
