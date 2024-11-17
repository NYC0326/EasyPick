// src/components/Favorite.tsx
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import SearchHeader from './SearchHeader';
import ItemTemplate from './ItemTemplate';

const length = 3;

const SearchResult: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      paddingBottom: '80px',
    }}
  >
    <Header />
    <div
      style={{
        flex: 1,
        width: '100%',
        margin: '0 auto',
      }}
    >
      <SearchHeader />
      <div
        style={{
          display: 'flex',
          padding: '0rem 0',
        }}
      >
        <a style={{ width: '15%', whiteSpace: 'nowrap' }}>전체 상품</a>
        <a style={{ color: '#1F64BF', width: '60%' }}> 총 {length}개 </a>
        <select style={{ marginLeft: 'auto' }}>
          <option value="popular">인기순</option>
          <option value="recent">최신순</option>
          <option value="lowprice">낮은 가격순</option>
        </select>
      </div>
      <hr color="gray" />
      {Array.from({ length }).map((_, index) => (
        <ItemTemplate
          key={index}
          name="안원당 갈비탕"
          weight="700g"
          imageUrl="https://img.danawa.com/prod_img/500000/876/270/img/68270876_1.jpg?shrink=130:130&_v=20241005073111"
          purchaseLink="https://prod.danawa.com/bridge/loadingBridge.html?cate1=46803&cate2=56857&cate3=56877&cate4=0&pcode=68270876&cmpnyc=ED903&safe_trade=4&fee_type=T&link_pcode=2749746889&package=0&setpc=0"
        />
      ))}
    </div>
    <Footer />
  </div>
);

export default SearchResult;