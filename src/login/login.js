import React, { useState } from 'react';  
import '../login/login.css';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import WindowsLogo from '../Assets/Windows_logo.png';

function Login() {
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaValue) {
      alert('Please complete the CAPTCHA verification');
      return;
    }
    // Proceed with login logic here
    // Simulate successful authentication, then redirect
    navigate('/dashboard');
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleMicrosoftLogin = () => {
    // TODO: Integrate Microsoft authentication here using MSAL.js or similar
    alert('Microsoft login is not yet implemented.');
  };

  return (
    <div className="login-container">
      <div className="login-content"> 
        <div className="logo-container">
          <img src="/cic group logo.png" alt="CIC Insurance Group Logo" className="logo" />
        </div>
        <h1>Welcome Back</h1>
        <p className="welcome-text">Please login to access your account</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" placeholder="Username" required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" required />
          </div>
          <div className="captcha-container">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={handleCaptchaChange}
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          <div className="divider">
            <span>or</span>
          </div>
          <button type="button" className="microsoft-login-button" onClick={handleMicrosoftLogin}>
            <img src={WindowsLogo} alt="Windows" className="microsoft-icon" />
            Sign in with Windows
          </button>
        </form>
        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
          <p><Link to="/forgot-password">Forgot Password?</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
