import React, { useState } from "react";
import Select from "react-select";
import { categories } from "../../data/galleryData";
import "../../styles/Appointment.css";

const AppointmentForm = () => {
  const [selectedServices, setSelectedServices] = useState([]);

  const serviceOptions = categories
    .filter((item) => item !== "Tümü")
    .map((category) => ({
      value: category,
      label: category,
    }));
  return (
    <div className="col-12 col-lg-6">
      <div className="card p-4 shadow form-card">
        <form>
          <div className="row g-3">
            <div className="col-md-6">
              <i class="fa-solid fa-user me-2 ms-2 icon-color"></i>
              <label className="form-label">Ad Soyad *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tam adınızı giriniz."
              />
            </div>

            <div className="col-md-6">
              <i class="fa-solid fa-phone-volume me-2 ms-2 icon-color"></i>
              <label className="form-label">Telefon *</label>
              <input
                type="tel"
                className="form-control"
                placeholder="(0___) ___ __ __"
                pattern="[0-9]{11}"
                maxlength="11"
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                }
              />
            </div>

            <div className="col-md-6">
              <i class="fa-solid fa-envelope me-2 ms-2 icon-color"></i>
              <label className="form-label">E-posta (opsiyonel)</label>
              <input
                type="email"
                className="form-control"
                placeholder="ornek@gmail.com"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                <i className="fa-solid fa-wand-magic-sparkles icon-color me-2"></i>
                Hizmet *
              </label>
              <Select
                isMulti
                options={serviceOptions}
                value={selectedServices}
                onChange={setSelectedServices}
                placeholder="Hizmet seçiniz..."
                noOptionsMessage={() => "Hizmet bulunamadı"}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            <div className="col-md-6">
              <i class="fa-solid fa-calendar me-2 ms-2 icon-color"></i>
              <label className="form-label">Tarih</label>
              <input type="date" className="form-control" />
            </div>

            <div className="col-md-6">
              <i class="fa-solid fa-clock me-2 ms-2 icon-color"></i>
              <label className="form-label">Saat</label>
              <input type="time" className="form-control" />
            </div>

            <div className="col-12">
              <i class="fa-solid fa-bell me-2 ms-2 icon-color"></i>
              <label className="form-label">Notlar (opsiyonel)</label>
              <textarea
                className="form-control"
                placeholder="Eklemek istediğiniz not varsa buraya yazabilirsiniz.."
                rows="5"
              ></textarea>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-6 d-flex justify-content-start mb-2 mb-md-0">
              <button type="submit" className="btn btn-custom-primary w-100">
                <i class="fa-solid fa-paper-plane me-2"></i>
                Randevu Oluştur
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
