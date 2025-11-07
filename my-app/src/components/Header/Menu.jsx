import React from "react";
import { Link as ScrollLink, scroller } from "react-scroll";
import "../../styles/Header.css";

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

  return (
    <nav className="nav-menu">
      {menuItems.map((item) => (
        <span
          key={item.name}
          onClick={() => handleClick(item.name)}
          className={`nav-item ${active === item.name ? "active" : ""}`}
        >
          {item.label}
        </span>
      ))}
    </nav>
  );
};

export default Menu;
