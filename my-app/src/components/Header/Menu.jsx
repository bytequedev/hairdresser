import React from "react";
import { Link as ScrollLink } from "react-scroll";
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

  return (
    <nav className="nav-menu">
      {menuItems.map((item) => (
        <ScrollLink
          key={item.name}
          to={item.name}
          smooth={true}
          duration={500}
          offset={-70}
          onClick={() => setActive(item.name)}
          className={`nav-item ${active === item.name ? "active" : ""}`}
        >
          {item.label}
        </ScrollLink>
      ))}
    </nav>
  );
};

export default Menu;
