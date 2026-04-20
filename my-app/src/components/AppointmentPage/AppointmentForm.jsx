import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { db } from "../../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import "../../styles/Appointment.css";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    note: "",
  });
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const serviceOptions = [
    { value: "Saç Kesimi", label: "Saç Kesimi" },
    { value: "Saç Boyama", label: "Saç Boyama" },
    { value: "Dip Boya", label: "Dip Boya" },
    { value: "Röfle / Balyaj", label: "Röfle / Balyaj" },
    { value: "Ombre / Sombre", label: "Ombre / Sombre" },
    { value: "Fön", label: "Fön" },
    { value: "Topuz / Gelin Başı", label: "Topuz / Gelin Başı" },
    { value: "Kaş / Bıyık Alımı", label: "Kaş / Bıyık Alımı" },
    { value: "Ağda", label: "Ağda" },
    { value: "Manikür / Pedikür", label: "Manikür / Pedikür" },
    { value: "Cilt Bakımı", label: "Cilt Bakımı" },
    { value: "Keratin Bakım", label: "Keratin Bakım" },
    { value: "Perma", label: "Perma" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedServices.length === 0) {
      toast.warning("Lütfen en az bir hizmet seçiniz.");
      return;
    }

    setLoading(true);
    try {
      const appointmentData = {
        ...formData,
        service: selectedServices.map(s => s.label).join(", "),
        status: "Bekleyen",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "appointments"), appointmentData);
      
      toast.success("Randevu talebiniz başarıyla alındı!");
      
      // Formu temizle
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        note: "",
      });
      setSelectedServices([]);
    } catch (error) {
      console.error("Randevu oluşturulurken hata:", error);
      toast.error("Randevu oluşturulurken bir hata oluştu. Lütfen tekrar deneyiniz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-12 col-lg-6">
      <div className="card p-4 shadow form-card">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <i className="fa-solid fa-user me-2 ms-2 icon-color"></i>
              <label className="form-label">Ad Soyad *</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Tam adınızı giriniz."
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-6">
              <i className="fa-solid fa-phone-volume me-2 ms-2 icon-color"></i>
              <label className="form-label">Telefon (opsiyonel)</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="(0___) ___ __ __"
                maxLength="11"
                value={formData.phone}
                onChange={handleInputChange}
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                }
              />
            </div>

            <div className="col-md-6">
              <i className="fa-solid fa-envelope me-2 ms-2 icon-color"></i>
              <label className="form-label">E-posta *</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="ornek@gmail.com"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                <i className="fa-solid fa-wand-magic-sparkles icon-color me-2"></i>
                Hizmet *
              </label>
              <CreatableSelect
                isMulti
                options={serviceOptions}
                value={selectedServices}
                onChange={setSelectedServices}
                placeholder="Hizmet seçiniz veya yazınız..."
                noOptionsMessage={() => "Hizmet bulunamadı, yazarak ekleyebilirsiniz"}
                formatCreateLabel={(inputValue) => `Ekle: "${inputValue}"`}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            <div className="col-md-6">
              <i className="fa-solid fa-calendar me-2 ms-2 icon-color"></i>
              <label className="form-label">Tarih</label>
              <input 
                type="date" 
                name="date"
                className="form-control" 
                required
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-6">
              <i className="fa-solid fa-clock me-2 ms-2 icon-color"></i>
              <label className="form-label">Saat</label>
              <input 
                type="time" 
                name="time"
                className="form-control" 
                required
                value={formData.time}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-12">
              <i className="fa-solid fa-bell me-2 ms-2 icon-color"></i>
              <label className="form-label">Notlar (opsiyonel)</label>
              <textarea
                name="note"
                className="form-control"
                placeholder="Eklemek istediğiniz not varsa buraya yazabilirsiniz.."
                rows="5"
                value={formData.note}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-6 d-flex justify-content-start mb-2 mb-md-0">
              <button 
                type="submit" 
                className="btn btn-custom-primary w-100"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                ) : (
                  <i className="fa-solid fa-paper-plane me-2"></i>
                )}
                {loading ? "Gönderiliyor..." : "Randevu Oluştur"}
              </button>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <button type="button" className="btn btn-success w-100">
                <i className="fa-brands fa-whatsapp me-2 fs-4"></i>
                WhatsApp ile Randevu
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
