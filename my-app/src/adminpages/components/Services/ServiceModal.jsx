import React, { useState, useEffect } from 'react';
import { db } from "../../../config/firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { iconOptions } from "../../../utils/iconMap.jsx";

const ServiceModal = ({ showModal, onClose, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    icon: "scissors"
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        desc: initialData.desc || "",
        icon: initialData.icon || "scissors"
      });
    } else {
      setFormData({ title: "", desc: "", icon: "scissors" });
    }
  }, [initialData, showModal]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.desc) {
      toast.warning("Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);
    try {
      if (initialData?.id) {
        // Güncelleme
        const serviceRef = doc(db, "services", initialData.id);
        await updateDoc(serviceRef, {
          ...formData,
          updatedAt: serverTimestamp()
        });
        toast.success("Hizmet başarıyla güncellendi.");
      } else {
        // Yeni Ekleme
        await addDoc(collection(db, "services"), {
          ...formData,
          createdAt: serverTimestamp()
        });
        toast.success("Yeni hizmet eklendi.");
      }
      onClose();
    } catch (error) {
      console.error("Hizmet kaydedilirken hata:", error);
      toast.error("Hizmet kaydedilemedi.");
    } finally {
      setLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1100,
      backdropFilter: 'blur(4px)'
    }}>
      <div className="modal-content bg-white p-4 rounded-4 shadow-lg" style={{ width: '90%', maxWidth: '500px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">{initialData ? 'Hizmet Düzenle' : 'Yeni Hizmet Ekle'}</h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Hizmet Başlığı</label>
            <input
              type="text"
              className="form-control rounded-3"
              placeholder="Örn: Saç Kesimi"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Açıklama</label>
            <textarea
              className="form-control rounded-3"
              rows="3"
              placeholder="Hizmet detaylarını yazın..."
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold text-muted">İkon Seçin</label>
            <div className="d-flex flex-wrap gap-2 p-2 border rounded-3 bg-light">
              {iconOptions.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setFormData({ ...formData, icon: opt.id })}
                  className={`p-2 rounded-3 border cursor-pointer d-flex align-items-center justify-content-center ${formData.icon === opt.id ? 'bg-primary text-white border-primary' : 'bg-white text-dark'}`}
                  style={{ width: '45px', height: '45px', cursor: 'pointer', transition: '0.2s' }}
                  title={opt.label}
                >
                  <span style={{ fontSize: '20px' }}>{opt.icon}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="d-grid">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary py-2 rounded-pill fw-bold"
              style={{ background: 'var(--color-primary, #df2f80)', border: 'none' }}
            >
              {loading ? 'Kaydediliyor...' : (initialData ? 'Değişiklikleri Kaydet' : 'Hizmeti Ekle')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
