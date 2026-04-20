import React from 'react';

const Title = ({ onAddClick }) => {
  return (
    <div className="mb-4">
      <h2 className="fw-bold text-dark mb-1">Hizmet Yönetimi</h2>
      <p className="text-muted small mb-3">Sitede sunulan hizmetleri buradan ekleyebilir, düzenleyebilir veya silebilirsiniz.</p>
      <button 
        className="btn btn-primary rounded-pill px-4"
        onClick={onAddClick}
        style={{
          background: 'var(--color-primary, #df2f80)',
          border: 'none',
          boxShadow: '0 4px 12px rgba(223, 47, 128, 0.2)'
        }}
      >
        <span className="me-2">+</span> Yeni Hizmet Ekle
      </button>
    </div>
  );
};

export default Title;
