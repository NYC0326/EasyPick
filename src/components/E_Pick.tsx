// src/components/E_Pick.tsx
import React from 'react';
import ProductCard from './ProductCard';

const E_Pick: React.FC = () => (
  <div style={{ marginTop: '26px', marginBottom: '16px' }}>
    <h2 style={{ fontSize: '1rem' }}> E's PICK </h2>
    <div
      style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}
    >
      <ProductCard
        manufacturer="오픈더테이블"
        name="안원당 갈비탕"
        weight="700g"
        price="15,920"
        originalPrice="17,500"
        imageUrl="https://img.danawa.com/prod_img/500000/876/270/img/68270876_1.jpg?shrink=130:130&_v=20241005073111"
        purchaseLink="https://prod.danawa.com/bridge/loadingBridge.html?cate1=46803&cate2=56857&cate3=56877&cate4=0&pcode=68270876&cmpnyc=ED903&safe_trade=4&fee_type=T&link_pcode=2749746889&package=0&setpc=0"
      />
      <ProductCard
        manufacturer="오뚜기"
        name="맛있는 육개장"
        weight="38g"
        price="26,150"
        originalPrice="30,520"
        imageUrl="https://img.danawa.com/prod_img/500000/452/126/img/4126452_1.jpg?shrink=130:130&_v=20180109101535"
        purchaseLink="https://prod.danawa.com/bridge/loadingBridge.html?cate1=46803&cate2=56857&cate3=56877&cate4=0&pcode=4126452&cmpnyc=EE715&safe_trade=4&fee_type=T&link_pcode=C960718040&package=0&setpc=0"
      />
    </div>
  </div>
);

export default E_Pick;
