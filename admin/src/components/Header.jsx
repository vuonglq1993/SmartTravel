import React, { useState } from "react";
import {
  Navbar,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo/Logo.png"; // đúng đường dẫn

import "../styles/header.css"; // chính xác và nằm trong src


// Nếu có modal đăng nhập riêng, import ở đây
// import LoginModal from "../../Login/Login";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const toggleModal = () => setModalOpen(!isModalOpen);
  const closeMenu = () => {
    if (window.innerWidth <= 991) {
      setOpen(false);
    }
  };

  return (
    <header className="header-section">
      <Navbar expand="lg" className="p-0 d-flex justify-content-between align-items-center">
        <Navbar.Brand>
          <NavLink to="/admin/dashboard">
            <img src={logo} alt="Admin Panel" className="logo" />
          </NavLink>
        </Navbar.Brand>

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          show={open}
        >
          <Offcanvas.Header>
            <h1 className="logo">Admin</h1>
            <span className="navbar-toggler ms-auto" onClick={toggleMenu}>
              <i className="bi bi-x-lg"></i>
            </span>
          </Offcanvas.Header>
          <Offcanvas.Body className="Offcanvascolor">
            <Nav className="justify-content-center flex-grow-1 pe-3">
              <NavLink className="nav-link m-3" to="/admin/users" onClick={closeMenu}>User Management</NavLink>
              <NavLink className="nav-link m-3" to="/admin/tours" onClick={closeMenu}>Tour Management</NavLink>
              <NavLink className="nav-link m-3" to="/admin/bookings" onClick={closeMenu}>Booking Management</NavLink>
              <NavLink className="nav-link m-3" to="/admin/state" onClick={closeMenu}>State Management</NavLink>
              <NavLink className="nav-link m-3" to="/admin/reviews" onClick={closeMenu}>Review Management</NavLink>
              <NavLink className="nav-link m-3" to="/admin/notifications" onClick={closeMenu}>Notifications</NavLink>
            </Nav>
            <NavLink className="text-white text-decoration-none" onClick={toggleModal}>
              <i className="bi bi-person-circle me-2"></i>Admin
            </NavLink>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        <li className="d-inline-block d-lg-none m-3 text-white toggle_btn">
          <i className={open ? "bi bi-x-lg" : "bi bi-list"} onClick={toggleMenu}></i>
        </li>
      </Navbar>

      {/* <LoginModal isOpen={isModalOpen} toggle={toggleModal} /> */}
    </header>
  );
};

export default Header;
