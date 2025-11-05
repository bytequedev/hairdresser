import React from "react";
import "../../styles/Appointment.css";

const AppointmentMaps = () => {
  return (
    <div className="col-12 col-lg-6 order-o">
      <div className="map-container shadow-sm">
        <iframe
          title="Salonun Konumu"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.7614926124907!2d29.28418410000001!3d40.9867032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cad18b8684ec7f%3A0x9262f1bcdbd87943!2zRWxpZiDEsG16YW_En2x1IEt1YWbDtnIgU2Fsb251!5e0!3m2!1str!2str!4v1762345996853!5m2!1str!2str"
          width="100%"
          height="530"
          style={{
            border: 0,
            borderRadius: "24px",
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default AppointmentMaps;
