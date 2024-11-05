// src/components/SearchBar.tsx
import React from 'react';

const SearchBar: React.FC = () => (
  <div style={{ padding: '1rem' }}>
    <p>반가워요, 오늘은 어떤 음식의 최저가를 원하세요?</p>
    <input
      type="text"
      placeholder="최저가 상품검색"
      style={{
        width: '100%',
        padding: '0.75rem',
        fontSize: '1rem',
        borderRadius: '0.5rem',
        border: '1px solid #ddd',
        marginTop: '0.5rem',
      }}
    />
  </div>
);

export default SearchBar;
