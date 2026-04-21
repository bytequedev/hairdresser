import React from "react";
import { COLORS } from "../utils/constants";

import "../styles/Header.css";
import Logo from "../components/Header/Logo";
import Menu from "../components/Header/Menu";

import { Navbar, Container } from "react-bootstrap";

/**
 * Header — shown always on desktop (≥ 992px).
 * On mobile/tablet the hamburger & offcanvas are hidden because
 * navigation is handled by BottomNavBar instead.
 *
 * Props
 *   active    – currently active nav section id
 *   setActive – setter passed down so both Header menu and BottomNavBar share state
 */
const Header = ({ active, setActive }) => {
  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: COLORS.white }}
      className="header px-3"
    >
      <Container fluid className="d-flex align-items-center justify-content-between">
        <Logo />

        {/* Desktop nav — visible only on ≥ lg */}
        <div className="nav-menu-wrapper d-none d-lg-flex">
          <Menu active={active} setActive={setActive} />
        </div>

        {/* No hamburger / offcanvas — BottomNavBar handles mobile navigation */}
      </Container>
    </Navbar>
  );
};

export default Header;
