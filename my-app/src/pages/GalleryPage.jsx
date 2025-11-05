import React, { useState } from "react";
import "../styles/Gallery.css";
import { categories, galleryItems } from "../data/galleryData";
import GalleryHeader from "../components/GalleryPage/GalleryHeader";
import CategoryButtons from "../components/GalleryPage/CategoryButtons";
import GalleryGrid from "../components/GalleryPage/GalleryGrid";

const GalleryPage = () => {

  const [activeCategory, setActiveCategory] = useState("Tümü");

  const filteredItems =
    activeCategory === "Tümü"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section className="gallery-page" id="galeri">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="container-fluid text-center py-4 px-4 px-lg-5 ">

        <GalleryHeader />
        <CategoryButtons
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        <GalleryGrid items={filteredItems} />
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
