import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import '../../styles/Gallery.css';

const Cards = ({ title, subtitle, src, category, onDelete, onEdit, showActions }) => {
  return (
    <div className="gallery-card h-100 border-0 shadow-sm">
      <span className="card-category shadow-sm">{category}</span>
      
      <div className="gallery-image-wrapper">
        <img src={src} alt={title} className="gallery-image" />
        
        {showActions && (
          <div className="card-overlay">
            <button 
              className="card-action-btn edit" 
              onClick={onEdit}
              title="Resmi Düzenle"
            >
              <FaEdit />
            </button>
            <button 
              className="card-action-btn delete" 
              onClick={onDelete}
              title="Resmi Sil"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>

      <div className="card-info bg-white">
        <h5 className="mb-1">{title}</h5>
        <p className="text-muted small">{subtitle}</p>
      </div>
    </div>
  );
};

export default Cards;
