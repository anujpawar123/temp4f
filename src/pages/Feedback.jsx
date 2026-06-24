import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Feedback.css';

const Feedback = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    // Simulate submission
    setShowToast(true);
    setFeedback('');
    
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="feedback-container">
      {/* Header */}
      <div className="feedback-header">
        <svg className="back-icon" onClick={() => navigate(-1)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <h2 className="header-title">Feedback</h2>
        <div className="header-spacer"></div>
      </div>

      <div className="feedback-content">
        <h3 className="section-heading">We Value Your Opinion!</h3>
        <p className="feedback-instructions">
          Please let us know how we can improve our services. Your feedback is highly appreciated.
        </p>

        <form onSubmit={handleSubmit} className="feedback-form">
          <textarea
            className="feedback-textarea"
            placeholder="Type your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="6"
          ></textarea>
          <button type="submit" className="feedback-submit-btn" disabled={!feedback.trim()}>
            Submit Feedback
          </button>
        </form>
      </div>

      {/* Professional Toast Alert */}
      {showToast && (
        <div className="custom-toast">
          <div className="toast-content">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2eb82e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="toast-icon">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Feedback submitted successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
