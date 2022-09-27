import React from "react";
import { NavLink } from "react-router-dom";
import LoginModal from "./auth/LoginModal";
import LogoutButton from "./auth/LogoutButton";
import "./NavBar.css";
const NavBar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <div className="nav-logo">
          <NavLink to="/" exact={true} activeClassName="active" />
        </div>
      </div>
      <div className="nav-links">
        <div className="login-container">
          <LoginModal />
        </div>
        <div className="signup-container">
          <button className="signup-button">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
