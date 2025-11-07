import React from "react";
import { IoSend } from "react-icons/io5"; 

const ContactForm = () => {
  return (
    <div className="contact-form-box p-4 shadow-sm rounded-4">
      <form>
        <div className="mb-3">
          <label className="form-label">Ad Soyad</label>
          <input type="text" className="form-control custom-input" placeholder="Ad ve Soyad Giriniz" />
        </div>
        <div className="mb-3">
          <label className="form-label">E-Posta (opsiyonel)</label>
          <input type="email" className="form-control custom-input" placeholder="example@gmail.com" />
        </div>
        <div className="mb-3">
          <label className="form-label">Telefon</label>
          <input type="tel" className="form-control custom-input"   placeholder="(0___) ___ __ __"   maxlength="11" 
  pattern="0[0-9\s]{10,12}" 
 />
        </div>
        <div className="mb-3">
          <label className="form-label">Mesajınız</label>
          <textarea className="form-control custom-input" rows="3" placeholder="Mesajınızı buraya yazın.."></textarea>
        </div>
        <button
          type="submit"
          className="btn w-100 send-btn d-flex align-items-center justify-content-center gap-2"
        >
          Mesaj Gönder
          <IoSend size={18} />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
