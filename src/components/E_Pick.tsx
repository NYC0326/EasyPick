// src/components/E_Pick.tsx
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import ProductReviews from './ProductReviews';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import {
  FiCoffee,
  FiMoreHorizontal,
  FiPackage,
  FiDollarSign,
  FiClock,
  FiTruck,
} from 'react-icons/fi';
import { RiRobot2Fill } from 'react-icons/ri';

// Chart.js 레지스터 설정
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
);

interface Product {
  productID: string;
  manufacturer: string;
  title: string;
  currentPrice: string;
  originalPrice: string;
  imageUrl: string;
  productLink: string;
  discountRate: number;
}

const getIcon = (iconName: string): JSX.Element => {
  const iconMap: { [key: string]: JSX.Element } = {
    FiTruck: <FiTruck />,
    FiCoffee: <FiCoffee />,
    FiPackage: <FiPackage />,
    FiDollarSign: <FiDollarSign />,
    FiClock: <FiClock />,
    FiMoreHorizontal: <FiMoreHorizontal />,
  };
  return iconMap[iconName] || <FiMoreHorizontal />;
};

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

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

// Modal 스타일 상수 추가
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

const E_Pick: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviewsData, setReviewsData] = useState<{ [key: string]: ReviewData }>(
    {},
  );
  const [expandedProduct] = useState<string | null>(null);
  const [priceHistory, setPriceHistory] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchReviews = async (productId: string) => {
    try {
      const reviewResponse = await api.get(
        `/api/products/${productId}/reviews`,
      );
      const reviewsData = reviewResponse.data;
      const formattedReviews: ReviewData = {
        pros: reviewsData.pros.map((review: any) => ({
          icon: getIcon(review.icon_name),
          keyword: review.category_name,
          summary: review.summary,
          details: review.details,
        })),
        cons: reviewsData.cons.map((review: any) => ({
          icon: getIcon(review.icon_name),
          keyword: review.category_name,
          summary: review.summary,
          details: review.details,
        })),
        reviewNum: reviewsData.reviewNum,
      };
      setReviewsData((prev) => ({
        ...prev,
        [productId]: formattedReviews,
      }));
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const fetchPriceHistory = async (productId: string) => {
    try {
      const response = await api.get(
        `/api/products/${productId}/price-history`,
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch price history:', error);
      return [];
    }
  };

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

  useEffect(() => {
    if (expandedProduct) {
      fetchPriceHistory(expandedProduct).then((data) => setPriceHistory(data));
    }
  }, [expandedProduct]);

  const handleReviewClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    if (!reviewsData[product.productID]) {
      fetchReviews(product.productID);
    }
    fetchPriceHistory(product.productID).then((data) => setPriceHistory(data));
  };

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
          <div key={product.productID}>
            <ProductCard
              manufacturer={product.manufacturer}
              name={product.title}
              price={product.currentPrice}
              originalPrice={product.originalPrice}
              imageUrl={product.imageUrl}
              purchaseLink={product.productLink}
              discountRate={product.discountRate}
              onReviewClick={() => handleReviewClick(product)}
            />
          </div>
        ))}
      </div>

      {/* 모달 창 */}
      {isModalOpen && selectedProduct && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.content}>
            <button
              style={modalStyles.closeButton}
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
                {selectedProduct.manufacturer}
              </h3>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>
                {selectedProduct.title}
              </h2>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
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
                  {selectedProduct.discountRate}% OFF
                </span>
                <div>
                  <span
                    style={{
                      textDecoration: 'line-through',
                      color: '#9ca3af',
                      fontSize: '1rem',
                    }}
                  >
                    ₩{Number(selectedProduct.originalPrice).toLocaleString()}
                  </span>
                  <span
                    style={{
                      color: '#dc2626',
                      fontWeight: 'bold',
                      fontSize: '1.4rem',
                      marginLeft: '8px',
                    }}
                  >
                    ₩{Number(selectedProduct.currentPrice).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {reviewsData[selectedProduct.productID] && (
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
                  AI가{' '}
                  {reviewsData[
                    selectedProduct.productID
                  ].reviewNum?.toLocaleString() ?? 0}
                  개의 상품평을 정리했어요!
                </h4>
                <ProductReviews
                  reviewData={reviewsData[selectedProduct.productID]}
                />

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
      )}
    </div>
  );
};

export default E_Pick;
