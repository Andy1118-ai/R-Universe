import React from 'react';  
import '../risk/risk.css';
import { Link } from 'react-router-dom';

function RiskPage() {
  return (
    <div className="risk-container">
      <header className="risk-header">
      <img src="/cic group logo.png" alt="CIC Group Logo" className="risk-logo" />
        <h1 className="risk-title">Risk and Compliance</h1>
        <div className="risk-underline"></div>
        <p className="risk-subtitle">
          Comprehensive solutions for managing organizational risks and ensuring regulatory compliance
        </p>
      </header>
      <main className="risk-main">
        <div className="risk-cards">
          <Link to="/login" className="risk-card" style={{ textDecoration: 'none' }}>
            <span className="risk-card-icon">⚙️</span>
            <div className="risk-card-title">Risk</div>
            <div className="risk-card-underline"></div>
          </Link>
          <Link to="/ict-risk" className="risk-card" style={{ textDecoration: 'none' }}>
            <span className="risk-card-icon">💻</span>
            <div className="risk-card-title">ICT Risk</div>
            <div className="risk-card-underline"></div>
          </Link>
          <div className="risk-card">
            <span className="risk-card-icon">🔍</span>
            <div className="risk-card-title">Fraud</div>
            <div className="risk-card-underline"></div>
          </div>
        </div>
      </main>
      <footer className="risk-footer">
        © 2025 CIC Insurance Group. All rights reserved.
      </footer>
    </div>
  );
}

export default RiskPage;