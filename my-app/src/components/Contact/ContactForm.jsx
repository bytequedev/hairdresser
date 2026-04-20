/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const db = getFirestore();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.email.trim()) {
      setError("E-posta zorunludur.");
      return;
    }
    if (!form.message.trim()) {
      setError("Mesaj alanı zorunludur.");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "messages"), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        note: form.message,
        current_date: new Date().toISOString(),
        status: "Yeni"
      });
      setSuccess("Mesajınız başarıyla gönderildi!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
    setLoading(false);
  };

  return (
    <div className="contact-form-box p-4 shadow-sm rounded-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Ad Soyad</label>
          <input
            type="text"
            className="form-control custom-input"
            placeholder="Ad ve Soyad Giriniz"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">E-Posta <span style={{color:'#DF2F80'}}>*</span></label>
          <input
            type="email"
            className="form-control custom-input"
            placeholder="example@gmail.com"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Telefon</label>
          <input
            type="tel"
            className="form-control custom-input"
            placeholder="(0___) ___ __ __"
            maxLength="11"
            pattern="0[0-9\s]{10,12}"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mesajınız <span style={{color:'#DF2F80'}}>*</span></label>
          <textarea
            className="form-control custom-input"
            rows="3"
            placeholder="Mesajınızı buraya yazın.."
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        {error && <div className="text-danger mb-2 small">{error}</div>}
        {success && <div className="text-success mb-2 small">{success}</div>}
        <button
          type="submit"
          className="btn w-100 send-btn d-flex align-items-center justify-content-center gap-2"
          disabled={loading}
        >
          {loading ? "Gönderiliyor..." : "Mesaj Gönder"}
          <IoSend size={18} />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
