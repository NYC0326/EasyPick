// src/components/Favorite.tsx
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import FavoriteItem from './FavoriteItem';

const Favorite: React.FC = () => (
<div>
  <Header /> { }
  <hr color="gray"></hr>
      <a>전체 상품</a> 
      <a style={{color: '#1F64BF'}}> 총 2개 </a>
    <hr color="gray"></hr>
    <FavoriteItem
      name="오뚜기 맛있는 육개장"
      weight="38g"
      price="26,150"
      originalPrice="30,520"
      imageUrl="https://img.danawa.com/prod_img/500000/452/126/img/4126452_1.jpg?shrink=130:130&_v=20180109101535"
    />
    <Footer /> {/* Footer를 페이지 하단에 추가 */}
</div>
);

export default Favorite;
