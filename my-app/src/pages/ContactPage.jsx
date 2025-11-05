import React from "react";
import ContactForm from "../components/Contact/ContactForm";
import ContactInfo from "../components/Contact/ContactInfo";
import SocialMedia from "../components/Contact/SocialMedia";
import Title from "../components/Contact/Title";
import "../styles/Contact.css";

const ContactPage = () => {
  return (
    <section className="contact-section py-5 px-3 px-lg-5" id="iletisim">
      <div className="container-fluid">
        <Title />

        <div className="row align-items-start justify-content-center contact-row">
          <div className="col-12 col-lg-4 d-flex flex-column gap-1">
            <ContactInfo />
            <SocialMedia />
          </div>

          <div className="col-12 col-lg-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
