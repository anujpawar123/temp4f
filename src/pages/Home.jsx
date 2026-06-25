import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import './Home.css';

const Home = () => {
  const stepsRef = useRef(null);
  const [showAllWins, setShowAllWins] = useState(false);
  const navigate = useNavigate();
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const balance = "0.00"; // Assuming hardcoded for now

  const handleBannerClick = () => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (stepsRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = stepsRef.current;
        // If we reached the end, scroll back to start, else slide forward
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          stepsRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Slide by roughly the width of one step
          stepsRef.current.scrollBy({ left: 120, behavior: 'smooth' });
        }
      }
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="home-container">
      {/* Navbar */}
      <div className="home-navbar">
        {/* Left: Logo Section */}
        <div className="home-logo-section">
          <img src="/crown.png" alt="Crown" className="home-crown" />
          <div className="home-logo-text">
            <span className="logo-text-king">KING</span>
            <span className="logo-text-thimbles">THIMBLES</span>
          </div>
        </div>

        {/* Right: Wallet Button */}
        <Link to="/add-money" className="home-wallet-button">
          {/* Wallet Icon */}
          <div className="wallet-icon-container">
            <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Wallet Base (Back flap / money) */}
              <rect x="4" y="3" width="22" height="6" rx="2" fill="#E6A15C"/>
              <rect x="6" y="2" width="20" height="5" rx="1" fill="#FAD199"/>
              
              {/* Main Body */}
              <rect x="2" y="6" width="28" height="18" rx="3" fill="#8B4A23"/>
              
              {/* Front Flap */}
              <path d="M2 6C2 4.34315 3.34315 3 5 3H27C28.6569 3 30 4.34315 30 6V12C30 13.1046 29.1046 14 28 14H4C2.89543 14 2 13.1046 2 12V6Z" fill="#A85A2A"/>
              
              {/* Flap Outline/Shadow */}
              <path d="M2 12C2 13.1046 2.89543 14 4 14H28C29.1046 14 30 13.1046 30 12" stroke="#7A3F1C" strokeWidth="1"/>
              
              {/* Buckle/Clasp */}
              <rect x="24" y="11" width="6" height="8" rx="2" fill="#D48648"/>
              <rect x="24" y="11" width="6" height="8" rx="2" fill="#ECA264"/>
              
              {/* Gold Button on Clasp */}
              <circle cx="27" cy="15" r="1.5" fill="#FFD700"/>
              
              {/* Texture/Stitching details */}
              <line x1="4" y1="21" x2="28" y2="21" stroke="#7A3F1C" strokeWidth="0.5" strokeDasharray="1 1"/>
            </svg>
          </div>

          {/* Balance Text */}
          <div className="wallet-balance-info">
            <span className="wallet-label">Wallet Balance</span>
            <span className="wallet-amount">₹0.00</span>
          </div>

          {/* Add Button */}
          <div className="wallet-add-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        </Link>
      </div>

      {/* Content Area */}
      <div className="home-content">
        <div className="banner-container" onClick={handleBannerClick}>
          <img src="/game_banner.jpg" alt="King Thimbles Game Banner" className="responsive-banner" />
        </div>
        
        {/* Announcement Bar */}
        <div className="announcement-bar">
          <div className="announcement-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="#e60000"/>
              <path d="M15.54 8.46A5 5 0 0 1 15.54 15.54" stroke="#e60000" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#e60000" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="announcement-text-container">
            <span className="announcement-text">Welcome to King Thimbles! Place your bet and pick the right king.</span>
          </div>
          <div className="announcement-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>

        {/* How to Play Section */}
        <div className="how-to-play-container">
          {/* Header */}
          <div className="htp-header">
            <div className="htp-title-group">
              <svg className="htp-book-icon" viewBox="0 0 24 24" fill="none" stroke="#e60000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
              </svg>
              <h3 className="htp-title">How to Play</h3>
            </div>
            <div className="htp-badge-group">
              <div className="rtp-badge">RTP 97.45%</div>
              <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
          </div>

          {/* Steps Container */}
          <div className="htp-steps-wrapper" ref={stepsRef} style={{ scrollBehavior: 'smooth' }}>
            <div className="htp-step">
              <img src="/step1.png" alt="Place Your Bet" className="step-image" />
              <span className="step-text">Place Your Bet</span>
            </div>
            <div className="step-divider"></div>
            <div className="htp-step">
              <img src="/step2.png" alt="Watch the Shuffle" className="step-image" />
              <span className="step-text">Watch the Shuffle</span>
            </div>
            <div className="step-divider"></div>
            <div className="htp-step">
              <img src="/step3.png" alt="Pick the Right King" className="step-image" />
              <span className="step-text">Pick the Right King</span>
            </div>
            <div className="step-divider"></div>
            <div className="htp-step">
              <img src="/step4.png" alt="Win Big Rewards" className="step-image" />
              <span className="step-text">Win Big Rewards</span>
            </div>
          </div>
        </div>

        {/* Recent Big Wins Section */}
        <div className="recent-wins-container">
          <div className="rw-header">
            <div className="rw-title-group">
              <svg className="rw-crown-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 16L4.5 7L9 11L12 4L15 11L19.5 7L21 16H3Z" fill="#ff9900"/>
                <path d="M2 18H22V20H2V18Z" fill="#e67e22"/>
                <circle cx="4.5" cy="5" r="1.5" fill="#ff9900"/>
                <circle cx="12" cy="2" r="1.5" fill="#ff9900"/>
                <circle cx="19.5" cy="5" r="1.5" fill="#ff9900"/>
              </svg>
              <h3 className="rw-title">Recent Big Wins</h3>
            </div>
            <a href="#" className="rw-view-all" onClick={(e) => {
              e.preventDefault();
              setShowAllWins(!showAllWins);
            }}>
              {showAllWins ? 'Show Less' : 'View All'}
            </a>
          </div>

          <div className="rw-list">
            {[
              { name: 'Rahul', time: '3 min ago', amount: '₹ 52,000', avatar: '10-BcpE5fen.png' },
              { name: 'Ankit', time: '5 min ago', amount: '₹ 18,750', avatar: '20-jsNPML4j.png' },
              { name: 'Pooja', time: '8 min ago', amount: '₹ 35,000', avatar: '4-FzE5GskB.png' },
              { name: 'Vikram', time: '12 min ago', amount: '₹ 11,500', avatar: '6-BptTdCuy.png' },
              { name: 'Neha', time: '15 min ago', amount: '₹ 29,300', avatar: '9-iOf3oyEz.png' },
            ].slice(0, showAllWins ? 5 : 3).map((win, idx) => (
              <div className="rw-item" key={idx}>
                <div className="rw-user-info">
                  <div className="rw-avatar-wrapper">
                    <img src={`/avatar/${win.avatar}`} alt={win.name} className="rw-avatar" />
                  </div>
                  <div className="rw-user-details">
                    <span className="rw-name">{win.name}</span>
                    <span className="rw-time">{win.time}</span>
                  </div>
                </div>
                <div className="rw-amount">{win.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-container">
          <div className="stat-item">
            <svg className="stat-icon" viewBox="0 0 24 24" fill="#e60000" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="4"/>
              <path d="M12 14c-4.42 0-8 2.24-8 4v2h16v-2c0-1.76-3.58-4-8-4z"/>
              <circle cx="5" cy="10" r="3"/>
              <path d="M5 15c-1.3 0-2.6.3-3.6.8V18h3.3v-1.7c0-.5.1-.9.3-1.3z"/>
              <circle cx="19" cy="10" r="3"/>
              <path d="M19 15c1.3 0 2.6.3 3.6.8V18h-3.3v-1.7c0-.5-.1-.9-.3-1.3z"/>
            </svg>
            <div className="stat-details">
              <span className="stat-label">PLAYERS</span>
              <span className="stat-value">1,258</span>
            </div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <svg className="stat-icon" viewBox="0 0 24 24" fill="#ff9900" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
              <path d="M12 6l1.1 2.3 2.5.4-1.8 1.8.4 2.5-2.2-1.2-2.2 1.2.4-2.5-1.8-1.8 2.5-.4z" fill="#fff"/>
            </svg>
            <div className="stat-details">
              <span className="stat-label">TOTAL WINS</span>
              <span className="stat-value">₹ 48,75,000</span>
            </div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <svg className="stat-icon" viewBox="0 0 24 24" fill="#2eb82e" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              <path d="M4 20h2v-4H4v4zm5 0h2v-8H9v8zm5 0h2v-6h-2v6zm5 0h2v-10h-2v10z"/>
            </svg>
            <div className="stat-details">
              <span className="stat-label">JACKPOT WON</span>
              <span className="stat-value">₹ 3,25,000</span>
            </div>
          </div>
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
    </div>
  );
};

export default Home;
