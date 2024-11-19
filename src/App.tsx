// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import SmartSearch from './components/SmartSearch';
import Favorite from './components/Favorite';
import TodaySpecial from './components/TodaySpecial';
import SearchResult from './components/SearchResult';
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
          <Route path="/" element={<Main />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/search-result" element={<SearchResult />} />
          <Route path="/smart-search" element={<SmartSearch />} />
          <Route path="/today-special" element={<TodaySpecial />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
