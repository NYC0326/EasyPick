import React from 'react';

interface DiscountItemCardProps {
  imgSrc: string;
  title: string;
  price: string;
  discount: string;
}

const DiscountItemCard: React.FC<DiscountItemCardProps> = ({
  imgSrc,
  title,
  price,
  discount,
}) => (
  <div
    style={{
      border: '1px solid black',
      margin: '1rem',
      padding: '1rem',
      borderRadius: '10px',
    }}
  >
    <img src={imgSrc} alt={title} style={{ width: '100%', height: 'auto' }} />
    <h2>{title}</h2>
    <p style={{ color: '#fc4c4c', fontWeight: 'bold' }}>현재 판매가: {price}</p>
    <p style={{ color: '#03318c', fontWeight: 'bold' }}>
      최고가에 비해 {discount} 떨어졌어요!
    </p>
    <button
      style={{
        backgroundColor: '#71a1ff',
        color: 'white',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '5px',
      }}
    >
      지금 구매하러 가기 ▶︎
    </button>
  </div>
);

export default DiscountItemCard;
