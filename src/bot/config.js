// src/bot/config.js
import { createChatBotMessage } from 'react-chatbot-kit';
import FoodOptions from '../components/widgets/FoodOptions';
import EasypickLogo from '../icon/Easypick_chatbot_logo.png';
import TodaysDeal from '../components/widgets/TodaysDeal';

const config = {
  initialMessages: [
    createChatBotMessage(<TodaysDeal />, {
      withAvatar: true,
    }),
    createChatBotMessage(
      `✨어떤 음식을 추천해드릴까요? 🤔\n\n` +
        `👇원하는 버튼을 아래에서 클릭하거나\n` +
        `✍️메세지를 입력해보세요! 💬`,
      {
        widget: 'foodOptions',
        withAvatar: true,
      },
    ),
  ],
  widgets: [
    {
      widgetName: 'foodOptions',
      widgetFunc: (props) => <FoodOptions {...props} />,
      props: {},
      mapStateToProps: [],
    },
  ],
  customComponents: {
    header: () => (
      <div
        style={{
          backgroundColor: 'rgba(114, 157, 242, 0.25)',
          padding: '0.5rem 0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <img
          src={EasypickLogo}
          alt="EasyPICK Logo"
          style={{
            height: '35px',
            width: 'auto',
            borderRadius: '10px',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: 'black',
          }}
        >
          <span
            style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              fontFamily: "'Noto Sans KR', sans-serif",
              lineHeight: '1.2',
            }}
          >
            EASYPICK
          </span>
          <span
            style={{
              fontSize: '0.9rem',
              fontWeight: '500',
              fontFamily: "'Noto Sans KR', sans-serif",
              color: 'black',
            }}
          >
            @OfficialPICK
          </span>
        </div>
      </div>
    ),
  },
  botName: '음식 추천 봇',
};

export default config;
