// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryButtons from './components/CategoryButtons';
import E_Pick from './components/E_Pick';
import Footer from './components/Footer';
import SmartSearch from './components/SmartSearch';
import 'react-chatbot-kit/build/main.css';
import './styles/chatbot.css';
import 'remixicon/fonts/remixicon.css';

const App: React.FC = () => {
  return (
    <Router>
      <div
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <SearchBar />
                <CategoryButtons />
                <E_Pick />
                <Footer />
              </>
            }
          />
          <Route path="/smart-search" element={<SmartSearch />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
