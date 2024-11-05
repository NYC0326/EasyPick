// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => (
  <header style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
    <div
      style={{ fontSize: '1.5rem', fontWeight: 'bold', marginRight: '1rem' }}
    >
      ≡
    </div>
    <h1 style={{ fontSize: '2rem', color: '#1e3a8a' }}>EasyPICK</h1>
  </header>
);

export default Header;
