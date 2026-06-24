import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HelpSupport.css';

const HelpSupport = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! Welcome to the Self Service Center. How can I help you today?", 
      sender: 'bot', 
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate a simple bot response
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        text: "Thank you for reaching out! A support agent will review your message and assist you shortly. Please stay on this page.",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1200);
  };

  return (
    <div className="help-container">
      {/* Header */}
      <div className="help-header">
        <svg className="back-icon" onClick={() => navigate(-1)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <h2 className="header-title">Self Service Center</h2>
        <div className="header-spacer"></div>
      </div>

      {/* Chat Area */}
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.sender === 'user' ? 'msg-user' : 'msg-bot'}`}>
              <div className="msg-bubble">
                <p>{msg.text}</p>
                <span className="msg-time">{msg.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form className="chat-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            className="chat-input" 
            placeholder="Type your message..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="chat-send-btn" disabled={!inputValue.trim()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpSupport;
