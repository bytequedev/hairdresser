/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link as ScrollLink, scroller } from "react-scroll";
import "../../styles/Header.css";
import AuthModal from "./AuthModal";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState as useReactState } from "react";

const Menu = ({ active, setActive }) => {
  const menuItems = [
    { name: "anasayfa", label: "Anasayfa" },
    { name: "hizmetler", label: "Hizmetlerimiz" },
    { name: "galeri", label: "Çalışmalarımız" },
    { name: "randevu", label: "Randevu" },
    { name: "hakkimizda", label: "Hakkımızda" },
    { name: "iletisim", label: "İletişim" },
  ];

  const handleClick = (section) => {
    setActive(section);
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: false, 
      offset: -70,
    });
  };

  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useReactState(null);
  const [displayName, setDisplayName] = useReactState("");

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setDisplayName(u?.displayName || "");
    });
    return () => unsub();
  }, []);

  return (
    <nav className="nav-menu" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex' }}>
        {menuItems.map((item) => (
          <span
            key={item.name}
            onClick={() => handleClick(item.name)}
            className={`nav-item ${active === item.name ? "active" : ""}`}
          >
            {item.label}
          </span>
        ))}
      </div>
      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#DF2F80', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 6 ,marginLeft: 20}}>
            <i className="fa-solid fa-user" style={{ fontSize: '1em', marginRight: 2 ,}}></i>
            Merhaba {user.displayName || user.email?.split("@") [0]}!
          </span>
          <button
            className="btn"
            style={{ color: '#DF2F80', fontWeight: 500, background: 'transparent',  }}
            onClick={() => { signOut(getAuth()); }}
            title="Çıkış"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      ) : (
        <button
          className="btn ms-auto"
          style={{ minWidth: 100, fontWeight: 500, borderRadius: 20, border: '2px solid #DF2F80', color: '#DF2F80', background: 'transparent' }}
          onClick={() => setShowAuth(true)}
          onMouseOver={e => { e.currentTarget.style.background = '#DF2F80'; e.currentTarget.style.color = '#fff'; }}
          onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#DF2F80'; }}
        >
          Giriş / Kayıt
        </button>
      )}
      <AuthModal show={showAuth} onClose={() => setShowAuth(false)} setDisplayName={setDisplayName} />
    </nav>
  );

}

export default Menu;