// src/components/SmartSearch.tsx
import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import ActionProvider from '../bot/ActionProvider';
import MessageParser from '../bot/MessageParser';
import config from '../bot/config';
import Header from './Header';
import Footer from './Footer';
import '../styles/SmartSearch.css';

const SearchIcon = require('../icon/smartsearch_icon.png');
const SmartSearch: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f8f9fa',
      }}
    >
      <Header />
      <div
        style={{
          padding: '12px 16px',
          backgroundColor: 'white',
          borderBottom: '1px solid #eee',
          fontSize: '20px',
          color: '#1f2937',
          textAlign: 'center',
          fontWeight: '500',
        }}
      >
        스마트검색
      </div>
      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '1rem',
          marginBottom: '60px',
        }}
      >
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      </div>
      <Footer />
    </div>
  );
};

export default SmartSearch;
