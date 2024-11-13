import React from 'react';

const categories = [
  '족발/보쌈',
  '탕/찜/조림',
  '생선구이',
  '볶음요리',
  '참치/햄/통조림',
  '돈까스/떡갈비',
  '떡볶이/순대',
  '김치',
  '만두/교자',
];

const CategoryButtons: React.FC = () => (
  <div
    style={{
      padding: '0rem',
      marginTop: '26px',
      marginBottom: '0px',
    }}
  >
    <h3
      style={{
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '1rem',
      }}
    >
      카테고리
    </h3>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '1rem',
      }}
    >
      {categories.map((category) => (
        <button
          key={category}
          style={{
            padding: '0.75rem 1rem',
            fontSize: '0.875rem',
            color: '#03318C',
            backgroundColor: '#f3f4f6',
            border: 'none',
            borderRadius: '1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s, transform 0.3s',
          }}
          onMouseOver={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#e0e7ff';
            (e.target as HTMLButtonElement).style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#f3f4f6';
            (e.target as HTMLButtonElement).style.transform = 'scale(1)';
          }}
        >
          {category}
        </button>
      ))}
    </div>
  </div>
);

export default CategoryButtons;
