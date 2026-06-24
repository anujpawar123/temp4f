import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Account from './pages/Account';
import Wallet from './pages/Wallet';
import History from './pages/History';
import Loading from './pages/Loading';
import Security from './pages/Security';
import Notification from './pages/Notification';
import HelpSupport from './pages/HelpSupport';
import About from './pages/About';
import Feedback from './pages/Feedback';
import Withdraw from './pages/Withdraw';
import AddMoney from './pages/AddMoney';
import Payment from './pages/Payment';
import BottomNav from './components/BottomNav';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('loggedInUserMobile');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('loggedInUserMobile');
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};

function App() {
  const location = useLocation();
  const hideBottomNav = ['/login', '/register', '/', '/loading', '/security', '/notification', '/help', '/about', '/feedback', '/withdraw', '/add-money', '/payment'].includes(location.pathname);

  return (
    <div className="app-container">
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Navigate to={localStorage.getItem('loggedInUserMobile') ? "/home" : "/register"} replace />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/loading" element={<ProtectedRoute><Loading /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
          <Route path="/notification" element={<ProtectedRoute><Notification /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><HelpSupport /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
          <Route path="/withdraw" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
          <Route path="/add-money" element={<ProtectedRoute><AddMoney /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        </Routes>
        {/* Physical spacer to ensure scroll reaches past the fixed bottom nav */}
        {!hideBottomNav && <div style={{ minHeight: '90px', flexShrink: 0 }}></div>}
      </div>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}

export default App;