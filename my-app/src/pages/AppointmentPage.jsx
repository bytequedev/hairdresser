import React from "react";
import "../styles/Appointment.css";
import AppointmentHeader from "../components/AppointmentPage/AppointmentHeader";
import AppointmentMaps from "../components/AppointmentPage/AppointmentMaps";
import AppointmentForm from "../components/AppointmentPage/AppointmentForm";


const AppointmentPage = () => {
  return (
    <section className="appointment-page" id="randevu">
      <div className="container-fluid py-4 px-4 px-lg-5">
        <div className="row align-items-start g-4 g-lg-5 mx-0 ">
          <AppointmentHeader/>
         <AppointmentMaps/>
         <AppointmentForm/>
        </div>
      </div>
    </section>
  );
};

export default AppointmentPage;
