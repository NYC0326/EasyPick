// src/components/E_Pick.tsx
import React from 'react';
import ProductCard from './ProductCard';

const E_Pick: React.FC = () => (
  <section style={{ padding: '2rem' }}>
    <h2 style={{ fontSize: '1.2rem' }}>E's PICK</h2>
    <div
      style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}
    >
      <ProductCard
        name="오픈더테이블 안원당 갈비탕"
        weight="700g"
        price="15,920"
        originalPrice="17,500"
        imageUrl="https://img.danawa.com/prod_img/500000/876/270/img/68270876_1.jpg?shrink=130:130&_v=20241005073111"
      />
      <ProductCard
        name="오뚜기 맛있는 육개장"
        weight="38g"
        price="26,150"
        originalPrice="30,520"
        imageUrl="https://img.danawa.com/prod_img/500000/452/126/img/4126452_1.jpg?shrink=130:130&_v=20180109101535"
      />
    </div>
  </section>
);

export default E_Pick;
