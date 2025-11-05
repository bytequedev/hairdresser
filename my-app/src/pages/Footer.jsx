import React from "react";
import "../styles/Footer.css";
import FooterLogo from "../components/FooterPage/FooterLogo";
import FooterLink from "../components/FooterPage/FooterLink";
import FooterWork from "../components/FooterPage/FooterWork";
import FooterContact from "../components/FooterPage/FooterContact";
const Footer = () => {
  return (
    <footer className="footer text-light pt-5 pb-4">
      <div className="container">
        <div className="row">
          <FooterLogo />
          <FooterLink />
          <FooterWork />
          <FooterContact />
        </div>

        <div
          className="text-center mt-4 pt-3 border-top"
          style={{ borderColor: "#444" }}>
          <small className="text-white-50">
            © 2025 ByteQueDev | Tüm hakları saklıdır
          </small>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
