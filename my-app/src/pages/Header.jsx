import React, { useState } from "react";
import { COLORS } from "../utils/constants";

import "../styles/Header.css";
import Logo from "../components/Header/Logo";
import Menu from "../components/Header/Menu";

import { Navbar, Container, Offcanvas } from "react-bootstrap";

const Header = () => {
  const [active, setActive] = useState("anasayfa");

  return (
    <Navbar expand="lg" style={{ backgroundColor: COLORS.white }} className="header px-3">
      <Container fluid className="d-flex align-items-center justify-content-between">
        <Logo />

        <div className="nav-menu-wrapper d-none d-lg-flex">
          <Menu active={active} setActive={setActive} />
        </div>

        <Navbar.Toggle aria-controls="offcanvasNavbar" className="d-lg-none" />

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
            <Menu active={active} setActive={setActive} />

          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
