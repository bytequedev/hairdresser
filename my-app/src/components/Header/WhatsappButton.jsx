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
      <MdWhatsapp size={25} />
    </a>
  );
};

export default WhatsappButton;
