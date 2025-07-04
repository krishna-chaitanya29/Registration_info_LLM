import './MainContent.css';

const Aboutus = () => (
  <div className="main-content">
    <div className="text-content">
      <h2 className="main-title">About Us</h2>
      <p className="main-description">
        <b>Registration Info LLM</b> is a next-generation information system designed to bring transparency, accuracy, and efficiency to the Registration Department. Our mission is to empower citizens and officials with easy access to property registration, stamp duty, marriage registration, and market value information using advanced AI and natural language processing.
      </p>
      <div className="main-highlight">
        <b>Our Vision:</b> To make registration services accessible, reliable, and user-friendly for everyone.<br /><br />
        <b>Our Team:</b> We are a group of passionate technologists, legal experts, and public service advocates dedicated to digital transformation in government services.<br /><br />
        <b>Contact:</b> For queries or support, email us at <a href="mailto:support@registrationinfo.com" style={{color:'#4f8cff'}}>support@registrationinfo.com</a>
      </div>
    </div>
  </div>
);

export default Aboutus;
