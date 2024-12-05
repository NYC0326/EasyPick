import React, { useState } from 'react';

interface ProductProps {
  manufacturer: string;
  name: string;
  price: string;
  originalPrice: string;
  imageUrl: string;
  purchaseLink: string;
  discountRate: number;
  onReviewClick: () => void;
}

const ProductCard: React.FC<ProductProps> = ({
  manufacturer,
  name,
  price,
  originalPrice,
  imageUrl,
  purchaseLink,
  discountRate,
  onReviewClick,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        padding: '20px',
        width: '200px',
        height: '380px',
        backgroundColor: 'white',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 12px 20px -8px rgba(0, 0, 0, 0.2)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* 할인율 뱃지 */}
      {discountRate > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(220, 38, 38, 0.3)',
          }}
        >
          {discountRate}% OFF
        </div>
      )}

      {/* 찜하기 버튼 */}
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s',
        }}
      >
        <img
          src={
            isFavorite
              ? require('../icon/clicked_heart.png')
              : require('../icon/no_click_heart.png')
          }
          alt={isFavorite ? '찜한 상태' : '찜하지 않은 상태'}
          style={{ width: '20px', height: '20px' }}
        />
      </button>

      {/* 상품 이미지 */}
      <div style={{ marginBottom: '16px', textAlign: 'center', flexShrink: 0 }}>
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: '180px',
            height: '180px',
            objectFit: 'cover',
            borderRadius: '12px',
          }}
        />
      </div>

      {/* 상품 정보 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <p
            style={{
              color: '#6b7280',
              fontSize: '14px',
              marginBottom: '4px',
              fontWeight: '500',
            }}
          >
            {manufacturer}
          </p>
          <h3
            style={{
              fontSize: '16px',
              margin: '0 0 12px 0',
              color: '#1f2937',
              fontWeight: '600',
              lineHeight: '1.4',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
            }}
          >
            {name}
          </h3>
        </div>

        {/* 가격 정보와 버튼을 하단에 고정 */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#03318C',
              }}
            >
              ₩{Number(price).toLocaleString()}
            </span>
            <span
              style={{
                fontSize: '14px',
                color: '#9ca3af',
                textDecoration: 'line-through',
                marginTop: '3px',
              }}
            >
              ₩{Number(originalPrice).toLocaleString()}
            </span>
          </div>

          {/* 버튼 그룹 수정 */}
          <div
            style={{
              display: 'flex',
              gap: '6px', // 버튼 사이 간격 줄임
            }}
          >
            <button
              onClick={onReviewClick}
              style={{
                padding: '6px 12px',
                fontSize: '13px',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                cursor: 'pointer',
                color: '#6b7280',
                fontWeight: '500',
                marginLeft: '22px',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              리뷰 보기
            </button>
            <a
              href={purchaseLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '100%',
                padding: '6px 12px',
                fontSize: '13px',
                backgroundColor: '#03318C',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                textDecoration: 'none',
                textAlign: 'center',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#03318C';
              }}
            >
              구매하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
