import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Notification.css';

const Notification = () => {
  const navigate = useNavigate();

  return (
    <div className="notification-container">
      {/* Header */}
      <div className="notification-header">
        <svg className="back-icon" onClick={() => navigate(-1)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <h2 className="header-title">Notification</h2>
        <div className="header-spacer"></div>
      </div>

      <div className="notification-content">
        <h3 className="section-heading">Tips for a Smooth Experience</h3>
        
        <p className="notification-paragraph">
          If you experience slow performance or login issues, please ensure a stable internet connection, reinstall the app, or use our official website link for a smoother experience. Thank you for your patience, and feel free to contact our 24/7 support team for assistance.
        </p>
      </div>
    </div>
  );
};

export default Notification;
