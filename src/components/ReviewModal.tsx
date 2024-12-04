import React from 'react';
import { RiRobot2Fill } from 'react-icons/ri';
import { Line } from 'react-chartjs-2';
import ProductReviews from './ProductReviews';

interface Product {
  productID: string;
  manufacturer: string;
  title: string;
  currentPrice: number;
  originalPrice: number;
  discountRate: number;
  imageUrl: string;
  productLink: string;
  likePrice: number;
}

interface ReviewData {
  pros: ReviewCategory[];
  cons: ReviewCategory[];
  reviewNum: number;
}

interface ReviewCategory {
  icon: JSX.Element;
  keyword: string;
  summary: string;
  details: string[];
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  reviewData: ReviewData | undefined;
  priceHistory: any[];
}

const modalStyles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'relative' as const,
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '80vh',
    overflow: 'auto',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  closeButton: {
    position: 'absolute' as const,
    top: '16px',
    right: '16px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#6b7280',
  },
};

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  product,
  reviewData,
  priceHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <button style={modalStyles.closeButton} onClick={onClose}>
          ×
        </button>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
            {product.manufacturer}
          </h3>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>
            {product.title}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
              }}
            >
              {product.discountRate}% OFF
            </span>
            <div>
              <span
                style={{
                  textDecoration: 'line-through',
                  color: '#9ca3af',
                  fontSize: '1rem',
                }}
              >
                ₩{Number(product.originalPrice).toLocaleString()}
              </span>
              <span
                style={{
                  color: '#dc2626',
                  fontWeight: 'bold',
                  fontSize: '1.4rem',
                  marginLeft: '8px',
                }}
              >
                ₩{Number(product.currentPrice).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {reviewData && (
          <>
            <h4
              style={{
                textAlign: 'center',
                margin: '1rem 0',
                color: '#1f2937',
                fontSize: '15px',
                fontWeight: '600',
              }}
            >
              <RiRobot2Fill
                style={{
                  verticalAlign: 'middle',
                  marginRight: '4px',
                  color: '#1f2937',
                }}
              />
              AI가 {reviewData.reviewNum?.toLocaleString() ?? 0}개의 상품평을
              정리했어요!
            </h4>
            <ProductReviews reviewData={reviewData} />

            <h4
              style={{
                textAlign: 'center',
                margin: '2rem 0 1rem 0',
                color: '#1f2937',
                fontSize: '15px',
                fontWeight: '600',
              }}
            >
              📈 가격변동 그래프를 보여줄게요
            </h4>
            <Line
              data={{
                labels: priceHistory.map((entry) =>
                  new Date(entry.price_time).toLocaleDateString('ko-KR', {
                    month: 'numeric',
                    day: 'numeric',
                  }),
                ),
                datasets: [
                  {
                    label: '',
                    data: priceHistory.map((entry) => entry.price_at),
                    borderColor: 'rgba(75,192,192,1)',
                    fill: false,
                  },
                ],
              }}
              options={{
                scales: {
                  x: { title: { display: false } },
                  y: { title: { display: true, text: '가격 (₩)' } },
                },
                plugins: { legend: { display: false } },
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
