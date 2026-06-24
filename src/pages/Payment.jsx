import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amount = location.state?.amount || '0';
  
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [utr, setUtr] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimestamp(Date.now());
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const triggerToast = (msg, type = 'success') => {
    setToastType(type);
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleUtrChange = (e) => {
    const val = e.target.value.replace(/\D/g, ''); // Numbers only
    if (val.length <= 12) {
      setUtr(val);
      if (showWarning && val.length === 12) setShowWarning(false);
    }
  };

  const handleSubmit = async () => {
    if (utr.length < 12) {
      setShowWarning(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://okwinbb.vercel.app/api/utr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: utr })
      });
      
      const data = await response.json();

      if (!response.ok) {
        triggerToast(data.error || 'Failed to submit UTR', 'error');
        setIsSubmitting(false);
        return;
      }

      triggerToast('Payment submitted successfully!', 'success');
      setTimeout(() => {
        navigate('/history');
      }, 2000);
    } catch (err) {
      console.error(err);
      triggerToast('Network error connecting to server.', 'error');
      setIsSubmitting(false);
    }
  };

  const isExact300 = amount === '300';
  let submitText = utr.length === 12 ? 'Submit' : 'Submit(UTR not entered)';
  if (isSubmitting) submitText = 'Submitting...';

  return (
    <div className="payment-container">
      <div className="payment-header">
        <svg className="back-icon" onClick={() => navigate(-1)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <h2 className="header-title">UpiPay</h2>
        <div style={{width: 24}}></div> {/* Spacer to center title */}
      </div>

      <div className="payment-content">
        <div className="amount-display-section">
          <div className="amount-label">Deposit Amount</div>
          <div className="amount-value">₹ {amount}</div>
          {isExact300 && (
            <div className="cashback-offer-banner">
              🎉 ₹200 Cashback Offer Applied!
            </div>
          )}
        </div>

        <div className="qr-section">
          <h3 className="qr-heading">Use Mobile Scan code to pay</h3>
          <div className="qr-image-wrapper">
            <img src={`/p.png?t=${timestamp}`} alt="Payment QR Code" className="qr-image" />
          </div>
          <div className="timer-display">
            {formattedTime}
          </div>
          <div className="instructions-list">
            <p>1. Please use another device to scan the QR code with your payment app.</p>
            <p>2. If you scan the QR code from this device's gallery, the payment amount may be limited (≤2000).</p>
          </div>
        </div>

        <div className="utr-section">
          <h3 className="utr-heading">Enter UTR / paste UTR</h3>
          <div className="utr-input-wrapper">
            <input 
              type="text" 
              className="utr-input" 
              placeholder="input 12 digits here" 
              value={utr}
              onChange={handleUtrChange}
            />
          </div>
          {showWarning && utr.length > 0 && utr.length < 12 && (
            <div className="utr-warning">UTR must be exactly 12 digits</div>
          )}
          
          <button 
            className={`utr-submit-btn ${utr.length === 12 && !isSubmitting ? 'ready' : ''}`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {submitText}
          </button>
        </div>
      </div>

      {showToast && (
        <div className="custom-toast">
          <div className="toast-content" style={{background: toastType === 'success' ? '#4caf50' : '#2b2b2b'}}>
            {toastType === 'success' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="toast-icon">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="#ff4c4c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="toast-icon">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            )}
            <span>{toastMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
