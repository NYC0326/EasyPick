import React from 'react';

const SearchBar: React.FC = () => {
  const getGreetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return (
        '좋은 아침이에요! 오늘도 힘내요 💪\n' +
        '어떤 음식의 최저가를 찾으시나요?'
      );
    } else if (currentHour < 18) {
      return (
        '반가워요, 오늘도 당신을 응원할게요💼\n' +
        '최저가를 찾아서 조금이라도 절약해봐요!'
      );
    } else {
      return (
        '좋은 저녁이에요! 오늘 하루도 고생 많았어요 🌙\n' +
        '지금 어떤 음식의 최저가가 필요하신가요?'
      );
    }
  };

  return (
    <div
      style={{
        padding: '1.5rem',
        backgroundColor: '#f0f4f8',
        borderRadius: '1rem',
      }}
    >
      <p
        style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '1rem',
          whiteSpace: 'pre-wrap',
        }}
      >
        {getGreetingMessage()}
      </p>
      <input
        type="text"
        placeholder="최저가 상품검색 🔍"
        style={{
          width: '93%',
          padding: '1rem',
          fontSize: '1rem',
          borderRadius: '0.75rem',
          border: '1px solid #ccc',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      />
    </div>
  );
};

export default SearchBar;
