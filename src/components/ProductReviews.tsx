import React, { useState } from 'react';

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

interface ProductReviewsProps {
  reviewData: ReviewData;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviewData }) => {
  const [activeTab, setActiveTab] = useState<'pros' | 'cons'>('pros');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
      }}
    >
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
        {reviewData[activeTab]?.map((category) => (
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
  );
};

export default ProductReviews;
