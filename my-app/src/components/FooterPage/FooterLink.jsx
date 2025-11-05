import React from "react";
import "../../styles/Footer.css"

const FooterLink=()=>{

    return(
        <div className="col-12 col-sm-6 col-md-3 mb-4">
            <h6 className="fw-bold ms-5 text-color">Hızlı Linkler</h6>
            <ul className="list-unstyled mt-3 ms-5">
              <li><a href="#anasayfa" className="text-light text-decoration-none d-block mb-2 small">Ana Sayfa</a></li>
              <li><a href="#hizmetler" className="text-light text-decoration-none d-block mb-2 small">Hizmetlerimiz</a></li>
              <li><a href="#hakkimizda" className="text-light text-decoration-none d-block mb-2 small">Hakkımızda</a></li>
              <li><a href="#galeri" className="text-light text-decoration-none d-block mb-2 small">Galeri</a></li>
              <li><a href="#randevu" className="text-light text-decoration-none d-block mb-2 small">Randevu Al</a></li>
              <li><a href="#iletisim" className="text-light text-decoration-none d-block small">İletişim</a></li>
            </ul>
          </div>
    );
}

export default FooterLink;