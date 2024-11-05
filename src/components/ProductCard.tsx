// src/components/ProductCard.tsx
import React from 'react';

interface ProductProps {
  name: string;
  weight: string;
  price: string;
  originalPrice: string;
  imageUrl: string;
}

const cardStyle = {
  border: '1px solid #f3f4f6',
  borderRadius: '1rem',
  padding: '1rem',
  textAlign: 'center' as const, // TypeScript에서 'center'를 명시적 타입으로 설정
  width: '45%',
};

const ProductCard: React.FC<ProductProps> = ({
  name,
  weight,
  price,
  originalPrice,
  imageUrl,
}) => (
  <div style={cardStyle}>
    <img
      src={imageUrl}
      alt={name}
      style={{ width: '100px', height: '100px' }}
    />
    <h3>
      {name}
      {weight}
    </h3>
    <p style={{ color: '#4f46e5', fontWeight: 'bold' }}>₩{price}</p>
    <p style={{ textDecoration: 'line-through', color: '#9ca3af' }}>
      ₩{originalPrice}
    </p>
    <button
      style={{
        marginTop: '0.5rem',
        padding: '0.5rem',
        fontSize: '1rem',
        backgroundColor: '#f3f4f6',
        borderRadius: '50%',
        border: '1px solid #4f46e5',
        cursor: 'pointer',
      }}
    >
      +
    </button>
  </div>
);

export default ProductCard;
