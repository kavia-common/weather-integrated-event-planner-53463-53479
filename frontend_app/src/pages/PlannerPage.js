import React, { useState } from 'react';
import { Calendar } from '../components/calendar/Calendar';
import { Sidebar } from '../components/layout/Sidebar';
import { BookingForm } from '../components/booking/BookingForm';

// PUBLIC_INTERFACE
export function PlannerPage() {
  /** Planner page with main grid: calendar + booking form + weather/tips, all scrolling together */
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="grid" style={{ gridTemplateColumns: '1.2fr 0.8fr', gap: 16, alignItems: 'start' }}>
      <div>
        <section className="card" style={{ padding: 16 }}>
          <h2 style={{ marginTop: 0 }}>Plan your perfect event</h2>
          <p className="small" style={{ marginTop: 0 }}>
            Choose a date on the calendar. Check live weather and get actionable recommendations.
          </p>
          <Calendar value={selectedDate} onChange={setSelectedDate} />
        </section>
        <section className="card" style={{ padding: 16, marginTop: 16 }}>
          <h3 style={{ marginTop: 0 }}>Recommendations</h3>
          <p className="small" style={{ marginTop: 0 }}>
            Recommendations will adapt to current weather shown in the sidebar. Select your date and proceed to booking.
          </p>
          <ul style={{ marginTop: 8, paddingLeft: 18 }}>
            {selectedDate ? (
              <li className="small">Selected date: {selectedDate.toDateString()}</li>
            ) : (
              <li className="small">Pick a date to get started.</li>
            )}
            <li className="small">Consider travel time and venue availability.</li>
            <li className="small">Check vendor lead times for catering and AV.</li>
          </ul>
        </section>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
        <BookingForm defaultDate={selectedDate} />
        <Sidebar />
      </div>
    </div>
  );
}
