import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FiTruck,
  FiCoffee,
  FiPackage,
  FiDollarSign,
  FiClock,
  FiMoreHorizontal,
} from 'react-icons/fi';
import ReviewModal from './ReviewModal';
import { AiFillHeart } from 'react-icons/ai';
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
const ChatpickIcon = require('../../icon/Chatpick.png');

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

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

interface DealType {
  manufacturer: string;
  title: string;
  weight: string;
  currentPrice: number;
  originalPrice: number;
  discountRate: number;
  imageUrl: string;
  productLink: string;
  productID: string;
}

interface Props {
  initialData?: DealType;
  skipInitialFetch?: boolean;
  customMessage?: string;
}

const TodaysDeal: React.FC<Props> = ({
  initialData,
  skipInitialFetch = false,
  customMessage = '오늘 할인율이 가장 큰 상품을 추천해줄게요',
}) => {
  interface ReviewCategory {
    icon: JSX.Element;
    keyword: string;
    summary: string;
    details: string[];
  }

  interface ReviewData {
    pros: ReviewCategory[];
    cons: ReviewCategory[];
    reviewNum: number;
  }

  const [deal, setDeal] = useState<DealType | null>(initialData || null);
  const [reviewData, setReviewData] = useState<ReviewData>({
    pros: [],
    cons: [],
    reviewNum: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pros' | 'cons'>('pros');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<string>('');
  const [showReviews, setShowReviews] = useState<boolean>(false);
  const [originalReviews, setOriginalReviews] = useState<string[]>([]);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [showPriceChart, setShowPriceChart] = useState(false);
  const [priceHistory, setPriceHistory] = useState<any[]>([]);

  // 아이콘 매핑 함수
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        let currentDeal;
        if (initialData) {
          setDeal(initialData);
          currentDeal = initialData;
        } else if (!skipInitialFetch) {
          const dealResponse = await api.get('/api/products/todays-deal');
          console.log('Deal Response:', dealResponse.data);
          const dealData = dealResponse.data;
          setDeal(dealData);
          currentDeal = dealData;
        }

        // 리뷰 데이터 가져오기
        if (currentDeal) {
          const productId = currentDeal.productID;
          console.log('Fetching reviews for product ID:', productId);
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
          setReviewData(formattedReviews);

          // 추천 메시지 가져오기
          const recommendationResponse = await api.get(
            `/api/products/${productId}/recommendation`,
          );
          setRecommendation(recommendationResponse.data.recommendation);
          setOriginalReviews(
            recommendationResponse.data.productDetails.reviews,
          );
        }
      } catch (err) {
        console.error('Error details:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialData, skipInitialFetch]);

  // 초기에 찜한 상품 목록 가져오기
  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        const response = await api.get('/api/products/1/likes');
        const likedIds = new Set<string>(
          response.data.map((product: DealType) =>
            product.productID.toString(),
          ),
        );
        console.log('Fetched liked products:', likedIds); // 디버깅용
        setLikedProducts(likedIds);
      } catch (error) {
        console.error('Failed to fetch liked products:', error);
      }
    };

    if (deal) {
      fetchLikedProducts();
    }
  }, [deal]);

  // handleLikeToggle 함수 추가
  const handleLikeToggle = async (product: DealType) => {
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

  // 가격 변동 데이터 가져오기
  const fetchPriceHistory = async (productId: string) => {
    try {
      const response = await api.get(
        `/api/products/${productId}/price-history`,
      );
      setPriceHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch price history:', error);
    }
  };

  // 가격 변동 그래프 모달
  const PriceChartModal = ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) => {
    if (!isOpen) return null;

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
        onClick={onClose}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'auto',
            position: 'relative',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#6b7280',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            ✕
          </button>

          <h3 style={{ marginTop: 0, textAlign: 'center' }}>
            가격 변동 그래프
          </h3>
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
                  pointBackgroundColor: priceHistory.map((entry) => {
                    const minPrice = Math.min(
                      ...priceHistory.map((e) => e.price_at),
                    );
                    return entry.price_at === minPrice
                      ? 'red'
                      : 'rgba(75,192,192,1)';
                  }),
                },
              ],
            }}
            options={{
              scales: {
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
                  annotations: {
                    ...priceHistory.reduce((acc, entry, index) => {
                      const minPrice = Math.min(
                        ...priceHistory.map((e) => e.price_at),
                      );
                      const minPriceEntries = priceHistory
                        .map((e, i) => ({ price: e.price_at, index: i }))
                        .filter((e) => e.price === minPrice);
                      const lastMinPriceEntry =
                        minPriceEntries[minPriceEntries.length - 1];

                      if (
                        entry.price_at === minPrice &&
                        index === lastMinPriceEntry.index
                      ) {
                        return {
                          ...acc,
                          [`label${index}`]: {
                            type: 'label' as const,
                            xValue: index,
                            yValue: entry.price_at,
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            borderColor: 'red',
                            borderWidth: 1,
                            content: `최저가 ${entry.price_at.toLocaleString()}원`,
                            enabled: true,
                            position: 'top' as const,
                            yAdjust: -20,
                            xAdjust: -60,
                            color: 'red',
                            font: {
                              size: 12,
                              weight: 'bold',
                            },
                            padding: 4,
                          },
                        };
                      }
                      return acc;
                    }, {}),
                  },
                },
              },
            }}
          />
        </div>
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!deal) return <div>No deals available</div>;

  return (
    <div style={{ maxWidth: '320px' }}>
      <div
        style={{
          padding: '0 4px 8px 4px',
          color: '#1f2937',
          fontSize: '14px',
        }}
      >
        {customMessage}
      </div>

      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '6px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '8px',
          }}
        >
          <img
            src={ChatpickIcon}
            alt="EASY's PICK"
            style={{
              width: '140px',
              display: 'block',
              margin: '0 auto',
              marginBottom: '4px',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <img
            src={deal.imageUrl}
            alt={deal.title}
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h3
              style={{
                margin: '0 0 2px 0',
                color: '#1f2937',
                fontSize: '14px',
                fontWeight: '700',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  marginBottom: '0px',
                  fontSize: '11px',
                  fontWeight: '400',
                }}
              >
                {deal.manufacturer}
              </div>
              {deal.title}
            </h3>
            <div style={{ marginTop: '4px' }}>
              {/* 할인가 */}
              <span
                style={{
                  fontWeight: '700',
                  color: '#dc2626',
                  fontSize: '20px',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
              >
                ₩{deal.currentPrice.toLocaleString()}
              </span>
              {/* 원가 */}
              <span
                style={{
                  textDecoration: 'line-through',
                  color: '#9ca3af',
                  fontSize: '14px',
                  display: 'inline-block',
                  position: 'relative',
                  top: '-2px',
                }}
              >
                ₩{deal.originalPrice.toLocaleString()}
              </span>
              {/* 할인율 뱃지 */}
              <span
                style={{
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: '600',
                  marginLeft: '8px',
                  display: 'inline-block',
                  position: 'relative',
                  top: '-2px',
                }}
              >
                {deal.discountRate}% OFF
              </span>
            </div>
            <p
              style={{
                color: '#ef4444',
                margin: '2px 0 0 0',
                fontSize: '12px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              <span>평균가보다 저렴해요!</span>
            </p>
          </div>
        </div>
      </div>

      {/* 구매자 리뷰 분석 섹션 */}
      <div
        style={{
          marginTop: '16px',
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
        }}
      >
        <h4
          style={{
            margin: '0 0 5px 0',
            color: '#6b7280',
            fontSize: '15px',
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          AI가 {reviewData.reviewNum.toLocaleString()}개의 상품평을 정리했어요!
        </h4>

        {/* 탭 버튼 */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '16px',
          }}
        >
          <button
            onClick={() => setActiveTab('pros')}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: activeTab === 'pros' ? '#059669' : '#e5e7eb',
              color: activeTab === 'pros' ? 'white' : '#4b5563',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            👍 장점
          </button>
          <button
            onClick={() => setActiveTab('cons')}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: activeTab === 'cons' ? '#dc2626' : '#e5e7eb',
              color: activeTab === 'cons' ? 'white' : '#4b5563',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            👎 단점
          </button>
        </div>

        {/* 리뷰 카테고리 목록 */}
        <div>
          {reviewData[activeTab].map((category, index) => (
            <div
              key={`${activeTab}-${category.keyword}`}
              style={{
                marginBottom: '12px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              {/* 카테고리 헤더 */}
              <div
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === category.keyword
                      ? null
                      : category.keyword,
                  )
                }
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  cursor: 'pointer',
                  backgroundColor: '#f3f4f6',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: activeTab === 'pros' ? '#059669' : '#dc2626',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  {category.icon}
                  {category.keyword}
                </span>
                <span
                  style={{
                    marginLeft: '12px',
                    flex: 1,
                    fontSize: '13px',
                    color: '#4b5563',
                    fontWeight: '600',
                  }}
                >
                  {category.summary}
                </span>
              </div>

              {/* 상세 리뷰 */}
              {expandedCategory === category.keyword && (
                <div
                  style={{
                    padding: '12px',
                    fontSize: '13px',
                    color: '#4b5563',
                    backgroundColor: 'white',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    {category.details.map((detail, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: '#e5f3ff',
                          padding: '8px 12px',
                          borderRadius: '12px',
                          position: 'relative',
                          marginLeft: '8px',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            left: '-8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '0',
                            height: '0',
                            borderTop: '6px solid transparent',
                            borderBottom: '6px solid transparent',
                            borderRight: '8px solid #e5f3ff',
                          }}
                        />
                        "{detail}"
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 추천 메시지 섹션 */}
      {recommendation && (
        <div
          style={{
            marginTop: '16px',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
          }}
        >
          <h4
            style={{
              margin: '0 0 5px 0',
              color: '#1f2937',
              fontSize: '15px',
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            AI의 추천 메시지
          </h4>
          <div
            style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#4b5563',
              padding: '8px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              whiteSpace: 'pre-line',
            }}
            dangerouslySetInnerHTML={{ __html: recommendation }}
          />
          <button
            onClick={() => setShowReviews(true)}
            style={{
              display: 'block',
              margin: '8px auto 0',
              padding: '6px 12px',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '6px',
              color: '#4b5563',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#e5e7eb';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
          >
            💬 실제 리뷰 보기
          </button>
        </div>
      )}

      {/* 리뷰 모달 컴포넌트 */}
      <ReviewModal
        isOpen={showReviews}
        onClose={() => setShowReviews(false)}
        reviews={originalReviews}
      />

      {/* 버튼 섹션 */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginTop: '16px',
          padding: '0 12px', // 좌우 패딩 추가
        }}
      >
        <button
          onClick={() => {
            fetchPriceHistory(deal.productID);
            setShowPriceChart(true);
          }}
          style={{
            flex: 1,
            padding: '5px',
            backgroundColor: '#f3f4f6',
            border: 'none',
            marginLeft: '20px',
            borderRadius: '8px',
            color: '#4b5563',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#e5e7eb';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
        >
          가격변동 확인
        </button>
        <a
          href={deal.productLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            padding: '5px',
            backgroundColor: '#2563eb',
            color: 'white',
            textAlign: 'center',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#1d4ed8';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          상품 보러가기
        </a>
      </div>

      <button
        onClick={() => handleLikeToggle(deal)}
        className="like-button"
        style={{
          position: 'absolute',
          top: '50px',
          right: '10px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          zIndex: 1,
        }}
      >
        <AiFillHeart
          size={24}
          color={likedProducts.has(deal.productID) ? '#dc2626' : '#d1d5db'}
        />
      </button>

      {/* 가격 변동 그래프 모달 */}
      <PriceChartModal
        isOpen={showPriceChart}
        onClose={() => setShowPriceChart(false)}
      />
    </div>
  );
};

export default TodaysDeal;
