/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  return (
    <div className="col-12 col-lg-6 order-1 order-lg-0" >

      {/* başlık */}
          <h1 className="display-5 text-dark fw-bold justiyfy-content-start text-start text-lg-start mb-4 hero-animated-title">
            {['Hayalinizdeki', 'Saç Stiline', 'Kavuşun'].map((line, lineIdx) => (
              <span className={`d-block${lineIdx === 1 ? ' text-color' : ''}`} key={lineIdx}>
                {line.split('').map((char, i) => (
                  <span
                    key={i}
                    className="hero-letter"
                    style={{
                      animationDelay: `${i * 0.07 + lineIdx * 0.5}s`,
                      display: char === ' ' ? 'inline-block' : undefined
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

      {/* açıklama */}
      <p className="text-muted justify-content-start text-start text-lg-start mb-5">
        Profesyonel kadromuz ve kaliteli hizmet anlayışımızla, <br />
        size özel saç bakımı ve güzellik çözümleri sunuyoruz. <br />
        Her ziyaretinizde kendinizi özel hissedin.
      </p>

      {/* butonlar */}
      <div className="d-flex flex-wrap gap-4 mb-5">
        <a className="btn-custom btn-primary-custom text-nowrap">
          <i className="fa-solid fa-calendar me-2 fs-4"></i>
          Hemen Randevu Al
        </a>
        <a className="btn-custom btn-secondary-custom text-nowrap">
          <i className="fa-brands fa-whatsapp me-2 fs-3"></i>
          WhatsApp ile İletişim
        </a>
      </div>

    {/* bilgi */}
    <div className="d-flex gap-5">
      <CounterBox target={10} suffix="+" label="Yıllık Deneyim" duration={1200} />
      <CounterBox target={5000} suffix="+" label="Mutlu Müşteri" duration={1800} />
      <CounterBox target={100} suffix="%" label="Memnuniyet" duration={1000} />
    </div>
    </div>
  );
}

  // Sayaç kutusu bileşeni
  function CounterBox({ target, suffix, label, duration }) {
    const [count, setCount] = useState(0);
    const ref = useRef();

    useEffect(() => {
      let start = 0;
      const stepTime = Math.max(Math.floor(duration / target), 20);
      let startTime = null;
      function animateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        setCount(value);
        if (progress < 1) {
          ref.current = requestAnimationFrame(animateCounter);
        } else {
          setCount(target);
        }
      }
      ref.current = requestAnimationFrame(animateCounter);
      return () => cancelAnimationFrame(ref.current);
    }, [target, duration]);

    return (
      <div>
        <span className="d-block fw-bold text-center fs-3 text-color">
          {count}{suffix}
        </span>
        <span className="d-block fw-bold">{label}</span>
      </div>
    );
  }

  export default HeroSection;
import "../../styles/HeroSection.css";
