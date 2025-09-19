import React, { useState } from 'react';
import { Calendar } from '../components/calendar/Calendar';
import { Sidebar } from '../components/layout/Sidebar';
import { BookingForm } from '../components/booking/BookingForm';

// PUBLIC_INTERFACE
export function PlannerPage() {
  /** Planner page with main grid: calendar + booking form + weather/tips, all scrolling together */
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '20px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <section className="card" style={{ padding: '16px', maxWidth: '450px' }}>
          <h2 style={{ fontSize: '1.5rem', marginTop: 0, marginBottom: 8 }}>Plan your perfect event</h2>
          <p className="small" style={{ marginTop: 0, marginBottom: 12 }}>
            Choose a date on the calendar. Check live weather and get actionable recommendations.
          </p>
          <Calendar value={selectedDate} onChange={setSelectedDate} />
        </section>
        <Sidebar selectedDate={selectedDate} />
      </div>

      <div style={{ maxWidth: '450px' }}>
        <BookingForm defaultDate={selectedDate} />
      </div>
    </div>
  );
}
