import React, { useState } from 'react';
import { Calendar } from '../components/calendar/Calendar';
import { Sidebar } from '../components/layout/Sidebar';
import { BookingForm } from '../components/booking/BookingForm';

// PUBLIC_INTERFACE
export function PlannerPage() {
  /** Planner page with main grid: calendar + booking form + weather/tips, all scrolling together */
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="grid" style={{ 
      gridTemplateColumns: 'minmax(350px, 1fr) minmax(300px, 1fr)', 
      gap: 12, 
      alignItems: 'start',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <section className="card" style={{ padding: 12 }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: 0, marginBottom: 8 }}>Plan your perfect event</h2>
        <p className="small" style={{ marginTop: 0, marginBottom: 12 }}>
          Choose a date on the calendar. Check live weather and get actionable recommendations.
        </p>
        <Calendar value={selectedDate} onChange={setSelectedDate} />
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
        <BookingForm defaultDate={selectedDate} />
        <Sidebar selectedDate={selectedDate} />
      </div>
    </div>
  );
}
