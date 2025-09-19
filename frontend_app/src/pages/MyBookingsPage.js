import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export function MyBookingsPage() {
  /** Page displaying all stored bookings with a clean, themed design */
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Load bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    // Sort by date, most recent first
    storedBookings.sort((a, b) => new Date(b.date) - new Date(a.date));
    setBookings(storedBookings);
  }, []);

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container">
      <div style={styles.header}>
        <h1 style={styles.title}>My Bookings</h1>
        <Link to="/planner" className="btn">
          Plan New Event
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="card" style={styles.emptyState}>
          <div style={styles.emptyIcon}>📅</div>
          <h3 style={{ color: 'var(--text)', margin: '16px 0' }}>No bookings yet</h3>
          <p style={{ color: 'var(--subtle)', marginBottom: '24px', textAlign: 'center' }}>
            Ready to plan your first event? Use our weather-smart planner to create the perfect occasion!
          </p>
          <Link to="/planner" className="btn">
            Start Planning
          </Link>
        </div>
      ) : (
        <div style={styles.grid}>
          {bookings.map((booking) => (
            <div key={booking.id} className="card" style={styles.bookingCard}>
              <div style={styles.cardHeader}>
                <h3 style={styles.eventTitle}>{booking.title}</h3>
                <span style={styles.badge}>
                  {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
              
              <div style={styles.details}>
                <div style={styles.detailRow}>
                  <span style={styles.label}>Date:</span>
                  <span style={styles.value}>{formatDate(booking.date)}</span>
                </div>
                {booking.time && (
                  <div style={styles.detailRow}>
                    <span style={styles.label}>Time:</span>
                    <span style={styles.value}>
                      {new Date(`2000-01-01T${booking.time}`).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric'
                      })}
                    </span>
                  </div>
                )}
                <div style={styles.detailRow}>
                  <span style={styles.label}>Contact:</span>
                  <span style={styles.value}>{booking.name}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.label}>Email:</span>
                  <span style={styles.value}>{booking.email}</span>
                </div>
                {booking.notes && (
                  <div style={styles.notes}>
                    <span style={styles.label}>Notes:</span>
                    <p style={styles.noteText}>{booking.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32
  },
  title: {
    margin: 0,
    fontSize: '2rem',
    color: 'var(--text)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 24,
    padding: '8px 0'
  },
  bookingCard: {
    padding: 24,
    transition: 'transform 200ms ease, box-shadow 200ms ease',
    cursor: 'default',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: 'var(--shadow-md)'
    }
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12
  },
  eventTitle: {
    margin: 0,
    fontSize: '1.25rem',
    color: 'var(--primary)',
    wordBreak: 'break-word'
  },
  badge: {
    fontSize: '0.875rem',
    padding: '4px 8px',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--accent)',
    color: 'white',
    whiteSpace: 'nowrap'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12
  },
  label: {
    color: 'var(--subtle)',
    fontSize: '0.875rem'
  },
  value: {
    color: 'var(--text)',
    fontSize: '0.875rem',
    textAlign: 'right',
    wordBreak: 'break-word'
  },
  notes: {
    marginTop: 8,
    padding: '12px 0',
    borderTop: '1px solid var(--border)'
  },
  noteText: {
    margin: '8px 0 0',
    color: 'var(--text)',
    fontSize: '0.875rem',
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap'
  },
  emptyState: {
    textAlign: 'center',
    padding: '48px 24px',
    maxWidth: 400,
    margin: '0 auto'
  },
  emptyIcon: {
    fontSize: '48px'
  }
};
