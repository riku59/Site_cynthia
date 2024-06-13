import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        navigate("/"); // ou rediriger vers une page de profil ou autre selon votre logique d'application
      } else {
        console.error("Failed to login:", data.message);
        setErrorMessage(data.message || "Erreur lors de la connexion.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Problème de connexion au serveur.");
    }
  };

  return (
    <div className="form-login" id="contact">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin} className="log_form">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && <span className="error-message">{errorMessage}</span>}
        <input type="submit" value="Se connecter" className="log-in" />
        <p>
          <Link to="/forgot-password">Mot de passe oublié</Link>
        </p>
        <p>
          Vous n'avez pas encore de compte?{" "}
          <Link to="/signup">Créer un compte</Link>
        </p>
      </form>
    </div>
  );
};

export default FormLogin;
