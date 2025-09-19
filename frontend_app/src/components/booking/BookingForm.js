import React, { useState } from 'react';

// PUBLIC_INTERFACE
export function BookingForm({ defaultDate }) {
  /**
   * PUBLIC_INTERFACE
   * Booking form for planner page (participates in normal flow; no sticky positioning).
   * - defaultDate: Date | null
   */
  const [form, setForm] = useState({
    name: '',
    email: '',
    title: '',
    date: defaultDate ? defaultDate.toISOString().slice(0,10) : '',
    time: '',
    guests: 10,
    notes: ''
  });
  const [message, setMessage] = useState('');

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.title || !form.date) {
      setMessage('Please fill the required fields.');
      return;
    }
    // In real app, send to backend API
    setMessage('Your event has been tentatively booked! A confirmation email will be sent.');
  };

  return (
    <form onSubmit={submit} className="card" style={styles.form} aria-label="Booking form">
      <h3 style={{ marginTop: 0, marginBottom: 8 }}>Book Your Event</h3>
      <p className="small" style={{ marginTop: 0 }}>Plan with WeatherWise tips. Fields with * are required.</p>

      <div style={styles.field}>
        <label htmlFor="name">Name *</label>
        <input id="name" name="name" value={form.name} onChange={update} placeholder="Jane Doe" />
      </div>

      <div style={styles.field}>
        <label htmlFor="email">Email *</label>
        <input id="email" name="email" type="email" value={form.email} onChange={update} placeholder="jane@example.com" />
      </div>

      <div style={styles.field}>
        <label htmlFor="title">Event Title *</label>
        <input id="title" name="title" value={form.title} onChange={update} placeholder="Company Retreat" />
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={styles.field}>
          <label htmlFor="date">Date *</label>
          <input id="date" name="date" type="date" value={form.date} onChange={update} />
        </div>
        <div style={styles.field}>
          <label htmlFor="time">Time</label>
          <input id="time" name="time" type="time" value={form.time} onChange={update} />
        </div>
      </div>

      <div style={styles.field}>
        <label htmlFor="guests">Guests</label>
        <input id="guests" name="guests" type="number" min="1" value={form.guests} onChange={update} />
      </div>

      <div style={styles.field}>
        <label htmlFor="notes">Notes</label>
        <textarea id="notes" name="notes" rows="3" value={form.notes} onChange={update} placeholder="Preferences, special requests..." />
      </div>

      {message && <div className="small" style={{ color: message.includes('Please') ? 'var(--error)' : 'var(--secondary)' }}>{message}</div>}

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button type="submit" className="btn">Book Event</button>
        <button type="reset" className="btn btn-ghost" onClick={() => { setForm({ ...form, title: '', notes: '' }); setMessage(''); }}>
          Reset
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  field: {
    marginBottom: 6
  }
};
