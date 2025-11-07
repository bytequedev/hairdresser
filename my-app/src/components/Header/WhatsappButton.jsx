import React from "react";
import { MdWhatsapp } from "react-icons/md"; 
import { COLORS } from "../../utils/constants";
import "../../styles/Header.css";

const WhatsappButton = () => {
  return (
    <a
      href="https://wa.me/905xxxxxxxxx"
      target="_blank"
      rel="noopener noreferrer"
      className="wp-button"
      style={{ backgroundColor: COLORS.wp }}
    >
            <span className="wp-text">Whatsapp ile İletişim</span>

      <MdWhatsapp size={24} className="wp-icon" />
    </a>
  );
};

export default WhatsappButton;
