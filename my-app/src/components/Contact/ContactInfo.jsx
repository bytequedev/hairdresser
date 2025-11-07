import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="contact-info-box p-3 shadow-sm rounded-4">
      <h5 className="mb-3 fw-bold">İletişim Bilgileri</h5>
      <div className="info-item mb-3">
        <FaMapMarkerAlt className="info-icon" />
        <div>
          <strong>Adres</strong>
          <p>Battalgazi, Paşaköy Cd. no:63, 34935Sultanbeyli/İstanbul</p>
        </div>
      </div>

      <div className="info-item mb-3">
        <FaPhoneAlt className="info-icon" />
        <div>
          <strong>Telefon</strong>
          <p>+90 5xx xxx xx xx <br /> 
            <a href="#" className="wp-link">WhatsApp ile İletişim</a>
          </p>
        </div>
      </div>

      <div className="info-item mb-3">
        <FaEnvelope className="info-icon" />
        <div>
          <strong>E-Posta</strong>
          <p>elifimzaoglu@gmail.com</p>
        </div>
      </div>

      <div className="info-item">
        <FaClock className="info-icon" />
        <div>
          <strong>Çalışma Saatleri</strong>
          <p>Haftaiçi - Haftsonu: 09:00 - 20:00 <br /> Salı: Kapalı</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
