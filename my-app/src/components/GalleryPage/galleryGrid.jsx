import React from "react";
import GalleryCard from "./GalleryCard";

const GalleryGrid = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">
          Bu kategoride henüz çalışma bulunmamaktadır.
        </p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {items.map((item) => (
        <GalleryCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default GalleryGrid;