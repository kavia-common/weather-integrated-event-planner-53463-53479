import React from 'react';
import { WeatherWidget } from '../weather/WeatherWidget';

// PUBLIC_INTERFACE
export function Sidebar() {
  /** Sticky sidebar showing weather and suggestions */
  return (
    <aside style={styles.aside}>
      <div style={styles.sticky}>
        <WeatherWidget />
        <div className="card" style={{ padding: 16, marginTop: 16 }}>
          <h4 style={{ margin: '0 0 8px' }}>Planning Tips</h4>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--subtle)' }}>
            <li>Consider indoor venues on rainy days.</li>
            <li>Golden hour: 1 hour before sunset for photos.</li>
            <li>Weekdays often have better availability.</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

const styles = {
  aside: {
    width: '100%',
    maxWidth: 340
  },
  sticky: {
    position: 'sticky',
    top: 84
  }
};
