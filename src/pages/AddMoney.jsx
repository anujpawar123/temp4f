import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AddMoney.css';

const AddMoney = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Hardcoded balance
  const availableBalance = 0.00;

  const quickAmounts = [
    { value: 300, label: '₹ 300', offer: '₹200 Cashback' },
    { value: 700, label: '₹ 700' },
    { value: 1000, label: '₹ 1K' },
    { value: 2000, label: '₹ 2K' },
    { value: 5000, label: '₹ 5K' },
  ];

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

  const handleQuickSelect = (val) => {
    setAmount(val.toString());
  };

  const amountNum = amount ? parseFloat(amount) : 0;
  const isInvalid = amount !== '' && amountNum < 300;

  return (
    <div className="addmoney-container">
      {/* Header */}
      <div className="addmoney-header">
        <svg className="back-icon" onClick={() => navigate(-1)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <h2 className="header-title">Add Money</h2>
        <Link to="/history" className="history-link">Deposit history</Link>
      </div>

      <div className="addmoney-content">
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

        {/* UPI-QR Payment Method Selection */}
        <div className="payment-method-section">
          <div className="payment-method-card selected">
            <div className="pm-info">
              <div className="pm-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="#da2c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </div>
              <div>
                <div className="pm-title">UPI - QR</div>
                <div className="pm-subtitle">Instant & Secure Payment</div>
              </div>
            </div>
            <div className="pm-radio">
              <div className="pm-radio-inner"></div>
            </div>
          </div>
        </div>

        {/* Deposit Amount Quick Selects */}
        <div className="deposit-amount-section">
          <h3 className="section-title">Deposit amount</h3>
          <div className="quick-amount-grid">
            {quickAmounts.map((item, idx) => (
              <div 
                key={idx} 
                className={`quick-amount-btn ${amount === item.value.toString() ? 'selected' : ''}`}
                onClick={() => handleQuickSelect(item.value)}
              >
                {item.label}
                {item.offer && <div className="cashback-badge">{item.offer}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="amount-input-section">
          <div className="amount-input-wrapper">
            <span className="rupee-symbol">₹</span>
            <input 
              type="text" 
              className="amount-input" 
              placeholder="Enter amount (Min ₹300)" 
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          {isInvalid && (
            <div className="amount-warning">
              Minimum deposit amount is ₹300
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button 
          className="deposit-submit-btn" 
          disabled={!amount || amountNum < 300}
          onClick={() => navigate('/payment', { state: { amount } })}
        >
          Deposit
        </button>
      </div>
    </div>
  );
};

export default AddMoney;
