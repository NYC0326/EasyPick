import React from 'react';
import { useState } from 'react';

interface FavoriteItemProp {
  name: string;
  weight: string;
  price: string;
  originalPrice: string;
  imageUrl: string;
}

const cardStyle = {
  border: '1px solid #e5e7eb',
  borderRadius: '1rem',
  padding: '1.5rem',
  textAlign: 'center' as const,
  cursor: 'pointer',
  position: 'relative' as const,
  display: 'flex',
};

const FavoriteItem: React.FC<FavoriteItemProp> = ({
  name,
  weight,
  price,
  originalPrice,
  imageUrl,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <div style={cardStyle}>
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

      <div style={{ display: 'inline', width: '25%', textAlign: 'center' }}>
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
        <a style={{ color: '#F8B91F', textAlign: 'center' }}> ★★★★★ </a>
      </div>

      <div style={{ width: '75%' }}>
        <h3
          style={{
            margin: '0.5rem 0',
            fontSize: '1.2rem',
            color: '#1f2937',
            textAlign: 'left',
          }}
        >
          {name} {weight}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ color: '#707070', width: '10%', textAlign: 'left' }}>
            1개
          </p>
          <p style={{ width: '60%', textAlign: 'left' }}>100g당 775원</p>
          <p
            style={{
              color: '#1F64BF',
              width: '30%',
              fontSize: '1.2rem',
              textAlign: 'right',
            }}
          >
            <b>8,140원</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;
