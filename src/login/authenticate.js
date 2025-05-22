import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from './authenticate';
import './login.css'; // Reuse login styles

function AuthenticatePage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = authenticateUser(username, password);
    
    if (result.success) {
      // Redirect to home page on successful login
      navigate('/');
    } else {
      setError(result.message || 'Authentication failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>Authentication</h1>
        {error && <div className="error-message">{error}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Authenticate</button>
        </form>
      </div>
    </div>
  );
}

export default AuthenticatePage;