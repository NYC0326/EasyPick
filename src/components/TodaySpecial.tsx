// src/components/Todayspecial.tsx
import React from 'react';
import Footer from './Footer';
import Header from './Header';

const ProductCard: React.FC<{
  imgSrc: string;
  title: string;
  price: string;
  discount: string;
}> = ({ imgSrc, title, price, discount }) => (
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

const Todayspecial: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header />
    <div style={{ flex: 1, padding: '2rem', textAlign: 'center' }}>
      <h1>오늘의 특가</h1>
      {/* 여기서 ProductCard 컴포넌트를 이용해 여러 상품을 나열합니다. */}
      <ProductCard
        imgSrc="image3.png"
        title="비비고 왕교자 (냉동), 1.4kg"
        price="₩ 12,060"
        discount="15% 떨어졌어요!"
      />
      <ProductCard
        imgSrc="image21.png"
        title="이솔라비오 유기농 귀리음료, 1000ml, 6개"
        price="₩ 27,413"
        discount="7% 떨어졌어요!"
      />
      <ProductCard
        imgSrc="image22.png"
        title="신라면 건면 사발, 77g, 8개"
        price="₩ 7,920"
        discount="20% 떨어졌어요!"
      />
    </div>
    <Footer />
  </div>
);

export default Todayspecial;
