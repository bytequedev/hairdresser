import React, { useState, useEffect } from 'react';
import { db } from "../../../config/firebase";
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { iconMap } from "../../../utils/iconMap.jsx";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const ServicesList = ({ onEdit }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

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
      toast.error("Hizmetler yüklenemedi.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bu hizmeti silmek istediğinize emin misiniz?")) {
      try {
        await deleteDoc(doc(db, "services", id));
        toast.success("Hizmet silindi.");
      } catch (error) {
        toast.error("Hizmet silinemedi.");
      }
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="row g-3">
      {services.length > 0 ? (
        services.map((service) => (
          <div key={service.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-3 position-relative service-admin-card" style={{ transition: '0.3s' }}>
              <div className="d-flex align-items-center mb-2">
                <div className="icon-badge bg-light text-primary p-2 rounded-3 me-3" style={{ fontSize: '24px', color: '#df2f80' }}>
                  {iconMap[service.icon] || iconMap.scissors}
                </div>
                <h6 className="fw-bold mb-0 text-dark">{service.title}</h6>
              </div>
              <p className="small text-muted mb-0 text-truncate-2" style={{ fontSize: '13px' }}>{service.desc}</p>
              
              <div className="card-actions mt-3 d-flex gap-2">
                <button 
                  className="btn btn-sm btn-outline-primary rounded-pill flex-fill"
                  onClick={() => onEdit(service)}
                  style={{ fontSize: '12px' }}
                >
                  <FiEdit2 className="me-1" /> Düzenle
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger rounded-pill flex-fill"
                  onClick={() => handleDelete(service.id)}
                  style={{ fontSize: '12px' }}
                >
                  <FiTrash2 className="me-1" /> Sil
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12 text-center py-5 text-muted">
          Henüz hiç hizmet eklenmemiş.
        </div>
      )}
    </div>
  );
};

export default ServicesList;
