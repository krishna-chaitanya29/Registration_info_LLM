import React from 'react';
import './MainContent.css';

const MainContent = () => {
  return (
    <div className="main-content">
      <div className="text-content">
        <h2>Welcome to Registration Info LLM</h2>
        <p>
        Our intelligent information system is designed to streamline the Registration Department's services, including property registration, stamp duty information, marriage registration, and market value inquiries. Using advanced AI and natural language processing, our chatbot provides real-time, accurate responses to your queries. This ensures you get the information you need quickly and efficiently. The platform is continuously updated to reflect the latest regulations and requirements, making it your reliable source for registration-related information. Explore our website to experience hassle-free access to essential services.
        </p>

        <p2>
        The Registration Info LLM project aims to develop an  information system for the Registration Department. This system will ensure accuracy, transparency, and easy access to information for stakeholders, benefiting various departments and solving specific problems related to property registration, stamp duty information, marriage registration, market value inquiries
        </p2>
      </div>
      <div className="buttons" style={{display:'flex',flexDirection:'row',margin:'10px',alignItems:'center'}}>
        <button className="content-button">Land registration</button>
        <button className="content-button">Marriage registration</button>
        <button className="content-button">Firm Registration</button>
      </div>
    </div>
  );
};

export default MainContent;
