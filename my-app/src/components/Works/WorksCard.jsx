import React from "react";
import "../../styles/Works.css";

const WorksCard = ({ icon, title, desc }) => {
  return (
    <div className="works-card">
      <div className="icon-box">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{desc}</p>
      <div className="line"></div>
    </div>
  );
};

export default WorksCard;
