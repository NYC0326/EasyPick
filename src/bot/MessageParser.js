// src/bot/MessageParser.js
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    // 모든 메시지를 자연어 쿼리로 처리
    return this.actionProvider.handleNaturalQuery(message);
  }
}

export default MessageParser;
