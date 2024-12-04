// src/components/Favorite.tsx
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import SearchHeader from './SearchHeader';
import ItemTemplate from './ItemTemplate';

interface Product {
  product_name: string;
  weight: string; // 필요에 따라 타입 조정
  imageUrl: string;
  product_link: string; // 필요한 다른 속성 추가
}

const SearchResult: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // 제품의 타입을 지정
  const [orderBy, setOrderBy] = useState('popular'); // 정렬 기준 상태 추가
  const length = products.length; // 제품 수 업데이트

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products/search/${orderBy}`); // GET 요청
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
            <option value="popular">최다 리뷰순</option>
            <option value="recent">평점 순</option>
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
              weight={product.weight} // 실제 무게로 변경
              imageUrl={product.imageUrl} // 실제 이미지 URL로 변경
              purchaseLink={product.product_link} // 실제 구매 링크로 변경
            />
          ),
        )}
      </div>
      <Footer />
    </div>
  );
};
export default SearchResult;
