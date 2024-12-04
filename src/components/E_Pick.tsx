// src/components/E_Pick.tsx
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

interface Product {
  productID: string;
  manufacturer: string;
  title: string;
  currentPrice: string;
  originalPrice: string;
  imageUrl: string;
  productLink: string;
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

const E_Pick: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products/top-reviewed-discounts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ marginTop: '26px', marginBottom: '16px' }}>
      <h2 style={{ fontSize: '1rem' }}> E's PICK </h2>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'space-between',
        }}
      >
        {products.map((product: Product) => (
          <ProductCard
            key={product.productID}
            manufacturer={product.manufacturer}
            name={product.title}
            price={product.currentPrice}
            originalPrice={product.originalPrice}
            imageUrl={product.imageUrl}
            purchaseLink={product.productLink}
          />
        ))}
      </div>
    </div>
  );
};

export default E_Pick;
