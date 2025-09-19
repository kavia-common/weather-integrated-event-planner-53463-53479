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
      gridTemplateColumns: '340px 380px 380px',
      gap: '16px',
      maxWidth: '1200px',
      margin: '0 auto',
      alignItems: 'start'
    }}>
      {/* Left column - Calendar */}
      <section className="card" style={{ padding: '16px' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: 0, marginBottom: 8 }}>Plan your perfect event</h2>
        <p className="small" style={{ marginTop: 0, marginBottom: 12 }}>
          Choose a date on the calendar. Check live weather and get actionable recommendations.
        </p>
        <Calendar value={selectedDate} onChange={setSelectedDate} />
      </section>

      {/* Middle column - Weather */}
      <Sidebar selectedDate={selectedDate} />

      {/* Right column - Booking Form */}
      <BookingForm defaultDate={selectedDate} />
    </div>
  );
}
