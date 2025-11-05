import React from "react";
import { Link as ScrollLink, scroller } from "react-scroll";
import "../../styles/Header.css";

const Menu = ({ active, setActive }) => {
  const menuItems = [
    { name: "anasayfa", label: "Anasayfa" },
    { name: "hizmetler", label: "Hizmetler" },
    { name: "hakkimizda", label: "Hakkımızda" },
    { name: "galeri", label: "Galeri" },
    { name: "randevu", label: "Randevu" },
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
