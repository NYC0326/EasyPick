// src/components/Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EasypickLogo = require('../icon/Easypick_logo.png');

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <header style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
      <div
        style={{ fontSize: '1.5rem', fontWeight: 'bold', marginRight: '1rem' }}
      >
        <div style={{ cursor: 'pointer' }} onClick={handleHomeClick}>
          <img
            src={EasypickLogo}
            alt="EasyPICK Logo"
            style={{ width: '150px', height: 'auto' }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
