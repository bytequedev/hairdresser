import React, { useState } from 'react';
import Title from './components/Services/Title';
import ServicesList from './components/Services/ServicesList';
import ServiceModal from './components/Services/ServiceModal';

import { db } from "../config/firebase";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

const defaultServices = [
  { icon: "scissors", title: "Saç Kesimi", desc: "Profesyonel kesim ve modern şekillendirme" },
  { icon: "brush", title: "Saç Boyama", desc: "Kaliteli boya ürünleri ile tam kafa boya" },
  { icon: "dryer", title: "Fön & Maşa", desc: "Özel günlerinize özel fön ve maşa uygulamaları" },
  { icon: "lipstick", title: "Makyaj", desc: "Güzelliğinizi ön plana çıkaran makyaj teknikleri" },
  { icon: "face", title: "Kişisel Bakım", desc: "Saç bakım maskeleri ve derinlemesine onarım" },
  { icon: "keratin", title: "Keratin Bakım", desc: "Saç düzleştirme ve profesyonel keratin bakım" },
];

const ServicesPages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [seeding, setSeeding] = useState(false);

  const handleRestoreDefaults = async () => {
    if (window.confirm("Varsayılan hizmetleri veritabanına eklemek istiyor musunuz?")) {
      setSeeding(true);
      try {
        for (const service of defaultServices) {
          await addDoc(collection(db, "services"), {
            ...service,
            createdAt: serverTimestamp()
          });
        }
        toast.success("Tüm varsayılan hizmetler başarıyla eklendi!");
      } catch (error) {
        toast.error("Hizmetler eklenirken bir hata oluştu.");
      } finally {
        setSeeding(false);
      }
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  return (
    <div style={{ height: '74vh', display: 'flex', flexDirection: 'column' }}>
      <div className="d-flex justify-content-between align-items-center">
        <Title onAddClick={handleAdd} />
        <button 
          onClick={handleRestoreDefaults}
          disabled={seeding}
          className="btn btn-outline-secondary btn-sm rounded-pill px-3"
          style={{ fontSize: '12px' }}
        >
          {seeding ? 'Yükleniyor...' : 'Varsayılanları Geri Yükle'}
        </button>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', marginTop: '10px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <ServicesList onEdit={(service) => handleEdit(service)} />
      </div>

      <ServiceModal 
        showModal={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={editingService} 
      />
    </div>
  );
};

export default ServicesPages;
