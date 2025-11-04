import React from "react";

const GalleryCard = ({ item }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="gallery-item position-relative overflow-hidden rounded-3">
        <img
          src={item.image}
          alt={item.title}
          className="w-100 h-100 object-fit-cover"
        />
        <div className="gallery-overlay position-absolute bottom-0 start-0 w-100 p-3 text-white text-start">
          <h5 className="mb-1 fw-bold">{item.title}</h5>
          <p className="mb-0 small">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;