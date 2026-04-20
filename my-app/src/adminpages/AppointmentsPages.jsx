import React, { useState, useEffect } from 'react'
import AdminAppointmentsHeader from './components/Appointmens/AdminAppointmentsHeader'
import AdminCategoryButtons from './components/Appointmens/AdminCategoryButtons'
import AdminAppointmentsGrid from './components/Appointmens/AdminAppointmentsGrid';
import { db } from "../config/firebase";
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "../adminpages/styles/Appointments.css"

const AppointmentsPages = () => {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const categories = ["Tümü", "Bekleyen", "Onaylı", "Tamamlandı", "İptal"];
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const appointmentsData = [];
      querySnapshot.forEach((doc) => {
        appointmentsData.push({ id: doc.id, ...doc.data() });
      });
      setAppointments(appointmentsData);
      setLoading(false);
    }, (error) => {
      console.error("Randevular çekilirken hata:", error);
      toast.error("Randevular yüklenemedi.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const appointmentRef = doc(db, "appointments", id);
      await updateDoc(appointmentRef, { status: newStatus });
      toast.success(`Durum güncellendi: ${newStatus}`);
    } catch (error) {
      console.error("Durum güncellenirken hata:", error);
      toast.error("Durum güncellenemedi.");
    }
  };

  const filteredAppointments =
    activeCategory === "Tümü"
      ? appointments
      : appointments.filter((item) => item.status === activeCategory);
  
  return (
    <div style={{ height: '74vh', display: 'flex', flexDirection: 'column' }}>
      <section className="adminappointment-page" >
        <div className="container">
          <div className="row">
            <AdminAppointmentsHeader/>
            <AdminCategoryButtons
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Yükleniyor...</span>
                </div>
              </div>
            ) : (
              <AdminAppointmentsGrid 
                appointments={filteredAppointments}
                onUpdateStatus={handleUpdateStatus}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AppointmentsPages