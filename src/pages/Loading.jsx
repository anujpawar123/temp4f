import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to Home after 3 seconds
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ width: '100%', height: '100dvh', backgroundColor: '#0d0d0d', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
      <img src="/loading_new.png" alt="Loading King Thimbles" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'fill' }} />
    </div>
  );
};

export default Loading;
