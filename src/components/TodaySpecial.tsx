// src/components/Todayspecial.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import Header from './Header';
import ProductReviews from './ProductReviews';
import {
  FiTruck,
  FiCoffee,
  FiPackage,
  FiDollarSign,
  FiClock,
  FiMoreHorizontal,
} from 'react-icons/fi';
import { RiRobot2Fill } from 'react-icons/ri';
import { Line } from 'react-chartjs-2'; // Chart.js 사용 예시
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
import { AiFillHeart } from 'react-icons/ai';

interface Product {
  productID: string;
  manufacturer: string;
  title: string;
  currentPrice: number;
  originalPrice: number;
  discountRate: number;
  imageUrl: string;
  productLink: string;
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

const TodaySpecial: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviewsData, setReviewsData] = useState<{
    [key: string]: ReviewData;
  }>({});
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [priceHistory, setPriceHistory] = useState<any[]>([]);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchTopDiscounts = async () => {
      try {
        // 할인율 높은 상품 10개 조회
        const response = await api.get('/api/products/top-discounts');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchTopDiscounts();
  }, []);

  // 리뷰 데이터 가져오기
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
    if (expandedProduct) {
      fetchPriceHistory(expandedProduct).then((data) => setPriceHistory(data));
    }
  }, [expandedProduct]);

  // 초기에 찜한 상품 목록 가져오기
  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        const response = await api.get('/api/products/1/likes');
        const likedIds = new Set<string>(
          response.data.map((product: Product) => product.productID.toString()),
        );
        setLikedProducts(likedIds);
      } catch (error) {
        console.error('Failed to fetch liked products:', error);
      }
    };
    fetchLikedProducts();
  }, []);

  // 찜하기/해제 처리 함수
  const handleLikeToggle = async (product: Product) => {
    try {
      if (likedProducts.has(product.productID)) {
        // 찜 해제
        await api.delete(`/api/products/1/likes/${product.productID}`);
        setLikedProducts((prev) => {
          const next = new Set(prev);
          next.delete(product.productID);
          return next;
        });
      } else {
        // 찜하기
        await api.post(`/api/products/1/likes/${product.productID}`, {
          currentPrice: product.currentPrice,
        });
        setLikedProducts((prev) => new Set([...prev, product.productID]));
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  const SalePickImage = require('../icon/Sale_pick.png');

  return (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Header />
      <div style={{ padding: '1rem', flex: 1, marginBottom: '80px' }}>
        <img
          src={SalePickImage}
          alt="오늘의 특가"
          style={{
            display: 'block',
            margin: '0 auto 1rem auto',
            maxWidth: '200px',
            height: 'auto',
          }}
        />
        <p
          style={{
            textAlign: 'center',
            color: '#4B5563',
            fontSize: '1.1rem',
            fontWeight: '500',
            margin: '0 0 1rem 0',
          }}
        >
          오늘 가격이 가장 많이 떨어진 상품을 보여드려요!
        </p>
        <hr
          style={{
            border: 'none',
            height: '1px',
            backgroundColor: '#E5E7EB',
            margin: '0 auto 2rem auto',
            width: '90%',
          }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
          }}
        >
          {products.map((product) => (
            <div key={product.productID} style={{ position: 'relative' }}>
              <button
                onClick={() => handleLikeToggle(product)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  zIndex: 1,
                  padding: '8px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.backgroundColor =
                    'rgba(255, 255, 255, 1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor =
                    'rgba(255, 255, 255, 0.8)';
                }}
              >
                <AiFillHeart
                  size={24}
                  color={
                    likedProducts.has(product.productID) ? '#dc2626' : '#d1d5db'
                  }
                />
              </button>
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '1rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                <div
                  style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}
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
                  </div>
                </div>

                {/* 버튼 그룹 수정 */}
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    marginLeft: '22px',
                  }}
                >
                  <button
                    onClick={() => {
                      if (expandedProduct === product.productID) {
                        setExpandedProduct(null);
                      } else {
                        setExpandedProduct(product.productID);
                        if (!reviewsData[product.productID]) {
                          fetchReviews(product.productID);
                        }
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      fontSize: '14px',
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
                      backgroundColor: '#03318C',
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
                      e.currentTarget.style.backgroundColor = '#blue';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow =
                        '0 4px 8px rgba(124,185,232,0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#03318C';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow =
                        '0 2px 4px rgba(124,185,232,0.3)';
                    }}
                  >
                    상품 보러가기
                  </a>
                </div>

                {expandedProduct === product.productID &&
                  reviewsData[product.productID] && (
                    <div>
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
                          product.productID
                        ]?.reviewNum?.toLocaleString() ?? 0}
                        개의 상품평을 정리했어요!
                      </h4>
                      <ProductReviews
                        reviewData={reviewsData[product.productID]}
                      />
                      {/* 가격 변동 그래프 */}
                      <div>
                        <h4
                          style={{
                            textAlign: 'center',
                            margin: '1rem 0',
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
                              new Date(entry.price_time).toLocaleDateString(
                                'ko-KR',
                                {
                                  month: 'numeric',
                                  day: 'numeric',
                                },
                              ),
                            ),
                            datasets: [
                              {
                                label: '',
                                data: priceHistory.map(
                                  (entry) => entry.price_at,
                                ),
                                borderColor: 'rgba(75,192,192,1)',
                                fill: false,
                                pointBackgroundColor: priceHistory.map(
                                  (entry) => {
                                    const minPrice = Math.min(
                                      ...priceHistory.map((e) => e.price_at),
                                    );
                                    return entry.price_at === minPrice
                                      ? 'red'
                                      : 'rgba(75,192,192,1)';
                                  },
                                ),
                                pointBorderColor: priceHistory.map((entry) => {
                                  const minPrice = Math.min(
                                    ...priceHistory.map((e) => e.price_at),
                                  );
                                  return entry.price_at === minPrice
                                    ? 'red'
                                    : 'rgba(75,192,192,1)';
                                }),
                                pointRadius: priceHistory.map((entry) => {
                                  const minPrice = Math.min(
                                    ...priceHistory.map((e) => e.price_at),
                                  );
                                  return entry.price_at === minPrice ? 6 : 3;
                                }),
                              },
                            ],
                          }}
                          options={{
                            scales: {
                              x: {
                                title: {
                                  display: false,
                                },
                              },
                              y: {
                                title: {
                                  display: true,
                                  text: '가격 (₩)',
                                },
                              },
                            },
                            plugins: {
                              legend: {
                                display: false,
                              },
                              annotation: {
                                annotations: Object.fromEntries(
                                  priceHistory
                                    .map((entry, index) => {
                                      const minPrice = Math.min(
                                        ...priceHistory.map((e) => e.price_at),
                                      );
                                      const latestMinPriceIndex = priceHistory
                                        .map((e, i) => ({
                                          price: e.price_at,
                                          index: i,
                                        }))
                                        .filter((e) => e.price === minPrice)
                                        .pop()?.index;
                                      if (
                                        entry.price_at === minPrice &&
                                        index === latestMinPriceIndex
                                      ) {
                                        return [
                                          `label${index}`,
                                          {
                                            type: 'label' as const,
                                            xValue: index,
                                            yValue: entry.price_at,
                                            backgroundColor:
                                              'rgba(255, 255, 255, 0.2)',
                                            borderColor: 'red',
                                            borderWidth: 1,
                                            content: `역대최저가 ${entry.price_at.toLocaleString()}원`,
                                            enabled: true,
                                            position: 'top',
                                            yAdjust: -20,
                                            xAdjust: -60,
                                            color: 'red',
                                            font: {
                                              size: 12,
                                              weight: 'bold',
                                            },
                                            padding: 4,
                                          } as const,
                                        ];
                                      }
                                      return null;
                                    })
                                    .filter(
                                      (item): item is [string, any] =>
                                        item !== null,
                                    ),
                                ),
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TodaySpecial;
