import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './forgot-password.css';

const ForgotPassword = () => {
  console.log('ForgotPassword component rendered');
  
  useEffect(() => {
    console.log('ForgotPassword component mounted');
  }, []);

  const [email, setEmail] = useState('');
  const [passkey, setPasskey] = useState('');
  const [usePasskey, setUsePasskey] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (usePasskey) {
      if (!passkey) {
        setError('Please enter your passkey');
        return;
      }
      // Simulate passkey authentication
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      setLoading(false);
      return;
    }

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      // Here you would typically make an API call to your backend
      // For example:
      // await axios.post('/api/forgot-password', { email });
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h1>Forgot Password</h1>
        <p className="description">
          {usePasskey
            ? "Enter your passkey to access your account."
            : "Enter your email address and we'll send you a link to reset your password."}
        </p>
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <button
            type="button"
            className="toggle-mode"
            onClick={() => {
              setUsePasskey((prev) => !prev);
              setError('');
              setSuccess(false);
              setLoading(false);
            }}
            disabled={loading}
          >
            {usePasskey ? 'Use Email Instead' : 'Use Passkey Instead'}
          </button>
        </div>
        {/* Modern Modal for Passkey */}
        {usePasskey && (
          <div className="modal-overlay">
            <div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="passkey-modal-title">
              <h2 id="passkey-modal-title">Enter Passkey</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="passkey">Passkey</label>
                  <input
                    type="password"
                    id="passkey"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    placeholder="Enter your passkey"
                    disabled={loading}
                    autoFocus
                  />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? 'Authenticating...' : 'Enter with Passkey'}
                </button>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => {
                    setUsePasskey(false);
                    setPasskey('');
                    setError('');
                  }}
                  disabled={loading}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
        {/* End Modal */}
        {!usePasskey && (success ? (
          <div className="success-message">
            <p>Password reset link has been sent to your email!</p>
            <p>Redirecting to login page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <button 
              type="button" 
              className="back-to-login"
              onClick={() => navigate('/login')}
              disabled={loading}
            >
              Back to Login
            </button>
          </form>
        ))}
      </div>
    </div>
  );
};

export default ForgotPassword;
