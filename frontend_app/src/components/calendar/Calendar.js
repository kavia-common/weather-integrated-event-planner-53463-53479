import React, { useMemo, useState } from 'react';

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

// PUBLIC_INTERFACE
export function Calendar({ value, onChange }) {
  /**
   * PUBLIC_INTERFACE
   * A lightweight monthly calendar for picking a date.
   * - value: Date | null
   * - onChange(date: Date): void
   */
  const today = new Date();
  const [view, setView] = useState({ year: value?.getFullYear() ?? today.getFullYear(), month: value?.getMonth() ?? today.getMonth() });

  const grid = useMemo(() => {
    const days = [];
    const first = getFirstDayOfMonth(view.year, view.month);
    const count = getDaysInMonth(view.year, view.month);
    for (let i = 0; i < first; i++) days.push(null);
    for (let d = 1; d <= count; d++) days.push(new Date(view.year, view.month, d));
    return days;
  }, [view]);

  const prev = () => {
    setView((v) => {
      const m = v.month - 1;
      if (m < 0) return { year: v.year - 1, month: 11 };
      return { ...v, month: m };
    });
  };
  const next = () => {
    setView((v) => {
      const m = v.month + 1;
      if (m > 11) return { year: v.year + 1, month: 0 };
      return { ...v, month: m };
    });
  };

  const monthName = new Date(view.year, view.month, 1).toLocaleString(undefined, { month: 'long', year: 'numeric' });
  const selectedKey = value ? value.toDateString() : null;

  return (
    <div className="card" style={{ padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <button className="btn-ghost" style={styles.navBtn} onClick={prev} aria-label="Previous month">←</button>
        <strong>{monthName}</strong>
        <button className="btn-ghost" style={styles.navBtn} onClick={next} aria-label="Next month">→</button>
      </div>
      <div style={styles.weekdays}>
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d)=>(
          <div key={d} style={styles.weekday}>{d}</div>
        ))}
      </div>
      <div style={styles.grid}>
        {grid.map((d, i)=>(
          <button
            key={i}
            disabled={!d}
            onClick={()=> d && onChange?.(d)}
            style={{
              ...styles.day,
              ...(d ? {} : styles.dayEmpty),
              ...(d && d.toDateString() === new Date().toDateString() ? styles.today : {}),
              ...(d && selectedKey === d.toDateString() ? styles.selected : {})
            }}
          >
            {d?.getDate() ?? ''}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  navBtn: {
    border: '1px solid var(--border)',
    padding: '8px 12px',
    borderRadius: 10,
    cursor: 'pointer'
  },
  weekdays: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    marginBottom: 8,
    color: 'var(--subtle)',
    fontSize: 12
  },
  weekday: {
    textAlign: 'center'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 8
  },
  day: {
    aspectRatio: '1 / 1',
    borderRadius: 12,
    border: '1px solid var(--border)',
    background: 'white',
    boxShadow: 'var(--shadow-sm)',
    cursor: 'pointer'
  },
  dayEmpty: {
    background: '#f3f4f6',
    cursor: 'default'
  },
  today: {
    borderColor: 'var(--secondary)'
  },
  selected: {
    background: 'linear-gradient(180deg, rgba(37,99,235,0.08), white)',
    borderColor: 'var(--primary)'
  }
};
