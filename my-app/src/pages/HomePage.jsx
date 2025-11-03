import React from "react";
import "../styles/Home.css";
import HeroSection from "../components/HomePage/HeroSection";
import LogoSection from "../components/HomePage/LogoSection";

function HomePage() {
  return (
    <section className="home-page">
      <div className="container-fluid py-5 px-4 px-lg-5">
        <div className="row align-items-start g-4 g-lg-5 mx-0">
            <HeroSection />
            <LogoSection />
        </div>
      </div>
    </section>
  );
}

export default HomePage;
