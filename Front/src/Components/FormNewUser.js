import React, { useState } from "react";
import { Link } from "react-router-dom";

const FormNewUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // API call to register the new user
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("User created:", data);
        // Redirect or display success message
      } else {
        console.error("Failed to create user:", data.message);
        // Handle errors, show user feedback
      }
    } catch (error) {
      console.error("Network error:", error);
      // Handle network errors
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
        <button>
          <Link to="/signup">s'inscrire</Link>
        </button>
      </form>
    </div>
  );
};

export default FormNewUser;
