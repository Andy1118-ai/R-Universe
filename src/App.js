import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/home';
import RiskPage from './risk/risk';
import Compliance from './compliance/compliance';
import IctRiskPage from './ict-risk/ict-risk';
import FraudPage from './fraud/fraud';
import Login from './login/login';
import Register from './register/register';
import ForgotPassword from './forgot-password/forgot-password';
import Dashboard from './dashboard/dashboard';

function App() {
  console.log('App component rendered');

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/risk" element={<RiskPage />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/ict-risk" element={<IctRiskPage />} />
          <Route path="/fraud" element={<FraudPage />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/microsoft-login" element={<MicrosoftLogin />} /> */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
  );
}

export default App;
