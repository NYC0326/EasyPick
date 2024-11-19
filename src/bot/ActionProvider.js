// src/bot/ActionProvider.js
class ActionProvider {
  constructor(createChatbotMessage, setStateFunc) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
  }

  handleKoreanFood = () => {
    const message = this.createChatbotMessage(
      '한식을 선택하셨네요! 추천 메뉴를 보여드릴게요.',
    );
    this.updateChatbotState(message);
  };

  handleChineseFood = () => {
    const message = this.createChatbotMessage(
      '중식을 선택하셨네요! 추천 메뉴를 보여드릴게요.',
    );
    this.updateChatbotState(message);
  };

  handleJapaneseFood = () => {
    const message = this.createChatbotMessage(
      '일식을 선택하셨네요! 추천 메뉴를 보여드릴게요.',
    );
    this.updateChatbotState(message);
  };

  handleWesternFood = () => {
    const message = this.createChatbotMessage(
      '양식을 선택하셨네요! 추천 메뉴를 보여드릴게요.',
    );
    this.updateChatbotState(message);
  };

  updateChatbotState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
