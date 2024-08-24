import { useState, useEffect } from "react";

export function useCart() {
  const [cartItems, setCartItems] = useState([]);

  const getCart = async () => {
    try {
      const token = localStorage.getItem("token"); // Récupérez le token JWT depuis le stockage local

      const response = await fetch("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`, // Ajoutez le token JWT dans l'en-tête Authorization
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.items); // Met à jour le state avec les articles du panier
      } else {
        console.error("Failed to fetch cart items");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    getCart(); // Appeler getCart dès que le composant est monté pour récupérer les articles
  }, []);

  return { cartItems, getCart };
}
