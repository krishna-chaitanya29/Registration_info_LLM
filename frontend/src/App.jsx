import { useState } from 'react';
import './App.css';
import Aboutus from './components/Aboutus.jsx';
import Chatbot from './components/Chatbot.jsx';
import Feedback from './components/Feedback.jsx';
import MainContent from './components/MainContent.jsx';
import Navbar from './components/Navbar.jsx';
import FirmRegistration from './components/pages/FirmRegistration.jsx';
import LandRegistration from './components/pages/LandRegistration.jsx';
import MarriageRegistration from './components/pages/MarriageRegistration.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'home':
        return (
          <div className="content-container">
            <div className="left-section">
              <MainContent onNavigate={(p) => {
                if (p === 'land') setPage('land');
                else if (p === 'marriage') setPage('marriage');
                else if (p === 'firm') setPage('firm');
              }} />
            </div>
            <div className="right-section">
              <Chatbot user={user} setPage={setPage} />
            </div>
          </div>
        );
      case 'feedback':
        return <Feedback user={user} />;
      case 'aboutus':
        return <Aboutus />;
      case 'land':
        return <LandRegistration />;
      case 'marriage':
        return <MarriageRegistration />;
      case 'firm':
        return <FirmRegistration />;
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
