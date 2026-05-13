import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';

// Placeholder for missing pages
const Placeholder = ({ name }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
    <h2 className="text-2xl font-bold text-slate-800 mb-4">{name} Page</h2>
    <p className="text-slate-600">This page is currently under development. Please check back later.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Placeholder name="Dashboard" />} />
          <Route path="/verify" element={<Placeholder name="Employee Verification" />} />
          <Route path="/anomalies" element={<Placeholder name="Anomaly Detection" />} />
          <Route path="/employees" element={<Placeholder name="Employees" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
