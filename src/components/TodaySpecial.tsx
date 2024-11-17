// src/components/Todayspecial.tsx
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import DiscountItemCard from './cards/DiscountItemCard';

const TodaySpecial: React.FC = () => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Header />
    <div
      style={{
        padding: '2rem',
        textAlign: 'center',
        flex: 1,
        marginBottom: '80px',
      }}
    >
      <h1>오늘의 특가</h1>
      <DiscountItemCard
        imgSrc="image3.png"
        title="비비고 왕교자 (냉동), 1.4kg"
        price="₩ 12,060"
        discount="15% 떨어졌어요!"
      />
      <DiscountItemCard
        imgSrc="image21.png"
        title="이솔라비오 유기농 귀리음료, 1000ml, 6개"
        price="₩ 27,413"
        discount="7% 떨어졌어요!"
      />
      <DiscountItemCard
        imgSrc="image22.png"
        title="신라면 건면 사발, 77g, 8개"
        price="₩ 7,920"
        discount="20% 떨어졌어요!"
      />
    </div>
    <Footer />
  </div>
);

export default TodaySpecial;
