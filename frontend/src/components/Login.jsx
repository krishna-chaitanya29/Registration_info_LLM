import axios from 'axios';
import { useState } from 'react';
import './Login.css';

const Login = ({ onClose, setUser, onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5001/login', { username, password });
      setUser(response.data);
      onClose();
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-btn" onClick={handleLogin}>Login</button>
        <button className="close-btn" onClick={onClose}>Close</button>
        <div className="login-signup-switch">
          <span>Don't have an account? </span>
          <button className="signup-link" onClick={onSignup}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
