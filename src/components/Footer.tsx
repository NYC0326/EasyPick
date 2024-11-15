import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const HomeRegular = require('../icon/house-regular.png');
const HomeSolid = require('../icon/house-solid.png');
const HeartRegular = require('../icon/heart-regular.png');
const HeartSolid = require('../icon/heart-solid.png');
const TagRegular = require('../icon/tag-regular.png');
const TagSolid = require('../icon/tag-solid.png');
const SmartSearchRegular = require('../icon/chatbot-regular.png');
const SmartSearchSolid = require('../icon/chatbot-solid.png');

const Footer: React.FC = () => {
  const [HomeIcon, setHomeIcon] = useState(HomeRegular);
  const [HeartIcon, setHeartIcon] = useState(HeartRegular);
  const [TagIcon, setTagIcon] = useState(TagRegular);
  const [SmartSearchIcon, setSmartSearchIcon] = useState(SmartSearchRegular);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setHomeIcon(location.pathname === '/' ? HomeSolid : HomeRegular);
    setHeartIcon(location.pathname === '/favorite' ? HeartSolid : HeartRegular);
    setTagIcon(location.pathname === '/today-special' ? TagSolid : TagRegular);
    setSmartSearchIcon(
      location.pathname === '/smart-search'
        ? SmartSearchSolid
        : SmartSearchRegular,
    );
  }, [location.pathname]); // 경로가 변경될 때마다 useEffect 실행

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
        position: 'relative',
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
        <img src={HeartIcon} alt="Heart" width="40" height="40" />
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
        <img src={SmartSearchIcon} alt="SmartSearch" width="40" height="40" />
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
        <img src={HomeIcon} alt="Home" width="40" height="40" />
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
        <img src={TagIcon} alt="Tag" width="40" height="40" />
        <p style={BottomStyle}>오늘의 특가</p>
      </div>
    </footer>
  );
};

export default Footer;
