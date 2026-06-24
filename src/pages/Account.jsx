import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css';

const Account = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [userName, setUserName] = useState('MEMBERNNGFEJF1');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    // Retrieve mobile number stored during login/register
    const storedMobile = localStorage.getItem('userMobile');
    if (storedMobile) {
      setMobile('+91 ' + storedMobile);
    } else {
      setMobile('+91 98765 43210'); // Fallback matching screenshot
    }

    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userMobile');
    localStorage.removeItem('loggedInUserMobile');
    navigate('/login');
  };

  const handleEditClick = () => {
    setTempName(userName);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    const finalName = tempName.trim() || 'MEMBERNNGFEJF1';
    setUserName(finalName);
    localStorage.setItem('userName', finalName);
    setIsEditingName(false);
  };

  const menuItems = [
    { id: 1, title: 'Security', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
    )},
    { id: 2, title: 'Feedback', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    )},
    { id: 3, title: 'Notification Settings', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
    )},
    { id: 4, title: 'Help & Support', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
    )},
    { id: 5, title: 'About Us', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
    )}
  ];

  return (
    <div className="account-container">
      {/* Top Red Header */}
      <div className="account-header">
        <div className="header-top">
          <svg className="back-icon" onClick={() => navigate(-1)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <h2 className="header-title">My Account</h2>
          <div className="header-spacer"></div>
        </div>

        <div className="profile-section">
          <div className="avatar-wrapper">
            <img src="/avatar/6-BptTdCuy.png" alt="Profile" className="profile-avatar" />
          </div>
          <div className="profile-info">
            {isEditingName ? (
              <div className="name-edit-container">
                <input 
                  type="text" 
                  className="name-edit-input" 
                  value={tempName} 
                  onChange={(e) => setTempName(e.target.value)}
                  autoFocus
                />
                <button className="name-save-btn" onClick={handleSaveName}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </button>
              </div>
            ) : (
              <div className="name-display-container">
                <h3 className="profile-name">{userName}</h3>
                <svg className="name-edit-icon" onClick={handleEditClick} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </div>
            )}
            <p className="profile-number">{mobile}</p>
          </div>
        </div>
      </div>

      {/* Floating Balance Card */}
      <div className="balance-card-container">
        <div className="balance-card" onClick={() => navigate('/add-money')} style={{ cursor: 'pointer' }}>
          <div className="balance-icon">
            <svg width="42" height="34" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
              <rect x="4" y="3" width="22" height="6" rx="2" fill="#E6A15C"/>
              <rect x="6" y="2" width="20" height="5" rx="1" fill="#FAD199"/>
              <rect x="2" y="6" width="28" height="18" rx="3" fill="#8B4A23"/>
              <path d="M2 6C2 4.34315 3.34315 3 5 3H27C28.6569 3 30 4.34315 30 6V12C30 13.1046 29.1046 14 28 14H4C2.89543 14 2 13.1046 2 12V6Z" fill="#A85A2A"/>
              <path d="M2 12C2 13.1046 2.89543 14 4 14H28C29.1046 14 30 13.1046 30 12" stroke="#7A3F1C" strokeWidth="1"/>
              <rect x="24" y="11" width="6" height="8" rx="2" fill="#D48648"/>
              <rect x="24" y="11" width="6" height="8" rx="2" fill="#ECA264"/>
              <circle cx="27" cy="15" r="1.5" fill="#FFD700"/>
              <line x1="4" y1="21" x2="28" y2="21" stroke="#7A3F1C" strokeWidth="0.5" strokeDasharray="1 1"/>
            </svg>
          </div>
          <div className="balance-details">
            <span className="balance-label">Total Balance</span>
            <span className="balance-amount">₹ 0.00</span>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="menu-list">
        {menuItems.map((item) => (
          <div 
            className="menu-item" 
            key={item.id} 
            onClick={() => {
              if (item.title === 'Security') {
                navigate('/security');
              } else if (item.title === 'Notification Settings') {
                navigate('/notification');
              } else if (item.title === 'Help & Support') {
                navigate('/help');
              } else if (item.title === 'About Us') {
                navigate('/about');
              } else if (item.title === 'Feedback') {
                navigate('/feedback');
              }
            }}
          >
            <div className="menu-icon">{item.icon}</div>
            <div className="menu-title">{item.title}</div>
            <svg className="menu-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="logout-container">
        <button className="btn-logout" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default Account;
