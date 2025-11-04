import React from "react";

const CategoryButtons = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="d-flex justify-content-center gap-3 flex-wrap mb-5 text-nowrap">
      {categories.map((category) => (
        <button
          key={category}
          className={`btn btn-custom ${
            activeCategory === category
              ? "btn-pink activate"
              : "btn-outline-pink"
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;