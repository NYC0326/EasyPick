import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import CategoryButtons from './CategoryButtons';
import E_Pick from './E_Pick';
import Footer from './Footer';

const Main: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        paddingBottom: '80px',
      }}
    >
      <Header />
      <div
        style={{
          flex: 1,
          width: '100%',
          margin: '0 auto',
        }}
      >
        <SearchBar />
        <CategoryButtons />
        <E_Pick />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
