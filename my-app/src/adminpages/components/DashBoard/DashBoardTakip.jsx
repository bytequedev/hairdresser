import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/DashBoard.css";

const DashBoardTakip = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <div className="date-picker-wrapper" onClick={onClick} ref={ref}>
      <i className="bi bi-calendar3 date-icon"></i>
      <span className="date-value">{value}</span>
      <i className="bi bi-chevron-down date-arrow"></i>
    </div>
  ));

  return (
<div className="container pt-2">
      <div className="d-flex justify-content-end mb-1">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd.MM.yyyy"
          customInput={<CustomDateInput />}
        />
      </div>

   <div className="row g-4">
  <div className="col-lg-8"> 
    <div className="card appointment-card shadow-sm p-3 no-hover">
      <h6 className="fw-bold mb-0">Son Randevular</h6>
      <hr className="mb-2" />
      <div className="appointment-card text-center py-4">
        <i className="bi bi-calendar2-heart-fill fs-1 mb-2" style={{ color: 'var(--primary)' }}></i>
        <p className="mt-2 fw-medium">Henüz randevu bulunmuyor..</p>
      </div>
    </div>
  </div>

        <div className="col-lg-4">
          <div className="card summary-card my-5">
            <div className="card-body">
              <h6 className="fw-bold mb-3 text-center" >Bugünün Özeti</h6>

              <div className="d-flex justify-content-between">
                <span style={{ color: '#1D8CDA' }}>Bekleyen</span>
                <span>0</span>
              </div>

              <div className="d-flex justify-content-between">
                <span style={{ color: '#EEB96F' }}>Onaylı</span>
                <span>0</span>
              </div>

              <div className="d-flex justify-content-between">
                <span style={{ color: '#DF2F80' }}>Mesajlar</span>
                <span>0</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashBoardTakip;
