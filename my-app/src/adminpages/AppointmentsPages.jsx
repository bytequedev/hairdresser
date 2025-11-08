import React, { useState } from 'react'
import AdminAppointmentsHeader from './components/Appointmens/AdminAppointmentsHeader'
import AdminCategoryButtons from './components/Appointmens/AdminCategoryButtons'
import AdminAppointmentsGrid from './components/Appointmens/AdminAppointmentsGrid';
import "../adminpages/styles/Appointments.css"

const AppointmentsPages = () => {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const categories = ["Tümü", "Bekleyen", "Onaylı", "Tamamlandı", "İptal"];
  
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: "Başak Köseoğlu",
      phone: "05xx xxx xxxx",
      service: "Saç Kesim",
      date: "19.11.2025",
      time: "14.00",
      status: "Bekleyen",
      note: "Saçımıda boytmak istiyorum."
    },
    {
      id: 2,
      name: "Burçin Güngör",
      phone: "05xx xxx xxxx",
      service: "Cilt Bakımı",
      date: "20.11.2025",
      time: "16.00",
      status: "Onaylı",
      note: "Hassas cildim var."
    },
    {
      id: 3,
      name: "Zeynep İmzaoğlu",
      phone: "05xx xxx xxxx",
      service: "Saç Boyama",
      date: "21.11.2025",
      time: "13.00",
      status: "İptal",
    },
    {
      id: 4,
      name: "Rabia Yulalı",
      phone: "05xx xxx xxxx",
      service: "Kişisel Bakım",
      date: "21.11.2025",
      time: "13.30",
      status: "Tamamlandı",
      note: "Ağda yaptırmak istiyorum tüm vücut."
    },
  ]);

  const handleUpdateStatus = (id, newStatus) => {
    console.log('Durum güncelleniyor:', id, newStatus); 
    setAppointments(prevAppointments => {
      const updated = prevAppointments.map(appointment =>
        appointment.id === id
          ? { ...appointment, status: newStatus }
          : appointment
      );
      console.log('Güncellenmiş randevular:', updated); 
      return updated;
    });
  };

  const filteredAppointments =
    activeCategory === "Tümü"
      ? appointments
      : appointments.filter((item) => item.status === activeCategory);
  
  console.log('Active Category:', activeCategory); 
  console.log('Filtered Appointments:', filteredAppointments); 
  
  return (
    <section className="adminappointment-page">
      <div className="container-fluid py-3">
        <div className="row">
          <AdminAppointmentsHeader/>
          <AdminCategoryButtons
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <AdminAppointmentsGrid 
            appointments={filteredAppointments}
            onUpdateStatus={handleUpdateStatus}
          />
        </div>
      </div>
    </section>
  )
}

export default AppointmentsPages