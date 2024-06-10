import React from "react";

const FormLogin = () => {
  return (
    <div className="form-login" id="contact">
      <h2>Connexion</h2>
      <form action="#" class="log_form">
        <label for="email">E-mail</label>
        <input type="email" name="email" id="email" />
        <span id="errorMail"></span>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" />
        <input type="submit" value="Se connecter" className="log-in" />
        <p>Mot de passe oublié</p>
        <span id="notFound"></span>
      </form>
    </div>
  );
};

export default FormLogin;
