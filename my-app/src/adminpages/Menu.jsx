import React, { useState } from "react";
import AppointmentsPages from "./AppointmentsPages";
import MessagesPages from "./MessagesPages";
import GalleryPages from "./GalleryPages";
import Header from "./components/Header";
import Dashboard from "./DashboardPages";
import "./styles/Menu.css";

const Menu = () => {
  const [active, setActive] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "randevular", label: "Randevular" },
    { id: "mesajlar", label: "Gelen Mesajlar" },
    { id: "galeri", label: "Galeri" }
  ];

  const handleMenuClick = (itemId) => {
    setActive(itemId);
    setIsMobileMenuOpen(false); // Mobilde seçim yapınca menü kapansın
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return <Dashboard />;
      case "randevular":
        return <AppointmentsPages />;
      case "mesajlar":
        return <MessagesPages />;
      case "galeri":
        return <GalleryPages />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="menu-wrapper bg-light-pink">
      <Header />

      <button
        className="hamburger-btn"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span className={`hamburger-icon ${isMobileMenuOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {isMobileMenuOpen && (
        <div
          className="menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="menu-body d-flex">
        <div className={`menu-sidebar shadow-sm rounded-4 p-4 m-4 bg-white-70 ${isMobileMenuOpen ? "mobile-open" : ""}`}>
          <div className="d-flex flex-column gap-3 mt-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`menu-btn ${active === item.id ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-content flex-fill m-4 p-4 bg-white rounded-4 shadow-sm">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Menu;
