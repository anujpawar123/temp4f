import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Wallet.css';

const Wallet = () => {
  const navigate = useNavigate();
  const [isWithdrawView, setIsWithdrawView] = useState(false);

  return (
    <div className="wallet-container">
      {/* Top Red Header */}
      <div className="wallet-header">
        <div className="header-top">
          <div className="back-btn-wrapper" onClick={() => navigate(-1)}>
            <svg className="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </div>
          <h2 className="header-title">Wallet</h2>
          <div className="header-spacer"></div>
        </div>
      </div>

      {/* Dark Balance Card */}
      <div className="dark-balance-container">
        <div className="dark-balance-card" onClick={() => navigate('/add-money')} style={{ cursor: 'pointer' }}>
          <div className="balance-info">
            <span className="balance-subtitle">Total Balance</span>
            <span className="balance-total">₹ 0.00</span>
          </div>
          <svg className="chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="action-buttons-row">
        <div className="action-button" onClick={() => navigate('/add-money')}>
          <div className="action-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
              <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path>
              <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path>
              {/* Plus sign inside wallet */}
              <line x1="9" y1="14" x2="15" y2="14"></line>
              <line x1="12" y1="11" x2="12" y2="17"></line>
            </svg>
          </div>
          <span className="action-text">Add Money</span>
        </div>

        <div className="action-button" onClick={() => navigate('/withdraw')}>
          <div className="action-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Bank / Landmark Icon for Withdraw */}
              <line x1="3" y1="22" x2="21" y2="22"></line>
              <line x1="6" y1="18" x2="6" y2="11"></line>
              <line x1="10" y1="18" x2="10" y2="11"></line>
              <line x1="14" y1="18" x2="14" y2="11"></line>
              <line x1="18" y1="18" x2="18" y2="11"></line>
              <polygon points="12 2 20 7 4 7"></polygon>
            </svg>
          </div>
          <span className="action-text">Withdraw</span>
        </div>

        <div className="action-button" onClick={() => navigate('/history')}>
          <div className="action-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <span className="action-text">History</span>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="transaction-section">
        <div className="transaction-header">
          <h3 className="transaction-title">Transaction History</h3>
          <span className="view-all">View All</span>
        </div>
        
        <div className="empty-state">
          <p>{isWithdrawView ? 'No Withdrawals History' : 'No Transaction History'}</p>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
