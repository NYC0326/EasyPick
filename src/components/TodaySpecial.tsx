// src/components/Todayspecial.tsx
import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Todayspecial: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header />
    <div style={{ flex: 1, padding: '2rem', textAlign: 'center' }}>
      <h1>오늘의 특가</h1>
      <p>세은 구현바람~</p>
    </div>
    <Footer />
  </div>
);

export default Todayspecial;
