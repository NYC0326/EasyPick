// src/components/Favorite.tsx
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import ItemTemplate from './ItemTemplate';
import SearchHeader from './SearchHeader';

const length = 3;
const searchIcon = require('../icon/search-icon.png');

const SearchResult: React.FC = () => {
  return (
    <div>
      <Header />
      <SearchHeader />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        <a style={{ width: '15%' }}>전체 상품</a>
        <a style={{ color: '#1F64BF', width: '60%' }}> 총 {length}개 </a>
        <select>
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
      <Footer />
    </div>
  );
};

export default SearchResult;
