import React from 'react';
import AddImage from './components/Gallery/AddImage';
import Title from './components/Gallery/Title';
import './styles/Gallery.css';
import GalleryCard from './components/Gallery/GalleryCard';

const GalleryPages = () => {
  return (
    <div style={{ height: '74vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Title />
        <AddImage />
      </div>

<div style={{ flex: 1, overflowY: 'auto', marginTop: '10px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <GalleryCard />
      </div>
    </div>
  );
};

export default GalleryPages;
