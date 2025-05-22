import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <img src="/cic group logo.png" alt="CIC Group Logo" className="home-logo" />
        <h1 className="home-title">Risk and Compliance</h1>
        <div className="home-underline"></div>
        <p className="home-subtitle">
          Comprehensive solutions for managing organizational risks and ensuring regulatory compliance
        </p>
      </header>
      <main className="home-main">
        <div className="home-cards">
          <Link to="/risk" className="home-card" style={{ textDecoration: 'none' }}>
            <span className="home-card-icon">⚙️</span>
            <div className="home-card-title">Risk</div>
            <div className="home-card-underline"></div>
          </Link>
          <Link to="/ict-risk" className="home-card" style={{ textDecoration: 'none' }}>
            <span className="home-card-icon">💻</span>
            <div className="home-card-title">ICT Risk</div>
            <div className="home-card-underline"></div>
          </Link>
          <div className="home-card">
            <span className="home-card-icon">🔍</span>
            <div className="home-card-title">Fraud</div>
            <div className="home-card-underline"></div>
          </div>
          <div className="home-card">
            <span className="home-card-icon">📋</span>
            <div className="home-card-title">Compliance</div>
            <div className="home-card-underline"></div>
          </div>
          <div className="home-card">
            <span className="home-card-icon">🔒</span>
            <div className="home-card-title">Security</div>
            <div className="home-card-underline"></div>
          </div>
          <div className="home-card">
            <span className="home-card-icon">🛡️</span>
            <div className="home-card-title">Data Protection</div>
            <div className="home-card-underline"></div>
          </div>
        </div>
      </main>
      <footer className="home-footer">
        © 2025 CIC Insurance Group. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;