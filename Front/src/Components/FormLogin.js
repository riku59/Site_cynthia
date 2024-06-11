import React from "react";
import { Link } from "react-router-dom";

const FormLogin = () => {
  return (
    <div className="form-login" id="contact">
      <h2>Connexion</h2>
      <form action="#" className="log_form">
        <label htmlFor="email">E-mail</label>
        <input type="email" className="email" id="email" />
        <span id="errorMail"></span>
        <label htmlFor="password">Password</label>
        <input type="password" className="password" id="password" />
        <input type="submit" value="Se connecter" className="log-in" />
        <p>
          <Link to="/forgot-password">Mot de passe oublié</Link>
        </p>
        <p>
          Vous n'avez pas encore de compte?{" "}
          <Link to="/signup">Créer un compte</Link>
        </p>
        <span id="notFound"></span>
      </form>
    </div>
  );
};

export default FormLogin;
