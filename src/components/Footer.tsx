import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Home } from '../icon/house-regular.svg';
import { ReactComponent as Heart } from '../icon/heart-regular.svg';
import { ReactComponent as Tag } from '../icon/tag-regular.svg';
import { ReactComponent as SmartSearch } from '../icon/chatbot-regular.svg';

const Footer: React.FC = (
  currentPage
) => {
  if (currentPage == "Home") {
  }
  const navigate = useNavigate();

  const handleSmartSearchClick = () => {
    navigate('/smart-search'); // 스마트 검색 화면으로 이동
  };

  const handleTodaySpecialClick = () => {
    navigate('/today-special'); // 오늘의 특가 화면으로 이동
  };

  const handleHomeClick = () => {
    navigate('/'); // 메인 화면으로 이동
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
        <Heart width="40" height="40" />
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
        <SmartSearch width="40" height="40" />
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
      <Home width="40" height="40"/>
        <p style={BottomStyle}>메인 화면</p>
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
        <Tag width="40" height="40" />
        <p style={BottomStyle}>오늘의 특가</p>
      </div>
    </footer>
  );
};

export default Footer;
