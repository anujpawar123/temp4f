import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Security.css';

const Security = () => {
  const navigate = useNavigate();

  return (
    <div className="security-container">
      {/* Header */}
      <div className="security-header">
        <svg className="back-icon" onClick={() => navigate(-1)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <h2 className="header-title">Risk Disclosure Agreement</h2>
        <div className="header-spacer"></div>
      </div>

      <div className="security-content">
        <h3 className="section-heading">User Agreement</h3>
        
        <p className="security-paragraph">
          1. To avoid betting disputes, members must read the company's rules before entering the app. Once the player "I agree" By entering this company to bet, you will be considered to be in agreement with the company's User Agreement.
        </p>

        <p className="security-paragraph">
          2. It is the member's responsibility to ensure the confidentiality of their account and login information. Any online bets placed using your account number and member password will be considered valid. Please change your password from time to time. The company is not responsible for any compensation for bets made with a stolen account and password.
        </p>

        <p className="security-paragraph">
          4. Users must be or legal age according to the laws of the country of residence to use an online casino or application. Online bets that have not been successfully submitted will be considered void.
        </p>

        <p className="security-paragraph">
          5. When a player is automatically or forcibly disconnected from the game before the game result is announced, it will not affect the game result.
        </p>
      </div>
    </div>
  );
};

export default Security;
