import React from "react";
import "../../styles/Footer.css";

const FooterLogo = () => {
    
  return (
    <div className="col-12 col-sm-6 col-md-3 mb-4">
      <div className="d-flex align-items-center mb-3">
        <img
          src="/assets/eliflogo.png"
          alt="logo"
          className="img-fluid"
          style={{ width: "90px", height: "50px", borderRadius: "50%" }}
        />
        <div className="ms-2">
          <h6 className="text-color fw-bold mb-0">ELİF İMZAOĞLU</h6>
          <span className="text-white-50 small">Kuaför Salonu</span>
        </div>
      </div>
      <p className="small">
        Güzelliğinize değer katan, profesyonel bakım ve güzellik hizmetleri
      </p>
    </div>
  );
};

export default FooterLogo;
