import React from 'react';
const ChatpickIcon = require('../../icon/Chatpick.png');

interface DealType {
  manufacturer: string;
  title: string;
  weight: string;
  currentPrice: number;
  originalPrice: number;
  discountRate: number;
  imageUrl: string;
}

const TodaysDeal: React.FC<any> = () => {
  const mockDeal: DealType = {
    manufacturer: '오픈더테이블',
    title: '안원당 갈비탕',
    weight: '700g',
    currentPrice: 15920,
    originalPrice: 17500,
    discountRate: 9,
    imageUrl:
      'https://img.danawa.com/prod_img/500000/876/270/img/68270876_1.jpg?shrink=130:130&_v=20241005073111',
  };

  return (
    <div style={{ maxWidth: '320px' }}>
      <div
        style={{
          padding: '0 4px 8px 4px',
          color: '#1f2937',
          fontSize: '14px',
        }}
      >
        오늘 할인율이 가장 큰 상품을 추천해줄게요
      </div>

      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '6px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '8px',
          }}
        >
          <img
            src={ChatpickIcon}
            alt="EASY's PICK"
            style={{
              width: '140px',
              display: 'block',
              margin: '0 auto',
              marginBottom: '4px',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <img
            src={mockDeal.imageUrl}
            alt={mockDeal.title}
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h3
              style={{
                margin: '0 0 2px 0',
                color: '#1f2937',
                fontSize: '14px',
                fontWeight: '700',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  marginBottom: '0px',
                  fontSize: '11px',
                  fontWeight: '400',
                }}
              >
                {mockDeal.manufacturer}
              </div>
              {mockDeal.title}{' '}
              <span style={{ fontSize: '12px' }}>{mockDeal.weight}</span>
            </h3>
            <div style={{ textAlign: 'center', margin: '1px 0' }}>
              <span
                style={{
                  fontWeight: '600',
                  color: '#03318C',
                  fontSize: '17px',
                }}
              >
                ₩{mockDeal.currentPrice.toLocaleString()}
              </span>
              <span
                style={{
                  textDecoration: 'line-through',
                  color: '#9ca3af',
                  fontSize: '13px',
                  marginLeft: '6px',
                }}
              >
                ₩{mockDeal.originalPrice.toLocaleString()}
              </span>
            </div>
            <p
              style={{
                color: '#ef4444',
                margin: '2px 0 0 0',
                fontSize: '12px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              <span
                style={{
                  backgroundColor: '#fef2f2',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontWeight: '600',
                }}
              >
                {mockDeal.discountRate}% 할인
              </span>
              <span>평균가보다 저렴해요!</span>
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: '8px',
          color: '#03318C',
          fontSize: '14px',
          lineHeight: '1.5',
        }}
      >
        진한 사골육수로 우려낸 깊은 맛이 일품이에요. 따뜻하게 즐기기 좋은
        메뉴로, 한 그릇 뚝딱하기 좋은 양이랍니다! 🍜
      </div>
      <div style={{ textAlign: 'center' }}>
        <a
          href="https://prod.danawa.com/bridge/loadingBridge.html?cate1=46803&cate2=56857&cate3=56877&cate4=0&pcode=68270876&cmpnyc=ED903&safe_trade=4&fee_type=T&link_pcode=2749746889&package=0&setpc=0"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            width: '120px',
            marginTop: '2px',
            padding: '3px',
            backgroundColor: '#2563eb',
            color: 'white',
            textAlign: 'center',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(37, 99, 235, 0.1)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#1d4ed8';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow =
              '0 4px 6px rgba(37, 99, 235, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow =
              '0 2px 4px rgba(37, 99, 235, 0.1)';
          }}
        >
          상품 보러가기
        </a>
      </div>
    </div>
  );
};

export default TodaysDeal;
