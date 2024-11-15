// src/components/Header.tsx
import React from 'react';

const EasypickLogo = require('../icon/Easypick_logo.png');

const Header: React.FC = () => (
  <header style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
    <div
      style={{ fontSize: '1.5rem', fontWeight: 'bold', marginRight: '1rem' }}
    >
      ≡
    </div>
    <img
      src={EasypickLogo}
      alt="EasyPICK Logo"
      style={{ width: '150px', height: 'auto' }}
    />
  </header>
);

export default Header;
