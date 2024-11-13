import * as React from 'react';
import { useState, useEffect, CSSProperties } from 'react';

interface FoodOption {
  text: string;
  handler: () => void;
}

const containerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-start',
  flexWrap: 'wrap' as const,
  width: '100%',
  gap: '8px',
  marginLeft: '20px',
};

const buttonStyle: CSSProperties = {
  padding: '8px 16px',
  border: '1px solid #E8E8E8',
  borderRadius: '25px',
  background: 'white',
  color: '#666666',
  cursor: 'pointer',
  fontSize: '0.9rem',
  whiteSpace: 'pre-line' as const,
  textAlign: 'center' as const,
};

const FoodOptions: React.FC<{ actionProvider: any }> = ({ actionProvider }) => {
  const allOptions: FoodOption[] = [
    {
      text: '얼큰한 \n 국물요리',
      handler: () => actionProvider.handleKoreanFood(),
    },
    {
      text: '저녁식사',
      handler: () => actionProvider.handleChineseFood(),
    },
    {
      text: '든든한 한끼',
      handler: () => actionProvider.handleJapaneseFood(),
    },
    {
      text: '이번주 \n핫한 제품',
      handler: () => actionProvider.handleWesternFood(),
    },
    {
      text: '담백한 음식',
      handler: () => actionProvider.handleKoreanFood(),
    },
    {
      text: '간단한 \n 한끼',
      handler: () => actionProvider.handleChineseFood(),
    },
    {
      text: '집들이 \n 메뉴',
      handler: () => actionProvider.handleJapaneseFood(),
    },
    {
      text: '술안주 \n 추천',
      handler: () => actionProvider.handleWesternFood(),
    },
    {
      text: '점심식사',
      handler: () => actionProvider.handleKoreanFood(),
    },
    {
      text: '건강식 \n 추천',
      handler: () => actionProvider.handleChineseFood(),
    },
  ];

  const [randomOptions, setRandomOptions] = useState<FoodOption[]>([]);

  useEffect(() => {
    const getRandomOptions = () => {
      const shuffled = [...allOptions].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 4);
    };

    setRandomOptions(getRandomOptions());
  }, []); // 빈 배열로 변경하여 컴포넌트 마운트 시에만 실행

  return (
    <div style={containerStyle}>
      {randomOptions.map((option: FoodOption, index: number) => (
        <button
          key={index}
          onClick={option.handler}
          style={buttonStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#729DF2';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = '#729DF2';
          }}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default FoodOptions;
