// src/components/Header.tsx
import React from 'react';

const EasypickLogo = require('../icon/Easypick_logo.png'); // Using require to import the logo

const Header: React.FC = () => (
  <header style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
    <div
      style={{ fontSize: '1.5rem', fontWeight: 'bold', marginRight: '1rem' }}
    >
      ≡
    </div>
    <img
      src={EasypickLogo} // Using require to set the src
      alt="EasyPICK Logo"
      style={{ width: '150px', height: 'auto' }} // Adjust size as needed
    />
  </header>
);

export default Header;
