// src/components/SearchResult.tsx
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import SearchHeader from './SearchHeader';
import ItemTemplate from './ItemTemplate';
import { useLocation } from 'react-router-dom';

interface Product {
  product_name: string;
  img_url: string;
  score_review: number;
  product_link: string;
  brand: string;
  current_price: number;
  regular_price: number;
  discount_rate: number;
  review_num: number;
}

interface SearchProduct {
  category?: string;
}

const SearchResult: React.FC<SearchProduct> = ({ category }) => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]); // 제품의 타입을 지정
  const [orderBy, setOrderBy] = useState('score'); // 정렬 기준 상태 추가
  const length = products.length; // 제품 수 업데이트

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const finalCategory = location.state.categorygogo || '밀키트';
        console.log(finalCategory);
        const params = new URLSearchParams();
        params.append('category', finalCategory);
        // 파라미터 영문으로 변경
        if (orderBy === '최다 리뷰순') {
          setOrderBy('review');
          params.append('orderBy', 'review');
        } else if (orderBy === '평점순') {
          setOrderBy('score');
          params.append('orderBy', 'score');
        } else if (orderBy === '최저가순') {
          setOrderBy('price');
          params.append('orderBy', 'price');
        }
        const response = await fetch(`
          /api/products/search?${params.toString()}`); // GET 요청
        const data = await response.json();
        setProducts(data); // 제품 상태 업데이트
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [orderBy]); // orderBy가 변경될 때마다 요청

  return (
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
          padding: '1rem',
        }}
      >
        <SearchHeader />
        <div
          style={{
            display: 'flex',
            padding: '1rem 0',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '1.1rem', color: '#666' }}>전체 상품</span>
          <span
            style={{
              color: '#03318C',
              marginLeft: '1rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
            }}
          >
            총 {length}개
          </span>
          <select
            style={{
              marginLeft: 'auto',
              padding: '8px',
              borderRadius: '8px',
              border: '1px solid #ddd',
            }}
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
          >
            <option value="score">평점 순</option>
            <option value="review">최다 리뷰순</option>
            <option value="price">최저가순</option>
          </select>
        </div>
        <hr style={{ border: '1px solid #eee' }} />

        <div
          style={{
            display: 'grid',
            gap: '1rem',
            padding: '1rem 0',
          }}
        >
          {products.map((product, index) => (
            <ItemTemplate
              key={index}
              name={product.product_name}
              imageUrl={product.img_url}
              purchaseLink={product.product_link}
              rating={product.score_review}
              current_price={product.current_price}
              original_price={product.regular_price}
              discount={product.discount_rate}
              review_num={product.review_num}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default SearchResult;
