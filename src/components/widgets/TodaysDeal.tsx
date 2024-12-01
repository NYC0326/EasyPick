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
const ChatpickIcon = require('../../icon/Chatpick.png');

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
}

const TodaysDeal: React.FC = () => {
  interface ReviewCategory {
    icon: JSX.Element;
    keyword: string;
    summary: string;
    details: string[];
  }

  interface ReviewData {
    pros: ReviewCategory[];
    cons: ReviewCategory[];
  }

  const [deal, setDeal] = useState<DealType | null>(null);
  const [reviewData, setReviewData] = useState<ReviewData>({
    pros: [],
    cons: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pros' | 'cons'>('pros');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

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
        // 1. 오늘의 딜 데이터 가져오기
        const dealResponse = await api.get('/api/products/todays-deal');
        console.log('Deal Response:', dealResponse.data); // 딜 데이터 확인
        const dealData = dealResponse.data;
        setDeal(dealData);

        // 2. 리뷰 데이터 가져오기
        console.log('Fetching reviews for product ID:', dealData.productID); // productID 확인
        const reviewResponse = await api.get(
          `/api/products/${dealData.productID}/reviews`,
        );
        console.log('Raw Review Response:', reviewResponse.data); // 백엔드에서 받은 원본 데이터 확인

        const reviewsData = reviewResponse.data;
        console.log('Pros Reviews:', reviewsData.pros); // pros 데이터 확인
        console.log('Cons Reviews:', reviewsData.cons); // cons 데이터 확인

        // 리뷰 데이터 변환
        const formattedReviews: ReviewData = {
          pros: reviewsData.pros.map((review: any) => {
            console.log('Processing pro review:', review); // 각 리뷰 처리 과정 확인
            return {
              icon: getIcon(review.icon_name),
              keyword: review.category_name,
              summary: review.summary,
              details: review.details,
            };
          }),
          cons: reviewsData.cons.map((review: any) => {
            console.log('Processing con review:', review); // 각 리뷰 처리 과정 확인
            return {
              icon: getIcon(review.icon_name),
              keyword: review.category_name,
              summary: review.summary,
              details: review.details,
            };
          }),
        };

        console.log('Formatted Reviews:', formattedReviews); // 최종 변환된 데이터 확인
        setReviewData(formattedReviews);
      } catch (err) {
        console.error('Error details:', err); // 에러 상세 정보 확인
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        오늘 할인율이 가장 큰 상품을 추천해줄게요
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

      {/* 리뷰 섹션 */}
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
          구매자 리뷰 분석
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

      <div
        style={{
          textAlign: 'right',
          paddingRight: '50px',
        }}
      >
        <a
          href={deal.productLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            width: '120px',
            marginTop: '2px',
            padding: '3px',
            backgroundColor: '#2563eb',
            color: 'white',
            textAlign: 'center',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(37, 99, 235, 0.1)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#1d4ed8';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow =
              '0 4px 6px rgba(37, 99, 235, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow =
              '0 2px 4px rgba(37, 99, 235, 0.1)';
          }}
        >
          상품 보러가기
        </a>
      </div>
    </div>
  );
};

export default TodaysDeal;
