import React from "react";
import { useNavigate } from "react-router-dom";

const EmailVerificationSuccess = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Vérification réussie</h1>
      <p>Votre compte a été activé avec succès !</p>
      <button onClick={() => navigate("/login")}>Se connecter</button>
    </div>
  );
};

export default EmailVerificationSuccess;
