import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaCheckCircle, FaEnvelope } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Dashboard.css';

const DashboardCards = () => {
  const [period, setPeriod] = useState("Günlük");

  const cards = [
    { icon: <FaCalendarAlt size={24} color="#1D8CDA" />, title: "Toplam Randevu", count: 0 },
    { icon: <FaClock size={24} color="#EEB96F" />, title: "Bekleyen Randevu", count: 0 },
    { icon: <FaCheckCircle size={24} color="#3F995D" />, title: "Onaylı Randevu", count: 0 },
    { icon: <FaEnvelope size={24} color="var(--primary)" />, title: "Gelen Mesajlar", count: 0 },
  ];

  return (
    <div className="container ">
     <div className="d-flex justify-content-end mb-1">
  <div className="dropdown custom-dropdown">
    <button
      className="btn btn-sm dropdown-toggle"
      type="button"
      id="periodDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {period}
    </button>
    <ul className="dropdown-menu" aria-labelledby="periodDropdown">
      <li>
        <button className="dropdown-item" onClick={() => setPeriod("Günlük")}>Günlük</button>
      </li>
      <li>
        <button className="dropdown-item" onClick={() => setPeriod("Haftalık")}>Haftalık</button>
      </li>
      <li>
        <button className="dropdown-item" onClick={() => setPeriod("Aylık")}>Aylık</button>
      </li>
    </ul>
  </div>
</div>


      <div className="row g-3">
        {cards.map((card, idx) => (
          <div key={idx} className="col-6 col-md-3">
            <div className="dashboard-card p-3 shadow-sm rounded text-center position-relative">
              <div className="icon-wrapper position-absolute top-0 start-0 m-2">
                {card.icon}
              </div>

              <div className="card-content d-flex flex-column justify-content-center align-items-center" style={{height: '100px'}}>
                <h4 className="mb-1 fw-bold">{card.count}</h4>
                <h6 className="mb-0">{card.title}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;
