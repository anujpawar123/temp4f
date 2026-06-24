import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [highlightTerms, setHighlightTerms] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('error'); // 'error' | 'success'
  const navigate = useNavigate();

  const triggerToast = (msg, type = 'error') => {
    setToastType(type);
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleMobileChange = (e) => {
    const val = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (val.length <= 10) {
      setMobileNumber(val);
    }
  };

  return (
    <>
      <div className="register-card">
        {/* Logo Section */}
        <div className="logo-container">
          <img src="/crown.png" alt="Crown Logo" className="crown-img" />
          <div className="logo-text">
            <span className="logo-text-top">KING</span>
            <span className="logo-text-bottom">THIMBLES</span>
          </div>
        </div>

        {/* Headings */}
        <div className="headings">
          <h1>Create Account</h1>
          <p>Join now and start winning!</p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={(e) => { 
          e.preventDefault(); 
          if (!mobileNumber || !password) return;
          
          if (mobileNumber.length !== 10) {
            triggerToast('Mobile number must be exactly 10 digits.', 'error');
            return;
          }
          
          if (password.length < 5) {
            triggerToast('Password must be at least 5 characters.', 'error');
            return;
          }
          
          if (!agreed) {
            setHighlightTerms(true);
            triggerToast('Please agree to the Terms & Conditions.', 'error');
            setTimeout(() => setHighlightTerms(false), 2000);
            return;
          }
          
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          if (users.find(u => u.mobile === mobileNumber)) {
            triggerToast('User already exists. Please login.', 'error');
            return;
          }
          
          users.push({ mobile: mobileNumber, password });
          localStorage.setItem('users', JSON.stringify(users));
          localStorage.setItem('userMobile', mobileNumber);
          
          triggerToast('You have successfully registered!', 'success');
          // Delay redirect so user can see the success message
          setTimeout(() => {
            navigate('/login'); 
          }, 2000);
        }}>
          <div className="input-group">
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </span>
            <input 
              type="tel" 
              placeholder="Mobile Number" 
              required 
              maxLength="10"
              value={mobileNumber}
              onChange={handleMobileChange}
            />
          </div>

          <div className="input-group">
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </span>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span 
              className="icon-right" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>
              )}
            </span>
          </div>

          <div className="input-group">
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </span>
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="Re-enter Password" 
              required 
            />
            <span 
              className="icon-right" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>
              )}
            </span>
          </div>

          <div className="input-group">
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </span>
            <span style={{ fontWeight: 500, color: 'var(--text-primary)', opacity: 0.8, whiteSpace: 'nowrap' }}>
              Refer Code
            </span>
            <input 
              type="text" 
              value="3446584" 
              readOnly 
              style={{ 
                cursor: 'not-allowed', 
                color: 'var(--text-secondary)', 
                textAlign: 'right', 
                paddingRight: '1.25rem' 
              }}
            />
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label" style={highlightTerms ? { color: '#ff4c4c', fontWeight: 600 } : {}}>
              <input 
                type="checkbox" 
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  if(e.target.checked) setHighlightTerms(false);
                }}
              />
              <span className={`custom-checkbox ${highlightTerms ? 'error-pulse' : ''}`} style={highlightTerms ? { borderColor: '#ff4c4c' } : {}}></span>
              <span className="checkbox-text">
                I agree to the <a href="#" className="link-red" style={highlightTerms ? { color: '#ff4c4c' } : {}}>Terms & Conditions</a>
              </span>
            </label>
          </div>

          <button type="submit" className="btn-primary">
            REGISTER
          </button>
        </form>

        <div className="footer">
          Already have an account? <Link to="/login" className="link-red font-bold">Login</Link>
        </div>
      </div>

      {showToast && (
        <div className="custom-toast">
          <div className="toast-content error-toast">
            {toastType === 'error' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="#ff4c4c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="toast-icon">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="toast-icon">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            )}
            <span>{toastMsg}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
