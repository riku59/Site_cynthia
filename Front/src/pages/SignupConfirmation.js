import React from "react";
import { Link } from "react-router-dom";

const SignupConfirmation = () => {
  return (
    <div>
      <h1>Inscription réussie !</h1>
      <p>
        Merci de vous être inscrit. Veuillez vérifier votre email pour activer
        votre compte.
      </p>
      <p>
        Si vous n'avez pas reçu d'email,{" "}
        <Link to="/resend">cliquez ici pour renvoyer l'email.</Link>
      </p>
    </div>
  );
};

export default SignupConfirmation;
