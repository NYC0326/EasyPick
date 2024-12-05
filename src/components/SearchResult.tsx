// src/components/Favorite.tsx
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
  product_link: string; // 필요한 다른 속성 추가
  brand: string;
  current_price: number;
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
        const finalCategory = category || '밀키트';
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
          <select
            style={{ marginLeft: 'auto' }}
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)} // 정렬 기준 변경 시 상태 업데이트
          >
            <option value="recent">평점 순</option>
            <option value="popular">최다 리뷰순</option>
            <option value="lowprice">최저가순</option>
          </select>
        </div>
        <hr color="gray" />

        {products.map(
          (
            product,
            index, // 제품 목록 렌더링
          ) => (
            <ItemTemplate
              key={index} // 각 아이템의 고유 키로 product_link 사용
              name={product.product_name} // 실제 제품 이름으로 변경
              imageUrl={product.img_url} // 실제 이미지 URL로 변경
              purchaseLink={product.product_link} // 실제 구매 링크로 변경
              rating={product.score_review}
              current_price={product.current_price}
            />
          ),
        )}
      </div>
      <Footer />
    </div>
  );
};
export default SearchResult;
