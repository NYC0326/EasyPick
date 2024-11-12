// src/components/SmartSearch.tsx
import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import ActionProvider from '../bot/ActionProvider';
import MessageParser from '../bot/MessageParser';
import config from '../bot/config';
import '../styles/SmartSearch.css';

const SmartSearch: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
        backgroundColor: '#f8f9fa',
      }}
    >
      <div
        style={{ padding: '1rem', backgroundColor: '#007BFF', color: 'white' }}
      >
        <h1 style={{ margin: 0 }}>EasyPICK</h1>
        <p style={{ margin: 0 }}>챗봇과 대화하세요!</p>
      </div>
      <div>
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      </div>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-around',
          backgroundColor: '#ffffff',
        }}
      ></div>
    </div>
  );
};

export default SmartSearch;
