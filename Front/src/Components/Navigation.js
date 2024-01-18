import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <Logo />
        <div className="nav">
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? "nav-active hover" : "hover")}
          >
            <li>Accueil</li>
          </NavLink>
          <NavLink
            to="/Creations"
            className={(nav) => (nav.isActive ? "nav-active hover" : "hover")}
          >
            <li>Créations</li>
          </NavLink>
          <NavLink
            to="/contact"
            className={(nav) => (nav.isActive ? "nav-active hover" : "hover")}
          >
            <li>Contact</li>
          </NavLink>
          <NavLink
            to="/login"
            className={(nav) => (nav.isActive ? "nav-active hover" : "hover")}
          >
            <li>Login</li>
          </NavLink>
        </div>
      </ul>
    </div>
  );
};

export default Navigation;
<h1>Nav</h1>;
