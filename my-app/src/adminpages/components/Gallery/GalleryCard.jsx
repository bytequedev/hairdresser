import React, { useState } from 'react';
import Cards from './Cards';
import '../../styles/Gallery.css';

const categories = ['Tümü', 'Saç Kesimi', 'Saç Boyama', 'Makyaj', 'Kişisel Bakım', 'Diğer'];

const imagesByCategory = {
  'Saç Kesimi': [
    { src: '/assets/bakim.jpg', title: 'Saç Kesim 1', subtitle: 'Alt Başlık 1' },
    { src: '/assets/bakim.jpg', title: 'Saç Kesim 2', subtitle: 'Alt Başlık 2' },
    { src: '/assets/bakim.jpg', title: 'Saç Kesim 3', subtitle: 'Alt Başlık 3' },
  ],
  'Saç Boyama': [
    { src: '/assets/bakim.jpg', title: 'Saç Boyama 1', subtitle: 'Alt Başlık 1' },
    { src: '/assets/bakim.jpg', title: 'Saç Boyama 2', subtitle: 'Alt Başlık 2' },
    { src: '/assets/bakim.jpg', title: 'Saç Boyama 3', subtitle: 'Alt Başlık 3' },
  ],
  'Makyaj': [
    { src: '/assets/bakim.jpg', title: 'Makyaj 1', subtitle: 'Alt Başlık 1' },
    { src: '/assets/bakim.jpg', title: 'Makyaj 2', subtitle: 'Alt Başlık 2' },
    { src: '/assets/bakim.jpg', title: 'Makyaj 3', subtitle: 'Alt Başlık 3' },
  ],
  'Kişisel Bakım': [
    { src: '/assets/bakim.jpg', title: 'Bakım 1', subtitle: 'Alt Başlık 1' },
    { src: '/assets/bakim.jpg', title: 'Bakım 2', subtitle: 'Alt Başlık 2' },
    { src: '/assets/bakim.jpg', title: 'Bakım 3', subtitle: 'Alt Başlık 3' },
  ],
  'Diğer': [
    { src: '/assets/bakim.jpg', title: 'Diğer 1', subtitle: 'Alt Başlık 1' },
    { src: '/assets/bakim.jpg', title: 'Diğer 2', subtitle: 'Alt Başlık 2' },
    { src: '/assets/bakim.jpg', title: 'Diğer 3', subtitle: 'Alt Başlık 3' },
  ],
};

const GalleryCard = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const images =
    selectedCategory === 'Tümü'
      ? Object.entries(imagesByCategory).flatMap(([cat, imgs]) =>
          imgs.map((img) => ({ ...img, category: cat }))
        )
      : (imagesByCategory[selectedCategory] || []).map((img) => ({
          ...img,
          category: selectedCategory,
        }));

  return (
    <div className="gallery-page">
      <div className="category-bar">
        {categories.map((cat) => (
          <div
            key={cat}
            className={`category-item ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </div>
        ))}
      </div>

      <div className="gallery-grid">
        {images.map((img, idx) => (
          <Cards
            key={idx}
            title={img.title}
            subtitle={img.subtitle}
            src={img.src}
            category={img.category}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryCard;
