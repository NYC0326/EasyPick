// src/components/Favorite.tsx
import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Favorite: React.FC = () => (
<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header /> { }
    <div style={{ flex: 1, padding: '2rem', textAlign: 'center' }}>
      <h1>Favorite</h1>
      <p>This is the Favorite page. Content goes here.</p>
    </div>
    <Footer /> {/* Footer를 페이지 하단에 추가 */}
  </div>
);

export default Favorite;
