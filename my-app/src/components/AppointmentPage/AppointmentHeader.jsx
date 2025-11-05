import React from "react";
import "../../styles/Appointment.css";

const AppointmentHeader = () => {
  return (
    <div className="text-center">
      <h1 className="fw-bold text-color">Randevu Al</h1>
      <p className="text-muted">
        Size uygun tarih ve saati seçin, biz sizi arayalım.
      </p>
    </div>
  );
};

export default AppointmentHeader;
