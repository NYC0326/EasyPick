import React, { useState } from 'react';

interface ProductProps {
  manufacturer: string;
  name: string;
  price: string;
  originalPrice: string;
  imageUrl: string;
  purchaseLink: string;
}

const cardStyle = {
  border: '1px solid #e5e7eb',
  borderRadius: '1rem',
  padding: '1.5rem',
  textAlign: 'center' as const,
  width: 'calc(50% - 1rem)',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  cursor: 'pointer',
  position: 'relative' as const,
};

const ProductCard: React.FC<ProductProps> = ({
  manufacturer,
  name,
  price,
  originalPrice,
  imageUrl,
  purchaseLink,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      style={cardStyle}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLDivElement).style.cssText +=
          'transform: scale(1.05); box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);';
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLDivElement).style.cssText +=
          'transform: scale(1); box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);';
      }}
    >
      <button
        onClick={toggleFavorite}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '0.5rem',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <img
          src={
            !isFavorite
              ? require('../icon/no_click_heart.png')
              : require('../icon/clicked_heart.png')
          }
          alt={!isFavorite ? '찜하지 않은 상태' : '찜한 상태'}
          style={{ width: '24px', height: '24px' }}
        />
      </button>
      <img
        src={imageUrl}
        alt={name}
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '0.5rem',
          objectFit: 'cover',
        }}
      />
      <div style={{ margin: '0.5rem 0' }}>
        <p
          style={{
            fontSize: '0.8rem',
            color: '#6b7280',
            marginBottom: '0.2rem',
          }}
        >
          {manufacturer}
        </p>
        <h3
          style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#1f2937',
            margin: 0,
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          {name}
        </h3>
      </div>
      <p
        style={{
          color: '#03318C',
          fontWeight: 'bold',
          fontSize: '1.25rem',
          margin: '0.25rem 0',
        }}
      >
        ₩{price}
      </p>
      <p
        style={{
          textDecoration: 'line-through',
          color: '#black',
          fontSize: '0.875rem',
          margin: '0.25rem 0',
        }}
      >
        ₩{originalPrice}
      </p>
      <button
        style={{
          marginTop: '0.5rem',
          padding: '0.55rem 0.75rem',
          fontSize: '0.875rem',
          color: 'white',
          backgroundColor: '#03318C',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onClick={() => window.open(purchaseLink, '_blank')}
        onMouseOver={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = '#4338ca';
        }}
        onMouseOut={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = '#4f46e5';
        }}
      >
        구매하러 가기
      </button>
    </div>
  );
};

export default ProductCard;
