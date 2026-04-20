import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import AddImage from './AddImage';
import { db } from "../../../config/firebase";
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import '../../styles/Gallery.css';

const baseCategories = ['Tümü', 'Saç Kesimi', 'Saç Boyama', 'Şekillendirme', 'Kişisel Bakım'];

const GalleryCard = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dynamicCategories, setDynamicCategories] = useState(baseCategories);
  
  // Düzenleme state'leri
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setGalleryItems(items);

      // Kategorileri dinamik olarak güncelle
      const itemCategories = items.map(item => item.category).filter(Boolean);
      const combined = [...new Set([...baseCategories, ...itemCategories])];
      setDynamicCategories(combined);

      setLoading(false);
    }, (error) => {
      console.error("Galeri çekilirken hata:", error);
      toast.error("Galeri yüklenemedi.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bu resmi silmek istediğinize emin misiniz?")) {
      try {
        await deleteDoc(doc(db, "gallery", id));
        toast.success("Resim silindi.");
      } catch (error) {
        console.error("Resim silinirken hata:", error);
        toast.error("Resim silinemedi.");
      }
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const filteredImages =
    selectedCategory === 'Tümü'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="gallery-page">
      <div className="category-bar overflow-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {dynamicCategories.map((cat) => (
          <div
            key={cat}
            className={`category-item whitespace-nowrap ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
            style={{ flexShrink: 0 }}
          >
            {cat}
          </div>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="gallery-grid">
            {filteredImages.length > 0 ? (
              filteredImages.map((img) => (
                <Cards
                  key={img.id}
                  title={img.title}
                  subtitle={img.subtitle}
                  src={img.src}
                  category={img.category}
                  showActions={true}
                  onDelete={() => handleDelete(img.id)}
                  onEdit={() => handleEdit(img)}
                />
              ))
            ) : (
              <div className="col-12 text-center py-4 text-muted">
                Bu kategoride resim bulunamadı.
              </div>
            )}
          </div>

          {/* Düzenleme Modalı */}
          {isEditModalOpen && (
            <AddImage 
              showModal={isEditModalOpen} 
              initialData={selectedItem} 
              onClose={() => {
                setIsEditModalOpen(false);
                setSelectedItem(null);
              }} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default GalleryCard;
