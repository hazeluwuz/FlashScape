import React from "react";
import { NavLink } from "react-router-dom";
import LoginModal from "./auth/LoginModal";
import SignUpModal from "./auth/SignupModal";
import LogoutButton from "./auth/LogoutButton";
import logo from "../images/logo.png";
import "./NavBar.css";
const NavBar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <div className="nav-logo">
          <NavLink
            className="nav-logo"
            to="/"
            exact={true}
            activeClassName="active"
          />
          <img src={logo} className="logo-img" />
        </div>
      </div>
      <div className="nav-links">
        <div className="login-container">
          <LoginModal />
        </div>
        <div className="signup-container">
          <SignUpModal />
          {/* <button className="signup-button">Get Started</button> */}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
