import React from "react";
import "../../styles/Footer.css";

const FooterWork = () => {
  return (
    <div className="col-12 col-sm-6 col-md-3 mb-4">
      <h6 className="fw-bold text-color">Çalışma Saatleri</h6>
      <p className="mt-3 small mb-2">Çarşamba - Pazartesi:
        <span className="fw-semibold"> 09:00 - 20:00</span>
      </p>
      <p className="small">Salı: 
        <span className=" fw-semibold"> Kapalı</span>
      </p>
      
      <h6 className="mt-5 fw-bold text-color">Bizi Takip Edin</h6>
      <div className="d-flex mt-2 gap-3 ">
        <a href="#" className="text-light fs-5" aria-label="Instagram">
          <i class="fa-brands fa-instagram"></i>
        </a>
        <a href="#" className="text-light fs-5" aria-label="Twitter">
          <i class="fa-brands fa-twitter"></i>
        </a>
        <a href="#" className="text-light fs-5" aria-label="Facebook">
          <i class="fa-brands fa-facebook-f"></i>
        </a>
      </div>
    </div>
  );
};

export default FooterWork;
