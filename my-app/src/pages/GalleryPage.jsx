import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { categories } from "../data/galleryData";
import GalleryHeader from "../components/GalleryPage/GalleryHeader";
import CategoryButtons from "../components/GalleryPage/CategoryButtons";
import GalleryGrid from "../components/GalleryPage/GalleryGrid";
import "../styles/Gallery.css";

const baseCategories = ["Tümü", "Saç Kesimi", "Saç Boyama", "Fön & Maşa", "Makyaj", "Kişisel Bakım"];

const GalleryPage = ({ activeCategory, setActiveCategory }) => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dynamicCategories, setDynamicCategories] = useState(baseCategories);

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setGalleryItems(items);

      // Dinamik kategorileri oluştur
      const itemCategories = items.map(item => item.category).filter(Boolean);
      const combined = [...new Set([...baseCategories, ...itemCategories])];
      setDynamicCategories(combined);
      
      setLoading(false);
    }, (error) => {
      console.error("Galeri verileri çekilemedi:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
            categories={dynamicCategories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Yükleniyor...</span>
              </div>
            </div>
          ) : (
            <GalleryGrid items={filteredItems} />
          )}
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
