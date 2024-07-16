import React from "react";
import { useNavigate } from "react-router-dom";

const EmailVerificationFailure = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Échec de la vérification</h1>
      <p>
        Il y a eu un problème lors de la vérification de votre e-mail. Veuillez
        réessayer ou contacter le support.
      </p>
      <button onClick={() => navigate("/")}>Retour à l'accueil</button>
    </div>
  );
};

export default EmailVerificationFailure;
