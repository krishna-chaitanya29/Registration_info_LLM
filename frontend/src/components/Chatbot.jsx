import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
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
    <div className="chat-container" ref={chatContainerRef}>
      <div className="chat-header">
        Registration_info_Bot
      </div>
      <div className="chat-body">
        {messages.map((message, index) => (
          <div key={index} className={message.isUser ? 'user-message' : 'bot-message'}>
            {message.text}
          </div>
        ))}
      </div>
      <input 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        className="chat-input"
        placeholder="Type a query..."
      />
      <button className="chat-send-button" onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
