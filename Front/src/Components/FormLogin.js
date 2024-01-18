import React from "react";

const FormLogin = () => {
  return (
    <div className="form-login">
      <h1>Se connecter</h1>
      <form action="">
        <label htmlFor="email">E-mail</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Mot de passe</label>
        <input type="password" name="password" id="password" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default FormLogin;
