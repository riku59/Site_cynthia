import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { checkAdmin } from "../utils/auth";
import Cart from "./Cart";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      checkAdmin().then((isAdmin) => setIsAdmin(isAdmin));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    // Redirection à l'accueil ou à la page de login
    // Vous pouvez utiliser useNavigate pour la redirection
    navigate("/");
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="navigation">
      <Logo />

      <div className="nav">
        <ul>
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
          <li onClick={toggleCart} style={{ cursor: "pointer" }}>
            Voir le panier
          </li>
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
        </ul>
      </div>

      {/* Afficher le panier si isCartOpen est vrai */}
      {isCartOpen && <Cart isVisible={isCartOpen} />}
    </div>
  );
};

export default Navigation;
