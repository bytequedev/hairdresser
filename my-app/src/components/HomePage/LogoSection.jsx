import React from "react";
import logo from "../../assets/eliflogo.png";

function LogoSection() {
  return (
    <div className="col-12 col-lg-6 text-center order-0 order-lg-1">
      <div className="d-flex justify-content-center justify-content-lg-center">
        <div className="position-relative">
          <img
            src={logo}
            title="Elif Kuaför - Randevu Al!"
            className="img-fluid logo"
          />
        </div>
      </div>
    </div>
  );
}
 export default LogoSection;