// WhyCard.jsx
import React from "react";
import "../../styles/About.css";
import sampleImage from "/assets/image.png"; 

const WhyCard = () => {
  return (
    <div className="why-card">
      <div className="why-image">
        <img src={sampleImage} alt="Kuaför Salonu" />
      </div>
      <div className="why-text">
        <h2>Neden Bizi Seçmelisiniz?</h2>
        <ul>
          <li>10 yılı aşkın deneyim ve uzmanlık</li>
          <li>En son trendler ve teknikler</li>
          <li>Hijyenik ve konforlu ortam</li>
          <li>Uygun fiyat politikası</li>
        </ul>
      </div>
    </div>
  );
};

export default WhyCard;
