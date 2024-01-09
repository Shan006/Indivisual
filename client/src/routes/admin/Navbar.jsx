import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="#">Indivisual</a>
      </div>
      <div className="navbar-hamburger" onClick={toggleNav}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`navbar-menu ${isNavOpen ? "open" : ""}`} onClick={closeNav}>
        <li>
          <Link to="/admin/company" className={location.pathname === "/admin/company" ? "active" : ""}>
            Company
          </Link>
        </li>
        <li>
          <Link to="/admin/phone" className={location.pathname === "/admin/phone" ? "active" : ""}>
            Phone
          </Link>
        </li>
        <li>
          <Link to="/admin/category" className={location.pathname === "/admin/category" ? "active" : ""}>
            Categories
          </Link>
        </li>
        <li>
          <Link to="/admin/template" className={location.pathname === "/admin/template" ? "active" : ""}>
            Templates
          </Link>
        </li>
        <li>
          <Link to="/admin/case" className={location.pathname === "/admin/case" ? "active" : ""}>
            Cases
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
