import React from "react";

const FormContact = () => {
  return (
    <div className="form-contact">
      <h1>me contacter</h1>
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

export default FormContact;
