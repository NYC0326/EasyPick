// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => (
  <footer
    style={{
      display: 'flex',
      justifyContent: 'space-around',
      padding: '1rem',
      borderTop: '1px solid #e5e7eb',
    }}
  >
    <div style={{ textAlign: 'center' }}>
      <span role="img" aria-label="heart">
        ❤️
      </span>
      <p style={{ fontSize: '0.75rem', color: '#4b5563' }}>관심상품</p>
    </div>
    <div style={{ textAlign: 'center' }}>
      <span role="img" aria-label="search">
        🔍
      </span>
      <p style={{ fontSize: '0.75rem', color: '#4b5563' }}>스마트 검색</p>
    </div>
    <div style={{ textAlign: 'center' }}>
      <span role="img" aria-label="home">
        🏠
      </span>
      <p style={{ fontSize: '0.75rem', color: '#4b5563' }}>홈</p>
    </div>
    <div style={{ textAlign: 'center' }}>
      <span role="img" aria-label="sale">
        💸
      </span>
      <p style={{ fontSize: '0.75rem', color: '#4b5563' }}>오늘의 특가</p>
    </div>
  </footer>
);

export default Footer;
