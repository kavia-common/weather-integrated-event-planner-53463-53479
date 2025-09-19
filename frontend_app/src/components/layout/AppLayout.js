import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

// PUBLIC_INTERFACE
export function AppLayout({ children }) {
  /** Layout wrapper with header and footer */
  return (
    <div>
      <Header />
      <main className="container" style={{ padding: '20px 0' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
