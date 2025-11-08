import React from 'react';
import '../../styles/Gallery.css';

const Cards = ({ title, subtitle, src, category }) => {
  return (
    <div className="gallery-card">
      <img src={src} alt={title} className="gallery-image" />
      <div className="card-info">
        <h5>{title}</h5>
        <p>{subtitle}</p>
        <span className="card-category">{category}</span>
      </div>
    </div>
  );
};

export default Cards;
