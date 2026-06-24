import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './History.css';

const History = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Bets', 'Wins', 'Withdrawals'];

  return (
    <div className="history-container">
      {/* Red Header */}
      <div className="history-header">
        <div className="header-top">
          <div className="back-btn-wrapper-history" onClick={() => navigate(-1)}>
            <svg className="back-icon-history" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span className="back-text">Back</span>
          </div>
          <h2 className="header-title">History</h2>
          <div className="header-spacer-history"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="history-content">
        {/* White Tabs Bar */}
        <div className="tabs-bar">
          <div className="tabs-scroll-container">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-pill ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        <div className="empty-state-history">
          <div className="empty-wallet-icon">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Simple stylized 3D grey wallet */}
              <rect x="25" y="45" width="50" height="35" rx="6" fill="#C4C4C4" />
              <path d="M30 45 L40 30 L75 35 L70 45 Z" fill="#D1D1D1" />
              <rect x="65" y="55" width="15" height="10" rx="3" fill="#A8A8A8" />
              <circle cx="72.5" cy="60" r="2" fill="#E0E0E0" />
            </svg>
          </div>
          <p className="empty-text">No history recorded yet.</p>
        </div>
      </div>
    </div>
  );
};

export default History;
