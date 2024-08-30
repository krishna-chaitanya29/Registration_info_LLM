import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const Signup = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5001/signup', { username, password, email });
      alert('Signup successful! Please login.');
      onClose();
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Error signing up.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSignup}>Signup</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Signup;
