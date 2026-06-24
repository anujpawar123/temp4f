import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Withdraw.css';

const Withdraw = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upi'); // 'upi' or 'bank'
  const [amount, setAmount] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Hardcoded balance
  const availableBalance = 0.00;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000); // spin for 1 second
  };

  const handleAmountChange = (e) => {
    const val = e.target.value;
    // Allow only numbers
    if (val === '' || /^\d+$/.test(val)) {
      setAmount(val);
    }
  };

  const amountReceived = amount ? parseFloat(amount) : 0;

  const handleWithdrawClick = () => {
    if (parseFloat(amount) > availableBalance) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <div className="withdraw-container">
      {/* Header */}
      <div className="withdraw-header">
        <svg className="back-icon" onClick={() => navigate(-1)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <h2 className="header-title">Withdraw</h2>
        <Link to="/history" className="withdrawal-history-link">Withdrawal history</Link>
      </div>

      <div className="withdraw-content">
        {/* Gold Debit Card */}
        <div className="gold-card">
          <div className="card-top">
            <svg className="chip-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="36" rx="6" fill="#F4E2A5"/>
              <path d="M12 0V36M24 0V36M36 0V36" stroke="#C9A348" strokeWidth="2"/>
              <path d="M0 12H48M0 24H48" stroke="#C9A348" strokeWidth="2"/>
              <rect x="8" y="8" width="32" height="20" rx="2" fill="#E8CD78" stroke="#A78229" strokeWidth="2"/>
            </svg>
            <span className="card-brand">Available Balance</span>
          </div>
          <div className="card-bottom">
            <span className="card-balance">₹ {availableBalance.toFixed(2)}</span>
            <div className="refresh-wrapper" onClick={handleRefresh}>
              <svg className={`refresh-icon ${isRefreshing ? 'spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Payment Tabs */}
        <div className="payment-tabs-container">
          <div className="payment-tabs">
            <div 
              className={`payment-tab ${activeTab === 'upi' ? 'active' : ''}`}
              onClick={() => setActiveTab('upi')}
            >
              UPI
            </div>
            <div 
              className={`payment-tab ${activeTab === 'bank' ? 'active' : ''}`}
              onClick={() => setActiveTab('bank')}
            >
              Bank Card
            </div>
          </div>
          
          <div className="payment-tab-content">
            {activeTab === 'upi' ? (
              <div className="add-method-section">
                <div className="add-method-btn">
                  <span className="plus-icon">+</span> Add UPI
                </div>
              </div>
            ) : (
              <div className="add-method-section">
                <div className="add-method-btn">
                  <span className="plus-icon">+</span> Add a bank account number
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Amount Input */}
        <div className="amount-section">
          <label className="amount-label">Please enter the amount</label>
          <div className="amount-input-wrapper">
            <span className="rupee-symbol">₹</span>
            <input 
              type="text" 
              className="amount-input" 
              placeholder="0.00" 
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="summary-section">
          <div className="summary-row">
            <span className="summary-label">Withdrawable balance</span>
            <span className="summary-value">₹ {availableBalance.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Withdrawal amount received</span>
            <span className="summary-value highlight">₹ {amountReceived.toFixed(2)}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          className="withdraw-submit-btn" 
          disabled={!amount || parseFloat(amount) <= 0}
          onClick={handleWithdrawClick}
        >
          Withdraw
        </button>
      </div>

      {/* Professional Toast Alert */}
      {showToast && (
        <div className="custom-toast">
          <div className="toast-content error-toast">
            <svg viewBox="0 0 24 24" fill="none" stroke="#ff4c4c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="toast-icon">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Insufficient balance!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdraw;
