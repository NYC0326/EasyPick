import React from 'react';
import { useNavigate } from 'react-router-dom';
const smartSearchIcon = require('../icon/smartsearch_icon.png');

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleSmartSearchClick = () => {
    navigate('/smart-search'); // 스마트 검색 화면으로 이동
  };

  const BottomStyle = {
    fontSize: '1rem',
    color: 'black',
    fontWeight: 'bold',
    marginTop: '0.5rem',
  };

  return (
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
      <div
        style={{
          textAlign: 'center',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onClick={handleSmartSearchClick}
      >
        <img
          src={smartSearchIcon}
          alt="스마트 검색 아이콘"
          style={{ width: '50px', height: '40px' }}
        />
        <p style={BottomStyle}>스마트 검색</p>
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
};

export default Footer;
