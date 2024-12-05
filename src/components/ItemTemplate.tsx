import React, { useState } from 'react';
import '../styles/ItemStarRating.css';
import ItemReview from './ItemReview';

interface ItemProp {
  name: string;
  imageUrl: string;
  purchaseLink: string;
  discount?: string;
  rating?: number;
  favorite?: boolean;
  current_price: number;
}

const cardStyle = {
  border: '1px solid #e5e7eb',
  borderRadius: '1rem',
  padding: '0.5rem',
  textAlign: 'center' as const,
  cursor: 'pointer',
  position: 'relative' as const,
};

const ItemTemplate: React.FC<ItemProp> = ({
  name,
  imageUrl,
  purchaseLink,
  discount,
  rating,
  favorite,
  current_price,
}) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isClicked, setIsClicked] = useState(false);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const percentage = ((rating ?? 0) / 5) * 100;
  const switchClicked = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex' }}>
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
          <div className="star-rating">
            <div className="stars" style={{ width: `${percentage}%` }}></div>
          </div>
        </div>

        <div style={{ width: '75%' }}>
          <h3
            style={{
              margin: '0.5rem 0',
              fontSize: '1.2rem',
              color: '#1f2937',
              textAlign: 'left',
              height: '5%',
            }}
            onClick={() => window.open(purchaseLink, '_blank')}
          >
            {name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', height: '30%' }}>
            <p style={{ color: '#707070', width: '10%', textAlign: 'left' }}>
              {rating}점
            </p>
            <p style={{ width: '60%', textAlign: 'left' }}> / 5점 </p>
            <p
              style={{
                color: '#1F64BF',
                width: '30%',
                height: '5%',
                fontSize: '1.2rem',
                textAlign: 'right',
              }}
            >
              <b>{current_price.toLocaleString()}원</b>
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'right' }}>
            <p style={{ width: '70%' }}></p>
            <p
              style={{
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'gray',
                borderRadius: '7px',
                width: '11%',
              }}
              onClick={() => window.open(purchaseLink, '_blank')}
            >
              BUY
            </p>
            <p style={{ width: '1%' }}></p>
            <p
              style={{
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'gray',
                borderRadius: '7px',
                width: '18%',
              }}
              onClick={() => switchClicked()}
            >
              리뷰 보기
            </p>
          </div>
        </div>
      </div>
      <div>
        {discount && (
          <p style={{ color: '#F27A5E', textAlign: 'center' }}>{discount}</p>
        )}
      </div>
      <ItemReview visible={isClicked} />
    </div>
  );
};

export default ItemTemplate;
