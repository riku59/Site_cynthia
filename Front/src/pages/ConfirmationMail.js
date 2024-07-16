import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ConfirmationMail = () => {
  const { confirmationCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/confirm/${confirmationCode}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La vérification a échoué");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message); // Maintenant nous logguons juste le message
        navigate("/verification-success"); // Rediriger vers la page de succès
      })
      .catch((error) => {
        console.error("Error:", error);
        navigate("/verification-failure"); // Rediriger vers une page d'erreur
      });
  }, [confirmationCode, navigate]);

  return (
    <div>
      <h1>Verification en cours...</h1>
    </div>
  );
};

export default ConfirmationMail;
