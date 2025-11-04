import React from "react";
import { COLORS } from "../../utils/constants";
import "../../styles/Header.css";


const Logo = () => {
  return (
    <div className="logo-container">
      <img src="/assets/eliflogo.png" alt="Logo" className="logo-image" />

      <div className="logo-text">
        <h1 className="logo-title" style={{ color: COLORS.primary }}>
          Elif İmzaoğlu
        </h1>
        <p className="logo-subtitle">Kuaför Salonu</p>
      </div>
    </div>
  );
};

export default Logo;
