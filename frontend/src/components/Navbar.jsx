import { useState } from 'react';
import Login from './Login';
import './Navbar.css';
import Signup from './Signup';

const Navbar = ({ user, setUser, setPage }) => {
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
      <div className="navbar-left">
        <img src="src/assets/img/logo.png" alt="Logo" className="logo" />
        <h1 className="website-name">Registration Info LLM</h1>
      </div>
      <div className="nav-buttons">
        <button className="nav-button" onClick={() => setPage('feedback')}>Feedback</button>
        <button className="nav-button" onClick={() => setPage('aboutus')}>About Us</button>
        {user ? (
          <button className="nav-button login-button user-logged-in" onClick={handleLogout}>
            <span className="user-avatar">{user.username.charAt(0).toUpperCase()}</span> {user.username}
          </button>
        ) : (
          <button className="nav-button login-button" onClick={handleLoginClick}>Login</button>
        )}
      </div>
      {showSignup && <Signup onClose={handleSignupClose} />}
      {showLogin && (
        <Login 
          onClose={handleLoginClose} 
          setUser={setUser} 
          onSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
