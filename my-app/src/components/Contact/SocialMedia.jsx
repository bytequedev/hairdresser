import React from "react";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="col-12 col-lg-12 contact-social-box p-4 shadow-sm rounded-4 mt-4 mt-lg-3">
      <h5 className="fw-bold ">Sosyal Medya</h5>
      <p >Güncel çalışmalarımızı ve kampanyalarımızı takip edin!</p>
      <div className="social-icons">
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaFacebookF /></a>
        <a href="#"><FaTiktok /></a>
      </div>
    </div>
  );
};

export default SocialMedia;
