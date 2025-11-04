import React from "react";
import Title from "../components/About/Title";
import WhyCard from "../components/About/WhyCard";
import AboutCards from "../components/About/AboutCards";
import "../styles/About.css";

const AboutPage = () => {
  return (
    <section className="about-section">
      <div className="container py-5 px-4 px-lg-5">
        <div className="about-layout">
          {/* Sol taraf: Başlık + kartlar */}
          <div className="about-left">
            <Title />
            <AboutCards />
          </div>

          {/* Sağ taraf: Neden Bizi Seçmelisiniz */}
          <div className="about-right">
            <WhyCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
