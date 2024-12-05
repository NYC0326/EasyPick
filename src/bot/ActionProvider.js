// src/bot/ActionProvider.js
import TodaysDeal from '../components/widgets/TodaysDeal';

class ActionProvider {
  constructor(createChatbotMessage, setStateFunc) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
  }

  handleAffordable = async () => {
    const userMessage = {
      type: 'user',
      message: '가성비',
    };
    const initialBotMessage = this.createChatbotMessage(
      <div>
        <span style={{ fontWeight: 'bold', color: '#729DF2' }}>가성비</span>
        를 선택하셨네요! 💰
        <br />
        추천 메뉴를 찾아볼게요.
      </div>,
      {
        withAvatar: true,
        delay: 500,
      },
    );
    this.updateChatbotState(userMessage, initialBotMessage);

    try {
      const response = await fetch(`/api/products/recommend/가성비`);
      const recommendations = await response.json();
      console.log('📦 받은 추천 결과:', recommendations);
      recommendations.forEach((product) => {
        const recommendationMessage = this.createChatbotMessage(
          <TodaysDeal
            initialData={product}
            skipInitialFetch={true}
            customMessage="가성비가 좋은 상품이에요! 💰"
          />,
          {
            withAvatar: true,
            delay: 1000,
          },
        );
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, recommendationMessage],
        }));
      });
    } catch (error) {
      console.error('❌ 추천 처리 중 에러:', error);
    }
  };

  handleDelivery = async () => {
    const userMessage = {
      type: 'user',
      message: '빠른배송',
    };
    const initialBotMessage = this.createChatbotMessage(
      <div>
        <span style={{ fontWeight: 'bold', color: '#729DF2' }}>빠른배송</span>
        을 선택하셨네요! 🚚
        <br />
        추천 메뉴를 찾아볼게요.
      </div>,
      {
        withAvatar: true,
        delay: 500,
      },
    );
    this.updateChatbotState(userMessage, initialBotMessage);

    try {
      const response = await fetch(`/api/products/recommend/빠른배송`);
      const recommendations = await response.json();
      console.log('📦 받은 추천 결과:', recommendations);
      // 각 추천 상품에 대해 TodaysDeal 컴포넌트 생성
      recommendations.forEach((product) => {
        const recommendationMessage = this.createChatbotMessage(
          <TodaysDeal
            initialData={product}
            skipInitialFetch={true}
            customMessage="빠른배송이 가능한 상품이에요! 🚀"
          />,
          {
            withAvatar: true,
            delay: 1000,
          },
        );

        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, recommendationMessage],
        }));
      });
    } catch (error) {
      console.error('❌ 추천 처리 중 에러:', error);
    }
  };

  handleEasyCooking = async () => {
    const userMessage = {
      type: 'user',
      message: '손쉬운 조리',
    };
    const initialBotMessage = this.createChatbotMessage(
      <div>
        <span style={{ fontWeight: 'bold', color: '#729DF2' }}>
          손쉬운 조리
        </span>
        를 선택하셨네요! 👨‍🍳
        <br />
        추천 메뉴를 찾아볼게요.
      </div>,
      {
        withAvatar: true,
        delay: 500,
      },
    );
    this.updateChatbotState(userMessage, initialBotMessage);

    try {
      const response = await fetch(`/api/products/recommend/손쉬운조리`);
      const recommendations = await response.json();
      console.log('📦 받은 추천 결과:', recommendations);
      recommendations.forEach((product) => {
        const recommendationMessage = this.createChatbotMessage(
          <TodaysDeal
            initialData={product}
            skipInitialFetch={true}
            customMessage="간편하게 조리할 수 있는 상품이에요! 👨‍🍳"
          />,
          {
            withAvatar: true,
            delay: 1000,
          },
        );
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, recommendationMessage],
        }));
      });
    } catch (error) {
      console.error('❌ 추천 처리 중 에러:', error);
    }
  };

  handlePopular = async () => {
    const userMessage = {
      type: 'user',
      message: '리뷰 많은',
    };
    const botMessage = this.createChatbotMessage(
      <div>
        <span style={{ fontWeight: 'bold', color: '#729DF2' }}>리뷰 많은</span>
        을 선택하셨네요! ⭐
        <br />
        추천 메뉴를 보여드릴게요.
      </div>,
      {
        withAvatar: true,
        delay: 500,
      },
    );
    this.updateChatbotState(userMessage, botMessage);

    try {
      const response = await fetch(`/api/products/recommend/리뷰많은`);
      const recommendations = await response.json();
      console.log('📦 받은 추천 결과:', recommendations);
      recommendations.forEach((product) => {
        const recommendationMessage = this.createChatbotMessage(
          <TodaysDeal
            initialData={product}
            skipInitialFetch={true}
            customMessage="많은 분들이 선택한 인기 상품이에요! ⭐"
          />,
          {
            withAvatar: true,
            delay: 1000,
          },
        );
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, recommendationMessage],
        }));
      });
    } catch (error) {
      console.error('❌ 추천 처리 중 에러:', error);
    }
  };

  handleSpicy = async () => {
    const userMessage = {
      type: 'user',
      message: '달콤한',
    };
    const initialBotMessage = this.createChatbotMessage(
      <div>
        <span style={{ fontWeight: 'bold', color: '#729DF2' }}>달콤한</span>
        을 선택하셨네요! 🌶️
        <br />
        추천 메뉴를 찾아볼게요.
      </div>,
      {
        withAvatar: true,
        delay: 500,
      },
    );
    this.updateChatbotState(userMessage, initialBotMessage);

    try {
      const response = await fetch(`/api/products/recommend/달콤한`);
      const recommendations = await response.json();
      console.log('📦 받은 추천 결과:', recommendations);
      recommendations.forEach((product) => {
        const recommendationMessage = this.createChatbotMessage(
          <TodaysDeal
            initialData={product}
            skipInitialFetch={true}
            customMessage="달콤한 맛이 일품인 상품이에요! 🌶️"
          />,
          {
            withAvatar: true,
            delay: 1000,
          },
        );
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, recommendationMessage],
        }));
      });
    } catch (error) {
      console.error('❌ 추천 처리 중 에러:', error);
    }
  };

  handleKeywordSearch = async (keyword) => {
    const userMessage = {
      type: 'user',
      message: keyword,
    };
    const initialBotMessage = this.createChatbotMessage(
      <div>
        <span style={{ fontWeight: 'bold', color: '#729DF2' }}>{keyword}</span>
        와(과) 관련된 상품을 찾아볼게요! 🔍
      </div>,
      {
        withAvatar: true,
        delay: 500,
      },
    );
    this.updateChatbotState(userMessage, initialBotMessage);

    try {
      const response = await fetch(
        `/api/products/recommend/${encodeURIComponent(keyword)}`,
      );
      const recommendations = await response.json();
      console.log('📦 받은 추천 결과:', recommendations);
      recommendations.forEach((product) => {
        const recommendationMessage = this.createChatbotMessage(
          <TodaysDeal
            initialData={product}
            skipInitialFetch={true}
            customMessage={`${keyword}와(과) 관련된 상품이에요! ✨`}
          />,
          {
            withAvatar: true,
            delay: 1000,
          },
        );

        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, recommendationMessage],
        }));
      });
    } catch (error) {
      console.error('❌ 추천 처리 중 에러:', error);
    }
  };

  updateChatbotState = (userMessage, botMessage) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, botMessage],
    }));
  };
}

export default ActionProvider;
