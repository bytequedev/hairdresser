import React from "react";
import "../../styles/Footer.css"

const FooterContact=()=>{

    return(

        <div className="col-12 col-sm-6 col-md-3 mb-4">
            <h6 className="fw-bold text-color">İletişim</h6>
            <ul className="list-unstyled mt-3">
              <li className="mb-2 small">
                <i class="fa-solid fa-location-dot me-2"></i>
                Battalgazi, Paşaköy Cd. no:63, 34935 Sultanbeyli/İstanbul
              </li>
              <li className="mb-2 small">
                <i class="fa-solid fa-phone me-2"></i>
                <a href="tel:+905xxxxxxxxx" className="text-light text-decoration-none">+90 5XX XXX XX XX</a>
              </li>
              <li className="small">
                <i class="fa-solid fa-envelope me-2"></i>
                <a href="mailto:info@example.com" className="text-light text-decoration-none">elifimzaoglu@gmail.com</a>
              </li>
            </ul>
          </div>

    );
}

export default FooterContact;