import './MainContent.css';

const MainContent = ({ onNavigate }) => {
  return (
    <div className="main-content">
      <div className="text-content">
        <h2 className="main-title">Welcome to Registration Info LLM</h2>
        <p className="main-description">
          Our intelligent information system is designed to streamline the Registration Department's services, including property registration, stamp duty information, marriage registration, and market value inquiries. Using advanced AI and natural language processing, our chatbot provides real-time, accurate responses to your queries. This ensures you get the information you need quickly and efficiently. The platform is continuously updated to reflect the latest regulations and requirements, making it your reliable source for registration-related information. Explore our website to experience hassle-free access to essential services.
        </p>
        <div className="main-highlight">
          The Registration Info LLM project aims to develop an information system for the Registration Department. This system will ensure <span className="highlight">accuracy</span>, <span className="highlight">transparency</span>, and <span className="highlight">easy access</span> to information for stakeholders, benefiting various departments and solving specific problems related to property registration, stamp duty information, marriage registration, and market value inquiries.
        </div>
      </div>
      <div className="buttons">
        <button className="content-button land" onClick={() => onNavigate('land')}>Land Registration</button>
        <button className="content-button marriage" onClick={() => onNavigate('marriage')}>Marriage Registration</button>
        <button className="content-button firm" onClick={() => onNavigate('firm')}>Firm Registration</button>
      </div>
    </div>
  );
};

export default MainContent;
