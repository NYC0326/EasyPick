import React from 'react';

interface PopularSearchListProps {
  visible: boolean;
  onSelect: (term: string) => void;
}

const PopularSearchList = (props: PopularSearchListProps) => {
  const { visible, onSelect } = props;
  const popularSearches = [
    '삼양라면',
    '김치',
    '콘칩',
    '코카콜라',
    '비비고 만두',
  ];

  if (!visible) return null;

  return (
    <div
      style={{
        marginTop: '0.5rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
      }}
    >
      <div
        style={{
          fontSize: '0.9rem',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '0.5rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px solid #eee',
        }}
      >
        실시간 인기검색어
      </div>
      {popularSearches.map((term, index) => (
        <div
          key={term}
          onClick={() => onSelect(term)}
          style={{
            padding: '0.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#f5f5f5')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = 'white')
          }
        >
          <span
            style={{
              color: '#007bff',
              fontWeight: 'bold',
              minWidth: '1.5rem',
            }}
          >
            {index + 1}
          </span>
          <span>{term}</span>
        </div>
      ))}
    </div>
  );
};

export default PopularSearchList;
