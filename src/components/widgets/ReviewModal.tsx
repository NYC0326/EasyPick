import React from 'react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: string[];
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  reviews,
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
          borderRadius: '12px',
          padding: '16px',
          maxWidth: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h4
          style={{
            margin: '0 0 12px 0',
            color: '#1f2937',
            fontSize: '16px',
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          실제 구매자 리뷰
        </h4>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              style={{
                padding: '12px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#4b5563',
                lineHeight: '1.6',
              }}
            >
              {review}
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#9ca3af',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
