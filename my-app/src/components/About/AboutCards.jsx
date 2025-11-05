import React from "react";
import { LuScissors, LuBrush } from "react-icons/lu";
import { GiLipstick, GiHairStrands } from "react-icons/gi";
import "../../styles/About.css";

const AboutCards = () => {
  const cards = [
    { icon: <LuScissors />, title: "Profesyonel Ekip", desc: "Profesyonel kişilerden işlemler." },
    { icon: <LuBrush />, title: "Kaliteli Ürünler", desc: "En iyi markalarla çalışıyoruz." },
    { icon: <GiLipstick />, title: "Müşteri Odaklı", desc: "Memnuniyetiniz bizim önceliğimiz" },
    { icon: <GiHairStrands />, title: "5000+ Müşteri", desc: "Binlerce mutlu müşteri" },
  ];

  return (
    <div className="about-cards">
      {cards.map((card, index) => (
        <div key={index} className="about-card">
          <div className="icon-box">{card.icon}</div>
          <h3>{card.title}</h3>
          <p>{card.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default AboutCards;
