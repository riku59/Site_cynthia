import React from "react";
import { NavLink } from "react-router-dom";
import Footer from "../Components/Footer";

const NotFound = () => {
  return (
    <div>
      <h1>error 404</h1>
      <NavLink to="/">
        <h3>Retournez vers la page d'acceuil</h3>
      </NavLink>
      <Footer />
    </div>
  );
};

export default NotFound;
