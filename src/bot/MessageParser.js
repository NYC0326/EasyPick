// src/bot/MessageParser.js
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    // 입력된 메시지를 그대로 키워드로 사용
    const keyword = message.trim();
    if (keyword) {
      // ActionProvider에 새로운 메소드 추가
      this.actionProvider.handleKeywordSearch(keyword);
    }
  }
}

export default MessageParser;
