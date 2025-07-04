import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './Chatbot.css';

const Chatbot = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);
  const LLM_URL = 'https://8d7f-35-247-12-84.ngrok-free.app/query'; // Replace with your actual ngrok URL

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  useEffect(() => {
    if (user) {
      fetchChatHistory(user.id);
    }
  }, [user]);

  const fetchChatHistory = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5001/chat-history/${userId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, isUser: true }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post(
        LLM_URL,
        { query: input }, 
        { headers: { 'Content-Type': 'application/json' } }
      );

      const botResponse = response.data.answer;

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, isUser: false },
      ]);

      if (user) {
        await axios.post('http://localhost:5001/chat-history', {
          userId: user.id,
          messages: [...newMessages, { text: botResponse, isUser: false }]
        });
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Error: Unable to fetch response', isUser: false, isError: true },
      ]);
    }
  };

  return (
    <div className="chatbot-outer-container">
      <div className="chat-container" ref={chatContainerRef}>
        <div className="chat-header">
          <span className="chat-header-title">Registration_info_Bot</span>
        </div>
        <div className="chat-body">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.isUser
                  ? 'user-message message-bubble'
                  : message.isError
                  ? 'bot-message message-bubble error-message'
                  : 'bot-message message-bubble'
              }
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input-row">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="chat-input"
            placeholder="Type a query..."
          />
          <button className="chat-send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
