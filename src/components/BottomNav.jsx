import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../pages/Loading';
import './BottomNav.css';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const balance = "0.00"; // Assuming hardcoded for now

  const handlePlayClick = () => {
    if (balance === "0.00") {
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnecting(false);
        setIsLoadingPage(true);
        setTimeout(() => {
          setIsLoadingPage(false);
          setShowBalanceModal(true);
        }, 2000);
      }, 1500);
    } else {
      // Future play logic
    }
  };

  const goToAddMoney = () => {
    setShowBalanceModal(false);
    navigate('/add-money');
  };

  return (
    <>
      <div className="bottom-nav-container">
      <div className="nav-items">
        {/* Home */}
        <Link to="/home" className={`nav-item ${path === '/home' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="currentColor"></path>
          </svg>
          <span>Home</span>
        </Link>

        {/* History */}
        {/* History */}
        <Link to="/history" className={`nav-item ${path === '/history' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>History</span>
        </Link>

        {/* Center FAB Spacer */}
        <div className="nav-item fab-spacer"></div>

        {/* Wallet */}
        <Link to="/wallet" className={`nav-item ${path === '/wallet' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
            <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path>
            <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path>
          </svg>
          <span>Wallet</span>
        </Link>

        {/* Account */}
        <Link to="/account" className={`nav-item ${path === '/account' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Account</span>
        </Link>
      </div>

      {/* Floating Action Button (Play) */}
      <div className="fab-container">
        <button className="fab-button" onClick={handlePlayClick}>
          <img src="/crown.png" alt="Play" className="fab-icon" style={{ objectFit: 'contain' }} />
          <span className="fab-text">Play</span>
        </button>
        <div className="fab-glow"></div>
      </div>
    </div>

      {isConnecting && (
        <div className="balance-modal-overlay" style={{ zIndex: 10001 }}>
          <div className="loading-spinner-wrapper">
            <div className="spinner"></div>
            <p style={{ color: 'white', marginTop: '1rem', fontWeight: 600, fontSize: '0.9rem' }}>Connecting to Game...</p>
          </div>
        </div>
      )}

      {isLoadingPage && (
        <div className="loading-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10001, overflow: 'hidden' }}>
          <Loading />
        </div>
      )}

      {showBalanceModal && (
        <div className="balance-modal-overlay" onClick={() => setShowBalanceModal(false)}>
          <div className="balance-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="balance-modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className="balance-modal-title">Insufficient Balance</h3>
            <p className="balance-modal-text">Your wallet balance is ₹0.00. Please add money to start playing King Thimbles.</p>
            <div className="balance-modal-actions">
              <button className="balance-btn-cancel" onClick={() => setShowBalanceModal(false)}>Cancel</button>
              <button className="balance-btn-add" onClick={goToAddMoney}>Add Money</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNav;
