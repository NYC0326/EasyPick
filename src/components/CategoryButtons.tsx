// src/components/CategoryButtons.tsx
import React from 'react';

const categories = [
  '족발/보쌈',
  '탕/찜/조림',
  '생선구이',
  '볶음요리',
  '피자',
  '참치/햄/통조림',
  '돈까스/떡갈비',
  '떡볶이/순대',
  '김치',
  '만두/교자',
];

const CategoryButtons: React.FC = () => (
  <div
    style={{
      padding: '1rem',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
    }}
  >
    {categories.map((category) => (
      <button
        key={category}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '0.875rem',
          color: '#4f46e5',
          backgroundColor: '#f3f4f6',
          border: 'none',
          borderRadius: '1rem',
          cursor: 'pointer',
        }}
      >
        {category}
      </button>
    ))}
  </div>
);

export default CategoryButtons;
