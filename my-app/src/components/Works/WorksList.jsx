import React, { useRef, useEffect, useState } from "react";
import WorksCard from "./WorksCard";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { db } from "../../config/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { iconMap } from "../../utils/iconMap.jsx";
import "../../styles/Works.css";

const WorksList = ({ setGalleryCategory }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setServices(items);
      setLoading(false);
    }, (error) => {
      console.error("Hizmetler çekilirken hata:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 240, behavior: "smooth" });
    }
  };
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -240, behavior: "smooth" });
    }
  };

  const handleServiceClick = (category) => {
    setGalleryCategory(category);
    const gallerySection = document.getElementById("galeri");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="position-relative py-4">
      {loading ? (
        <div className="text-center py-5">
           <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="d-flex overflow-auto works-scroll" ref={scrollRef} style={{ cursor: 'grab' }}>
          <div className="works-row">
            {services.map((item, index) => (
              <WorksCard 
                key={item.id} 
                icon={iconMap[item.icon] || iconMap.scissors} 
                title={item.title} 
                desc={item.desc} 
                onClick={() => handleServiceClick(item.title)}
              />
            ))}
          </div>
        </div>
      )}

      <button className="arrow-btn left" onClick={scrollLeft}>
        <FiChevronLeft size={22} />
      </button>
      <button className="arrow-btn right" onClick={scrollRight}>
        <FiChevronRight size={22} />
      </button>
    </div>
  );
};

export default WorksList;
