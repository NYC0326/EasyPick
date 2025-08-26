# EasyPick

### Project for ITE3062 - Human Computer Interface class on 2nd semester, 2024

> painless to it, pay less to eat

온라인 식품 쇼핑 시 겪는 정보 과잉과 '리뷰 피로' 문제를 해결하기 위한 LLM 기반 식료품 추천 애플리케이션입니다. 흩어져 있는 상품 정보, 가격, 리뷰를 한곳에 모아 분석하고, 사용자에게 맞춤형 추천을 제공합니다.

---

## Key Features

* **LLM 기반 리뷰 요약**: 수많은 리뷰를 `맛`, `가격`, `배송` 등 5가지 카테고리로 나누어 긍정/부정 내용을 한눈에 보여줍니다.
* **스마트 검색**: "자취생을 위한 가성비 좋은 밀키트 추천해줘"와 같은 자연어 질문에 최적화된 상품을 추천하는 챗봇 기능입니다.
* **가격 변동 추적**: 관심 상품의 과거 가격 변동을 그래프로 확인하고, 최저가 시점을 파악할 수 있습니다.
* **오늘의 특가**: 매일 할인율이 가장 높은 상품들을 모아 보여줍니다.
* **관심 상품**: 위시리스트에 담은 상품의 가격 변동을 추적하고, 구매 시점 대비 가격 변화를 쉽게 확인할 수 있습니다.

---

## Tech Stack

| Category   | Technologies                   |
| ---------- | ------------------------------ |
| **Frontend** | `React`, `TypeScript`          |
| **Backend** | `Node.js`, `Express`           |
| **Database** | `MySQL`                        |
| **LLM** | `GPT-4o-mini`, `LangChain`     |
| **DevTools** | `Notion`, `GitHub`, `Figma`    |

---

## Getting Started

프로젝트를 로컬 환경에서 실행하려면 아래 저장소를 클론하세요.

**Frontend:**

    git clone https://github.com/NYC0326/EasyPick
    cd EasyPick
    npm install
    npm start

**Backend:**

    git clone https://github.com/Jibinhwang/EasyPickBackEnd
    cd EasyPickBackEnd
    npm install
    npm start

## User Feedback

* **리뷰 분석 및 AI 추천 만족도**: **91.7%**
* **가격 정보 및 그래프 가독성**: **75% 이상**
* **'오늘의 특가' 기능 유용성**: **95.8%**

---

## Contributors

* 황지빈
* 남유찬
* 김도훈
* 이세은
