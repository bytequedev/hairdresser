/* eslint-disable no-undef */
import React, { useState } from "react";




const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("isAdmin", "true");
      onLogin();
    } else {
      setError("Geçersiz admin e-posta veya şifre.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa" }}>
      <form onSubmit={handleSubmit} style={{ minWidth: 320, background: "#fff", padding: 32, borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
        <h3 className="mb-4 text-center" style={{ color: "#DF2F80" }}>Admin Girişi</h3>
        <div className="mb-3">
          <label className="form-label">E-posta</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Şifre</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <div className="text-danger small mb-2">{error}</div>}
        <button className="btn w-100" style={{ background: "#DF2F80", color: "#fff", fontWeight: 500, borderRadius: 8 }} type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default AdminLogin;
