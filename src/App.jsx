import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeVerification from './pages/EmployeeVerification';
import AnomalyDetection from './pages/AnomalyDetection';
import Employees from './pages/Employees';
import EmployeeProfile from './pages/EmployeeProfile';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/verify" element={<EmployeeVerification />} />
          <Route path="/anomalies" element={<AnomalyDetection />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeProfile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
