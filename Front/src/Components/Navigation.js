import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    // Redirection à l'accueil ou à la page de login
    // Vous pouvez utiliser useNavigate pour la redirection
    // navigate("/");
  };

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
          {isLoggedIn ? (
            <li onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </li>
          ) : (
            <NavLink
              to="/login"
              className={(nav) => (nav.isActive ? "nav-active hover" : "hover")}
            >
              <li>Login</li>
            </NavLink>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navigation;
