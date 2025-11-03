import React, { useState } from "react";
import { COLORS } from "../utils/constants";

import "../styles/Header.css";
import Logo from "../components/Header/Logo";
import Menu from "../components/Header/Menu";
import WhatsappButton from "../components/Header/WhatsappButton";

import { Navbar, Container, Offcanvas } from "react-bootstrap";

const Header = () => {
  const [active, setActive] = useState("anasayfa");

  return (
    <Navbar expand="lg" style={{ backgroundColor: COLORS.white }} className="header px-3">
      <Container fluid className="d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Logo />

        {/* Menü (büyük ekran) */}
        <div className="nav-menu-wrapper d-none d-lg-flex">
          <Menu active={active} setActive={setActive} />
        </div>

        {/* Desktop WhatsApp */}
        <div className="d-none d-lg-block">
          <WhatsappButton />
        </div>

        {/* Hamburger Toggle (mobil) */}
        <Navbar.Toggle aria-controls="offcanvasNavbar" className="d-lg-none" />

        {/* Hamburger Offcanvas */}
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          className="d-lg-none"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* Menü ve WhatsApp butonu mobil menüde */}
            <Menu active={active} setActive={setActive} />
            <div className="mt-3">
              <WhatsappButton />
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
