// src/components/Favorite.tsx
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import ItemTemplate from './ItemTemplate';

const length = 2;

const SearchResult: React.FC = () => (
  <div>
    <Header /> { }
    <hr color="gray"></hr>
      <a>전체 상품</a> 
      <a style={{color: '#1F64BF'}}> 총 {length}개 </a>
    <hr color="gray"></hr>
    
    {Array.from({ length }).map((_, index) => (
      <ItemTemplate
        name="안원당 갈비탕"
        weight="700g"
        imageUrl="https://img.danawa.com/prod_img/500000/876/270/img/68270876_1.jpg?shrink=130:130&_v=20241005073111"
        purchaseLink="https://prod.danawa.com/bridge/loadingBridge.html?cate1=46803&cate2=56857&cate3=56877&cate4=0&pcode=68270876&cmpnyc=ED903&safe_trade=4&fee_type=T&link_pcode=2749746889&package=0&setpc=0"
      />
    ))}
    <Footer /> {/* Footer를 페이지 하단에 추가 */}
  </div>
);

export default SearchResult;
