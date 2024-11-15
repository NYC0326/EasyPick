import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as HomeRegular } from '../icon/house-regular.svg';
import { ReactComponent as HomeSolid } from '../icon/house-solid.svg';
import { ReactComponent as HeartRegular } from '../icon/heart-regular.svg';
import { ReactComponent as HeartSolid } from '../icon/heart-solid.svg';
import { ReactComponent as TagRegular } from '../icon/tag-regular.svg';
import { ReactComponent as TagSolid } from '../icon/tag-solid.svg';
import { ReactComponent as SmartSearchRegular } from '../icon/chatbot-regular.svg';
import { ReactComponent as SmartSearchSolid } from '../icon/chatbot-solid.svg';

const Footer: React.FC = () => {
  const [HomeIcon, setHomeIcon] = useState(HomeRegular);
  const [HeartIcon, setHeartIcon] = useState(HeartRegular);
  const [TagIcon, setTagIcon] = useState(TagRegular);
  const [SmartSearchIcon, setSmartSearchIcon] = useState(SmartSearchRegular);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setHomeIcon(location.pathname === "/" ? HomeSolid : HomeRegular);
    setHeartIcon(location.pathname === "/favorite" ? HeartSolid : HeartRegular);
    setTagIcon(location.pathname === "/today-special" ? TagSolid : TagRegular);
    setSmartSearchIcon(location.pathname === "/smart-search" ? SmartSearchSolid : SmartSearchRegular);
  }, [location.pathname]);  // 경로가 변경될 때마다 useEffect 실행

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
        <HeartIcon width="40" height="40" />
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
        <SmartSearchIcon width="40" height="40" />
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
      <HomeIcon width="40" height="40"/>
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
        <TagIcon width="40" height="40" />
        <p style={BottomStyle}>오늘의 특가</p>
      </div>
    </footer>
  );
};

export default Footer;
