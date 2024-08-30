import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import MainContent from './components/MainContent.jsx';
import Chatbot from './components/Chatbot.jsx';
import Feedback from './components/Feedback.jsx';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'home':
        return (
          <div className="content-container">
            <div className="left-section">
              <MainContent />
            </div>
            <div className="right-section">
              <Chatbot user={user} setPage={setPage} />
            </div>
          </div>
        );
      case 'feedback':
        return <Feedback user={user} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Navbar user={user} setPage={setPage} setUser={setUser} />
      {renderPage()}
    </div>
  );
}

export default App;
