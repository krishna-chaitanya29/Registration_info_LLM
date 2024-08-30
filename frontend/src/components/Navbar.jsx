import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';
import Signup from './Signup';
import Login from './Login';

const Navbar = ({ user, setUser }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleSignupClose = () => {
    setShowSignup(false);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="navbar">
      <img src="src/assets/img/logo.png" alt="Logo" className="logo" />
      <h1 className="website-name">Registration Info LLM</h1>
      <div className="nav-buttons">
        <button className="nav-button" onClick={() => window.location.href = '/feedback'}>Feedback</button>
        <button className="nav-button">About Us</button>
        {user ? (
          <button className="nav-button login-button" onClick={handleLogout} style={{ backgroundImage: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' }}>
            {user.username}
          </button>
        ) : (
          <button className="nav-button login-button" onClick={handleLoginClick}>Login</button>
        )}
      </div>
      {showSignup && <Signup onClose={handleSignupClose} />}
      {showLogin && <Login onClose={handleLoginClose} setUser={setUser} />}
    </nav>
  );
};

export default Navbar;
