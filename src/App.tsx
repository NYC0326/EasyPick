// src/App.tsx
import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryButtons from './components/CategoryButtons';
import E_Pick from './components/E_Pick';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Header />
      <SearchBar />
      <CategoryButtons />
      <E_Pick />
      <Footer />
    </div>
  );
};

export default App;
