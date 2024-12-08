import React, { useState } from 'react';
import '../styles/ItemStarRating.css';
import ItemReview from './ItemReview';

interface ItemProp {
  name: string;
  imageUrl: string;
  purchaseLink: string;
  discount: number;
  rating?: number;
  favorite?: boolean;
  current_price: number;
  original_price: number;
  review_num: number;
}

const ItemTemplate: React.FC<ItemProp> = ({
  name,
  imageUrl,
  purchaseLink,
  discount,
  rating,
  favorite,
  current_price,
  original_price,
  review_num,
}) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        margin: '1rem',
        position: 'relative',
      }}
    >
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          zIndex: 1,
          padding: '8px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <img
          src={
            isFavorite
              ? require('../icon/clicked_heart.png')
              : require('../icon/no_click_heart.png')
          }
          alt="찜하기"
          style={{ width: '24px', height: '24px' }}
        />
      </button>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0.5rem 0', fontSize: '1rem' }}>{name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="star-rating" style={{ marginRight: '8px' }}>
              <div
                className="stars"
                style={{ width: `${(rating || 0) * 20}%` }}
              ></div>
            </div>
            <span style={{ color: '#666' }}>{rating}점</span>
            <span
              style={{
                color: '#666',
                fontSize: '0.9rem',
                marginLeft: '4px',
              }}
            >
              ({review_num.toLocaleString()}개 리뷰)
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '8px',
            }}
          >
            <span
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
              }}
            >
              {discount}%
            </span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  textDecoration: 'line-through',
                  color: '#9ca3af',
                  fontSize: '1.1rem',
                  marginBottom: '2px',
                  fontWeight: '500',
                }}
              >
                ₩{original_price.toLocaleString()}
              </span>
              <span
                style={{
                  color: '#dc2626',
                  fontWeight: 'bold',
                  fontSize: '1.4rem',
                  lineHeight: '1',
                }}
              >
                ₩{current_price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginTop: '12px',
        }}
      >
        <button
          onClick={() => setIsClicked(!isClicked)}
          style={{
            flex: 1,
            padding: '10px 16px',
            fontSize: '13px',
            backgroundColor: 'white',
            border: '2px solid #6b7280',
            borderRadius: '8px',
            cursor: 'pointer',
            color: '#6b7280',
            fontWeight: '600',
          }}
        >
          리뷰 보기
        </button>
        <a
          href={purchaseLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            padding: '10px 16px',
            fontSize: '14px',
            backgroundColor: '#03318C',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            textDecoration: 'none',
            textAlign: 'center',
            fontWeight: '600',
          }}
        >
          상품 보러가기
        </a>
      </div>

      <ItemReview visible={isClicked} />
    </div>
  );
};

export default ItemTemplate;
