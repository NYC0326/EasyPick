// src/bot/config.js
import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [createChatBotMessage('Hello, Please Enter the Message.')],
  customComponents: {
    header: () => <botHeader />,
  },
};

export default config;
