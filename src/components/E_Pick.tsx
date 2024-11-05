// src/components/E_Pick.tsx
import React from 'react';
import ProductCard from './ProductCard';

const E_Pick: React.FC = () => (
  <section style={{ padding: '1rem' }}>
    <h2>E's PICK</h2>
    <div
      style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}
    >
      <ProductCard
        name="비비고 왕교자"
        weight="1.4kg"
        price="12,060"
        originalPrice="12,460"
        imageUrl="https://example.com/image1.jpg"
      />
      <ProductCard
        name="밀푀유나베 밀키트"
        weight="1,044kg"
        price="14,500"
        originalPrice="17,900"
        imageUrl="https://example.com/image2.jpg"
      />
    </div>
  </section>
);

export default E_Pick;
