import React from 'react';
import { useNavigate } from 'react-router-dom';
const smartSearchIcon = require('../icon/smartsearch_icon.png');
const homeIcon = require('../icon/home_icon.png');
const todaySpecialIcon = require('../icon/todayspecial_icon.png');
const favoriteIcon = require('../icon/favorite_icon.png');

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleSmartSearchClick = () => {
    navigate('/smart-search'); // 스마트 검색 화면으로 이동
  };

  const handleTodaySpecialClick = () => {
    navigate('/today-special'); // 오늘의 특가 화면으로 이동
  };

  const handleHomeClick = () => {
    navigate('/'); // 홈 화면으로 이동
  };

  const handleFavoriteClick = () => {
    navigate('/favorite'); // 관심상품 화면으로 이동
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
      <div
        style={{
          textAlign: 'center',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onClick={handleFavoriteClick}
      >
        <img
          src={favoriteIcon}
          alt="관심상품 아이콘"
          style={{ width: '50px', height: '40px' }}
        />
        <p style={BottomStyle}>관심상품</p>
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
      <div
        style={{
          textAlign: 'center',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onClick={handleHomeClick}
      >
        <img
          src={homeIcon}
          alt="홈 아이콘"
          style={{ width: '40px', height: '40px' }}
        />
        <p style={BottomStyle}>홈</p>
      </div>
      <div
        style={{
          textAlign: 'center',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onClick={handleTodaySpecialClick}
      >
        <img
          src={todaySpecialIcon}
          alt="오늘의 특가 아이콘"
          style={{ width: '30px', height: '40px' }}
        />
        <p style={BottomStyle}>오늘의 특가</p>
      </div>
    </footer>
  );
};

export default Footer;
