import React from 'react';
import '../home/home.css';

function RiskPage() {
  return (
    <div className="home-container">
      <header className="home-header">
        <img src="/cicgrouplogo.png" alt="CIC Group Logo" className="home-logo" />
        <h1 className="home-title">Risk Management</h1>
        <div className="home-underline"></div>
        <p className="home-subtitle">
          Comprehensive risk assessment and management solutions
        </p>
      </header>
      <main className="home-main">
        <div className="risk-content">
          <h2>Risk Management Dashboard</h2>
          <div className="risk-cards">
            <div className="risk-card">
              <h3>Risk Assessment</h3>
              <p>Evaluate and analyze potential risks</p>
            </div>
            <div className="risk-card">
              <h3>Risk Monitoring</h3>
              <p>Track and monitor risk indicators</p>
            </div>
            <div className="risk-card">
              <h3>Risk Reports</h3>
              <p>Generate comprehensive risk reports</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="home-footer">
        © 2025 CIC Insurance Group. All rights reserved.
      </footer>
    </div>
  );
}

export default RiskPage; 