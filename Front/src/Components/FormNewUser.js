import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import correct de useNavigate

const FormNewUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [captcha, setCaptcha] = useState(
    Math.floor(Math.random() * 10 + 1) + Math.floor(Math.random() * 10 + 1)
  );
  const [captchaInput, setCaptchaInput] = useState("");
  const navigate = useNavigate(); // Création d'une instance de navigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérifier si la réponse au CAPTCHA est correcte
    if (parseInt(captchaInput) !== captcha) {
      alert("CAPTCHA incorrect, veuillez réessayer.");
      return; // Stop the form submission if CAPTCHA is incorrect
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(
          data.message || "Échec de la création du compte. Veuillez réessayer."
        );
      } else {
        console.log("User created:", data);
        navigate("/verify-email");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="form-new-user">
      <h2>Créer un Compte</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="captcha">
          Combien font {Math.floor(captcha / 2)} +{" "}
          {captcha - Math.floor(captcha / 2)} ?
        </label>
        <input
          type="text"
          id="captcha"
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value)}
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default FormNewUser;
