import React from "react";

function HeroSection() {
  return (
    <div className="col-12 col-lg-6  order-1 order-lg-0">

      {/* başlık */}
      <h1 className="display-5 text-dark fw-bold justiyfy-content-start text-start text-lg-start mb-4">
        <span className="d-block">Hayalinizdeki</span>
        <span className="d-block text-color">Saç Stiline</span>
        <span className="d-block">Kavuşun</span>
      </h1>

      {/* açıklama */}
      <p className="text-muted justify-content-start text-start text-lg-start mb-5">
        Profesyonel kadromuz ve kaliteli hizmet anlayışımızla, <br />
        size özel saç bakımı ve güzellik çözümleri sunuyoruz. <br />
        Her ziyaretinizde kendinizi özel hissedin.
      </p>

      {/* butonlar */}
      <div className="d-flex flex-wrap gap-4 mb-5">
        <a className="btn-custom btn-primary-custom">
          <i className="fa-solid fa-calendar me-2 text-nowrap fs-4"></i>
          Hemen Randevu Al
        </a>
        <a className="btn-custom btn-secondary-custom">
          <i className="fa-brands fa-whatsapp me-2 text-nowrap fs-3"></i>
          WhatsApp ile İletişim
        </a>
      </div>

    {/* bilgi */}
      <div className="d-flex justify-content-center justify-content-lg-center flex-wrap gap-5 px-5">
      <div>
        <span className="d-block fw-bold text-center fs-3 text-color">10+</span>
        <span className="d-block fw-bold">Yıllık Deneyim</span>
      </div>
      <div>
        <span className="d-block text-center fs-3 text-color fw-bold">
          5000+
        </span>
        <span className="d-block fw-bold">Mutlu Müşteri</span>
      </div>
      <div>
        <span className="d-block text-center fs-3 text-color fw-bold">
          100%
        </span>
        <span className="d-block fw-bold">Memnuniyet</span>
      </div>
    </div>
    </div>
  );
}

export default HeroSection;
