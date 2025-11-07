import React, { useState } from "react";
import AppointmentsPages from "./AppointmentsPages";
import MessagesPages from "./MessagesPages";
import GalleryPages from "./GalleryPages";
import Header from "./components/Header";
import Dashboard from "./DashboardPages";
import "./styles/Menu.css";

const Menu = () => {
  const [active, setActive] = useState("dashboard");

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

      <div className="menu-body d-flex">
        <div className="menu-sidebar shadow-sm rounded-4 p-4 m-4 bg-white-70">
          <div className="d-flex flex-column gap-3 mt-4">
            <button
              onClick={() => setActive("dashboard")}
              className={`menu-btn ${active === "dashboard" ? "active" : ""}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActive("randevular")}
              className={`menu-btn ${active === "randevular" ? "active" : ""}`}
            >
              Randevular
            </button>
            <button
              onClick={() => setActive("mesajlar")}
              className={`menu-btn ${active === "mesajlar" ? "active" : ""}`}
            >
              Gelen Mesajlar
            </button>
            <button
              onClick={() => setActive("galeri")}
              className={`menu-btn ${active === "galeri" ? "active" : ""}`}
            >
              Galeri
            </button>
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
