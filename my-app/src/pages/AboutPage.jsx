import React from "react";
import Title from "../components/About/Title";
import WhyCard from "../components/About/WhyCard";
import AboutCards from "../components/About/AboutCards";
import "../styles/About.css";

const AboutPage = () => {
  return (
    <section className="about-section" id="hakkimizda">
      <div className="container py-5  ">
        <div className="about-layout">
          <div className="about-left">
            <Title />
            <AboutCards />
          </div>

          <div className="about-right">
            <WhyCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
