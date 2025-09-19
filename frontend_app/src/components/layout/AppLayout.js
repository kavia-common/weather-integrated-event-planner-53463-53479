import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

// PUBLIC_INTERFACE
export function AppLayout({ children }) {
  /** Layout wrapper with header and footer */
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main className="container" style={{ padding: '20px 0', flex: 1, background: 'transparent' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
