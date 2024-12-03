import React from 'react';
import '../styles/ItemStarRating.css';

interface ItemReviewInterface {
  visible: boolean;
  totalreview?: number;
  ratingpercentage?: number;
}

const ItemReview: React.FC<ItemReviewInterface> = ({
  visible,
  totalreview,
  ratingpercentage,
}) => {
  if (!visible) return null;

  return (
    <div style={{ marginTop: '1px' }}>
      <p>리뷰 요약 1</p>
      <p>리뷰 요약 2</p>
      <p>리뷰 요약 3</p>
      <p>AI가 {totalreview}개의 상품 리뷰를 정리했어요!</p>
      <p>약 {ratingpercentage}%의 소비자가 이 상품에 만족했어요!</p>
    </div>
  );
};

export default ItemReview;
