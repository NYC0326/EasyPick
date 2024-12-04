// src/components/Favorite.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import Header from './Header';
import ProductReviews from './ProductReviews';
import { RiRobot2Fill } from 'react-icons/ri';
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
import ReviewModal from './ReviewModal';

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

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

const Favorite: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviewsData, setReviewsData] = useState<{ [key: string]: ReviewData }>(
    {},
  );
  const [priceHistory, setPriceHistory] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        // user_id = 1인 사용자의 찜한 상품 목록 조회
        const response = await api.get('/api/products/1/likes');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch liked products:', error);
      }
    };

    fetchLikedProducts();
  }, []);

  const fetchReviews = async (productId: string) => {
    try {
      const reviewResponse = await api.get(
        `/api/products/${productId}/reviews`,
      );
      const reviewsData = reviewResponse.data;
      setReviewsData((prev) => ({
        ...prev,
        [productId]: reviewsData,
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
      setPriceHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch price history:', error);
      return [];
    }
  };

  const handleReviewClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    if (!reviewsData[product.productID]) {
      fetchReviews(product.productID);
    }
    fetchPriceHistory(product.productID);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <div style={{ padding: '1rem', flex: 1 }}>
        <div style={{ padding: '0 20px' }}>
          <h2>찜한 상품</h2>
          <p>전체 {products.length}개</p>
        </div>
        <hr color="gray" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            padding: '20px',
          }}
        >
          {products.map((product) => {
            const priceDifference = product.currentPrice - product.likePrice;
            const isPriceIncreased = priceDifference > 0;
            return (
              <div
                key={product.productID}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '1rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: `3px solid ${isPriceIncreased ? '#dc2626' : '#03318C'}`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      {product.manufacturer}
                    </div>
                    <h3 style={{ margin: '0.5rem 0', fontSize: '1rem' }}>
                      {product.title}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
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
                          display: 'flex',
                          alignItems: 'center',
                          boxShadow: '0 2px 4px rgba(220, 38, 38, 0.2)',
                        }}
                      >
                        {product.discountRate}%
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span
                          style={{
                            textDecoration: 'line-through',
                            color: '#9ca3af',
                            fontSize: '1.1rem',
                            marginBottom: '2px',
                            fontWeight: '500',
                          }}
                        >
                          ₩{product.originalPrice.toLocaleString()}
                        </span>
                        <span
                          style={{
                            color: '#dc2626',
                            fontWeight: 'bold',
                            fontSize: '1.4rem',
                            lineHeight: '1',
                          }}
                        >
                          ₩{product.currentPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: '12px',
                        padding: '10px',
                        width: '83%',
                        backgroundColor: isPriceIncreased
                          ? 'rgba(220, 38, 38, 0.1)'
                          : 'rgba(3, 49, 140, 0.1)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: isPriceIncreased
                            ? '#dc2626'
                            : '#03318C',
                          padding: '6px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {isPriceIncreased ? (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="white"
                          >
                            <path d="M7 14l5-5 5 5z" />
                          </svg>
                        ) : (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="white"
                          >
                            <path d="M7 10l5 5 5-5z" />
                          </svg>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: '0' }}>
                        <div
                          style={{
                            fontSize: '0.9rem',
                            color: '#666',
                            marginBottom: '2px',
                          }}
                        >
                          찜한 가격 대비
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '4px',
                            flexWrap: 'wrap',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '1.1rem',
                              fontWeight: '600',
                              color: isPriceIncreased ? '#dc2626' : '#03318C',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {isPriceIncreased ? '▲' : '▼'} ₩
                            {Math.abs(priceDifference).toLocaleString()}
                          </span>
                          <span
                            style={{
                              fontSize: '0.9rem',
                              color: '#666',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            (₩{product.likePrice.toLocaleString()} → ₩
                            {product.currentPrice.toLocaleString()})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    marginLeft: '22px',
                  }}
                >
                  <button
                    onClick={() => handleReviewClick(product)}
                    style={{
                      flex: 1,
                      fontSize: '13px',
                      backgroundColor: 'white',
                      border: '2px solid #6b7280',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      color: '#6b7280',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                      marginRight: '10px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#1f2937';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = '#6b7280';
                    }}
                  >
                    리뷰 및 가격 변동 보기
                  </button>
                  <a
                    href={product.productLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      fontSize: '14px',
                      backgroundColor: isPriceIncreased ? '#dc2626' : '#03318C',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      textDecoration: 'none',
                      textAlign: 'center',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 4px rgba(124,185,232,0.3)',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = isPriceIncreased
                        ? '#b91c1c'
                        : '#1d4ed8';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow =
                        '0 4px 8px rgba(124,185,232,0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = isPriceIncreased
                        ? '#dc2626'
                        : '#03318C';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow =
                        '0 2px 4px rgba(124,185,232,0.3)';
                    }}
                  >
                    상품 보러가기
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ReviewModal 컴포넌트 사용 */}
      {selectedProduct && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
          reviewData={reviewsData[selectedProduct.productID]}
          priceHistory={priceHistory}
        />
      )}
      <Footer />
    </div>
  );
};

export default Favorite;
