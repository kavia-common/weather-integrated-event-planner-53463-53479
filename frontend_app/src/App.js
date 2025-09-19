import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { PlannerPage } from './pages/PlannerPage';

// PUBLIC_INTERFACE
function App() {
  /** Root app component mounting the router and layout shell */
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/planner" element={<PlannerPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
