import React, { useState } from "react";
import {
  Navbar,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LoginModal from "../../Login/Login";
import logo from "../../../assets/images/logo/Logo.png";
import "../Header/header.css";

const Header = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const closeMenu = () => {
    if (window.innerWidth <= 991) {
      setOpen(false);
    }
  };

  return (
    <header className="header-section">
      <Navbar expand="lg" className="p-0 d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Navbar.Brand>
          <NavLink to="/TechwizDui">
            <img src={logo} alt="Travel Smart" className="logo" />
          </NavLink>
        </Navbar.Brand>

        {/* Offcanvas Menu */}
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="start"
          show={open}
        >
          <Offcanvas.Header>
            <h1 className="logo">TravelSmart</h1>
            <span className="navbar-toggler ms-auto" onClick={toggleMenu}>
              <i className="bi bi-x-lg"></i>
            </span>
          </Offcanvas.Header>

          <Offcanvas.Body className="Offcanvascolor">
            <Nav className="justify-content-center flex-grow-1 pe-3">
              <NavLink className="nav-link m-3" to="/" onClick={closeMenu}>Home</NavLink>
              <NavLink className="nav-link m-3" to="/about-us" onClick={closeMenu}>ABOUT US</NavLink>
              <NavLink className="nav-link m-3" to="/tours" onClick={closeMenu}>TOURS</NavLink>
              <NavLink className="nav-link m-3" to="/news" onClick={closeMenu}>NEWS</NavLink>
              <NavLink className="nav-link m-3" to="/top-places" onClick={closeMenu}>TOP PLACES</NavLink>
              <NavLink className="nav-link m-3" to="/gallery" onClick={closeMenu}>GALLERY</NavLink>
              <NavLink className="nav-link m-3" to="/contact-us" onClick={closeMenu}>CONTACT</NavLink>
            </Nav>

            {/* User login/logout */}
            <div className="d-none d-sm-inline-block text-white m-3 pt-1 me-4">
              {user ? (
                <>
                  <span>Hello, {user.username || user.email}!</span>
                  <button
                    className="btn btn-sm btn-outline-light ms-2"
                    onClick={() => setUser(null)}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  className="text-decoration-none text-white"
                  onClick={toggleModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                </NavLink>
              )}
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        {/* Toggle icon for mobile */}
        <li className="d-inline-block d-lg-none m-3 text-white toggle_btn">
          <i className={open ? "bi bi-x-lg" : "bi bi-list"} onClick={toggleMenu}></i>
        </li>
      </Navbar>

      {/* Login modal */}
      <LoginModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        user={user}
        setUser={setUser}
      />
    </header>
  );
};

export default Header;
