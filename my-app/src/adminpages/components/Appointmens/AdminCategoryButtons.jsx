import React from "react";

const AdminCategoryButtons = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="d-flex justify-content-start gap-3 flex-wrap mb-4 text-nowrap">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`btn px-4 py-2 fw-semibold ${
            activeCategory === category
              ? "custom-btn-primary"
              : "custom-btn-outline"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default AdminCategoryButtons;
