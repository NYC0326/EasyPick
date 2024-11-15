import React, { useState, useRef, useEffect } from 'react';
import PopularSearchList from './PopularSearchList';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const getGreetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return '좋은 아침이에요! 오늘도 힘내요 💪\n어떤 음식의 최저가를 찾으시나요?';
    } else if (currentHour < 18) {
      return '반가워요, 오늘도 당신을 응원할게요💼\n최저가를 찾아서 조금이라도 절약해봐요!';
    } else {
      return '좋은 저녁이에요! 오늘 하루도 고생 많았어요 🌙\n지금 어떤 음식의 최저가가 필요하신가요?';
    }
  };

  const handleSearch = () => {
    navigate('/search-result');
    if (searchTerm.trim()) {
      alert(`"${searchTerm}" 검색 결과는 준비 중입니다.`);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target as Node)
    ) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchContainerRef}
      style={{
        position: 'relative',
        marginTop: '1rem',
      }}
    >
      <p
        style={{
          whiteSpace: 'pre-line',
          margin: '0 0 1rem 0',
          fontSize: '1.1rem',
          color: '#333',
          lineHeight: '1.5',
          fontWeight: '500',
        }}
      >
        {getGreetingMessage()}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="최저가 상품검색 🔍"
          onFocus={() => setIsFocused(true)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          style={{
            flex: 1,
            padding: '1rem',
            fontSize: '1rem',
            borderRadius: '0.75rem',
            border: '1px solid #ccc',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '0 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '0.75rem',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          검색
        </button>
      </div>
      <PopularSearchList
        visible={isFocused}
        onSelect={(term: string) => {
          setSearchTerm(term);
          handleSearch();
        }}
      />
    </div>
  );
};

export default SearchBar;
